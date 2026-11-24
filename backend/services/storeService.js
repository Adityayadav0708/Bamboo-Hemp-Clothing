const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_FILE = path.join(__dirname, '..', 'data', 'store.json');

// Initial seed data aligned with PRD v2.0 & Bamboo Cool UI specification
const INITIAL_CATEGORIES = [
  {
    _id: 'cat_bamboo_tshirts',
    name: 'Bamboo T-Shirts',
    slug: 'bamboo-tshirts',
    description: 'Ultra-breathable, silky-soft everyday tees engineered from 100% organic bamboo viscose.',
    image: '/images/cat-bamboo-tshirts.jpg',
    sortOrder: 1,
    isActive: true
  },
  {
    _id: 'cat_hemp_tshirts',
    name: 'Hemp T-Shirts',
    slug: 'hemp-tshirts',
    description: 'Durable, naturally textured tees spun from heritage rain-fed hemp and organic cotton.',
    image: '/images/cat-hemp-tshirts.jpg',
    sortOrder: 2,
    isActive: true
  },
  {
    _id: 'cat_mens_innerwear',
    name: "Men's Innerwear",
    slug: 'mens-innerwear',
    description: 'BreezeBoo™ cooling boxer briefs, trunks, and multipacks with 360° airflow waistband.',
    image: '/images/cat-mens-innerwear.jpg',
    sortOrder: 3,
    isActive: true
  },
  {
    _id: 'cat_womens_innerwear',
    name: "Women's Innerwear",
    slug: 'womens-innerwear',
    description: 'Weightless wire-free bralettes and seamless high-waist briefs for all-day second-skin comfort.',
    image: '/images/cat-womens-innerwear.jpg',
    sortOrder: 4,
    isActive: true
  }
];

const INITIAL_PRODUCTS = [
  // ── Bamboo T-Shirts ──
  {
    _id: 'prod_bamboo_crew',
    name: 'The Essential Bamboo Crew Neck Tee',
    slug: 'essential-bamboo-crew-neck-tshirt',
    categoryIds: ['cat_bamboo_tshirts'],
    fabricType: 'bamboo',
    fabricComposition: [
      { fibre: 'Organic Bamboo Viscose', percentage: 95 },
      { fibre: 'Elastane', percentage: 5 }
    ],
    materialDetails: 'Pure micro-gap bamboo viscose. Hypoallergenic, static-free, and thermo-regulating.',
    shortDescription: 'Silky smooth, cooling crew neck designed for all-day breathability in hot climates.',
    description: 'Engineered with round-fibre bamboo filaments, this tee drapes effortlessly without clinging. Features flatlock anti-chafing seams and moisture-wicking technology to keep your skin 2°C cooler throughout the day.',
    careInstructions: ['Machine wash gentle 30°C', 'Do not bleach', 'Dry flat in shade', 'Iron on low reverse'],
    images: [
      { url: '/images/prod-bamboo-crew-front.jpg', altText: 'Essential Bamboo Crew Neck Tee Flatlay', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-bamboo-crew-model.jpg', altText: 'Essential Bamboo Crew Neck Tee Lifestyle on Model', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-bamboo-crew-detail.jpg', altText: 'Bamboo Fabric Weave Micro Texture', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['bestseller', 'cooling', 'organic', 't-shirt'],
    status: 'active',
    seo: { title: 'Essential Bamboo Crew Neck T-Shirt | Bamboo & Hemp', metaDescription: 'Shop our signature breathable bamboo crew neck tee. Anti-odor, hypoallergenic, and ultra-soft.' },
    variants: [
      { _id: 'var_bcrew_grn_s', sku: 'BH-BTE-GRN-S', size: 'S', colour: { name: 'Forest Green', hex: '#1E412D' }, pricePaise: 129900, compareAtPricePaise: 169900, stockQuantity: 35, reservedQuantity: 0, isActive: true },
      { _id: 'var_bcrew_grn_m', sku: 'BH-BTE-GRN-M', size: 'M', colour: { name: 'Forest Green', hex: '#1E412D' }, pricePaise: 129900, compareAtPricePaise: 169900, stockQuantity: 42, reservedQuantity: 0, isActive: true },
      { _id: 'var_bcrew_grn_l', sku: 'BH-BTE-GRN-L', size: 'L', colour: { name: 'Forest Green', hex: '#1E412D' }, pricePaise: 129900, compareAtPricePaise: 169900, stockQuantity: 28, reservedQuantity: 0, isActive: true },
      { _id: 'var_bcrew_snd_m', sku: 'BH-BTE-SND-M', size: 'M', colour: { name: 'Natural Sand', hex: '#E2DCce' }, pricePaise: 129900, compareAtPricePaise: 169900, stockQuantity: 18, reservedQuantity: 0, isActive: true },
      { _id: 'var_bcrew_blk_l', sku: 'BH-BTE-BLK-L', size: 'L', colour: { name: 'Charcoal Black', hex: '#2A2E2B' }, pricePaise: 129900, compareAtPricePaise: 169900, stockQuantity: 4, reservedQuantity: 0, isActive: true } // Low stock < 5!
    ]
  },
  {
    _id: 'prod_bamboo_vneck',
    name: 'Relaxed Bamboo V-Neck Tee',
    slug: 'relaxed-bamboo-v-neck-tee',
    categoryIds: ['cat_bamboo_tshirts'],
    fabricType: 'bamboo',
    fabricComposition: [
      { fibre: 'Organic Bamboo Viscose', percentage: 95 },
      { fibre: 'Elastane', percentage: 5 }
    ],
    materialDetails: 'Breathable, featherlight bamboo jersey that naturally regulates body heat.',
    shortDescription: 'Refined shallow V-neck silhouette with an airy, fluid drape for versatile layering.',
    description: 'Tailored for everyday luxury. The silky bamboo texture glides over skin, resisting odors even after intense, warm humid afternoons.',
    careInstructions: ['Machine wash cold', 'Wash with like colors', 'Tumble dry low or air dry'],
    images: [
      { url: '/images/prod-bamboo-vneck-front.jpg', altText: 'Relaxed Bamboo V-Neck Tee Front', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-bamboo-vneck-model.jpg', altText: 'Relaxed Bamboo V-Neck Tee on Model', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-bamboo-vneck-detail.jpg', altText: 'V-Neck Collar & Seam Detail', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['v-neck', 'cooling', 'everyday'],
    status: 'active',
    seo: { title: 'Relaxed Bamboo V-Neck Tee | Sustainable Basics India', metaDescription: 'Silky soft bamboo V-neck tee for men and women.' },
    variants: [
      { _id: 'var_bvneck_wht_s', sku: 'BH-BVN-WHT-S', size: 'S', colour: { name: 'Pure Chalk', hex: '#F9F8F5' }, pricePaise: 139900, compareAtPricePaise: 179900, stockQuantity: 25, reservedQuantity: 0, isActive: true },
      { _id: 'var_bvneck_wht_m', sku: 'BH-BVN-WHT-M', size: 'M', colour: { name: 'Pure Chalk', hex: '#F9F8F5' }, pricePaise: 139900, compareAtPricePaise: 179900, stockQuantity: 30, reservedQuantity: 0, isActive: true },
      { _id: 'var_bvneck_olv_l', sku: 'BH-BVN-OLV-L', size: 'L', colour: { name: 'Muted Olive', hex: '#586A55' }, pricePaise: 139900, compareAtPricePaise: 179900, stockQuantity: 12, reservedQuantity: 0, isActive: true }
    ]
  },

  // ── Hemp T-Shirts ──
  {
    _id: 'prod_hemp_boxy',
    name: 'Heritage Hemp Boxy Tee',
    slug: 'heritage-hemp-boxy-tee',
    categoryIds: ['cat_hemp_tshirts'],
    fabricType: 'hemp_blend',
    fabricComposition: [
      { fibre: 'Heritage Hemp', percentage: 55 },
      { fibre: 'Organic Cotton', percentage: 45 }
    ],
    materialDetails: 'Durable heritage hemp blended with combed organic cotton. Built to soften with every wash.',
    shortDescription: 'Structured, vintage-weight heavyweight tee with exceptional longevity and UV resistance.',
    description: 'Hemp fibers possess 3x the tensile strength of regular cotton. Our 55/45 blend offers a sturdy modern boxy silhouette that holds its shape wash after wash.',
    careInstructions: ['Machine wash cold 30°C', 'Do not tumble dry', 'Warm iron if needed'],
    images: [
      { url: '/images/prod-hemp-boxy-front.jpg', altText: 'Heritage Hemp Boxy Tee Front View', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-hemp-boxy-model.jpg', altText: 'Heritage Hemp Boxy Tee Model View', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-hemp-boxy-detail.jpg', altText: 'Heritage Hemp Slub Fabric Close-up', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['bestseller', 'hemp', 'heavyweight', 'durable'],
    status: 'active',
    seo: { title: 'Heritage Hemp Boxy Tee | Sustainable Hemp Clothing India', metaDescription: 'Durable heavyweight hemp boxy tee made with 55% hemp and 45% organic cotton.' },
    variants: [
      { _id: 'var_hboxy_snd_s', sku: 'BH-HBX-SND-S', size: 'S', colour: { name: 'Earthy Sand', hex: '#D7CEBE' }, pricePaise: 169900, compareAtPricePaise: 219900, stockQuantity: 20, reservedQuantity: 0, isActive: true },
      { _id: 'var_hboxy_snd_m', sku: 'BH-HBX-SND-M', size: 'M', colour: { name: 'Earthy Sand', hex: '#D7CEBE' }, pricePaise: 169900, compareAtPricePaise: 219900, stockQuantity: 32, reservedQuantity: 0, isActive: true },
      { _id: 'var_hboxy_grn_l', sku: 'BH-HBX-GRN-L', size: 'L', colour: { name: 'Heritage Pine', hex: '#234938' }, pricePaise: 169900, compareAtPricePaise: 219900, stockQuantity: 15, reservedQuantity: 0, isActive: true }
    ]
  },
  {
    _id: 'prod_hemp_pocket',
    name: 'Everyday Hemp Pocket Tee',
    slug: 'everyday-hemp-pocket-tee',
    categoryIds: ['cat_hemp_tshirts'],
    fabricType: 'hemp_blend',
    fabricComposition: [
      { fibre: 'Heritage Hemp', percentage: 55 },
      { fibre: 'Organic Cotton', percentage: 45 }
    ],
    materialDetails: 'Naturally antimicrobial hemp jersey with reinforced chest pocket detail.',
    shortDescription: 'Classic chest pocket crew neck crafted from our signature breathable hemp-cotton blend.',
    description: 'A utilitarian staple designed for warm climates and relaxed weekend styling.',
    careInstructions: ['Machine wash cold', 'Line dry recommended'],
    images: [
      { url: '/images/prod-hemp-pocket-front.jpg', altText: 'Everyday Hemp Pocket Tee Front', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-hemp-pocket-model.jpg', altText: 'Everyday Hemp Pocket Tee on Model', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-hemp-pocket-detail.jpg', altText: 'Chest Pocket Construction Detail', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['hemp', 'pocket-tee', 'casual'],
    status: 'active',
    seo: { title: 'Everyday Hemp Pocket Tee | Hemp Clothing India', metaDescription: 'Casual pocket tee in breathable hemp-cotton blend.' },
    variants: [
      { _id: 'var_hpock_cld_m', sku: 'BH-HPK-CLD-M', size: 'M', colour: { name: 'Cloud Grey', hex: '#B8C2B8' }, pricePaise: 159900, compareAtPricePaise: 199900, stockQuantity: 22, reservedQuantity: 0, isActive: true },
      { _id: 'var_hpock_cld_l', sku: 'BH-HPK-CLD-L', size: 'L', colour: { name: 'Cloud Grey', hex: '#B8C2B8' }, pricePaise: 159900, compareAtPricePaise: 199900, stockQuantity: 14, reservedQuantity: 0, isActive: true }
    ]
  },

  // ── Men's Innerwear (Bamboo Cool inspired cooling boxer briefs & trunks) ──
  {
    _id: 'prod_bamboo_trunk_3pk',
    name: 'Everyday Bamboo Trunk (3-Pack)',
    slug: 'everyday-bamboo-trunk-3pack',
    categoryIds: ['cat_mens_innerwear'],
    fabricType: 'bamboo',
    fabricComposition: [
      { fibre: 'Organic Bamboo Viscose', percentage: 95 },
      { fibre: 'Elastane', percentage: 5 }
    ],
    materialDetails: '360° cooling mesh waistband with anti-ride-up contoured pouch. Hypoallergenic & skin-friendly.',
    shortDescription: 'Bamboo Cool signature multi-pack trunks: friction-free, sweat-resistant, and ultra-cooling.',
    description: 'Built for active all-day wear. The no-roll waistband and ergonomic 3D pouch prevent chafing while bamboo viscose wicks sweat 4x faster than cotton. Pack of 3 matching earth tones.',
    careInstructions: ['Machine wash gentle 30°C', 'Wash darks separately', 'Do not tumble dry'],
    images: [
      { url: '/images/prod-bamboo-trunk-front.jpg', altText: 'Everyday Bamboo Trunk 3-Pack Boxed Set', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-bamboo-trunk-model.jpg', altText: 'Everyday Bamboo Trunk Multi-Pack Laid Out', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-bamboo-trunk-detail.jpg', altText: 'Comfort Waistband and Stitching Detail', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['bestseller', 'bundle', 'multipack', 'innerwear', 'cooling'],
    status: 'active',
    seo: { title: 'Everyday Bamboo Trunk (3-Pack) | Bamboo Innerwear India', metaDescription: 'Bamboo cooling trunks in a value 3-pack. Anti-chafing, moisture wicking, breathable.' },
    variants: [
      { _id: 'var_btrunk_trio_s', sku: 'BH-TRK-TRIO-S', size: 'S', colour: { name: 'Trio Pack (Pine/Moss/Sand)', hex: '#234938' }, pricePaise: 149900, compareAtPricePaise: 199900, stockQuantity: 45, reservedQuantity: 0, isActive: true },
      { _id: 'var_btrunk_trio_m', sku: 'BH-TRK-TRIO-M', size: 'M', colour: { name: 'Trio Pack (Pine/Moss/Sand)', hex: '#234938' }, pricePaise: 149900, compareAtPricePaise: 199900, stockQuantity: 60, reservedQuantity: 0, isActive: true },
      { _id: 'var_btrunk_trio_l', sku: 'BH-TRK-TRIO-L', size: 'L', colour: { name: 'Trio Pack (Pine/Moss/Sand)', hex: '#234938' }, pricePaise: 149900, compareAtPricePaise: 199900, stockQuantity: 38, reservedQuantity: 0, isActive: true },
      { _id: 'var_btrunk_trio_xl', sku: 'BH-TRK-TRIO-XL', size: 'XL', colour: { name: 'Trio Pack (Pine/Moss/Sand)', hex: '#234938' }, pricePaise: 149900, compareAtPricePaise: 199900, stockQuantity: 3, reservedQuantity: 0, isActive: true } // Low stock < 5!
    ]
  },
  {
    _id: 'prod_bamboo_boxer_brief',
    name: 'BreezeBoo™ Cooling Boxer Brief',
    slug: 'breezeboo-cooling-boxer-brief',
    categoryIds: ['cat_mens_innerwear'],
    fabricType: 'bamboo',
    fabricComposition: [
      { fibre: 'Organic Bamboo Viscose', percentage: 92 },
      { fibre: 'Spandex', percentage: 8 }
    ],
    materialDetails: 'Micro-perforated bamboo mesh for maximum airflow during workouts and tropical humidity.',
    shortDescription: 'Mid-thigh boxer brief with active mesh panels and frictionless flatlock seams.',
    description: 'Our most supportive athletic innerwear. The stay-put leg design prevents bunching under formal trousers or athletic shorts.',
    careInstructions: ['Machine wash warm', 'Air dry in shade'],
    images: [
      { url: '/images/prod-bamboo-boxer-front.jpg', altText: 'BreezeBoo Cooling Boxer Brief Flatlay', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-bamboo-boxer-model.jpg', altText: 'BreezeBoo Cooling Boxer Brief Lifestyle', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-bamboo-boxer-detail.jpg', altText: 'Breathable Mesh Panels Texture', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['boxer-brief', 'cooling', 'athletic'],
    status: 'active',
    seo: { title: 'BreezeBoo Cooling Boxer Brief | Bamboo Cool Apparel India', metaDescription: 'Active cooling boxer briefs made from ultra-soft bamboo mesh.' },
    variants: [
      { _id: 'var_bboxer_blk_m', sku: 'BH-BBX-BLK-M', size: 'M', colour: { name: 'Charcoal Black', hex: '#1E231E' }, pricePaise: 64900, compareAtPricePaise: 84900, stockQuantity: 50, reservedQuantity: 0, isActive: true },
      { _id: 'var_bboxer_blk_l', sku: 'BH-BBX-BLK-L', size: 'L', colour: { name: 'Charcoal Black', hex: '#1E231E' }, pricePaise: 64900, compareAtPricePaise: 84900, stockQuantity: 40, reservedQuantity: 0, isActive: true },
      { _id: 'var_bboxer_grn_m', sku: 'BH-BBX-GRN-M', size: 'M', colour: { name: 'Botanical Green', hex: '#2A543B' }, pricePaise: 64900, compareAtPricePaise: 84900, stockQuantity: 28, reservedQuantity: 0, isActive: true }
    ]
  },

  // ── Women's Innerwear ──
  {
    _id: 'prod_bamboo_bralette',
    name: 'Cloud Bamboo Lounge Bralette',
    slug: 'cloud-bamboo-lounge-bralette',
    categoryIds: ['cat_womens_innerwear'],
    fabricType: 'bamboo',
    fabricComposition: [
      { fibre: 'Organic Bamboo Viscose', percentage: 95 },
      { fibre: 'Elastane', percentage: 5 }
    ],
    materialDetails: 'Double-layered wireless bamboo cup with gentle ribbed underband.',
    shortDescription: 'Zero-pressure, wire-free lounge bralette engineered for barely-there everyday comfort.',
    description: 'Designed to eliminate digging underwires and tight elastic bands. Breathable bamboo fabric conforms to your natural shape with gentle non-constrictive support.',
    careInstructions: ['Hand wash or delicate machine wash cold', 'Dry flat', 'Do not iron'],
    images: [
      { url: '/images/prod-bamboo-bralette-front.jpg', altText: 'Cloud Bamboo Lounge Bralette Flatlay', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-bamboo-bralette-model.jpg', altText: 'Cloud Bamboo Lounge Bralette on Model', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-bamboo-bralette-detail.jpg', altText: 'Seamless Ribbed Band Detail', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['bestseller', 'bralette', 'wireless', 'lounge'],
    status: 'active',
    seo: { title: 'Cloud Bamboo Lounge Bralette | Wirefree Bamboo Bra India', metaDescription: 'Wireless soft bamboo lounge bralette. Hypoallergenic and second-skin gentle.' },
    variants: [
      { _id: 'var_bbral_sage_s', sku: 'BH-BBR-SGE-S', size: 'S', colour: { name: 'Sage Green', hex: '#8BA185' }, pricePaise: 119900, compareAtPricePaise: 159900, stockQuantity: 24, reservedQuantity: 0, isActive: true },
      { _id: 'var_bbral_sage_m', sku: 'BH-BBR-SGE-M', size: 'M', colour: { name: 'Sage Green', hex: '#8BA185' }, pricePaise: 119900, compareAtPricePaise: 159900, stockQuantity: 35, reservedQuantity: 0, isActive: true },
      { _id: 'var_bbral_snd_m', sku: 'BH-BBR-SND-M', size: 'M', colour: { name: 'Warm Cream', hex: '#EBE6DC' }, pricePaise: 119900, compareAtPricePaise: 159900, stockQuantity: 20, reservedQuantity: 0, isActive: true },
      { _id: 'var_bbral_snd_l', sku: 'BH-BBR-SND-L', size: 'L', colour: { name: 'Warm Cream', hex: '#EBE6DC' }, pricePaise: 119900, compareAtPricePaise: 159900, stockQuantity: 2, reservedQuantity: 0, isActive: true } // Low stock < 5!
    ]
  },
  {
    _id: 'prod_bamboo_briefs_3pk',
    name: 'Seamless Bamboo Hipster Brief (3-Pack)',
    slug: 'seamless-bamboo-hipster-brief-3pack',
    categoryIds: ['cat_womens_innerwear'],
    fabricType: 'bamboo',
    fabricComposition: [
      { fibre: 'Organic Bamboo Viscose', percentage: 95 },
      { fibre: 'Elastane', percentage: 5 }
    ],
    materialDetails: 'Laser-cut seamless edges with 100% natural bamboo gusset.',
    shortDescription: 'Invisible panty lines with ultra-breathable, natural antimicrobial bamboo protection.',
    description: 'No digging, no pinching, and zero panty lines under fitted trousers or leggings. Naturally hypoallergenic and moisture-absorbing.',
    careInstructions: ['Machine wash cold gentle', 'Do not tumble dry'],
    images: [
      { url: '/images/prod-bamboo-briefs-front.jpg', altText: 'Seamless Bamboo Hipster Brief 3-Pack Flatlay', isPrimary: true, sortOrder: 0 },
      { url: '/images/prod-bamboo-briefs-model.jpg', altText: 'Seamless Bamboo Briefs Trio Set', isPrimary: false, sortOrder: 1 },
      { url: '/images/prod-bamboo-briefs-detail.jpg', altText: 'Laser Cut Edge and Gusset Detail', isPrimary: false, sortOrder: 2 }
    ],
    tags: ['multipack', 'seamless', 'briefs', 'innerwear'],
    status: 'active',
    seo: { title: 'Seamless Bamboo Hipster Brief (3-Pack) | Bamboo Innerwear', metaDescription: 'Pack of 3 seamless bamboo hipster briefs. Invisible panty lines, hypoallergenic.' },
    variants: [
      { _id: 'var_bbrief_trio_s', sku: 'BH-WBR-TRIO-S', size: 'S', colour: { name: 'Neutral Trio (Sage/Cream/Dusty Rose)', hex: '#8BA185' }, pricePaise: 99900, compareAtPricePaise: 139900, stockQuantity: 40, reservedQuantity: 0, isActive: true },
      { _id: 'var_bbrief_trio_m', sku: 'BH-WBR-TRIO-M', size: 'M', colour: { name: 'Neutral Trio (Sage/Cream/Dusty Rose)', hex: '#8BA185' }, pricePaise: 99900, compareAtPricePaise: 139900, stockQuantity: 55, reservedQuantity: 0, isActive: true },
      { _id: 'var_bbrief_trio_l', sku: 'BH-WBR-TRIO-L', size: 'L', colour: { name: 'Neutral Trio (Sage/Cream/Dusty Rose)', hex: '#8BA185' }, pricePaise: 99900, compareAtPricePaise: 139900, stockQuantity: 30, reservedQuantity: 0, isActive: true }
    ]
  }
];

const INITIAL_USERS = [
  {
    _id: 'user_super_admin',
    fullName: 'Aditya Pratap Singh',
    email: 'admin@bamboohemp.com',
    normalizedEmail: 'admin@bamboohemp.com',
    passwordHash: bcrypt.hashSync('Admin@12345', 10),
    phone: '+91 98765 43210',
    role: 'super_admin',
    status: 'active',
    emailVerifiedAt: new Date(),
    createdAt: new Date(),
    addresses: []
  },
  {
    _id: 'user_catalogue_mgr',
    fullName: 'Catalogue Operations Lead',
    email: 'catalogue@bamboohemp.com',
    normalizedEmail: 'catalogue@bamboohemp.com',
    passwordHash: bcrypt.hashSync('Catalogue@12345', 10),
    phone: '+91 98765 43211',
    role: 'catalogue_manager',
    status: 'active',
    emailVerifiedAt: new Date(),
    createdAt: new Date(),
    addresses: []
  },
  {
    _id: 'user_order_mgr',
    fullName: 'Fulfillment & Logistics Lead',
    email: 'orders@bamboohemp.com',
    normalizedEmail: 'orders@bamboohemp.com',
    passwordHash: bcrypt.hashSync('Orders@12345', 10),
    phone: '+91 98765 43212',
    role: 'order_manager',
    status: 'active',
    emailVerifiedAt: new Date(),
    createdAt: new Date(),
    addresses: []
  },
  {
    _id: 'user_customer_demo',
    fullName: 'Rahul Sharma',
    email: 'customer@example.com',
    normalizedEmail: 'customer@example.com',
    passwordHash: bcrypt.hashSync('Customer@12345', 10),
    phone: '+91 91234 56789',
    role: 'customer',
    status: 'active',
    emailVerifiedAt: new Date(),
    createdAt: new Date(),
    addresses: [
      {
        _id: 'addr_1',
        recipientName: 'Rahul Sharma',
        phone: '+91 91234 56789',
        addressLine1: 'B-402, Green Meadows, Indiranagar',
        addressLine2: '100ft Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560038',
        country: 'India',
        isDefault: true
      }
    ]
  }
];

const INITIAL_ORDERS = [
  {
    _id: 'ord_1001',
    orderNumber: 'BH-2026-9041',
    userId: 'user_customer_demo',
    guestEmail: 'customer@example.com',
    itemsSnapshot: [
      {
        productId: 'prod_bamboo_trunk_3pk',
        variantId: 'var_btrunk_trio_m',
        sku: 'BH-TRK-TRIO-M',
        name: 'Everyday Bamboo Trunk (3-Pack)',
        size: 'M',
        colour: 'Trio Pack (Pine/Moss/Sand)',
        unitPricePaise: 149900,
        quantity: 1,
        lineTotalPaise: 149900,
        image: '/images/prod-bamboo-trunk-front.jpg'
      }
    ],
    addressSnapshot: {
      recipientName: 'Rahul Sharma',
      phone: '+91 91234 56789',
      addressLine1: 'B-402, Green Meadows, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India'
    },
    subtotalPaise: 149900,
    discountPaise: 0,
    shippingPaise: 0,
    taxPaise: 7495,
    totalPaise: 149900,
    currency: 'INR',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    trackingNumber: 'BD-982341201IN',
    courierPartner: 'BlueDart Express',
    statusHistory: [
      { status: 'pending_payment', actor: 'customer@example.com', actorRole: 'customer', timestamp: new Date(Date.now() - 5 * 24 * 3600 * 1000) },
      { status: 'confirmed', actor: 'system', actorRole: 'system', timestamp: new Date(Date.now() - 5 * 24 * 3600 * 1000) },
      { status: 'processing', actor: 'orders@bamboohemp.com', actorRole: 'order_manager', timestamp: new Date(Date.now() - 4 * 24 * 3600 * 1000) },
      { status: 'packed', actor: 'orders@bamboohemp.com', actorRole: 'order_manager', timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000) },
      { status: 'shipped', actor: 'orders@bamboohemp.com', actorRole: 'order_manager', note: 'Tracking BD-982341201IN', timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000) },
      { status: 'delivered', actor: 'system', actorRole: 'courier_webhook', timestamp: new Date(Date.now() - 1 * 24 * 3600 * 1000) }
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000)
  },
  {
    _id: 'ord_1002',
    orderNumber: 'BH-2026-9042',
    userId: 'user_customer_demo',
    guestEmail: 'customer@example.com',
    itemsSnapshot: [
      {
        productId: 'prod_bamboo_crew',
        variantId: 'var_bcrew_grn_m',
        sku: 'BH-BTE-GRN-M',
        name: 'The Essential Bamboo Crew Neck Tee',
        size: 'M',
        colour: 'Forest Green',
        unitPricePaise: 129900,
        quantity: 1,
        lineTotalPaise: 129900,
        image: '/images/prod-bamboo-crew-front.jpg'
      },
      {
        productId: 'prod_hemp_boxy',
        variantId: 'var_hboxy_snd_m',
        sku: 'BH-HBX-SND-M',
        name: 'Heritage Hemp Boxy Tee',
        size: 'M',
        colour: 'Earthy Sand',
        unitPricePaise: 169900,
        quantity: 1,
        lineTotalPaise: 169900,
        image: '/images/prod-hemp-boxy-front.jpg'
      }
    ],
    addressSnapshot: {
      recipientName: 'Rahul Sharma',
      phone: '+91 91234 56789',
      addressLine1: 'B-402, Green Meadows, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India'
    },
    subtotalPaise: 299800,
    discountPaise: 29980, // 10% coupon
    couponCode: 'WELCOME10',
    shippingPaise: 0,
    taxPaise: 13491,
    totalPaise: 269820,
    currency: 'INR',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    statusHistory: [
      { status: 'pending_payment', actor: 'customer@example.com', actorRole: 'customer', timestamp: new Date(Date.now() - 4 * 3600 * 1000) },
      { status: 'confirmed', actor: 'system', actorRole: 'system', timestamp: new Date(Date.now() - 3.8 * 3600 * 1000) },
      { status: 'processing', actor: 'orders@bamboohemp.com', actorRole: 'order_manager', timestamp: new Date(Date.now() - 2 * 3600 * 1000) }
    ],
    createdAt: new Date(Date.now() - 4 * 3600 * 1000)
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    _id: 'audit_1',
    actorId: 'user_super_admin',
    actorEmail: 'admin@bamboohemp.com',
    actorRole: 'super_admin',
    action: 'catalogue.seed',
    resourceType: 'Catalogue',
    resourceId: 'all',
    before: null,
    after: { totalProducts: 6, totalCategories: 4 },
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000)
  },
  {
    _id: 'audit_2',
    actorId: 'user_catalogue_mgr',
    actorEmail: 'catalogue@bamboohemp.com',
    actorRole: 'catalogue_manager',
    action: 'product.publish',
    resourceType: 'Product',
    resourceId: 'prod_bamboo_trunk_3pk',
    before: { status: 'draft' },
    after: { status: 'active' },
    createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000)
  }
];

class StoreService {
  constructor() {
    this.categories = [];
    this.products = [];
    this.users = [];
    this.carts = new Map();
    this.orders = [];
    this.inventoryMovements = [];
    this.auditLogs = [];
    this.settings = {
      siteName: 'Bamboo & Hemp Everyday Essentials',
      currency: 'INR',
      freeShippingThresholdPaise: 99900,
      standardShippingFeePaise: 9900,
      taxRatePercentage: 5,
      lowStockThreshold: 5,
      maxCartQuantityPerLine: 10,
      supportedCoupons: {
        'WELCOME10': { discountPercent: 10, minCartPaise: 99900 },
        'BAMBOO10': { discountPercent: 10, minCartPaise: 99900 },
        'HEMP20': { discountPercent: 20, minCartPaise: 199900 }
      }
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        const data = JSON.parse(raw);
        this.categories = data.categories || INITIAL_CATEGORIES;
        this.products = data.products || INITIAL_PRODUCTS;
        this.users = data.users || INITIAL_USERS;
        this.carts = new Map(Object.entries(data.carts || {}));
        this.orders = data.orders || INITIAL_ORDERS;
        this.inventoryMovements = data.inventoryMovements || [];
        this.auditLogs = data.auditLogs || INITIAL_AUDIT_LOGS;
        this.settings = { ...this.settings, ...(data.settings || {}) };
        console.log(`[StoreService] Loaded persisted data from ${DATA_FILE}`);
        return;
      }
    } catch (e) {
      console.warn(`[StoreService] Could not read ${DATA_FILE}, using initial defaults:`, e.message);
    }

    this.categories = INITIAL_CATEGORIES;
    this.products = INITIAL_PRODUCTS;
    this.users = INITIAL_USERS;
    this.carts = new Map();
    this.orders = INITIAL_ORDERS;
    this.auditLogs = INITIAL_AUDIT_LOGS;
    this.persist();
  }

  persist() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify({
        categories: this.categories,
        products: this.products,
        users: this.users,
        carts: Object.fromEntries(this.carts),
        orders: this.orders,
        inventoryMovements: this.inventoryMovements,
        auditLogs: this.auditLogs,
        settings: this.settings
      }, null, 2), 'utf8');
    } catch (e) {
      console.error('[StoreService] Error persisting store.json:', e);
    }
  }

  // ── Categories ──
  _formatCategoryWithCount(cat) {
    if (!cat) return null;
    const catIdStr = cat._id ? cat._id.toString() : '';
    const count = this.products.filter(
      p => p.status === 'active' && Array.isArray(p.categoryIds) && p.categoryIds.some(cid => cid.toString() === catIdStr)
    ).length;
    return {
      ...cat,
      shortName: cat.shortName || cat.name.replace('T-Shirts', 'Tees'),
      productCount: count
    };
  }

  getCategories() {
    return this.categories
      .filter(c => c.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? a.sortOrder ?? 0) - (b.displayOrder ?? b.sortOrder ?? 0))
      .map(c => this._formatCategoryWithCount(c));
  }

  getCategoryBySlug(slug) {
    const cat = this.categories.find(c => c.slug === slug && c.isActive !== false);
    return this._formatCategoryWithCount(cat);
  }

  // ── Products ──
  getProducts({ categorySlug, fabricType, size, color, minPrice, maxPrice, sort = 'default', page = 1, limit = 50, search } = {}) {
    let items = this.products.filter(p => p.status === 'active');

    if (categorySlug) {
      const cat = this.getCategoryBySlug(categorySlug);
      if (cat) {
        const catIdStr = cat._id.toString();
        items = items.filter(p => p.categoryIds && p.categoryIds.some(cid => cid.toString() === catIdStr));
      } else {
        items = [];
      }
    }

    if (fabricType) {
      items = items.filter(p => p.fabricType === fabricType);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      items = items.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.materialDetails && p.materialDetails.toLowerCase().includes(q)) ||
        (p.tags && Array.isArray(p.tags) && p.tags.some(t => typeof t === 'string' && t.toLowerCase().includes(q)))
      );
    }

    if (size) {
      items = items.filter(p => p.variants && p.variants.some(v => v.size?.toLowerCase() === size.toLowerCase() && v.isActive !== false));
    }

    if (color) {
      const colorSlug = this._normalizeSlug(color);
      items = items.filter(p => p.variants && p.variants.some(v => {
        if (v.isActive === false) return false;
        const cName = this._getVariantColorName(v);
        return this._normalizeSlug(cName) === colorSlug || cName.toLowerCase().includes(color.toLowerCase());
      }));
    }

    const minP = minPrice !== undefined && minPrice !== '' ? Number(minPrice) : null;
    const maxP = maxPrice !== undefined && maxPrice !== '' ? Number(maxPrice) : null;
    if (minP !== null && !Number.isNaN(minP)) {
      items = items.filter(p => this._getVariantPriceRupees(p.variants?.[0]) >= minP);
    }
    if (maxP !== null && !Number.isNaN(maxP)) {
      items = items.filter(p => this._getVariantPriceRupees(p.variants?.[0]) <= maxP);
    }

    // Sorting
    if (sort === 'price_asc' || sort === 'price-asc') {
      items.sort((a, b) => this._getVariantPriceRupees(a.variants?.[0]) - this._getVariantPriceRupees(b.variants?.[0]));
    } else if (sort === 'price_desc' || sort === 'price-desc') {
      items.sort((a, b) => this._getVariantPriceRupees(b.variants?.[0]) - this._getVariantPriceRupees(a.variants?.[0]));
    } else if (sort === 'rating') {
      items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'popular' || sort === 'popularity') {
      items.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    const total = items.length;
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 50);
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = items.slice(startIndex, startIndex + limitNum);

    return {
      products: paginated,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems: total,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  getProductBySlug(slug) {
    return this.products.find(p => p.slug === slug && p.status === 'active');
  }

  getProductById(id) {
    return this.products.find(p => p._id === id);
  }

  getVariantById(variantId) {
    if (!variantId) return null;
    const vStr = variantId.toString();
    for (const p of this.products) {
      const v = p.variants?.find(x => (x._id && x._id.toString() === vStr) || x.sku === vStr);
      if (v) return { product: p, variant: v };
    }
    return null;
  }

  _normalizeSlug(val = '') {
    return val.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  _getVariantPriceRupees(v) {
    if (v?.price !== undefined && v?.price !== null) return Number(v.price);
    if (v?.pricePaise !== undefined && v?.pricePaise !== null) return Number(v.pricePaise) / 100;
    return 990;
  }

  _getVariantStock(v) {
    if (v?.inventoryCount !== undefined && v?.inventoryCount !== null) return Number(v.inventoryCount);
    if (v?.stockQuantity !== undefined && v?.stockQuantity !== null) return Number(v.stockQuantity);
    return 50;
  }

  _getVariantColorName(v) {
    return v?.color?.name || v?.colour?.name || (typeof v?.colour === 'string' ? v.colour : '') || (typeof v?.color === 'string' ? v.color : '') || 'Natural';
  }

  findVariantForProduct({ variantId, productId, slug, size, color } = {}) {
    if (variantId) {
      const byId = this.getVariantById(variantId);
      if (byId) return byId;
    }

    let product = null;
    if (slug) product = this.getProductBySlug(slug);
    if (!product && productId) product = this.getProductById(productId);
    if (!product || !product.variants?.length) return null;

    const activeVariants = product.variants.filter(v => v.isActive !== false);
    const pool = activeVariants.length ? activeVariants : product.variants;
    const targetColorSlug = color ? this._normalizeSlug(color) : '';

    let matched = pool.find(v => {
      const sizeMatch = !size || v.size?.toLowerCase() === size.toLowerCase();
      const colorMatch = !targetColorSlug || this._normalizeSlug(this._getVariantColorName(v)) === targetColorSlug;
      return sizeMatch && colorMatch;
    });

    if (!matched && size) {
      matched = pool.find(v => v.size?.toLowerCase() === size.toLowerCase());
    }

    return { product, variant: matched || pool[0] };
  }

  // ── Cart Operations ──
  getCart(identifier) {
    if (!this.carts.has(identifier)) {
      this.carts.set(identifier, { items: [] });
    }
    const cart = this.carts.get(identifier);
    if (!cart || !Array.isArray(cart.items)) {
      this.carts.set(identifier, { items: [] });
    }

    const hydratedLines = [];
    let subtotalPaise = 0;

    for (const line of this.carts.get(identifier).items) {
      const match = this.findVariantForProduct({
        variantId: line.variantId,
        slug: line.slug,
        productId: line.productId,
        size: line.size,
        color: line.color
      });
      if (!match || match.variant.isActive === false || match.product.status !== 'active') {
        continue;
      }

      const unitPriceRupees = this._getVariantPriceRupees(match.variant);
      const unitPricePaise = Math.round(unitPriceRupees * 100);
      const lineTotalPaise = unitPricePaise * line.quantity;
      subtotalPaise += lineTotalPaise;

      const colorName = this._getVariantColorName(match.variant);
      const colorSlug = line.color || this._normalizeSlug(colorName);
      const vId = match.variant._id.toString();

      hydratedLines.push({
        itemId: vId,
        cartKey: `${match.product.slug}__${match.variant.size}__${this._normalizeSlug(colorSlug)}`,
        variantId: vId,
        productId: match.product._id.toString(),
        slug: match.product.slug,
        productSlug: match.product.slug,
        name: match.product.name,
        size: match.variant.size,
        color: colorSlug,
        colorName,
        colour: match.variant.color || match.variant.colour,
        sku: match.variant.sku,
        price: unitPriceRupees,
        unitPricePaise,
        compareAtPricePaise: (match.variant.mrp ? match.variant.mrp * 100 : match.variant.compareAtPricePaise) || unitPricePaise,
        quantity: line.quantity,
        subtotal: unitPriceRupees * line.quantity,
        lineTotalPaise,
        image: match.product.images?.[0]?.url || '',
        availableStock: Math.max(0, this._getVariantStock(match.variant) - (match.variant.reservedQuantity || 0))
      });
    }

    const freeShip = this.settings.freeShippingThresholdPaise;
    const shippingPaise = subtotalPaise >= freeShip || subtotalPaise === 0 ? 0 : this.settings.standardShippingFeePaise;
    const taxPaise = Math.round(subtotalPaise * (this.settings.taxRatePercentage / 100));
    const totalPaise = subtotalPaise + shippingPaise;
    const subtotal = Math.round(subtotalPaise / 100);

    return {
      cartId: identifier,
      items: hydratedLines,
      itemCount: hydratedLines.reduce((acc, it) => acc + it.quantity, 0),
      subtotal,
      subtotalPaise,
      shippingPaise,
      taxPaise,
      totalPaise,
      currency: 'INR'
    };
  }

  _matchesCartLine(line, itemId) {
    if (!line || !itemId) return false;
    const target = itemId.toString();
    const colorSlug = this._normalizeSlug(line.color || '');
    return (
      (line.variantId && line.variantId.toString() === target) ||
      `${line.slug}__${line.size}__${colorSlug}` === target ||
      `${line.productId}__${line.size}__${colorSlug}` === target
    );
  }

  addToCart(identifier, { variantId, productId, slug, size, color, quantity = 1 }) {
    const match = this.findVariantForProduct({ variantId, productId, slug, size, color });
    if (!match) throw new Error('Product variant not found');
    if (match.variant.isActive === false || match.product.status !== 'active') {
      throw new Error('Product variant is unavailable');
    }

    const available = this._getVariantStock(match.variant) - (match.variant.reservedQuantity || 0);
    if (available <= 0) throw new Error('Item is currently out of stock');

    if (!this.carts.has(identifier)) {
      this.carts.set(identifier, { items: [] });
    }
    const cart = this.carts.get(identifier);
    const resolvedVariantId = match.variant._id.toString();
    const existing = cart.items.find(it => it.variantId && it.variantId.toString() === resolvedVariantId);

    const qtyNum = Math.max(1, parseInt(quantity, 10) || 1);
    const maxQty = this.settings.maxCartQuantityPerLine || 10;

    if (existing) {
      const newQty = existing.quantity + qtyNum;
      if (newQty > maxQty) {
        throw new Error(`Maximum ${maxQty} units allowed per item`);
      }
      if (newQty > available) {
        throw new Error(`Only ${available} units available in stock`);
      }
      existing.quantity = newQty;
    } else {
      if (qtyNum > available) throw new Error(`Only ${available} units available in stock`);
      cart.items.push({
        variantId: resolvedVariantId,
        productId: match.product._id.toString(),
        slug: match.product.slug,
        size: match.variant.size,
        color: color || this._normalizeSlug(this._getVariantColorName(match.variant)),
        quantity: Math.min(qtyNum, maxQty),
        addedAt: new Date()
      });
    }

    this.persist();
    return this.getCart(identifier);
  }

  updateCartItem(identifier, { itemId, variantId, quantity, newSize, newColor }) {
    if (!this.carts.has(identifier)) return this.getCart(identifier);
    const cart = this.carts.get(identifier);
    const lookupKey = (itemId || variantId || '').toString();
    const idx = cart.items.findIndex(x => this._matchesCartLine(x, lookupKey));
    if (idx === -1) return this.getCart(identifier);

    const current = cart.items[idx];
    if (quantity !== undefined && quantity <= 0) {
      cart.items.splice(idx, 1);
      this.persist();
      return this.getCart(identifier);
    }

    if (newSize || newColor) {
      const nextMatch = this.findVariantForProduct({
        slug: current.slug,
        productId: current.productId,
        size: newSize || current.size,
        color: newColor || current.color
      });
      if (nextMatch) {
        const nextVarId = nextMatch.variant._id.toString();
        const mergeTarget = cart.items.find((x, i) => i !== idx && x.variantId?.toString() === nextVarId);
        const targetQty = quantity !== undefined ? quantity : current.quantity;
        const maxQty = this.settings.maxCartQuantityPerLine || 10;
        if (mergeTarget) {
          mergeTarget.quantity = Math.min(mergeTarget.quantity + targetQty, maxQty);
          cart.items.splice(idx, 1);
        } else {
          current.variantId = nextVarId;
          current.size = nextMatch.variant.size;
          current.color = newColor || current.color;
          current.quantity = Math.min(Math.max(1, targetQty), maxQty);
        }
        this.persist();
        return this.getCart(identifier);
      }
    }

    if (quantity !== undefined) {
      const maxQty = this.settings.maxCartQuantityPerLine || 10;
      current.quantity = Math.min(Math.max(1, quantity), maxQty);
    }

    this.persist();
    return this.getCart(identifier);
  }

  removeFromCart(identifier, itemId) {
    if (!this.carts.has(identifier)) return this.getCart(identifier);
    const cart = this.carts.get(identifier);
    cart.items = cart.items.filter(it => !this._matchesCartLine(it, itemId));
    this.persist();
    return this.getCart(identifier);
  }

  syncCart(identifier, incomingItems = []) {
    if (!Array.isArray(incomingItems)) return this.getCart(identifier);
    if (!this.carts.has(identifier)) {
      this.carts.set(identifier, { items: [] });
    }
    const cart = this.carts.get(identifier);
    const maxQty = this.settings.maxCartQuantityPerLine || 10;

    for (const raw of incomingItems) {
      const match = this.findVariantForProduct({
        variantId: raw.variantId,
        productId: raw.productId,
        slug: raw.slug,
        size: raw.size,
        color: raw.color
      });
      if (!match) continue;
      const vId = match.variant._id.toString();
      const qty = Math.min(Math.max(1, parseInt(raw.quantity, 10) || 1), maxQty);
      const existing = cart.items.find(it => it.variantId?.toString() === vId);
      if (existing) {
        existing.quantity = Math.min(Math.max(existing.quantity, qty), maxQty);
      } else {
        cart.items.push({
          variantId: vId,
          productId: match.product._id.toString(),
          slug: match.product.slug,
          size: match.variant.size,
          color: raw.color || this._normalizeSlug(this._getVariantColorName(match.variant)),
          quantity: qty,
          addedAt: new Date()
        });
      }
    }
    this.persist();
    return this.getCart(identifier);
  }

  clearCart(identifier) {
    this.carts.set(identifier, { items: [] });
    this.persist();
  }

  // ── Checkout & Orders ──
  calculateQuote(items, couponCode = null, { deliveryMethod = 'standard', paymentMethod = '' } = {}) {
    let subtotalRupees = 0;
    const validatedItems = [];

    for (const it of items) {
      let unitPrice = it.price;
      let pName = it.name || 'Bamboo Essential';
      let pSize = it.size || 'M';
      let pColor = typeof it.color === 'string' ? it.color : (it.color?.name || '');
      let pSku = it.sku || 'BH-ITEM';
      let pImage = it.image || '';
      let prodId = it.productId;
      let varId = it.variantId;
      let pSlug = it.slug || 'bamboo-product';

      const match = this.findVariantForProduct({
        variantId: it.variantId,
        productId: it.productId,
        slug: it.slug,
        size: it.size,
        color: pColor
      });
      if (match) {
        prodId = match.product._id;
        varId = match.variant._id;
        pSlug = match.product.slug || pSlug;
        pSku = match.variant.sku || pSku;
        pName = match.product.name;
        pSize = match.variant.size;
        pColor = this._getVariantColorName(match.variant) || pColor;
        unitPrice = this._getVariantPriceRupees(match.variant);
        pImage = match.product.images?.[0]?.url || pImage;
      }

      unitPrice = unitPrice || 990;
      const qty = Math.max(1, parseInt(it.quantity, 10) || 1);
      const lineTotal = unitPrice * qty;
      subtotalRupees += lineTotal;

      validatedItems.push({
        productId: prodId,
        variantId: varId,
        sku: pSku,
        slug: pSlug,
        name: pName,
        size: pSize,
        color: pColor,
        colour: pColor,
        price: unitPrice,
        unitPriceRupees: unitPrice,
        unitPricePaise: unitPrice * 100,
        quantity: qty,
        lineTotalRupees: lineTotal,
        lineTotalPaise: lineTotal * 100,
        image: pImage
      });
    }

    let discountRupees = 0;
    const normalizedCoupon = couponCode ? couponCode.trim().toUpperCase() : '';
    if (normalizedCoupon && this.settings.supportedCoupons[normalizedCoupon]) {
      const c = this.settings.supportedCoupons[normalizedCoupon];
      if (subtotalRupees >= (c.minCartPaise ? c.minCartPaise / 100 : 999)) {
        discountRupees = Math.round(subtotalRupees * (c.discountPercent / 100));
      }
    }

    const freeShipRupees = this.settings.freeShippingThresholdPaise ? this.settings.freeShippingThresholdPaise / 100 : 999;
    const shippingFeeRupees = deliveryMethod === 'express'
      ? 149
      : (subtotalRupees - discountRupees >= freeShipRupees || subtotalRupees === 0 ? 0 : 99);
    const codFeeRupees = paymentMethod === 'cod' ? 49 : 0;
    const finalPayableRupees = Math.max(0, subtotalRupees - discountRupees + shippingFeeRupees + codFeeRupees);

    return {
      items: validatedItems,
      subtotalRupees,
      subtotalPaise: subtotalRupees * 100,
      discountRupees,
      discountPaise: discountRupees * 100,
      shippingFeeRupees,
      shippingPaise: shippingFeeRupees * 100,
      codFeeRupees,
      codFeePaise: codFeeRupees * 100,
      deliveryMethod,
      finalPayableRupees,
      totalPaise: finalPayableRupees * 100,
      couponCode: normalizedCoupon,
      currency: 'INR'
    };
  }

  createOrder({
    userId,
    guestEmail,
    items,
    address,
    deliveryInstructions,
    couponCode,
    deliveryMethod = 'standard',
    paymentMethod = 'Cash on Delivery (COD)',
    orderNumber: customOrderNumber = null
  }) {
    const quote = this.calculateQuote(items, couponCode, { deliveryMethod, paymentMethod });

    // Atomically verify & decrement tracked variant stock
    for (const it of quote.items) {
      const match = this.findVariantForProduct({
        variantId: it.variantId,
        productId: it.productId,
        slug: it.slug,
        size: it.size,
        color: it.color
      });
      if (match && match.variant) {
        const stock = this._getVariantStock(match.variant);
        if (stock < it.quantity) {
          throw new Error(`Insufficient stock for ${match.product.name} (${match.variant.size})`);
        }
        if (match.variant.inventoryCount !== undefined) {
          match.variant.inventoryCount = stock - it.quantity;
        }
        if (match.variant.stockQuantity !== undefined) {
          match.variant.stockQuantity = stock - it.quantity;
        }
      }
    }

    const orderNumber = customOrderNumber || `BH-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      _id: `ord_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      orderNumber,
      userId: userId || null,
      guestEmail: guestEmail || (userId ? this.getUserById(userId)?.email : null),
      items: quote.items,
      itemsSnapshot: quote.items,
      shippingAddress: address,
      addressSnapshot: address,
      deliveryInstructions: deliveryInstructions || '',
      deliveryMethod,
      subtotal: quote.subtotalRupees,
      subtotalPaise: quote.subtotalPaise,
      subtotalRupees: quote.subtotalRupees,
      discount: quote.discountRupees,
      discountPaise: quote.discountPaise,
      discountRupees: quote.discountRupees,
      couponCode: quote.couponCode,
      shippingFee: quote.shippingFeeRupees,
      shippingPaise: quote.shippingPaise,
      shippingFeeRupees: quote.shippingFeeRupees,
      codFee: quote.codFeeRupees,
      totalPaise: quote.totalPaise,
      totalAmount: quote.finalPayableRupees,
      currency: 'INR',
      paymentMethod,
      paymentStatus: 'Pending',
      orderStatus: 'Placed',
      trackingNumber: `BD-${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      courierPartner: 'BlueDart Express',
      createdAt: new Date()
    };

    this.orders.unshift(newOrder);
    this.persist();
    return newOrder;
  }

  getOrderById(orderId) {
    return this.orders.find(o => o._id === orderId || o.orderNumber === orderId);
  }

  getCustomerOrders(userId, email) {
    return this.orders.filter(o => (userId && o.userId === userId) || (email && o.guestEmail === email));
  }

  // ── Admin Features ──
  getDashboardMetrics() {
    const totalOrders = this.orders.length;
    const grossSalesPaise = this.orders
      .filter(o => o.paymentStatus === 'paid' && o.orderStatus !== 'cancelled')
      .reduce((sum, o) => sum + o.totalPaise, 0);

    const pendingActionOrders = this.orders.filter(o => ['confirmed', 'processing', 'packed'].includes(o.orderStatus)).length;

    // Low stock variants (stockQuantity <= threshold)
    const lowStockVariants = [];
    for (const p of this.products) {
      for (const v of p.variants || []) {
        const stock = v.inventoryCount !== undefined ? v.inventoryCount : (v.stockQuantity !== undefined ? v.stockQuantity : 50);
        if (v.isActive && stock <= this.settings.lowStockThreshold) {
          lowStockVariants.push({
            productId: p._id,
            productName: p.name,
            sku: v.sku,
            size: v.size,
            colour: v.colour?.name || v.color?.name || (typeof v.colour === 'string' ? v.colour : 'Natural'),
            stockQuantity: stock,
            pricePaise: v.pricePaise || (v.price ? v.price * 100 : 99000)
          });
        }
      }
    }

    return {
      totalOrders,
      grossSalesPaise,
      grossSalesRupees: (grossSalesPaise / 100).toFixed(2),
      pendingActionOrders,
      lowStockCount: lowStockVariants.length,
      lowStockVariants,
      recentOrders: this.orders.slice(0, 5)
    };
  }

  updateOrderStatus(orderId, newStatus, { actor = 'admin', actorRole = 'order_manager', note = '' } = {}) {
    const order = this.getOrderById(orderId);
    if (!order) throw new Error('Order not found');

    const validTransitions = {
      pending_payment: ['confirmed', 'cancelled'],
      confirmed: ['processing', 'cancelled'],
      processing: ['packed', 'cancelled'],
      packed: ['shipped', 'cancelled'],
      shipped: ['delivered', 'returned'],
      delivered: ['refunded', 'returned'],
      cancelled: [],
      refunded: []
    };

    if (order.orderStatus !== newStatus) {
      order.orderStatus = newStatus;
      if (!order.statusHistory) order.statusHistory = [];
      order.statusHistory.push({
        status: newStatus,
        actor,
        actorRole,
        note,
        timestamp: new Date()
      });

      this.auditLogs.unshift({
        _id: `aud_${Date.now()}`,
        actorRole,
        action: 'order.status_update',
        resourceType: 'Order',
        resourceId: order.orderNumber,
        before: { status: order.orderStatus },
        after: { status: newStatus, note },
        createdAt: new Date()
      });

      this.persist();
    }
    return order;
  }

  adjustStock({ variantId, changeAmount, reason, actor = 'admin' }) {
    const match = this.getVariantById(variantId);
    if (!match) throw new Error('Variant not found');

    const before = match.variant.stockQuantity;
    const after = Math.max(0, before + changeAmount);
    match.variant.stockQuantity = after;

    const movement = {
      _id: `inv_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      variantId,
      sku: match.variant.sku,
      movementType: changeAmount > 0 ? 'purchase_receipt' : 'manual_correction',
      quantityChange: changeAmount,
      quantityBefore: before,
      quantityAfter: after,
      reason,
      referenceType: 'admin_adjustment',
      actorName: actor,
      createdAt: new Date()
    };
    this.inventoryMovements.unshift(movement);

    this.auditLogs.unshift({
      _id: `aud_${Date.now()}`,
      actorRole: 'catalogue_manager',
      action: 'stock.adjust',
      resourceType: 'Variant',
      resourceId: match.variant.sku,
      before: { stockQuantity: before },
      after: { stockQuantity: after, reason },
      createdAt: new Date()
    });

    this.persist();
    return { variant: match.variant, movement };
  }

  // ── User Management ──
  getUserByEmail(email) {
    if (!email) return null;
    const clean = email.toLowerCase().trim();
    return this.users.find(u => (u.normalizedEmail || u.email || '').toLowerCase().trim() === clean);
  }

  getUserById(userId) {
    if (!userId) return null;
    const idStr = userId.toString();
    return this.users.find(u => u._id && u._id.toString() === idStr);
  }

  _ensureAddressIds(user) {
    if (!user.addresses) user.addresses = [];
    user.addresses = user.addresses.map((addr, idx) => ({
      ...addr,
      _id: addr._id ? addr._id.toString() : `addr_${idx}_${Date.now()}`
    }));
  }

  updateUserProfile(userId, { fullName, phone }) {
    const user = this.getUserById(userId);
    if (!user) return null;
    if (fullName !== undefined) user.fullName = fullName.trim();
    if (phone !== undefined) user.phone = phone.trim();
    this.persist();
    return user;
  }

  getUserAddresses(userId) {
    const user = this.getUserById(userId);
    if (!user) return [];
    this._ensureAddressIds(user);
    return user.addresses;
  }

  addUserAddress(userId, addressData) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found');
    this._ensureAddressIds(user);

    const makeDefault = addressData.isDefault === true || user.addresses.length === 0;
    if (makeDefault) {
      user.addresses.forEach(a => { a.isDefault = false; });
    }

    const newAddr = {
      _id: `addr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      recipientName: addressData.recipientName.trim(),
      addressLine1: addressData.addressLine1.trim(),
      addressLine2: (addressData.addressLine2 || '').trim(),
      city: addressData.city.trim(),
      state: addressData.state.trim(),
      postalCode: addressData.postalCode.trim(),
      country: (addressData.country || 'India').trim(),
      phone: (addressData.phone || '').trim(),
      isDefault: makeDefault
    };

    user.addresses.push(newAddr);
    this.persist();
    return { address: newAddr, addresses: user.addresses };
  }

  updateUserAddress(userId, addressId, updates) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found');
    this._ensureAddressIds(user);

    const idx = user.addresses.findIndex(a => a._id.toString() === addressId.toString());
    if (idx === -1) return null;

    if (updates.isDefault === true) {
      user.addresses.forEach(a => { a.isDefault = false; });
    }

    const target = user.addresses[idx];
    const allowed = ['recipientName', 'addressLine1', 'addressLine2', 'city', 'state', 'postalCode', 'country', 'phone', 'isDefault'];
    for (const key of allowed) {
      if (updates[key] !== undefined) {
        target[key] = typeof updates[key] === 'string' ? updates[key].trim() : updates[key];
      }
    }

    // Ensure at least one default remains
    if (!user.addresses.some(a => a.isDefault) && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    this.persist();
    return { address: target, addresses: user.addresses };
  }

  deleteUserAddress(userId, addressId) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found');
    this._ensureAddressIds(user);

    const idx = user.addresses.findIndex(a => a._id.toString() === addressId.toString());
    if (idx === -1) return null;

    const wasDefault = user.addresses[idx].isDefault;
    user.addresses.splice(idx, 1);

    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    this.persist();
    return user.addresses;
  }

  createUser({ fullName, email, password, role = 'customer', phone = '' }) {
    const existing = this.getUserByEmail(email);
    if (existing) throw new Error('An account with this email already exists');

    const newUser = {
      _id: `user_${Date.now()}`,
      fullName,
      email,
      normalizedEmail: email.toLowerCase().trim(),
      passwordHash: bcrypt.hashSync(password, 10),
      phone,
      role,
      status: 'active',
      emailVerifiedAt: new Date(),
      createdAt: new Date(),
      addresses: []
    };
    this.users.push(newUser);
    this.persist();
    return newUser;
  }
}

// Singleton instance
const store = new StoreService();
module.exports = store;
