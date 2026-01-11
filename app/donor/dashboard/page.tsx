'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DonationEvent, User } from '@/lib/types';
import { Heart, Settings, LogOut } from 'lucide-react';

export default function DonorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [donations, setDonations] = useState<DonationEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check authentication
        const authRes = await fetch('/api/auth/me');
        if (!authRes.ok) {
          router.push('/auth/login?redirect=/donor/dashboard');
          return;
        }

        const authData = await authRes.json();
        setUser(authData.user);

        // Fetch donor donations (would need API endpoint)
        // For now, just set empty
        setDonations([]);
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/auth/login?redirect=/donor/dashboard');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-charcoal">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-gray-600">Manage your donations and preferences</p>
          </div>
          <div className="flex gap-2">
            <Link href="/donor/preferences">
              <Button variant="ghost">
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary" />
                Total Donated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                ${donations.reduce((sum, d) => sum + d.amountCents / 100, 0).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mt-1">{donations.length} donations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                ${donations
                  .filter((d) => d.donationType === 'monthly')
                  .reduce((sum) => sum + 1, 0) * 25}
                /month
              </p>
              <p className="text-sm text-gray-600 mt-1">Active subscriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{donations.length}</p>
              <p className="text-sm text-gray-600 mt-1">Lives you&apos;re supporting</p>
            </CardContent>
          </Card>
        </div>

        {/* Donation History */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Donation History</CardTitle>
              <Link href="/campaigns">
                <Button>Make Another Donation</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You haven&apos;t made any donations yet</p>
                <Link href="/campaigns">
                  <Button>Browse Campaigns</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Campaign</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                        <tr key={donation._id} className="border-b">
                        <td className="py-3">{donation.campaignSlug}</td>
                        <td className="py-3">${(donation.amountCents / 100).toFixed(2)}</td>
                        <td className="py-3 capitalize">{donation.donationType}</td>
                        <td className="py-3">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
