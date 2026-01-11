'use client';

import React, { useState } from 'react';
import { Campaign } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface DonationSidebarProps {
  campaign: Campaign;
}

export function DonationSidebar({ campaign }: DonationSidebarProps) {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const presetAmounts = [10, 25, 50, 100];

  const handleDonate = async () => {
    setIsLoading(true);

    try {
      const donationAmount = customAmount ? parseFloat(customAmount) : amount;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(donationAmount * 100), // Convert to cents
          campaignSlug: campaign.slug.current,
          campaignName: `${campaign.firstName}, ${campaign.age}`,
          donationType,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFunded = campaign.status === 'funded' || campaign.status === 'graduated';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-2xl font-bold text-neutral-charcoal mb-6">Support This Campaign</h3>

      {isFunded ? (
        <div className="bg-secondary/10 border-2 border-secondary rounded-lg p-6 text-center">
          <p className="text-lg font-semibold text-secondary mb-2">
            {campaign.status === 'funded' ? 'Fully Funded!' : 'Successfully Graduated!'}
          </p>
          <p className="text-neutral-gray">
            {campaign.status === 'funded'
              ? 'This campaign has reached its funding goal.'
              : 'This person has successfully completed their journey.'}
          </p>
        </div>
      ) : (
        <>
          {/* Donation Type */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setDonationType('one-time')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                donationType === 'one-time'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral-charcoal hover:bg-gray-200'
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => setDonationType('monthly')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                donationType === 'monthly'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral-charcoal hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-charcoal mb-3">
              {donationType === 'monthly' ? 'Monthly Amount' : 'Donation Amount'}
            </label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                    amount === preset && !customAmount
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-neutral-charcoal hover:bg-gray-200'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              min="1"
            />
          </div>

          {/* Donate Button */}
          <Button
            onClick={handleDonate}
            disabled={isLoading || (!customAmount && !amount)}
            className="w-full mb-4"
            size="lg"
          >
            {isLoading
              ? 'Processing...'
              : `Donate $${customAmount || amount}${donationType === 'monthly' ? '/month' : ''}`}
          </Button>

          {donationType === 'monthly' && (
            <p className="text-xs text-neutral-gray text-center mb-4">
              You can cancel your monthly sponsorship anytime.
            </p>
          )}

          {/* Trust Signals */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-start">
              <span className="text-secondary mr-2">✓</span>
              <span className="text-sm text-neutral-gray">
                Verified by {campaign.agency}
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-secondary mr-2">✓</span>
              <span className="text-sm text-neutral-gray">Secure payment via Stripe</span>
            </div>
            <div className="flex items-start">
              <span className="text-secondary mr-2">✓</span>
              <span className="text-sm text-neutral-gray">100% goes to support</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
