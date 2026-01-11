import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { client } from '@/lib/sanity/client';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('donor_session');

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Decode session
    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString());
    const { userId } = sessionData;

    // Fetch user from Sanity
    const user = await client.getDocument(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user without password hash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Failed to check authentication' },
      { status: 500 }
    );
  }
}
