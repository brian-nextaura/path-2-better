import Link from 'next/link';
import { getFeaturedCampaigns } from '@/lib/sanity/queries';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { Button } from '@/components/ui/button';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const featuredCampaigns = await getFeaturedCampaigns(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Everyone deserves a path to better
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your community can help build it.
            </p>
            <p className="text-lg mb-8 text-blue-50">
              Support verified pathways to housing stability and employment for neighbours
              experiencing homelessness in Peterborough, Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/campaigns">
                <Button size="lg" variant="secondary">
                  Browse All Campaigns
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-charcoal">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-charcoal">Browse Verified Campaigns</h3>
              <p className="text-neutral-gray">
                Every campaign is created and verified by trusted local agencies supporting
                people on their journey to stable housing and employment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-charcoal">Choose Your Support</h3>
              <p className="text-neutral-gray">
                Make a one-time donation or become a monthly sponsor. See exactly where your
                contribution goes with transparent budget breakdowns.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-charcoal">Track Progress Together</h3>
              <p className="text-neutral-gray">
                Receive updates from caseworkers as people achieve their goals - from securing
                housing to landing stable employment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      {featuredCampaigns.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-charcoal">
                Featured Campaigns
              </h2>
              <Link href="/campaigns" className="text-primary hover:text-primary-dark font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner Agencies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-neutral-charcoal">
            Our Partner Agencies
          </h2>
          <p className="text-center text-neutral-gray mb-12 max-w-2xl mx-auto">
            Path2Better works with trusted local organizations in Peterborough who verify
            campaigns and provide ongoing support to participants.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center p-4">
              <p className="font-semibold text-neutral-charcoal">YES Shelter for Youth and Families</p>
            </div>
            <div className="text-center p-4">
              <p className="font-semibold text-neutral-charcoal">Brock Mission</p>
            </div>
            <div className="text-center p-4">
              <p className="font-semibold text-neutral-charcoal">Fourcast</p>
            </div>
            <div className="text-center p-4">
              <p className="font-semibold text-neutral-charcoal">Peterborough Housing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Browse active campaigns and support your neighbours on their path to better.
          </p>
          <Link href="/campaigns">
            <Button size="lg" variant="secondary">
              Browse All Campaigns
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
