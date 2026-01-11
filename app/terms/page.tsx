export const metadata = {
  title: 'Terms of Service - Path2Better',
  description: 'Terms of service for Path2Better crowdfunding platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-bold text-neutral-charcoal mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none text-neutral-gray">
        <p className="text-sm italic mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using Path2Better, you accept and agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">About Path2Better</h2>
          <p>
            Path2Better is a crowdfunding platform that connects donors with people experiencing
            homelessness through agency-verified campaigns. All campaigns are created and managed
            by partnered social service organizations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Donations</h2>
          <h3 className="text-xl font-semibold text-neutral-charcoal mb-2">Payment Processing</h3>
           <p className="mb-4">
             All donations are processed securely through Stripe. By making a donation, you agree to
             Stripe&rsquo;s terms of service.
           </p>

          <h3 className="text-xl font-semibold text-neutral-charcoal mb-2">Donation Policy</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>All donations are final and non-refundable</li>
            <li>Donations go to the specific campaign you select</li>
            <li>Partner agencies manage fund distribution</li>
            <li>Monthly subscriptions can be cancelled at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Campaign Verification</h2>
          <p>
            All campaigns are created and verified by our partner agencies. While we strive for
            accuracy, Path2Better is not responsible for the actions of partner organizations or
            campaign participants.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Prohibited Activities</h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use the platform for any illegal purpose</li>
            <li>Attempt to access unauthorized areas of the platform</li>
            <li>Interfere with the proper functioning of the platform</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Disclaimer</h2>
           <p>
             Path2Better is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee
             that campaigns will achieve their goals or that participants will meet stated objectives.
           </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Limitation of Liability</h2>
          <p>
            Path2Better shall not be liable for any indirect, incidental, special, or consequential
            damages arising from your use of the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the platform
            after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Contact</h2>
          <p>
            Questions about these terms? Contact us at:
            <br />
            <a href="mailto:legal@path2better.com" className="text-primary hover:underline">
              legal@path2better.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
