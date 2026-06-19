import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark, LogoWordmark } from '../components/Logo';
import { WA_URL, trackWhatsApp } from '../config';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada · Genuíno Gran';
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.05) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative mb-10">
        <Link to="/" className="flex items-center gap-2.5 justify-center" aria-label="Genuíno Gran">
          <LogoMark className="h-10 w-auto" color="white" />
          <LogoWordmark className="h-[14px] w-auto" color="white" />
        </Link>
      </div>

      <p className="relative font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
        Erro 404
      </p>
      <h1 className="relative font-playfair text-4xl sm:text-5xl font-medium text-white mb-4">
        Página não encontrada
      </h1>
      <p className="relative font-inter text-sm text-white/45 max-w-sm mb-10 leading-relaxed">
        A página que você está procurando não existe ou foi movida. Que tal voltar ao início?
      </p>

      <div className="relative flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="px-10 py-4 bg-gold text-[#0a0a0a] font-inter font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
        >
          Voltar ao início
        </Link>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp('404')}
          className="px-10 py-4 border border-white/15 text-white/65 font-inter text-xs tracking-widest uppercase hover:border-white/35 hover:text-white transition-all duration-300"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
