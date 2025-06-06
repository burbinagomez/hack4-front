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
import { validateDomain, validateEmailDomainMatch } from "@/lib/validation";
import OtpVerification from "@/components/OtpVerification";
import { useAuth } from "react-oidc-context";


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
      .refine((email) => validateEmailDomainMatch(email, domain), {
        message: `Email must be associated with ${domain}`,
      }),
  });
};

type DomainFormValues = z.infer<typeof domainSchema>;
type EmailFormValues = z.infer<ReturnType<typeof createEmailSchema>>;

export default function DomainSearchForm() {
  const [stage, setStage] = useState<"domain" | "email" | "otp" | "complete">("domain");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();

  useEffect(() => {
    // Only update the stage if the user is authenticated and the stage is not already 'complete'
    if (auth.isAuthenticated && stage !== "complete") {
      setStage("complete");
      // Optional: Add a toast message or other side effects here
      toast({
        title: "Authenticated",
        description: "You are already logged in.",
      });
    } else if (!auth.isAuthenticated && stage === "complete") {
        // Optional: If user logs out, revert to domain stage or another initial stage
        setStage("domain");
        resetForm(); // Reset form if user logs out
    }
  }, [auth.isAuthenticated, stage, toast])

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

  const onDomainSubmit = async (data: DomainFormValues) => {
    setIsLoading(true);
    try {
      // const response = await fetch("/api/validate-domain", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ domain: data.domain }),
      // });

      // const result = await response.json();

      // if (!response.ok) {
      //   throw new Error(result.error || "Failed to validate domain");
      // }
    
        setDomain(data.domain);
        setStage("email");
        toast({
          title: "Domain Validated",
          description: "Please enter an email associated with this domain.",
        });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Validation Failed",
        description: error instanceof Error ? error.message : "Failed to validate domain",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onEmailSubmit = async (data: EmailFormValues) => {
    setIsLoading(true);
    try {
      console.log(auth)
      if(!auth.isAuthenticated){
        const response_api = await fetch(process.env.NEXT_PUBLIC_API+"/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
        });

        const result = await response_api.json();
        console.log(result)
        
      }else{
        await auth.signoutSilent()
      }
      const response = await auth.signinRedirect()
      
      // const response = await fetch("/api/validate-email", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ domain, email: data.email }),
      // });

      // const result = await response.json();

      // console.log(response)
      

      // if (!response.ok) {
      //   throw new Error(result.error || "Failed to validate email");
      // }

      // if (result.success && result.otpSent) {
      //   setEmail(data.email);
      //   setStage("otp");
      //   toast({
      //     title: "OTP Sent",
      //     description: "Please check your email for the verification code.",
      //   });
      // }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Email Validation Failed",
        description: error instanceof Error ? error.message : "Failed to validate email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    domainForm.reset();
    emailForm.reset();
    setStage("domain");
    setDomain("");
    setEmail("");
  };

  return (
    <AnimatePresence mode="wait">

      {stage === "domain" && (
        <motion.div
          key="domain-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Search Domain</CardTitle>
              <CardDescription>Enter a domain to start verification</CardDescription>
            </CardHeader>
            <Form {...domainForm}>
              <form onSubmit={domainForm.handleSubmit(onDomainSubmit)}>
                <CardContent>
                  <FormField
                    control={domainForm.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <FormControl>
                          <Input placeholder="example.com" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      "Search Domain"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </motion.div>
      )}

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
                          <Input placeholder={`yourname@${domain}`} {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                    Back
                  </Button>
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
          onComplete={resetForm} 
        />
      )}

      {stage === "complete" && (
        <motion.div
          key="domain-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Search Domain</CardTitle>
              <CardDescription>Report in proccess, please verify your email</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}