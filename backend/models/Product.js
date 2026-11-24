const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    altText: { type: String, default: '' },
    isPrimary: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 }
  },
  { _id: false }
);

const compositionSchema = new mongoose.Schema(
  {
    fibre: { type: String, required: true },
    percentage: { type: Number, required: true }
  },
  { _id: false }
);

const storySchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    fabricType: {
      type: String,
      enum: ['bamboo', 'hemp', 'blend'],
      default: 'bamboo'
    },
    fabricComposition: [compositionSchema],
    shortDescription: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    materialDetails: {
      type: String,
      default: ''
    },
    careInstructions: [
      {
        type: String
      }
    ],
    badge: {
      type: String,
      default: ''
    },
    images: [imageSchema],
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'active'
    },
    materialStory: storySchema,
    stylingNote: storySchema,
    faqs: [faqSchema]
  },
  {
    timestamps: true
  }
);

// Virtual for variants
productSchema.virtual('variants', {
  ref: 'Variant',
  localField: '_id',
  foreignField: 'productId'
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
