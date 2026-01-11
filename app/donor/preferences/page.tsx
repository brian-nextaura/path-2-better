'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { User } from '@/lib/types';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function PreferencesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState({
    donationConfirmations: true,
    campaignUpdates: true,
    platformNews: true,
    recurringReminders: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const authRes = await fetch('/api/auth/me');
        if (!authRes.ok) {
          router.push('/auth/login?redirect=/donor/preferences');
          return;
        }

        const authData = await authRes.json();
        setUser(authData.user);
        setPreferences(authData.user.emailPreferences);
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/donor/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      setSaveMessage('Preferences saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save preferences. Please try again.');
      console.error('Error saving preferences:', error);
    } finally {
      setIsSaving(false);
    }
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

  const preferenceOptions = [
    {
      key: 'donationConfirmations',
      title: 'Donation Confirmations',
      description: 'Receive an email confirmation whenever you make a donation',
    },
    {
      key: 'campaignUpdates',
      title: 'Campaign Updates',
      description: 'Get updates when beneficiaries you support share progress or milestones',
    },
    {
      key: 'recurringReminders',
      title: 'Monthly Subscription Reminders',
      description: 'Receive a summary of your active monthly donations',
    },
    {
      key: 'platformNews',
      title: 'Platform News & Features',
      description: 'Learn about new campaigns, features, and stories from Path2Better',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/donor/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-neutral-charcoal">
            Email Preferences
          </h1>
          <p className="text-gray-600">Manage how we communicate with you</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Communication Settings</CardTitle>
            <CardDescription>
              Choose which types of emails you&apos;d like to receive from Path2Better
            </CardDescription>
          </CardHeader>

          <CardContent>
            {saveMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                {saveMessage}
              </div>
            )}

            <div className="space-y-4">
              {preferenceOptions.map((option) => (
                <div
                  key={option.key}
                  className="border border-gray-200 rounded-lg p-4 flex items-start gap-4"
                >
                  <input
                    type="checkbox"
                    id={option.key}
                    checked={preferences[option.key as keyof typeof preferences]}
                    onChange={() => handleToggle(option.key as keyof typeof preferences)}
                    className="w-5 h-5 mt-1 accent-primary rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor={option.key} className="block font-semibold text-neutral-charcoal cursor-pointer">
                      {option.title}
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="mt-6 w-full"
              size="lg"
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>

        {/* Unsubscribe All */}
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Unsubscribe From All</CardTitle>
            <CardDescription>
              Stop receiving all emails from Path2Better
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              If you&apos;d prefer not to receive any emails from us, you can unsubscribe completely below. You&apos;ll still receive donation confirmations and essential account notifications.
            </p>
            <Button variant="destructive">
              Unsubscribe From All Emails
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
