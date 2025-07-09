'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    performance: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      performance: true,
      analytics: true,
      marketing: true,
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowConsent(false);
    
    // Aplicar otimizações de performance
    applyPerformanceOptimizations();
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowConsent(false);
    
    // Aplicar otimizações baseadas nas preferências
    if (preferences.performance) {
      applyPerformanceOptimizations();
    }
  };

  const handleRejectAll = () => {
    const rejected = {
      necessary: true,
      performance: false,
      analytics: false,
      marketing: false,
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(rejected));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowConsent(false);
  };

  const applyPerformanceOptimizations = () => {
    // Pré-carregar recursos importantes
    const preloadLinks = [
      '/video-hero.mp4',
      '/logo-vedere-50x50.png',
      '/logo-simples.png',
    ];

    preloadLinks.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = src.includes('.mp4') ? 'video' : 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Otimizar carregamento de imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'lazy';
      }
    });
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-[#111]/95 backdrop-blur-sm border-t border-[#333] z-[9999] p-4 md:p-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-start justify-between gap-6">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#747B7A] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0a0a0a]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#747B7A]">
                  Política de Cookies
                </h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego. 
                Ao continuar navegando, você concorda com nossa política de cookies.
              </p>
              
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-[#747B7A] hover:text-[#ededed] transition-colors underline"
                >
                  {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
                </button>
                <a
                  href="/politica-privacidade"
                  className="text-xs text-[#747B7A] hover:text-[#ededed] transition-colors underline"
                >
                  Política de Privacidade
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm text-[#747B7A] hover:text-[#ededed] transition-colors border border-[#333] rounded-lg hover:border-[#444]"
              >
                Rejeitar
              </button>
              <button
                onClick={handleAcceptSelected}
                className="px-4 py-2 text-sm bg-[#333] text-[#ededed] hover:bg-[#444] transition-colors rounded-lg"
              >
                Personalizar
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm bg-[#747B7A] text-[#0a0a0a] hover:bg-[#5A605F] transition-colors rounded-lg font-medium"
              >
                Aceitar Todos
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-6 h-6 bg-[#747B7A] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#0a0a0a]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z"/>
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-[#747B7A]">
                  Política de Cookies
                </h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed px-2">
                Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-[#747B7A] hover:text-[#ededed] transition-colors underline"
              >
                {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
              </button>
              
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 mb-4 bg-[#181818] p-4 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-4 h-4 text-[#747B7A] bg-[#222] border-[#333] rounded"
                    />
                    <div className="text-left">
                      <p className="text-xs font-medium text-[#747B7A]">Necessários</p>
                      <p className="text-xs text-gray-400">Essenciais para o funcionamento</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={preferences.performance}
                      onChange={(e) => updatePreference('performance', e.target.checked)}
                      className="w-4 h-4 text-[#747B7A] bg-[#222] border-[#333] rounded"
                    />
                    <div className="text-left">
                      <p className="text-xs font-medium text-[#747B7A]">Performance</p>
                      <p className="text-xs text-gray-400">Melhoram a velocidade</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="w-4 h-4 text-[#747B7A] bg-[#222] border-[#333] rounded"
                    />
                    <div className="text-left">
                      <p className="text-xs font-medium text-[#747B7A]">Analytics</p>
                      <p className="text-xs text-gray-400">Ajudam a entender o uso</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference('marketing', e.target.checked)}
                      className="w-4 h-4 text-[#747B7A] bg-[#222] border-[#333] rounded"
                    />
                    <div className="text-left">
                      <p className="text-xs font-medium text-[#747B7A]">Marketing</p>
                      <p className="text-xs text-gray-400">Personalizam conteúdo</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleRejectAll}
                  className="w-full px-4 py-3 text-sm text-[#747B7A] hover:text-[#ededed] transition-colors border border-[#333] rounded-lg hover:border-[#444]"
                >
                  Rejeitar Todos
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="w-full px-4 py-3 text-sm bg-[#333] text-[#ededed] hover:bg-[#444] transition-colors rounded-lg"
                >
                  Aceitar Selecionados
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="w-full px-4 py-3 text-sm bg-[#747B7A] text-[#0a0a0a] hover:bg-[#5A605F] transition-colors rounded-lg font-medium"
                >
                  Aceitar Todos
                </button>
              </div>
              
              <a
                href="/politica-privacidade"
                className="text-xs text-[#747B7A] hover:text-[#ededed] transition-colors underline text-center block mt-2"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 