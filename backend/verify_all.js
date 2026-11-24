/**
 * verify_all.js
 * Complete Full-System Verification Suite for Bamboo & Hemp D2C Platform.
 * Tests every single Auth, Admin, Catalogue, and Order capability in the backend.
 */
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

async function verifyAll() {
  console.log('================================================================');
  console.log('🚀 RUNNING COMPANY-GRADE BACKEND VERIFICATION FOR BAMBOO & HEMP');
  console.log('================================================================\n');

  await connectDB();

  const server = app.listen(5098, async () => {
    const BASE = 'http://localhost:5098/api/v1';
    let total = 0;
    let passed = 0;
    let failed = 0;

    const check = (description, success, extraInfo = '') => {
      total++;
      if (success) {
        passed++;
        console.log(`  ✅ [PASS] ${description} ${extraInfo ? '(' + extraInfo + ')' : ''}`);
      } else {
        failed++;
        console.error(`  ❌ [FAIL] ${description} ${extraInfo ? '(' + extraInfo + ')' : ''}`);
      }
    };

    try {
      // ──────────────────────────────────────────────────────────
      // 1. AUTHENTICATION & LOGIN PORTAL TESTS
      // ──────────────────────────────────────────────────────────
      console.log('📌 PHASE 1: LOGIN & AUTHENTICATION PORTAL');

      // Test 1: Admin Login with Seeded Credentials
      const resAdminLogin = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@bamboohemp.com', password: 'Admin@12345' })
      });
      const adminLogin = await resAdminLogin.json();
      const adminToken = adminLogin.data?.token;
      check(
        'Admin Login (admin@bamboohemp.com)',
        resAdminLogin.status === 200 && adminLogin.data?.user?.role === 'admin' && !!adminToken,
        `Token received, Role: ${adminLogin.data?.user?.role}`
      );

      // Test 2: Customer Login with Seeded Credentials
      const resCustLogin = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'customer@bamboohemp.com', password: 'Customer@12345' })
      });
      const custLogin = await resCustLogin.json();
      const custToken = custLogin.data?.token;
      check(
        'Customer Login (customer@bamboohemp.com)',
        resCustLogin.status === 200 && custLogin.data?.user?.role === 'customer' && !!custToken,
        `Name: ${custLogin.data?.user?.fullName}`
      );

      // Test 3: Invalid Password Rejection
      const resBadLogin = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@bamboohemp.com', password: 'WrongPassword999!' })
      });
      check(
        'Security: Rejection of incorrect password',
        resBadLogin.status === 401,
        `HTTP ${resBadLogin.status} Unauthorized`
      );

      // Test 4: Protected Profile Lookup (/auth/me)
      const resMe = await fetch(`${BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const meData = await resMe.json();
      check(
        'Protected Profile Lookup (/auth/me with Bearer token)',
        resMe.status === 200 && meData.data?.user?.email === 'admin@bamboohemp.com',
        `Authenticated as: ${meData.data?.user?.email}`
      );

      // ──────────────────────────────────────────────────────────
      // 2. ADMIN PORTAL ENDPOINTS TESTS & ROUTE PROTECTION
      // ──────────────────────────────────────────────────────────
      console.log('\n📌 PHASE 2: ADMIN PORTAL BACKEND CAPABILITIES & ROUTE PROTECTION');

      // Security Checks: Unauthenticated & Non-Admin Access Blocked
      const resNoAuthAdmin = await fetch(`${BASE}/admin/metrics`);
      check(
        'Security: Unauthenticated request to /admin/metrics blocked (401)',
        resNoAuthAdmin.status === 401,
        `HTTP ${resNoAuthAdmin.status}`
      );

      const resCustAdmin = await fetch(`${BASE}/admin/metrics`, {
        headers: { Authorization: `Bearer ${custToken}` }
      });
      check(
        'Security: Customer token rejected on /admin/metrics (403 Forbidden)',
        resCustAdmin.status === 403,
        `HTTP ${resCustAdmin.status}`
      );

      const adminAuthHeaders = { Authorization: `Bearer ${adminToken}` };

      // Test 5: Admin Dashboard Metrics
      const resMetrics = await fetch(`${BASE}/admin/metrics`, { headers: adminAuthHeaders });
      const metrics = await resMetrics.json();
      check(
        'Admin KPI Overview (/admin/metrics)',
        resMetrics.status === 200 && metrics.success === true && typeof metrics.data?.totalOrders === 'number',
        `Orders: ${metrics.data?.totalOrders}, Low Stock Count: ${metrics.data?.lowStockCount}`
      );

      // Test 6: Admin Products Listing
      const resAdminProds = await fetch(`${BASE}/admin/products`, { headers: adminAuthHeaders });
      const adminProds = await resAdminProds.json();
      check(
        'Admin Products Catalogue (/admin/products)',
        resAdminProds.status === 200 && adminProds.data?.length >= 18,
        `Total Products in Console: ${adminProds.data?.length}`
      );

      // Test 7: Admin Inventory Listing
      const resInv = await fetch(`${BASE}/admin/inventory`, { headers: adminAuthHeaders });
      const invData = await resInv.json();
      const firstVariant = invData.data?.[0];
      check(
        'Admin Inventory View (/admin/inventory)',
        resInv.status === 200 && invData.data?.length > 0,
        `Total Tracked Variants: ${invData.data?.length}, Sample SKU: ${firstVariant?.sku}`
      );

      // Test 8: Admin Stock Adjustment Mutation
      let adjusted = false;
      if (firstVariant) {
        const resAdj = await fetch(`${BASE}/admin/inventory/adjustments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...adminAuthHeaders
          },
          body: JSON.stringify({
            variantId: firstVariant.variantId || firstVariant.id || firstVariant._id,
            changeAmount: 25,
            reason: 'purchase_receipt'
          })
        });
        const adjData = await resAdj.json();
        adjusted = resAdj.status === 200 && adjData.success === true;
        check(
          'Admin Inventory Adjustment (+25 units)',
          adjusted,
          `New quantity: ${adjData.data?.quantityAfter || 'updated'}`
        );
      }

      // Test 9: Admin Orders Listing
      const resAdminOrders = await fetch(`${BASE}/admin/orders`, { headers: adminAuthHeaders });
      const adminOrders = await resAdminOrders.json();
      check(
        'Admin Orders Console (/admin/orders)',
        resAdminOrders.status === 200 && Array.isArray(adminOrders.data),
        `Total Orders Tracked: ${adminOrders.data?.length}`
      );

      // Test 10: Admin Order Status Transition
      const firstOrder = adminOrders.data?.[0];
      if (firstOrder) {
        const resStatus = await fetch(`${BASE}/admin/orders/${firstOrder._id || firstOrder.id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...adminAuthHeaders
          },
          body: JSON.stringify({
            status: 'shipped',
            note: 'Dispatched via BlueDart Express Air'
          })
        });
        const statusData = await resStatus.json();
        check(
          `Admin Order Status Transition (${firstOrder.orderNumber} -> 'shipped')`,
          resStatus.status === 200 && statusData.success === true,
          `Status updated`
        );
      }

      // Test 11: Admin Immutable Audit Logs
      const resAudit = await fetch(`${BASE}/admin/audit-logs`, { headers: adminAuthHeaders });
      const auditData = await resAudit.json();
      check(
        'Admin Audit Logs Trail (/admin/audit-logs)',
        resAudit.status === 200 && auditData.data?.length > 0,
        `Audit Events Recorded: ${auditData.data?.length}`
      );

      // ──────────────────────────────────────────────────────────
      // 3. STOREFRONT & SHOPPING JOURNEY TESTS
      // ──────────────────────────────────────────────────────────
      console.log('\n📌 PHASE 3: STOREFRONT CATALOGUE & CHECKOUT JOURNEY');

      // Test 12: Categories
      const resCats = await fetch(`${BASE}/categories`);
      const cats = await resCats.json();
      check('Category listing', resCats.status === 200 && cats.data?.length === 4, `4 Categories`);

      // Test 13: Product Detail by Slug
      const resPdp = await fetch(`${BASE}/products/bamboo-round-neck-tshirt-men`);
      const pdp = await resPdp.json();
      check(
        'Product Detail Page by Slug',
        resPdp.status === 200 && pdp.data?.slug === 'bamboo-round-neck-tshirt-men',
        `Fetched: "${pdp.data?.name}" with ${pdp.data?.variants?.length} variants`
      );

      // Test 14: Checkout Quote
      const quotePayload = {
        items: [
          {
            productId: pdp.data?._id,
            variantId: pdp.data?.variants?.[0]?._id,
            name: pdp.data?.name,
            price: pdp.data?.variants?.[0]?.price || 990,
            quantity: 1
          }
        ],
        couponCode: 'WELCOME10'
      };
      const resQuote = await fetch(`${BASE}/checkout/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quotePayload)
      });
      const quote = await resQuote.json();
      check(
        'Checkout Pricing & Discount Quote',
        resQuote.status === 200 && quote.data?.finalPayableRupees > 0,
        `Payable: ₹${quote.data?.finalPayableRupees} (Discount: ₹${quote.data?.discountRupees})`
      );

      // Test 15: Place Order
      const resOrder = await fetch(`${BASE}/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${custToken}`
        },
        body: JSON.stringify({
          items: quotePayload.items,
          guestEmail: 'customer@bamboohemp.com',
          address: {
            recipientName: 'Priya Sharma',
            addressLine1: '42 Lotus Enclave',
            city: 'Bengaluru',
            state: 'Karnataka',
            postalCode: '560038',
            country: 'India',
            phone: '+91 9123456789'
          },
          paymentMethod: 'Cash on Delivery (COD)'
        })
      });
      const orderData = await resOrder.json();
      check(
        'Customer Order Creation',
        resOrder.status === 201 && !!orderData.data?.orderNumber,
        `Created Order: ${orderData.data?.orderNumber}`
      );

      // Test 16: Customer Order History
      const resHistory = await fetch(`${BASE}/customer/orders`, {
        headers: { Authorization: `Bearer ${custToken}` }
      });
      const history = await resHistory.json();
      check(
        'Customer Order History Retrieval',
        resHistory.status === 200 && history.data?.length > 0,
        `Customer has ${history.data?.length} order(s)`
      );

      // ──────────────────────────────────────────────────────────
      // 4. CART PERSISTENCE, PROFILE & SAVED ADDRESS CRUD
      // ──────────────────────────────────────────────────────────
      console.log('\n📌 PHASE 4: CART SYNC, PROFILE UPDATE & ADDRESS CRUD');

      const custHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${custToken}`
      };

      const resCartSync = await fetch(`${BASE}/cart/sync`, {
        method: 'POST',
        headers: custHeaders,
        body: JSON.stringify({
          items: [{ slug: 'bamboo-round-neck-tshirt-men', size: 'M', color: 'pitch-black', quantity: 1 }]
        })
      });
      const cartSync = await resCartSync.json();
      check(
        'Server Cart Sync (/cart/sync)',
        resCartSync.status === 200 && cartSync.data?.itemCount >= 1,
        `Synced ${cartSync.data?.itemCount} item(s), Subtotal ₹${cartSync.data?.subtotal}`
      );

      await fetch(`${BASE}/cart`, { method: 'DELETE', headers: custHeaders });

      const resProf = await fetch(`${BASE}/auth/profile`, {
        method: 'PUT',
        headers: custHeaders,
        body: JSON.stringify({ fullName: 'Priya Sharma', phone: '+91 9123456789' })
      });
      const profData = await resProf.json();
      check(
        'Customer Profile Update (PUT /auth/profile)',
        resProf.status === 200 && profData.data?.user?.fullName === 'Priya Sharma',
        `Updated: ${profData.data?.user?.fullName}`
      );

      const resAddrPost = await fetch(`${BASE}/customer/addresses`, {
        method: 'POST',
        headers: custHeaders,
        body: JSON.stringify({
          recipientName: 'Priya Work',
          addressLine1: '99 Residency Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560025',
          phone: '9123456789',
          isDefault: false
        })
      });
      const addrPostData = await resAddrPost.json();
      const newAddrId = addrPostData.data?.address?._id;
      const resAddrDel = newAddrId
        ? await fetch(`${BASE}/customer/addresses/${newAddrId}`, { method: 'DELETE', headers: custHeaders })
        : null;
      check(
        'Customer Addresses CRUD (POST + DELETE /customer/addresses)',
        resAddrPost.status === 201 && !!newAddrId && resAddrDel?.status === 200,
        `Created & cleaned up address ${newAddrId}`
      );

      console.log('\n================================================================');
      console.log(`🎯 AUDIT RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
      console.log('================================================================');

      if (failed === 0) {
        console.log('✨ ALL ADMIN PORTAL, LOGIN, CATALOGUE, AND ORDER APIS ARE 100% READY FOR COMPANY HANDOVER.');
      } else {
        process.exitCode = 1;
      }
    } catch (err) {
      console.error('❌ Verification Suite Error:', err);
      process.exitCode = 1;
    } finally {
      server.close();
      process.exit();
    }
  });
}

verifyAll();
