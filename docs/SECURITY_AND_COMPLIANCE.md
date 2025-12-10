# Security, Compliance, and Operational Posture

## Authentication, Authorization, and Audit
- Admin access is enforced server-side via `ADMIN_PASSWORD` + signed HTTP-only session cookies (`ADMIN_SESSION_SECRET`). No secrets are shipped to the client.
- `/admin` app routes and `/api/admin/*` routes are protected by middleware; unauthenticated requests are redirected/blocked.
- Audit events (logins, webhook donations, analytics access) are logged server-side; wire `logAudit` to your logging/monitoring sink for retention.

## Payments and PCI Scope
- All card data is entered and transmitted directly to Stripe. Path2Better does not store or process cardholder data, keeping the platform out of PCI DSS scope (SAQ A).
- Amounts are validated server-side, campaigns are checked for eligibility, and Stripe webhook events update Sanity for reconciliation.

## Data Handling & Privacy
- Donation records store: amount (cents), campaign slug, Stripe session ID, donation type, timestamp.
- Personal data: donor email is used for receipts and updates; card data never touches Path2Better systems.
- Review and honor deletion/opt-out requests; retain donation logs only as long as required for reporting/audit.

## Availability, Monitoring, and Incident Response
- Monitor uptime, webhook delivery, and Sanity write errors; alert on failures to record donations.
- On critical incidents (payment failures, data exposure), notify affected stakeholders within 24 hours and document remediation.
- Rotate `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` regularly; restrict `SANITY_API_TOKEN` to the minimum scopes required for writes.

## Fee Model
- No platform fee is added by Path2Better. Standard Stripe processing fees apply per transaction unless overridden in your Stripe account.
