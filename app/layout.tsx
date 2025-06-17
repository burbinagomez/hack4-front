// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers'; // Importa tu componente de proveedores

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker4me', // Actualiza tu título
  description: 'Find vulnerabilities in your projects', // Actualiza tu descripción
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {/* Envuelve toda la aplicación con tus proveedores */}
          {children}
        </Providers>
      </body>
    </html>
  );
}