const store = require('../services/storeService');

const quoteCheckout = (req, res, next) => {
  try {
    const { items, couponCode } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        error: { code: 'EMPTY_CART', message: 'At least one line item is required to generate a checkout quote.' }
      });
    }

    const quote = store.calculateQuote(items, couponCode);
    res.json({
      success: true,
      data: quote
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      error: { code: 'QUOTE_ERROR', message: err.message }
    });
  }
};

const createOrder = (req, res, next) => {
  try {
    const { items, address, deliveryInstructions, couponCode, paymentMethod, guestEmail } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        error: { code: 'EMPTY_CART', message: 'Cannot place an order with an empty cart.' }
      });
    }
    if (!address || !address.recipientName || !address.addressLine1 || !address.city || !address.postalCode) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ADDRESS', message: 'Full shipping address with postal code is required.' }
      });
    }

    const userId = req.user ? req.user._id : null;
    const order = store.createOrder({
      userId,
      guestEmail: guestEmail || (req.user ? req.user.email : 'guest@example.com'),
      items,
      address,
      deliveryInstructions,
      couponCode,
      paymentMethod: paymentMethod || 'Online UPI / Card (Simulated)'
    });

    // Clear user/guest cart on successful order
    const guestHeader = req.headers['x-guest-token'] || req.headers['x-cart-token'] || 'guest_default_session';
    const cartId = req.user ? `user_${req.user._id}` : `guest_${guestHeader}`;
    store.clearCart(cartId);

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      error: { code: 'ORDER_CREATION_FAILED', message: err.message }
    });
  }
};

const getCustomerOrders = (req, res) => {
  const userId = req.user ? req.user._id : null;
  const email = req.user ? req.user.email : req.query.email;
  const orders = store.getCustomerOrders(userId, email);
  res.json({
    success: true,
    data: orders
  });
};

const getOrderById = (req, res) => {
  const order = store.getOrderById(req.params.orderId);
  if (!order) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Order not found.' }
    });
  }

  // Authorization check: if logged in as customer, ensure they own the order
  if (req.user && req.user.role === 'customer') {
    if (order.userId && order.userId !== req.user._id && order.guestEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'You do not have permission to view this order.' }
      });
    }
  }

  res.json({
    success: true,
    data: order
  });
};

const cancelOrder = (req, res, next) => {
  try {
    const order = store.getOrderById(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Order not found.' }
      });
    }

    if (!['pending_payment', 'confirmed'].includes(order.orderStatus)) {
      return res.status(422).json({
        success: false,
        error: { code: 'CANNOT_CANCEL', message: `Order cannot be cancelled in '${order.orderStatus}' status. Please contact support.` }
      });
    }

    const updated = store.updateOrderStatus(order._id, 'cancelled', {
      actor: req.user ? req.user.email : 'customer',
      actorRole: req.user ? req.user.role : 'customer',
      note: req.body.reason || 'Cancelled by customer'
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  quoteCheckout,
  createOrder,
  getCustomerOrders,
  getOrderById,
  cancelOrder
};
