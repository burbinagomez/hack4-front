// app/providers.tsx
"use client"; // <-- ¡MUY IMPORTANTE! Indica que es un Client Component

import { ThemeProvider as NextThemesProvider } from "next-themes"; // Asumiendo que ThemeProvider viene de next-themes
import { Toaster } from "@/components/ui/toaster"; // Tu componente Toaster

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ThemeProvider debe estar aquí para que el tema sea global
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
      <Toaster /> {/* El Toaster también es un componente de cliente y debe estar dentro de los proveedores */}
    </NextThemesProvider>
  );
}