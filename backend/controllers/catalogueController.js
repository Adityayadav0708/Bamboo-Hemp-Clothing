const store = require('../services/storeService');

const getCategories = (req, res) => {
  const categories = store.getCategories();
  res.json({
    success: true,
    data: categories
  });
};

const getProducts = (req, res) => {
  const { category, fabric, size, color, sort, page, limit, search } = req.query;
  const result = store.getProducts({
    categorySlug: category,
    fabricType: fabric,
    size,
    color,
    sort,
    page: page ? parseInt(page, 10) : 1,
    limit: limit ? parseInt(limit, 10) : 20,
    search
  });

  res.json({
    success: true,
    data: result.products,
    pagination: result.pagination
  });
};

const getProductBySlug = (req, res) => {
  const product = store.getProductBySlug(req.params.slug);
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
};

const searchProducts = (req, res) => {
  const { q } = req.query;
  const result = store.getProducts({ search: q, limit: 12 });
  res.json({
    success: true,
    data: result.products,
    pagination: result.pagination
  });
};

const getRelatedProducts = (req, res) => {
  const { productId } = req.params;
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
};

module.exports = {
  getCategories,
  getProducts,
  getProductBySlug,
  searchProducts,
  getRelatedProducts
};
