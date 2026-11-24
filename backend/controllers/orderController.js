const mongoose = require('mongoose');
const { Order, Product, Variant, Cart } = require('../models');
const store = require('../services/storeService');

function toSlug(val = '') {
  return val.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const quoteCheckout = (req, res) => {
  try {
    const { items, couponCode, deliveryMethod = 'standard', paymentMethod = '' } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        error: { code: 'EMPTY_CART', message: 'At least one line item is required to generate a checkout quote.' }
      });
    }

    const quote = store.calculateQuote(items, couponCode, { deliveryMethod, paymentMethod });
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

async function resolveMongoLineItem(item) {
  let product = null;
  let variant = null;

  if (item.variantId && mongoose.Types.ObjectId.isValid(item.variantId)) {
    variant = await Variant.findById(item.variantId).lean();
    if (variant) product = await Product.findById(variant.productId).lean();
  }
  if (!product && item.slug) {
    product = await Product.findOne({ slug: item.slug }).lean();
  }
  if (!product && item.productId && mongoose.Types.ObjectId.isValid(item.productId)) {
    product = await Product.findById(item.productId).lean();
  }

  if (product && !variant) {
    const variants = await Variant.find({ productId: product._id }).lean();
    const colorSlug = item.color ? toSlug(item.color) : '';
    variant = variants.find((v) => {
      const sizeMatch = !item.size || v.size?.toLowerCase() === item.size.toLowerCase();
      const colorMatch = !colorSlug || toSlug(v.color?.name || '') === colorSlug;
      return sizeMatch && colorMatch;
    }) || variants.find((v) => !item.size || v.size?.toLowerCase() === item.size.toLowerCase()) || variants[0];
  }

  const unitPrice = variant?.price ?? item.price ?? 990;
  const qty = Math.max(1, parseInt(item.quantity, 10) || 1);

  return {
    productId: product?._id || new mongoose.Types.ObjectId(),
    variantId: variant?._id || new mongoose.Types.ObjectId(),
    hasRealVariant: Boolean(variant?._id),
    name: product?.name || item.name || 'Bamboo Essential',
    slug: product?.slug || item.slug || 'bamboo-product',
    image: product?.images?.[0]?.url || item.image || '',
    size: variant?.size || item.size || 'M',
    color: variant?.color?.name || (typeof item.color === 'string' ? item.color : (item.color?.name || '')),
    price: unitPrice,
    quantity: qty,
    subtotal: unitPrice * qty
  };
}

const createOrder = async (req, res) => {
  try {
    const {
      items,
      address,
      deliveryInstructions,
      couponCode,
      deliveryMethod = 'standard',
      paymentMethod = 'Cash on Delivery (COD)',
      guestEmail
    } = req.body;

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

    let orderDoc = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const resolvedItems = await Promise.all(items.map(resolveMongoLineItem));
        const quote = store.calculateQuote(resolvedItems, couponCode, { deliveryMethod, paymentMethod });

        orderDoc = await Order.create({
          orderNumber,
          userId: userId && mongoose.Types.ObjectId.isValid(userId) ? userId : null,
          guestEmail: email,
          items: resolvedItems.map(({ hasRealVariant, ...rest }) => rest),
          shippingAddress: {
            recipientName: address.recipientName,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2 || '',
            city: address.city,
            state: address.state || 'Karnataka',
            postalCode: String(address.postalCode),
            country: address.country || 'India',
            phone: address.phone || ''
          },
          subtotal: quote.subtotalRupees,
          shippingFee: quote.shippingFeeRupees,
          codFee: quote.codFeeRupees,
          deliveryMethod,
          discount: quote.discountRupees,
          totalAmount: quote.finalPayableRupees,
          currency: 'INR',
          paymentMethod,
          paymentStatus: 'Pending',
          orderStatus: 'Placed',
          deliveryInstructions: deliveryInstructions || '',
          couponCode: quote.couponCode || ''
        });

        // Decrement variant inventory in MongoDB
        for (const it of resolvedItems) {
          if (it.hasRealVariant) {
            await Variant.updateOne(
              { _id: it.variantId, inventoryCount: { $gte: it.quantity } },
              { $inc: { inventoryCount: -it.quantity } }
            );
          }
        }
      } catch (err) {
        console.warn('[MongoDB Order Error, using store fallback]:', err.message);
      }
    }

    const fallbackOrder = store.createOrder({
      userId,
      guestEmail: email,
      items,
      address,
      deliveryInstructions,
      couponCode,
      deliveryMethod,
      paymentMethod,
      orderNumber
    });

    const guestHeader = req.headers['x-guest-token'] || req.headers['x-cart-token'] || 'guest_default_session';
    const cartId = req.user ? `user_${userId}` : `guest_${guestHeader}`;
    store.clearCart(cartId);

    if (mongoose.connection.readyState === 1) {
      await Cart.updateOne({ cartId }, { $set: { items: [], subtotal: 0, itemCount: 0 } }).catch(() => {});
    }

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
