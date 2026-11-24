const mongoose = require('mongoose');
const { Cart, Product, Variant } = require('../models');
const store = require('../services/storeService');

function toSlug(val = '') {
  return val.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const getCartId = (req) => {
  if (req.user) {
    const uid = req.user._id ? req.user._id.toString() : req.user.id;
    return `user_${uid}`;
  }
  const guestHeader = req.headers['x-guest-token'] || req.headers['x-cart-token'] || 'guest_default_session';
  return `guest_${guestHeader}`;
};

async function resolveMongoCartItem(input = {}) {
  let variant = null;
  let product = null;

  if (input.variantId && mongoose.Types.ObjectId.isValid(input.variantId)) {
    variant = await Variant.findById(input.variantId).lean();
    if (variant) {
      product = await Product.findById(variant.productId).lean();
    }
  }

  if (!product && input.slug) {
    product = await Product.findOne({ slug: input.slug, status: 'active' }).lean();
  }
  if (!product && input.productId && mongoose.Types.ObjectId.isValid(input.productId)) {
    product = await Product.findById(input.productId).lean();
  }

  if (product && !variant) {
    const variants = await Variant.find({ productId: product._id, isActive: true }).lean();
    const targetColorSlug = input.color ? toSlug(input.color) : '';
    variant = variants.find((v) => {
      const sizeMatch = !input.size || v.size?.toLowerCase() === input.size.toLowerCase();
      const colorMatch = !targetColorSlug || toSlug(v.color?.name || '') === targetColorSlug;
      return sizeMatch && colorMatch;
    });
    if (!variant && input.size) {
      variant = variants.find((v) => v.size?.toLowerCase() === input.size.toLowerCase());
    }
    if (!variant) variant = variants[0];
  }

  if (!product || !variant) return null;

  const qty = Math.min(Math.max(1, parseInt(input.quantity, 10) || 1), 10);
  const colorSlug = input.color ? toSlug(input.color) : toSlug(variant.color?.name || 'natural');

  return {
    productId: product._id,
    variantId: variant._id,
    name: product.name,
    slug: product.slug,
    image: product.images?.[0]?.url || input.image || '',
    size: variant.size,
    color: colorSlug,
    price: variant.price,
    quantity: qty,
    availableStock: variant.inventoryCount ?? 50
  };
}

function formatMongoCart(cartDoc, cartId) {
  const rawItems = cartDoc?.items || [];
  const items = rawItems.map((it) => {
    const vId = it.variantId.toString();
    const colorSlug = toSlug(it.color || 'natural');
    return {
      itemId: vId,
      cartKey: `${it.slug}__${it.size}__${colorSlug}`,
      productId: it.productId.toString(),
      variantId: vId,
      slug: it.slug,
      name: it.name,
      image: it.image || '',
      size: it.size,
      color: colorSlug,
      price: it.price,
      quantity: it.quantity,
      subtotal: it.price * it.quantity
    };
  });

  const subtotal = items.reduce((sum, it) => sum + it.subtotal, 0);
  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);

  return {
    cartId,
    items,
    itemCount,
    subtotal,
    subtotalPaise: subtotal * 100,
    currency: 'INR'
  };
}

function matchesLine(item, targetId) {
  const id = (targetId || '').toString();
  const cSlug = toSlug(item.color || '');
  return (
    item.variantId?.toString() === id ||
    `${item.slug}__${item.size}__${cSlug}` === id ||
    `${item.productId}__${item.size}__${cSlug}` === id
  );
}

async function getOrCreateMongoCart(cartId, req) {
  let cart = await Cart.findOne({ cartId });
  if (!cart) {
    const userId = req.user && mongoose.Types.ObjectId.isValid(req.user._id) ? req.user._id : null;
    cart = new Cart({ cartId, userId, items: [] });
  }
  return cart;
}

const getCart = async (req, res, next) => {
  try {
    const cartId = getCartId(req);
    if (mongoose.connection.readyState === 1) {
      const cart = await Cart.findOne({ cartId }).lean();
      return res.json({
        success: true,
        data: formatMongoCart(cart, cartId)
      });
    }

    const cart = store.getCart(cartId);
    return res.json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { variantId, productId, slug, size, color, quantity = 1, image } = req.body;
    if (!variantId && !slug && !productId) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'A variantId, product slug, or productId is required.' }
      });
    }

    const cartId = getCartId(req);

    if (mongoose.connection.readyState === 1) {
      const resolved = await resolveMongoCartItem({ variantId, productId, slug, size, color, quantity, image });
      if (resolved) {
        const cart = await getOrCreateMongoCart(cartId, req);
        const existing = cart.items.find((it) => it.variantId.toString() === resolved.variantId.toString());
        if (existing) {
          existing.quantity = Math.min(existing.quantity + resolved.quantity, 10);
        } else {
          const { availableStock, ...cleanLine } = resolved;
          cart.items.push(cleanLine);
        }
        await cart.save();
        return res.json({
          success: true,
          data: formatMongoCart(cart, cartId)
        });
      }
    }

    const updated = store.addToCart(cartId, {
      variantId,
      productId,
      slug,
      size,
      color,
      quantity: parseInt(quantity, 10) || 1
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    res.status(422).json({
      success: false,
      error: { code: 'CART_ERROR', message: err.message }
    });
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { variantId, quantity, newSize, newColor } = req.body;
    const itemId = decodeURIComponent(req.params.itemId || variantId || '');
    const cartId = getCartId(req);
    const parsedQty = quantity !== undefined ? parseInt(quantity, 10) : undefined;

    if (mongoose.connection.readyState === 1) {
      const cart = await getOrCreateMongoCart(cartId, req);
      const idx = cart.items.findIndex((it) => matchesLine(it, itemId));
      if (idx !== -1) {
        if (parsedQty !== undefined && parsedQty <= 0) {
          cart.items.splice(idx, 1);
        } else if (newSize || newColor) {
          const current = cart.items[idx];
          const resolved = await resolveMongoCartItem({
            slug: current.slug,
            productId: current.productId.toString(),
            size: newSize || current.size,
            color: newColor || current.color,
            quantity: parsedQty !== undefined ? parsedQty : current.quantity
          });
          if (resolved) {
            const mergeIdx = cart.items.findIndex(
              (x, i) => i !== idx && x.variantId.toString() === resolved.variantId.toString()
            );
            if (mergeIdx !== -1) {
              cart.items[mergeIdx].quantity = Math.min(cart.items[mergeIdx].quantity + resolved.quantity, 10);
              cart.items.splice(idx, 1);
            } else {
              const { availableStock, ...cleanLine } = resolved;
              cart.items[idx] = cleanLine;
            }
          }
        } else if (parsedQty !== undefined) {
          cart.items[idx].quantity = Math.min(Math.max(1, parsedQty), 10);
        }

        await cart.save();
        return res.json({
          success: true,
          data: formatMongoCart(cart, cartId)
        });
      }
    }

    const updated = store.updateCartItem(cartId, {
      itemId,
      variantId,
      quantity: parsedQty,
      newSize,
      newColor
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const itemId = decodeURIComponent(req.params.itemId || '');
    const cartId = getCartId(req);

    if (mongoose.connection.readyState === 1) {
      const cart = await Cart.findOne({ cartId });
      if (cart) {
        cart.items = cart.items.filter((it) => !matchesLine(it, itemId));
        await cart.save();
        return res.json({
          success: true,
          data: formatMongoCart(cart, cartId)
        });
      }
    }

    const updated = store.removeFromCart(cartId, itemId);
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const syncCart = async (req, res, next) => {
  try {
    const { items = [] } = req.body;
    const cartId = getCartId(req);

    if (mongoose.connection.readyState === 1) {
      const cart = await getOrCreateMongoCart(cartId, req);
      if (Array.isArray(items)) {
        for (const raw of items) {
          const resolved = await resolveMongoCartItem(raw);
          if (!resolved) continue;
          const existing = cart.items.find((it) => it.variantId.toString() === resolved.variantId.toString());
          if (existing) {
            existing.quantity = Math.min(Math.max(existing.quantity, resolved.quantity), 10);
          } else {
            const { availableStock, ...cleanLine } = resolved;
            cart.items.push(cleanLine);
          }
        }
        await cart.save();
      }
      return res.json({
        success: true,
        data: formatMongoCart(cart, cartId)
      });
    }

    const synced = store.syncCart(cartId, items);
    return res.json({ success: true, data: synced });
  } catch (err) {
    next(err);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cartId = getCartId(req);
    if (mongoose.connection.readyState === 1) {
      const cart = await Cart.findOne({ cartId });
      if (cart) {
        cart.items = [];
        await cart.save();
        return res.json({
          success: true,
          data: formatMongoCart(cart, cartId)
        });
      }
    }

    store.clearCart(cartId);
    return res.json({
      success: true,
      data: store.getCart(cartId)
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  syncCart,
  clearCart
};
