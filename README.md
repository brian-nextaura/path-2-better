# Path2Better

> Community-powered pathways forward

An open-source platform connecting communities with neighbours experiencing homelessness through transparent, agency-verified support pathways.

**Live Demo**: Coming soon
**Built for**: Peterborough, Ontario
**Designed to**: Be replicated anywhere

---

## 🌟 The Problem We're Solving

Traditional crowdfunding platforms aren't designed for supporting people experiencing homelessness. They lack:
- **Verification**: Anyone can create campaigns without accountability
- **Support Systems**: No connection to social services or casework
- **Transparency**: Vague goals and unclear fund usage
- **Follow-through**: No progress tracking or outcomes reporting

Path2Better bridges these gaps by partnering exclusively with established social service agencies who verify campaigns, manage funds, and provide ongoing support to participants.

---

## 🎯 How It Works

### For Donors
1. **Browse verified campaigns** - Every campaign is created by trusted local agencies
2. **See transparent budgets** - Know exactly where your money goes
3. **Choose your support** - One-time donation or monthly sponsorship
4. **Track progress** - Receive updates as people achieve their goals

### For Agencies
1. **Create campaigns** - For clients with specific, achievable goals
2. **Manage funds** - Ensure donations are used as intended
3. **Post updates** - Share progress with supporters
4. **Mark milestones** - Celebrate when campaigns are funded or graduated

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Stripe account (test mode for development)
- Sanity account
- Resend account (for emails)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/path-2-better.git
cd path-2-better

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your environment variables in .env.local
# See Configuration section below
```

### Configuration

Edit `.env.local` with your credentials:

```bash
# Stripe (get from https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Sanity (get from https://sanity.io/manage)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token

# Resend (get from https://resend.com/api-keys)
RESEND_API_KEY=re_...

# Admin password (change this!)
ADMIN_PASSWORD=your-secure-password

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Initialize Sanity

```bash
# Initialize Sanity project
npx sanity init

# Deploy Sanity Studio
npx sanity deploy
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

---

## 📁 Project Structure

```
path2better/
├── app/                    # Next.js app directory
│   ├── campaigns/         # Campaign pages
│   ├── admin/            # Admin dashboard
│   ├── api/              # API routes
│   └── ...               # Other pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── campaigns/        # Campaign-specific components
│   └── layout/           # Layout components
├── lib/                   # Utilities
│   ├── sanity/           # Sanity client & queries
│   ├── stripe/           # Stripe client
│   └── email/            # Email functions
├── sanity/                # Sanity schema
│   └── schemas/          # Content schemas
├── public/                # Static assets
└── docs/                  # Documentation
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Vercel

---

## 🏙️ Live Deployments

- Peterborough, ON - Coming soon

**Want to bring Path2Better to your community?** See [DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📖 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy your own instance
- [Customization Guide](docs/CUSTOMIZATION.md) - Adapt for your city
- [Agency Guide](docs/AGENCY_GUIDE.md) - How agencies use the platform

---

## 🔒 Security

- Payment processing handled securely by Stripe
- No credit card data stored on our servers
- Environment variables for sensitive data
- Simple password protection for admin (upgrade recommended for production)
- Server-side admin auth with HTTP-only session cookies (set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`)
- See `docs/SECURITY_AND_COMPLIANCE.md` for PCI scope, monitoring, and incident response notes

For production deployments, consider implementing:
- OAuth/SSO for admin access
- Role-based permissions
- Audit logging
- Rate limiting

---

## 📄 License

MIT License - Copyright (c) 2025 Path2Better

See [LICENSE](LICENSE) for full details.

**TL;DR**: Use it, fork it, improve it. We just ask that you keep it open source.

---

## 🙏 Acknowledgments

Built with support from:
- YES Shelter for Youth and Families
- Brock Mission
- Fourcast
- Peterborough Housing Corporation

---

## 📧 Contact

- **Website**: Coming soon
- **Issues**: [GitHub Issues](https://github.com/yourusername/path-2-better/issues)
- **Email**: support@path2better.com

---

## 🌍 Vision

Our vision is simple: every community should have the tools to support their neighbours experiencing homelessness through transparent, dignified, agency-verified crowdfunding.

By keeping Path2Better open source, we enable communities worldwide to deploy their own instances, adapted to local needs while maintaining the core principles of transparency and accountability.

**Together, we can build paths to better. Everywhere.**
