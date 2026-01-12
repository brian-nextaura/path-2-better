/**
 * Generate professional placeholder images as SVG data URIs
 * Self-contained, no external dependencies
 */

export function generateCategoryPlaceholder(category?: string): string {
  const categoryColors: Record<string, { bg: string; icon: string; accent: string }> = {
    Housing: {
      bg: '#1e40af',
      icon: '🏠',
      accent: '#ffffff',
    },
    Education: {
      bg: '#7c3aed',
      icon: '📚',
      accent: '#ffffff',
    },
    Medical: {
      bg: '#dc2626',
      icon: '⚕️',
      accent: '#ffffff',
    },
    Employment: {
      bg: '#059669',
      icon: '💼',
      accent: '#ffffff',
    },
    'Basic Needs': {
      bg: '#ea580c',
      icon: '🛒',
      accent: '#ffffff',
    },
  };

  const colors = categoryColors[category || 'Basic Needs'] || categoryColors['Basic Needs'];

  // Create an SVG with the category color as background
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <!-- Background -->
      <rect width="600" height="400" fill="${colors.bg}"/>
      
      <!-- Gradient overlay for depth -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustBrightness(colors.bg, -30)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#grad)"/>
      
      <!-- Centered icon -->
      <text 
        x="300" 
        y="200" 
        font-size="120" 
        text-anchor="middle" 
        dominant-baseline="central"
        font-family="Arial, sans-serif"
      >
        ${colors.icon}
      </text>
    </svg>
  `;

  // Convert to data URI
  const encodedSvg = encodeURIComponent(svg.trim());
  return `data:image/svg+xml,${encodedSvg}`;
}

/**
 * Adjust brightness of a hex color
 */
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
}
