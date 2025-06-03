import type { NextApiRequest, NextApiResponse } from 'next';
import { validateDomain, validateEmailDomainMatch } from '@/lib/validation';

// In-memory storage for demo purposes (shared with validate-email.ts)
// In a real application, you would use a database
declare global {
  var otpStore: Record<string, { otp: string; timestamp: number }>;
}

// Initialize global store if it doesn't exist
if (!global.otpStore) {
  global.otpStore = {};
}

const otpStore = global.otpStore;

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { domain, email, otp } = req.body;

    // Validate required fields
    if (!domain || !email || !otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Domain, email, and OTP are required' 
      });
    }

    // Validate domain format
    if (!validateDomain(domain)) {
      return res.status(400).json({ success: false, error: 'Invalid domain format' });
    }

    // Validate email format and domain match
    if (!validateEmailDomainMatch(email, domain)) {
      return res.status(400).json({ 
        success: false, 
        error: `Email must be associated with ${domain}` 
      });
    }

    // Check if OTP exists and is valid
    const key = `${email.toLowerCase()}_${domain.toLowerCase()}`;
    const storedData = otpStore[key];

    if (!storedData) {
      return res.status(400).json({ 
        success: false, 
        error: 'No OTP found for this email and domain' 
      });
    }

    // Check if OTP is expired
    if (Date.now() > storedData.timestamp) {
      // Clean up expired OTP
      delete otpStore[key];
      return res.status(400).json({ 
        success: false, 
        error: 'OTP has expired. Please request a new one' 
      });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid OTP' 
      });
    }

    // OTP verified successfully, clean up
    delete otpStore[key];

    // In a real application, you might want to:
    // 1. Create a verification record in the database
    // 2. Issue a token for authenticated access
    // 3. Set up domain ownership confirmation

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'OTP verified successfully' 
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}