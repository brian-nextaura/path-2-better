import { NextResponse, NextRequest } from 'next/server';
import { authSession } from './lib/auth/server';

const PUBLIC_PATHS = ['/admin', '/api/admin/login', '/api/admin/logout', '/api/admin/session'];

const isPublicPath = (path: string) =>
  PUBLIC_PATHS.includes(path) ||
  path.startsWith('/_next') ||
  path.startsWith('/api/health') ||
  path.startsWith('/favicon') ||
  path.startsWith('/fonts') ||
  path.startsWith('/images');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminAppRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');

  if (!isAdminAppRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  let session = null;
  try {
    session = await authSession.fromRequest(request);
  } catch (error) {
    console.error('Auth error', error);
  }

  if (!session) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
