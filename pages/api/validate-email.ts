import type { NextApiRequest, NextApiResponse } from 'next';
import { validateDomain, validateEmailDomainMatch } from '@/lib/validation';
import { sendOTP } from '@/lib/cognito';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { domain, email } = req.body;

    if (!domain || !email) {
      return res.status(400).json({ success: false, error: 'Domain and email are required' });
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

    await sendOTP(email, domain);

    return res.status(200).json({ 
      success: true, 
      otpSent: true,
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Email validation error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}