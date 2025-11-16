import { client } from './client';
import { Campaign } from '../types';

export async function getAllCampaigns(status?: 'active' | 'funded' | 'graduated'): Promise<Campaign[]> {
  const filter = status ? `&& status == "${status}"` : '';

  const query = `*[_type == "campaign" ${filter}] | order(createdAt desc) {
    _id,
    _type,
    firstName,
    age,
    profileImage,
    story,
    goals,
    budgetBreakdown,
    fundingGoal,
    amountRaised,
    status,
    agency,
    updates,
    createdAt,
    slug
  }`;

  return client.fetch(query);
}

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  const query = `*[_type == "campaign" && slug.current == $slug][0] {
    _id,
    _type,
    firstName,
    age,
    profileImage,
    story,
    goals,
    budgetBreakdown,
    fundingGoal,
    amountRaised,
    status,
    agency,
    updates,
    createdAt,
    slug
  }`;

  return client.fetch(query, { slug });
}

export async function getFeaturedCampaigns(limit: number = 3): Promise<Campaign[]> {
  const query = `*[_type == "campaign" && status == "active"] | order(createdAt desc) [0...${limit}] {
    _id,
    _type,
    firstName,
    age,
    profileImage,
    story,
    goals,
    budgetBreakdown,
    fundingGoal,
    amountRaised,
    status,
    agency,
    updates,
    createdAt,
    slug
  }`;

  return client.fetch(query);
}

export async function getAnalytics() {
  const totalRaised = await client.fetch(`sum(*[_type == "campaign"].amountRaised)`);
  const activeCampaigns = await client.fetch(`count(*[_type == "campaign" && status == "active"])`);
  const totalCampaigns = await client.fetch(`count(*[_type == "campaign"])`);

  return {
    totalRaised: totalRaised || 0,
    activeCampaigns: activeCampaigns || 0,
    totalCampaigns: totalCampaigns || 0,
  };
}
