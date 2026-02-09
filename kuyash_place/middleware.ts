import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token') || request.cookies.get('__Secure-authjs.session-token');
  const isLoggedIn = !!token;
  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isOnLogin = request.nextUrl.pathname.startsWith('/login');

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|menu).*)'],
};
