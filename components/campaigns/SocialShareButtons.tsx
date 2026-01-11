'use client';

import { Campaign } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Facebook,
  Twitter,
  Mail,
  Share2,
  MessageCircle,
} from 'lucide-react';

interface SocialShareButtonsProps {
  campaign: Campaign;
  url: string;
}

export function SocialShareButtons({ campaign, url }: SocialShareButtonsProps) {
  const shareText = `Help support ${campaign.firstName}'s journey to better at Path2Better`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedText}&body=${encodedText}%20${encodedUrl}`,
    },
  ];

  const handleNativeShare = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    if (nav?.share) {
      try {
        await nav.share({
          title: 'Path2Better Campaign',
          text: shareText,
          url: url,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.error('Share failed:', error);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = typeof navigator !== 'undefined' ? (navigator as any) : null;
  const supportsNativeShare = nav?.share;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-neutral-charcoal">Share:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Share on ${link.name}`}
              className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
              <span className="sr-only">{link.name}</span>
            </a>
          );
        })}

        {/* Native Share (mobile) */}
        {supportsNativeShare && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNativeShare}
            className="p-2 rounded-lg bg-gray-100 hover:bg-primary hover:text-white"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
