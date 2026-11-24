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

      // 3. Products
      console.log('\n--- 3. Public Catalogue: Products ---');
      const resProds = await fetch(`${BASE}/products`);
      const prods = await resProds.json();
      assert(resProds.status === 200 && prods.data?.length >= 18, `GET /api/v1/products returns all authentic products (got ${prods.data?.length})`);

      // 4. Product by Slug
      console.log('\n--- 4. Product Details by Slug ---');
      const testSlug = 'bamboo-round-neck-tshirt-men';
      const resSingle = await fetch(`${BASE}/products/${testSlug}`);
      const single = await resSingle.json();
      assert(resSingle.status === 200 && single.data?.slug === testSlug, `GET /api/v1/products/${testSlug} returns valid PDP data with name: "${single.data?.name}"`);
      assert(single.data?.variants?.length > 0, `Product variants attached (${single.data?.variants?.length} variants)`);

      // 5. Product Search
      console.log('\n--- 5. Search Products ---');
      const resSearch = await fetch(`${BASE}/products/search?q=hemp`);
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

      // 9. Checkout Quote
      console.log('\n--- 9. Cart & Checkout Quote ---');
      const quoteItems = [
        {
          productId: single.data?._id,
          variantId: single.data?.variants?.[0]?._id,
          name: single.data?.name,
          price: single.data?.variants?.[0]?.price || 990,
          quantity: 2
        }
      ];
      const resQuote = await fetch(`${BASE}/checkout/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: quoteItems, couponCode: 'WELCOME10' })
      });
      const quoteData = await resQuote.json();
      assert(resQuote.status === 200 && quoteData.data?.finalPayableRupees > 0, `POST /api/v1/checkout/quote calculated total: ₹${quoteData.data?.finalPayableRupees}`);

      // 10. Place Order
      console.log('\n--- 10. Place Order ---');
      const resOrder = await fetch(`${BASE}/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
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
            phone: '+91 9999900000'
          },
          paymentMethod: 'Cash on Delivery (COD)'
        })
      });
      const orderResult = await resOrder.json();
      assert(resOrder.status === 201 && !!orderResult.data?.orderNumber, `POST /api/v1/checkout/orders created order: ${orderResult.data?.orderNumber}`);

      // 11. Customer Orders
      console.log('\n--- 11. Customer Orders History ---');
      const resCustOrders = await fetch(`${BASE}/customer/orders`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const custOrders = await resCustOrders.json();
      assert(resCustOrders.status === 200 && custOrders.data?.length > 0, `GET /api/v1/customer/orders retrieved ${custOrders.data?.length} order(s) for customer`);

      // 12. Admin Metrics
      console.log('\n--- 12. Admin Metrics ---');
      const resMetrics = await fetch(`${BASE}/admin/metrics`);
      const metrics = await resMetrics.json();
      assert(resMetrics.status === 200 && metrics.success === true, `GET /api/v1/admin/metrics returns store analytics`);

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
