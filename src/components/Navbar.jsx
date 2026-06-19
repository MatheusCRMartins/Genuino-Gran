import { useState, useEffect, useRef } from 'react';
import { LogoMark, LogoWordmark } from './Logo';
import { WA_URL, trackWhatsApp } from '../config';

const NAV_LINKS = [
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha menu ao clicar fora
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3" aria-label="Genuíno Gran – página inicial">
          <LogoMark className="h-8 sm:h-9 w-auto flex-shrink-0" color="white" />
          <div className="hidden sm:block leading-none">
            <LogoWordmark className="h-[13px] w-auto" color="white" />
            <p className="font-inter text-[9px] tracking-[0.25em] text-gold uppercase mt-1.5">
              Mármore &amp; Granito
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-inter text-[13px] tracking-widest text-white/60 hover:text-white transition-colors duration-200 relative group uppercase"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 border border-gold text-gold font-inter text-[12px] tracking-widest uppercase hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
        >
          Orçamento Gratuito
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 flex flex-col justify-center gap-[6px] w-11 h-11"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 bg-white origin-center transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <span
            className={`block h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 bg-white origin-center transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[480px] border-b border-white/[0.08]' : 'max-h-0'
        } bg-[#0a0a0a]/98 backdrop-blur-md`}
      >
        <ul className="flex flex-col px-6 py-4 gap-0" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block font-inter text-[13px] tracking-widest text-white/60 hover:text-white uppercase py-4 border-b border-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-5 pb-1">
            <a
              href="#contato"
              onClick={closeMenu}
              className="flex items-center justify-center w-full py-4 border border-gold text-gold font-inter text-[12px] tracking-widest uppercase hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
            >
              Orçamento Gratuito
            </a>
          </li>

          {/* WhatsApp — atalho rápido para quem prefere conversar direto */}
          <li className="pb-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { closeMenu(); trackWhatsApp('navbar'); }}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] font-inter text-[12px] tracking-wide hover:bg-[#25d366]/20 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z"/>
              </svg>
              Prefere conversar agora?
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
