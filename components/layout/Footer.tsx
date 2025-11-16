import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-charcoal text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Path2Better</h3>
            <p className="text-gray-300 mb-4">
              Community-powered pathways forward
            </p>
            <p className="text-sm text-gray-400">
              Connecting neighbours in Peterborough, Ontario through transparent,
              agency-verified support pathways.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/campaigns" className="text-gray-300 hover:text-white transition-colors">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Partner Agencies</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>YES Shelter</li>
              <li>Brock Mission</li>
              <li>Fourcast</li>
              <li>Peterborough Housing</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Path2Better. Open source under MIT License.</p>
        </div>
      </div>
    </footer>
  );
}
