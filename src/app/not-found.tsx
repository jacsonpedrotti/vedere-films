import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#747B7A] mb-4">404</h2>
        <h3 className="text-2xl font-bold text-[#747B7A] mb-4">Página não encontrada</h3>
        <p className="text-gray-300 mb-6">A página que você está procurando não existe.</p>
        <Link
          href="/"
          className="bg-[#747B7A] text-[#0a0a0a] px-6 py-3 rounded-full font-bold hover:bg-[#5A605F] transition-colors inline-block"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
} 