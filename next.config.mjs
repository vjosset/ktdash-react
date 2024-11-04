/** @type {import('next').NextConfig} */
const nextConfig = {
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
