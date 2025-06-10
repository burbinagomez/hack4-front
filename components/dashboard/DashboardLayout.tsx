"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, Globe, BarChart3, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    href: '/dashboard',
    active: true
  },
  {
    title: 'Subdomains',
    icon: Globe,
    href: '/dashboard/subdomains',
    active: false
  },
  {
    title: 'Vulnerabilities',
    icon: Shield,
    href: '/dashboard/vulnerabilities',
    active: false
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    active: false
  }
];

function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col bg-card border-r", className)}>
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span>SecureDomain</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2 p-4">
        {navigationItems.map((item) => (
          <Button
            key={item.href}
            variant={item.active ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              item.active && "bg-primary text-primary-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        ))}
      </nav>
      
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <User className="h-4 w-4" />
          Profile
        </Button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div className="lg:hidden" /> {/* Spacer for mobile menu button */}
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}