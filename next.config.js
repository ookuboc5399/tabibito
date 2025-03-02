/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "pjvklqgqysqomnafqknf.supabase.co"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
