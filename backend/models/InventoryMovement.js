const mongoose = require('mongoose');

const inventoryMovementSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Variant',
      required: true,
      index: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    changeQuantity: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['OrderPlaced', 'OrderCancelled', 'ManualAdjustment', 'Restock'],
      required: true
    },
    referenceId: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.InventoryMovement || mongoose.model('InventoryMovement', inventoryMovementSchema);
