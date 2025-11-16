# Deployment Guide

This guide walks you through deploying your own instance of Path2Better for your community.

## Prerequisites

Before deploying, you'll need accounts with:
- [Vercel](https://vercel.com) - Hosting
- [Sanity](https://sanity.io) - Content management
- [Stripe](https://stripe.com) - Payment processing
- [Resend](https://resend.com) - Email notifications

## Step 1: Fork the Repository

1. Go to https://github.com/yourusername/path-2-better
2. Click "Fork" in the top right
3. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/path-2-better.git
   cd path-2-better
   ```

## Step 2: Set Up Sanity

1. **Create a Sanity project**
   ```bash
   npm install -g @sanity/cli
   npx sanity init
   ```

2. **Follow the prompts:**
   - Create new project or use existing
   - Choose a project name
   - Use default dataset configuration
   - Choose output path: `./sanity`

3. **Deploy Sanity Studio**
   ```bash
   npx sanity deploy
   ```

4. **Get your credentials:**
   - Project ID: Found in `sanity.cli.ts` or at sanity.io/manage
   - Dataset: Usually `production`
   - API Token: Create at sanity.io/manage → API → Tokens

## Step 3: Set Up Stripe

1. **Create a Stripe account** at stripe.com

2. **Get API keys:**
   - Go to Developers → API keys
   - Copy "Publishable key" and "Secret key"

3. **Set up webhook** (after deploying to Vercel):
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select event: `checkout.session.completed`
   - Copy signing secret

## Step 4: Set Up Resend

1. **Create Resend account** at resend.com

2. **Add domain** (optional for production):
   - Go to Domains → Add Domain
   - Follow DNS setup instructions

3. **Get API key:**
   - Go to API Keys → Create API Key
   - Copy the key

## Step 5: Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to vercel.com/new
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: `./`
     - Build Command: `npm run build`

3. **Add environment variables:**

   In Vercel dashboard → Settings → Environment Variables, add:

   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-token
   RESEND_API_KEY=re_...
   ADMIN_PASSWORD=your-secure-password
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

## Step 6: Configure Stripe Webhook

1. Get your deployed URL from Vercel
2. Go to Stripe Dashboard → Developers → Webhooks
3. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select event: `checkout.session.completed`
5. Copy the webhook signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. Redeploy: Vercel → Deployments → Redeploy

## Step 7: Add Initial Content

1. **Access Sanity Studio:**
   - Go to `https://your-project-id.sanity.studio`
   - Or run locally: `npx sanity dev`

2. **Create your first campaign:**
   - Click "Campaign" → "Create"
   - Fill in all required fields
   - Upload a profile image
   - Add goals and budget breakdown
   - Generate slug from first name
   - Publish

3. **Test the platform:**
   - Visit your live site
   - Browse campaigns
   - Test donation flow (use Stripe test card: 4242 4242 4242 4242)

## Step 8: Custom Domain (Optional)

1. **In Vercel:**
   - Go to Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Update environment variable:**
   - Change `NEXT_PUBLIC_SITE_URL` to your custom domain
   - Redeploy

3. **Update Stripe webhook:**
   - Update endpoint URL to use custom domain
   - Update webhook secret if needed

## Production Checklist

Before going live:

- [ ] Test all user flows end-to-end
- [ ] Verify Stripe is in **live mode** (not test mode)
- [ ] Test webhook with real payment
- [ ] Change admin password from default
- [ ] Set up email domain in Resend
- [ ] Test email delivery
- [ ] Add partner agency logos
- [ ] Customize About page with local agencies
- [ ] Set up analytics (optional)
- [ ] Review Privacy Policy and Terms
- [ ] Test on mobile devices
- [ ] Run accessibility audit
- [ ] Set up monitoring (Vercel Analytics, Sentry, etc.)

## Monitoring & Maintenance

### Vercel Dashboard
- Monitor deployment status
- Check function logs
- View analytics

### Stripe Dashboard
- Monitor payments
- Review disputes
- Export financial reports

### Sanity Studio
- Manage campaigns
- Update content
- Monitor usage

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify Node version (18+)
- Check build logs in Vercel

### Stripe Webhook Not Working
- Verify webhook URL is correct
- Check signing secret matches
- Review Stripe webhook logs
- Check Vercel function logs

### Emails Not Sending
- Verify Resend API key
- Check email logs in Resend dashboard
- Ensure "from" domain is verified

### Images Not Loading
- Verify Sanity project ID and dataset
- Check image uploads in Sanity Studio
- Review Next.js image optimization settings

## Security Recommendations

For production deployments:

1. **Upgrade admin authentication**
   - Implement OAuth (Google, GitHub)
   - Add role-based permissions
   - Use secure session management

2. **Add monitoring**
   - Set up error tracking (Sentry)
   - Monitor uptime (Better Uptime)
   - Track performance (Vercel Analytics)

3. **Enable security features**
   - Set up rate limiting
   - Add CSRF protection
   - Implement audit logging

4. **Regular updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Test before deploying updates

## Cost Estimates

Based on moderate usage (100 campaigns, 1000 visitors/month):

- **Vercel**: Free tier sufficient, Pro $20/mo for production
- **Sanity**: Free tier (unlimited documents, 3 users)
- **Stripe**: 2.9% + 30¢ per transaction
- **Resend**: Free tier (100 emails/day), $20/mo for 50k/month

Total: ~$20-40/month + transaction fees

## Need Help?

- Documentation: Check other guides in `/docs`
- Issues: Open a GitHub issue
- Community: Join discussions
- Email: support@path2better.com
