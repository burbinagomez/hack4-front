// app/providers.tsx
"use client"; // <-- ¡MUY IMPORTANTE! Indica que es un Client Component

import { AuthProvider } from "react-oidc-context";
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Asumiendo que ThemeProvider viene de next-themes
import { Toaster } from "@/components/ui/toaster"; // Tu componente Toaster

// Configuración de Cognito. ¡Asegúrate de que las variables de entorno estén bien definidas!
const cognitoAuthConfig = {
  authority: process.env.NEXT_PUBLIC_AUTHORITY_COGNITO!,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  response_type: "code", // Esencial para el flujo de código de autorización
  scope: "email openid", // Los scopes que solicitas
  // Si tienes un post_logout_redirect_uri:
  // post_logout_redirect_uri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
  // Otros ajustes opcionales de oidc-client-ts si los necesitas, por ejemplo:
  // automaticSilentRenew: true,
  // userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ThemeProvider debe estar aquí para que el tema sea global
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      {/* AuthProvider envuelve a toda la aplicación para proveer el contexto de autenticación */}
      <AuthProvider {...cognitoAuthConfig}>
        {children}
        <Toaster /> {/* El Toaster también es un componente de cliente y debe estar dentro de los proveedores */}
      </AuthProvider>
    </NextThemesProvider>
  );
}