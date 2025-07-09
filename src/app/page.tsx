'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import { Typewriter } from 'react-simple-typewriter';

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const services = [
  {
    title: "Film Nanocerâmica HD",
    description: "Proteção máxima e conforto superior. Com tecnologia de ponta, bloqueia até 99% dos raios UV e 80% do calor infravermelho, sem interferir na visibilidade ou nos sinais eletrônicos.",
    image: "/nanoceramica-hd/foto-nano-ceramica-hd.webp"
  },
  {
    title: "Film Nanocerâmica PRO",
    description: "Desempenho e tecnologia de ponta para máxima proteção solar, conforto térmico e valorização do seu veículo. Bloqueia até 99% dos raios UV e mais de 90% do calor, sem interferir em sensores ou visibilidade.",
    image: "/nanoceramica-pro/foto-nano-ceramica-pro.webp"
  },
  {
    title: "Clear Plex",
    description: "Blindagem invisível para o parabrisa. Protege contra impactos e arranhões, preservando sua visão e evitando substituições caras. Tecnologia desenvolvida para carros premium.",
    image: "/clearplex/foto-clear-plex.webp"
  },
  {
    title: "Películas Residenciais",
    description: "Conforto, privacidade e estilo para sua casa. Disponíveis em versões decorativas, jateadas ou fumê, transformam qualquer ambiente em um espaço mais funcional e agradável.",
    image: "/residencial/foto-residencial.webp"
  },
  {
    title: "PPF – Proteção de Pintura Premium",
    description: "Proteja e transforme. Com o Paint Protection Film, preservamos a pintura original do seu veículo contra riscos, manchas e detritos. Além disso, oferecemos a opção de mudança de tom para dar um toque único ao seu carro, sem comprometer o brilho e a sofisticação.",
    image: "/ppf/foto-ppf.webp"
  },
  {
    title: "Envelopamento",
    description: "Proteção e personalização completa para seu veículo. O envelopamento automotivo oferece proteção contra riscos, arranhões e intempéries, além de permitir personalização total da aparência do carro com materiais de alta qualidade.",
    image: "/envelopamento/foto-envelopamento.webp"
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [playingVideos, setPlayingVideos] = React.useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sobreVideoRef = React.useRef<HTMLVideoElement>(null);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Exemplo seguro para detectar iOS
  const isIOS = (() => {
    if (typeof navigator === "undefined" || !navigator.userAgent) return false;
    const iOSDevices = ["iPad", "iPhone", "iPod"];
    return iOSDevices.some(device => navigator.userAgent.includes(device));
  })();

  // Otimizações específicas para iOS
  const iOSOptimizations = () => {
    // Forçar viewport para iOS
    if (typeof document !== "undefined") {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        document.head.appendChild(meta);
      }
    }

    // Otimizar vídeos para iOS
    if (videoRef.current && isIOS) {
      videoRef.current.setAttribute('playsinline', 'true');
      videoRef.current.setAttribute('webkit-playsinline', 'true');
      videoRef.current.setAttribute('muted', 'true');
    }
    if (sobreVideoRef.current && isIOS) {
      sobreVideoRef.current.setAttribute('playsinline', 'true');
      sobreVideoRef.current.setAttribute('webkit-playsinline', 'true');
      sobreVideoRef.current.setAttribute('muted', 'true');
    }
  };

  // Aplicar otimizações no mount
  React.useEffect(() => {
    iOSOptimizations();
  }, []);

  // Efeito para montagem do componente
  React.useEffect(() => {
    setIsMounted(true);
    // Reset do estado de carregamento na montagem
    setImageLoading(true);
  }, []);

  // Efeito para lidar com o atributo cz-shortcut-listen
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const removeAttribute = () => {
      if (document.body.hasAttribute('cz-shortcut-listen')) {
        document.body.removeAttribute('cz-shortcut-listen');
      }
    };

    // Remove o atributo após a montagem
    if (isMounted) {
      removeAttribute();
    }

    // Configura o observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'cz-shortcut-listen') {
          removeAttribute();
        }
      });
    });

    // Observa apenas mudanças de atributos no body
    observer.observe(document.body, { 
      attributes: true,
      attributeFilter: ['cz-shortcut-listen']
    });

    return () => observer.disconnect();
  }, [isMounted]);

  // Efeito para detecção de seções ativas
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Se estiver no topo da página
      if (scrollY < 100) {
        setActiveSection("");
        return;
      }

      // Encontra a seção ativa
      let currentActiveSection = "";
      
      // Verifica cada seção em ordem
      for (const item of navItems) {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          
          // Uma seção está ativa quando seu topo está acima do centro da viewport
          // e ainda está visível na tela
          if (elementTop <= windowHeight * 0.5 && elementBottom > 0) {
            currentActiveSection = sectionId;
          }
        }
      }

      setActiveSection(currentActiveSection);
    };

    // Throttle para melhor performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Executa uma vez no início
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Efeito para o carrossel automático
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentServiceIndex((prevIndex) => {
          if (prevIndex >= services.length - 4) {
            return 0;
          }
          return prevIndex + 1;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Efeito para scroll automático ao hash ao carregar a página
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // pequeno delay para garantir montagem
    }
  }, []);

  // Forçar repaint/reflow para corrigir stacking context do Header
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      window.scrollTo(0, scrollY + 1);
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 10);
    }
  }, []);

  // Forçar autoplay após interação do usuário (especialmente para iOS)
  useEffect(() => {
    const handleUserInteraction = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      if (sobreVideoRef.current) {
        sobreVideoRef.current.play().catch(() => {});
      }
    };

    // Adicionar listeners para interação do usuário
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  // Forçar play do vídeo do hero após montagem
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);



  // Função para controlar reprodução de vídeos
  const handleVideoPlay = (serviceKey: string) => {
    setPlayingVideos(prev => ({
      ...prev,
      [serviceKey]: true
    }));
  };

  const handleVideoPause = (serviceKey: string) => {
    setPlayingVideos(prev => ({
      ...prev,
      [serviceKey]: false
    }));
  };

  // Função para reproduzir vídeo e redirecionar
  const handleVideoPlayAndRedirect = (serviceKey: string, servicePath: string) => {
    handleVideoPlay(serviceKey);
    // Pequeno delay para permitir que o vídeo comece a reproduzir antes do redirecionamento
    setTimeout(() => {
      window.location.href = servicePath;
    }, 300);
  };

  // Função para abrir email com dados do formulário
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    // Construir o link mailto com os dados do formulário
    const subject = encodeURIComponent('Contato - Vedere Films');
    const body = encodeURIComponent(
      `Nome: ${name}\n` +
      `Email: ${email}\n\n` +
      `Mensagem:\n${message}\n\n` +
      `---\n` +
      `Enviado através do site Vedere Films`
    );
    
    const mailtoLink = `mailto:filmsvedere@gmail.com?subject=${subject}&body=${body}`;
    
    // Pequeno delay para mostrar o feedback visual
    setTimeout(() => {
      // Abrir o aplicativo de email padrão
      window.location.href = mailtoLink;
      setIsSubmitting(false);
    }, 500);
  };

  const images = [
    "/carrossel-de-fotos/foto-carrossel1.webp",
    "/carrossel-de-fotos/foto-carrossel2.webp",
    "/carrossel-de-fotos/foto-carrossel3.webp",
    "/carrossel-de-fotos/foto-carrossel4.webp",
    "/carrossel-de-fotos/foto-carrossel5.webp",
    "/carrossel-de-fotos/foto-carrossel6.webp",
    "/carrossel-de-fotos/foto-carrossel7.webp",
    "/carrossel-de-fotos/foto-carrossel8.webp",
    "/carrossel-de-fotos/foto-carrossel9.webp",
    "/carrossel-de-fotos/foto-carrossel10.webp",
    "/carrossel-de-fotos/foto-carrossel11.webp",
    "/carrossel-de-fotos/foto-carrossel12.webp",
    "/carrossel-de-fotos/foto-carrossel13.webp",
    "/carrossel-de-fotos/foto-carrossel14.webp",
    "/carrossel-de-fotos/foto-carrossel15.webp"
  ];

  // Debounce para evitar múltiplos cliques
  const handleImageChange = useCallback((newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setImageLoading(true); // Reset do estado de carregamento
    setCurrentImage(newIndex);
    
    // Reset do estado de transição após a animação
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  // Preload das próximas imagens
  useEffect(() => {
    // Pré-carrega apenas a próxima imagem do carrossel
    const nextIndex = (currentImage + 1) % images.length;
    const img = new window.Image();
    img.src = images[nextIndex];
    // Logs removidos para evitar poluição do console
  }, [currentImage, images]);

  // Navegação otimizada
  const nextImage = useCallback(() => {
    handleImageChange((currentImage + 1) % images.length);
  }, [currentImage, images.length, handleImageChange]);

  const prevImage = useCallback(() => {
    handleImageChange(currentImage === 0 ? images.length - 1 : currentImage - 1);
  }, [currentImage, images.length, handleImageChange]);



  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col overflow-x-hidden">
      <Header />
      {/* Overlay fixo para stacking context */}
      <div className="fixed inset-0 z-[1] pointer-events-none"></div>

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5548996999796"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-0.5 z-[120] w-16 h-16 md:w-20 md:h-20 flex items-center justify-center drop-shadow-xl"
        style={{ animation: 'pulse 1.5s infinite' }}
      >
        <img
          src="/assets/gift-whats.gif"
          alt="WhatsApp"
          className="w-full h-full object-contain"
          draggable="false"
        />
      </a>

      {/* HERO RESTAURADO - PRIMEIRO NA DOM */}
      <section id="inicio" className="relative h-screen flex items-end overflow-hidden scroll-mt-20">
        <video
          ref={videoRef}
          src="/assets/video-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {
                setTimeout(() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                  }
                }, 1000);
              });
            }
          }}
          onError={(e) => {
            console.error('Erro no vídeo do hero:', e);
            const videoElement = e.target as HTMLVideoElement;
            if (videoElement.parentElement) {
              const fallbackImg = document.createElement('img');
              fallbackImg.src = '/logo-simples.png';
              fallbackImg.alt = 'Vedere Films Hero';
              fallbackImg.className = 'absolute inset-0 w-full h-full object-cover';
              videoElement.parentElement.appendChild(fallbackImg);
            }
          }}
          onCanPlay={() => {
            console.log('Vídeo hero carregado com sucesso');
          }}
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          poster="/assets/logo-simples.png"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 w-full flex flex-col items-end justify-end px-4 md:px-16 lg:px-32 pb-10 md:pb-20">
          <div className="max-w-xl w-full text-center md:text-right mb-8 md:mb-12 mx-auto md:mx-0 mt-56 md:mt-72">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6 whitespace-nowrap text-[#747B7A]">
              <Typewriter
                words={["PROTEÇÃO E ESTILO"]}
                typeSpeed={70}
                cursor={false}
              />
            </h1>
            <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 text-[#747B7A]">
              <Typewriter
                words={["Transformamos a experiência de dirigir veículos premium em algo ainda mais exclusivo."]}
                typeSpeed={40}
                delaySpeed={700}
                cursor={false}
              />
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-4 w-full">
              <a
                href="#contato"
                className="bg-transparent border-2 border-[#747B7A] text-[#747B7A] px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold transition-colors hover:border-[#5A605F] hover:text-[#5A605F] text-xs sm:text-sm md:text-base"
              >
                <Typewriter
                  words={["ENTRE EM CONTATO"]}
                  typeSpeed={60}
                  delaySpeed={1200}
                  cursor={false}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE RESTAURADO - SEGUNDO NA DOM */}
      <section id="sobre" className="max-w-7xl mx-auto py-32 px-4 my-20 mt-64 relative z-[10]">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 lg:gap-[120px] items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full md:w-auto"
          >
            <div className="flex flex-col items-center md:items-start">
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                whileHover={{ rotate: 6, scale: 1.07 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-full max-w-[400px] flex justify-center md:justify-start mb-8"
              >
                <Image
                  src="/assets/logo-simples.png"
                  alt="Vedere Films Logo"
                  width={400}
                  height={133}
                  className="object-contain w-full max-w-[280px] md:max-w-[400px] mr-[14px] md:mr-0"
                />
              </motion.div>
              <div className="space-y-6 text-center md:text-left w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-[#747B7A]">Sobre a Vedere Films</h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  A Vedere Films é referência nacional em soluções de proteção, personalização e conforto para veículos e ambientes. Com mais de uma década de atuação, somos reconhecidos pela excelência técnica, atendimento consultivo e uso das tecnologias mais avançadas do mercado de películas automotivas e residenciais.<br/><br/>
                  Atendemos clientes exigentes, apaixonados por veículos premium, arquitetura e design, que buscam diferenciação, inovação e confiança. Na Vedere Films, cada projeto é único: entendemos as necessidades de cada cliente e oferecemos soluções personalizadas, sempre com ética, transparência e compromisso com a excelência.<br/><br/>
                  Seja para proteger, valorizar ou inovar, conte com a Vedere Films para elevar o padrão do seu carro, residência ou empresa. Descubra o verdadeiro significado de proteção inteligente, sofisticação e atendimento premium.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-[#181818] p-6 rounded-lg"
                  >
                    <h3 className="text-2xl font-bold text-[#747B7A] mb-2">10+</h3>
                    <p className="text-gray-300">Anos de Experiência</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-[#181818] p-6 rounded-lg"
                  >
                    <h3 className="text-2xl font-bold text-[#747B7A] mb-2">5000+</h3>
                    <p className="text-gray-300">Clientes Satisfeitos</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[1050px] md:h-[900px] rounded-lg overflow-hidden"
          >
            <video
              ref={sobreVideoRef}
              src="/assets/video-intro-sobre.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              poster="/assets/logo-simples.png"
              onLoadedData={() => {
                if (sobreVideoRef.current) {
                  sobreVideoRef.current.play().catch(() => {});
                }
              }}
              onError={(e) => {
                console.error('Erro no vídeo sobre:', e);
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Por que escolher */}
      <section className="bg-[#111] py-20">
        <div className="max-w-[1800px] mx-auto px-4 md:px-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-[#747B7A] text-center"
          >
            Por que escolher a Vedere Films?
          </motion.h2>
          <div className="flex flex-row xl:flex-nowrap flex-wrap justify-between items-stretch gap-8 max-[770px]:flex-col max-[770px]:items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "#222"
              }}
              className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer w-64 md:w-72 lg:w-80 mb-4 mx-[2.5px]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-6"
              >
                <svg width="64" height="64" viewBox="0 0 256 256" className="mx-auto">
                  <defs>
                    <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#747B7A' }} />
                      <stop offset="100%" style={{ stopColor: '#5A605F' }} />
                    </linearGradient>
                  </defs>
                  <path fill="url(#carGradient)" d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8A8,8,0,0,0,240,112ZM69.2,56H186.8l24.89,56H44.31ZM64,208H40V192H64Zm160,0H192V192h32Zm0-32H32V128H224Z"/>
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-[#747B7A]">Especialistas em Veículos Premium</h3>
              <p className="text-gray-300 text-lg xl:text-base 2xl:text-lg max-[1600px]:text-base max-[1200px]:text-sm max-[700px]:text-xs">
                Conhecemos as necessidades dos carros mais exclusivos do mercado.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "#222"
              }}
              className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer w-64 md:w-72 lg:w-80 mb-4 mx-[2.5px]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-6"
              >
                <svg width="64" height="64" viewBox="0 0 24 24" className="mx-auto">
                  <circle cx="12" cy="12" r="10" fill="#747B7A" />
                  <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#0a0a0a" fontWeight="bold">R$</text>
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-[#747B7A]">Preço Justo</h3>
              <p className="text-gray-300 text-lg xl:text-base 2xl:text-lg max-[1600px]:text-base max-[1200px]:text-sm max-[700px]:text-xs">
                Profissionalismo e qualidade sem valores abusivos. Aqui, você paga um preço justo pelo melhor serviço.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "#222"
              }}
              className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer w-64 md:w-72 lg:w-80 mb-4 mx-[2.5px]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-6"
              >
                <svg width="64" height="64" viewBox="0 0 256 256" className="mx-auto">
                  <defs>
                    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#747B7A' }} />
                      <stop offset="100%" style={{ stopColor: '#5A605F' }} />
                    </linearGradient>
                  </defs>
                  <path fill="url(#shieldGradient)" d="M208,40H48A16,16,0,0,0,32,56V114.8c0,53.4,29.2,102.7,76.2,127.6a16,16,0,0,0,15.6,0C170.8,217.5,200,168.2,200,114.8V56A16,16,0,0,0,208,40Zm0,74.8c0,44.3-24.1,85.6-63.9,107.8-39.8-22.2-63.9-63.5-63.9-107.8V56H208Z"/>
                  <path fill="url(#shieldGradient)" d="M157.66,98.34a8,8,0,0,0-11.32,0L112,132.69,85.66,106.34a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,157.66,98.34Z"/>
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-[#747B7A]">Materiais de Alto Padrão</h3>
              <p className="text-gray-300 text-lg xl:text-base 2xl:text-lg max-[1600px]:text-base max-[1200px]:text-sm max-[700px]:text-xs">
                Trabalhamos com tecnologias que garantem durabilidade, desempenho e estética impecável.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "#222"
              }}
              className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer w-64 md:w-72 lg:w-80 mb-4 mx-[2.5px]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-6"
              >
                <svg width="64" height="64" viewBox="0 0 256 256" className="mx-auto">
                  <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#747B7A' }} />
                      <stop offset="100%" style={{ stopColor: '#5A605F' }} />
                    </linearGradient>
                  </defs>
                  <path fill="url(#starGradient)" d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.6L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7.9,17.6,18,18,0,0,0,20.8,0l45.7-29.7,50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,16.5-16,16.6,16.6,0,0,0-5.2-11.8l-39.4-33.8,45.5-38.4A16.8,16.8,0,0,0,239.2,97.4Z"/>
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-[#747B7A]">Excelência em Detalhes</h3>
              <p className="text-gray-300 text-lg xl:text-base 2xl:text-lg max-[1600px]:text-base max-[1200px]:text-sm max-[700px]:text-xs">
                Cada aplicação é feita por profissionais experientes, com atenção máxima aos acabamentos.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "#222"
              }}
              className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer w-64 md:w-72 lg:w-80 mb-4 mx-[2.5px]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-6"
              >
                <svg width="64" height="64" viewBox="0 0 256 256" className="mx-auto">
                  <defs>
                    <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#747B7A' }} />
                      <stop offset="100%" style={{ stopColor: '#5A605F' }} />
                    </linearGradient>
                  </defs>
                  <path fill="url(#clockGradient)" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h40A8,8,0,0,1,176,128Z"/>
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-[#747B7A]">Agilidade e Pontualidade</h3>
              <p className="text-gray-300 text-lg xl:text-base 2xl:text-lg max-[1600px]:text-base max-[1200px]:text-sm max-[700px]:text-xs">
                Respeitamos o seu tempo com prazos otimizados e entregas dentro do cronograma estabelecido.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="max-w-[1920px] mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-12 text-[#747B7A] text-center">Nossos Serviços</h2>
        
        {/* Layout para telas grandes (carrossel) */}
        <div className="hidden xl:block relative overflow-hidden"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex"
            animate={{ x: `${-currentServiceIndex * 25}%` }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 30,
              duration: 0.8
            }}
          >
            {/* Novo array de serviços com links e vídeos de capa */}
            {/* Film Nanocerâmica HD */}
            <a href="/servicos/film-ceramica" className="bg-[#181818] rounded-lg p-10 shadow-lg hover:shadow-xl transition-shadow" style={{ minWidth: '25%', padding: '0 1.5rem', display: 'block' }}>
              <div className="relative h-72 mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/nanoceramica-hd/foto-nano-ceramica-hd.webp"
                  alt="Film Nanocerâmica HD"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#747B7A]">Film Nanocerâmica HD</h3>
              <p className="text-gray-300 text-lg">
                Proteção máxima e conforto superior. Com tecnologia de ponta, bloqueia até 99% dos raios UV e 80% do calor infravermelho, sem interferir na visibilidade ou nos sinais eletrônicos.
              </p>
            </a>
            {/* Film Nanocerâmica PRO */}
            <a href="/servicos/film-ceramica-pro" className="bg-[#181818] rounded-lg p-10 shadow-lg hover:shadow-xl transition-shadow" style={{ minWidth: '25%', padding: '0 1.5rem', display: 'block' }}>
              <div className="relative h-72 mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/nanoceramica-pro/foto-nano-ceramica-pro.webp"
                  alt="Film Nanocerâmica PRO"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#747B7A]">Film Nanocerâmica PRO</h3>
              <p className="text-gray-300 text-lg">
                Desempenho e tecnologia de ponta para máxima proteção solar, conforto térmico e valorização do seu veículo. Bloqueia até 99% dos raios UV e mais de 90% do calor, sem interferir em sensores ou visibilidade.
              </p>
            </a>
            {/* Clear Plex */}
            <a href="/servicos/clear-plex" className="bg-[#181818] rounded-lg p-10 shadow-lg hover:shadow-xl transition-shadow" style={{ minWidth: '25%', padding: '0 1.5rem', display: 'block' }}>
              <div className="relative h-72 mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/clearplex/foto-clear-plex.webp"
                  alt="Clear Plex"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#747B7A]">Clear Plex</h3>
              <p className="text-gray-300 text-lg">
                Blindagem invisível para o parabrisa. Protege contra impactos e arranhões, preservando sua visão e evitando substituições caras. Tecnologia desenvolvida para carros premium.
              </p>
            </a>
            {/* Películas Residenciais */}
            <a href="/servicos/peliculas-residenciais" className="bg-[#181818] rounded-lg p-10 shadow-lg hover:shadow-xl transition-shadow" style={{ minWidth: '25%', padding: '0 1.5rem', display: 'block' }}>
              <div className="relative h-72 mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/residencial/foto-residencial.webp"
                  alt="Películas Residenciais"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#747B7A]">Películas Residenciais</h3>
              <p className="text-gray-300 text-lg">
                Conforto, privacidade e estilo para sua casa. Disponíveis em versões decorativas, jateadas ou fumê, transformam qualquer ambiente em um espaço mais funcional e agradável.
              </p>
            </a>
            {/* PPF – Proteção de Pintura Premium */}
            <a href="/servicos/ppf" className="bg-[#181818] rounded-lg p-10 shadow-lg hover:shadow-xl transition-shadow" style={{ minWidth: '25%', padding: '0 1.5rem', display: 'block' }}>
              <div className="relative h-72 mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/ppf/foto-ppf.webp"
                  alt="PPF – Proteção de Pintura Premium"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#747B7A]">PPF – Proteção de Pintura Premium</h3>
              <p className="text-gray-300 text-lg">
                Proteja e transforme. Com o Paint Protection Film, preservamos a pintura original do seu veículo contra riscos, manchas e detritos. Além disso, oferecemos a opção de mudança de tom para dar um toque único ao seu carro, sem comprometer o brilho e a sofisticação.
              </p>
            </a>
            {/* Envelopamento */}
            <a href="/servicos/envelopamento" className="bg-[#181818] rounded-lg p-10 shadow-lg hover:shadow-xl transition-shadow" style={{ minWidth: '25%', padding: '0 1.5rem', display: 'block' }}>
              <div className="relative h-72 mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/envelopamento/foto-envelopamento.webp"
                  alt="Envelopamento"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#747B7A]">Envelopamento</h3>
              <p className="text-gray-300 text-lg">
                Proteção e personalização completa para seu veículo. O envelopamento automotivo oferece proteção contra riscos, arranhões e intempéries, além de permitir personalização total da aparência do carro com materiais de alta qualidade.
              </p>
            </a>
          </motion.div>
          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: services.length - 3 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentServiceIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentServiceIndex === index ? 'bg-[#747B7A] w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Layout para telas menores (grid) */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="/servicos/film-ceramica" className="block group">
            <div className="bg-[#181818] rounded-lg p-6 md:p-8 shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/nanoceramica-hd/foto-nano-ceramica-hd.webp"
                  alt="Film Nanocerâmica HD"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#747B7A]">Film Nanocerâmica HD</h3>
              <p className="text-gray-300 text-base md:text-lg">
                Proteção máxima e conforto superior. Com tecnologia de ponta, bloqueia até 99% dos raios UV e 80% do calor infravermelho, sem interferir na visibilidade ou nos sinais eletrônicos.
              </p>
            </div>
          </a>
          <a href="/servicos/film-ceramica-pro" className="block group">
            <div className="bg-[#181818] rounded-lg p-6 md:p-8 shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/nanoceramica-pro/foto-nano-ceramica-pro.webp"
                  alt="Film Nanocerâmica PRO"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#747B7A]">Film Nanocerâmica PRO</h3>
              <p className="text-gray-300 text-base md:text-lg">
                Desempenho e tecnologia de ponta para máxima proteção solar, conforto térmico e valorização do seu veículo. Bloqueia até 99% dos raios UV e mais de 90% do calor, sem interferir em sensores ou visibilidade.
              </p>
            </div>
          </a>
          <a href="/servicos/clear-plex" className="block group">
            <div className="bg-[#181818] rounded-lg p-6 md:p-8 shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/clearplex/foto-clear-plex.webp"
                  alt="Clear Plex"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#747B7A]">Clear Plex</h3>
              <p className="text-gray-300 text-base md:text-lg">
                Blindagem invisível para o parabrisa. Protege contra impactos e arranhões, preservando sua visão e evitando substituições caras. Tecnologia desenvolvida para carros premium.
              </p>
            </div>
          </a>
          <a href="/servicos/peliculas-residenciais" className="block group">
            <div className="bg-[#181818] rounded-lg p-6 md:p-8 shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/residencial/foto-residencial.webp"
                  alt="Películas Residenciais"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#747B7A]">Películas Residenciais</h3>
              <p className="text-gray-300 text-base md:text-lg">
                Conforto, privacidade e estilo para sua casa. Disponíveis em versões decorativas, jateadas ou fumê, transformam qualquer ambiente em um espaço mais funcional e agradável.
              </p>
            </div>
          </a>
          <a href="/servicos/ppf" className="block group">
            <div className="bg-[#181818] rounded-lg p-6 md:p-8 shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/ppf/foto-ppf.webp"
                  alt="PPF – Proteção de Pintura Premium"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#747B7A]">PPF – Proteção de Pintura Premium</h3>
              <p className="text-gray-300 text-base md:text-lg">
                Proteja e transforme. Com o Paint Protection Film, preservamos a pintura original do seu veículo contra riscos, manchas e detritos. Além disso, oferecemos a opção de mudança de tom para dar um toque único ao seu carro, sem comprometer o brilho e a sofisticação.
              </p>
            </div>
          </a>
          <a href="/servicos/envelopamento" className="block group">
            <div className="bg-[#181818] rounded-lg p-6 md:p-8 shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/envelopamento/foto-envelopamento.webp"
                  alt="Envelopamento"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#747B7A]">Envelopamento</h3>
              <p className="text-gray-300 text-base md:text-lg">
                Proteção e personalização completa para seu veículo. O envelopamento automotivo oferece proteção contra riscos, arranhões e intempéries, além de permitir personalização total da aparência do carro com materiais de alta qualidade.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="w-[90vw] max-w-[1800px] mx-auto py-20 px-4 relative z-[10]">
        <h2 className="text-3xl font-bold mb-12 text-[#747B7A] text-center">Galeria de Trabalhos</h2>
        <div className="relative">
          <motion.div 
            className="relative h-[600px] md:h-[1000px] rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {imageLoading && (
              <div className="absolute inset-0 bg-[#181818] flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#747B7A] mx-auto mb-4"></div>
                  <p className="text-[#747B7A]">Carregando galeria...</p>
                </div>
              </div>
            )}
            <Image
              src={images[currentImage]}
              alt="Trabalho Vedere Films"
              fill
              className="object-cover"
              priority={currentImage === 0}
              sizes="(max-width: 768px) 90vw, 1800px"
              style={{ 
                willChange: 'transform',
                transform: 'translateZ(0)' // Força aceleração de hardware
              }}
              onLoad={() => {
                console.log('Imagem carregada com sucesso:', images[currentImage]);
                setImageLoading(false);
              }}
              onError={(e) => {
                console.error('Erro ao carregar imagem:', images[currentImage]);
                setImageLoading(false);
                // Fallback para primeira imagem se houver erro
                if (currentImage !== 0) {
                  setCurrentImage(0);
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
          </motion.div>

          {/* Navegação */}
          <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 md:gap-4 px-4 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ease-in-out ${
                  currentImage === index ? 'bg-[#747B7A] w-6 md:w-8' : 'bg-white/50 hover:bg-white/80'
                } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevImage}
            disabled={isTransitioning}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-[#181818]/80 p-2 md:p-3 rounded-full hover:bg-[#181818] transition-colors ${
              isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#747B7A] md:w-6 md:h-6">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={nextImage}
            disabled={isTransitioning}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-[#181818]/80 p-2 md:p-3 rounded-full hover:bg-[#181818] transition-colors ${
              isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#747B7A] md:w-6 md:h-6">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-12 text-[#747B7A] text-center">Perguntas Frequentes</h2>
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#181818] rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-[#222] transition-colors"
            >
              <h3 className="font-semibold text-lg">Qual a durabilidade das películas?</h3>
              <motion.div
                animate={{ rotate: openFaq === 1 ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative"
              >
                <Image
                  src="/assets/logo-simples.png"
                  alt="Logo Vedere Films"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.button>
            <motion.div
              initial={false}
              animate={{ height: openFaq === 1 ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-6 pt-0 mt-2 text-gray-300">
                As películas de qualidade podem durar de 5 a 10 anos, dependendo da exposição ao sol e dos cuidados. 
                Nossas películas são garantidas contra desbotamento e bolhas durante todo o período de garantia.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#181818] rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-[#222] transition-colors"
            >
              <h3 className="font-semibold text-lg">A película automotiva é permitida por lei?</h3>
              <motion.div
                animate={{ rotate: openFaq === 2 ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative"
              >
                <Image
                  src="/assets/logo-simples.png"
                  alt="Logo Vedere Films"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.button>
            <motion.div
              initial={false}
              animate={{ height: openFaq === 2 ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-6 pt-0 mt-2 text-gray-300">
                Sim, desde que respeite os limites de transparência definidos pelo CONTRAN. 
                Para o para-brisa, é permitido até 75% de transparência. Para as laterais dianteiras, 
                até 70%. Para as laterais traseiras e traseira, não há restrição. Sempre orientamos 
                nossos clientes sobre a legislação vigente.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#181818] rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-[#222] transition-colors"
            >
              <h3 className="font-semibold text-lg">Quanto tempo leva para aplicar uma película?</h3>
              <motion.div
                animate={{ rotate: openFaq === 3 ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative"
              >
                <Image
                  src="/assets/logo-simples.png"
                  alt="Logo Vedere Films"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.button>
            <motion.div
              initial={false}
              animate={{ height: openFaq === 3 ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-6 pt-0 mt-2 text-gray-300">
                O tempo de aplicação varia de acordo com o tipo de película e o tamanho do veículo. 
                Em média, uma aplicação completa leva de 4 a 6 horas. Para garantir a melhor qualidade, 
                não apressamos o processo.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#181818] rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-[#222] transition-colors"
            >
              <h3 className="font-semibold text-lg">Quais são os cuidados após a aplicação?</h3>
              <motion.div
                animate={{ rotate: openFaq === 4 ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative"
              >
                <Image
                  src="/assets/logo-simples.png"
                  alt="Logo Vedere Films"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.button>
            <motion.div
              initial={false}
              animate={{ height: openFaq === 4 ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-6 pt-0 mt-2 text-gray-300">
                Após a aplicação, é importante não lavar o carro por 7 dias, não abrir as janelas por 48 horas 
                e evitar exposição direta ao sol por 24 horas. Também recomendamos não usar produtos químicos 
                fortes na limpeza das películas.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#181818] rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-[#222] transition-colors"
            >
              <h3 className="font-semibold text-lg">A película interfere nos sensores do carro?</h3>
              <motion.div
                animate={{ rotate: openFaq === 5 ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative"
              >
                <Image
                  src="/assets/logo-simples.png"
                  alt="Logo Vedere Films"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.button>
            <motion.div
              initial={false}
              animate={{ height: openFaq === 5 ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-6 pt-0 mt-2 text-gray-300">
                Nossas películas são desenvolvidas com tecnologia que não interfere nos sensores do veículo, 
                incluindo GPS, rádio, sensores de estacionamento e sistemas de assistência ao motorista. 
                Utilizamos materiais de alta qualidade que permitem a passagem dos sinais.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-[#181818] rounded-lg overflow-hidden"
          >
            <motion.button
              onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-[#222] transition-colors"
            >
              <h3 className="font-semibold text-lg">Qual a diferença entre película comum e cerâmica?</h3>
              <motion.div
                animate={{ rotate: openFaq === 6 ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative"
              >
                <Image
                  src="/assets/logo-simples.png"
                  alt="Logo Vedere Films"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.button>
            <motion.div
              initial={false}
              animate={{ height: openFaq === 6 ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="p-6 pt-0 mt-2 text-gray-300">
                A película cerâmica oferece proteção superior contra raios UV (até 99%) e calor infravermelho (até 80%), 
                além de maior durabilidade e não interferir em sinais eletrônicos. A película comum, embora mais acessível, 
                oferece menos proteção e durabilidade.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="bg-[#111] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#747B7A]">Veja o Nosso Trabalho!</h2>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://instagram.com/vederefilms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative w-16 h-16 mb-4 mx-auto">
                <Image
                  src="assets/icon-instagram.png"
                  alt="Instagram"
                  fill
                  className="object-contain group-hover:opacity-80 transition-opacity"
                />
              </div>
              <span className="text-2xl font-bold text-[#747B7A] group-hover:text-[#5A605F] transition-colors">@vederefilms</span>
            </a>
            <p className="text-gray-300 text-lg">
              Acesse nosso perfil do Instagram e veja nosso trabalho de perto!
            </p>
            <a 
              href="https://instagram.com/vederefilms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-[#747B7A] text-[#0a0a0a] px-8 py-3 rounded-full font-bold hover:bg-[#5A605F] transition-colors"
            >
              ACESSAR PERFIL
            </a>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-12 text-[#747B7A] text-center">Entre em Contato Conosco</h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="bg-[#181818] rounded-lg p-6 md:p-8 lg:-ml-[100px]">
            <h3 className="text-xl font-semibold mb-8 text-center md:text-left">Informações de Contato</h3>
            <div className="space-y-6">
              <a
                href="https://wa.me/5548996999796"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-[#747B7A] transition-colors justify-start"
              >
                <Image
                  src="/assets/icon-whatsapp.png"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                  className="text-[#747B7A] flex-shrink-0"
                />
                <div className="text-left">
                  <span className="text-[#747B7A] block mb-1">WhatsApp:</span>
                  <span className="text-sm md:text-base">(48) 99699-9796</span>
                </div>
              </a>
              <a
                href="https://instagram.com/vederefilms" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-[#747B7A] transition-colors justify-start"
              >
                <Image
                  src="/assets/icon-instagram.png"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="text-[#747B7A] flex-shrink-0"
                />
                <div className="text-left">
                  <span className="text-[#747B7A] block mb-1">Instagram:</span>
                  <span className="text-sm md:text-base">@vederefilms</span>
                </div>
              </a>
              <a
                href="https://maps.google.com/?q=R.+Clemente+Rovere,+25+-+Centro,+Florianópolis+-+SC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-[#747B7A] transition-colors justify-start"
              >
                <Image
                  src="/assets/icon-localização.png"
                  alt="Localização"
                  width={32}
                  height={32}
                  className="text-[#747B7A] flex-shrink-0"
                />
                <div className="text-left">
                  <span className="text-[#747B7A] block mb-1">Endereço:</span>
                  <span className="text-sm md:text-base">R. Clemente Rovere, 25 - Centro, Florianópolis - SC</span>
                </div>
              </a>
            </div>
          </div>
          <form 
            className="bg-[#181818] rounded-lg p-6 md:p-8 lg:-mr-[100px]" 
            onSubmit={handleEmailSubmit}
          >
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Nome" 
              className="w-full bg-[#222] rounded px-4 py-3 text-[#ededed] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#747B7A] mb-4 text-sm md:text-base" 
            />
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="E-mail" 
              className="w-full bg-[#222] rounded px-4 py-3 text-[#ededed] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#747B7A] mb-4 text-sm md:text-base" 
            />
            <textarea 
              name="message" 
              required 
              placeholder="Mensagem" 
              rows={4} 
              className="w-full bg-[#222] rounded px-4 py-3 text-[#ededed] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#747B7A] mb-4 text-sm md:text-base" 
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-[#747B7A] text-[#0a0a0a] font-bold py-3 rounded transition-colors text-sm md:text-base flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#5A605F]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#0a0a0a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Abrindo Email...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0a0a0a]">
                    <path d="M22 2H2v16h20V2zM2 22l4-4h16V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Enviar Mensagem
                </>
              )}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline mr-2 text-[#747B7A]">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              O botão abrirá seu aplicativo de email padrão com a mensagem preenchida automaticamente
            </p>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section id="localizacao" className="max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-12 text-[#747B7A] text-center">Como Chegar em Nossa Loja!</h2>
        <div className="rounded-lg overflow-hidden shadow-lg border border-[#222] w-[80vw] max-w-3xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.844389680162!2d-48.547620222823745!3d-27.598353622203213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952749fa5df2a80b%3A0x7f61e8e51dece1!2sVedere%20films!5e0!3m2!1sen!2sbr!4v1751926242368!5m2!1sen!2sbr"
            className="w-full"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa da localização"
          ></iframe>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}
