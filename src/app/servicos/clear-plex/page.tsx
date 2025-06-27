import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function ClearPlex() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#747B7A] mb-6 text-center mt-20">Clear Plex</h1>
        <div className="relative w-full max-w-[45vw] max-[1570px]:max-w-[700px] mb-6 mt-8">
          <div className="w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl relative bg-black">
            <video controls className="w-full h-full object-cover rounded-lg" controlsList="nodownload">
              <source src="/videos/clear-plex.mp4" type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </video>
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