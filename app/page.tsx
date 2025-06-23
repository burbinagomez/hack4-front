// app/page.tsx
"use client"; // <-- Necesario porque DomainSearchForm usa hooks como useAuth, useState, etc.

import DomainSearchForm from "@/components/DomainSearchForm";
import HomePricingSection from "@/components/home/HomePricingSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CircularLogo, LogoText } from "@/components/LogoAssets";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative transition-colors duration-500">
      {/* Theme Toggle - Top Left */}
      <div className="absolute top-5 left-5 z-10">
        <ThemeToggle />
      </div>

      {/* Circular Logo - Top Right */}
      <CircularLogo className="absolute top-5 right-5 w-20 h-20 rounded-full" />

      {/* Main Content Container */}
      <div className="w-full max-w-6xl mx-auto space-y-16">
        {/* Domain Search Section */}
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md mx-auto">
            <div className="space-y-4 mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight transition-colors duration-300">
                Domain Lookup
              </h1>
              <p className="text-muted-foreground transition-colors duration-300">
                Search vulnerabilities in your domain
              </p>
            </div>

            <DomainSearchForm />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-16 border-t border-border/50">
          <HomePricingSection />
        </div>
      </div>

      {/* Logo Text - Bottom Center */}
      <LogoText className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48" />
    </main>
  );
}