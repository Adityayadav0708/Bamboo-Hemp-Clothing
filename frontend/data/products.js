// Authentic Bamboo & Hemp Apparel Products Catalog
// Focused strictly on T-Shirts and Everyday Innerwear
// Sourced from Heelium & Heritage Hemp Textiles

export const MOCK_PRODUCTS = [
  // ── Bamboo Men's T-Shirts ────────────────────────────────────────────────
  {
    id: "hl-tee-01",
    slug: "bamboo-round-neck-tshirt-men",
    name: "Bamboo Round Neck T-shirt for Men",
    category: "bamboo-tshirts",
    categoryLabel: "Bamboo T-Shirts",
    price: 990,
    originalPrice: 1999,
    currency: "INR",
    images: [
      "/images/products/heelium-men-tee-black.png",
      "/images/products/heelium-men-tee-grey.png",
      "/images/products/heelium-men-tee-blue.png",
      "/images/products/heelium-men-tee-white.png",
    ],
    colors: [
      { name: "Pitch Black", hex: "#1A1A1A", slug: "pitch-black" },
      { name: "Charcoal Grey", hex: "#4A4D4A", slug: "charcoal-grey" },
      { name: "Navy Blue", hex: "#1E2B4D", slug: "navy-blue" },
      { name: "Cloud White", hex: "#FAF9F5", slug: "cloud-white" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badges: ["Bestseller", "Ultra-Soft"],
    description:
      "Crafted from premium bamboo viscose, this round-neck t-shirt is 3x softer than conventional cotton. Features 4-way stretch, active moisture-wicking, and naturally anti-bacterial bamboo kun bio-agents that keep you odor-free in Indian heat.",
    fabric: "67% Bamboo Viscose, 28% Organic Cotton, 5% Spandex",
    care: "Machine wash cold gentle cycle with mild detergent. Do not bleach. Air dry in shade or tumble dry low.",
    inStock: true,
    rating: 4.81,
    reviewCount: 342,
    isNew: false,
    isBestseller: true,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Three fibres. One considered blend.",
      subtext: "Bamboo for a soft feel. Cotton for structure. Spandex for movement. The difference is the blend—not simply swapping one fibre for another.",
      image: "/images/products/features/fabric_blend_macro.jpg",
      breakdown: [
        { percent: "67%", fiber: "Bamboo", role: "soft feel" },
        { percent: "28%", fiber: "Cotton", role: "structure" },
        { percent: "5%", fiber: "Spandex", role: "stretch" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "A closer neckline. A neater fit.",
        desc: "Our specially constructed neck rib sits closer around your neck. It helps keep the neckline centred, instead of leaving a wide opening that hangs to one side.",
        tag: "Specially constructed, close-fitting neck rib",
        image: "/images/products/features/neckline_detail.png",
      },
      {
        num: "02",
        title: "Reach. Bend. Keep moving.",
        desc: "A tee shouldn't make everyday movement feel restrictive. Four-way stretch gives the fabric room to move with you.",
        tag: "Bamboo softness, with spandex for stretch",
        image: "/images/products/features/stretch_detail.jpg",
      },
    ],
    stylingNote: {
      tag: "MAKE IT PART OF YOUR EVERYDAY",
      headline: "One easy layer. More ways to wear it.",
      subtext: "Black, blue, grey or white. Wear it on its own with jeans, or layer it under an open shirt. The same soft bamboo blend in every colour.",
      image: "/images/products/features/hangers_colorways.png",
    },
    fitGuide: {
      headline: "Find your everyday fit.",
      subtext: "Use the size chart below and compare it with a T-shirt you wear comfortably. Check your selected colour and size before adding to cart.",
      headers: ["Size", "Chest (cm)", "Chest (in)", "Length (cm)", "Shoulder (in)"],
      rows: [
        ["S", "96 cm", "38 in", "69 cm", "16.5 in"],
        ["M", "101 cm", "40 in", "71 cm", "17.5 in"],
        ["L", "106 cm", "42 in", "73 cm", "18.5 in"],
        ["XL", "111 cm", "44 in", "75 cm", "19.5 in"],
        ["2XL", "116 cm", "46 in", "77 cm", "20.5 in"],
      ],
    },
    faqs: [
      {
        q: "What is the fabric composition?",
        a: "67% Bamboo Viscose, 28% Organic Cotton, and 5% Spandex. Woven for a silky second-skin hand feel with structure and flexible recovery.",
      },
      {
        q: "How does bamboo compare to ordinary cotton in summer?",
        a: "Bamboo fibers have microscopic cross-gaps that absorb and evaporate moisture 3x faster than cotton, keeping your skin 2° to 3° cooler in hot and humid weather.",
      },
      {
        q: "How should I care for it?",
        a: "Machine wash cold on a gentle cycle. Wash with like colors. Avoid chlorine bleach. Hang to air dry in shade or tumble dry on delicate low.",
      },
      {
        q: "Can I return or exchange if the fit isn't right?",
        a: "Yes! We offer a 15-day doorstep return and size exchange policy across India on all unwashed, tagged garments.",
      },
    ],
  },
  {
    id: "hl-tee-02",
    slug: "bamboo-polo-tshirt-men",
    name: "Bamboo Polo T-shirt for Men",
    category: "bamboo-tshirts",
    categoryLabel: "Bamboo T-Shirts",
    price: 1499,
    originalPrice: 2499,
    currency: "INR",
    images: [
      "/images/products/heelium-men-polo-black.png",
      "/images/products/heelium-men-polo-teal.webp",
    ],
    colors: [
      { name: "Obsidian Black", hex: "#1A1A1A", slug: "obsidian-black" },
      { name: "Forest Teal", hex: "#1E4B45", slug: "forest-teal" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badges: ["Premium Weave"],
    description:
      "A tailored collar polo t-shirt with ribbed cuffs and subtle bamboo luster. Naturally thermoregulating to maintain personal comfort from office hours through evening leisure.",
    fabric: "70% Bamboo Viscose, 25% Cotton, 5% Elastane",
    care: "Machine wash cold inside out. Flat dry recommended. Warm iron if needed.",
    inStock: true,
    rating: 4.89,
    reviewCount: 156,
    isNew: true,
    isBestseller: false,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Structured pique. Natural bamboo sheen.",
      subtext: "70% bamboo yarn provides silky thermal management, while tightly spun cotton maintains a crisp, non-collapsing placket and collar.",
      image: "/images/products/features/fabric_blend_macro.jpg",
      breakdown: [
        { percent: "70%", fiber: "Bamboo Viscose", role: "cooling breathability" },
        { percent: "25%", fiber: "Organic Cotton", role: "collar structure" },
        { percent: "5%", fiber: "Elastane", role: "cuff & hem retention" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "Reinforced 3-button placket.",
        desc: "Designed to stay sharp without curling after multiple washes. Elegant mother-of-pearl finish buttons.",
        tag: "Structured smart-casual silhouette",
        image: "/images/products/heelium-men-polo-black.png",
      },
      {
        num: "02",
        title: "Side-split vents for mobility.",
        desc: "Tailored hem with subtle side slits allows seamless tucking or casual untucked wear.",
        tag: "Reinforced bar-tack side slits",
        image: "/images/products/features/stretch_detail.jpg",
      },
    ],
    stylingNote: {
      tag: "WORK TO WEEKEND",
      headline: "Elevated comfort for every setting.",
      subtext: "Wear it under a blazer for weekday meetings or pair it with chinos for weekend dining.",
      image: "/images/products/features/hangers_colorways.png",
    },
    fitGuide: {
      headline: "Polo Size Guide",
      subtext: "Regular tailored fit. Select your standard size for a refined profile.",
      headers: ["Size", "Chest (cm)", "Chest (in)", "Length (cm)", "Collar (in)"],
      rows: [
        ["S", "98 cm", "38.5 in", "70 cm", "15 in"],
        ["M", "103 cm", "40.5 in", "72 cm", "15.5 in"],
        ["L", "108 cm", "42.5 in", "74 cm", "16 in"],
        ["XL", "113 cm", "44.5 in", "76 cm", "16.5 in"],
        ["2XL", "118 cm", "46.5 in", "78 cm", "17 in"],
      ],
    },
    faqs: [
      { q: "Does the collar curl after washing?", a: "No. The collar is woven with a high-density interlining that retains its crisp fold through repeated wash cycles." },
      { q: "Is it suitable for humid climates?", a: "Yes! Bamboo viscose absorbs sweat instantly, keeping you fresh and sweat-stain-free throughout the day." },
    ],
  },

  // ── Bamboo Women's T-Shirts & Tops ───────────────────────────────────────
  {
    id: "hl-tee-03",
    slug: "bamboo-round-neck-tshirt-women",
    name: "Bamboo Women's Round Neck T-shirt",
    category: "bamboo-tshirts",
    categoryLabel: "Bamboo T-Shirts",
    price: 999,
    originalPrice: 1999,
    currency: "INR",
    images: [
      "/images/products/heelium-women-tee-white.png",
      "/images/products/heelium-women-tee-blue.png",
    ],
    colors: [
      { name: "Pristine White", hex: "#FFFFFF", slug: "pristine-white" },
      { name: "Deep Navy", hex: "#1A2744", slug: "deep-navy" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badges: ["Second-Skin", "Bestseller"],
    description:
      "A feather-light, relaxed silhouette round neck t-shirt designed specifically for all-day breathability. Micro-porous bamboo fibers eliminate skin irritation and keep you cool.",
    fabric: "68% Bamboo Viscose, 27% Organic Cotton, 5% Spandex",
    care: "Gentle machine wash cold. Do not tumble dry. Iron on low heat.",
    inStock: true,
    rating: 4.85,
    reviewCount: 219,
    isNew: false,
    isBestseller: true,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Fluid drape. Unmatched softness.",
      subtext: "Designed with smooth, round fiber cross-sections that eliminate surface friction against sensitive skin.",
      image: "/images/products/features/fabric_blend_macro.jpg",
      breakdown: [
        { percent: "68%", fiber: "Bamboo Viscose", role: "weightless drape" },
        { percent: "27%", fiber: "Organic Cotton", role: "opaque coverage" },
        { percent: "5%", fiber: "Spandex", role: "contour stretch" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "Clean curved neckline.",
        desc: "Sits comfortably at the collarbone with delicate double-stitch binding.",
        tag: "Feminine relaxed drape",
        image: "/images/products/heelium-women-tee-white.png",
      },
      {
        num: "02",
        title: "Non-see-through knit.",
        desc: "Woven at optimal GSM to ensure complete opacity in Pristine White while retaining airflow.",
        tag: "180 GSM cloud-weight knit",
        image: "/images/products/features/stretch_detail.jpg",
      },
    ],
    stylingNote: {
      tag: "EFFORTLESS STYLING",
      headline: "The foundational layer you'll reach for daily.",
      subtext: "Pairs seamlessly with linen trousers, high-waisted denim, or worn loosely around the home.",
      image: "/images/products/features/hangers_colorways.png",
    },
    fitGuide: {
      headline: "Women's T-Shirt Sizing",
      subtext: "Relaxed regular fit. If you prefer a snug fit, size down.",
      headers: ["Size", "Bust (cm)", "Bust (in)", "Length (cm)", "Waist (in)"],
      rows: [
        ["XS", "86 cm", "34 in", "62 cm", "26-28 in"],
        ["S", "91 cm", "36 in", "64 cm", "28-30 in"],
        ["M", "96 cm", "38 in", "66 cm", "30-32 in"],
        ["L", "101 cm", "40 in", "68 cm", "32-34 in"],
        ["XL", "106 cm", "42 in", "70 cm", "34-36 in"],
      ],
    },
    faqs: [
      { q: "Is the white t-shirt see-through?", a: "No. The 68/27/5 yarn ratio provides full opacity while keeping the t-shirt weightless and breathable." },
      { q: "How does it feel against sensitive skin?", a: "Bamboo fibers are naturally hypoallergenic and round, meaning zero friction or allergic reactions even on sensitive skin." },
    ],
  },
  {
    id: "hl-tee-04",
    slug: "bamboo-racerback-tank-top-women",
    name: "Bamboo Racerback Tank Top for Women",
    category: "womens-innerwear",
    categoryLabel: "Women's Innerwear",
    price: 699,
    originalPrice: 1299,
    currency: "INR",
    images: [
      "/images/products/heelium-women-tank-blue.png",
    ],
    colors: [
      { name: "Cerulean Blue", hex: "#2A4B7C", slug: "cerulean-blue" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badges: ["Anti-Chafing"],
    description:
      "A buttery-soft bamboo racerback tank top providing non-restrictive 360° airflow. Ideal as a base layer or light lounge top with flatlock stitching that prevents chafing.",
    fabric: "95% Bamboo Viscose, 5% Spandex",
    care: "Machine wash cold gentle. Wash with like colors. Line dry.",
    inStock: true,
    rating: 4.74,
    reviewCount: 98,
    isNew: true,
    isBestseller: false,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Fluid motion. Second-skin comfort.",
      subtext: "95% bamboo viscose blended with 5% spandex for flexible shape retention throughout yoga, active movement, and sleep.",
      image: "/images/products/features/fabric_blend_macro.jpg",
      breakdown: [
        { percent: "95%", fiber: "Bamboo Viscose", role: "cooling hand-feel" },
        { percent: "5%", fiber: "Spandex", role: "4-way contour stretch" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "Ergonomic racerback cut.",
        desc: "Liberates shoulder movement without digging straps.",
        tag: "Non-restrictive scapula cut",
        image: "/images/products/heelium-women-tank-blue.png",
      },
    ],
    stylingNote: {
      tag: "ACTIVE & LOUNGE",
      headline: "Cooling base layer.",
      subtext: "Designed to layer under sheer tops or wear standalone in warm weather.",
      image: "/images/products/features/hangers_colorways.png",
    },
    fitGuide: {
      headline: "Tank Top Fit Guide",
      subtext: "Stretchy contour fit.",
      headers: ["Size", "Bust (in)", "Length (cm)"],
      rows: [
        ["XS", "32-34 in", "60 cm"],
        ["S", "34-36 in", "62 cm"],
        ["M", "36-38 in", "64 cm"],
        ["L", "38-40 in", "66 cm"],
        ["XL", "40-42 in", "68 cm"],
      ],
    },
    faqs: [
      { q: "Can I wear this for workouts?", a: "Absolutely. The natural bamboo kun antimicrobial properties eliminate body odor even during intense sweat sessions." },
    ],
  },

  // ── Hemp T-Shirts ────────────────────────────────────────────────────────
  {
    id: "hmp-01",
    slug: "heritage-hemp-boxy-tee",
    name: "Heritage Himalayan Hemp Boxy Tee",
    category: "hemp-tshirts",
    categoryLabel: "Hemp T-Shirts",
    price: 1499,
    originalPrice: 2299,
    currency: "INR",
    images: [
      "/images/home/bestseller_2.png",
      "/images/home/hd/neutral_tee_hd.jpg",
    ],
    colors: [
      { name: "Natural Sand", hex: "#D9D1C2", slug: "natural-sand" },
      { name: "Forest Moss", hex: "#2E4D3E", slug: "forest-moss" },
      { name: "Earthy Charcoal", hex: "#333533", slug: "earthy-charcoal" },
    ],
    sizes: ["S", "M", "L", "XL"],
    badges: ["Gets Softer Every Wash", "Bestseller"],
    description:
      "Crafted from rain-fed Himalayan hemp bast fibers blended with organic cotton. Hemp is 4x more durable than conventional cotton, naturally UV protective (UPF 50+), and gets softer with every single wash.",
    fabric: "55% Himalayan Heritage Hemp, 45% Organic Cotton",
    care: "Machine wash cold with mild detergent. Hang to dry in shade. Naturally wrinkle-relaxing.",
    inStock: true,
    rating: 4.92,
    reviewCount: 184,
    isNew: false,
    isBestseller: true,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Two regenerative bast fibres. Built to outlast.",
      subtext: "Himalayan hemp bast fibers provide unmatched tensile strength and UV blocking. Organic cotton softens the hand-feel from wear one.",
      image: "/images/home/hd/linen_texture_hd.jpg",
      breakdown: [
        { percent: "55%", fiber: "Himalayan Hemp", role: "tensile strength & UPF 50+" },
        { percent: "45%", fiber: "Organic Cotton", role: "familiar soft structure" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "Reinforced double-needle hem.",
        desc: "Built with heavy-duty organic thread that will not twist, torque, or fray.",
        tag: "4x stronger than commercial cotton",
        image: "/images/home/bestseller_2.png",
      },
      {
        num: "02",
        title: "Naturally antimicrobial bast core.",
        desc: "Hemp fibers naturally resist mold, bacteria, and odors, meaning fewer washes per wear.",
        tag: "Rain-fed Himalayan crop, zero pesticides",
        image: "/images/home/hd/neutral_tee_hd.jpg",
      },
    ],
    stylingNote: {
      tag: "HEIRLOOM DURABILITY",
      headline: "Relaxed drop-shoulder boxy cut.",
      subtext: "Structured drape that holds its silhouette without clinging in humid weather.",
      image: "/images/home/hd/folded_tees_hd.jpg",
    },
    fitGuide: {
      headline: "Hemp Boxy Fit Guide",
      subtext: "Contemporary boxy drop-shoulder cut.",
      headers: ["Size", "Chest (in)", "Length (cm)", "Sleeve (in)"],
      rows: [
        ["S", "40 in", "70 cm", "8.5 in"],
        ["M", "42 in", "72 cm", "9 in"],
        ["L", "44 in", "74 cm", "9.5 in"],
        ["XL", "46 in", "76 cm", "10 in"],
      ],
    },
    faqs: [
      { q: "Is hemp rough against the skin?", a: "Not at all. We blend 55% Himalayan bast hemp with 45% combed organic cotton, giving it a soft, linen-like feel that gets noticeably softer with every single wash cycle." },
      { q: "Does hemp shrink?", a: "Our hemp fabrics are pre-washed and pre-shrunk before stitching, guaranteeing minimal to zero shrinkage when washed in cold water." },
    ],
  },
  {
    id: "hmp-02",
    slug: "himalayan-hemp-classic-crew",
    name: "Himalayan Hemp Classic Crew Tee",
    category: "hemp-tshirts",
    categoryLabel: "Hemp T-Shirts",
    price: 1399,
    originalPrice: 1999,
    currency: "INR",
    images: [
      "/images/home/hd/green_tee_hd.jpg",
      "/images/home/hd/folded_tees_hd.jpg",
    ],
    colors: [
      { name: "Pine Green", hex: "#244B3C", slug: "pine-green" },
      { name: "Raw Oatmeal", hex: "#ECE5D8", slug: "raw-oatmeal" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badges: ["Zero Pesticides"],
    description:
      "A classic crew-neck silhouette built for daily heavy rotation. Breathable open-weave hemp structure allows heat dissipation in hot and humid weather.",
    fabric: "55% Hemp, 45% Organic Cotton",
    care: "Gentle machine wash cold. Do not wring. Dry flat.",
    inStock: true,
    rating: 4.8,
    reviewCount: 112,
    isNew: true,
    isBestseller: false,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Pure bast performance.",
      subtext: "Grown naturally in the Himalayan foothills using 70% less water than industrial cotton.",
      image: "/images/home/hd/green_tee_hd.jpg",
      breakdown: [
        { percent: "55%", fiber: "Hemp Bast", role: "heat dissipation" },
        { percent: "45%", fiber: "Organic Cotton", role: "pure softness" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "Reinforced collar band.",
        desc: "Retains its clean circular shape wash after wash.",
        tag: "Shape-lock crew neck rib",
        image: "/images/home/hd/folded_tees_hd.jpg",
      },
    ],
    stylingNote: {
      tag: "TIMELESS CREW",
      headline: "Built for lifetime wear.",
      subtext: "Earthy botanical tones that look natural in every season.",
      image: "/images/home/hd/folded_tees_hd.jpg",
    },
    fitGuide: {
      headline: "Crew Neck Sizing",
      subtext: "Standard regular fit.",
      headers: ["Size", "Chest (in)", "Length (cm)"],
      rows: [
        ["S", "38 in", "69 cm"],
        ["M", "40 in", "71 cm"],
        ["L", "42 in", "73 cm"],
        ["XL", "44 in", "75 cm"],
        ["2XL", "46 in", "77 cm"],
      ],
    },
    faqs: [
      { q: "How is Himalayan hemp harvested?", a: "Hand-harvested by local mountain cooperatives in Uttarakhand, utilizing centuries-old dew-retting methods that require zero synthetic chemicals." },
    ],
  },

    {
  id: "hmp-03",
  slug: "organic-hemp-crew-tshirt",
  name: "Organic Himalayan Hemp Native Crew T-Shirt",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1299,
  originalPrice: 1899,
  currency: "INR",
  images: [
    "/images/products/hemp-organic-hemp-t-shirts-2.webp",
    "/images/products/hemp-organic-hemp-t-shirts-4.webp"
  ],
  colors: [
    {
      name: "Earth Tan",
      hex: "#C2A385",
      slug: "earth-tan"
    },
    {
      name: "Desert Dune",
      hex: "#D9CEB8",
      slug: "desert-dune"
    },
    {
      name: "Mountain Slate",
      hex: "#4A4E51",
      slug: "mountain-slate"
    }
  ],
  sizes: [
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "100% Bast Hemp",
    "Zero Pesticides"
  ],
  description: "Sourced from native Himalayan mountain bast crops. Naturally porous cellular hollow fibers vent heat and moisture 3x faster than cotton, offering UPF 50+ sun protection and getting softer with every single wash.",
  fabric: "100% Organic Himalayan Bast Hemp (180 GSM)",
  care: "Cold machine wash gentle with mild plant-based detergent. Line dry in shade. Naturally wrinkle-relaxing.",
  inStock: true,
  rating: 4.93,
  reviewCount: 168,
  isNew: true,
  isBestseller: true,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "100% Pure Himalayan bast fiber. Zero compromise.",
    subtext: "Grown in high-altitude terrain with rain-fed irrigation. Naturally antibacterial, moisture-wicking, and breathable in warm Indian climates.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "100%",
        fiber: "Himalayan Hemp",
        role: "tensile strength & UPF 50+"
      },
      {
        percent: "180",
        fiber: "GSM Weight",
        role: "breathable all-season weave"
      },
      {
        percent: "0%",
        fiber: "Synthetics",
        role: "pure biodegradable yarn"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "Reinforced double-needle hem & placket.",
      desc: "Stitched with heavy-gauge organic thread that will not twist, torque, or fray across years of heavy wear.",
      tag: "4x stronger than commercial cotton",
      image: "/images/products/hemp-organic-hemp-t-shirts-2.webp"
    },
    {
      num: "02",
      title: "Pre-softened bast weave.",
      desc: "Hemp fibers undergo an eco-enzyme stone softening bath to ensure immediate comfort from day one, breaking in gracefully after every laundry cycle.",
      tag: "Naturally anti-microbial & UV blocking",
      image: "/images/products/hemp-organic-hemp-t-shirts-4.webp"
    }
  ],
  stylingNote: {
    tag: "EARTHY ELEVATION",
    headline: "Earth-toned drape for effortless layering.",
    subtext: "Earthy hues inspired by the mountain terrain. Wear it solo with washed denim or layered under an unbuttoned overshirt.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Native Crew Sizing",
    subtext: "Standard regular fit. True to Indian sizing.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "S",
        "39 in",
        "99 cm",
        "70 cm"
      ],
      [
        "M",
        "41 in",
        "104 cm",
        "72 cm"
      ],
      [
        "L",
        "43 in",
        "109 cm",
        "74 cm"
      ],
      [
        "XL",
        "45 in",
        "114 cm",
        "76 cm"
      ],
      [
        "2XL",
        "47 in",
        "119 cm",
        "78 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Devendra S.",
      location: "Dehradun",
      rating: 5,
      date: "Verified Buyer",
      title: "Unmatched natural texture",
      comment: "This is genuine mountain hemp. It has substantial body without feeling heavy, and breathes better than any linen tee I've tried."
    },
    {
      author: "Nikhil K.",
      location: "Bengaluru",
      rating: 5,
      date: "Verified Buyer",
      title: "Gets softer with every wash",
      comment: "Washed it 4 times now and it is noticeably softer each time while retaining its collar shape. The earth tan color is fantastic."
    },
    {
      author: "Aditi R.",
      location: "Mumbai",
      rating: 5,
      date: "Verified Buyer",
      title: "Substantial, not flimsy",
      comment: "Holds its structure in humid weather. Doesn't cling to your chest or back. Truly top quality."
    }
  ],
  faqs: [
    {
      q: "Is 100% hemp rough against skin?",
      a: "Not at all. We pre-wash our bast fibers with organic bio-enzymes, removing raw stiffness so it feels gentle from the first day."
    },
    {
      q: "Does hemp protect against the sun?",
      a: "Yes. Hemp fiber naturally blocks 98% of harmful ultraviolet rays, conferring UPF 50+ protection without synthetic chemical coatings."
    },
    {
      q: "How should I wash it?",
      a: "Cold gentle machine wash with mild plant detergent. Hang to dry in shade. Naturally relaxes wrinkles without aggressive ironing."
    },
    {
      q: "What is your exchange policy?",
      a: "We provide a 15-day doorstep size exchange across India on all unworn items."
    }
  ]
},

  {
  id: "hmp-04",
  slug: "hemp-graphic-tshirt-retro-aviator",
  name: "Hemp Graphic T-Shirt – Retro Aviator Edition",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1299,
  originalPrice: 1799,
  currency: "INR",
  images: [
    "/images/products/hemp-100-hemp-t-shirts-2.webp",
    "/images/products/hemp-100-hemp-t-shirts-4.webp"
  ],
  colors: [
    {
      name: "Washed Black",
      hex: "#1C1B1A",
      slug: "washed-black"
    },
    {
      name: "Vintage Charcoal",
      hex: "#383635",
      slug: "vintage-charcoal"
    }
  ],
  sizes: [
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "Bio-Enzyme Washed",
    "High-Density Print"
  ],
  description: "Everyday streetwear ease meets sustainable bast durability. Cut with a modern regular fit from bio-enzyme pre-softened hemp-cotton jersey featuring vintage retro sunglasses graphic print.",
  fabric: "55% Himalayan Bast Hemp, 45% Organic Cotton (190 GSM)",
  care: "Machine wash cold inside out. Flat or line dry in shade. Warm iron on reverse side of print.",
  inStock: true,
  rating: 4.89,
  reviewCount: 142,
  isNew: true,
  isBestseller: false,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "Hemp durability. Organic cotton softness.",
    subtext: "55% hemp bast provides structural drape and anti-odor longevity, while 45% organic ring-spun cotton delivers immediate everyday comfort.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "55%",
        fiber: "Himalayan Hemp",
        role: "tensile strength & UPF 50+"
      },
      {
        percent: "45%",
        fiber: "Organic Cotton",
        role: "soft hand feel & structure"
      },
      {
        percent: "190",
        fiber: "GSM Jersey",
        role: "durable streetwear weight"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "High-density water-based screenprint.",
      desc: "Printed using non-toxic water-based inks that penetrate fiber pores without creating a rubbery or stiff sweat patch.",
      tag: "Zero PVC or phthalates",
      image: "/images/products/hemp-100-hemp-t-shirts-2.webp"
    },
    {
      num: "02",
      title: "Side-seamed anti-torque construction.",
      desc: "Cut and sewn with reinforced side seams to prevent twisting or distortion after repeated laundering.",
      tag: "Retains symmetrical drape",
      image: "/images/products/hemp-100-hemp-t-shirts-4.webp"
    }
  ],
  stylingNote: {
    tag: "STREETWEAR VERSATILITY",
    headline: "Effortless casual styling with edge.",
    subtext: "Pair with cargo trousers, relaxed chinos, or summer shorts. Clean silhouette with standout vintage eyewear graphic.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Graphic Tee Fit Guide",
    subtext: "Contemporary regular cut with room across the chest.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "S",
        "39 in",
        "99 cm",
        "70 cm"
      ],
      [
        "M",
        "41 in",
        "104 cm",
        "72 cm"
      ],
      [
        "L",
        "43 in",
        "109 cm",
        "74 cm"
      ],
      [
        "XL",
        "45 in",
        "114 cm",
        "76 cm"
      ],
      [
        "2XL",
        "47 in",
        "119 cm",
        "78 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Siddharth M.",
      location: "Pune",
      rating: 5,
      date: "Verified Buyer",
      title: "Print quality is exceptional",
      comment: "The print feels like part of the fabric rather than a plastic sticker. The washed black color looks vintage and premium."
    },
    {
      author: "Karan B.",
      location: "Gurgaon",
      rating: 5,
      date: "Verified Buyer",
      title: "Great everyday weight",
      comment: "Substantial 190 GSM feel. Doesn't feel thin or cheap. Holds up great in the wash without cracking."
    },
    {
      author: "Rohit V.",
      location: "Chandigarh",
      rating: 5,
      date: "Verified Buyer",
      title: "Super comfortable cut",
      comment: "Roomy without looking sloppy. Hemp really keeps body temperature regulated when outdoors."
    }
  ],
  faqs: [
    {
      q: "Will the graphic print crack or peel?",
      a: "No. We utilize water-based discharge screen-printing where pigment binds directly to the hemp yarn rather than sitting on top."
    },
    {
      q: "How should I wash graphic hemp tees?",
      a: "Machine wash cold inside out with similar colors. Line dry in shade to preserve color saturation."
    },
    {
      q: "Is the fabric itchy?",
      a: "Not at all. The fabric undergoes a specialized bio-enzyme wash that removes any bast fiber roughness before stitching."
    },
    {
      q: "Can I exchange for another size?",
      a: "Yes, 15-day doorstep size replacement across all regions of India."
    }
  ]
},

  {
  id: "hmp-05",
  slug: "eco-friendly-oversized-hemp-tshirt-dino",
  name: "Oversized Hemp T-Shirt – Dino Edition",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1249,
  originalPrice: 1699,
  currency: "INR",
  images: [
    "/images/products/hemp-eco-friendly-oversized-t-shirts-in-hemp-2.webp",
    "/images/products/hemp-eco-friendly-oversized-t-shirts-in-hemp-4.webp"
  ],
  colors: [
    {
      name: "Onyx Black",
      hex: "#151515",
      slug: "onyx-black"
    },
    {
      name: "Cloud White",
      hex: "#F8F7F4",
      slug: "cloud-white"
    }
  ],
  sizes: [
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "Oversized Fit",
    "Heavyweight 200 GSM"
  ],
  description: "A relaxed, drop-shoulder streetwear silhouette crafted from 200 GSM heavy hemp bast jersey. Plays with a playful graphic illustration, double-needle locked hems, and a non-twisting neck collar.",
  fabric: "60% Himalayan Hemp, 40% Organic Combed Cotton (200 GSM)",
  care: "Cold gentle machine wash. Do not tumble dry high. Hang to maintain shape.",
  inStock: true,
  rating: 4.88,
  reviewCount: 96,
  isNew: true,
  isBestseller: false,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "60% Bast Hemp. 200 GSM Heavyweight drape.",
    subtext: "Dense yet breathable open cellular weave that falls straight and boxy, providing superior structural presence without clinging.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "60%",
        fiber: "Himalayan Hemp",
        role: "structured drape & UPF 50+"
      },
      {
        percent: "40%",
        fiber: "Organic Cotton",
        role: "soft combed hand feel"
      },
      {
        percent: "200",
        fiber: "GSM Weight",
        role: "heavyweight streetwear drape"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "Engineered drop-shoulder cut.",
      desc: "Generous shoulder drop and relaxed bicep openings create a balanced, effortless boxy silhouette.",
      tag: "Modern streetwear proportion",
      image: "/images/products/hemp-eco-friendly-oversized-t-shirts-in-hemp-2.webp"
    },
    {
      num: "02",
      title: "Locked 1x1 rib neckline.",
      desc: "Thick 1-inch neck rib woven with tight cotton-hemp blend to prevent neck sag even after repeated wears.",
      tag: "Non-collapsing collar",
      image: "/images/products/hemp-eco-friendly-oversized-t-shirts-in-hemp-4.webp"
    }
  ],
  stylingNote: {
    tag: "STREETWEAR CAPSULE",
    headline: "Bold illustration with heavyweight drape.",
    subtext: "Style with wide-leg trousers, baggy jeans, or over a long-sleeve base layer for an elevated urban aesthetic.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Oversized Fit Guide",
    subtext: "Cut intentionally oversized. Order your normal size for a loose boxy fit, or size down for regular fit.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "S",
        "42 in",
        "106 cm",
        "72 cm"
      ],
      [
        "M",
        "44 in",
        "111 cm",
        "74 cm"
      ],
      [
        "L",
        "46 in",
        "116 cm",
        "76 cm"
      ],
      [
        "XL",
        "48 in",
        "121 cm",
        "78 cm"
      ],
      [
        "2XL",
        "50 in",
        "127 cm",
        "80 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Aakash T.",
      location: "Mumbai",
      rating: 5,
      date: "Verified Buyer",
      title: "Perfect boxy fit",
      comment: "The heavyweight fabric drapes cleanly without clinging. The dino graphic is vibrant and gets plenty of compliments."
    },
    {
      author: "Pranav S.",
      location: "Bengaluru",
      rating: 5,
      date: "Verified Buyer",
      title: "Thick yet breathable",
      comment: "200 GSM is substantial! Perfect for casual Fridays and evening outings. Very durable fabric."
    },
    {
      author: "Manish J.",
      location: "Hyderabad",
      rating: 5,
      date: "Verified Buyer",
      title: "High quality collar",
      comment: "Collar stays round and tight after washing. Great job on the stitching and hem."
    }
  ],
  faqs: [
    {
      q: "Is this tee true to size?",
      a: "It is cut intentionally oversized with a 2-inch chest allowance and dropped shoulders. If you prefer a fitted look, select one size smaller."
    },
    {
      q: "How does the heavyweight fabric feel in warm weather?",
      a: "Hemp fibers are hollow and breathable, allowing constant airflow even at 200 GSM weight."
    },
    {
      q: "Does the white color become see-through?",
      a: "No. Thanks to the 200 GSM dense weave, the Cloud White colorway is completely opaque."
    },
    {
      q: "Can I exchange if size is too big?",
      a: "Yes, free doorstep size exchange within 15 days."
    }
  ]
},

  {
  id: "hmp-06",
  slug: "mens-hemp-round-neck-tshirt-be-strong",
  name: "Men's Hemp Everyday Crew Tee – Be Strong Edition",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1199,
  originalPrice: 1699,
  currency: "INR",
  images: [
    "/images/products/hemp-men-round-neck-t-shirt-2-2.webp",
    "/images/products/hemp-men-round-neck-t-shirt-2-4.webp"
  ],
  colors: [
    {
      name: "Pine Green",
      hex: "#1E3F35",
      slug: "pine-green"
    },
    {
      name: "Earth Brown",
      hex: "#6A4935",
      slug: "earth-brown"
    },
    {
      name: "Deep Navy",
      hex: "#182236",
      slug: "deep-navy"
    }
  ],
  sizes: [
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "Everyday Classic",
    "Anti-Torque Rib"
  ],
  description: "Designed for resilient all-day rotation. Features a signature 'BE STRONG' typography patch across the chest, reinforced ribbed collar, and anti-twist side seams that stay straight after dozens of washes.",
  fabric: "55% Himalayan Hemp, 45% Organic Ring-Spun Cotton (180 GSM)",
  care: "Machine wash cold. Do not dry-clean. Hang to dry.",
  inStock: true,
  rating: 4.87,
  reviewCount: 118,
  isNew: false,
  isBestseller: true,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "55% Mountain Hemp. 45% Organic Cotton.",
    subtext: "Natural thermal regulation that keeps skin cool in high humidity. Himalayan hemp bast fibers actively resist odor bacteria.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "55%",
        fiber: "Himalayan Bast Hemp",
        role: "tensile strength & UPF 50+"
      },
      {
        percent: "45%",
        fiber: "Ring-Spun Cotton",
        role: "soft daily structure"
      },
      {
        percent: "180",
        fiber: "GSM Weight",
        role: "lightweight everyday breathability"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "Flatlock seam stitching.",
      desc: "Eliminates chafing along shoulders and underarms during workouts, long drives, and warm weather commutes.",
      tag: "Zero seam abrasion",
      image: "/images/products/hemp-men-round-neck-t-shirt-2-2.webp"
    },
    {
      num: "02",
      title: "Shape-lock crew collar.",
      desc: "Constructed with spandex-reinforced organic ribbing that returns to its original circumference after every wear.",
      tag: "Stays centered & flat",
      image: "/images/products/hemp-men-round-neck-t-shirt-2-4.webp"
    }
  ],
  stylingNote: {
    tag: "DAILY ESSENTIAL",
    headline: "The tee that works as hard as you do.",
    subtext: "Deep natural forest and earth tones that look sharp with dark jeans or khaki chinos.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Everyday Crew Sizing",
    subtext: "Classic Indian standard regular fit.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "S",
        "39 in",
        "99 cm",
        "70 cm"
      ],
      [
        "M",
        "41 in",
        "104 cm",
        "72 cm"
      ],
      [
        "L",
        "43 in",
        "109 cm",
        "74 cm"
      ],
      [
        "XL",
        "45 in",
        "114 cm",
        "76 cm"
      ],
      [
        "2XL",
        "47 in",
        "119 cm",
        "78 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Chirag N.",
      location: "Ahmedabad",
      rating: 5,
      date: "Verified Buyer",
      title: "Pine green shade is gorgeous",
      comment: "Rich botanical green tone that hasn't faded after several washes. Very comfortable fabric that breathes well in Gujarat heat."
    },
    {
      author: "Harish M.",
      location: "Chennai",
      rating: 5,
      date: "Verified Buyer",
      title: "No sweat odor",
      comment: "The antimicrobial claim is real. Wore it all day running errands and remained fresh."
    },
    {
      author: "Rohan D.",
      location: "Delhi",
      rating: 5,
      date: "Verified Buyer",
      title: "Solid construction",
      comment: "The collar doesn't stretch out and the chest print looks crisp. Will order the brown one next."
    }
  ],
  faqs: [
    {
      q: "Is the graphic print breathable?",
      a: "Yes, our screenprint uses permeable non-toxic pigments so air moves through the garment freely."
    },
    {
      q: "Will this tee fade in the sun?",
      a: "Our yarns are dyed with high-fastness low-impact reactive dyes that resist UV fading."
    },
    {
      q: "How should I dry it?",
      a: "Hang drying in shade preserves the bast fibers and natural fabric elasticity."
    },
    {
      q: "Are returns hassle-free?",
      a: "Yes, 15-day doorstep returns and size exchanges."
    }
  ]
},

  {
  id: "hmp-07",
  slug: "oversized-hemp-japanese-dragon-tshirt",
  name: "Oversized Hemp Graphic Tee – Japanese Dragon Edition",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1299,
  originalPrice: 1899,
  currency: "INR",
  images: [
    "/images/products/hemp-oversized-t-shirts-in-organic-cotton-2.webp",
    "/images/products/hemp-oversized-t-shirts-in-organic-cotton-4.webp"
  ],
  colors: [
    {
      name: "Plum Wine",
      hex: "#47333F",
      slug: "plum-wine"
    },
    {
      name: "Washed Black",
      hex: "#1B1A1A",
      slug: "washed-black"
    }
  ],
  sizes: [
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "Boxy Fit",
    "Botanical Dye"
  ],
  description: "Showcasing intricate Japanese dragon artwork and solar red motifs on rich plum hemp jersey. Heavyweight boxy drape that hangs effortlessly without sticking to skin during humid summers.",
  fabric: "55% Himalayan Bast Hemp, 45% Organic Cotton (200 GSM)",
  care: "Machine wash cold with like darks. Iron inside out.",
  inStock: true,
  rating: 4.91,
  reviewCount: 135,
  isNew: true,
  isBestseller: false,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "Intricate artwork on 200 GSM bast knit.",
    subtext: "Combines high-detail precision illustration with heavy-gauge bast durability. Will not pill or degrade across years of wear.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "55%",
        fiber: "Himalayan Bast Hemp",
        role: "structured drape & UPF 50+"
      },
      {
        percent: "45%",
        fiber: "Organic Cotton",
        role: "smooth printable canvas"
      },
      {
        percent: "200",
        fiber: "GSM Weight",
        role: "drop-shoulder structure"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "Multilayer screenprint detailing.",
      desc: "White, solar red, and slate pigment inks layered for tactile relief that withstands hot laundry cycles.",
      tag: "High-definition artwork",
      image: "/images/products/hemp-oversized-t-shirts-in-organic-cotton-2.webp"
    },
    {
      num: "02",
      title: "Reinforced drop shoulder seams.",
      desc: "Double-needle chain-stitched shoulder seams to maintain clean rectangular posture without sagging.",
      tag: "Tailored boxy drape",
      image: "/images/products/hemp-oversized-t-shirts-in-organic-cotton-4.webp"
    }
  ],
  stylingNote: {
    tag: "ARTISAN STREETWEAR",
    headline: "Statement graphic with an earthy soul.",
    subtext: "Pair with relaxed sage trousers, light wash denim, or layered over a turtleneck in cooler months.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Dragon Boxy Sizing",
    subtext: "Relaxed drop-shoulder silhouette.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "S",
        "42 in",
        "106 cm",
        "72 cm"
      ],
      [
        "M",
        "44 in",
        "111 cm",
        "74 cm"
      ],
      [
        "L",
        "46 in",
        "116 cm",
        "76 cm"
      ],
      [
        "XL",
        "48 in",
        "121 cm",
        "78 cm"
      ],
      [
        "2XL",
        "50 in",
        "127 cm",
        "80 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Varun G.",
      location: "Kolkata",
      rating: 5,
      date: "Verified Buyer",
      title: "Artwork is stunning",
      comment: "The dragon design has incredible sharpness and the plum wine color is very unique. Fits exactly as an oversized tee should."
    },
    {
      author: "Samir P.",
      location: "Mumbai",
      rating: 5,
      date: "Verified Buyer",
      title: "Heaviest, best quality tee I own",
      comment: "Feels like high-end Japanese streetwear but at an accessible price. Hemp makes it so much cooler to wear than standard 100% cotton."
    },
    {
      author: "Deepak S.",
      location: "Bengaluru",
      rating: 5,
      date: "Verified Buyer",
      title: "Drapes wonderfully",
      comment: "Doesn't crease easily and holds its shape throughout the entire day."
    }
  ],
  faqs: [
    {
      q: "Is the dragon print durable?",
      a: "Yes, our screen printing uses premium flexible inks cured at high temperatures to resist peeling and flaking."
    },
    {
      q: "How does the plum dye hold up?",
      a: "We use reactive eco-dyes with high colorfastness that maintain depth of shade across wash cycles."
    },
    {
      q: "What size should I choose?",
      a: "Choose your normal size for a relaxed oversized look, or size down if you prefer a slimmer profile."
    },
    {
      q: "Is exchange available?",
      a: "Yes, 15-day doorstep exchange across India."
    }
  ]
},

  {
  id: "hmp-08",
  slug: "oversized-unisex-hemp-graphic-tee-better-days",
  name: "Oversized Hemp Graphic Tee – Better Days Ahead",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1249,
  originalPrice: 1749,
  currency: "INR",
  images: [
    "/images/products/hemp-cute-oversized-unisex-t-shirts-2.webp",
    "/images/products/hemp-cute-oversized-unisex-t-shirts-4.webp"
  ],
  colors: [
    {
      name: "Caramel Brown",
      hex: "#754C29",
      slug: "caramel-brown"
    },
    {
      name: "Dusty Olive",
      hex: "#4B523E",
      slug: "dusty-olive"
    }
  ],
  sizes: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "Unisex Fit",
    "Eco-Enzyme Softened"
  ],
  description: "Streetwear versatility with an uplifting retro graphic. Crafted with drop shoulders and wider sleeve openings for a breezy, relaxed fit that feels weightless and stays odor-free.",
  fabric: "55% Himalayan Hemp, 45% Combed Organic Cotton (195 GSM)",
  care: "Machine wash cold on gentle. Line dry.",
  inStock: true,
  rating: 4.9,
  reviewCount: 114,
  isNew: true,
  isBestseller: false,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "Unisex silhouette. Regenerative bast blend.",
    subtext: "Designed to be worn by anyone, anywhere. Pre-washed with biodegradable enzymes to ensure maximum softness straight out of the box.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "55%",
        fiber: "Himalayan Hemp",
        role: "tensile strength & UPF 50+"
      },
      {
        percent: "45%",
        fiber: "Combed Cotton",
        role: "plush soft hand feel"
      },
      {
        percent: "195",
        fiber: "GSM Weight",
        role: "all-season unisex drape"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "Reinforced ribbed neckband.",
      desc: "Thick 2.5cm ribbed collar engineered to maintain shape wash after wash without curling or loosening.",
      tag: "Zero bacon neckline",
      image: "/images/products/hemp-cute-oversized-unisex-t-shirts-2.webp"
    },
    {
      num: "02",
      title: "Deep armhole boxy drape.",
      desc: "Generous underarm allowance allows constant airflow and complete freedom of motion.",
      tag: "Breezy summer comfort",
      image: "/images/products/hemp-cute-oversized-unisex-t-shirts-4.webp"
    }
  ],
  stylingNote: {
    tag: "RETRO STREETWEAR",
    headline: "Laidback confidence for everyday wear.",
    subtext: "Caramel brown hue pairs seamlessly with black cargo pants, light chinos, or denim skirts.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Unisex Oversized Sizing",
    subtext: "Intentionally relaxed. Women may size down for an optimal oversized aesthetic.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "XS",
        "39 in",
        "99 cm",
        "68 cm"
      ],
      [
        "S",
        "41 in",
        "104 cm",
        "70 cm"
      ],
      [
        "M",
        "43 in",
        "109 cm",
        "72 cm"
      ],
      [
        "L",
        "45 in",
        "114 cm",
        "74 cm"
      ],
      [
        "XL",
        "47 in",
        "119 cm",
        "76 cm"
      ],
      [
        "2XL",
        "49 in",
        "124 cm",
        "78 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Meghna D.",
      location: "Pune",
      rating: 5,
      date: "Verified Buyer",
      title: "Love the unisex fit!",
      comment: "I bought size S and it gives the perfect relaxed oversized look with biker shorts or baggy jeans. So comfortable!"
    },
    {
      author: "Rishabh K.",
      location: "Jaipur",
      rating: 5,
      date: "Verified Buyer",
      title: "Warm caramel color is great",
      comment: "Rich earth tone that matches everything. The print has a nice retro vibe and doesn't feel sweaty in hot weather."
    },
    {
      author: "Tanmay B.",
      location: "Delhi",
      rating: 5,
      date: "Verified Buyer",
      title: "Breathable and soft",
      comment: "Hemp is genuinely better than pure cotton for Delhi summers. Highly recommend."
    }
  ],
  faqs: [
    {
      q: "Is this suitable for women too?",
      a: "Yes, it is designed with a unisex boxy cut. Women typically take one size down from their standard women's size for the ideal oversized fit."
    },
    {
      q: "How does the fabric feel against sensitive skin?",
      a: "Our eco-enzyme wash removes bast fiber stiffness, leaving it soft, hypoallergenic, and irritation-free."
    },
    {
      q: "Can it be ironed?",
      a: "Yes, warm iron inside out. Hemp naturally relaxes wrinkles quickly."
    },
    {
      q: "What is your exchange policy?",
      a: "15-day doorstep size exchange across all PIN codes in India."
    }
  ]
},

  {
  id: "hmp-09",
  slug: "organic-hemp-cotton-minimalist-tee",
  name: "Minimalist Embroidered Hemp-Cotton T-Shirt",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1199,
  originalPrice: 1599,
  currency: "INR",
  images: [
    "/images/products/hemp-organic-hemp-cotton-t-shirt-2.webp",
    "/images/products/hemp-organic-hemp-cotton-t-shirt-4.webp"
  ],
  colors: [
    {
      name: "Oatmeal Heather",
      hex: "#DDD8CC",
      slug: "oatmeal-heather"
    },
    {
      name: "Sage Mist",
      hex: "#C2CCBE",
      slug: "sage-mist"
    }
  ],
  sizes: [
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "Subtle Embroidery",
    "180 GSM"
  ],
  description: "A clean, versatile wardrobe staple featuring a subtle botanical leaf micro-embroidery on the left chest. Soft breathable bast knit designed for warm climate desk-to-dinner wear.",
  fabric: "55% Organic Himalayan Hemp, 45% Organic Cotton (180 GSM)",
  care: "Gentle cold machine wash. Lay flat to dry or hang in shade.",
  inStock: true,
  rating: 4.86,
  reviewCount: 92,
  isNew: false,
  isBestseller: false,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "Understated elegance. Pure bast breathability.",
    subtext: "Lightweight 180 GSM heather jersey with subtle natural nep texture that shows the organic character of Himalayan hemp.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "55%",
        fiber: "Himalayan Hemp",
        role: "heat dissipation & UPF 50+"
      },
      {
        percent: "45%",
        fiber: "Organic Cotton",
        role: "gentle second-skin feel"
      },
      {
        percent: "180",
        fiber: "GSM Jersey",
        role: "airy summer drape"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "Precision botanical micro-embroidery.",
      desc: "Embroidered with fine organic cotton thread on the chest that lays smooth without irritating skin on the reverse.",
      tag: "Zero scratch backing",
      image: "/images/products/hemp-organic-hemp-cotton-t-shirt-2.webp"
    },
    {
      num: "02",
      title: "Pre-shrunk ring-spun jersey.",
      desc: "Pre-washed to eliminate post-purchase shrinkage, ensuring your chosen size stays consistent laundry after laundry.",
      tag: "Consistent dimensions",
      image: "/images/products/hemp-organic-hemp-cotton-t-shirt-4.webp"
    }
  ],
  stylingNote: {
    tag: "QUIET LUXURY",
    headline: "The understated essential for every capsule wardrobe.",
    subtext: "Dress it up under an unstructured blazer or pair down with linen shorts for weekend leisure.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Minimalist Crew Fit Guide",
    subtext: "Tailored regular cut. Sits cleanly on the shoulders.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "S",
        "39 in",
        "99 cm",
        "70 cm"
      ],
      [
        "M",
        "41 in",
        "104 cm",
        "72 cm"
      ],
      [
        "L",
        "43 in",
        "109 cm",
        "74 cm"
      ],
      [
        "XL",
        "45 in",
        "114 cm",
        "76 cm"
      ],
      [
        "2XL",
        "47 in",
        "119 cm",
        "78 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Alok S.",
      location: "Kochi",
      rating: 5,
      date: "Verified Buyer",
      title: "Subtle and sophisticated",
      comment: "The tiny embroidered leaf is tasteful and elegant. Oatmeal heather looks very high-end."
    },
    {
      author: "Dinesh M.",
      location: "Goa",
      rating: 5,
      date: "Verified Buyer",
      title: "Incredible in coastal humidity",
      comment: "Doesn't stick to the skin even when sweating. The open bast structure lets the sea breeze right through."
    },
    {
      author: "Kavita N.",
      location: "Bengaluru",
      rating: 5,
      date: "Verified Buyer",
      title: "Very soft fabric",
      comment: "Much softer than regular linen shirts. Looks clean and minimal."
    }
  ],
  faqs: [
    {
      q: "Does the embroidery itch against bare skin?",
      a: "No. The embroidery uses ultra-soft micro-thread with a flat heat-sealed backing that never chafes."
    },
    {
      q: "Is the oatmeal color sheer?",
      a: "No. The 180 GSM yarn density provides full opacity while remaining lightweight and airy."
    },
    {
      q: "How do I maintain the oatmeal heather shade?",
      a: "Wash with mild non-bleach detergent in cold water and dry in shade."
    },
    {
      q: "What if the size is too snug?",
      a: "We offer 15-day free size exchanges."
    }
  ]
},

  {
  id: "hmp-10",
  slug: "heavyweight-hemp-nature-edition-tee",
  name: "Heavyweight Hemp Nature Edition T-Shirt",
  category: "hemp-tshirts",
  categoryLabel: "Hemp T-Shirts",
  price: 1349,
  originalPrice: 1999,
  currency: "INR",
  images: [
    "/images/products/hemp-premium-quality-organic-hemp-t-shirts-2.webp",
    "/images/products/hemp-premium-quality-organic-hemp-t-shirts-4.webp"
  ],
  colors: [
    {
      name: "Charcoal Heather",
      hex: "#363836",
      slug: "charcoal-heather"
    },
    {
      name: "Deep Pine",
      hex: "#1F3025",
      slug: "deep-pine"
    }
  ],
  sizes: [
    "S",
    "M",
    "L",
    "XL",
    "2XL"
  ],
  badges: [
    "Heavyweight 210 GSM",
    "UPF 50+"
  ],
  description: "Substantial 210 GSM hemp bast jersey with 'BE A FORCE OF NATURE' bar-code forest print. Heavy duty durability that stands up to rugged outdoor movement while breathing effortlessly.",
  fabric: "55% Himalayan Bast Hemp, 45% Organic Ring-Spun Cotton (210 GSM)",
  care: "Machine wash cold. Line dry in shade. Naturally resistant to pilling and snagging.",
  inStock: true,
  rating: 4.94,
  reviewCount: 156,
  isNew: true,
  isBestseller: true,
  materialStory: {
    tag: "KNOW WHAT YOU'RE WEARING",
    headline: "210 GSM Heavyweight bast. Extreme durability.",
    subtext: "Our densest hemp blend. Built for outdoor expeditions, travel, and rugged daily wear with UPF 50+ ultraviolet protection.",
    image: "/images/products/features/fabric_blend_macro.jpg",
    breakdown: [
      {
        percent: "55%",
        fiber: "Himalayan Bast Hemp",
        role: "tensile strength & UPF 50+"
      },
      {
        percent: "45%",
        fiber: "Ring-Spun Cotton",
        role: "dense soft hand feel"
      },
      {
        percent: "210",
        fiber: "GSM Weight",
        role: "heavyweight rugged durability"
      }
    ]
  },
  constructionDetails: [
    {
      num: "01",
      title: "Reinforced double-needle topstitching.",
      desc: "Constructed with heavy-gauge organic thread across collar, shoulders, and bottom hem for exceptional seam strength.",
      tag: "Engineered for 500+ washes",
      image: "/images/products/hemp-premium-quality-organic-hemp-t-shirts-2.webp"
    },
    {
      num: "02",
      title: "Forest barcode chest screenprint.",
      desc: "A stylized barcode transforming into a pine forest skyline. Printed with breathable eco-inks that never peel.",
      tag: "Eco-solvent water inks",
      image: "/images/products/hemp-premium-quality-organic-hemp-t-shirts-4.webp"
    }
  ],
  stylingNote: {
    tag: "OUTDOOR HERITAGE",
    headline: "Rugged durability with a modern conscience.",
    subtext: "Designed for mountain trails, road trips, and urban weekends. Pair with heavy denim or utility cargos.",
    image: "/images/products/features/hangers_colorways.png"
  },
  fitGuide: {
    headline: "Heavyweight Tee Sizing",
    subtext: "Structured regular fit with a comfortable chest drape.",
    headers: [
      "Size",
      "Chest (in)",
      "Chest (cm)",
      "Length (cm)"
    ],
    rows: [
      [
        "S",
        "40 in",
        "101 cm",
        "71 cm"
      ],
      [
        "M",
        "42 in",
        "106 cm",
        "73 cm"
      ],
      [
        "L",
        "44 in",
        "111 cm",
        "75 cm"
      ],
      [
        "XL",
        "46 in",
        "116 cm",
        "77 cm"
      ],
      [
        "2XL",
        "48 in",
        "121 cm",
        "79 cm"
      ]
    ]
  },
  reviews: [
    {
      author: "Gautam V.",
      location: "Shimla",
      rating: 5,
      date: "Verified Buyer",
      title: "The best hemp t-shirt in India",
      comment: "Substantial 210 GSM weight. You can feel the quality immediately. Wore it trekking and it kept me warm in wind and cool in sun."
    },
    {
      author: "Abhinav T.",
      location: "Delhi",
      rating: 5,
      date: "Verified Buyer",
      title: "Tough as nails",
      comment: "Does not lose its shape or pill even after rugged wear and frequent washing. The barcode graphic is subtle and cool."
    },
    {
      author: "Prateek J.",
      location: "Mumbai",
      rating: 5,
      date: "Verified Buyer",
      title: "Excellent fit & finish",
      comment: "Drapes cleanly and feels like an heirloom garment. Definitely buying more."
    }
  ],
  faqs: [
    {
      q: "Is 210 GSM too heavy for summer?",
      a: "No. Unlike synthetic fibers, hemp fibers are hollow and breathable, creating micro-ventilation that disperses trapped body heat."
    },
    {
      q: "Does the fabric pill over time?",
      a: "Hemp fibers are exceptionally long and durable, naturally preventing surface pilling and fuzzing."
    },
    {
      q: "How should I wash it?",
      a: "Machine wash cold. Hang dry in shade. Avoid hot tumble drying to preserve fiber resilience."
    },
    {
      q: "What is your return policy?",
      a: "15-day doorstep return and size exchange across India."
    }
  ]
},

// ── Bamboo Men's Trunks (Single & Multi-Packs) ───────────────────────────
  {
    id: "hl-trk-03",
    slug: "bamboo-underwear-trunk-men-pack3",
    name: "Bamboo Underwear Trunk for Men (Pack of 3)",
    category: "mens-innerwear",
    categoryLabel: "Men's Innerwear",
    price: 1299,
    originalPrice: 2199,
    currency: "INR",
    images: [
      "/images/products/heelium-men-trunk-pack3.jpg",
    ],
    colors: [
      { name: "Trio Combo (Black/White/Wine)", hex: "#3A2A2A", slug: "trio-combo" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badges: ["Top Rated", "Save ₹900"],
    description:
      "Heelium's flagship 3-pack bamboo trunks. Features no-roll cooling waistband, flatlock anti-chafing seams, and natural antibacterial protection.",
    fabric: "95% Bamboo Viscose, 5% Elastane",
    care: "Machine wash cold. Air dry or tumble dry delicate.",
    inStock: true,
    rating: 4.88,
    reviewCount: 615,
    isNew: false,
    isBestseller: true,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Micro-vented bamboo knit. Zero friction.",
      subtext: "Pure bamboo viscose delivers 3x the moisture absorption of cotton, paired with 5% elastane for a contoured pouch that never rides up.",
      image: "/images/products/heelium-men-trunk-pack3.jpg",
      breakdown: [
        { percent: "95%", fiber: "Bamboo Viscose", role: "cooling & anti-odor" },
        { percent: "5%", fiber: "Elastane", role: "flexible stay-down hold" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "No-roll cooling waistband.",
        desc: "Woven with micro-ventilation channels and a soft-brushed plush inner lining that stays flat without pinching or digging into your waist.",
        tag: "Micro-mesh moisture ventilation band",
        image: "/images/products/heelium-men-trunk-pack3.jpg",
      },
      {
        num: "02",
        title: "Anti-chafing ergonomic pouch.",
        desc: "Anatomically curved 3D contour pouch with flatlock frictionless seams eliminates inner-thigh friction in humid Indian weather.",
        tag: "Zero-friction 3-inch stay-down inseam",
        image: "/images/products/heelium-men-trunk-black.jpg",
      },
    ],
    stylingNote: {
      tag: "ALL-DAY INVISIBLE COMFORT",
      headline: "Your first layer should be your best layer.",
      subtext: "Engineered for 16-hour workdays, high-intensity workouts, and humid commutes. Odor-free and weightless.",
      image: "/images/products/heelium-men-trunk-pack4.jpg",
    },
    fitGuide: {
      headline: "Men's Trunk Sizing",
      subtext: "Snug, comfortable waist fit.",
      headers: ["Size", "Waist (in)", "Waist (cm)", "Inseam (in)"],
      rows: [
        ["S", "28 - 30 in", "71 - 76 cm", "3 in"],
        ["M", "31 - 33 in", "78 - 84 cm", "3 in"],
        ["L", "34 - 36 in", "86 - 91 cm", "3 in"],
        ["XL", "37 - 39 in", "93 - 99 cm", "3.5 in"],
        ["2XL", "40 - 42 in", "101 - 106 cm", "3.5 in"],
      ],
    },
    faqs: [
      { q: "Does the waistband roll down?", a: "No. Our waistband is constructed with high-resilience micro-elastic with dual grip channels to stay completely flat." },
      { q: "Is bamboo really odor-resistant for underwear?", a: "Yes. Bamboo kun is a natural antimicrobial bio-agent inherent to bamboo plants that survives processing and inhibits bacteria growth that causes sweat odor." },
    ],
  },
  {
    id: "hl-trk-01",
    slug: "bamboo-underwear-trunk-men-pack1",
    name: "Bamboo Underwear Trunk for Men (Single)",
    category: "mens-innerwear",
    categoryLabel: "Men's Innerwear",
    price: 499,
    originalPrice: 799,
    currency: "INR",
    images: [
      "/images/products/heelium-men-trunk-black.jpg",
    ],
    colors: [
      { name: "Classic Black", hex: "#1A1A1A", slug: "classic-black" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badges: ["Zero Chafing"],
    description:
      "Single bamboo trunk with micro-mesh cooling waistband and ergonomic anti-chafing contour pouch. Ultra-breathable, antimicrobial, and stays in place without rolling.",
    fabric: "95% Bamboo Viscose, 5% Elastane",
    care: "Machine wash cold gentle cycle. Do not bleach. Air dry.",
    inStock: true,
    rating: 4.8,
    reviewCount: 420,
    isNew: false,
    isBestseller: true,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Pure bamboo microfiber knit.",
      subtext: "95% bamboo viscose with 5% elastane. 360° airflow keeps skin cool and dry.",
      image: "/images/products/heelium-men-trunk-black.jpg",
      breakdown: [
        { percent: "95%", fiber: "Bamboo Viscose", role: "anti-odor softness" },
        { percent: "5%", fiber: "Elastane", role: "body-adaptive fit" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "No-roll waistband.",
        desc: "Engineered to eliminate folding and pinching.",
        tag: "Plush micro-elastic band",
        image: "/images/products/heelium-men-trunk-black.jpg",
      },
    ],
    stylingNote: {
      tag: "DAILY ESSENTIAL",
      headline: "The single trunk upgrade.",
      subtext: "Try the bamboo difference for your daily commute and workout.",
      image: "/images/products/heelium-men-trunk-pack2.jpg",
    },
    fitGuide: {
      headline: "Trunk Fit Guide",
      subtext: "True to Indian waist sizing.",
      headers: ["Size", "Waist (in)", "Inseam (in)"],
      rows: [
        ["S", "28-30 in", "3 in"],
        ["M", "31-33 in", "3 in"],
        ["L", "34-36 in", "3 in"],
        ["XL", "37-39 in", "3.5 in"],
        ["2XL", "40-42 in", "3.5 in"],
      ],
    },
    faqs: [
      { q: "How long do these trunks last?", a: "Engineered to withstand over 150+ washes without losing shape or pilling when washed in cold water." },
    ],
  },

  // ── Bamboo Women's Innerwear ─────────────────────────────────────────────
  {
    id: "hl-wbk-02",
    slug: "bamboo-bikini-underwear-women-pack2",
    name: "Bamboo Bikini Underwear for Women (Pack of 2)",
    category: "womens-innerwear",
    categoryLabel: "Women's Innerwear",
    price: 799,
    originalPrice: 1399,
    currency: "INR",
    images: [
      "/images/products/heelium-women-bikini-pack2.webp",
    ],
    colors: [
      { name: "Duo Pack (Blush & Black)", hex: "#3A2A2A", slug: "blush-black-duo" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badges: ["Bestseller", "Save ₹600"],
    description:
      "Pack of 2 bamboo bikini panties. Seamless laser-finish edges eliminate panty lines under trousers and dresses.",
    fabric: "95% Bamboo Viscose, 5% Elastane",
    care: "Machine wash cold gentle. Wash with like colors.",
    inStock: true,
    rating: 4.9,
    reviewCount: 284,
    isNew: false,
    isBestseller: true,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Weightless second skin. Pure hypoallergenic comfort.",
      subtext: "Silky bamboo viscose protects the most sensitive skin from chafing, moisture buildup, and bacterial irritation.",
      image: "/images/products/heelium-women-bikini-pack2.webp",
      breakdown: [
        { percent: "95%", fiber: "Bamboo Viscose", role: "gentle breathability" },
        { percent: "5%", fiber: "Elastane", role: "no-pinch stretch" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "Seamless laser-cut edges.",
        desc: "Ultra-thin bonded edges lay completely flat under activewear, dresses, and trousers with zero visible panty lines.",
        tag: "Invisible under tight-fitting clothing",
        image: "/images/products/heelium-women-bikini-pack2.webp",
      },
      {
        num: "02",
        title: "Double-layer breathable bamboo gusset.",
        desc: "Pure bamboo fabric in the sensitive contact zone inhibits odor-causing bacteria and allows continuous 24-hour airflow.",
        tag: "Dermatologist-recommended natural hygiene",
        image: "/images/products/heelium-women-bikini-pack1.webp",
      },
    ],
    stylingNote: {
      tag: "EVERYDAY HYGIENE",
      headline: "The ultimate second skin.",
      subtext: "Feels weightless from morning to bedtime without digging or bunching.",
      image: "/images/products/heelium-women-bikini-pack2.webp",
    },
    fitGuide: {
      headline: "Bikini Size Guide",
      subtext: "Comfortable low-to-mid rise.",
      headers: ["Size", "Hip (in)", "Hip (cm)", "Waist (in)"],
      rows: [
        ["XS", "34-36 in", "86-91 cm", "24-26 in"],
        ["S", "36-38 in", "91-96 cm", "26-28 in"],
        ["M", "38-40 in", "96-101 cm", "28-30 in"],
        ["L", "40-42 in", "101-106 cm", "30-32 in"],
        ["XL", "42-44 in", "106-112 cm", "32-34 in"],
      ],
    },
    faqs: [
      { q: "Is the gusset pure bamboo?", a: "Yes. The inner gusset is 100% bamboo viscose, offering a non-toxic, chemical-free layer for sensitive skin." },
      { q: "Will they show panty lines?", a: "No. The laser-cut edges and ultra-flat seams ensure complete invisibility under leggings, yoga pants, and trousers." },
    ],
  },
  {
    id: "hl-wbr-02",
    slug: "bamboo-brief-women-pack3",
    name: "Bamboo Underwear Brief for Women (Pack of 3)",
    category: "womens-innerwear",
    categoryLabel: "Women's Innerwear",
    price: 1099,
    originalPrice: 1899,
    currency: "INR",
    images: [
      "/images/products/heelium-women-brief-pack3.webp",
    ],
    colors: [
      { name: "Everyday Trio (Nude/Grey/Black)", hex: "#2A2A2A", slug: "everyday-trio" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badges: ["Top Rated", "Multi-Pack"],
    description:
      "3-pack of breathable bamboo briefs. Naturally hypoallergenic, preventing moisture buildup and keeping you dry throughout active days.",
    fabric: "95% Bamboo Viscose, 5% Elastane",
    care: "Machine wash cold. Dry flat in shade.",
    inStock: true,
    rating: 4.9,
    reviewCount: 375,
    isNew: false,
    isBestseller: true,
    materialStory: {
      tag: "KNOW WHAT YOU'RE WEARING",
      headline: "Full coverage. Pure cloud softness.",
      subtext: "Designed for all-day comfort with full rear coverage and gentle leg bands that never pinch.",
      image: "/images/products/heelium-women-brief-pack3.webp",
      breakdown: [
        { percent: "95%", fiber: "Bamboo Viscose", role: "hypoallergenic softness" },
        { percent: "5%", fiber: "Elastane", role: "gentle elastic memory" },
      ],
    },
    constructionDetails: [
      {
        num: "01",
        title: "Mid-rise soothing waistband.",
        desc: "Sits comfortably at the natural hip without rolling or leaving red marks.",
        tag: "Zero-pressure waistband",
        image: "/images/products/heelium-women-brief-pack3.webp",
      },
    ],
    stylingNote: {
      tag: "FULL COVERAGE",
      headline: "Your daily confidence layer.",
      subtext: "Engineered to keep you feeling fresh through full work shifts and travel.",
      image: "/images/products/heelium-women-brief-pack4.webp",
    },
    fitGuide: {
      headline: "Women's Brief Sizing",
      subtext: "Full coverage comfort fit.",
      headers: ["Size", "Hip (in)", "Waist (in)"],
      rows: [
        ["XS", "35-37 in", "25-27 in"],
        ["S", "37-39 in", "27-29 in"],
        ["M", "39-41 in", "29-31 in"],
        ["L", "41-43 in", "31-33 in"],
        ["XL", "43-45 in", "33-35 in"],
      ],
    },
    faqs: [
      { q: "Is this suitable for sensitive or allergy-prone skin?", a: "Yes. Bamboo viscose is dermatologically tested, OEKO-TEX certified, and naturally non-irritating." },
    ],
  },
];

// Fallback generator for other products so every product has unique, rich material details!
export function getProductBySlug(slug) {
  const p = MOCK_PRODUCTS.find((item) => item.slug === slug);
  if (!p) return null;

  // If product doesn't have custom materialStory, generate realistic ones based on category
  if (!p.materialStory) {
    if (p.category === "bamboo-tshirts") {
      p.materialStory = {
        tag: "KNOW WHAT YOU'RE WEARING",
        headline: "Three fibres. One considered blend.",
        subtext: "Bamboo for a soft feel. Cotton for structure. Spandex for movement. The difference is the blend—not simply swapping one fibre for another.",
        image: "/images/products/features/fabric_blend_macro.jpg",
        breakdown: [
          { percent: "67%", fiber: "Bamboo", role: "soft feel" },
          { percent: "28%", fiber: "Cotton", role: "structure" },
          { percent: "5%", fiber: "Spandex", role: "stretch" },
        ],
      };
      p.constructionDetails = [
        {
          num: "01",
          title: "A closer neckline. A neater fit.",
          desc: "Our specially constructed neck rib sits closer around your neck. It helps keep the neckline centred, instead of leaving a wide opening that hangs to one side.",
          tag: "Specially constructed, close-fitting neck rib",
          image: "/images/products/features/neckline_detail.png",
        },
        {
          num: "02",
          title: "Reach. Bend. Keep moving.",
          desc: "A tee shouldn't make everyday movement feel restrictive. Four-way stretch gives the fabric room to move with you.",
          tag: "Bamboo softness, with spandex for stretch",
          image: "/images/products/features/stretch_detail.jpg",
        },
      ];
      p.stylingNote = {
        tag: "MAKE IT PART OF YOUR EVERYDAY",
        headline: "One easy layer. More ways to wear it.",
        subtext: "Black, blue, grey or white. Wear it on its own with jeans, or layer it under an open shirt.",
        image: "/images/products/features/hangers_colorways.png",
      };
      p.fitGuide = {
        headline: "Find your everyday fit.",
        subtext: "Standard Indian regular fit.",
        headers: ["Size", "Chest (in)", "Length (cm)"],
        rows: [
          ["S", "38 in", "69 cm"],
          ["M", "40 in", "71 cm"],
          ["L", "42 in", "73 cm"],
          ["XL", "44 in", "75 cm"],
        ],
      };
      p.faqs = [
        { q: "What is the fabric composition?", a: p.fabric || "67% Bamboo, 28% Cotton, 5% Spandex." },
        { q: "How should I care for it?", a: p.care || "Machine wash cold gentle. Line dry in shade." },
      ];
    } else if (p.category === "hemp-tshirts") {
      p.materialStory = {
        tag: "KNOW WHAT YOU'RE WEARING",
        headline: "Two regenerative bast fibres. Built to outlast.",
        subtext: "Himalayan hemp for unmatched durability and tensile strength. Organic cotton for familiar soft comfort. The natural cellular structure breathes freely in humid warmth.",
        image: "/images/products/features/fabric_blend_macro.jpg",
        breakdown: [
          { percent: "55%", fiber: "Himalayan Hemp", role: "tensile strength & UPF 50+" },
          { percent: "45%", fiber: "Organic Cotton", role: "soft structure & drape" },
          { percent: "0%", fiber: "Synthetics", role: "100% natural bast blend" },
        ],
      };
      p.constructionDetails = [
        {
          num: "01",
          title: "Reinforced double-needle hem & placket.",
          desc: "Engineered with heavy-gauge organic thread that will not twist, torque, or fray across years of heavy rotation.",
          tag: "4x stronger than commercial cotton",
          image: p.images[0] || "/images/products/heelium-men-polo-black.png",
        },
        {
          num: "02",
          title: "Pre-softened bast fiber weave.",
          desc: "Hemp bast fibers undergo a natural eco-enzyme softening process so it feels gentle against skin from day one, breaking in gracefully after every laundry cycle.",
          tag: "Naturally anti-microbial & UV blocking",
          image: "/images/products/features/neckline_detail.png",
        },
      ];
      p.stylingNote = {
        tag: "HEIRLOOM DURABILITY",
        headline: "Relaxed drop-shoulder cut. More ways to style.",
        subtext: "Wear it solo on humid weekends or layer under a chore jacket. The dense natural drape holds clean lines without clinging.",
        image: "/images/products/features/hangers_colorways.png",
      };
      p.fitGuide = {
        headline: "Hemp Everyday Fit Guide",
        subtext: "Designed with a relaxed modern cut. Measurements in inches and cm.",
        headers: ["Size", "Chest (in)", "Chest (cm)", "Length (cm)"],
        rows: [
          ["S", "39 in", "99 cm", "70 cm"],
          ["M", "41 in", "104 cm", "72 cm"],
          ["L", "43 in", "109 cm", "74 cm"],
          ["XL", "45 in", "114 cm", "76 cm"],
          ["2XL", "47 in", "119 cm", "78 cm"],
        ],
      };
      p.faqs = [
        { q: "Does hemp get softer over time?", a: "Yes! Unlike synthetic fabrics that break down and pill, pure hemp fibers soften and become more supple with every machine wash while retaining tensile integrity." },
        { q: "Is hemp rough against sensitive skin?", a: "Not at all. We blend our Himalayan hemp with 45% long-staple organic cotton and pre-wash the fabric with eco-enzymes for an immediate comfortable hand feel." },
        { q: "How does it protect from the sun?", a: "Hemp fibers naturally filter up to 98% of harmful UV rays, conferring UPF 50+ sun protection without any chemical coatings." },
        { q: "How should I care for this garment?", a: "Cold machine wash with similar colors. Line dry in the shade to preserve the bast fiber longevity. Warm iron if desired." },
      ];
    } else if (p.category === "mens-innerwear") {
      p.materialStory = {
        tag: "KNOW WHAT YOU'RE WEARING",
        headline: "Micro-vented bamboo knit. Zero friction.",
        subtext: "Pure bamboo viscose delivers 3x the moisture absorption of cotton, paired with 5% elastane for an anatomical contour that moves seamlessly without bunching.",
        image: "/images/products/features/fabric_blend_macro.jpg",
        breakdown: [
          { percent: "95%", fiber: "Bamboo Viscose", role: "cooling & anti-odor" },
          { percent: "5%", fiber: "Elastane", role: "flexible stay-down hold" },
          { percent: "100%", fiber: "Tagless Interior", role: "zero chafing" },
        ],
      };
      p.constructionDetails = [
        {
          num: "01",
          title: "No-roll cooling waistband.",
          desc: "Woven with micro-ventilation channels and a soft-brushed plush inner lining that stays flat around your waist without digging, pinching, or curling.",
          tag: "Micro-mesh moisture ventilation band",
          image: p.images[0] || "/images/products/heelium-men-trunk-pack3.jpg",
        },
        {
          num: "02",
          title: "Ergonomic 3D contour pouch.",
          desc: "Anatomically sculpted cup provides gentle support without restriction or compression, keeping you cool, dry, and friction-free all day.",
          tag: "4-way anti-ride-up leg construction",
          image: "/images/products/features/stretch_detail.jpg",
        },
      ];
      p.stylingNote = {
        tag: "ALL-DAY INVISIBLE COMFORT",
        headline: "Your first layer should be your best layer.",
        subtext: "Engineered for 16-hour workdays, high-intensity workouts, and humid commutes with zero ride-up legs.",
        image: "/images/products/features/hangers_colorways.png",
      };
      p.fitGuide = {
        headline: "Men's Innerwear Fit Guide",
        subtext: "True to Indian waist sizing. If between sizes, size up for a relaxed fit.",
        headers: ["Size", "Waist (in)", "Waist (cm)", "Inseam (in)"],
        rows: [
          ["S", "28-30 in", "71-76 cm", "3 in"],
          ["M", "31-33 in", "78-84 cm", "3 in"],
          ["L", "34-36 in", "86-91 cm", "3 in"],
          ["XL", "37-39 in", "94-99 cm", "3.5 in"],
          ["2XL", "40-42 in", "101-107 cm", "3.5 in"],
        ],
      };
      p.faqs = [
        { q: "Does the waistband roll down or pinch?", a: "No. Our waistband is constructed with high-resilience micro-elastic with dual grip channels engineered to stay completely flat." },
        { q: "Do the legs ride up when walking or working out?", a: "The leg openings feature tailored non-constricting bamboo cuffs with 4-way stretch that hold gently to your thighs without creeping up." },
        { q: "How does bamboo prevent odor?", a: "Bamboo fiber contains a natural bio-agent called 'Bamboo Kun' which inhibits bacterial growth, keeping you fresh even in humid 35°C weather." },
        { q: "What is your return policy on innerwear?", a: "For hygiene reasons, opened innerwear packs cannot be returned, but our First Pair Guarantee ensures a replacement or refund if your first pair doesn't fit." },
      ];
    } else {
      p.materialStory = {
        tag: "KNOW WHAT YOU'RE WEARING",
        headline: "Weightless second skin. Pure hypoallergenic comfort.",
        subtext: "Silky bamboo viscose protects sensitive skin from chafing, moisture buildup, and bacterial irritation, delivering cloud-like softness from dawn till dusk.",
        image: "/images/products/features/fabric_blend_macro.jpg",
        breakdown: [
          { percent: "95%", fiber: "Bamboo Viscose", role: "gentle breathability" },
          { percent: "5%", fiber: "Elastane", role: "no-pinch recovery" },
          { percent: "100%", fiber: "Organic Gusset", role: "skin-safe hygiene" },
        ],
      };
      p.constructionDetails = [
        {
          num: "01",
          title: "Seamless laser-cut edges.",
          desc: "Ultra-thin bonded edges lay completely flat under activewear leggings, slip dresses, and fitted trousers with zero visible panty lines.",
          tag: "Invisible under tight-fitting clothing",
          image: p.images[0] || "/images/products/heelium-women-bikini-pack2.webp",
        },
        {
          num: "02",
          title: "100% Bamboo breathable gusset.",
          desc: "A double-layered, unbleached pure bamboo lining that breathes naturally and prevents moisture accumulation, providing clinical-level comfort.",
          tag: "Hypoallergenic double-layer bamboo lining",
          image: "/images/products/features/stretch_detail.jpg",
        },
      ];
      p.stylingNote = {
        tag: "EVERYDAY HYGIENE & COMFORT",
        headline: "The ultimate second skin for all-day wear.",
        subtext: "Feels weightless from morning workouts to bedtime without digging, chafing, or shifting.",
        image: "/images/products/features/hangers_colorways.png",
      };
      p.fitGuide = {
        headline: "Women's Fit & Sizing Guide",
        subtext: "Designed for a featherlight second-skin fit without pressure points.",
        headers: ["Size", "Hip (in)", "Hip (cm)", "Waist (in)"],
        rows: [
          ["XS", "34-36 in", "86-91 cm", "24-26 in"],
          ["S", "36-38 in", "91-96 cm", "26-28 in"],
          ["M", "38-40 in", "96-101 cm", "28-30 in"],
          ["L", "40-42 in", "101-106 cm", "30-32 in"],
          ["XL", "42-44 in", "106-112 cm", "32-34 in"],
        ],
      };
      p.faqs = [
        { q: "Is the gusset 100% pure bamboo?", a: "Yes. The inner gusset is made with 100% unbleached bamboo viscose, free of harmful synthetic chemicals, dyes, or pesticides." },
        { q: "Will there be visible panty lines under tight workout leggings?", a: "No. Our laser-cut flatlock edges are specifically engineered to remain completely invisible under activewear and silk dresses." },
        { q: "How should I wash and care for bamboo innerwear?", a: "Machine wash on delicate cold cycle or hand wash. Lay flat or line dry in the shade to maintain microfiber elasticity." },
        { q: "What if the size doesn't fit?", a: "We provide a First Try Guarantee: if your first pair does not fit comfortably, contact our customer support for a hassle-free size replacement." },
      ];
    }
  }

  // Ensure reviews exist
  if (!p.reviews) {
    if (p.category === "bamboo-tshirts") {
      p.reviews = [
        {
          author: "Aditya R.",
          location: "Bengaluru",
          rating: 5,
          date: "Verified Buyer",
          title: "Collar holds shape wash after wash",
          comment: "I've washed this tee over 15 times now. No bacon neck, no fading. The bamboo fabric feels as soft as silk and breathes remarkably well in warm weather.",
        },
        {
          author: "Varun S.",
          location: "New Delhi",
          rating: 5,
          date: "Verified Buyer",
          title: "Beat the Delhi summer heat",
          comment: "Substantially cooler than 100% heavy cotton. Wore this out on a 38-degree day and didn't feel soaked in sweat. Definitely ordering more colors.",
        },
        {
          author: "Neha M.",
          location: "Mumbai",
          rating: 5,
          date: "Verified Buyer",
          title: "Clean silhouette & premium drape",
          comment: "The cut sits nicely on the shoulders without clinging. Looks sharp under an open linen shirt or standalone with relaxed trousers.",
        },
      ];
    } else if (p.category === "hemp-tshirts") {
      p.reviews = [
        {
          author: "Raghav P.",
          location: "Pune",
          rating: 5,
          date: "Verified Buyer",
          title: "True heirloom quality",
          comment: "You can feel the hemp bast fibers immediately—it has weight and substance without trapping heat. Gets noticeably softer with each wash cycle.",
        },
        {
          author: "Kabir T.",
          location: "Dehradun",
          rating: 5,
          date: "Verified Buyer",
          title: "Great boxy silhouette",
          comment: "The drop shoulder drape is clean and structured. Does not torque or shrink in the laundry. Truly the finest hemp tee available in India.",
        },
        {
          author: "Tanvi G.",
          location: "Bengaluru",
          rating: 5,
          date: "Verified Buyer",
          title: "Anti-odor is real",
          comment: "Wore this on a two-day hill trek. Odor resistance is phenomenal compared to polyester performance wear. Highly recommended.",
        },
      ];
    } else if (p.category === "mens-innerwear") {
      p.reviews = [
        {
          author: "Sameer K.",
          location: "Hyderabad",
          rating: 5,
          date: "Verified Buyer",
          title: "The waistband genuinely does not roll",
          comment: "Most underwear waistbands curl over when sitting down. This micro-elastic band stays flat all day. The bamboo material is ridiculously comfortable.",
        },
        {
          author: "Karthik N.",
          location: "Chennai",
          rating: 5,
          date: "Verified Buyer",
          title: "Zero friction or chafing",
          comment: "Chennai humidity is brutal, but these bamboo trunks keep everything dry and breathable. No thigh ride-up even during 10k steps.",
        },
        {
          author: "Aman V.",
          location: "Gurgaon",
          rating: 5,
          date: "Verified Buyer",
          title: "Replacing my entire drawer",
          comment: "Bought the 3-pack to test against my usual brand. There is simply no comparison. So soft it feels like you're wearing nothing.",
        },
      ];
    } else {
      p.reviews = [
        {
          author: "Pooja B.",
          location: "Mumbai",
          rating: 5,
          date: "Verified Buyer",
          title: "Completely invisible under yoga pants",
          comment: "Zero visible panty lines even under light-colored activewear leggings. The laser-cut edges don't roll up or dig into hips.",
        },
        {
          author: "Ritu S.",
          location: "Bengaluru",
          rating: 5,
          date: "Verified Buyer",
          title: "Pure bamboo gusset is a game-changer",
          comment: "So gentle and breathable for everyday hygiene. Very comfortable fabric that doesn't trigger any skin sensitivity.",
        },
        {
          author: "Meera J.",
          location: "New Delhi",
          rating: 5,
          date: "Verified Buyer",
          title: "Weightless second-skin feel",
          comment: "Doesn't leave marks at the end of a long day. Holds up well in the wash. Excellent craftsmanship.",
        },
      ];
    }
  }

  return p;
}

// Helper: get products by category
export function getProductsByCategory(categorySlug) {
  return MOCK_PRODUCTS.filter((p) => p.category === categorySlug);
}

// Helper: get bestsellers
export function getBestsellers(limit = 8) {
  return MOCK_PRODUCTS.filter((p) => p.isBestseller).slice(0, limit);
}

// Helper: get new arrivals
export function getNewArrivals(limit = 6) {
  return MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}

// Helper: get related products (same category, different id)
export function getRelatedProducts(productId, categorySlug, limit = 4) {
  return MOCK_PRODUCTS.filter(
    (p) => p.category === categorySlug && p.id !== productId
  ).slice(0, limit);
}
