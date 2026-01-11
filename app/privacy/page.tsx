export const metadata = {
  title: 'Privacy Policy - Path2Better',
  description: 'Privacy policy for Path2Better crowdfunding platform.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-bold text-neutral-charcoal mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none text-neutral-gray">
        <p className="text-sm italic mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Introduction</h2>
           <p>
             Path2Better (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy
             Policy explains how we collect, use, and safeguard your information when you use our platform.
           </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-neutral-charcoal mb-2">Payment Information</h3>
          <p className="mb-4">
            When you make a donation, payment information is processed securely by Stripe. We do not
            store your credit card information on our servers.
          </p>

          <h3 className="text-xl font-semibold text-neutral-charcoal mb-2">Email Address</h3>
           <p>
             We collect your email address to send donation confirmations and updates about campaigns
             you&rsquo;ve supported.
           </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">How We Use Your Information</h2>
           <ul className="list-disc list-inside space-y-2">
             <li>Process donations and send confirmation emails</li>
             <li>Provide updates on campaigns you&rsquo;ve supported</li>
             <li>Improve our platform and user experience</li>
             <li>Comply with legal obligations</li>
           </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information. All payment processing is handled securely through Stripe.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Data Handling & Retention</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We only collect the minimum data needed to process donations and provide updates.</li>
            <li>Payment card data never touches our servers; it is handled by Stripe.</li>
            <li>Donation records (amount, session ID, campaign) are retained for reconciliation and audit.</li>
            <li>Email addresses are stored to send receipts and campaign updates; you can opt out anytime.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Fees & Payment Processing</h2>
          <p className="mb-3">
            Stripe processes all payments. We do not add platform fees; standard Stripe fees apply per transaction.
          </p>
          <p className="text-sm text-neutral-gray">
            PCI Scope: Path2Better is out of scope for card data because all cardholder data is tokenized and sent directly to Stripe.
            We do not store or transmit card details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Uptime, Monitoring, and Incidents</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We monitor availability and Stripe webhook processing to ensure donations are recorded.</li>
            <li>Critical incidents (payment issues, data exposure) are investigated immediately and impacted users are notified within 24 hours.</li>
            <li>For incident reports, contact <a href="mailto:security@path2better.com" className="text-primary hover:underline">security@path2better.com</a>.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Third-Party Services</h2>
          <p className="mb-2">We use the following third-party services:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>Resend:</strong> Email notifications</li>
            <li><strong>Sanity:</strong> Content management</li>
            <li><strong>Vercel:</strong> Hosting</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Access your personal information</li>
            <li>Request correction of your data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of email communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@path2better.com" className="text-primary hover:underline">
              privacy@path2better.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
