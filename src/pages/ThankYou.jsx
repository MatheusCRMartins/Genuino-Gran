import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark, LogoWordmark } from '../components/Logo';
import { BUSINESS, SOCIAL, trackWhatsApp } from '../config';

function pushDL(event, extra = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...extra });
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z" />
  </svg>
);

export default function ThankYou() {
  const location = useLocation();

  // Recupera o material dos params (preservado via I)
  const material = new URLSearchParams(location.search).get('material') || 'mármore';
  const waMsg = `Olá! Acabei de solicitar um orçamento de bancada em ${material} pelo site da Genuíno Gran.`;
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(waMsg)}`;

  useEffect(() => {
    document.title = 'Pedido Recebido · Genuíno Gran';
    window.scrollTo(0, 0);
    // F) DataLayer — conversão confirmada
    pushDL('conversao_orcamento', { material });
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { event_category: 'orcamento', material });
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  }, [material]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="px-6 lg:px-10 py-5 border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Genuíno Gran">
            <LogoMark className="h-7 w-auto flex-shrink-0" color="white" />
            <LogoWordmark className="h-[10px] w-auto" color="white" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-16">
        {/* Ícone de confirmação */}
        <div
          className="w-16 h-16 border border-gold/40 flex items-center justify-center mb-8"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <path d="M20 6L9 17l-5-5" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
          Pedido recebido
        </p>
        <h1 className="font-playfair text-3xl sm:text-4xl font-medium text-white mb-5">
          Recebemos seu pedido!
        </h1>
        <p className="font-inter text-[15px] text-white/55 leading-relaxed max-w-sm mb-2">
          Vamos responder em até{' '}
          <strong className="text-white font-semibold">2 minutos</strong>{' '}
          no horário comercial.
        </p>
        <p className="font-inter text-sm text-white/35 mb-3">
          {BUSINESS.hours}
        </p>
        <p className="font-inter text-sm text-white/40 mb-10">
          Enquanto isso, conheça nossos projetos no Instagram.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-[#25d366] text-white font-inter font-semibold text-sm hover:brightness-110 transition-all"
            style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
            onClick={() => { pushDL('clique_whatsapp', { origem: 'obrigado', material }); trackWhatsApp('obrigado'); }}
          >
            {WA_ICON}
            Falar no WhatsApp
          </a>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-4 border border-white/20 text-white/60 font-inter text-sm hover:border-white/40 hover:text-white transition-all"
          >
            Ver no Instagram
          </a>
        </div>

        <Link
          to="/"
          className="mt-10 font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors"
        >
          ← Voltar ao site principal
        </Link>
      </main>
    </div>
  );
}
