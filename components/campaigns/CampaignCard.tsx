import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Campaign } from '@/lib/types';
import { urlForImage } from '@/lib/sanity/client';
import { Progress } from '@/components/ui/progress';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const imageUrl = campaign.profileImage
    ? urlForImage(campaign.profileImage).width(400).height(400).url()
    : '/images/placeholder-profile.jpg';

  const statusColors = {
    active: 'bg-secondary text-white',
    funded: 'bg-primary text-white',
    graduated: 'bg-accent text-white',
  };

  const statusLabels = {
    active: 'Active',
    funded: 'Funded',
    graduated: 'Graduated',
  };

  return (
    <Link href={`/campaigns/${campaign.slug.current}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative h-64 w-full">
          <Image
            src={imageUrl}
            alt={`${campaign.firstName}'s campaign`}
            fill
            className="object-cover"
          />
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[campaign.status]}`}>
            {statusLabels[campaign.status]}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-neutral-charcoal mb-1">
              {campaign.firstName}, {campaign.age}
            </h3>
            <p className="text-sm text-neutral-gray">{campaign.agency}</p>
          </div>

          <p className="text-neutral-charcoal mb-4 line-clamp-3 flex-1">
            {campaign.story}
          </p>

          <div className="mb-4 space-y-2">
            <Progress value={(campaign.amountRaised / campaign.fundingGoal) * 100} />
            <div className="flex justify-between text-sm text-neutral-gray">
              <span>${campaign.amountRaised.toLocaleString()}</span>
              <span>${campaign.fundingGoal.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-primary font-semibold hover:text-primary-dark">
            Learn more →
          </div>
        </div>
      </div>
    </Link>
  );
}
