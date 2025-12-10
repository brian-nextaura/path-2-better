type AuditEvent =
  | 'admin_login_success'
  | 'admin_login_failed'
  | 'admin_logout'
  | 'donation_recorded'
  | 'donation_skipped'
  | 'analytics_accessed';

export const logAudit = (event: AuditEvent, details: Record<string, unknown> = {}) => {
  // Lightweight audit trail; in production wire this to a persistent log/monitoring sink.
  console.info(
    `[audit] ${new Date().toISOString()} event=${event} details=${JSON.stringify(details)}`
  );
};
