/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de imagem
  images: {
    unoptimized: false,
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },

  // Configurações de output
  output: 'standalone',

  // Configurações do compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configurações experimentais
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Headers para segurança e performance
  async headers() {
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
  },
};

module.exports = nextConfig;

