// app/page.tsx
"use client"; // <-- Necesario porque DomainSearchForm usa hooks como useAuth, useState, etc.

import DomainSearchForm from "@/components/DomainSearchForm";
// Ya no necesitas importar ThemeProvider, Toaster ni AuthProvider aquí,
// porque ya están en app/providers.tsx

export default function Home() {
  return (
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
  );
}