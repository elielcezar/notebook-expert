/** @type {import('next').NextConfig} */

// Usa a variável de ambiente ou vazio para desenvolvimento
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  //output: 'standalone',
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.notebookexpert.com.br',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Headers para segurança e performance
  /*async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },*/
};

module.exports = nextConfig;

