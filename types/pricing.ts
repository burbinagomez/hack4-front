export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'secondary';
  maxDomains: number | 'unlimited';
  maxScansPerMonth: number | 'unlimited';
  support: string;
  apiAccess?: boolean;
  dedicatedConsultant?: boolean;
}

export interface Feature {
  name: string;
  basic: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
  category: string;
}

export interface PaymentOption {
  name: string;
  icon: string;
  description: string;
}

export type BillingCycle = 'monthly' | 'annual';