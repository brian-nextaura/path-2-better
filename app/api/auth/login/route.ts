import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail, verifyPassword } from '@/lib/auth';
import { serialize } from 'cookie';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.passwordHash || '');
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session cookie (simplified - in production use proper session management)
    const sessionData = JSON.stringify({
      userId: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    });

    const cookie = serialize('donor_session', Buffer.from(sessionData).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          role: user.role,
        },
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to log in' },
      { status: 500 }
    );
  }
}
