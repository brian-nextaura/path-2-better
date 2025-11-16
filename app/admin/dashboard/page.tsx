'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState({
    totalRaised: 0,
    activeCampaigns: 0,
    totalCampaigns: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }

    // Fetch analytics from Sanity
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-neutral-gray">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-neutral-charcoal">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-neutral-gray mb-2">Total Raised</h3>
            <p className="text-3xl font-bold text-primary">${analytics.totalRaised.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-neutral-gray mb-2">Active Campaigns</h3>
            <p className="text-3xl font-bold text-secondary">{analytics.activeCampaigns}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-neutral-gray mb-2">Total Campaigns</h3>
            <p className="text-3xl font-bold text-accent">{analytics.totalCampaigns}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.sanity.studio`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full" size="lg">
                Open Sanity Studio
              </Button>
            </a>
            <Link href="/campaigns">
              <Button className="w-full" variant="outline" size="lg">
                View Public Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
          <h3 className="font-semibold text-neutral-charcoal mb-3">Getting Started</h3>
          <ol className="list-decimal list-inside space-y-2 text-neutral-gray">
            <li>Click "Open Sanity Studio" to access the content management system</li>
            <li>Create new campaigns, update existing ones, or post progress updates</li>
            <li>Mark campaigns as "Funded" or "Graduated" when goals are achieved</li>
            <li>Update the "Amount Raised" field manually when donations are received</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
