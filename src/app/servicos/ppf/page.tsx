import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function PPF() {
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
        <div className="relative w-full max-w-[45vw] max-[1570px]:max-w-[700px] mb-6 mt-8">
          <div className="w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl relative bg-black">
            <video controls className="w-full h-full object-cover rounded-lg" controlsList="nodownload">
              <source src="/videos/ppf.mp4" type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </video>
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