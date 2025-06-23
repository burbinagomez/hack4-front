"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { PricingPlan, BillingCycle } from '@/types/pricing';
import { cn } from '@/lib/utils';
import StripeCheckout from './StripeCheckout';
import { useToast } from '@/hooks/use-toast';

interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  onSubscribe: (planId: string) => void;
}

const planIcons = {
  basic: Shield,
  professional: Zap,
  enterprise: Star
};

export default function PricingCard({ plan, billingCycle, onSubscribe }: PricingCardProps) {
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
        : "border-border hover:border-primary/50"
    )}>
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1 text-sm font-semibold">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {plan.description}
        </CardDescription>
        
        <div className="mt-4">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold tracking-tight">
              ${price}
            </span>
            {price > 0 && (
              <span className="text-muted-foreground">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            )}
          </div>
          
          {billingCycle === 'annual' && savings > 0 && (
            <div className="mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                Save {savings}% annually
              </Badge>
            </div>
          )}
          
          {price === 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              Forever free
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-muted-foreground leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Domains:</span>
              <div className="font-semibold">
                {plan.maxDomains === 'unlimited' ? 'Unlimited' : plan.maxDomains}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Scans/month:</span>
              <div className="font-semibold">
                {plan.maxScansPerMonth === 'unlimited' ? 'Unlimited' : plan.maxScansPerMonth}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        {plan.id === 'basic' ? (
          <Button 
            className="w-full font-semibold transition-all duration-200"
            variant={plan.buttonVariant}
            size="lg"
            onClick={handleBasicPlan}
          >
            {plan.buttonText}
          </Button>
        ) : plan.id === 'enterprise' ? (
          <Button 
            className="w-full font-semibold transition-all duration-200"
            variant={plan.buttonVariant}
            size="lg"
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
              plan.highlighted && "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            )}
            variant={plan.buttonVariant}
            size="lg"
          >
            {plan.buttonText}
          </StripeCheckout>
        )}
      </CardFooter>
    </Card>
  );
}