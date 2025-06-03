/**
 * Validates if a string is a properly formatted domain
 * @param domain - The domain string to validate
 * @returns Boolean indicating if the domain is valid
 */
export function validateDomain(domain: string): boolean {
  // Basic domain validation regex
  // Allows domains like example.com, sub.example.co.uk, etc.
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
}

/**
 * Validates if an email address has the same domain as the provided domain
 * @param email - The email address to validate
 * @param domain - The domain to match against
 * @returns Boolean indicating if the email matches the domain
 */
export function validateEmailDomainMatch(email: string, domain: string): boolean {
  if (!email || !domain) return false;
  
  // Extract the domain part from the email address
  const emailParts = email.split('@');
  if (emailParts.length !== 2) return false;
  
  const emailDomain = emailParts[1].toLowerCase();
  const targetDomain = domain.toLowerCase();
  
  // Check if the email domain exactly matches the target domain
  return emailDomain === targetDomain;
}

/**
 * Generates a random OTP of specified length
 * @param length - Length of the OTP to generate (default: 6)
 * @returns String containing the generated OTP
 */
export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  
  return otp;
}