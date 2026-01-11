'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DonationEvent } from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState({
    totalRaised: 0,
    activeCampaigns: 0,
    totalCampaigns: 0,
    graduated: 0,
    stableHousing: 0,
    employed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState<DonationEvent[]>([]);

  useEffect(() => {
    const verifySession = async () => {
      const res = await fetch('/api/admin/session');
      if (!res.ok) {
        router.push('/admin');
        return false;
      }
      return true;
    };

    const fetchData = async () => {
      try {
        const authed = await verifySession();
        if (!authed) return;

        const [analyticsRes, donationsRes] = await Promise.all([
          fetch('/api/admin/analytics'),
          fetch('/api/admin/donations'),
        ]);

        if (analyticsRes.ok) {
          const data = await analyticsRes.json();
          setAnalytics(data);
        }

        if (donationsRes.ok) {
          const donationData = await donationsRes.json();
          setDonations(donationData.donations || []);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
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

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-neutral-gray mb-2">Graduated Pathways</h3>
            <p className="text-3xl font-bold text-primary">{analytics.graduated}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-neutral-gray mb-2">Stable Housing (Verified)</h3>
            <p className="text-3xl font-bold text-secondary">{analytics.stableHousing}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-neutral-gray mb-2">Employed (Verified)</h3>
            <p className="text-3xl font-bold text-accent">{analytics.employed}</p>
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

        {/* Recent Donations */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-charcoal">Recent Donations (Reconciliation)</h2>
            <p className="text-sm text-neutral-gray">Pulled from webhook + Sanity log</p>
          </div>
          {donations.length === 0 ? (
            <p className="text-neutral-gray">No donations recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-sm text-neutral-gray border-b">
                    <th className="py-2 pr-4">Campaign</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Received</th>
                    <th className="py-2 pr-4">Session</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id} className="border-b last:border-0 text-sm text-neutral-charcoal">
                      <td className="py-2 pr-4">{donation.campaignSlug}</td>
                      <td className="py-2 pr-4 font-semibold">
                        ${(donation.amountCents / 100).toFixed(2)}
                      </td>
                      <td className="py-2 pr-4 capitalize">
                        {donation.donationType || 'one-time'}
                      </td>
                      <td className="py-2 pr-4">
                        {new Date(donation.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 text-xs text-neutral-gray">
                        {donation.sessionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
          <h3 className="font-semibold text-neutral-charcoal mb-3">Operational Guardrails</h3>
          <ol className="list-decimal list-inside space-y-2 text-neutral-gray">
            <li>Use Sanity to update impact fields (housing/employment status, verification, graduation date)</li>
            <li>Webhook updates amounts automatically; reconcile against Stripe dashboard if numbers drift</li>
            <li>Rotate ADMIN_PASSWORD regularly and keep ADMIN_SESSION_SECRET private</li>
            <li>Capture incident notes in your monitoring tool and notify stakeholders within 24 hours</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
