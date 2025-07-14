"use client";
import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const videos = [
  "/clearplex/clear-plex1.mp4",
  "/clearplex/clear-plex2.mp4",
  "/clearplex/clear-plex3.mp4",
  "/clearplex/clear-plex4.mp4",
  "/clearplex/clear-plex5.mp4"
];

export default function ClearPlex() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userMuted, setUserMuted] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Verificar se está no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextVideo = () => {
    setIsLoading(true);
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevVideo = () => {
    setIsLoading(true);
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const goToVideo = (index: number) => {
    setIsLoading(true);
    setCurrentVideoIndex(index);
  };

  // Carregar preferência de mute do usuário
  useEffect(() => {
    if (!isClient) return;
    
    const savedMuted = localStorage.getItem('clearPlexMuted');
    if (savedMuted !== null) {
      setUserMuted(savedMuted === 'true');
    }
  }, [isClient]);

  // Salvar preferência de mute do usuário
  const handleMuteChange = (muted: boolean) => {
    if (!isClient) return;
    
    setUserMuted(muted);
    localStorage.setItem('clearPlexMuted', muted.toString());
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = userMuted;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (!userMuted && videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    }
  }, [currentVideoIndex, userMuted]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col">
      <Header />
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
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#747B7A] mb-6 text-center mt-20">Clear Plex</h1>
        {/* Carrossel de Vídeos */}
        <div className="relative w-full max-w-[45vw] max-[1570px]:max-w-[700px] mb-6 mt-8">
          {/* Vídeo Principal */}
          <div className="w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl relative bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#181818] z-10">
                <div className="text-[#747B7A] text-lg">Carregando vídeo...</div>
              </div>
            )}
            <video
              ref={videoRef}
              key={videos[currentVideoIndex]}
              controls
              controlsList="nodownload"
              className="w-full h-full object-cover rounded-lg"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              autoPlay
              muted={userMuted}
              preload="auto"
              onEnded={nextVideo}
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              onVolumeChange={() => {
                if (videoRef.current) {
                  handleMuteChange(videoRef.current.muted);
                }
              }}
            >
              <source src={videos[currentVideoIndex]} type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </video>
          </div>

          {/* Botões de Navegação */}
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#181818]/80 hover:bg-[#181818] p-3 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Vídeo anterior"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#747B7A]">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#181818]/80 hover:bg-[#181818] p-3 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Próximo vídeo"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#747B7A]">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Indicadores de Vídeo */}
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToVideo(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${currentVideoIndex === index ? 'bg-[#747B7A] w-6 md:w-8' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Ir para vídeo ${index + 1}`}
                type="button"
              />
            ))}
          </div>

          {/* Indicador de vídeo atual */}
          <div className="text-center mt-2 text-sm text-[#747B7A]">
            Vídeo {currentVideoIndex + 1} de {videos.length}
          </div>
        </div>
        <p className="text-base md:text-lg leading-relaxed text-justify max-w-3xl mx-auto mt-10">
          O Clear Plex é uma película de proteção invisível desenvolvida com tecnologia de ponta para aplicação em para-brisas automotivos. Sua principal função é atuar como um escudo transparente contra impactos, arranhões, detritos e intempéries, preservando a integridade do vidro original e aumentando a segurança dos ocupantes. Diferente de películas convencionais, o Clear Plex mantém total transparência e não interfere na visibilidade, sensores ou sistemas eletrônicos do veículo.<br/><br/>
          Sua composição avançada absorve e dissipa a energia de impactos, reduzindo drasticamente o risco de trincas e estilhaçamento do para-brisa, além de proteger contra riscos causados por pedras, areia e outros resíduos da estrada. O material é resistente aos raios UV, evitando o amarelamento e prolongando a vida útil do vidro. Ideal para veículos premium, esportivos e de uso intenso, o Clear Plex oferece proteção discreta, acabamento perfeito e fácil manutenção, sendo a escolha ideal para quem busca máxima segurança, durabilidade e valorização do automóvel.
        </p>
      </main>
      <Footer />
    </div>
  );
} 