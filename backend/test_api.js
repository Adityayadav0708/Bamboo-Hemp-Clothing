/**
 * test_api.js
 * Comprehensive automated test suite for Bamboo & Hemp REST API.
 * Runs in-process on an isolated test port (5099) and verifies all required routes.
 */
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

async function runTests() {
  console.log('🧪 Starting Bamboo & Hemp Full API Test Suite...');
  await connectDB();

  const server = app.listen(5099, async () => {
    const BASE = 'http://localhost:5099/api/v1';
    let failed = 0;
    let passed = 0;

    const assert = (condition, message) => {
      if (condition) {
        console.log(`  ✅ [PASS] ${message}`);
        passed++;
      } else {
        console.error(`  ❌ [FAIL] ${message}`);
        failed++;
      }
    };

    try {
      // 1. Health
      console.log('\n--- 1. Health & System ---');
      const resHealth = await fetch(`${BASE}/health`);
      const health = await resHealth.json();
      assert(resHealth.status === 200 && health.success === true, 'GET /api/v1/health returns 200 healthy');

      // 2. Categories
      console.log('\n--- 2. Public Catalogue: Categories ---');
      const resCats = await fetch(`${BASE}/categories`);
      const cats = await resCats.json();
      assert(resCats.status === 200 && cats.data?.length === 4, `GET /api/v1/categories returns 4 categories (got ${cats.data?.length})`);

      const resCatSlug = await fetch(`${BASE}/categories/bamboo-tshirts`);
      const catSlug = await resCatSlug.json();
      assert(resCatSlug.status === 200 && catSlug.data?.slug === 'bamboo-tshirts' && typeof catSlug.data?.productCount === 'number', `GET /api/v1/categories/bamboo-tshirts returns category metadata & productCount (${catSlug.data?.productCount})`);

      // 3. Products & Filters
      console.log('\n--- 3. Public Catalogue: Products & Filtering ---');
      const resProds = await fetch(`${BASE}/products`);
      const prods = await resProds.json();
      assert(resProds.status === 200 && prods.data?.length >= 18, `GET /api/v1/products returns all authentic products (got ${prods.data?.length})`);

      const resFiltered = await fetch(`${BASE}/products?category=bamboo-tshirts&size=M&minPrice=800&maxPrice=1500&sort=price-asc`);
      const filteredProds = await resFiltered.json();
      assert(resFiltered.status === 200 && filteredProds.data?.length > 0, `GET /api/v1/products category+size+price filter returned ${filteredProds.data?.length} item(s)`);

      // 4. Product by Slug & Related
      console.log('\n--- 4. Product Details by Slug ---');
      const testSlug = 'bamboo-round-neck-tshirt-men';
      const resSingle = await fetch(`${BASE}/products/${testSlug}`);
      const single = await resSingle.json();
      assert(resSingle.status === 200 && single.data?.slug === testSlug, `GET /api/v1/products/${testSlug} returns valid PDP data with name: "${single.data?.name}"`);
      assert(single.data?.variants?.length > 0, `Product variants attached (${single.data?.variants?.length} variants)`);

      const resRelated = await fetch(`${BASE}/products/${testSlug}/related?limit=4`);
      const relatedData = await resRelated.json();
      assert(resRelated.status === 200 && relatedData.data?.length > 0 && Array.isArray(relatedData.data[0]?.variants), `GET /api/v1/products/${testSlug}/related returned ${relatedData.data?.length} related item(s) with variants`);

      // 5. Product Search
      console.log('\n--- 5. Search Products ---');
      const resSearch = await fetch(`${BASE}/products/search?q=hemp&sort=rating`);
      const searchData = await resSearch.json();
      assert(resSearch.status === 200 && searchData.data?.length > 0, `GET /api/v1/products/search?q=hemp found ${searchData.data?.length} hemp products`);

      // 6. User Registration
      console.log('\n--- 6. Authentication: Register ---');
      const testEmail = `test_user_${Date.now()}@bamboohemp.com`;
      const resReg = await fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Test Developer',
          email: testEmail,
          password: 'Password@123',
          phone: '+91 9999900000'
        })
      });
      const regData = await resReg.json();
      assert(resReg.status === 201 && regData.data?.token, `POST /api/v1/auth/register created user and issued JWT token`);

      // 7. User Login
      console.log('\n--- 7. Authentication: Login ---');
      const resLogin = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'Password@123'
        })
      });
      const loginData = await resLogin.json();
      const authToken = loginData.data?.token;
      assert(resLogin.status === 200 && !!authToken, `POST /api/v1/auth/login authenticated successfully`);

      // 8. Auth Me (Protected Route)
      console.log('\n--- 8. Authentication: Protected /me ---');
      const resMe = await fetch(`${BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const meData = await resMe.json();
      assert(resMe.status === 200 && meData.data?.user?.email === testEmail, `GET /api/v1/auth/me returns authenticated user details (${meData.data?.user?.email})`);

      // 9. Cart Backend CRUD & Sync
      console.log('\n--- 9. Cart Persistence & Sync ---');
      const authHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      };

      const resAddCart = await fetch(`${BASE}/cart/items`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          slug: 'bamboo-round-neck-tshirt-men',
          size: 'M',
          color: 'pitch-black',
          quantity: 2
        })
      });
      const cartAddData = await resAddCart.json();
      const addedCartItem = cartAddData.data?.items?.[0];
      assert(resAddCart.status === 200 && cartAddData.data?.itemCount === 2 && !!addedCartItem?.variantId, `POST /api/v1/cart/items resolves variant & adds 2 units (itemCount=${cartAddData.data?.itemCount})`);

      const resPatchCart = await fetch(`${BASE}/cart/items/${encodeURIComponent(addedCartItem.variantId)}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ quantity: 3 })
      });
      const cartPatchData = await resPatchCart.json();
      assert(resPatchCart.status === 200 && cartPatchData.data?.itemCount === 3, `PATCH /api/v1/cart/items/:id updated quantity to 3`);

      const resSyncCart = await fetch(`${BASE}/cart/sync`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          items: [{ slug: 'heritage-hemp-boxy-tee', size: 'L', color: 'natural-sand', quantity: 1 }]
        })
      });
      const cartSyncData = await resSyncCart.json();
      assert(resSyncCart.status === 200 && cartSyncData.data?.itemCount === 4, `POST /api/v1/cart/sync merged guest item (total items=${cartSyncData.data?.itemCount})`);

      const resRemoveCart = await fetch(`${BASE}/cart/items/${encodeURIComponent(cartSyncData.data.items[1]?.variantId || addedCartItem.variantId)}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      const cartRemoveData = await resRemoveCart.json();
      assert(resRemoveCart.status === 200 && cartRemoveData.data?.items?.length === 1, `DELETE /api/v1/cart/items/:id removed 1 line item`);

      // 10. Checkout Quote & Place Order
      console.log('\n--- 10. Cart & Checkout Quote ---');
      const quoteItems = [
        {
          productId: single.data?._id,
          variantId: single.data?.variants?.[0]?._id,
          slug: single.data?.slug,
          name: single.data?.name,
          price: single.data?.variants?.[0]?.price || 990,
          quantity: 2
        }
      ];
      const resQuote = await fetch(`${BASE}/checkout/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: quoteItems,
          couponCode: 'WELCOME10',
          deliveryMethod: 'express',
          paymentMethod: 'cod'
        })
      });
      const quoteData = await resQuote.json();
      assert(
        resQuote.status === 200 &&
        quoteData.data?.shippingFeeRupees === 149 &&
        quoteData.data?.codFeeRupees === 49 &&
        quoteData.data?.finalPayableRupees > 0,
        `POST /api/v1/checkout/quote calculated express+COD total: ₹${quoteData.data?.finalPayableRupees}`
      );

      // 11. Place Order & Verify Cart Cleared
      console.log('\n--- 11. Place Order ---');
      const resOrder = await fetch(`${BASE}/checkout/orders`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          items: quoteItems,
          guestEmail: testEmail,
          address: {
            recipientName: 'Test Developer',
            addressLine1: '123 Green Lane',
            city: 'Bengaluru',
            state: 'Karnataka',
            postalCode: '560001',
            country: 'India',
            phone: '9999900000'
          },
          deliveryMethod: 'express',
          paymentMethod: 'cod',
          couponCode: 'WELCOME10'
        })
      });
      const orderResult = await resOrder.json();
      assert(resOrder.status === 201 && !!orderResult.data?.orderNumber, `POST /api/v1/checkout/orders created order: ${orderResult.data?.orderNumber}`);

      const resCartAfterOrder = await fetch(`${BASE}/cart`, { headers: authHeaders });
      const cartAfterOrder = await resCartAfterOrder.json();
      assert(resCartAfterOrder.status === 200 && cartAfterOrder.data?.itemCount === 0, `Cart automatically cleared after live order creation`);

      // 12. Customer Orders History
      console.log('\n--- 12. Customer Orders History ---');
      const resCustOrders = await fetch(`${BASE}/customer/orders`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const custOrders = await resCustOrders.json();
      assert(resCustOrders.status === 200 && custOrders.data?.length > 0, `GET /api/v1/customer/orders retrieved ${custOrders.data?.length} order(s) for customer`);

      // 13. Customer Profile & Saved Addresses CRUD
      console.log('\n--- 13. Customer Profile & Address CRUD ---');
      const resUnauthProfile = await fetch(`${BASE}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: 'Hacker' })
      });
      assert(resUnauthProfile.status === 401, `Unauthenticated PUT /api/v1/auth/profile blocked with 401`);

      const resProfileUpdate = await fetch(`${BASE}/auth/profile`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ fullName: 'Updated Developer', phone: '9876543210' })
      });
      const profileUpdateData = await resProfileUpdate.json();
      assert(
        resProfileUpdate.status === 200 &&
        profileUpdateData.data?.user?.fullName === 'Updated Developer' &&
        profileUpdateData.data?.user?.phone === '9876543210',
        `PUT /api/v1/auth/profile updated name and phone`
      );

      const resAddAddr = await fetch(`${BASE}/customer/addresses`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          recipientName: 'Updated Developer',
          addressLine1: '42 Eco Avenue',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
          phone: '9876543210',
          isDefault: true
        })
      });
      const addAddrData = await resAddAddr.json();
      const createdAddrId = addAddrData.data?.address?._id;
      assert(resAddAddr.status === 201 && !!createdAddrId, `POST /api/v1/customer/addresses saved address (${createdAddrId})`);

      const resEditAddr = await fetch(`${BASE}/customer/addresses/${createdAddrId}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ city: 'Mysuru', postalCode: '570001' })
      });
      const editAddrData = await resEditAddr.json();
      assert(resEditAddr.status === 200 && editAddrData.data?.address?.city === 'Mysuru', `PUT /api/v1/customer/addresses/:id updated city to Mysuru`);

      const resDelAddr = await fetch(`${BASE}/customer/addresses/${createdAddrId}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      const delAddrData = await resDelAddr.json();
      assert(resDelAddr.status === 200 && delAddrData.data?.addresses?.length === 0, `DELETE /api/v1/customer/addresses/:id removed saved address`);

      // 14. Admin Route Security & Metrics
      console.log('\n--- 14. Admin Route Protection & Metrics ---');
      const resUnauthMetrics = await fetch(`${BASE}/admin/metrics`);
      assert(resUnauthMetrics.status === 401, `Unauthenticated GET /api/v1/admin/metrics rejected with 401 (got ${resUnauthMetrics.status})`);

      const resCustMetrics = await fetch(`${BASE}/admin/metrics`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      assert(resCustMetrics.status === 403, `Customer GET /api/v1/admin/metrics rejected with 403 (got ${resCustMetrics.status})`);

      const resAdminLogin = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@bamboohemp.com', password: 'Admin@12345' })
      });
      const adminLoginData = await resAdminLogin.json();
      const adminToken = adminLoginData.data?.token;
      assert(resAdminLogin.status === 200 && !!adminToken, 'Admin login issues valid admin JWT token');

      const resMetrics = await fetch(`${BASE}/admin/metrics`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const metrics = await resMetrics.json();
      assert(resMetrics.status === 200 && metrics.success === true, `Authenticated admin GET /api/v1/admin/metrics returns store analytics`);

      console.log('\n=======================================================');
      console.log(`📊 Test Summary: ${passed} passed, ${failed} failed.`);
      console.log('=======================================================');

      if (failed > 0) {
        process.exitCode = 1;
      }
    } catch (err) {
      console.error('❌ Test execution error:', err);
      process.exitCode = 1;
    } finally {
      server.close();
      process.exit();
    }
  });
}

runTests();
