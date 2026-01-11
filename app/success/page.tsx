import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Thank You - Path2Better',
  description: 'Thank you for your donation to Path2Better.',
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-xl p-12">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-neutral-charcoal mb-4">
            Thank You for Your Support!
          </h1>

          <p className="text-xl text-neutral-gray mb-6">
            Your donation has been received and will help create a path to better for someone in our community.
          </p>

          <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8 text-left">
            <h2 className="font-semibold text-neutral-charcoal mb-2">What happens next?</h2>
            <ul className="space-y-2 text-neutral-gray">
               <li className="flex items-start">
                 <span className="text-primary mr-2">•</span>
                 <span>You&rsquo;ll receive an email confirmation shortly</span>
               </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Your contribution will be applied to the campaign you selected</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Caseworkers will post updates as progress is made</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/campaigns">
              <Button variant="default" size="lg">
                Browse More Campaigns
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Return Home
              </Button>
            </Link>
          </div>

          <p className="text-sm text-neutral-gray mt-8">
            Questions? Contact us at support@path2better.com
          </p>
        </div>
      </div>
    </div>
  );
}
