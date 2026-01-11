'use client';

import Link from 'next/link';

interface CampaignFiltersProps {
  currentStatus?: string;
}

export function CampaignFilters({ currentStatus }: CampaignFiltersProps) {
  const filters = [
    { label: 'All Campaigns', value: undefined },
    { label: 'Active', value: 'active' },
    { label: 'Funded', value: 'funded' },
    { label: 'Graduated', value: 'graduated' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {filters.map((filter) => {
        const isActive = currentStatus === filter.value;
        const href = filter.value ? `/campaigns?status=${filter.value}` : '/campaigns';

        return (
          <Link
            key={filter.label}
            href={href}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-neutral-charcoal hover:bg-gray-100 border-2 border-gray-200'
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}
