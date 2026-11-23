const mongoose = require('mongoose');

const InventoryMovementSchema = new mongoose.Schema({
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
    required: true,
    index: true
  },
  sku: {
    type: String,
    required: true,
    index: true
  },
  movementType: {
    type: String,
    enum: [
      'purchase_receipt',
      'manual_correction',
      'damage',
      'return',
      'order_reservation',
      'order_release',
      'order_commitment'
    ],
    required: true
  },
  quantityChange: {
    type: Number,
    required: true // Can be positive or negative
  },
  quantityBefore: {
    type: Number,
    required: true
  },
  quantityAfter: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  referenceType: {
    type: String,
    enum: ['order', 'purchase_order', 'admin_adjustment', 'return_request'],
    default: 'admin_adjustment'
  },
  referenceId: {
    type: String,
    default: null
  },
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  actorName: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: { createdAt: true, updatedAt: false } // Append-only
});

module.exports = mongoose.models.InventoryMovement || mongoose.model('InventoryMovement', InventoryMovementSchema);
