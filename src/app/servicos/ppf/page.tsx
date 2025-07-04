'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const videos = [
  "/PPF1.mp4",
  "/PPF2.mp4"
];

const subtitles = [
  "PPF matte (PPF fosco acetinado)",
  "PPF brilho"
];

export default function PPF() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userMuted, setUserMuted] = useState(true);

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
    const savedMuted = localStorage.getItem('ppfMuted');
    if (savedMuted !== null) {
      setUserMuted(savedMuted === 'true');
    }
  }, []);

  // Salvar preferência de mute do usuário
  const handleMuteChange = (muted: boolean) => {
    setUserMuted(muted);
    localStorage.setItem('ppfMuted', muted.toString());
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
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#747B7A] mb-6 text-center mt-20">PPF – Proteção de Pintura Premium</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-[#747B7A] mb-6 text-center transition-all duration-300 ease-in-out">
          {subtitles[currentVideoIndex]}
        </h2>
        
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
              playsInline
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
          O PPF (Paint Protection Film) é uma película de proteção automotiva de alta performance, desenvolvida para preservar a pintura original do veículo contra riscos, arranhões, manchas, detritos e agressões do dia a dia. Fabricado com poliuretano de última geração, o PPF é praticamente invisível, mantendo o brilho e a cor do carro sem alterar sua aparência.<br/><br/>
          Sua tecnologia avançada proporciona autorregeneração de pequenos riscos com o calor, alta resistência a impactos e proteção contra raios UV, evitando o desbotamento da pintura. O PPF também facilita a limpeza, impede a aderência de sujeira e protege contra produtos químicos e intempéries. É a solução ideal para quem deseja manter o veículo sempre com aspecto de novo, valorizando o investimento e garantindo máxima durabilidade, sofisticação e exclusividade ao automóvel.
        </p>
      </main>
      <Footer />
    </div>
  );
} 