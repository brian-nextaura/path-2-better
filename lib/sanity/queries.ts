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
    housingStatus,
    employmentStatus,
    graduationDate,
    verifiedBy,
    verificationNotes,
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
    housingStatus,
    employmentStatus,
    graduationDate,
    verifiedBy,
    verificationNotes,
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
    housingStatus,
    employmentStatus,
    graduationDate,
    verifiedBy,
    verificationNotes,
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
  const graduated = await client.fetch(`count(*[_type == "campaign" && status == "graduated"])`);
  const stableHousing = await client.fetch(
    `count(*[_type == "campaign" && housingStatus == "stable"])`
  );
  const employed = await client.fetch(
    `count(*[_type == "campaign" && employmentStatus == "employed"])`
  );

  return {
    totalRaised: totalRaised || 0,
    activeCampaigns: activeCampaigns || 0,
    totalCampaigns: totalCampaigns || 0,
    graduated: graduated || 0,
    stableHousing: stableHousing || 0,
    employed: employed || 0,
  };
}

export async function getCampaignForDonation(slug: string) {
  const query = `*[_type == "campaign" && slug.current == $slug][0] { _id, status }`;
  return client.fetch(query, { slug });
}

export async function recordDonation(params: {
  sessionId: string;
  amountCents: number;
  campaignSlug: string;
  donationType?: string | null;
}) {
  const { sessionId, amountCents, campaignSlug, donationType } = params;

  const existing = await client.fetch(
    `*[_type == "donationEvent" && sessionId == $sessionId][0] { _id }`,
    { sessionId }
  );

  if (existing?._id) {
    return { alreadyProcessed: true };
  }

  const campaign = await getCampaignForDonation(campaignSlug);
  if (!campaign?._id) {
    throw new Error(`Campaign not found for slug ${campaignSlug}`);
  }

  const amountRaised = Math.max(0, amountCents) / 100;

  await client
    .transaction()
    .create({
      _type: 'donationEvent',
      sessionId,
      amountCents,
      campaignSlug,
      donationType,
      createdAt: new Date().toISOString(),
    })
    .patch(campaign._id, (patch) => patch.inc({ amountRaised }))
    .commit({ autoGenerateArrayKeys: true });

  return { alreadyProcessed: false };
}

export async function getRecentDonations(limit: number = 10) {
  const query = `*[_type == "donationEvent"] | order(createdAt desc) [0...${limit}] {
    _id,
    sessionId,
    amountCents,
    campaignSlug,
    donationType,
    createdAt
  }`;
  return client.fetch(query);
}
