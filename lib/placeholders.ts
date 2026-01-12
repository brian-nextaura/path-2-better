/**
 * Generate placeholder images from local headshots
 * Uses actual professional headshots stored in public/placeholders
 * Deterministically selects image based on campaign name for consistency
 */

export function generateCategoryPlaceholder(category?: string, campaignName?: string): string {
  // Generate a seed from campaign name to ensure same campaign always gets same image
  // But different campaigns get different images
  let seed = 0;
  
  if (campaignName) {
    // Create a simple hash from the campaign name
    for (let i = 0; i < campaignName.length; i++) {
      seed += campaignName.charCodeAt(i);
    }
  } else {
    // Fallback: use category as seed
    const categoryMap: Record<string, number> = {
      Housing: 100,
      Education: 200,
      Medical: 300,
      Employment: 400,
      'Basic Needs': 500,
    };
    seed = categoryMap[category || 'Basic Needs'] || 500;
  }
  
  // We have 16 headshots (0-15)
  const imageNumber = Math.abs(seed) % 16;
  
  return `/placeholders/headshot-${imageNumber}.jpg`;
}
