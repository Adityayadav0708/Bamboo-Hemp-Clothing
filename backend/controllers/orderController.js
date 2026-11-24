const mongoose = require('mongoose');
const { Order, Product, Variant, Cart } = require('../models');
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

const createOrder = async (req, res, next) => {
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

    const userId = req.user ? (req.user._id ? req.user._id.toString() : req.user.id) : null;
    const email = guestEmail || (req.user ? req.user.email : 'guest@example.com');
    const orderNumber = `BH-${Date.now().toString().slice(-6)}`;

    // Quote calculation
    const quote = store.calculateQuote(items, couponCode);

    // 1. If MongoDB is connected, save Order document
    let orderDoc = null;
    if (mongoose.connection.readyState === 1) {
      try {
        orderDoc = await Order.create({
          orderNumber,
          userId: userId && mongoose.Types.ObjectId.isValid(userId) ? userId : null,
          guestEmail: email,
          items: items.map(it => ({
            productId: it.productId && mongoose.Types.ObjectId.isValid(it.productId) ? it.productId : new mongoose.Types.ObjectId(),
            variantId: it.variantId && mongoose.Types.ObjectId.isValid(it.variantId) ? it.variantId : new mongoose.Types.ObjectId(),
            name: it.name || 'Bamboo Essential',
            slug: it.slug || 'bamboo-product',
            image: it.image || '',
            size: it.size || 'M',
            color: typeof it.color === 'string' ? it.color : (it.color?.name || ''),
            price: it.price || 999,
            quantity: it.quantity || 1,
            subtotal: (it.price || 999) * (it.quantity || 1)
          })),
          shippingAddress: {
            recipientName: address.recipientName,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2 || '',
            city: address.city,
            state: address.state || 'Karnataka',
            postalCode: address.postalCode,
            country: address.country || 'India',
            phone: address.phone || ''
          },
          subtotal: quote.subtotalRupees || (quote.subtotalPaise ? quote.subtotalPaise / 100 : 999),
          shippingFee: quote.shippingFeeRupees || 0,
          discount: quote.discountRupees || 0,
          totalAmount: quote.finalPayableRupees || (quote.finalPayablePaise ? quote.finalPayablePaise / 100 : 999),
          currency: 'INR',
          paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
          paymentStatus: 'Pending',
          orderStatus: 'Placed',
          deliveryInstructions: deliveryInstructions || '',
          couponCode: couponCode || ''
        });
      } catch (err) {
        console.warn('[MongoDB Order Error, using store fallback]:', err.message);
      }
    }

    // 2. Also register in store fallback for instant memory consistency
    const fallbackOrder = store.createOrder({
      userId,
      guestEmail: email,
      items,
      address,
      deliveryInstructions,
      couponCode,
      paymentMethod: paymentMethod || 'Cash on Delivery (COD)'
    });

    const guestHeader = req.headers['x-guest-token'] || req.headers['x-cart-token'] || 'guest_default_session';
    const cartId = req.user ? `user_${userId}` : `guest_${guestHeader}`;
    store.clearCart(cartId);

    res.status(201).json({
      success: true,
      data: orderDoc || fallbackOrder
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      error: { code: 'ORDER_CREATION_FAILED', message: err.message }
    });
  }
};

const getCustomerOrders = async (req, res, next) => {
  try {
    const userId = req.user ? (req.user._id ? req.user._id.toString() : req.user.id) : null;
    const email = req.user ? req.user.email : req.query.email;

    if (mongoose.connection.readyState === 1 && (userId || email)) {
      const orList = [];
      if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        orList.push({ userId: new mongoose.Types.ObjectId(userId) });
      }
      if (email) {
        orList.push({ guestEmail: email });
      }
      if (orList.length > 0) {
        const orders = await Order.find({ $or: orList }).sort({ createdAt: -1 }).lean();
        if (orders && orders.length > 0) {
          return res.json({
            success: true,
            data: orders
          });
        }
      }
    }

    const orders = store.getCustomerOrders(userId, email);
    res.json({
      success: true,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (mongoose.connection.readyState === 1) {
      let order = null;
      if (mongoose.Types.ObjectId.isValid(orderId)) {
        order = await Order.findById(orderId).lean();
      }
      if (!order) {
        order = await Order.findOne({ orderNumber: orderId }).lean();
      }
      if (order) {
        return res.json({
          success: true,
          data: order
        });
      }
    }

    const order = store.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Order not found.' }
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
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
