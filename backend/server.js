require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start Express server
connectDB().finally(() => {
  const server = app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` Bamboo & Hemp Everyday Essentials API running on:`);
    console.log(` http://localhost:${PORT}/api/v1`);
    console.log(` Health check: http://localhost:${PORT}/api/v1/health`);
    console.log(`=======================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Server] Port ${PORT} in use, trying ${Number(PORT) + 1}...`);
      app.listen(Number(PORT) + 1, () => {
        console.log(`[Server] API running on http://localhost:${Number(PORT) + 1}/api/v1`);
      });
    } else {
      console.error('[Server Error]', err);
    }
  });
});
