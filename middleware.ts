import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();

    // Handle authentication errors
    if (error) {
      console.error('Middleware auth error:', error);
      // Redirect to home page on auth error
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Check if user is accessing dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      // If no session exists, redirect to home page
      if (!session) {
        const redirectUrl = new URL('/', req.url);
        // Add a query parameter to indicate redirect reason
        redirectUrl.searchParams.set('auth', 'required');
        return NextResponse.redirect(redirectUrl);
      }

      // Optional: Check if user email is verified
      if (session.user && !session.user.email_confirmed_at) {
        const redirectUrl = new URL('/', req.url);
        redirectUrl.searchParams.set('auth', 'verify-email');
        return NextResponse.redirect(redirectUrl);
      }
    }

    // If user is authenticated and trying to access home page, 
    // optionally redirect to dashboard
    if (req.nextUrl.pathname === '/' && session) {
      // Only redirect if there's no specific query parameters
      if (!req.nextUrl.search) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // On any error, redirect to home page
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};