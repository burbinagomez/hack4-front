// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DomainSearchForm from "@/components/DomainSearchForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authMessage, setAuthMessage] = useState<{
    type: 'error' | 'info' | 'success';
    message: string;
  } | null>(null);

  useEffect(() => {
    // Check for auth-related query parameters
    const authParam = searchParams.get('auth');
    
    if (authParam === 'required') {
      setAuthMessage({
        type: 'info',
        message: 'Please authenticate to access the dashboard.'
      });
    } else if (authParam === 'verify-email') {
      setAuthMessage({
        type: 'error',
        message: 'Please verify your email address before accessing the dashboard.'
      });
    }

    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && !authParam) {
        // User is authenticated and no auth message, redirect to dashboard
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [searchParams, router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="space-y-4 mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Domain Lookup</h1>
          <p className="text-muted-foreground">
            Search vulnerabilities in your domain
          </p>
        </div>

        {/* Auth message alert */}
        {authMessage && (
          <div className="mb-6">
            <Alert variant={authMessage.type === 'error' ? 'destructive' : 'default'}>
              {authMessage.type === 'error' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription>{authMessage.message}</AlertDescription>
            </Alert>
          </div>
        )}

        <DomainSearchForm />
      </div>
    </main>
  );
}