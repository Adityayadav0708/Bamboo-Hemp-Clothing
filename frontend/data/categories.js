// Category Configuration for Bamboo & Hemp Essentials

export const MOCK_CATEGORIES = [
  {
    id: "cat-01",
    slug: "bamboo-tshirts",
    name: "Bamboo T-Shirts",
    shortName: "Bamboo Tees",
    description:
      "Discover our range of ultra-soft bamboo round neck and polo T-shirts — 3x softer than cotton, anti-odor, and engineered for all-day comfort.",
    bannerImage: "/images/category-bamboo-banner.jpg",
    cardImage: "/images/products/heelium-men-tee-black.png",
    productCount: 4,
    featured: true,
  },
  {
    id: "cat-02",
    slug: "hemp-tshirts",
    name: "Hemp T-Shirts",
    shortName: "Hemp Tees",
    description:
      "Structured, durable, and naturally breathable. Our heritage Himalayan hemp T-shirts get softer with every single wash.",
    bannerImage: "/images/category-hemp-banner.jpg",
    cardImage: "/images/bestseller_2.png",
    productCount: 2,
    featured: true,
  },
  {
    id: "cat-03",
    slug: "mens-innerwear",
    name: "Men's Innerwear",
    shortName: "Men's Innerwear",
    description:
      "Bamboo trunks, boxers, and briefs designed for anti-chafing, moisture-wicking comfort with micro-mesh cooling waistbands.",
    bannerImage: "/images/category-mens-banner.jpg",
    cardImage: "/images/products/heelium-men-trunk-pack3.jpg",
    productCount: 10,
    featured: true,
  },
  {
    id: "cat-04",
    slug: "womens-innerwear",
    name: "Women's Innerwear",
    shortName: "Women's Innerwear",
    description:
      "Gentle on skin, kind to the earth. Breathable bamboo bikini briefs, full-coverage briefs, and racerback tops for weightless daily wear.",
    bannerImage: "/images/category-womens-banner.jpg",
    cardImage: "/images/products/heelium-women-bikini-pack2.webp",
    productCount: 6,
    featured: true,
  },
];

export function getCategoryBySlug(slug) {
  return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
}

export function getAllCategories() {
  return MOCK_CATEGORIES;
}
