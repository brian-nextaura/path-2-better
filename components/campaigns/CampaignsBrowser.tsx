'use client';

import { useState, useMemo } from 'react';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Campaign } from '@/lib/types';

const CATEGORIES = [
  { name: 'All' },
  { name: 'Housing' },
  { name: 'Education' },
  { name: 'Medical' },
  { name: 'Employment' },
  { name: 'Basic Needs' },
];

interface CampaignsBrowserProps {
  campaigns: Campaign[];
}

export default function CampaignsBrowser({ campaigns }: CampaignsBrowserProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesCategory = activeCategory === 'All' || campaign.category === activeCategory;
      const matchesSearch = 
        campaign.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        campaign.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.agency.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [campaigns, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <section className="bg-muted/30 py-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Browse Campaigns</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover verified needs in your community. Filter by category to support causes you care about most.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Categories - Desktop */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveCategory(category.name)}
                  className={`rounded-full px-4 ${activeCategory === category.name ? '' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search campaigns..." 
                className="pl-9 bg-muted/30 border-border/50 focus:bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
           {/* Categories - Mobile Scroll */}
           <div className="md:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-2 w-full">
             {CATEGORIES.map((category) => (
               <Button
                 key={category.name}
                 variant={activeCategory === category.name ? 'default' : 'outline'}
                 size="sm"
                 onClick={() => setActiveCategory(category.name)}
                 className="rounded-full px-4 whitespace-nowrap"
               >
                 {category.name}
               </Button>
             ))}
           </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {filteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No campaigns found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              <Button 
                variant="link" 
                onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                className="mt-4 text-primary"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
