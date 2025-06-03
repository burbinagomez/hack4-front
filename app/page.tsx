"use client";

import { useState } from "react";
import DomainSearchForm from "@/components/DomainSearchForm";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="space-y-4 mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Domain Lookup</h1>
            <p className="text-muted-foreground">
              Search for a domain and verify your ownership with email validation
            </p>
          </div>

          <DomainSearchForm />
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}