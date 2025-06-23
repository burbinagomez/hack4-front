"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Subscription, Customer, PaymentMethod, Invoice } from '@/types/subscription';
import { PLAN_FEATURES } from '@/lib/stripe';
import { format } from 'date-fns';

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPortal, setIsCreatingPortal] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    loadBillingData();
    
    // Check for successful checkout
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      toast({
        title: "Payment Successful!",
        description: "Your subscription has been activated. Welcome aboard!",
      });
    }
  }, [searchParams, toast]);

  const loadBillingData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load subscription data
      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (subData) {
        setSubscription(subData);
      }

      // Load customer data
      const { data: custData } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (custData) {
        setCustomer(custData);
      }

    } catch (error) {
      console.error('Error loading billing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsCreatingPortal(true);
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create portal session');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to open billing portal",
      });
    } finally {
      setIsCreatingPortal(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: 'bg-green-100 text-green-800 border-green-200',
      trialing: 'bg-blue-100 text-blue-800 border-blue-200',
      past_due: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      canceled: 'bg-red-100 text-red-800 border-red-200',
      unpaid: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
      <Badge variant="secondary" className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPlanName = (planId: string) => {
    const names: Record<string, string> = {
      basic: 'Basic Plan',
      professional: 'Professional Plan',
      enterprise: 'Enterprise Plan',
    };
    return names[planId] || planId;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading billing information...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
            <p className="text-muted-foreground">
              Manage your subscription, payment methods, and billing history
            </p>
          </div>
          
          {subscription && (
            <Button 
              onClick={handleManageBilling}
              disabled={isCreatingPortal}
              className="flex items-center gap-2"
            >
              {isCreatingPortal ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Settings className="h-4 w-4" />
              )}
              Manage Billing
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
            <CardDescription>
              Your current plan and subscription details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {subscription ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{getPlanName(subscription.plan_id)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {subscription.cancel_at_period_end 
                        ? 'Cancels at period end' 
                        : 'Active subscription'
                      }
                    </p>
                  </div>
                  {getStatusBadge(subscription.status)}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Current period:</span>
                    </div>
                    <p className="text-sm font-medium">
                      {format(new Date(subscription.current_period_start), 'MMM dd, yyyy')} - {' '}
                      {format(new Date(subscription.current_period_end), 'MMM dd, yyyy')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Next billing date:</span>
                    </div>
                    <p className="text-sm font-medium">
                      {format(new Date(subscription.current_period_end), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {subscription.cancel_at_period_end && (
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-yellow-800">Subscription Ending</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your subscription will end on {format(new Date(subscription.current_period_end), 'MMM dd, yyyy')}. 
                        You can reactivate it anytime before then.
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Plan Features */}
                <div>
                  <h4 className="font-semibold mb-3">Plan Features</h4>
                  <div className="grid gap-3">
                    {PLAN_FEATURES[subscription.plan_id as keyof typeof PLAN_FEATURES]?.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
                <p className="text-muted-foreground mb-4">
                  You're currently on the free Basic plan. Upgrade to unlock more features.
                </p>
                <Button asChild>
                  <a href="/pricing">View Plans</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        {subscription && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Your default payment method for subscription billing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <CreditCard className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Payment method managed by Stripe</p>
                    <p className="text-sm text-muted-foreground">
                      Update your payment method through the billing portal
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleManageBilling}
                  disabled={isCreatingPortal}
                >
                  {isCreatingPortal ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Update'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Billing History */}
        {subscription && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Billing History
              </CardTitle>
              <CardDescription>
                Download invoices and view payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Billing History</h3>
                <p className="text-muted-foreground mb-4">
                  Access your complete billing history and download invoices through the Stripe billing portal.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleManageBilling}
                  disabled={isCreatingPortal}
                >
                  {isCreatingPortal ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <ExternalLink className="h-4 w-4 mr-2" />
                  )}
                  View Billing History
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upgrade/Downgrade */}
        {!subscription || subscription.plan_id === 'basic' ? (
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Upgrade?</h3>
              <p className="text-muted-foreground mb-6">
                Unlock advanced security features and protect more domains with our Professional or Enterprise plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/pricing">View All Plans</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard">Continue with Basic</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Need to Change Your Plan?</h3>
              <p className="text-muted-foreground mb-6">
                Upgrade, downgrade, or cancel your subscription through our billing portal.
              </p>
              <Button 
                onClick={handleManageBilling}
                disabled={isCreatingPortal}
              >
                {isCreatingPortal ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Settings className="h-4 w-4 mr-2" />
                )}
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}