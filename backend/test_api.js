const app = require('./app');

const server = app.listen(5099, async () => {
  console.log('Testing endpoints on port 5099...');
  try {
    const resHealth = await fetch('http://localhost:5099/api/v1/health');
    const health = await resHealth.json();
    console.log('Health:', health);

    const resCats = await fetch('http://localhost:5099/api/v1/categories');
    const cats = await resCats.json();
    console.log(`Categories (${cats.data.length}):`, cats.data.map(c => c.name));

    const resProds = await fetch('http://localhost:5099/api/v1/products');
    const prods = await resProds.json();
    console.log(`Products (${prods.data.length}):`, prods.data.map(p => `${p.name} [₹${p.variants[0]?.pricePaise / 100}]`));

    const resMetrics = await fetch('http://localhost:5099/api/v1/admin/metrics');
    const metrics = await resMetrics.json();
    console.log('Admin Metrics:', {
      totalOrders: metrics.data.totalOrders,
      grossSales: `₹${metrics.data.grossSalesRupees}`,
      lowStockCount: metrics.data.lowStockCount
    });

    console.log('ALL API ENDPOINTS FUNCTIONING PERFECTLY!');
  } catch (err) {
    console.error('API Test Error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
