const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const catalogueController = require('../controllers/catalogueController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');
const { requireAuth, optionalAuth, requireRole } = require('../middleware/auth');

// ── System / Health Endpoints (Section 53) ──
router.get('/health', (req, res) => res.json({ success: true, status: 'healthy', timestamp: new Date() }));
router.get('/ready', (req, res) => res.json({ success: true, status: 'ready', uptime: process.uptime() }));
router.get('/version', (req, res) => res.json({ success: true, version: '2.0.0', platform: 'Bamboo & Hemp D2C' }));

// ── Authentication APIs (Section 53) ──
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', requireAuth, authController.getMe);

// ── Public Catalogue APIs (Section 53) ──
router.get('/categories', catalogueController.getCategories);
router.get('/products', catalogueController.getProducts);
router.get('/products/search', catalogueController.searchProducts);
router.get('/products/:slug', catalogueController.getProductBySlug);
router.get('/products/:productId/related', catalogueController.getRelatedProducts);

// ── Cart APIs (Section 53) ──
router.get('/cart', cartController.getCart);
router.post('/cart/items', cartController.addItem);
router.patch('/cart/items/:itemId', cartController.updateItem);
router.delete('/cart/items/:itemId', cartController.removeItem);
router.delete('/cart', cartController.clearCart);

// ── Checkout & Orders (Section 53) ──
router.post('/checkout/quote', optionalAuth, orderController.quoteCheckout);
router.post('/checkout/orders', optionalAuth, orderController.createOrder);
router.get('/customer/orders', optionalAuth, orderController.getCustomerOrders);
router.get('/customer/orders/:orderId', optionalAuth, orderController.getOrderById);
router.post('/customer/orders/:orderId/cancel', optionalAuth, orderController.cancelOrder);

// ── Admin APIs (Section 50, 53) ──
// Dashboard KPI
router.get('/admin/metrics', adminController.getDashboardMetrics);

// Product & Category Management
router.get('/admin/products', adminController.getAdminProducts);
router.post('/admin/products', adminController.createProduct);
router.patch('/admin/products/:id', adminController.updateProduct);
router.post('/admin/products/:id/publish', adminController.publishProduct);
router.post('/admin/products/:id/archive', adminController.archiveProduct);

// Inventory Management
router.get('/admin/inventory', adminController.getAdminInventory);
router.post('/admin/inventory/adjustments', adminController.adjustStock);

// Order Operations
router.get('/admin/orders', adminController.getAdminOrders);
router.get('/admin/orders/:id', adminController.getAdminOrderById);
router.patch('/admin/orders/:id/status', adminController.updateAdminOrderStatus);

// Audit & Settings
router.get('/admin/audit-logs', adminController.getAdminAuditLogs);
router.get('/admin/settings', adminController.getAdminSettings);

module.exports = router;
