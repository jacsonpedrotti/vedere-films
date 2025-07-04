"use client";
import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const videos = [
  "/residencial1.mp4",
  "/residencial2.mp4",
  "/residencial3.mp4",
  "/residencial4.mp4",
  "/residencial5.mp4"
];

export default function PeliculasResidenciais() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userMuted, setUserMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Carregar preferência de mute do usuário
  useEffect(() => {
    const savedMuted = localStorage.getItem('peliculasResidenciaisMuted');
    if (savedMuted !== null) {
      setUserMuted(savedMuted === 'true');
    }
  }, []);

  // Salvar preferência de mute do usuário
  const handleMuteChange = (muted: boolean) => {
    setUserMuted(muted);
    localStorage.setItem('peliculasResidenciaisMuted', muted.toString());
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

  // Garantir autoplay e aplicar mute preferido
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
          src="/gift-whats.gif"
          alt="WhatsApp"
          className="w-full h-full object-contain"
          draggable="false"
        />
      </a>
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#747B7A] mb-6 text-center mt-20">Películas Residenciais</h1>
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
          As películas residenciais são soluções modernas e eficientes para quem busca conforto térmico, privacidade, segurança e valorização estética em ambientes internos. Desenvolvidas com tecnologia de ponta, essas películas podem ser aplicadas em janelas, portas de vidro e fachadas, bloqueando até 99% dos raios UV e reduzindo significativamente a entrada de calor, o que contribui para a economia de energia e maior bem-estar dos moradores.<br/><br/>
          Disponíveis em versões decorativas, jateadas, espelhadas ou fumê, as películas residenciais proporcionam maior privacidade sem comprometer a luminosidade natural, além de proteger móveis, pisos e objetos contra o desbotamento causado pelo sol. Também aumentam a segurança, pois ajudam a manter os vidros unidos em caso de quebra, reduzindo o risco de acidentes. Com fácil manutenção, alta durabilidade e acabamento sofisticado, são ideais para transformar qualquer ambiente em um espaço mais funcional, elegante e protegido.
        </p>
      </main>
      <Footer />
    </div>
  );
} 