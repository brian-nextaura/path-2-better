# Path2Better - Setup Guide

Quick guide to get Path2Better running locally.

## Prerequisites

Ensure you have:
- Node.js 18 or higher
- npm or yarn
- Git

## Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd path-2-better
npm install
```

## Step 2: Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

### Stripe (Required for payments)
1. Sign up at https://stripe.com
2. Get your test API keys from Dashboard → Developers → API keys
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

### Sanity (Required for CMS)
1. Sign up at https://sanity.io
2. Create a new project or run `npx sanity init`
3. Get credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-token
   ```

### Resend (Required for emails)
1. Sign up at https://resend.com
2. Create API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_...
   ```

### Other Settings
```
ADMIN_PASSWORD=path2better2025
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 3: Initialize Sanity

```bash
# Initialize Sanity project (if not done)
npx sanity init

# Start Sanity Studio locally
npx sanity dev
```

Visit `http://localhost:3333` to access Sanity Studio

## Step 4: Create Sample Campaign

In Sanity Studio:
1. Click "Campaign" → "Create"
2. Fill in required fields:
   - First Name: "Sarah"
   - Age: 28
   - Story: "Sarah is working toward stable housing..."
   - Goals: Add at least one goal
   - Budget Breakdown: Add line items
   - Funding Goal: Total of budget
   - Agency: "YES Shelter"
   - Status: "active"
3. Generate slug from first name
4. Publish

## Step 5: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Testing the Platform

### Test Donation Flow
1. Browse to a campaign
2. Click donate
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future expiry date
5. Any 3-digit CVC

### Test Admin Access
1. Go to `http://localhost:3000/admin`
2. Enter password: `path2better2025`
3. View dashboard

### Test Webhook (Local)
```bash
# Install Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy webhook signing secret to .env.local
```

## Common Issues

### Build Fails
- Check all environment variables are set
- Ensure Node.js version is 18+
- Clear `.next` folder and rebuild

### Sanity Connection Fails
- Verify project ID and dataset are correct
- Check API token has proper permissions
- Ensure Sanity Studio is deployed

### Stripe Errors
- Confirm using test mode keys (pk_test_, sk_test_)
- Check webhook secret if testing webhooks
- Verify amount is in cents (multiply by 100)

### Images Not Loading
- Ensure Sanity images are published
- Check Next.js image domains configuration
- Verify image URLs are valid

## Next Steps

1. **Customize for your city**: See `docs/CUSTOMIZATION.md`
2. **Deploy to production**: See `docs/DEPLOYMENT.md`
3. **Train agencies**: Share `docs/AGENCY_GUIDE.md`

## Production Checklist

Before going live:
- [ ] Switch Stripe to live mode
- [ ] Set strong admin password
- [ ] Set up custom domain
- [ ] Configure Stripe webhook for production URL
- [ ] Set up email domain in Resend
- [ ] Add real campaign content
- [ ] Test all user flows
- [ ] Review Privacy Policy and Terms

## Support

- Documentation: `/docs` folder
- Issues: GitHub Issues
- Community: GitHub Discussions
- Email: support@path2better.com

---

**Ready to build paths to better!** 🎯
