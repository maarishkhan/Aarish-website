/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  typedRoutes: true,
  async redirects() {
    return [{ source: '/projects', destination: '/research', permanent: true }];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
