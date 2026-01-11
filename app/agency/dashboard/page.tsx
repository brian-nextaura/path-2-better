'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Campaign, User } from '@/lib/types';
import { BarChart3, Plus, LogOut, Edit2, Trash2 } from 'lucide-react';

export default function AgencyDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check authentication
        const authRes = await fetch('/api/auth/me');
        if (!authRes.ok) {
          router.push('/auth/login?redirect=/agency/dashboard');
          return;
        }

        const authData = await authRes.json();
        const currentUser = authData.user;

        // Check if user is agency admin
        if (currentUser.role !== 'agency_admin') {
          router.push('/donor/dashboard');
          return;
        }

        setUser(currentUser);

        // Fetch agency campaigns (would need API endpoint)
        // For now, just set empty
        setCampaigns([]);
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/auth/login?redirect=/agency/dashboard');
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

  const totalRaised = campaigns.reduce((sum, c) => sum + c.amountRaised, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const totalBeneficiaries = campaigns.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-charcoal">
              Agency Dashboard
            </h1>
            <p className="text-gray-600">Manage your campaigns and beneficiaries</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Total Raised
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                ${totalRaised.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">Across all campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{activeCampaigns}</p>
              <p className="text-sm text-gray-600 mt-1">Campaigns in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beneficiaries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{totalBeneficiaries}</p>
              <p className="text-sm text-gray-600 mt-1">People you&apos;re supporting</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Your Campaigns</CardTitle>
              <Link href="/agency/campaigns/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Campaign
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You haven&apos;t created any campaigns yet</p>
                <Link href="/agency/campaigns/new">
                  <Button>Create Your First Campaign</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Beneficiary</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Raised</th>
                      <th className="text-left py-2">Goal</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign._id} className="border-b">
                        <td className="py-3">{campaign.firstName}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary capitalize">
                            {campaign.status}
                          </span>
                        </td>
                        <td className="py-3">${campaign.amountRaised.toLocaleString()}</td>
                        <td className="py-3">${campaign.fundingGoal.toLocaleString()}</td>
                        <td className="py-3 flex gap-2">
                          <Link href={`/agency/campaigns/${campaign._id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => {
                              if (confirm(`Delete ${campaign.firstName}'s campaign?`)) {
                                // Handle delete
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
