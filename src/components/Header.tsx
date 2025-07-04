'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Galeria", href: "/#galeria" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: "/#contato" },
];

const serviceOptions = [
  { label: "Film Nanocerâmica HD", value: "/servicos/film-ceramica" },
  { label: "Film Nanocerâmica PRO", value: "/servicos/film-carbono" },
  { label: "Clear Plex", value: "/servicos/clear-plex" },
  { label: "Películas Residenciais", value: "/servicos/peliculas-residenciais" },
  { label: "PPF – Proteção de Pintura Premium", value: "/servicos/ppf" },
  { label: "Envelopamento", value: "/servicos/envelopamento" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerContent = (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[#111]/70 border-b border-[#222] h-20 flex items-center justify-center px-4 backdrop-blur-0"
      style={{ willChange: 'transform', transform: 'translateZ(0)', backdropFilter: 'blur(0px)' }}>
      {/* Logo centralizada */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <a href="/" className="flex items-center">
          <Image src="/logo-vedere-50x50.png" alt="Vedere Films Logo" width={160} height={160} className="object-contain w-40 h-40 -my-12" />
        </a>
      </div>
      {/* Desktop nav - visível acima de 1200px */}
      <nav className="hidden xl:flex items-center gap-8 ml-auto">
        {navItems.map((item) =>
          item.label === "Serviços" ? (
            <Menu as="div" className="relative" key={item.href}>
              <Menu.Button className="flex items-center gap-1 font-medium text-[#ededed] hover:text-[#747B7A] transition-colors">
                Serviços
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 origin-top bg-[#111]/70 backdrop-blur-sm border border-[#333] rounded-xl shadow-xl z-[101] focus:outline-none flex flex-col items-center py-2">
                  {serviceOptions.map((opt) => (
                    <Menu.Item key={opt.value}>
                      {({ active }) => (
                        <a
                          href={opt.value}
                          className={`block w-full text-left px-6 py-3 text-[#ededed] text-base font-medium rounded-lg transition-colors ${active ? "bg-[#222] text-[#747B7A]" : "hover:bg-[#222] hover:text-[#747B7A]"}`}
                        >
                          {opt.label}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <a key={item.href} href={item.href} className="text-[#ededed] hover:text-[#747B7A] font-medium transition-colors">
              {item.label}
            </a>
          )
        )}
      </nav>
      {/* Mobile menu button - visível abaixo de 1200px */}
      <button
        className="xl:hidden ml-auto flex items-center justify-center p-2"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Abrir menu"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#ededed]">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bg-[#111]/70 backdrop-blur-sm z-[100] w-full shadow-lg border-b border-[#222]">
          <nav className="flex flex-col gap-2 items-center w-full py-4">
            {navItems.map((item) =>
              item.label === "Serviços" ? (
                <Menu as="div" className="relative w-full" key={item.href}>
                  <Menu.Button className="flex items-center gap-2 font-medium text-base text-[#ededed] hover:text-[#747B7A] transition-colors w-full justify-center py-2">
                    Serviços
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Menu.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="mt-2 w-full bg-[#111]/70 backdrop-blur-sm border border-[#333] rounded-xl focus:outline-none flex flex-col items-center py-2">
                      {serviceOptions.map((opt) => (
                        <Menu.Item key={opt.value}>
                          {({ active }) => (
                            <a
                              href={opt.value}
                              className={`block w-full text-left px-6 py-2 text-[#ededed] text-base font-medium rounded-lg transition-colors ${active ? "bg-[#222] text-[#747B7A]" : "hover:bg-[#222] hover:text-[#747B7A]"}`}
                            >
                              {opt.label}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-[#ededed] hover:text-[#747B7A] transition-colors w-full text-center py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );

  return headerContent;
} 