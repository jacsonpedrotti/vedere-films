import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function PeliculasResidenciais() {
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
        <div className="relative w-full max-w-[45vw] max-[1570px]:max-w-[700px] mb-6 mt-8">
          <div className="w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl relative bg-black">
            <video controls className="w-full h-full object-cover rounded-lg" controlsList="nodownload">
              <source src="/videos/peliculas-residenciais.mp4" type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </video>
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