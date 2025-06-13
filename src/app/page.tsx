'use client';

import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const services = [
  {
    title: "Film Cerâmica",
    description: "Proteção máxima e conforto superior. Com tecnologia de ponta, bloqueia até 99% dos raios UV e 80% do calor infravermelho, sem interferir na visibilidade ou nos sinais eletrônicos.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
  },
  {
    title: "Film Carbono",
    description: "Desempenho e estilo com alta durabilidade. Reduz o calor interno, protege contra raios UV e garante longa vida útil, sendo perfeito para quem busca um visual exclusivo.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738"
  },
  {
    title: "Clear Plex",
    description: "Blindagem invisível para o parabrisa. Protege contra impactos e arranhões, preservando sua visão e evitando substituições caras. Tecnologia desenvolvida para carros premium.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
  },
  {
    title: "Películas Residenciais",
    description: "Conforto, privacidade e estilo para sua casa. Disponíveis em versões decorativas, jateadas ou fumê, transformam qualquer ambiente em um espaço mais funcional e agradável.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
  },
  {
    title: "PPF – Proteção de Pintura Premium",
    description: "Proteja e transforme. Com o Paint Protection Film, preservamos a pintura original do seu veículo contra riscos, manchas e detritos. Além disso, oferecemos a opção de mudança de tom para dar um toque único ao seu carro, sem comprometer o brilho e a sofisticação.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Efeito para montagem do componente
  React.useEffect(() => {
    setIsMounted(true);
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

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset para melhor detecção
      
      // Função para verificar se uma seção está visível
      const isSectionVisible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        return scrollPosition >= elementTop && scrollPosition <= elementBottom;
      };

      // Verifica cada seção em ordem
      for (const item of navItems) {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        
        if (element && isSectionVisible(element)) {
          setActiveSection(sectionId);
          return;
        }
      }

      // Se estiver no topo da página, ativa a Home
      if (scrollPosition < 100) {
        setActiveSection("");
      }
    };

    // Adiciona o evento de scroll com throttling para melhor performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler);
    handleScroll(); // Verifica a seção inicial
    return () => window.removeEventListener("scroll", scrollHandler);
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

  const images = [
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738"
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      {isMounted ? (
        <>
          {/* Header */}
          <header className="w-full flex items-center justify-between px-3 py-0 border-b border-[#222] bg-[#111]/80 backdrop-blur md:sticky md:top-0 z-40 h-16 md:h-20">
            <div className="flex items-center justify-center md:justify-start w-full md:w-auto md:ml-[70px]">
              <Image 
                src="/logo-vedere-50x50.png" 
                alt="Vedere Films Logo" 
                width={180} 
                height={60} 
                className="object-contain relative z-50 -my-8 w-[120px] md:w-[180px]"
                priority
              />
            </div>
            <nav className="hidden md:flex gap-6 mr-[70px]">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className={`hover:text-[#747B7A] transition-colors font-medium relative ${
                    activeSection === item.href.substring(1) 
                      ? 'text-[#747B7A] after:content-[""] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-[#747B7A]' 
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </header>

          {/* Hero Section */}
          <section id="inicio" className="relative h-[80vh] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d"
                alt="Carro com película"
                fill
                className="object-cover brightness-50"
                priority
              />
            </div>
            <div className="relative z-10 text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">PROTEÇÃO E ESTILO</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
                Transformamos a experiência de dirigir veículos premium em algo ainda mais exclusivo.
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="#contato" className="bg-[#747B7A] text-[#0a0a0a] px-8 py-3 rounded-full font-bold hover:bg-[#5A605F] transition-colors">
                  ENTRE EM CONTATO
                </a>
                <a 
                  href="https://wa.me/5548996999796" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-16 h-16 hover:scale-110 transition-transform"
                >
                  <Image
                    src="/gift-whats.gif"
                    alt="WhatsApp"
                    fill
                    className="object-contain"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* Sobre */}
          <section id="sobre" className="max-w-6xl mx-auto py-32 px-4 my-20">
            <div className="grid md:grid-cols-2 gap-[180px] items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full md:w-auto"
              >
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-screen md:w-auto -mx-4 md:mx-0 flex justify-center md:justify-start mb-8">
                    <Image
                      src="/logo-simples.png"
                      alt="Vedere Films Logo"
                      width={400}
                      height={133}
                      className="object-contain w-[280px] md:w-[400px] mr-[14px] md:mr-0"
                    />
                  </div>
                  <div className="space-y-6 text-center md:text-left w-full">
                    <h2 className="text-3xl font-bold text-[#747B7A]">Sobre a Vedere Films</h2>
                    <p className="text-lg leading-relaxed text-gray-300">
                      Com 10 anos de experiência, somos especialistas em aplicação de películas automotivas e residenciais. 
                      Utilizamos materiais de alto padrão e tecnologias de última geração para proteger o que você ama, 
                      elevando o conforto, a segurança e a estética do seu veículo.
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
                        <h3 className="text-2xl font-bold text-[#747B7A] mb-2">1000+</h3>
                        <p className="text-gray-300">Clientes Satisfeitos</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] rounded-lg overflow-hidden"
              >
                <Image
                  src="/image-sobre.jpg"
                  alt="Trabalho Vedere Films"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-[#181818]/80 backdrop-blur p-4 rounded-lg"
                  >
                    <h3 className="text-lg font-bold text-[#747B7A] mb-1">Compromisso com a Excelência</h3>
                    <p className="text-sm text-gray-300">
                      Nossa equipe é treinada constantemente para garantir o melhor resultado em cada aplicação.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Por que escolher */}
          <section className="bg-[#111] py-20">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-12 text-[#747B7A] text-center"
              >
                Por que escolher a Vedere Films?
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer"
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
                  <p className="text-gray-300">
                    Conhecemos as necessidades dos carros mais exclusivos do mercado.
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
                  className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer"
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
                  <p className="text-gray-300">
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
                  className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer"
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
                  <p className="text-gray-300">
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
                  className="bg-[#181818] rounded-lg p-8 text-center cursor-pointer"
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
                  <p className="text-gray-300">
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
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-[#181818] rounded-lg p-10 shadow-lg hover:shadow-xl transition-shadow"
                    style={{ minWidth: '25%', padding: '0 1.5rem' }}
                  >
                    <div className="relative h-72 mb-8 rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#747B7A]">{service.title}</h3>
                    <p className="text-gray-300 text-lg">
                      {service.description}
                    </p>
                  </div>
                ))}
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
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-[#181818] rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#747B7A]">{service.title}</h3>
                  <p className="text-gray-300 text-base md:text-lg">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Galeria */}
          <section id="galeria" className="max-w-7xl mx-auto py-20 px-4">
            <h2 className="text-3xl font-bold mb-12 text-[#747B7A] text-center">Galeria de Trabalhos</h2>
            <div className="relative">
              <motion.div 
                className="relative h-[600px] md:h-[800px] rounded-xl overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={images[currentImage]}
                  alt="Trabalho Vedere Films"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
              </motion.div>

              {/* Navegação */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImage === index ? 'bg-[#747B7A] w-8' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* Botões de navegação */}
              <button
                onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#181818]/80 p-3 rounded-full hover:bg-[#181818] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#747B7A]">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#181818]/80 p-3 rounded-full hover:bg-[#181818] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#747B7A]">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Miniaturas */}
            <div className="mt-8 grid grid-cols-4 md:grid-cols-6 gap-4">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  whileHover={{ scale: 1.05 }}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-[#747B7A]' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Trabalho ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="max-w-4xl mx-auto py-20 px-4">
            <h2 className="text-3xl font-bold mb-12 text-[#747B7A] text-center">Perguntas Frequentes</h2>
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
                    className="w-16 h-8 relative"
                  >
                    <Image
                      src="/logo-simples.png"
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
                    className="w-16 h-8 relative"
                  >
                    <Image
                      src="/logo-simples.png"
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
                    className="w-16 h-8 relative"
                  >
                    <Image
                      src="/logo-simples.png"
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
                    className="w-16 h-8 relative"
                  >
                    <Image
                      src="/logo-simples.png"
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
                    className="w-16 h-8 relative"
                  >
                    <Image
                      src="/logo-simples.png"
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
                    className="w-16 h-8 relative"
                  >
                    <Image
                      src="/logo-simples.png"
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
                      src="/icon-instagram.png"
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
                      src="/icon-whatsapp.png"
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
                      src="/icon-instagram.png"
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
                      src="/icon-localização.png"
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
                action="https://formsubmit.co/SEU_EMAIL_AQUI" 
                method="POST"
                target="_blank"
                rel="noopener noreferrer"
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
                  className="w-full bg-[#747B7A] text-[#0a0a0a] font-bold py-3 rounded hover:bg-[#5A605F] transition-colors text-sm md:text-base"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </section>

          {/* Localização */}
          <section id="localizacao" className="max-w-4xl mx-auto py-20 px-4">
            <h2 className="text-3xl font-bold mb-12 text-[#747B7A] text-center">Como Chegar em Nossa Loja!</h2>
            <div className="rounded-lg overflow-hidden shadow-lg border border-[#222]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.9999999999995!2d-48.54999999999999!3d-27.599999999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM2JzAwLjAiUyA0OMKwMzMnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa da localização"
              ></iframe>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#111] py-8 mt-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-gray-400 text-sm">© 2025 Vedere Films. Todos os direitos reservados.</p>
              <p className="text-gray-400 mt-2 text-sm">
                Desenvolvido por{" "}
                <a 
                  href="https://www.github.com/jacsonpedrotti" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#747B7A] hover:text-[#5A605F] transition-colors"
                >
                  Jacson Pedrotti
                </a>
              </p>
            </div>
          </footer>
        </>
      ) : null}
    </div>
  );
}
