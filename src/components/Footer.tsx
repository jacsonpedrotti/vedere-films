'use client';
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#111] py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-xs">© 2025 Vedere Films. Todos os direitos reservados.</p>
        <p className="text-gray-400 mt-2 text-xs">
          Desenvolvido por{" "}
          <a 
            href="https://www.github.com/jacsonpedrotti" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#747B7A] hover:text-[#5A605F] transition-colors"
          >
            Jacson Pedrotti
          </a>
        </p>
      </div>
    </footer>
  );
} 