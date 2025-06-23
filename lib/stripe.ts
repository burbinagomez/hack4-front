import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.warn('Stripe publishable key not found. Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
};

// Stripe price configuration
export const STRIPE_PRICES = {
  professional: {
    monthly: process.env.STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID || 'price_professional_monthly',
    annual: process.env.STRIPE_PROFESSIONAL_ANNUAL_PRICE_ID || 'price_professional_annual',
  },
  enterprise: {
    monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 'price_enterprise_monthly',
    annual: process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID || 'price_enterprise_annual',
  },
};

export const PLAN_FEATURES = {
  basic: {
    domains: 1,
    scansPerMonth: 2,
    support: 'Community',
    features: [
      'Monthly vulnerability scanning for 1 domain',
      'Basic subdomain enumeration',
      'Automated pentesting reports',
      'Email notifications',
      'Schedule up to 2 scans per month'
    ]
  },
  professional: {
    domains: 5,
    scansPerMonth: 10,
    support: 'Priority Email',
    features: [
      'Monthly vulnerability scanning for up to 5 domains',
      'Advanced subdomain discovery and monitoring',
      'Detailed pentesting reports with remediation guidance',
      'Real-time notifications',
      'Schedule up to 10 scans per month',
      'Priority email support'
    ]
  },
  enterprise: {
    domains: 'unlimited',
    scansPerMonth: 'unlimited',
    support: '24/7 Priority',
    features: [
      'Unlimited domain vulnerability scanning',
      'Comprehensive subdomain tracking and analysis',
      'Custom pentesting schedules',
      'Advanced security reports with executive summaries',
      '24/7 priority support',
      'Unlimited scheduled scans',
      'API access',
      'Dedicated security consultant'
    ]
  }
};