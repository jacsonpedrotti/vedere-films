'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../../components/Header"), { ssr: false });
import Footer from "../../../components/Footer";

const videos = [
  "/nano-ceramica7.mp4",
  "/nano-ceramica8.mp4",
  "/nano-ceramica9.mp4",
  "/nano-ceramica10.mp4",
  "/nano-ceramica11.mp4"
];

export default function FilmCeramica() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    muted: true,
    volume: 1,
    playbackRate: 1
  });
  const [userMuted, setUserMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Carregar preferências salvas
  useEffect(() => {
    const savedPreferences = localStorage.getItem('videoPreferences');
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setUserPreferences(prefs);
      } catch (error) {
        console.log('Erro ao carregar preferências:', error);
      }
    }
    // Forçar autoplay ao montar
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Carregar preferência de mute do usuário
  useEffect(() => {
    const savedMuted = localStorage.getItem('filmCeramicaMuted');
    if (savedMuted !== null) {
      setUserMuted(savedMuted === 'true');
    }
  }, []);

  // Salvar preferências quando mudarem
  const savePreferences = (newPreferences: typeof userPreferences) => {
    setUserPreferences(newPreferences);
    localStorage.setItem('videoPreferences', JSON.stringify(newPreferences));
  };

  // Salvar preferência de mute do usuário
  const handleMuteChange = (muted: boolean) => {
    setUserMuted(muted);
    localStorage.setItem('filmCeramicaMuted', muted.toString());
  };

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

  // Efeito para aplicar preferências e iniciar o vídeo automaticamente
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = userMuted;
      videoRef.current.volume = 1;
      videoRef.current.playbackRate = 1;
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

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevVideo();
      } else if (event.key === 'ArrowRight') {
        nextVideo();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentVideoIndex]);

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
          src="/gift-whats.gif"
          alt="WhatsApp"
          className="w-full h-full object-contain"
          draggable="false"
        />
      </a>
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-2">
        <h1 className="text-3xl md:text-5xl font-bold text-[#747B7A] mb-6 text-center mt-20">Film Nanocerâmica HD</h1>
        
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
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              autoPlay
              muted={userMuted}
              playsInline
              preload="auto"
              onEnded={nextVideo}
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={() => {
                setIsLoading(false);
                if (videoRef.current) {
                  videoRef.current.muted = userMuted;
                  videoRef.current.volume = 1;
                  videoRef.current.playbackRate = 1;
                  videoRef.current.play().catch(() => {});
                }
              }}
              onVolumeChange={() => {
                if (videoRef.current) {
                  handleMuteChange(videoRef.current.muted);
                }
              }}
              onError={(e) => {
                console.error('Erro ao carregar vídeo:', videos[currentVideoIndex], e);
                setIsLoading(false);
              }}
            >
              <source src={videos[currentVideoIndex]} type="video/quicktime" />
              <source src={videos[currentVideoIndex]} type="video/mp4" />
              <source src={videos[currentVideoIndex]} />
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

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => goToVideo(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                  currentVideoIndex === index ? 'bg-[#747B7A] w-6 md:w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
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
          A película automotiva nanocerâmica representa o que há de mais avançado em proteção, conforto e tecnologia para veículos premium. Desenvolvida com partículas cerâmicas em escala nanométrica, ela oferece uma barreira altamente eficiente contra os raios ultravioleta (UV) e o calor infravermelho, bloqueando até 99% dos raios UV e mais de 90% do calor solar, sem comprometer a visibilidade ou interferir em sinais eletrônicos, GPS ou sensores do veículo.<br/><br/>
          Sua estrutura ultrafina e transparente proporciona máxima clareza óptica, mantendo o interior do carro protegido contra desbotamento, envelhecimento e superaquecimento, além de garantir conforto térmico mesmo em dias de sol intenso. A nanotecnologia empregada garante ainda alta resistência a riscos, durabilidade superior (com garantia que pode ultrapassar 10 anos) e acabamento sofisticado, valorizando o veículo e preservando seu valor de revenda.<br/><br/>
          Além do desempenho térmico e da proteção solar, a película nanocerâmica contribui para a segurança dos ocupantes, pois ajuda a manter os vidros unidos em caso de impacto, reduzindo o risco de estilhaçamento. É a escolha ideal para quem busca o equilíbrio perfeito entre estética, inovação, privacidade, eficiência energética e proteção de longo prazo para o seu automóvel.
        </p>
      </main>
      <Footer />
    </div>
  );
} 