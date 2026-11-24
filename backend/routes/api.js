const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const customerController = require('../controllers/customerController');
const catalogueController = require('../controllers/catalogueController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');
const { requireAuth, optionalAuth, requireAdmin } = require('../middleware/auth');

// ── System / Health Endpoints (Section 53) ──
router.get('/health', (req, res) => res.json({ success: true, status: 'healthy', timestamp: new Date() }));
router.get('/ready', (req, res) => res.json({ success: true, status: 'ready', uptime: process.uptime() }));
router.get('/version', (req, res) => res.json({ success: true, version: '2.0.0', platform: 'Bamboo & Hemp D2C' }));

// ── Authentication APIs (Section 53) ──
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', requireAuth, authController.getMe);
router.put('/auth/profile', requireAuth, authController.updateProfile);
router.post('/auth/forgot-password', (req, res) => {
  res.json({
    success: true,
    message: 'If an account matches this email, password reset instructions have been sent.'
  });
});
router.post('/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ── Customer Addresses CRUD ──
router.get('/customer/addresses', requireAuth, customerController.getAddresses);
router.post('/customer/addresses', requireAuth, customerController.addAddress);
router.put('/customer/addresses/:addressId', requireAuth, customerController.updateAddress);
router.delete('/customer/addresses/:addressId', requireAuth, customerController.deleteAddress);

// ── Public Catalogue APIs (Section 53) ──
router.get('/categories', catalogueController.getCategories);
router.get('/categories/:slug', catalogueController.getCategoryBySlug);
router.get('/products', catalogueController.getProducts);
router.get('/products/search', catalogueController.searchProducts);
router.get('/products/:slug', catalogueController.getProductBySlug);
router.get('/products/:productId/related', catalogueController.getRelatedProducts);

// ── Cart APIs (Section 53) ──
router.get('/cart', optionalAuth, cartController.getCart);
router.post('/cart/sync', optionalAuth, cartController.syncCart);
router.post('/cart/items', optionalAuth, cartController.addItem);
router.patch('/cart/items/:itemId', optionalAuth, cartController.updateItem);
router.delete('/cart/items/:itemId', optionalAuth, cartController.removeItem);
router.delete('/cart', optionalAuth, cartController.clearCart);

// ── Checkout & Orders (Section 53) ──
router.post('/checkout/quote', optionalAuth, orderController.quoteCheckout);
router.post('/checkout/orders', optionalAuth, orderController.createOrder);
router.get('/customer/orders', optionalAuth, orderController.getCustomerOrders);
router.get('/customer/orders/:orderId', optionalAuth, orderController.getOrderById);
router.post('/customer/orders/:orderId/cancel', optionalAuth, orderController.cancelOrder);

// ── Admin APIs (Section 50, 53) ──
// Enforce JWT authentication and admin/super_admin role for all /admin/* endpoints
const adminRouter = express.Router();
adminRouter.use(requireAdmin);

// Dashboard KPI
adminRouter.get('/metrics', adminController.getDashboardMetrics);

// Product & Category Management
adminRouter.get('/products', adminController.getAdminProducts);
adminRouter.post('/products', adminController.createProduct);
adminRouter.patch('/products/:id', adminController.updateProduct);
adminRouter.post('/products/:id/publish', adminController.publishProduct);
adminRouter.post('/products/:id/archive', adminController.archiveProduct);

// Inventory Management
adminRouter.get('/inventory', adminController.getAdminInventory);
adminRouter.post('/inventory/adjustments', adminController.adjustStock);

// Order Operations
adminRouter.get('/orders', adminController.getAdminOrders);
adminRouter.get('/orders/:id', adminController.getAdminOrderById);
adminRouter.patch('/orders/:id/status', adminController.updateAdminOrderStatus);

// Audit & Settings
adminRouter.get('/audit-logs', adminController.getAdminAuditLogs);
adminRouter.get('/settings', adminController.getAdminSettings);

router.use('/admin', adminRouter);

module.exports = router;
