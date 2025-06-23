"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import { PricingPlan, BillingCycle } from '@/types/pricing';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import StripeCheckout from '@/components/pricing/StripeCheckout';

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Monthly scanning for 1 domain',
      'Basic subdomain enumeration',
      'Automated pentesting reports',
      'Email notifications',
      'Up to 2 scans per month'
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline',
    maxDomains: 1,
    maxScansPerMonth: 2,
    support: 'Community'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses',
    monthlyPrice: 149,
    annualPrice: 1432, // 20% discount
    features: [
      'Scanning for up to 5 domains',
      'Advanced subdomain discovery',
      'Detailed remediation guidance',
      'Real-time notifications',
      'Up to 10 scans per month',
      'Priority email support'
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
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 399,
    annualPrice: 3830, // 20% discount
    features: [
      'Unlimited domain scanning',
      'Comprehensive tracking',
      'Custom pentesting schedules',
      'Executive summaries',
      '24/7 priority support',
      'API access & dedicated consultant'
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

const planIcons = {
  basic: Shield,
  professional: Zap,
  enterprise: Star
};

interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  onSubscribe: (planId: string) => void;
  compact?: boolean;
}

function PricingCard({ plan, billingCycle, onSubscribe, compact = false }: PricingCardProps) {
  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
  const originalMonthlyPrice = plan.monthlyPrice;
  const savings = billingCycle === 'annual' && originalMonthlyPrice > 0 
    ? Math.round(((originalMonthlyPrice * 12 - plan.annualPrice) / (originalMonthlyPrice * 12)) * 100)
    : 0;

  const IconComponent = planIcons[plan.id as keyof typeof planIcons] || Shield;
  const { toast } = useToast();

  const handleBasicPlan = () => {
    toast({
      title: "Welcome to Basic Plan!",
      description: "You can start using our free tier immediately.",
    });
    onSubscribe(plan.id);
  };

  const handleEnterprisePlan = () => {
    toast({
      title: "Enterprise Inquiry",
      description: "Our sales team will contact you within 24 hours.",
    });
    onSubscribe(plan.id);
  };

  return (
    <Card className={cn(
      "relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      plan.highlighted 
        ? "border-primary shadow-lg ring-2 ring-primary/20 scale-105" 
        : "border-border hover:border-primary/50",
      compact && "h-full"
    )}>
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 text-xs font-semibold">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className={cn("text-center", compact ? "pb-3" : "pb-4")}>
        <div className={cn(
          "mx-auto mb-3 flex items-center justify-center rounded-full bg-primary/10",
          compact ? "h-12 w-12" : "h-16 w-16"
        )}>
          <IconComponent className={cn("text-primary", compact ? "h-6 w-6" : "h-8 w-8")} />
        </div>
        
        <CardTitle className={cn("font-bold", compact ? "text-xl" : "text-2xl")}>
          {plan.name}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {plan.description}
        </CardDescription>
        
        <div className="mt-3">
          <div className="flex items-baseline justify-center gap-1">
            <span className={cn("font-bold tracking-tight", compact ? "text-3xl" : "text-4xl")}>
              ${price}
            </span>
            {price > 0 && (
              <span className="text-muted-foreground text-sm">
                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            )}
          </div>
          
          {billingCycle === 'annual' && savings > 0 && (
            <div className="mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs">
                Save {savings}%
              </Badge>
            </div>
          )}
          
          {price === 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Forever free
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-3", compact && "px-4")}>
        <div className="space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-xs text-muted-foreground leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className={cn(compact ? "pt-4 px-4" : "pt-6")}>
        {plan.id === 'basic' ? (
          <Button 
            className={cn(
              "w-full font-semibold transition-all duration-200",
              compact && "text-sm"
            )}
            variant={plan.buttonVariant}
            size={compact ? "default" : "lg"}
            onClick={handleBasicPlan}
          >
            {plan.buttonText}
          </Button>
        ) : plan.id === 'enterprise' ? (
          <Button 
            className={cn(
              "w-full font-semibold transition-all duration-200",
              compact && "text-sm"
            )}
            variant={plan.buttonVariant}
            size={compact ? "default" : "lg"}
            onClick={handleEnterprisePlan}
          >
            {plan.buttonText}
          </Button>
        ) : (
          <StripeCheckout
            planId={plan.id as 'professional' | 'enterprise'}
            billingCycle={billingCycle}
            className={cn(
              "w-full font-semibold transition-all duration-200",
              plan.highlighted && "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
              compact && "text-sm"
            )}
            variant={plan.buttonVariant}
            size={compact ? "default" : "lg"}
          >
            {plan.buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </StripeCheckout>
        )}
      </CardFooter>
    </Card>
  );
}

export default function HomePricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const { toast } = useToast();

  const handleSubscribe = (planId: string): void => {
    // This is handled by individual card components
    console.log(`Subscription initiated for plan: ${planId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Choose Your Security Plan
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Protect your domains with comprehensive vulnerability scanning. 
          Start free or upgrade for advanced features.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center gap-3 p-1 bg-muted rounded-lg">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('monthly')}
            className="transition-all duration-200 text-sm"
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('annual')}
            className="transition-all duration-200 text-sm"
          >
            Annual
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 text-xs">
              Save 20%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            onSubscribe={handleSubscribe}
            compact={true}
          />
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
          <div className="text-green-600 font-semibold text-sm mb-1">14-Day Free Trial</div>
          <div className="text-green-700 text-xs">No credit card required</div>
        </div>
        
        <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
          <div className="text-blue-600 font-semibold text-sm mb-1">Money-Back Guarantee</div>
          <div className="text-blue-700 text-xs">30-day guarantee on paid plans</div>
        </div>
        
        <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
          <div className="text-purple-600 font-semibold text-sm mb-1">Secure Payments</div>
          <div className="text-purple-700 text-xs">Bank-level security</div>
        </div>
      </div>
    </div>
  );
}