"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import type { AuthError } from "@supabase/supabase-js";

interface OtpVerificationProps {
  email: string;
  domain: string;
  onBack: () => void;
  onComplete: () => void;
}

export default function OtpVerification({ email, domain, onBack, onComplete }: OtpVerificationProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const headers = new Headers();
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || ""
        headers.append("Content-Type", "application/json");
        headers.append("x-api-key", apiKey);
        fetch(process.env.NEXT_PUBLIC_API+"/report",{
          method: "POST",
          headers,
          body: JSON.stringify({ email }),
        })
        
        toast({
          title: "Verification Successful",
          description: "Your email has been verified. Redirecting to dashboard...",
        });
        
        onComplete();
        
        // Redirect to dashboard after successful verification
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error: any) {
      const authError = error as AuthError;
      let errorMessage = "Failed to verify OTP";
      
      // Handle specific Supabase auth errors
      if (authError.message) {
        if (authError.message.includes('expired')) {
          errorMessage = "The verification code has expired. Please request a new one.";
        } else if (authError.message.includes('invalid')) {
          errorMessage = "Invalid verification code. Please check and try again.";
        } else {
          errorMessage = authError.message;
        }
      }

      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            domain: domain,
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "OTP Resent",
        description: "Please check your email for the new verification code.",
      });
      
      // Clear the current OTP input
      setOtp("");
    } catch (error: any) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Failed to Resend",
        description: authError.message || "Failed to resend verification code",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify OTP</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            disabled={isLoading}
          >
            <InputOTPGroup>
              {Array.from({ length: 6 }, (_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-center">
          <Button
            variant="link"
            size="sm"
            className="text-sm text-muted-foreground"
            onClick={handleResend}
            disabled={isResending || isLoading}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Resending...
              </>
            ) : (
              "Didn't receive code? Resend"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <Button 
          className="flex-1" 
          onClick={handleVerify} 
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}