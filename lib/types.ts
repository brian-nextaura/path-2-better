export interface Campaign {
  _id: string;
  _type: 'campaign';
  firstName: string;
  age: number;
  profileImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  story: string;
  goals: string[];
  budgetBreakdown: BudgetItem[];
  fundingGoal: number;
  amountRaised: number;
  status: 'active' | 'funded' | 'graduated';
  agency: string;
  updates: CampaignUpdate[];
  createdAt: string;
  slug: {
    current: string;
  };
}

export interface BudgetItem {
  _key: string;
  item: string;
  amount: number;
}

export interface CampaignUpdate {
  _key: string;
  date: string;
  text: string;
}

export interface DonationMetadata {
  campaignSlug: string;
  campaignName: string;
  donationType: 'one-time' | 'monthly';
}
