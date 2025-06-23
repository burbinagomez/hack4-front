"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PricingCard from '@/components/pricing/PricingCard';
import FeatureComparisonTable from '@/components/pricing/FeatureComparisonTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  Star,
  Zap,
  Globe,
  Phone,
  Mail,
  Banknote
} from 'lucide-react';
import { PricingPlan, Feature, BillingCycle } from '@/types/pricing';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Monthly vulnerability scanning for 1 domain',
      'Basic subdomain enumeration',
      'Automated pentesting reports',
      'Email notifications',
      'Schedule up to 2 scans per month',
      'Community support'
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline',
    maxDomains: 1,
    maxScansPerMonth: 2,
    support: 'Community'
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    description: 'Ideal for growing businesses and teams',
    monthlyPrice: 149,
    annualPrice: 1432, // 20% discount
    features: [
      'Monthly vulnerability scanning for up to 5 domains',
      'Advanced subdomain discovery and monitoring',
      'Detailed pentesting reports with remediation guidance',
      'Real-time notifications',
      'Schedule up to 10 scans per month',
      'Priority email support',
      'Advanced security analytics',
      'Custom scan scheduling'
    ],
    highlighted: true,
    buttonText: 'Start Free Trial',
    buttonVariant: 'default',
    maxDomains: 5,
    maxScansPerMonth: 10,
    support: 'Priority Email'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    description: 'For large organizations with complex needs',
    monthlyPrice: 399,
    annualPrice: 3830, // 20% discount
    features: [
      'Unlimited domain vulnerability scanning',
      'Comprehensive subdomain tracking and analysis',
      'Custom pentesting schedules',
      'Advanced security reports with executive summaries',
      '24/7 priority support',
      'Unlimited scheduled scans',
      'API access',
      'Dedicated security consultant',
      'White-label reports',
      'SSO integration'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary',
    maxDomains: 'unlimited',
    maxScansPerMonth: 'unlimited',
    support: '24/7 Priority',
    apiAccess: true,
    dedicatedConsultant: true
  }
];

const features: Feature[] = [
  // Scanning & Monitoring
  { name: 'Domain Vulnerability Scanning', basic: '1 domain', professional: '5 domains', enterprise: 'Unlimited', category: 'Scanning & Monitoring' },
  { name: 'Subdomain Discovery', basic: 'Basic', professional: 'Advanced', enterprise: 'Comprehensive', category: 'Scanning & Monitoring' },
  { name: 'Scans per Month', basic: '2', professional: '10', enterprise: 'Unlimited', category: 'Scanning & Monitoring' },
  { name: 'Real-time Monitoring', basic: false, professional: true, enterprise: true, category: 'Scanning & Monitoring' },
  { name: 'Custom Scan Scheduling', basic: false, professional: true, enterprise: true, category: 'Scanning & Monitoring' },
  { name: 'SSL Certificate Monitoring', basic: true, professional: true, enterprise: true, category: 'Scanning & Monitoring' },
  
  // Reports & Analytics
  { name: 'Automated Reports', basic: 'Basic', professional: 'Detailed', enterprise: 'Executive', category: 'Reports & Analytics' },
  { name: 'Remediation Guidance', basic: false, professional: true, enterprise: true, category: 'Reports & Analytics' },
  { name: 'Security Analytics', basic: false, professional: true, enterprise: true, category: 'Reports & Analytics' },
  { name: 'White-label Reports', basic: false, professional: false, enterprise: true, category: 'Reports & Analytics' },
  { name: 'Executive Summaries', basic: false, professional: false, enterprise: true, category: 'Reports & Analytics' },
  { name: 'Historical Data', basic: '30 days', professional: '1 year', enterprise: 'Unlimited', category: 'Reports & Analytics' },
  
  // Notifications & Alerts
  { name: 'Email Notifications', basic: true, professional: true, enterprise: true, category: 'Notifications & Alerts' },
  { name: 'Real-time Alerts', basic: false, professional: true, enterprise: true, category: 'Notifications & Alerts' },
  { name: 'Slack Integration', basic: false, professional: true, enterprise: true, category: 'Notifications & Alerts' },
  { name: 'Webhook Support', basic: false, professional: false, enterprise: true, category: 'Notifications & Alerts' },
  
  // Support & Services
  { name: 'Support Level', basic: 'Community', professional: 'Priority Email', enterprise: '24/7 Priority', category: 'Support & Services' },
  { name: 'Response Time', basic: 'Best effort', professional: '24 hours', enterprise: '2 hours', category: 'Support & Services' },
  { name: 'Dedicated Consultant', basic: false, professional: false, enterprise: true, category: 'Support & Services' },
  { name: 'Training & Onboarding', basic: false, professional: false, enterprise: true, category: 'Support & Services' },
  
  // Integration & API
  { name: 'API Access', basic: false, professional: false, enterprise: true, category: 'Integration & API' },
  { name: 'SSO Integration', basic: false, professional: false, enterprise: true, category: 'Integration & API' },
  { name: 'Third-party Integrations', basic: false, professional: 'Limited', enterprise: 'Full', category: 'Integration & API' },
  { name: 'Custom Integrations', basic: false, professional: false, enterprise: true, category: 'Integration & API' }
];

const paymentOptions = [
  { name: 'Credit Card', icon: CreditCard, description: 'Visa, Mastercard, American Express' },
  { name: 'PayPal', icon: Globe, description: 'Secure PayPal payments' },
  { name: 'Wire Transfer', icon: Banknote, description: 'Bank wire transfer for enterprise' }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const { toast } = useToast();

  const handleSubscribe = (planId: string): void => {
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) return;

    if (planId === 'basic') {
      toast({
        title: "Welcome to Basic Plan!",
        description: "You can start using our free tier immediately.",
      });
    } else if (planId === 'enterprise') {
      toast({
        title: "Enterprise Inquiry",
        description: "Our sales team will contact you within 24 hours.",
      });
    } else {
      toast({
        title: "Starting Free Trial",
        description: "Your 14-day free trial is being set up.",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Choose Your Security Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protect your domains with our comprehensive vulnerability scanning and monitoring solutions.
            Start with our free tier or upgrade for advanced features.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4 p-1 bg-muted rounded-lg">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
              className="transition-all duration-200"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'annual' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('annual')}
              className="transition-all duration-200"
            >
              Annual
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                Save 20%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <Card className="text-center p-6 border-green-200 bg-green-50">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-800 mb-2">14-Day Free Trial</h3>
            <p className="text-sm text-green-700">
              Try Professional features risk-free for 14 days
            </p>
          </Card>
          
          <Card className="text-center p-6 border-blue-200 bg-blue-50">
            <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-800 mb-2">Money-Back Guarantee</h3>
            <p className="text-sm text-blue-700">
              30-day money-back guarantee on all paid plans
            </p>
          </Card>
          
          <Card className="text-center p-6 border-purple-200 bg-purple-50">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-800 mb-2">Secure Payments</h3>
            <p className="text-sm text-purple-700">
              Bank-level security for all transactions
            </p>
          </Card>
        </div>

        {/* Payment Options */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-center mb-6">
              Secure Payment Options
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {paymentOptions.map((option) => (
                <div key={option.name} className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <option.icon className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Comparison Table */}
        <div className="max-w-7xl mx-auto">
          <FeatureComparisonTable features={features} />
        </div>

        {/* FAQ Section */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Can I upgrade or downgrade my plan anytime?</h4>
                <p className="text-muted-foreground">
                  Yes, you can change your plan at any time. Upgrades take effect immediately, 
                  and downgrades take effect at the next billing cycle.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What happens during the free trial?</h4>
                <p className="text-muted-foreground">
                  You get full access to Professional features for 14 days. No credit card required. 
                  You can cancel anytime during the trial period.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you offer custom enterprise solutions?</h4>
                <p className="text-muted-foreground">
                  Yes, we offer custom solutions for large enterprises with specific requirements. 
                  Contact our sales team to discuss your needs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is my data secure?</h4>
                <p className="text-muted-foreground">
                  Absolutely. We use bank-level encryption and follow industry best practices 
                  to ensure your data is always secure and private.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-6 py-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
          <h2 className="text-3xl font-bold">
            Ready to Secure Your Domains?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of security professionals who trust our platform to protect their digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => handleSubscribe('basic')}>
              Start Free Today
            </Button>
            <Button size="lg" variant="outline" onClick={() => handleSubscribe('professional')}>
              Try Professional Free
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}