const store = require('../services/storeService');

const getDashboardMetrics = (req, res) => {
  const metrics = store.getDashboardMetrics();
  res.json({
    success: true,
    data: metrics
  });
};

const getAdminProducts = (req, res) => {
  res.json({
    success: true,
    data: store.products
  });
};

const createProduct = (req, res, next) => {
  try {
    const { name, slug, shortDescription, description, categoryIds, fabricType, fabricComposition, careInstructions, images, tags, status, variants } = req.body;
    if (!name || !fabricType) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Product name and fabricType are required.' }
      });
    }

    const newSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct = {
      _id: `prod_${Date.now()}`,
      name,
      slug: newSlug,
      shortDescription: shortDescription || '',
      description: description || '',
      categoryIds: categoryIds || ['cat_bamboo_tshirts'],
      fabricType,
      fabricComposition: fabricComposition || [{ fibre: 'Organic Bamboo Viscose', percentage: 100 }],
      careInstructions: careInstructions || ['Machine wash cold gentle'],
      images: images && images.length ? images : [{ url: '/images/prod-bamboo-crew-front.jpg', isPrimary: true }],
      tags: tags || ['new'],
      status: status || 'active',
      seo: { title: name, metaDescription: shortDescription || name },
      variants: variants && variants.length ? variants.map((v, i) => ({
        _id: `var_${Date.now()}_${i}`,
        sku: v.sku || `BH-${newSlug.substring(0, 4).toUpperCase()}-${v.size}-${i}`,
        size: v.size || 'M',
        colour: v.colour || { name: 'Natural Sand', hex: '#E2DCce' },
        pricePaise: v.pricePaise || 129900,
        compareAtPricePaise: v.compareAtPricePaise || 169900,
        stockQuantity: v.stockQuantity !== undefined ? v.stockQuantity : 25,
        reservedQuantity: 0,
        isActive: true
      })) : []
    };

    store.products.push(newProduct);
    store.auditLogs.unshift({
      _id: `aud_${Date.now()}`,
      actorRole: req.user ? req.user.role : 'admin',
      action: 'product.create',
      resourceType: 'Product',
      resourceId: newProduct._id,
      before: null,
      after: { name: newProduct.name, slug: newProduct.slug },
      createdAt: new Date()
    });

    store.persist();
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = (req, res, next) => {
  try {
    const product = store.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Product not found.' }
      });
    }

    const before = { ...product };
    Object.assign(product, req.body);
    store.auditLogs.unshift({
      _id: `aud_${Date.now()}`,
      actorRole: req.user ? req.user.role : 'admin',
      action: 'product.update',
      resourceType: 'Product',
      resourceId: product._id,
      before: { name: before.name, status: before.status },
      after: { name: product.name, status: product.status },
      createdAt: new Date()
    });

    store.persist();
    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

const publishProduct = (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found.' } });
  product.status = 'active';
  store.persist();
  res.json({ success: true, data: product });
};

const archiveProduct = (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Product not found.' } });
  product.status = 'archived';
  store.persist();
  res.json({ success: true, data: product });
};

const getAdminInventory = (req, res) => {
  const inventoryList = [];
  for (const p of store.products) {
    for (const v of p.variants || []) {
      inventoryList.push({
        productId: p._id,
        productName: p.name,
        category: p.categoryIds[0],
        variantId: v._id,
        sku: v.sku,
        size: v.size,
        colour: v.colour,
        pricePaise: v.pricePaise,
        stockQuantity: v.stockQuantity,
        reservedQuantity: v.reservedQuantity,
        availableQuantity: Math.max(0, v.stockQuantity - v.reservedQuantity),
        isLowStock: v.stockQuantity <= store.settings.lowStockThreshold,
        isActive: v.isActive
      });
    }
  }

  res.json({
    success: true,
    data: inventoryList,
    lowStockThreshold: store.settings.lowStockThreshold
  });
};

const adjustStock = (req, res, next) => {
  try {
    const { variantId, changeAmount, reason } = req.body;
    if (!variantId || changeAmount === undefined || !reason) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'variantId, changeAmount, and reason are required for inventory adjustments.' }
      });
    }

    const result = store.adjustStock({
      variantId,
      changeAmount: parseInt(changeAmount, 10),
      reason,
      actor: req.user ? req.user.email : 'admin'
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getAdminOrders = (req, res) => {
  const { status, search } = req.query;
  let list = [...store.orders];

  if (status && status !== 'all') {
    list = list.filter(o => o.orderStatus === status);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(o =>
      o.orderNumber.toLowerCase().includes(q) ||
      (o.guestEmail && o.guestEmail.toLowerCase().includes(q)) ||
      (o.addressSnapshot?.recipientName && o.addressSnapshot.recipientName.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    data: list
  });
};

const getAdminOrderById = (req, res) => {
  const order = store.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Order not found.' } });
  }
  res.json({ success: true, data: order });
};

const updateAdminOrderStatus = (req, res, next) => {
  try {
    const { status, note } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Target status is required.' } });
    }

    const updated = store.updateOrderStatus(req.params.id, status, {
      actor: req.user ? req.user.email : 'admin',
      actorRole: req.user ? req.user.role : 'order_manager',
      note: note || ''
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const getAdminAuditLogs = (req, res) => {
  res.json({
    success: true,
    data: store.auditLogs
  });
};

const getAdminSettings = (req, res) => {
  res.json({
    success: true,
    data: store.settings
  });
};

module.exports = {
  getDashboardMetrics,
  getAdminProducts,
  createProduct,
  updateProduct,
  publishProduct,
  archiveProduct,
  getAdminInventory,
  adjustStock,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrderStatus,
  getAdminAuditLogs,
  getAdminSettings
};
