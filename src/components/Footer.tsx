'use client';
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#111] py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-xs">© 2025 Vedere Films. Todos os direitos reservados.</p>
        <p className="text-gray-400 mt-2 text-xs flex items-center justify-center">
          Desenvolvido por&nbsp;
          <a 
            href="https://wa.me/5548996832721?text=Ol%C3%A1%2C%20eu%20gostei%20do%20seu%20trabalho%20e%20gostaria%20de%20fazer%20um%20or%C3%A7amento!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#747B7A] hover:text-[#5A605F] transition-colors"
          >
            Jacson Pedrotti
          </a>
        </p>
      </div>
    </footer>
  );
} 