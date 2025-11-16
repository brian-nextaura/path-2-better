import { getAllCampaigns } from '@/lib/sanity/queries';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { CampaignFilters } from '@/components/campaigns/CampaignFilters';

export const metadata = {
  title: 'Browse Campaigns - Path2Better',
  description: 'Browse all active campaigns supporting neighbours on their path to better in Peterborough, Ontario.',
};

export const revalidate = 60;

interface SearchParams {
  status?: 'active' | 'funded' | 'graduated';
}

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const status = params.status;
  const campaigns = await getAllCampaigns(status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-charcoal mb-4">
          {status ? `${status.charAt(0).toUpperCase() + status.slice(1)} Campaigns` : 'All Campaigns'}
        </h1>
        <p className="text-lg text-neutral-gray">
          Support verified pathways to housing stability and employment for your neighbours.
        </p>
      </div>

      <CampaignFilters currentStatus={status} />

      {campaigns.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-neutral-gray mb-4">
            No campaigns found.
          </p>
          <p className="text-neutral-gray">
            Check back soon for new campaigns or adjust your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
