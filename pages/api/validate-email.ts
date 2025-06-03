import type { NextApiRequest, NextApiResponse } from 'next';
import { validateDomain, validateEmailDomainMatch, generateOTP } from '@/lib/validation';

// In-memory storage for demo purposes
// In a real application, you would use a database
const otpStore: Record<string, { otp: string; timestamp: number }> = {};

type ResponseData = {
  success: boolean;
  otpSent?: boolean;
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
    const { domain, email } = req.body;

    // Validate required fields
    if (!domain || !email) {
      return res.status(400).json({ success: false, error: 'Domain and email are required' });
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

    // Generate OTP
    const otp = generateOTP(6);
    
    // Store OTP (with 10-minute expiration)
    const key = `${email.toLowerCase()}_${domain.toLowerCase()}`;
    otpStore[key] = {
      otp,
      timestamp: Date.now() + 10 * 60 * 1000, // 10 minutes expiration
    };

    // In a real application, you would send the OTP via email
    // For demonstration purposes, we'll just log it
    console.log(`OTP for ${email}: ${otp}`);

    // For demonstration, we'll simulate sending an email
    await simulateEmailSending(email, otp);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      otpSent: true,
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Email validation error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

// Simulate sending an email (replace with actual implementation in production)
async function simulateEmailSending(email: string, otp: string): Promise<void> {
  // For demo purposes, we'll just wait a bit to simulate email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email sent to ${email} with OTP: ${otp}`);
      resolve();
    }, 1000); // Simulate network delay
  });
}