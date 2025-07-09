import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Carregar preferências salvas
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
      } catch (error) {
        console.error('Erro ao carregar preferências de cookies:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = (preferences: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setConsent(preferences);
    
    // Aplicar otimizações baseadas nas preferências
    if (preferences.performance) {
      applyPerformanceOptimizations();
    }
  };

  const applyPerformanceOptimizations = () => {
    // Pré-carregar recursos críticos
    const criticalResources = [
      { src: '/video-hero.mp4', as: 'video' },
      { src: '/logo-vedere-50x50.png', as: 'image' },
      { src: '/logo-simples.png', as: 'image' },
      { src: '/gift-whats.gif', as: 'image' },
    ];

    criticalResources.forEach(({ src, as }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = as;
      link.href = src;
      document.head.appendChild(link);
    });

    // Otimizar carregamento de imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'lazy';
        img.decoding = 'async';
      }
    });

    // Pré-carregar próximas páginas
    const preloadPages = [
      '/servicos/film-ceramica',
      '/servicos/film-carbono',
      '/servicos/clear-plex',
    ];

    preloadPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  };

  const canUseAnalytics = () => {
    return consent?.analytics === true;
  };

  const canUseMarketing = () => {
    return consent?.marketing === true;
  };

  const canUsePerformance = () => {
    return consent?.performance === true;
  };

  return {
    consent,
    isLoaded,
    saveConsent,
    canUseAnalytics,
    canUseMarketing,
    canUsePerformance,
    applyPerformanceOptimizations,
  };
} 