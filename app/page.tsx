import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, LineChart } from 'lucide-react';
import { getFeaturedCampaigns } from '@/lib/sanity/queries';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const revalidate = 60;

export default async function Home() {
  const featuredCampaigns = await getFeaturedCampaigns(3);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 text-sm rounded-full">
                Now Live in Peterborough, ON
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                Community-powered <br />
                <span className="text-primary relative inline-block">
                  pathways forward
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Connect directly with neighbours experiencing homelessness through transparent, agency-verified support pathways. 100% of donations go to the goal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/campaigns">
                  <Button size="lg" className="text-lg h-14 px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                    Browse Campaigns <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-primary/20 hover:bg-primary/5">
                    How it Works
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="avatar" />
                    </div>
                  ))}
                </div>
                <p>Joined by <span className="font-bold text-foreground">400+</span> local supporters</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/Community_support_in_park_ff7ec8ed.png" 
                alt="Community support" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-8 z-20 text-white max-w-md">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <span className="font-medium text-secondary">Agency Verified</span>
                </div>
                <p className="text-lg font-medium leading-snug">
                  &quot;Path2Better helped me secure the deposit for my first apartment in two years. It wasn&apos;t just the money; it was knowing people cared.&quot;
                </p>
                <p className="mt-2 text-white/80 font-serif italic">— David, moved into housing Oct 2024</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Path2Better is Different</h2>
            <p className="text-lg text-muted-foreground">
              Traditional crowdfunding isn&apos;t built for complex social challenges. We bridge the gap with verification, transparency, and professional support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Verified & Secure",
                desc: "Every campaign is created and managed by established local social service agencies. No fraud, just impact."
              },
              {
                icon: LineChart,
                title: "Transparent Tracking",
                desc: "See exactly where funds go. Budgets are clear, and funds are released directly to vendors (landlords, schools, etc)."
              },
              {
                icon: Heart,
                title: "Holistic Support",
                desc: "It's more than money. Participants receive ongoing casework support to ensure long-term success."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      {featuredCampaigns.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Active Campaigns</h2>
                <p className="text-muted-foreground">Support neighbours reaching for their next milestone.</p>
              </div>
              <Link href="/campaigns" className="hidden sm:flex">
                <Button variant="ghost" className="group">
                  View All Campaigns <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))}
            </div>
            
            <div className="mt-12 text-center sm:hidden">
               <Link href="/campaigns">
                <Button variant="outline" className="w-full">
                  View All Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to make a real difference?</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Join hundreds of locals building a stronger, more connected community. Your support can change a life today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/campaigns">
              <Button size="lg" variant="secondary" className="text-lg h-14 px-8">
                Find a Campaign
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Partner as an Agency
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
