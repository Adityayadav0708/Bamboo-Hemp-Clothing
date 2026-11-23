const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  actorEmail: {
    type: String,
    default: 'system'
  },
  actorRole: {
    type: String,
    default: 'admin'
  },
  action: {
    type: String,
    required: true,
    index: true // e.g. "product.create", "stock.adjust", "order.status_update"
  },
  resourceType: {
    type: String,
    required: true,
    index: true // e.g. "Product", "Variant", "Order", "Category"
  },
  resourceId: {
    type: String,
    required: true
  },
  before: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  after: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  ipHash: {
    type: String,
    default: ''
  },
  userAgentSummary: {
    type: String,
    default: ''
  }
}, {
  timestamps: { createdAt: true, updatedAt: false } // Append-only
});

module.exports = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
