import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { client } from '@/lib/sanity/client';
import { z } from 'zod';

const preferencesSchema = z.object({
  preferences: z.object({
    donationConfirmations: z.boolean(),
    campaignUpdates: z.boolean(),
    platformNews: z.boolean(),
    recurringReminders: z.boolean(),
  }),
});

export async function PUT(request: NextRequest) {
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

    // Parse and validate request
    const body = await request.json();
    const { preferences } = preferencesSchema.parse(body);

    // Update user preferences in Sanity
    const updatedUser = await client
      .patch(userId)
      .set({
        emailPreferences: preferences,
        updatedAt: new Date().toISOString(),
      })
      .commit();

    return NextResponse.json(
      { message: 'Preferences updated successfully', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid preferences' },
        { status: 400 }
      );
    }

    console.error('Error updating preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}
