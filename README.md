# Path2Better

> Agency-verified crowdfunding for community support

A modern, open-source platform enabling transparent fundraising for people experiencing homelessness. Built with verified social service agencies at the core—they manage campaigns, verify beneficiaries, and ensure funds reach their intended purpose.

**Status**: Production-ready • **Built for**: Peterborough, Ontario • **Designed to**: Scale globally

---

## The Problem We're Solving

Traditional crowdfunding lacks accountability when supporting vulnerable populations:
- **Unverified campaigns** - No vetting of fundraisers
- **Transparency gaps** - Donors don't know where money goes
- **Disconnected support** - No integration with actual services
- **No accountability** - No tracking of outcomes

Path2Better fixes this by making **verified social service agencies** the campaign creators. They manage funds, track outcomes, and provide ongoing support.

---

## How It Works

### For Donors
1. **Browse verified campaigns** - Created by trusted local agencies
2. **See transparent budgets** - Know exactly how funds are used
3. **Track impact** - Follow progress from donation to outcome
4. **Choose your support** - One-time donation or monthly sponsorship

### For Agencies  
1. **Create campaigns** - For clients with specific, achievable goals
2. **Manage funds** - Control spending and ensure alignment with goals
3. **Post updates** - Share progress with supporters
4. **Track outcomes** - Mark milestones and document impact

### For Admins
1. **Verify campaigns** - Approve new campaigns and agencies
2. **Monitor activity** - Dashboard with funding, supporter, and update metrics
3. **Manage platform** - User/agency administration

---

## What's Implemented

### Core Features ✅

**User System**
- Email/password authentication with bcrypt hashing
- Three user roles: Donors, Agency Admins, Platform Admins
- Secure session management (HTTP-only cookies)
- Email preference management (4 notification types)

**Donor Experience**
- Dashboard with donation history and impact metrics
- Real-time campaign search with 5-category filtering
- Sorting by funding progress, supporter count, days left, newest
- Social sharing (Facebook, Twitter, WhatsApp, Email, Native)
- Payment method management via Stripe portal
- Email preferences center

**Agency Management**
- Dashboard with campaign management interface
- Performance metrics (raised funds, active campaigns, beneficiaries)
- Campaign creation and editing (UI foundation ready)
- Role-based access control

**Campaign Experience**
- Beautiful browse page with responsive design
- Category-based filtering (Housing, Education, Medical, Employment, Basic Needs)
- Progress visualization with funding percentage and supporter counts
- Campaign detail pages with:
  - Campaign overview and narrative
  - Budget breakdown as milestones
  - Recent updates from agencies
  - Donation sidebar with Stripe integration

**Admin Dashboard**
- Campaign and agency management
- User and role administration
- Platform-wide metrics and monitoring

---

## Technology Stack

**Frontend & Framework**
- Next.js 14 (App Router) with React 18
- TypeScript for type safety
- Tailwind CSS 3 with custom design system

**UI Components & Styling**
- Shadcn/ui (Radix UI primitives)
- Lucide React (icons)
- CSS variables for theming
- Responsive design system

**Backend & Data**
- Sanity CMS for content management
- Stripe for payment processing
- Resend for email delivery
- Custom session-based authentication

**Design Language**
- Deep Teal (#0f766e) primary
- Warm Amber (#f59e0b) secondary
- Modern gradients and smooth transitions
- Mobile-first responsive design

---

## Quick Start

### Requirements
- Node.js 18+ with npm
- Stripe account (test mode for development)
- Sanity account  
- Resend account (for transactional emails)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/path-2-better.git
cd path-2-better

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### Configuration

Edit `.env.local` with your credentials:

```bash
# Stripe (from https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Sanity (from https://sanity.io/manage)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token

# Resend (from https://resend.com/api-keys)
RESEND_API_KEY=re_...

# Security
ADMIN_PASSWORD=your-secure-password
ADMIN_SESSION_SECRET=your-session-secret

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` — the site reloads on file changes.

### Database Setup

```bash
# Seed with sample data
npm run seed

# Deploy Sanity Studio (optional, for remote content management)
npx sanity deploy
```

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
path-2-better/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages
│   ├── admin/               # Admin dashboard
│   ├── agency/              # Agency portal
│   ├── api/                 # API routes
│   ├── campaigns/           # Campaign pages
│   ├── donor/               # Donor dashboard
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── campaigns/           # Campaign-specific components
│   ├── layout/              # Layout (navbar, footer)
│   └── ui/                  # Reusable UI components
├── lib/                      # Utilities
│   ├── auth.ts              # Authentication helpers
│   ├── hooks/               # React hooks (useAuth, etc.)
│   ├── sanity/              # Sanity client & queries
│   ├── stripe/              # Stripe integration
│   └── email/               # Email utilities
├── sanity/                   # CMS configuration
│   └── schemas/             # Content schemas
├── public/                   # Static assets
└── docs/                     # Documentation
```

---

## Key Routes & Features

### Public Routes
- `/` - Home with hero, features, and featured campaigns
- `/campaigns` - Browse with filtering, search, and sorting
- `/campaigns/[slug]` - Campaign detail with donation form
- `/auth/login` - Sign in for donors/admins
- `/auth/signup` - Create account

### Protected Routes (Donors)
- `/donor/dashboard` - Donation history and impact metrics
- `/donor/preferences` - Email notification settings

### Protected Routes (Agencies)
- `/agency/dashboard` - Campaign management and metrics

### Protected Routes (Admins)
- `/admin` - Platform administration
- `/admin/dashboard` - Analytics and monitoring

### API Routes
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - End session
- `GET /api/auth/me` - Get current user
- `PUT /api/donor/preferences` - Save email preferences
- `POST /api/create-checkout-session` - Stripe payment session

---

## Deployment

Deploy to Vercel (recommended for Next.js):

```bash
npm install -g vercel
vercel
```

Or use Railway, Netlify, or any Node.js hosting.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment guide.

---

## Development

### Code Quality
- TypeScript throughout for type safety
- Tailwind CSS for consistent styling
- Responsive mobile-first design
- Error handling with user feedback

### Testing
```bash
# Run tests (coming soon)
npm test
```

### Linting
```bash
npm run lint
```

### Database Schema
Schema is defined in `sanity/schemas/` and includes:
- `Campaign` - Fundraising campaigns
- `Agency` - Partner organizations
- `User` - Donors and admins
- `DonationEvent` - Donation transactions

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes with tests
4. Commit with clear messages (`git commit -m 'Add feature'`)
5. Push to your fork and open a Pull Request

---

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy your own instance
- [Customization Guide](docs/CUSTOMIZATION.md) - Adapt for your city
- [Agency Guide](docs/AGENCY_GUIDE.md) - How agencies use the platform
- [Security & Compliance](docs/SECURITY_AND_COMPLIANCE.md) - PCI scope, monitoring, incident response
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards

---

## Security

**Built-in protections:**
- Payment data handled exclusively by Stripe (no card storage)
- HTTP-only session cookies (CSRF-safe)
- Bcrypt password hashing (10 salt rounds)
- Role-based access control
- Environment variables for secrets

**Recommended for production:**
- OAuth/SSO for admin access
- Audit logging for sensitive operations
- Rate limiting on API routes
- HSTS and CSP headers

See [docs/SECURITY_AND_COMPLIANCE.md](docs/SECURITY_AND_COMPLIANCE.md) for full details.

---

## License

**GNU Affero General Public License v3 (AGPL-3.0)**

This ensures Path2Better remains open source and benefits everyone.

See [LICENSE](LICENSE) for full terms.

**Key points:**
- Free to use, modify, and distribute
- If you run a modified version as a service, users must have access to source code
- Keep improvements open source for the community

---

## Acknowledgments

Path2Better was built in partnership with:

- **YES Shelter for Youth and Families** - Youth housing expertise
- **Brock Mission** - Homelessness support and services
- **Fourcast** - Data and impact measurement
- **Peterborough Housing Corporation** - Housing solutions
- **Local volunteers and advocates** - Community feedback and testing

---

## Roadmap

**In Progress**
- Campaign creation API and form
- Advanced analytics dashboard
- Campaign comment system

**Planned**
- Email notification campaigns
- Tax receipt generation
- CSV export for reports
- Subscription management UI
- Tax receipts (PDF generation)

**Future**
- Mobile app (React Native)
- Offline fundraising integration
- International multi-currency support

---

## Community & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/path-2-better/issues) - Report bugs or request features
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/path-2-better/discussions) - Ask questions and share ideas
- **Email**: support@path2better.com
- **Website**: Coming soon

---

## Vision

Every community should have the tools to support their neighbors experiencing homelessness through transparent, dignified, agency-verified crowdfunding.

By keeping Path2Better open source, communities worldwide can deploy their own instances adapted to local needs while maintaining core principles of transparency and accountability.

**Together, we can build paths to better. Everywhere.**

---

*Path2Better is built with ❤️ for community support and transparency. Licensed under AGPL-3.0.*
