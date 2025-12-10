import { NextRequest, NextResponse } from 'next/server';
import { authSession } from '@/lib/auth/server';
import { logAudit } from '@/lib/audit';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = body?.password as string | undefined;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (!password || password !== adminPassword) {
    logAudit('admin_login_failed', { ip });
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  try {
    const token = await authSession.create();
    const response = NextResponse.json({ success: true });
    response.cookies.set(authSession.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    logAudit('admin_login_success', { ip });
    return response;
  } catch (error) {
    console.error('Failed to create session', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
