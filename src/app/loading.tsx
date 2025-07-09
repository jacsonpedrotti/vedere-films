export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#747B7A] mx-auto mb-4"></div>
        <p className="text-[#747B7A] text-lg">Carregando...</p>
      </div>
    </div>
  )
} 