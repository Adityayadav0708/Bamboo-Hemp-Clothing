const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true
  },
  provider: {
    type: String,
    enum: ['razorpay', 'stripe', 'cod', 'mock'],
    default: 'mock'
  },
  providerOrderId: {
    type: String,
    default: null
  },
  providerPaymentId: {
    type: String,
    default: null
  },
  amountPaise: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'pending', 'authorized', 'paid', 'failed', 'cancelled', 'refunded'],
    default: 'created',
    index: true
  },
  webhookEventIds: [{
    type: String
  }],
  failureCode: {
    type: String,
    default: null
  },
  failureMessage: {
    type: String,
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
