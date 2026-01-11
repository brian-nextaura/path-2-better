import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hashPassword, findUserByEmail, createUser } from '@/lib/auth';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  userType: z.enum(['donor', 'agency_admin']).default('donor'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, userType } = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await createUser(email, passwordHash, firstName, lastName, userType === 'agency_admin' ? 'agency_admin' : 'donor');

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
