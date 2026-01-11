import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const cookie = serialize('donor_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Expire immediately
    path: '/',
  });

  return NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
      },
    }
  );
}
