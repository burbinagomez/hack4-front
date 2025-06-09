"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { validateDomain } from "@/lib/validation";
import OtpVerification from "@/components/OtpVerification";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

// Define the form schemas for different stages
const domainSchema = z.object({
  domain: z.string().min(1, "Domain is required").refine(validateDomain, {
    message: "Please enter a valid domain (e.g. example.com)",
  }),
});

const createEmailSchema = (domain: string) => {
  return z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      // .refine((email) => validateEmailDomainMatch(email, domain), {
      //   message: `Email must be associated with ${domain}`,
      // }),
  });
};

type DomainFormValues = z.infer<typeof domainSchema>;
type EmailFormValues = z.infer<ReturnType<typeof createEmailSchema>>;

export default function DomainSearchForm() {
  const [stage, setStage] = useState<"email" | "otp" | "complete">("email");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setStage("complete");
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          setStage("complete");
          toast({
            title: "Authentication Successful",
            description: "You have been successfully authenticated.",
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setStage("email");
          resetForm();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [toast]);

  // Domain form
  const domainForm = useForm<DomainFormValues>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: "",
    },
  });

  // Email form (created dynamically based on domain)
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(createEmailSchema(domain)),
    defaultValues: {
      email: "",
    },
  });

  const onEmailSubmit = async (data: EmailFormValues) => {
    setIsLoading(true);
    try {
      // Send OTP using Supabase
      setDomain(data.email.split("@")[1])
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            domain: window.location.origin,
          }
        }
      });

      if (error) {
        throw error;
      }

      setEmail(data.email);
      setStage("otp");
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Email Validation Failed",
        description: error.message || "Failed to send verification code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    emailForm.reset();
    setStage("email");
    setDomain("");
    setEmail("");
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: error.message || "Failed to sign out",
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {stage === "email" && (
        <motion.div
          key="email-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Verify Email</CardTitle>
              <CardDescription>Enter an email associated with {domain}</CardDescription>
            </CardHeader>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                <CardContent>
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder={`yourname@example.com`} {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Send Verification Code"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </motion.div>
      )}

      {stage === "otp" && (
        <OtpVerification 
          email={email} 
          domain={domain} 
          onBack={() => setStage("email")} 
          onComplete={() => setStage("complete")} 
        />
      )}

      {stage === "complete" && (
        <motion.div
          key="complete-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Authentication Complete</CardTitle>
              <CardDescription>
                Welcome! Your domain verification is in progress.
                {user?.email && ` Authenticated as: ${user.email}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    ✅ Authentication successful! Your report is being processed.
                  </p>
                </div>
                {domain && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      📊 Domain: <strong>{domain}</strong>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleSignOut} className="w-full">
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}