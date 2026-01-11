import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCampaignBySlug } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/client';
import { Progress } from '@/components/ui/progress';
import { DonationSidebar } from '@/components/campaigns/DonationSidebar';
import { SocialShareButtons } from '@/components/campaigns/SocialShareButtons';
import Markdown from 'react-markdown';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    return {
      title: 'Campaign Not Found - Path2Better',
    };
  }

  return {
    title: `Support ${campaign.firstName} - Path2Better`,
    description: campaign.story.substring(0, 155),
    openGraph: {
      title: `Support ${campaign.firstName}'s Journey to Better`,
      description: campaign.story.substring(0, 155),
      images: campaign.profileImage
        ? [urlForImage(campaign.profileImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const imageUrl = campaign.profileImage
    ? urlForImage(campaign.profileImage).width(800).height(800).url()
    : '/images/placeholder-profile.jpg';

  const statusColors = {
    active: 'bg-secondary text-white',
    funded: 'bg-primary text-white',
    graduated: 'bg-accent text-white',
  };

  const statusLabels = {
    active: 'Active Campaign',
    funded: 'Fully Funded',
    graduated: 'Successfully Graduated',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-96 w-full">
              <Image
                src={imageUrl}
                alt={`${campaign.firstName}'s campaign`}
                fill
                className="object-cover"
                priority
              />
              <div
                className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold ${statusColors[campaign.status]}`}
              >
                {statusLabels[campaign.status]}
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold text-neutral-charcoal mb-2">
                {campaign.firstName}, {campaign.age}
              </h1>
              <p className="text-lg text-neutral-gray mb-6">{campaign.agency}</p>

              <div className="space-y-2">
                <Progress value={(campaign.amountRaised / campaign.fundingGoal) * 100} />
                <div className="flex justify-between text-sm text-neutral-gray">
                  <span>${campaign.amountRaised.toLocaleString()} raised</span>
                  <span>${campaign.fundingGoal.toLocaleString()} goal</span>
                </div>
              </div>
            </div>
          </div>

           {/* Story */}
           <div className="bg-white rounded-lg shadow-md p-8 mb-8">
             <div className="flex justify-between items-start mb-6">
               <h2 className="text-2xl font-bold text-neutral-charcoal">Their Story</h2>
               <SocialShareButtons 
                 campaign={campaign}
                 url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://path2better.com'}/campaigns/${campaign.slug.current}`}
               />
             </div>
             <div className="prose prose-lg max-w-none text-neutral-charcoal whitespace-pre-line">
               <Markdown>{campaign.story}</Markdown>
             </div>
           </div>

          {/* Goals */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Goals</h2>
            <ul className="space-y-3">
              {campaign.goals.map((goal, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary text-xl mr-3">✓</span>
                  <span className="text-lg text-neutral-charcoal">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes & Verification */}
          {(campaign.housingStatus || campaign.employmentStatus || campaign.graduationDate || campaign.verifiedBy) && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Verified Outcomes</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaign.housingStatus && (
                  <div>
                    <dt className="text-sm text-neutral-gray">Housing Stability</dt>
                    <dd className="text-lg font-semibold text-neutral-charcoal capitalize">
                      {campaign.housingStatus.replace('-', ' ')}
                    </dd>
                  </div>
                )}
                {campaign.employmentStatus && (
                  <div>
                    <dt className="text-sm text-neutral-gray">Employment</dt>
                    <dd className="text-lg font-semibold text-neutral-charcoal capitalize">
                      {campaign.employmentStatus}
                    </dd>
                  </div>
                )}
                {campaign.graduationDate && (
                  <div>
                    <dt className="text-sm text-neutral-gray">Graduation Date</dt>
                    <dd className="text-lg font-semibold text-neutral-charcoal">
                      {new Date(campaign.graduationDate).toLocaleDateString()}
                    </dd>
                  </div>
                )}
                {campaign.verifiedBy && (
                  <div>
                    <dt className="text-sm text-neutral-gray">Verified By</dt>
                    <dd className="text-lg font-semibold text-neutral-charcoal">
                      {campaign.verifiedBy}
                    </dd>
                    {campaign.verificationNotes && (
                      <p className="text-sm text-neutral-gray mt-1">{campaign.verificationNotes}</p>
                    )}
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Budget Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">
              Budget Breakdown
            </h2>
            <div className="space-y-4">
              {campaign.budgetBreakdown.map((item) => (
                <div key={item._key} className="flex justify-between items-center border-b pb-3">
                  <span className="text-neutral-charcoal">{item.item}</span>
                  <span className="font-semibold text-neutral-charcoal">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-neutral-charcoal">Total Goal</span>
                <span className="text-lg font-bold text-primary">
                  ${campaign.fundingGoal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Updates */}
          {campaign.updates && campaign.updates.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-neutral-charcoal mb-6">
                Progress Updates
              </h2>
              <div className="space-y-6">
                {campaign.updates.map((update) => (
                  <div key={update._key} className="border-l-4 border-primary pl-6 py-2">
                    <p className="text-sm text-neutral-gray mb-2">
                      {new Date(update.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-neutral-charcoal whitespace-pre-line">{update.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Donation Sidebar */}
        <div className="lg:col-span-1">
          <DonationSidebar campaign={campaign} />
        </div>
      </div>
    </div>
  );
}
