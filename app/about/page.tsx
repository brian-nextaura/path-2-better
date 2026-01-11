import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata = {
  title: 'About - Path2Better',
  description: 'Learn about Path2Better and how we connect communities to support neighbours on their path to housing stability.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-bold text-neutral-charcoal mb-8">
        About Path2Better
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-charcoal mb-4">Our Mission</h2>
          <p className="text-neutral-gray leading-relaxed mb-4">
            Path2Better connects communities with neighbours experiencing homelessness through
            transparent, agency-verified support pathways. We believe everyone deserves a path
            to stable housing and meaningful employment.
          </p>
           <p className="text-neutral-gray leading-relaxed">
             Unlike traditional crowdfunding, every campaign on Path2Better is created and verified
             by trusted local agencies who provide ongoing casework support. This ensures donations
             go exactly where they&rsquo;re needed and donors can track real progress.
           </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-charcoal mb-4">How It Works</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-2">For Donors</h3>
              <ol className="list-decimal list-inside space-y-2 text-neutral-gray">
                <li>Browse verified campaigns from trusted local agencies</li>
                <li>Read stories and see transparent budget breakdowns</li>
                <li>Choose between one-time donations or monthly sponsorships</li>
                <li>Receive updates as people achieve their goals</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-secondary mb-2">For Agencies</h3>
              <ol className="list-decimal list-inside space-y-2 text-neutral-gray">
                <li>Create campaigns for clients with specific, achievable goals</li>
                <li>Provide transparent budget breakdowns</li>
                <li>Post quarterly updates on progress</li>
                <li>Mark campaigns as funded or graduated when goals are achieved</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-charcoal mb-4">Our Partner Agencies</h2>
          <p className="text-neutral-gray mb-6">
            Path2Better works exclusively with established organizations in Peterborough, Ontario
            who have deep expertise in supporting people experiencing homelessness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-charcoal mb-2">YES Shelter for Youth and Families</h3>
              <p className="text-sm text-neutral-gray">
                Supporting youth and families experiencing homelessness with emergency shelter and wraparound services.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-charcoal mb-2">Brock Mission</h3>
              <p className="text-sm text-neutral-gray">
                Providing meals, shelter, and support programs for men, women, and families in need.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-charcoal mb-2">Fourcast</h3>
              <p className="text-sm text-neutral-gray">
                Empowering youth through employment programs, mental health support, and life skills training.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-neutral-charcoal mb-2">Peterborough Housing</h3>
              <p className="text-sm text-neutral-gray">
                Connecting people to affordable housing and rental assistance programs.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-charcoal mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-charcoal mb-2">
                How are campaigns verified?
              </h3>
               <p className="text-neutral-gray">
                 Every campaign is created by a partnered social service agency. The agency verifies
                 the person&rsquo;s situation, sets realistic goals, and provides ongoing casework support.
               </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-charcoal mb-2">
                Where does my donation go?
              </h3>
               <p className="text-neutral-gray">
                 100% of donations go toward the specific goals outlined in the campaign budget.
                 Funds are managed by the partner agency to ensure they&rsquo;re used as intended.
               </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-charcoal mb-2">
                Can I cancel my monthly sponsorship?
              </h3>
              <p className="text-neutral-gray">
                Yes, monthly sponsorships can be cancelled at any time through your Stripe customer portal.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-charcoal mb-2">
                Is Path2Better available in other cities?
              </h3>
               <p className="text-neutral-gray">
                 Path2Better is currently serving Peterborough, Ontario. However, we&rsquo;re open source!
                 Other communities can fork the platform and deploy their own instances. Learn more
                 in our GitHub repository.
               </p>
            </div>
          </div>
        </section>

        <section className="bg-primary text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Browse active campaigns and support your neighbours on their path to better.
          </p>
          <Link href="/campaigns">
            <Button variant="accent" size="lg">
              Browse Campaigns
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
