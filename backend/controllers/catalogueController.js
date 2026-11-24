const mongoose = require('mongoose');
const { Product, Category, Variant } = require('../models');
const store = require('../services/storeService');

const getCategories = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 });
      if (categories && categories.length > 0) {
        return res.json({
          success: true,
          data: categories
        });
      }
    }

    // Fallback store
    const categories = store.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { category, fabric, size, color, sort, page = 1, limit = 20, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter = { status: 'active' };

      if (category) {
        const cat = await Category.findOne({ slug: category });
        if (cat) filter.categoryIds = cat._id;
      }

      if (fabric) {
        filter.fabricType = fabric;
      }

      if (search) {
        filter.$or = [
          { name: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { shortDescription: new RegExp(search, 'i') }
        ];
      }

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitNum = parseInt(limit, 10);

      const [products, totalCount] = await Promise.all([
        Product.find(filter)
          .populate('categoryIds')
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Product.countDocuments(filter)
      ]);

      if (products && products.length > 0) {
        // Attach variants
        const productIds = products.map(p => p._id);
        const variants = await Variant.find({ productId: { $in: productIds }, isActive: true }).lean();
        const variantMap = new Map();
        for (const v of variants) {
          const pid = v.productId.toString();
          if (!variantMap.has(pid)) variantMap.set(pid, []);
          variantMap.get(pid).push(v);
        }

        const formatted = products.map(p => ({
          ...p,
          variants: variantMap.get(p._id.toString()) || []
        }));

        // In-memory sort by price if requested
        if (sort === 'price_asc' || sort === 'price-asc') {
          formatted.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
        } else if (sort === 'price_desc' || sort === 'price-desc') {
          formatted.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
        }

        return res.json({
          success: true,
          data: formatted,
          pagination: {
            page: parseInt(page, 10),
            limit: limitNum,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limitNum)
          }
        });
      }
    }

    // Fallback store
    const result = store.getProducts({
      categorySlug: category,
      fabricType: fabric,
      size,
      color,
      sort,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      search
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

    // Fallback store
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
  req.query.search = req.query.q;
  return getProducts(req, res, next);
};

const getRelatedProducts = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (mongoose.connection.readyState === 1) {
      const current = await Product.findById(productId).lean();
      if (current) {
        const related = await Product.find({
          _id: { $ne: current._id },
          categoryIds: { $in: current.categoryIds },
          status: 'active'
        })
          .limit(4)
          .lean();

        if (related.length > 0) {
          return res.json({
            success: true,
            data: related
          });
        }
      }
    }

    // Fallback store
    const current = store.getProductById(productId);
    let related = store.products.filter(p => p._id !== productId && p.status === 'active');
    if (current && current.categoryIds?.length) {
      const inSameCat = related.filter(p => p.categoryIds.some(cid => current.categoryIds.includes(cid)));
      if (inSameCat.length > 0) related = inSameCat;
    }

    res.json({
      success: true,
      data: related.slice(0, 4)
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  getProducts,
  getProductBySlug,
  searchProducts,
  getRelatedProducts
};
