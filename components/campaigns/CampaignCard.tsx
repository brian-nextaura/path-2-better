import Link from 'next/link';
import Image from 'next/image';
import { Campaign } from '@/lib/types';
import { urlForImage } from '@/lib/sanity/client';
import { generateCategoryPlaceholder } from '@/lib/placeholders';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, CheckCircle2 } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const imageUrl = campaign.profileImage
    ? urlForImage(campaign.profileImage).width(400).height(400).url()
    : generateCategoryPlaceholder(campaign.category);

  const percentComplete = Math.min(100, Math.round((campaign.amountRaised / campaign.fundingGoal) * 100));
  const category = campaign.category || 'Housing';
  const daysLeft = campaign.daysLeft || 30;
  const supportersCount = campaign.supportersCount || 0;

  return (
    <Link href={`/campaigns/${campaign.slug.current}`}>
      <a className="block h-full group">
        <Card className="h-full flex flex-col overflow-hidden border-border/60 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
            <Image 
              src={imageUrl}
              alt={`${campaign.firstName}'s campaign`}
              fill
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Badge 
              className="absolute top-3 left-3 z-20 bg-background/90 text-foreground hover:bg-background font-medium shadow-sm backdrop-blur-sm"
            >
              {category}
            </Badge>
          </div>
          
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2 uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3" />
              Verified by {campaign.agency}
            </div>
            <h3 className="text-xl font-serif font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
              {campaign.firstName}, {campaign.age}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {campaign.story.substring(0, 100)}...
            </p>
          </CardHeader>

          <CardContent className="px-5 pb-3 flex-grow">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-foreground">${campaign.amountRaised.toLocaleString()}</span>
                <span className="text-muted-foreground">of ${campaign.fundingGoal.toLocaleString()}</span>
              </div>
              <Progress value={percentComplete} />
              <div className="flex justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{supportersCount} supporters</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{daysLeft} days left</span>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="px-5 pb-5 pt-0">
            <Button className="w-full bg-muted/50 text-foreground hover:bg-primary hover:text-white transition-all font-medium">
              View Campaign
            </Button>
          </div>
        </Card>
      </a>
    </Link>
  );
}
