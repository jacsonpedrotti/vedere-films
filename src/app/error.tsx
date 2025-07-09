'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#747B7A] mb-4">Algo deu errado!</h2>
        <p className="text-gray-300 mb-6">Ocorreu um erro inesperado. Tente novamente.</p>
        <button
          onClick={reset}
          className="bg-[#747B7A] text-[#0a0a0a] px-6 py-3 rounded-full font-bold hover:bg-[#5A605F] transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
} 