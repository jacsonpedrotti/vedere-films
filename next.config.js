/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para exportação estática
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Necessário para exportação estática
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'vederefilms.com.br',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Configurações do Webpack para resolver problemas de cache
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Desabilitar cache em desenvolvimento para evitar conflitos
      config.cache = false;
      
      // Configurar cache em memória para ser mais estável
      config.cache = {
        type: 'memory',
        maxGenerations: 1,
      };
      
      // Otimizar para desenvolvimento
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
      
      // Configurar watchOptions para ser menos agressivo
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.next'],
      };
    }
    
    // Configurações gerais para melhor performance
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  
  // Configurações de desenvolvimento
  experimental: {
    // Melhorar estabilidade do hot reload
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Configurações de performance
  swcMinify: true,
  compress: true,
  
  // Configurações de desenvolvimento
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

module.exports = nextConfig; 