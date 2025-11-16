import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Path2Better</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-charcoal hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/campaigns" className="text-neutral-charcoal hover:text-primary transition-colors">
              Campaigns
            </Link>
            <Link href="/about" className="text-neutral-charcoal hover:text-primary transition-colors">
              About
            </Link>
            <Link
              href="/campaigns"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Browse Campaigns
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link
              href="/campaigns"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Campaigns
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
