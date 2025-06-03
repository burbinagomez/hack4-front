import type { NextApiRequest, NextApiResponse } from 'next';
import { validateDomain, validateEmailDomainMatch } from '@/lib/validation';
import { verifyOTP } from '@/lib/cognito';

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { domain, email, otp } = req.body;

    if (!domain || !email || !otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Domain, email, and OTP are required' 
      });
    }

    if (!validateDomain(domain)) {
      return res.status(400).json({ success: false, error: 'Invalid domain format' });
    }

    if (!validateEmailDomainMatch(email, domain)) {
      return res.status(400).json({ 
        success: false, 
        error: `Email must be associated with ${domain}` 
      });
    }

    await verifyOTP(email, otp);

    return res.status(200).json({ 
      success: true, 
      message: 'OTP verified successfully' 
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}