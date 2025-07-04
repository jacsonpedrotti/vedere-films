'use client';
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#111] py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-xs">© 2025 Vedere Films. Todos os direitos reservados.</p>
        <p className="text-gray-400 mt-2 text-xs flex items-center justify-center">
          Desenvolvido por
          <a 
            href="https://www.github.com/jacsonpedrotti" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 ml-2 text-[#747B7A] hover:text-[#5A605F] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Jacson Pedrotti
          </a>
        </p>
      </div>
    </footer>
  );
} 