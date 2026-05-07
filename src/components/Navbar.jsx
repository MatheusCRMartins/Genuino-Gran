import { useState, useEffect, useRef } from 'react';
import { LogoMark, LogoWordmark } from './Logo';

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
          menuOpen ? 'max-h-96 border-b border-white/[0.08]' : 'max-h-0'
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
          <li className="pt-5 pb-2">
            <a
              href="#contato"
              onClick={closeMenu}
              className="flex items-center justify-center w-full py-4 border border-gold text-gold font-inter text-[12px] tracking-widest uppercase hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
            >
              Orçamento Gratuito
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
