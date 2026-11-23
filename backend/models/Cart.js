const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    max: [10, 'Maximum 10 units per line allowed'],
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  guestTokenHash: {
    type: String,
    default: null,
    index: true
  },
  items: [CartItemSchema],
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
