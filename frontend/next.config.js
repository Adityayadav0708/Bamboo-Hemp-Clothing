/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external image domains when real product images are added.
    // Add CDN or Cloudinary domain here when confirmed by company.
    remotePatterns: [
      // Example — remove or replace when real CDN is set up:
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  // Environment variable prefix NEXT_PUBLIC_ makes variables available in browser
  env: {
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "[Brand Name]",
  },
};

module.exports = nextConfig;
