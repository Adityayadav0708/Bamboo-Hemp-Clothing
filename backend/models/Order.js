const mongoose = require('mongoose');

const OrderItemSnapshotSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant' },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  colour: { type: String, required: true },
  unitPricePaise: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  lineTotalPaise: { type: Number, required: true, min: 0 },
  image: { type: String, default: '' }
}, { _id: false });

const OrderAddressSnapshotSchema = new mongoose.Schema({
  recipientName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, default: '' },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'India' }
}, { _id: false });

const StatusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  actor: { type: String, default: 'system' },
  actorRole: { type: String, default: 'system' },
  note: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  guestEmail: {
    type: String,
    default: null,
    trim: true,
    lowercase: true
  },
  itemsSnapshot: [OrderItemSnapshotSchema],
  addressSnapshot: OrderAddressSnapshotSchema,
  deliveryInstructions: {
    type: String,
    default: ''
  },
  subtotalPaise: {
    type: Number,
    required: true,
    min: 0
  },
  discountPaise: {
    type: Number,
    default: 0,
    min: 0
  },
  couponCode: {
    type: String,
    default: null
  },
  shippingPaise: {
    type: Number,
    default: 0,
    min: 0
  },
  taxPaise: {
    type: Number,
    default: 0,
    min: 0
  },
  totalPaise: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentStatus: {
    type: String,
    enum: ['created', 'pending', 'authorized', 'paid', 'failed', 'cancelled', 'refund_pending', 'refunded'],
    default: 'created',
    index: true
  },
  orderStatus: {
    type: String,
    enum: ['pending_payment', 'confirmed', 'processing', 'packed', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending_payment',
    index: true
  },
  trackingNumber: {
    type: String,
    default: null
  },
  courierPartner: {
    type: String,
    default: 'Bluedart'
  },
  idempotencyKey: {
    type: String,
    unique: true,
    sparse: true
  },
  statusHistory: [StatusHistorySchema],
  internalNotes: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
