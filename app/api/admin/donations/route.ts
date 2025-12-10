import { NextRequest, NextResponse } from 'next/server';
import { authSession } from '@/lib/auth/server';
import { getRecentDonations } from '@/lib/sanity/queries';

export async function GET(request: NextRequest) {
  try {
    const session = await authSession.fromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const donations = await getRecentDonations(20);
    return NextResponse.json({ donations });
  } catch (error) {
    console.error('Error fetching donations', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}
