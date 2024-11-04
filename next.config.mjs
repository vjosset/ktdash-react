/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Optionally disable lint during build
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ktdash.app'
      },
    ],
  }
};

export default nextConfig;
