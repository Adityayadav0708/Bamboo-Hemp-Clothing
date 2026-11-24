const mongoose = require('mongoose');
const { Product, Category, Variant } = require('../models');
const store = require('../services/storeService');

function toSlug(val = '') {
  return val.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function attachVariants(products) {
  if (!products.length) return [];
  const productIds = products.map((p) => p._id);
  const variants = await Variant.find({ productId: { $in: productIds }, isActive: true }).lean();
  const variantMap = new Map();
  for (const v of variants) {
    const pid = v.productId.toString();
    if (!variantMap.has(pid)) variantMap.set(pid, []);
    variantMap.get(pid).push(v);
  }
  return products.map((p) => ({
    ...p,
    variants: variantMap.get(p._id.toString()) || []
  }));
}

const getCategories = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
      if (categories && categories.length > 0) {
        const counts = await Product.aggregate([
          { $match: { status: 'active' } },
          { $unwind: '$categoryIds' },
          { $group: { _id: '$categoryIds', count: { $sum: 1 } } }
        ]);
        const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));
        const formatted = categories.map((cat) => ({
          ...cat,
          shortName: cat.shortName || cat.name.replace('T-Shirts', 'Tees'),
          productCount: countMap.get(cat._id.toString()) || 0
        }));
        return res.json({
          success: true,
          data: formatted
        });
      }
    }

    const categories = store.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (mongoose.connection.readyState === 1) {
      const cat = await Category.findOne({ slug, isActive: true }).lean();
      if (cat) {
        const productCount = await Product.countDocuments({ categoryIds: cat._id, status: 'active' });
        return res.json({
          success: true,
          data: {
            ...cat,
            shortName: cat.shortName || cat.name.replace('T-Shirts', 'Tees'),
            productCount
          }
        });
      }
    }

    const category = store.getCategoryBySlug(slug);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Category not found.' }
      });
    }
    res.json({
      success: true,
      data: category
    });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      fabric,
      size,
      color,
      minPrice,
      maxPrice,
      sort = 'default',
      page = 1,
      limit = 50,
      search,
      q
    } = req.query;

    const searchTerm = (search || q || '').trim();

    if (mongoose.connection.readyState === 1) {
      const filter = { status: 'active' };

      if (category) {
        const cat = await Category.findOne({ slug: category }).lean();
        if (!cat) {
          return res.json({
            success: true,
            data: [],
            pagination: { page: 1, limit: Number(limit) || 50, totalItems: 0, totalPages: 0 }
          });
        }
        filter.categoryIds = cat._id;
      }

      if (fabric) {
        filter.fabricType = fabric;
      }

      if (searchTerm) {
        const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        filter.$or = [
          { name: regex },
          { description: regex },
          { shortDescription: regex },
          { materialDetails: regex },
          { badge: regex }
        ];
      }

      const rawProducts = await Product.find(filter).populate('categoryIds').lean();

      if (rawProducts.length > 0 || await Product.countDocuments({ status: 'active' }) > 0) {
        let formatted = await attachVariants(rawProducts);

        if (size) {
          const targetSize = size.trim().toLowerCase();
          formatted = formatted.filter((p) =>
            p.variants.some((v) => v.size?.toLowerCase() === targetSize)
          );
        }

        if (color) {
          const targetColor = toSlug(color);
          formatted = formatted.filter((p) =>
            p.variants.some((v) => {
              const cName = v.color?.name || '';
              return toSlug(cName) === targetColor || cName.toLowerCase().includes(color.toLowerCase());
            })
          );
        }

        const minP = minPrice !== undefined && minPrice !== '' ? Number(minPrice) : null;
        const maxP = maxPrice !== undefined && maxPrice !== '' ? Number(maxPrice) : null;
        if (minP !== null && !Number.isNaN(minP)) {
          formatted = formatted.filter((p) => (p.variants[0]?.price ?? 0) >= minP);
        }
        if (maxP !== null && !Number.isNaN(maxP)) {
          formatted = formatted.filter((p) => (p.variants[0]?.price ?? 0) <= maxP);
        }

        if (sort === 'price_asc' || sort === 'price-asc') {
          formatted.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
        } else if (sort === 'price_desc' || sort === 'price-desc') {
          formatted.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
        } else if (sort === 'rating') {
          formatted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sort === 'popularity' || sort === 'popular') {
          formatted.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        } else if (sort === 'newest') {
          formatted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        }

        const totalItems = formatted.length;
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, parseInt(limit, 10) || 50);
        const start = (pageNum - 1) * limitNum;
        const paginated = formatted.slice(start, start + limitNum);

        return res.json({
          success: true,
          data: paginated,
          pagination: {
            page: pageNum,
            limit: limitNum,
            totalItems,
            totalPages: Math.ceil(totalItems / limitNum)
          }
        });
      }
    }

    const result = store.getProducts({
      categorySlug: category,
      fabricType: fabric,
      size,
      color,
      minPrice,
      maxPrice,
      sort,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 50,
      search: searchTerm
    });

    res.json({
      success: true,
      data: result.products,
      pagination: result.pagination
    });
  } catch (err) {
    next(err);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState === 1) {
      const product = await Product.findOne({ slug, status: 'active' })
        .populate('categoryIds')
        .lean();

      if (product) {
        const variants = await Variant.find({ productId: product._id, isActive: true }).lean();
        product.variants = variants;
        return res.json({
          success: true,
          data: product
        });
      }
    }

    const product = store.getProductBySlug(slug);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Product not found in active catalogue.' }
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

const searchProducts = async (req, res, next) => {
  req.query.search = req.query.q || req.query.search || '';
  return getProducts(req, res, next);
};

const getRelatedProducts = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 4);

    if (mongoose.connection.readyState === 1) {
      let current = null;
      if (mongoose.Types.ObjectId.isValid(productId)) {
        current = await Product.findById(productId).lean();
      }
      if (!current) {
        current = await Product.findOne({ slug: productId }).lean();
      }
      if (current) {
        const related = await Product.find({
          _id: { $ne: current._id },
          categoryIds: { $in: current.categoryIds },
          status: 'active'
        })
          .populate('categoryIds')
          .limit(limit)
          .lean();

        const enriched = await attachVariants(related);
        if (enriched.length > 0) {
          return res.json({
            success: true,
            data: enriched
          });
        }
      }
    }

    const current = store.getProductById(productId) || store.getProductBySlug(productId);
    let related = store.products.filter(
      (p) => p._id !== current?._id && p.slug !== productId && p.status === 'active'
    );
    if (current && current.categoryIds?.length) {
      const catStrs = current.categoryIds.map((c) => c.toString());
      const inSameCat = related.filter((p) =>
        p.categoryIds.some((cid) => catStrs.includes(cid.toString()))
      );
      if (inSameCat.length > 0) related = inSameCat;
    }

    res.json({
      success: true,
      data: related.slice(0, limit)
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductBySlug,
  searchProducts,
  getRelatedProducts
};
