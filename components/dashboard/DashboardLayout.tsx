"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, Shield, Globe, BarChart3, Settings, User, LogOut, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    href: '/dashboard'
  },
  {
    title: 'Subdomains',
    icon: Globe,
    href: '/dashboard/subdomains'
  },
  {
    title: 'Vulnerabilities',
    icon: Shield,
    href: '/dashboard/vulnerabilities'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings'
  }
];

interface SidebarProps {
  className?: string;
  currentUser: SupabaseUser | null;
  onSignOut: () => void;
  isLoading: boolean;
  currentPath: string;
  onLinkClick?: () => void;
}

function Sidebar({ className, currentUser, onSignOut, isLoading, currentPath, onLinkClick }: SidebarProps) {
  const getUserInitials = (email: string): string => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const getUserDisplayName = (email: string): string => {
    return email.split('@')[0];
  };

  return (
    <div className={cn("flex h-full flex-col bg-card border-r", className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
          <Shield className="h-6 w-6 text-primary" />
          <span>SecureDomain</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-2 p-4">
        {navigationItems.map((item: NavigationItem) => {
          const isActive: boolean = currentPath === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onLinkClick}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 transition-colors",
                  isActive && "bg-primary text-primary-foreground shadow-sm"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : currentUser ? (
          <>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.user_metadata?.avatar_url} />
                <AvatarFallback className="text-xs font-medium">
                  {getUserInitials(currentUser.email || '')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {currentUser.user_metadata?.full_name || getUserDisplayName(currentUser.email || '')}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="ghost" className="w-full justify-start gap-2">
            <User className="h-4 w-4" />
            Not Authenticated
          </Button>
        )}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname: string = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    let mounted: boolean = true;

    const getSession = async (): Promise<void> => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            router.push('/');
          }
          return;
        }

        if (mounted) {
          if (session?.user) {
            setCurrentUser(session.user);
          } else {
            router.push('/');
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        if (mounted) {
          router.push('/');
        }
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_OUT' || !session) {
          setCurrentUser(null);
          router.push('/');
        } else if (event === 'SIGNED_IN' && session?.user) {
          setCurrentUser(session.user);
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      
      router.push('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: error.message || "Failed to sign out",
      });
    }
  };

  const getPageTitle = (): string => {
    const currentItem: NavigationItem | undefined = navigationItems.find(item => item.href === pathname);
    return currentItem ? currentItem.title : 'Dashboard';
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64">
        <Sidebar 
          currentUser={currentUser} 
          onSignOut={handleSignOut}
          isLoading={isLoading}
          currentPath={pathname}
        />
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
          <Sidebar 
            currentUser={currentUser} 
            onSignOut={handleSignOut}
            isLoading={isLoading}
            currentPath={pathname}
            onLinkClick={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div className="lg:hidden" /> {/* Spacer for mobile menu button */}
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Welcome back,</span>
                <span className="font-medium text-foreground">
                  {currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0]}
                </span>
              </div>
            )}

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