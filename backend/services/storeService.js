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
  getCategories() {
    return this.categories.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  getCategoryBySlug(slug) {
    return this.categories.find(c => c.slug === slug);
  }

  // ── Products ──
  getProducts({ categorySlug, fabricType, size, color, sort = 'newest', page = 1, limit = 20, search } = {}) {
    let items = this.products.filter(p => p.status === 'active');

    if (categorySlug) {
      const cat = this.getCategoryBySlug(categorySlug);
      if (cat) {
        items = items.filter(p => p.categoryIds && p.categoryIds.includes(cat._id));
      }
    }

    if (fabricType) {
      items = items.filter(p => p.fabricType === fabricType);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (size) {
      items = items.filter(p => p.variants && p.variants.some(v => v.size.toLowerCase() === size.toLowerCase() && v.isActive));
    }

    if (color) {
      items = items.filter(p => p.variants && p.variants.some(v => v.colour.name.toLowerCase().includes(color.toLowerCase())));
    }

    // Sorting
    if (sort === 'price_asc') {
      items.sort((a, b) => (a.variants[0]?.pricePaise || 0) - (b.variants[0]?.pricePaise || 0));
    } else if (sort === 'price_desc') {
      items.sort((a, b) => (b.variants[0]?.pricePaise || 0) - (a.variants[0]?.pricePaise || 0));
    } else if (sort === 'popular') {
      items.sort((a, b) => (b.tags.includes('bestseller') ? 1 : 0) - (a.tags.includes('bestseller') ? 1 : 0));
    }

    const total = items.length;
    const startIndex = (page - 1) * limit;
    const paginated = items.slice(startIndex, startIndex + limit);

    return {
      products: paginated,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalItems: total,
        totalPages: Math.ceil(total / limit)
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

  // ── Cart Operations ──
  getCart(identifier) {
    if (!this.carts.has(identifier)) {
      this.carts.set(identifier, { items: [] });
    }
    const cart = this.carts.get(identifier);

    // Hydrate cart lines with current product truth
    const hydratedLines = [];
    let subtotalPaise = 0;

    for (const line of cart.items) {
      const match = this.getVariantById(line.variantId);
      if (!match || !match.variant.isActive || match.product.status !== 'active') {
        continue; // drop discontinued/inactive
      }
      const unitPrice = match.variant.pricePaise;
      const lineTotal = unitPrice * line.quantity;
      subtotalPaise += lineTotal;

      hydratedLines.push({
        variantId: match.variant._id,
        productId: match.product._id,
        productSlug: match.product.slug,
        name: match.product.name,
        size: match.variant.size,
        colour: match.variant.colour,
        sku: match.variant.sku,
        unitPricePaise: unitPrice,
        compareAtPricePaise: match.variant.compareAtPricePaise,
        quantity: line.quantity,
        lineTotalPaise: lineTotal,
        image: match.product.images[0]?.url || '',
        availableStock: Math.max(0, match.variant.stockQuantity - match.variant.reservedQuantity)
      });
    }

    const freeShip = this.settings.freeShippingThresholdPaise;
    const shippingPaise = subtotalPaise >= freeShip || subtotalPaise === 0 ? 0 : this.settings.standardShippingFeePaise;
    const taxPaise = Math.round(subtotalPaise * (this.settings.taxRatePercentage / 100));
    const totalPaise = subtotalPaise + shippingPaise;

    return {
      items: hydratedLines,
      itemCount: hydratedLines.reduce((acc, it) => acc + it.quantity, 0),
      subtotalPaise,
      shippingPaise,
      taxPaise,
      totalPaise,
      currency: 'INR'
    };
  }

  addToCart(identifier, { variantId, quantity = 1 }) {
    const match = this.getVariantById(variantId);
    if (!match) throw new Error('Variant not found');
    if (!match.variant.isActive || match.product.status !== 'active') throw new Error('Product variant is unavailable');

    const available = match.variant.stockQuantity - match.variant.reservedQuantity;
    if (available <= 0) throw new Error('Item is currently out of stock');

    if (!this.carts.has(identifier)) {
      this.carts.set(identifier, { items: [] });
    }
    const cart = this.carts.get(identifier);
    const existing = cart.items.find(it => it.variantId === variantId);

    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > this.settings.maxCartQuantityPerLine) {
        throw new Error(`Maximum ${this.settings.maxCartQuantityPerLine} units allowed per item`);
      }
      if (newQty > available) {
        throw new Error(`Only ${available} units available in stock`);
      }
      existing.quantity = newQty;
    } else {
      if (quantity > available) throw new Error(`Only ${available} units available in stock`);
      cart.items.push({ variantId, quantity: Math.min(quantity, 10), addedAt: new Date() });
    }

    return this.getCart(identifier);
  }

  updateCartItem(identifier, { variantId, quantity }) {
    if (!this.carts.has(identifier)) return this.getCart(identifier);
    const cart = this.carts.get(identifier);

    if (quantity <= 0) {
      cart.items = cart.items.filter(it => it.variantId !== variantId);
    } else {
      const it = cart.items.find(x => x.variantId === variantId);
      if (it) {
        it.quantity = Math.min(Math.max(1, quantity), this.settings.maxCartQuantityPerLine);
      }
    }
    return this.getCart(identifier);
  }

  removeFromCart(identifier, variantId) {
    if (!this.carts.has(identifier)) return this.getCart(identifier);
    const cart = this.carts.get(identifier);
    cart.items = cart.items.filter(it => it.variantId !== variantId);
    return this.getCart(identifier);
  }

  clearCart(identifier) {
    this.carts.set(identifier, { items: [] });
  }

  // ── Checkout & Orders ──
  calculateQuote(items, couponCode = null) {
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

      if (it.variantId) {
        const match = this.getVariantById(it.variantId);
        if (match) {
          prodId = match.product._id;
          varId = match.variant._id;
          pSku = match.variant.sku;
          pName = match.product.name;
          pSize = match.variant.size;
          pColor = match.variant.colour?.name || match.variant.color?.name || pColor;
          unitPrice = match.variant.price !== undefined ? match.variant.price : (match.variant.pricePaise ? match.variant.pricePaise / 100 : unitPrice);
          pImage = match.product.images?.[0]?.url || pImage;
        }
      }

      unitPrice = unitPrice || 990;
      const lineTotal = unitPrice * (it.quantity || 1);
      subtotalRupees += lineTotal;

      validatedItems.push({
        productId: prodId,
        variantId: varId,
        sku: pSku,
        name: pName,
        size: pSize,
        colour: pColor,
        unitPriceRupees: unitPrice,
        unitPricePaise: unitPrice * 100,
        quantity: it.quantity || 1,
        lineTotalRupees: lineTotal,
        lineTotalPaise: lineTotal * 100,
        image: pImage
      });
    }

    let discountRupees = 0;
    if (couponCode && this.settings.supportedCoupons[couponCode.toUpperCase()]) {
      const c = this.settings.supportedCoupons[couponCode.toUpperCase()];
      if (subtotalRupees >= (c.minCartPaise ? c.minCartPaise / 100 : 999)) {
        discountRupees = Math.round(subtotalRupees * (c.discountPercent / 100));
      }
    }

    const freeShipRupees = this.settings.freeShippingThresholdPaise ? this.settings.freeShippingThresholdPaise / 100 : 999;
    const shippingFeeRupees = (subtotalRupees - discountRupees) >= freeShipRupees ? 0 : 99;
    const finalPayableRupees = Math.max(0, subtotalRupees - discountRupees + shippingFeeRupees);

    return {
      items: validatedItems,
      subtotalRupees,
      subtotalPaise: subtotalRupees * 100,
      discountRupees,
      discountPaise: discountRupees * 100,
      shippingFeeRupees,
      shippingPaise: shippingFeeRupees * 100,
      finalPayableRupees,
      totalPaise: finalPayableRupees * 100,
      couponCode,
      currency: 'INR'
    };
  }

  createOrder({ userId, guestEmail, items, address, deliveryInstructions, couponCode, paymentMethod = 'mock' }) {
    const quote = this.calculateQuote(items, couponCode);

    // Atomically reserve inventory & verify stock if tracked
    for (const it of quote.items) {
      const match = this.getVariantById(it.variantId);
      if (match && match.variant) {
        const stock = match.variant.inventoryCount !== undefined ? match.variant.inventoryCount : match.variant.stockQuantity;
        if (stock !== undefined && stock < it.quantity) {
          throw new Error(`Insufficient stock for ${match.product.name} (${match.variant.size})`);
        }
      }
    }

    const orderNumber = `BH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      _id: `ord_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      orderNumber,
      userId: userId || null,
      guestEmail: guestEmail || (userId ? this.getUserById(userId)?.email : null),
      itemsSnapshot: quote.items,
      addressSnapshot: address,
      deliveryInstructions: deliveryInstructions || '',
      subtotalPaise: quote.subtotalPaise,
      subtotalRupees: quote.subtotalRupees,
      discountPaise: quote.discountPaise,
      discountRupees: quote.discountRupees,
      couponCode: quote.couponCode,
      shippingPaise: quote.shippingPaise,
      shippingFeeRupees: quote.shippingFeeRupees,
      totalPaise: quote.totalPaise,
      totalAmount: quote.finalPayableRupees,
      currency: 'INR',
      paymentStatus: 'Paid',
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
    return this.users.find(u => u.normalizedEmail === email.toLowerCase().trim());
  }

  getUserById(userId) {
    return this.users.find(u => u._id === userId);
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
