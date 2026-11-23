const store = require('../services/storeService');

const getCartId = (req) => {
  // If authenticated user, use userId; otherwise use guest-token from header or cookie
  if (req.user) return `user_${req.user._id}`;
  const guestHeader = req.headers['x-guest-token'] || req.headers['x-cart-token'] || 'guest_default_session';
  return `guest_${guestHeader}`;
};

const getCart = (req, res) => {
  const cartId = getCartId(req);
  const cart = store.getCart(cartId);
  res.json({
    success: true,
    data: cart
  });
};

const addItem = (req, res, next) => {
  try {
    const { variantId, quantity = 1 } = req.body;
    if (!variantId) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Variant ID is required to add an item.' }
      });
    }

    const cartId = getCartId(req);
    const updated = store.addToCart(cartId, { variantId, quantity: parseInt(quantity, 10) });
    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      error: { code: 'CART_ERROR', message: err.message }
    });
  }
};

const updateItem = (req, res, next) => {
  try {
    const { variantId, quantity } = req.body;
    const cartId = getCartId(req);
    const updated = store.updateCartItem(cartId, { variantId: req.params.itemId || variantId, quantity: parseInt(quantity, 10) });
    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

const removeItem = (req, res) => {
  const cartId = getCartId(req);
  const updated = store.removeFromCart(cartId, req.params.itemId);
  res.json({
    success: true,
    data: updated
  });
};

const clearCart = (req, res) => {
  const cartId = getCartId(req);
  store.clearCart(cartId);
  res.json({
    success: true,
    data: store.getCart(cartId)
  });
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
};
