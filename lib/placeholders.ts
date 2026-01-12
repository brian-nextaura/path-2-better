/**
 * Generate placeholder images from local headshots
 * Uses actual professional headshots stored in public/placeholders
 */

export function generateCategoryPlaceholder(category?: string): string {
  // Map categories to specific headshot images
  // Using a seeded approach so same category always gets same image variation
  const categoryImageMap: Record<string, number> = {
    Housing: 1,
    Education: 3,
    Medical: 5,
    Employment: 7,
    'Basic Needs': 9,
  };

  const imageIndex = categoryImageMap[category || 'Basic Needs'] || 9;
  
  // We have 16 headshots, cycle through them
  const imageNumber = imageIndex % 16;
  
  return `/placeholders/headshot-${imageNumber}.jpg`;
}

/**
 * Get a random headshot for variety
 * Call this if you want different images on reload
 */
export function getRandomHeadshot(): string {
  const randomIndex = Math.floor(Math.random() * 16);
  return `/placeholders/headshot-${randomIndex}.jpg`;
}
