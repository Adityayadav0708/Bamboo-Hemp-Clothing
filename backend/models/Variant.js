const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    size: {
      type: String,
      required: [true, 'Size is required'],
      trim: true
    },
    color: {
      name: { type: String, default: '' },
      hex: { type: String, default: '#000000' }
    },
    mrp: {
      type: Number,
      required: [true, 'MRP (standard price) is required'],
      min: 0
    },
    price: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: 0
    },
    inventoryCount: {
      type: Number,
      default: 50,
      min: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index to guarantee uniqueness of size & color per product
variantSchema.index({ productId: 1, size: 1, 'color.name': 1 }, { unique: true });

module.exports = mongoose.models.Variant || mongoose.model('Variant', variantSchema);
