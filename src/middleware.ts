import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (
    (request.nextUrl.pathname === '/' ||
      request.nextUrl.pathname.includes('lists') ||
      request.nextUrl.pathname === 'suggest') &&
    token === undefined
  ) {
    console.log('Redirecting to /auth, no token found.');
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    console.log('Redirecting to / as user is already authenticated.');
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  console.log('Token found or not needed, processing request...');
  return NextResponse.next();
}
