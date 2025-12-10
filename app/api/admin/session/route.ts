import { NextRequest, NextResponse } from 'next/server';
import { authSession } from '@/lib/auth/server';

export async function GET(request: NextRequest) {
  try {
    const session = await authSession.fromRequest(request);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      role: session.role,
      issuedAt: session.issuedAt,
    });
  } catch (error) {
    console.error('Session check failed', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
