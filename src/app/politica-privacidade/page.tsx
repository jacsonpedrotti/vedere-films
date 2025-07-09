'use client';

import React from 'react';
import Link from 'next/link';

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      {/* Header */}
      <div className="bg-[#111] border-b border-[#333]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#747B7A] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0a0a0a]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 114 0 2 2 0 01-4 0z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-[#747B7A] group-hover:text-[#ededed] transition-colors">
                Vedere Films
              </span>
            </Link>
            <Link 
              href="/"
              className="px-4 py-2 text-sm text-[#747B7A] hover:text-[#ededed] transition-colors border border-[#333] rounded-lg hover:border-[#444]"
            >
              Voltar ao Site
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#747B7A] mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
            Sua privacidade é importante para nós. Esta política descreve como coletamos, 
            usamos e protegemos suas informações pessoais.
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {/* Informações Coletadas */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Informações que Coletamos
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong className="text-[#747B7A]">Informações de Contato:</strong> Nome, email, telefone quando você nos contata através do WhatsApp ou formulários.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong className="text-[#747B7A]">Dados de Navegação:</strong> Endereço IP, tipo de dispositivo, páginas visitadas e tempo de permanência.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong className="text-[#747B7A]">Cookies:</strong> Arquivos pequenos que melhoram sua experiência e nos ajudam a entender como você usa nosso site.
                </p>
              </div>
            </div>
          </section>

          {/* Como Usamos */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Como Usamos suas Informações
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong className="text-[#747B7A]">Atendimento ao Cliente:</strong> Responder suas dúvidas e fornecer informações sobre nossos serviços.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong className="text-[#747B7A]">Melhorias do Site:</strong> Analisar dados para otimizar a experiência e funcionalidades.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong className="text-[#747B7A]">Marketing:</strong> Enviar informações sobre novos serviços e promoções (apenas com seu consentimento).
                </p>
              </div>
            </div>
          </section>

          {/* Compartilhamento */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Compartilhamento de Informações
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <p>
                <strong className="text-[#747B7A]">Não vendemos suas informações pessoais.</strong> Podemos compartilhar dados apenas com:
              </p>
              <div className="space-y-3 ml-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Prestadores de serviços que nos ajudam a operar o site (hosting, analytics)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Autoridades quando exigido por lei</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p>WhatsApp para comunicação direta (quando você inicia o contato)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Segurança */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Segurança dos Dados
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
              </p>
              <div className="space-y-3 ml-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Criptografia SSL para transmissão segura de dados</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Controle de acesso restrito às informações pessoais</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Monitoramento regular de segurança</p>
                </div>
              </div>
            </div>
          </section>

          {/* Seus Direitos */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Seus Direitos
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <p>Você tem o direito de:</p>
              <div className="space-y-3 ml-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-[#747B7A]">Acessar:</strong> Solicitar uma cópia dos dados que temos sobre você</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-[#747B7A]">Corrigir:</strong> Atualizar informações incorretas ou incompletas</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-[#747B7A]">Excluir:</strong> Solicitar a remoção de seus dados pessoais</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-[#747B7A]">Retirar Consentimento:</strong> Cancelar autorizações para marketing</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Política de Cookies
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <p>Utilizamos diferentes tipos de cookies:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#747B7A] font-medium mb-2">Cookies Necessários</h3>
                  <p className="text-gray-400 text-sm">Essenciais para o funcionamento do site. Não podem ser desativados.</p>
                </div>
                <div>
                  <h3 className="text-[#747B7A] font-medium mb-2">Cookies de Performance</h3>
                  <p className="text-gray-400 text-sm">Melhoram a velocidade e funcionalidade do site.</p>
                </div>
                <div>
                  <h3 className="text-[#747B7A] font-medium mb-2">Cookies de Analytics</h3>
                  <p className="text-gray-400 text-sm">Nos ajudam a entender como você usa o site para melhorá-lo.</p>
                </div>
                <div>
                  <h3 className="text-[#747B7A] font-medium mb-2">Cookies de Marketing</h3>
                  <p className="text-gray-400 text-sm">Personalizam conteúdo e anúncios baseados em seus interesses.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contato */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Entre em Contato
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              </p>
              <div className="space-y-3 ml-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-[#747B7A]">WhatsApp:</strong> (11) 99999-9999</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-[#747B7A]">Email:</strong> contato@vederefilms.com.br</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#747B7A] rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong className="text-[#747B7A]">Endereço:</strong> São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </section>

          {/* Atualizações */}
          <section className="bg-[#111] p-6 md:p-8 rounded-lg border border-[#333]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-4">
              Atualizações da Política
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-300">
              <p>
                Esta política pode ser atualizada periodicamente. Recomendamos revisar regularmente. 
                Mudanças significativas serão comunicadas através do site ou contato direto.
              </p>
              <p className="text-xs text-gray-400">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-[#333]">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#747B7A] text-[#0a0a0a] hover:bg-[#5A605F] transition-colors rounded-lg font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Site
          </Link>
        </div>
      </div>
    </div>
  );
} 