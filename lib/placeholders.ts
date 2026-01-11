/**
 * Generate professional placeholder images for campaigns
 * Uses a combination of gradients, icons, and text overlays
 */

export function generatePlaceholderImage(
  category: string | undefined,
  name: string
): string {
  // Color schemes for each category
  const categoryColors: Record<string, { gradient: string; accent: string }> = {
    Housing: {
      gradient: '1e40af-1e3a8a', // Blue gradient
      accent: 'ffffff',
    },
    Education: {
      gradient: '7c3aed-6d28d9', // Purple gradient
      accent: 'ffffff',
    },
    Medical: {
      gradient: 'dc2626-991b1b', // Red gradient
      accent: 'ffffff',
    },
    Employment: {
      gradient: '059669-047857', // Green gradient
      accent: 'ffffff',
    },
    'Basic Needs': {
      gradient: 'ea580c-b45309', // Orange gradient
      accent: 'ffffff',
    },
  };

  const colors = categoryColors[category || 'Basic Needs'] || categoryColors['Basic Needs'];
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Use placeholder service to generate image
  // Format: https://via.placeholder.com/600x400/color/text
  const url = `https://via.placeholder.com/600x400/${colors.gradient.split('-')[0]}/${colors.accent}?text=${encodeURIComponent(initials)}&fontSize=120&fontFamily=Arial&fontWeight=bold`;

  return url;
}

/**
 * Generate a solid color placeholder with initials
 * More reliable than gradient approach
 */
export function generateInitialAvatar(name: string, category?: string): string {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Color map by category for consistency
  const categoryBg: Record<string, string> = {
    Housing: '1e40af',
    Education: '7c3aed',
    Medical: 'dc2626',
    Employment: '059669',
    'Basic Needs': 'ea580c',
  };

  const bgColor = categoryBg[category || 'Basic Needs'] || 'ea580c';

  return `https://via.placeholder.com/600x400/${bgColor}/ffffff?text=${encodeURIComponent(initials)}&fontSize=120&fontFamily=Arial,sans-serif&fontWeight=bold`;
}

/**
 * Alternative: Use a more polished placeholder service
 */
export function generateUiAvatarsPlaceholder(name: string, category?: string): string {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Color codes for ui-avatars
  const categoryBg: Record<string, string> = {
    Housing: '1e40af',
    Education: '7c3aed',
    Medical: 'dc2626',
    Employment: '059669',
    'Basic Needs': 'ea580c',
  };

  const bgColor = categoryBg[category || 'Basic Needs'] || 'ea580c';

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&bold=true&size=600&font-size=0.25`;
}

/**
 * Generate a professional placeholder using dicebear
 * Great variety and reliable
 */
export function generateDicebearPlaceholder(name: string, category?: string): string {
  const categoryBg: Record<string, string> = {
    Housing: '1e40af',
    Education: '7c3aed',
    Medical: 'dc2626',
    Employment: '059669',
    'Basic Needs': 'ea580c',
  };

  const bgColor = categoryBg[category || 'Basic Needs'] || 'ea580c';
  const seed = name.toLowerCase().replace(/\s/g, '_');

  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bgColor}&textColor=ffffff&fontSize=40`;
}

/**
 * Best option: Use gradient placeholder with category icon
 */
export function generateCategoryPlaceholder(category?: string): string {
  const categoryIcons: Record<string, string> = {
    Housing: '🏠',
    Education: '📚',
    Medical: '⚕️',
    Employment: '💼',
    'Basic Needs': '🛒',
  };

  const icon = categoryIcons[category || 'Basic Needs'] || '💙';

  const categoryBg: Record<string, string> = {
    Housing: '1e40af',
    Education: '7c3aed',
    Medical: 'dc2626',
    Employment: '059669',
    'Basic Needs': 'ea580c',
  };

  const bgColor = categoryBg[category || 'Basic Needs'] || 'ea580c';

  return `https://via.placeholder.com/600x400/${bgColor}/ffffff?text=${encodeURIComponent(
    icon
  )}&fontSize=200`;
}
