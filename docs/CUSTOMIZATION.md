# Customization Guide

This guide shows you how to customize Path2Better for your city or region.

## Branding

### Site Name and Tagline

Update in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "YourCity2Better - Community-powered pathways forward",
  description: "Your custom description here",
};
```

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#2B6CB0',  // Your primary color
    dark: '#2C5282',
    light: '#3182CE',
  },
  secondary: {
    DEFAULT: '#48BB78',  // Your secondary color
    dark: '#38A169',
    light: '#68D391',
  },
  accent: {
    DEFAULT: '#ED8936',  // Your accent color
    dark: '#DD6B20',
    light: '#F6AD55',
  },
}
```

### Logo

1. Add your logo to `/public/logo.png`
2. Update `components/layout/Header.tsx`:

```typescript
<Link href="/" className="flex items-center space-x-2">
  <Image src="/logo.png" alt="Logo" width={40} height={40} />
  <span className="text-2xl font-bold text-primary">YourCity2Better</span>
</Link>
```

## Copy & Content

### Homepage Hero

Edit `app/page.tsx`:

```typescript
<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
  Your custom headline here
</h1>
<p className="text-xl md:text-2xl mb-8 text-blue-100">
  Your custom subheadline
</p>
<p className="text-lg mb-8 text-blue-50">
  Support verified pathways in [Your City, State/Province]
</p>
```

### Partner Agencies

Update `app/page.tsx` and `app/about/page.tsx`:

```typescript
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  <div className="text-center p-4">
    <p className="font-semibold">Your Agency 1</p>
  </div>
  <div className="text-center p-4">
    <p className="font-semibold">Your Agency 2</p>
  </div>
  // Add more agencies
</div>
```

### About Page

Edit `app/about/page.tsx`:
- Update mission statement
- Add local context
- List your partner agencies with descriptions
- Update FAQs for your region

## Regional Settings

### Currency

Update Stripe configuration in `app/api/create-checkout-session/route.ts`:

```typescript
price_data: {
  currency: 'usd',  // Change to your currency (usd, cad, gbp, etc.)
  // ...
}
```

### Date/Time Format

Update in `app/campaigns/[slug]/page.tsx`:

```typescript
new Date(update.date).toLocaleDateString('en-US', {  // Change locale
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
```

### Language

For basic text changes, update strings throughout the codebase.

For full internationalization:
1. Install `next-intl` or similar
2. Create translation files
3. Wrap strings in translation functions
4. Update routing for locale

## Features

### Add Social Sharing

Install dependencies:
```bash
npm install react-share
```

Update campaign detail page:
```typescript
import { FacebookShareButton, TwitterShareButton } from 'react-share';

// Add to campaign page
<FacebookShareButton url={shareUrl}>
  Share on Facebook
</FacebookShareButton>
```

### Analytics

Add Google Analytics in `app/layout.tsx`:

```typescript
import Script from 'next/script';

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### Add New Campaign Fields

1. Update Sanity schema in `sanity/schemas/campaign.ts`:

```typescript
defineField({
  name: 'customField',
  title: 'Custom Field',
  type: 'string',
}),
```

2. Update TypeScript types in `lib/types.ts`:

```typescript
export interface Campaign {
  // ... existing fields
  customField?: string;
}
```

3. Update UI to display the field

## Agency-Specific Customizations

### Custom Campaign Categories

Add to Sanity schema:

```typescript
defineField({
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: [
      { title: 'Housing', value: 'housing' },
      { title: 'Employment', value: 'employment' },
      { title: 'Education', value: 'education' },
      { title: 'Health', value: 'health' },
    ],
  },
}),
```

Add filter to campaigns page.

### Goal Templates

Create predefined goal templates in admin:

```typescript
const goalTemplates = [
  'Secure stable housing',
  'Complete job training certification',
  'Obtain essential work equipment',
  'Access mental health support',
];
```

### Budget Templates

Create common budget items:

```typescript
const budgetTemplates = {
  housing: [
    { item: 'First month rent', amount: 1200 },
    { item: 'Last month rent', amount: 1200 },
    { item: 'Security deposit', amount: 600 },
  ],
  employment: [
    { item: 'Certification course', amount: 800 },
    { item: 'Work clothes', amount: 150 },
    { item: 'Transit pass (3 months)', amount: 90 },
  ],
};
```

## UI Customizations

### Layout Changes

Edit `components/layout/Header.tsx` and `Footer.tsx` to match your design.

### Add New Sections

Create new components in `components/` and import to pages.

### Modify Campaign Card

Edit `components/campaigns/CampaignCard.tsx`:
- Change layout
- Add/remove information
- Adjust styling

## Advanced Customizations

### Custom Admin Dashboard

Create additional admin pages in `app/admin/`:
- Analytics dashboard
- Donor management
- Report generation

### Automated Updates

Set up webhooks to auto-update campaigns:

```typescript
// app/api/webhooks/update-campaign/route.ts
export async function POST(request: NextRequest) {
  // Verify webhook signature
  // Update campaign in Sanity
  // Send notifications
}
```

### Email Templates

Customize in `lib/email/resend.ts`:

```typescript
html: `
  <div style="font-family: sans-serif;">
    <img src="https://your-logo.png" />
    <h1>Thank You!</h1>
    <!-- Custom email template -->
  </div>
`
```

### Add Comments/Messages

1. Add comments schema to Sanity
2. Create comment component
3. Add moderation interface in admin

## Testing Customizations

Always test:
- [ ] All pages load correctly
- [ ] Donation flow works end-to-end
- [ ] Mobile responsiveness maintained
- [ ] Accessibility not impacted
- [ ] Email delivery works
- [ ] Admin functions properly

## Deployment

After customizations:

1. Test locally thoroughly
2. Commit changes to git
3. Push to GitHub
4. Vercel will auto-deploy
5. Test production site
6. Monitor for errors

## Need Help?

- Check existing components for examples
- Review Next.js and Tailwind docs
- Open a GitHub discussion
- Contact: support@path2better.com
