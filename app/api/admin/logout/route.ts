import { NextResponse } from 'next/server';
import { authSession } from '@/lib/auth/server';
import { logAudit } from '@/lib/audit';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(authSession.cookieName, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  logAudit('admin_logout');
  return response;
}
