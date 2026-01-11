# Seeding Data into Path2Better

The Path2Better application uses Sanity CMS for content management. This guide explains how to populate your Sanity dataset with campaign data.

## Option 1: Using the Seed Script (Recommended - Requires Write Permissions)

If your API token has write permissions, you can use the automated seed script:

```bash
npm run seed
```

This script will:
- Clear existing campaigns
- Create 5 sample campaigns with realistic data
- Set up initial campaign updates

### Requirements

Your `.env.local` must contain:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Your dataset name (default: `production`)
- `SANITY_API_TOKEN`: A Sanity API token with `create` and `delete` permissions

## Option 2: Manual Entry via Sanity Studio

If you don't have write permissions, you can manually add campaigns through the Sanity Studio:

1. Go to https://sanity.io/manage
2. Select your project and dataset
3. Click "Open Studio"
4. Navigate to the "Campaign" section
5. Click "+ New Campaign"
6. Fill in the following information:

### Sample Campaign Data

#### Campaign 1: Marcus
- **First Name**: Marcus
- **Age**: 34
- **Story**: Marcus experienced homelessness after losing his job during the pandemic. With support from YES Shelter, he's been rebuilding his life. His immediate goal is securing stable housing and starting a part-time job at a local grocery store. This funding will help cover first month's rent and deposit while he gets back on his feet.
- **Goals**:
  - Secure permanent housing
  - Complete job training program
  - Build emergency savings fund
- **Budget Breakdown**:
  - First month rent: $1,200
  - Rent deposit: $1,200
  - Job training and licensing: $500
  - Work clothing and supplies: $300
- **Funding Goal**: $3,200
- **Status**: Active
- **Agency**: YES Shelter for Youth and Families
- **Housing Status**: In Progress
- **Employment Status**: Training
- **Updates**:
  - (2026-01-05) Marcus completed his first week of job training. Attendance is excellent and his confidence is growing.
  - (2025-12-28) Applied to 5 apartments this week. Waiting to hear back from 2 promising leads.

#### Campaign 2: Jasmine
- **First Name**: Jasmine
- **Age**: 28
- **Story**: Jasmine and her 5-year-old daughter have been living in a shelter for 8 months. She has secured part-time work as a receptionist but needs support for initial housing costs. Her goal is to move into her own place where her daughter can have stability and start school. She is determined, organized, and ready for this next chapter.
- **Goals**:
  - Move into own apartment with daughter
  - Ensure daughter starts school on time
  - Build stable family routine
- **Budget Breakdown**:
  - Security deposit: $800
  - First month rent: $1,200
  - Essential furniture: $600
  - School supplies and registration: $250
- **Funding Goal**: $2,850
- **Status**: Active
- **Agency**: Brock Mission
- **Housing Status**: In Progress
- **Employment Status**: Employed
- **Updates**:
  - (2026-01-08) Jasmine's daughter was accepted to the local elementary school! School starts in February.

#### Campaign 3: David
- **First Name**: David
- **Age**: 52
- **Story**: David worked in construction for 25 years before a workplace injury left him unable to work. He has been street-involved for the past 3 years but recently connected with Fourcast for support. He is enrolled in a computer literacy program to explore office-based work. Your support will help him access housing while he completes his training.
- **Goals**:
  - Complete computer skills certification
  - Secure office employment
  - Rebuild relationships with family
- **Budget Breakdown**:
  - Transitional housing (3 months): $2,400
  - Computer course and materials: $600
  - Professional clothing and ID: $400
- **Funding Goal**: $3,400
- **Status**: Active
- **Agency**: Fourcast
- **Housing Status**: Unstable
- **Employment Status**: Training

#### Campaign 4: Aisha
- **First Name**: Aisha
- **Age**: 31
- **Story**: Aisha fled a difficult situation and has been working 2 part-time jobs while staying with friends. She is now ready to move forward and establish independence. She has secured a lease pending first-month rent and deposit. With support from Peterborough Housing, she will finally have her own safe space.
- **Goals**:
  - Move into permanent housing
  - Stabilize employment
  - Pursue social work certification
- **Budget Breakdown**:
  - Rent deposit: $1,000
  - First month rent: $1,400
  - Basic furniture and household items: $800
  - Course materials for certification: $300
- **Funding Goal**: $3,500
- **Status**: Active
- **Agency**: Peterborough Housing
- **Housing Status**: In Progress
- **Employment Status**: Employed
- **Updates**:
  - (2026-01-10) Lease approved! Move-in date is February 1st.

#### Campaign 5: James
- **First Name**: James
- **Age**: 41
- **Story**: James is transitioning out of a long-term shelter stay. He has secured employment as a warehouse worker starting next month and has completed financial literacy training. He needs support with deposits and first month rent to move forward independently.
- **Goals**:
  - Secure stable housing
  - Maintain consistent employment
  - Save for emergency fund
- **Budget Breakdown**:
  - Rent deposit: $900
  - First month rent: $1,100
  - Work boots and gear: $250
  - Transportation for work: $200
- **Funding Goal**: $2,450
- **Status**: Active
- **Agency**: YES Shelter for Youth and Families
- **Housing Status**: Unstable
- **Employment Status**: Training
- **Updates**:
  - (2026-01-09) Job offer accepted! Starts February 15th with full-time hours.

## Option 3: Using Sanity Studio Programmatically

You can also import data via the Sanity CLI:

```bash
npx sanity dataset import --help
```

## Verifying Your Data

After seeding, you can verify the data was created by:

1. Visiting the application and checking `/campaigns` page
2. Checking the Sanity Studio dashboard
3. Running a test query against your dataset

All campaigns should appear with their respective details.

## Troubleshooting

### Permission Denied Error
Your API token doesn't have the required permissions. You need a token with:
- `create` permission
- `delete` permission (optional, for clearing test data)

Generate a new token in your Sanity project settings with these permissions.

### Environment Variables Not Loading
Make sure your `.env.local` file exists in the project root and contains:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

### API Errors
If you encounter API errors:
1. Verify your project ID and dataset name
2. Confirm your API token is valid (hasn't expired)
3. Check that you're targeting the correct Sanity project
