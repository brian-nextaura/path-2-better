import { getAllCampaigns } from '@/lib/sanity/queries';
import CampaignsBrowser from '@/components/campaigns/CampaignsBrowser';

export const metadata = {
  title: 'Browse Campaigns - Path2Better',
  description: 'Browse all active campaigns supporting neighbours on their path to better in Peterborough, Ontario.',
};

export const revalidate = 60;

export default async function CampaignsPage() {
  const campaigns = await getAllCampaigns('active');

  return <CampaignsBrowser campaigns={campaigns} />;
}
