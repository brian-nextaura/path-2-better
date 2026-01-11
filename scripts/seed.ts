import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌ Missing required environment variables:');
  if (!projectId) console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID');
  if (!token) console.error('   - SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const campaigns = [
  {
    firstName: 'Marcus',
    age: 34,
    story:
      "Marcus experienced homelessness after losing his job during the pandemic. With support from YES Shelter, he's been rebuilding his life. His immediate goal is securing stable housing and starting a part-time job at a local grocery store. This funding will help cover first month's rent and deposit while he gets back on his feet.",
    goals: ['Secure permanent housing', 'Complete job training program', 'Build emergency savings fund'],
    budgetBreakdown: [
      { item: 'First month rent', amount: 1200 },
      { item: 'Rent deposit', amount: 1200 },
      { item: 'Job training and licensing', amount: 500 },
      { item: 'Work clothing and supplies', amount: 300 },
    ],
    fundingGoal: 3200,
    agency: 'YES Shelter for Youth and Families',
    housingStatus: 'in-progress',
    employmentStatus: 'training',
    category: 'Housing',
    daysLeft: 28,
    supportersCount: 42,
    updates: [
      {
        date: new Date('2026-01-05').toISOString(),
        text: 'Marcus completed his first week of job training. Attendance is excellent and his confidence is growing.',
      },
      {
        date: new Date('2025-12-28').toISOString(),
        text: 'Applied to 5 apartments this week. Waiting to hear back from 2 promising leads.',
      },
    ],
  },
  {
    firstName: 'Jasmine',
    age: 28,
    story:
      'Jasmine and her 5-year-old daughter have been living in a shelter for 8 months. She has secured part-time work as a receptionist but needs support for initial housing costs. Her goal is to move into her own place where her daughter can have stability and start school. She is determined, organized, and ready for this next chapter.',
    goals: [
      'Move into own apartment with daughter',
      'Ensure daughter starts school on time',
      'Build stable family routine',
    ],
    budgetBreakdown: [
      { item: 'Security deposit', amount: 800 },
      { item: 'First month rent', amount: 1200 },
      { item: 'Essential furniture', amount: 600 },
      { item: 'School supplies and registration', amount: 250 },
    ],
    fundingGoal: 2850,
    agency: 'Brock Mission',
    housingStatus: 'in-progress',
    employmentStatus: 'employed',
    category: 'Housing',
    daysLeft: 35,
    supportersCount: 38,
    updates: [
      {
        date: new Date('2026-01-08').toISOString(),
        text: "Jasmine's daughter was accepted to the local elementary school! School starts in February.",
      },
    ],
  },
  {
    firstName: 'David',
    age: 52,
    story:
      'David worked in construction for 25 years before a workplace injury left him unable to work. He has been street-involved for the past 3 years but recently connected with Fourcast for support. He is enrolled in a computer literacy program to explore office-based work. Your support will help him access housing while he completes his training.',
    goals: ['Complete computer skills certification', 'Secure office employment', 'Rebuild relationships with family'],
    budgetBreakdown: [
      { item: 'Transitional housing (3 months)', amount: 2400 },
      { item: 'Computer course and materials', amount: 600 },
      { item: 'Professional clothing and ID', amount: 400 },
    ],
    fundingGoal: 3400,
    agency: 'Fourcast',
    housingStatus: 'unstable',
    employmentStatus: 'training',
    category: 'Employment',
    daysLeft: 42,
    supportersCount: 25,
    updates: [],
  },
  {
    firstName: 'Aisha',
    age: 31,
    story:
      'Aisha fled a difficult situation and has been working 2 part-time jobs while staying with friends. She is now ready to move forward and establish independence. She has secured a lease pending first-month rent and deposit. With support from Peterborough Housing, she will finally have her own safe space.',
    goals: ['Move into permanent housing', 'Stabilize employment', 'Pursue social work certification'],
    budgetBreakdown: [
      { item: 'Rent deposit', amount: 1000 },
      { item: 'First month rent', amount: 1400 },
      { item: 'Basic furniture and household items', amount: 800 },
      { item: 'Course materials for certification', amount: 300 },
    ],
    fundingGoal: 3500,
    agency: 'Peterborough Housing',
    housingStatus: 'in-progress',
    employmentStatus: 'employed',
    category: 'Housing',
    daysLeft: 31,
    supportersCount: 51,
    updates: [
      {
        date: new Date('2026-01-10').toISOString(),
        text: 'Lease approved! Move-in date is February 1st.',
      },
    ],
  },
  {
    firstName: 'James',
    age: 41,
    story:
      'James is transitioning out of a long-term shelter stay. He has secured employment as a warehouse worker starting next month and has completed financial literacy training. He needs support with deposits and first month rent to move forward independently.',
    goals: ['Secure stable housing', 'Maintain consistent employment', 'Save for emergency fund'],
    budgetBreakdown: [
      { item: 'Rent deposit', amount: 900 },
      { item: 'First month rent', amount: 1100 },
      { item: 'Work boots and gear', amount: 250 },
      { item: 'Transportation for work', amount: 200 },
    ],
    fundingGoal: 2450,
    agency: 'YES Shelter for Youth and Families',
    housingStatus: 'unstable',
    employmentStatus: 'training',
    category: 'Employment',
    daysLeft: 21,
    supportersCount: 33,
    updates: [
      {
        date: new Date('2026-01-09').toISOString(),
        text: 'Job offer accepted! Starts February 15th with full-time hours.',
      },
    ],
  },
];

async function seed() {
  try {
    console.log('🌱 Starting Sanity seed...\n');

    // Delete existing campaigns to avoid duplicates
    console.log('Deleting existing campaigns...');
    const existing = await client.fetch('*[_type == "campaign"]._id');
    for (const id of existing) {
      await client.delete(id);
    }
    console.log(`✓ Deleted ${existing.length} existing campaigns\n`);

    // Create campaigns
    console.log('Creating campaigns...');
    for (const campaign of campaigns) {
      const doc = {
        _type: 'campaign',
        firstName: campaign.firstName,
        age: campaign.age,
        story: campaign.story,
        goals: campaign.goals,
        budgetBreakdown: campaign.budgetBreakdown.map((item, i) => ({
          _key: `budget-${i}`,
          item: item.item,
          amount: item.amount,
        })),
        fundingGoal: campaign.fundingGoal,
        amountRaised: 0,
        status: 'active',
        agency: campaign.agency,
        housingStatus: campaign.housingStatus,
        employmentStatus: campaign.employmentStatus,
        category: campaign.category,
        daysLeft: campaign.daysLeft,
        supportersCount: campaign.supportersCount,
        updates: campaign.updates.map((update, i) => ({
          _key: `update-${i}`,
          date: update.date,
          text: update.text,
        })),
        slug: {
          _type: 'slug',
          current: campaign.firstName.toLowerCase(),
        },
        createdAt: new Date().toISOString(),
      };

      const created = await client.create(doc);
      console.log(`✓ Created campaign: ${campaign.firstName} (ID: ${created._id})`);
    }

    console.log('\n✅ Seed completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Campaigns created: ${campaigns.length}`);
    console.log(`   - Total funding goal: $${campaigns.reduce((sum, c) => sum + c.fundingGoal, 0)}`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
