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
  agencyId?: {
    _ref: string;
    _type: 'reference';
  };
  housingStatus?: 'unstable' | 'in-progress' | 'stable';
  employmentStatus?: 'unemployed' | 'training' | 'employed';
  graduationDate?: string;
  verifiedBy?: string;
  verificationNotes?: string;
  updates: CampaignUpdate[];
  createdAt: string;
  slug: {
    current: string;
  };
  category?: 'Housing' | 'Education' | 'Medical' | 'Employment' | 'Basic Needs';
  daysLeft?: number;
  supportersCount?: number;
  coverImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

export interface DonationEvent {
  _id: string;
  sessionId: string;
  amountCents: number;
  campaignSlug: string;
  donationType?: string | null;
  createdAt: string;
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

export interface User {
  _id: string;
  _type: 'user';
  email: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  role: 'donor' | 'agency_admin' | 'platform_admin';
  agencyId?: {
    _ref: string;
    _type: 'reference';
  };
  emailVerified: boolean;
  emailPreferences: EmailPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface EmailPreferences {
  donationConfirmations: boolean;
  campaignUpdates: boolean;
  platformNews: boolean;
  recurringReminders: boolean;
}

export interface Agency {
  _id: string;
  _type: 'agency';
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  logo?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  website?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  status: 'active' | 'pending' | 'inactive';
  verificationDate?: string;
  campaignCount: number;
  totalRaised: number;
  createdAt: string;
}
