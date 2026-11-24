/**
 * seed.js
 * Database Seeder for Bamboo & Hemp Everyday Essentials Platform
 * Seeds all 4 categories, 18 authentic products, variants, and initial users.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const {
  User,
  Category,
  Product,
  Variant,
  Cart,
  Order,
  AuditLog
} = require('./models');

// Categories definition
const CATEGORIES = [
  {
    name: 'Bamboo T-Shirts',
    slug: 'bamboo-tshirts',
    description: 'Ultra-soft bamboo round neck and polo T-shirts — 3x softer than cotton, anti-odor, and engineered for all-day comfort in tropical climates.',
    bannerImage: '/images/categories/category-bamboo-banner.jpg',
    cardImage: '/images/products/heelium-men-tee-black.png',
    displayOrder: 1,
    isActive: true
  },
  {
    name: 'Hemp T-Shirts',
    slug: 'hemp-tshirts',
    description: 'Structured, durable, and naturally breathable. Spun from heritage rain-fed Himalayan hemp and organic cotton that softens with every wash.',
    bannerImage: '/images/categories/category-hemp-banner.jpg',
    cardImage: '/images/home/bestseller_2.png',
    displayOrder: 2,
    isActive: true
  },
  {
    name: "Men's Innerwear",
    slug: 'mens-innerwear',
    description: 'Bamboo trunks, boxers, and briefs designed for anti-chafing, moisture-wicking comfort with 360° micro-mesh cooling waistbands.',
    bannerImage: '/images/categories/category-mens-banner.jpg',
    cardImage: '/images/products/heelium-men-trunk-pack3.jpg',
    displayOrder: 3,
    isActive: true
  },
  {
    name: "Women's Innerwear",
    slug: 'womens-innerwear',
    description: 'Gentle on skin, kind to the earth. Breathable bamboo bikini briefs, full-coverage briefs, and racerback tops for weightless daily wear.',
    bannerImage: '/images/categories/category-womens-banner.jpg',
    cardImage: '/images/products/heelium-women-bikini-pack2.webp',
    displayOrder: 4,
    isActive: true
  }
];

async function seed() {
  console.log('🌱 Starting Bamboo & Hemp Database Seeding...');

  // Load products from frontend data file dynamically
  const frontendDataPath = path.resolve(__dirname, '../frontend/data/products.js');
  let MOCK_PRODUCTS = [];
  try {
    const fileUrl = 'file:///' + frontendDataPath.replace(/\\/g, '/');
    const imported = await import(fileUrl);
    MOCK_PRODUCTS = imported.MOCK_PRODUCTS || [];
    console.log(`📦 Successfully loaded ${MOCK_PRODUCTS.length} authentic products from catalog.`);
  } catch (err) {
    console.error('❌ Failed to load frontend products.js:', err.message);
    process.exit(1);
  }

  // 1. Prepare JSON format for store.json fallback
  const storeData = {
    categories: [],
    products: [],
    variants: [],
    users: [],
    orders: [],
    carts: {}
  };

  // Connect to MongoDB
  const conn = await connectDB();
  const mongoConnected = conn && mongoose.connection.readyState === 1;

  if (mongoConnected) {
    console.log('🧹 Purging existing collections in MongoDB...');
    await Promise.all([
      Category.deleteMany({}),
      Product.deleteMany({}),
      Variant.deleteMany({}),
      User.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
      AuditLog.deleteMany({})
    ]);
  } else {
    console.log('⚠️ MongoDB offline. Seeding in-memory store.json dataset directly.');
  }

  // 2. Seed Categories
  const categoryMap = new Map();
  for (const cat of CATEGORIES) {
    let catDoc = null;
    if (mongoConnected) {
      catDoc = await Category.create(cat);
      categoryMap.set(cat.slug, catDoc._id);
    } else {
      catDoc = { _id: `cat_${cat.slug}`, ...cat };
      categoryMap.set(cat.slug, catDoc._id);
    }
    storeData.categories.push({
      _id: catDoc._id.toString(),
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      bannerImage: cat.bannerImage,
      cardImage: cat.cardImage,
      displayOrder: cat.displayOrder,
      isActive: true
    });
  }
  console.log(`✅ Seeded ${CATEGORIES.length} Categories.`);

  // 3. Seed Users
  const passwordHash = await bcrypt.hash('Admin@12345', 10);
  const customerHash = await bcrypt.hash('Customer@12345', 10);

  const adminUserData = {
    fullName: 'Aditya Yadav (Store Owner)',
    email: 'admin@bamboohemp.com',
    password: passwordHash,
    role: 'admin',
    phone: '+91 9876543210',
    isVerified: true,
    addresses: [
      {
        recipientName: 'Aditya Yadav',
        addressLine1: 'Eco Hub, Phase 2',
        addressLine2: 'Tech Park',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560100',
        country: 'India',
        phone: '+91 9876543210',
        isDefault: true
      }
    ]
  };

  const customerUserData = {
    fullName: 'Priya Sharma',
    email: 'customer@bamboohemp.com',
    password: customerHash,
    role: 'customer',
    phone: '+91 9123456789',
    isVerified: true,
    addresses: [
      {
        recipientName: 'Priya Sharma',
        addressLine1: '42 Lotus Enclave',
        addressLine2: 'Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560038',
        country: 'India',
        phone: '+91 9123456789',
        isDefault: true
      }
    ]
  };

  if (mongoConnected) {
    // Avoid double hash with pre-save hook by inserting directly or using raw
    await User.collection.insertMany([adminUserData, customerUserData]);
  }
  storeData.users.push(
    { _id: 'usr_admin_001', ...adminUserData },
    { _id: 'usr_customer_001', ...customerUserData }
  );
  console.log(`✅ Seeded Admin & Customer accounts.`);

  // 4. Seed Products and Variants
  for (const item of MOCK_PRODUCTS) {
    const catId = categoryMap.get(item.category);
    const fabricType = item.category.includes('hemp') ? 'hemp' : 'bamboo';

    const imagesFormatted = (item.images || []).map((url, idx) => ({
      url,
      altText: `${item.name} image ${idx + 1}`,
      isPrimary: idx === 0,
      sortOrder: idx
    }));

    const prodPayload = {
      name: item.name,
      slug: item.slug,
      categoryIds: catId ? [catId] : [],
      fabricType,
      fabricComposition: [
        { fibre: fabricType === 'hemp' ? 'Heritage Hemp' : 'Organic Bamboo Viscose', percentage: 95 },
        { fibre: 'Elastane', percentage: 5 }
      ],
      shortDescription: item.description?.slice(0, 150) || 'Pure sustainable everyday essential.',
      description: item.description || '',
      materialDetails: item.fabric || `${fabricType === 'hemp' ? 'Hemp' : 'Bamboo'} natural fibre weave.`,
      careInstructions: item.care ? [item.care] : ['Machine wash cold', 'Line dry in shade'],
      badge: item.badges?.[0] || (item.isBestseller ? 'Bestseller' : ''),
      images: imagesFormatted,
      rating: item.rating || 4.8,
      reviewsCount: item.reviewCount || 45,
      status: 'active',
      materialStory: item.materialStory ? {
        title: item.materialStory.headline || 'Natural Comfort',
        content: item.materialStory.subtext || '',
        image: item.materialStory.image || ''
      } : undefined,
      faqs: (item.faqs || []).map(f => ({ q: f.q, a: f.a }))
    };

    let prodId = null;
    if (mongoConnected) {
      const createdProd = await Product.create(prodPayload);
      prodId = createdProd._id;
    } else {
      prodId = `prod_${item.slug.replace(/-/g, '_')}`;
    }

    const prodStoreObj = {
      _id: prodId.toString(),
      ...prodPayload,
      categoryIds: catId ? [catId.toString()] : [],
      variants: []
    };

    // Generate Variants
    const sizes = item.sizes && item.sizes.length ? item.sizes : ['M', 'L', 'XL'];
    const colors = item.colors && item.colors.length ? item.colors : [{ name: 'Natural', hex: '#244B3C' }];

    for (const size of sizes) {
      for (const color of colors) {
        const sku = `${item.slug.slice(0, 8).toUpperCase()}-${size}-${color.name.slice(0, 3).toUpperCase()}`.replace(/[^A-Z0-9-]/g, '');
        const variantPayload = {
          productId: prodId,
          sku,
          size,
          color: { name: color.name, hex: color.hex },
          mrp: item.originalPrice || item.price + 500,
          price: item.price,
          inventoryCount: 60,
          lowStockThreshold: 10,
          isActive: true
        };

        let varId = null;
        if (mongoConnected) {
          const createdVar = await Variant.create(variantPayload);
          varId = createdVar._id;
        } else {
          varId = `var_${sku.toLowerCase()}`;
        }

        const variantObj = {
          _id: varId.toString(),
          ...variantPayload,
          productId: prodId.toString()
        };

        storeData.variants.push(variantObj);
        prodStoreObj.variants.push(variantObj);
      }
    }

    storeData.products.push(prodStoreObj);
  }

  console.log(`✅ Seeded ${storeData.products.length} Products and ${storeData.variants.length} Variants.`);

  // Write updated store.json so fallback storeService is completely in sync with the authentic catalog
  const storeJsonPath = path.resolve(__dirname, 'data/store.json');
  fs.writeFileSync(storeJsonPath, JSON.stringify(storeData, null, 2), 'utf-8');
  console.log(`📁 Synced persisted data to: ${storeJsonPath}`);

  if (mongoConnected) {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB cleanly.');
  }

  console.log('✨ Database Seeding Complete! Ready to serve live REST APIs.');
}

seed().catch(err => {
  console.error('❌ Seeder encountered an error:', err);
  process.exit(1);
});
