/**
 * Generate professional placeholder images as SVG data URIs
 * Self-contained, no external API calls or dependencies
 * Works reliably across all environments
 */

export function generateCategoryPlaceholder(category?: string): string {
  const categoryStyles: Record<string, { bg: string; gradient: string; icon: string; text: string }> = {
    Housing: {
      bg: '#1e40af',
      gradient: '#1e40af,#1e3a8a',
      icon: '🏠',
      text: 'Housing Support',
    },
    Education: {
      bg: '#7c3aed',
      gradient: '#7c3aed,#6d28d9',
      icon: '📚',
      text: 'Education Fund',
    },
    Medical: {
      bg: '#dc2626',
      gradient: '#dc2626,#991b1b',
      icon: '⚕️',
      text: 'Medical Aid',
    },
    Employment: {
      bg: '#059669',
      gradient: '#059669,#047857',
      icon: '💼',
      text: 'Job Training',
    },
    'Basic Needs': {
      bg: '#ea580c',
      gradient: '#ea580c,#b45309',
      icon: '🛒',
      text: 'Basic Needs',
    },
  };

  const style = categoryStyles[category || 'Basic Needs'] || categoryStyles['Basic Needs'];
  const colors = style.gradient.split(',');

  // Create a professional SVG placeholder with gradient
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    </defs>
    <rect width="600" height="400" fill="url(#grad)"/>
    <circle cx="300" cy="180" r="80" fill="rgba(255,255,255,0.1)"/>
    <text x="300" y="190" font-size="100" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="bold" dominant-baseline="central">${style.icon}</text>
    <text x="300" y="320" font-size="24" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="500" dominant-baseline="central" opacity="0.9">${style.text}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
