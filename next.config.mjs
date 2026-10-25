/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  typedRoutes: true,
  experimental: {
    // Form uploads (images, CV PDF) go through Server Actions; the default limit is 1 MB.
    // Vercel itself caps request bodies at about 4.5 MB, so lib/uploads.ts limits every upload to 4 MB.
    serverActions: { bodySizeLimit: '5mb' },
    // The proxy that guards /admin buffers request bodies too.
    proxyClientMaxBodySize: '5mb',
  },
  async redirects() {
    return [{ source: '/projects', destination: '/research', permanent: true }];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
