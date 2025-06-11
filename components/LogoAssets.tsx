"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface LogoAssetsProps {
  className?: string;
}

export function CircularLogo({ className = "" }: LogoAssetsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show black logo during SSR and loading
  if (!mounted) {
    return (
      <img 
        src="/black_circle_360x360.png" 
        alt="Logo" 
        className={`transition-opacity duration-500 ${className}`}
      />
    );
  }

  return (
    <img 
      src={resolvedTheme === 'dark' ? "/white_circle_360x360.png" : "/black_circle_360x360.png"}
      alt="Logo" 
      className={`transition-all duration-500 ease-in-out ${className}`}
    />
  );
}

export function LogoText({ className = "" }: LogoAssetsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to showing the logo during SSR
  if (!mounted) {
    return (
      <img 
        src="/logotext_poweredby_360w.png" 
        alt="Powered by Bolt.new" 
        className={`transition-opacity duration-500 ${className}`}
      />
    );
  }

  return (
    <img 
      src="/logotext_poweredby_360w.png" 
      alt="Powered by Bolt.new" 
      className={`transition-all duration-500 ease-in-out ${className} ${
        resolvedTheme === 'dark' ? 'opacity-90 brightness-110' : 'opacity-80'
      }`}
    />
  );
}