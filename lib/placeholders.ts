/**
 * Generate high-quality placeholder images from Unsplash
 * Each category gets relevant, professional stock photos
 */

export function generateCategoryPlaceholder(category?: string): string {
  // Unsplash image URLs curated by category
  // Using permanent Unsplash URLs (400x300 size, optimized)
  const categoryImages: Record<string, string> = {
    Housing: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop', // Modern apartment
    Education: 'https://images.unsplash.com/photo-1427504494785-405a6e6ca514?w=600&h=400&fit=crop', // Student studying
    Medical: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop', // Healthcare worker
    Employment: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', // Professional workspace
    'Basic Needs': 'https://images.unsplash.com/photo-1488459716781-8d4d9f458b63?w=600&h=400&fit=crop', // Shopping bags
  };

  return categoryImages[category || 'Basic Needs'] || categoryImages['Basic Needs'];
}
