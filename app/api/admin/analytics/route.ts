import { NextResponse, NextRequest } from 'next/server';
import { getAnalytics } from '@/lib/sanity/queries';
import { authSession } from '@/lib/auth/server';
import { logAudit } from '@/lib/audit';

export async function GET(request: NextRequest) {
  try {
    const session = await authSession.fromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const analytics = await getAnalytics();
    logAudit('analytics_accessed');
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
