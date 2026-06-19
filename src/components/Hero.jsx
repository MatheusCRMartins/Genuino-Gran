import { useState, useEffect, useRef } from 'react';
import { WA_URL, trackWhatsApp } from '../config';
import PhotoStrip from './PhotoStrip';

/* ─── Slides — foto + headline por ambiente ──────────────────────────────── */
const SLIDES = [
  {
    src: '/images/portfolio/cozinha-quartzo-pendentes.jpg',
    pos: 'center 35%',
    lines: ['Transforme', 'sua cozinha', 'com mármore'],
    sub: 'Bancadas sob medida em quartzo, mármore e granito polido',
  },
  {
    src: '/images/portfolio/banheiro-painel-marmore.jpg',
    pos: 'center 28%',
    lines: ['Banheiros que', 'as pessoas param', 'para admirar'],
    sub: 'Pias e painéis esculpidos em pedra natural de alto padrão',
  },
  {
    src: '/images/portfolio/cozinha-quartzo-inox.jpg',
    pos: 'center 40%',
    lines: ['Do projeto', 'à instalação,', 'sem compromisso'],
    sub: '14 anos lapidando cada detalhe em SP, Litoral e Interior',
  },
  {
    src: '/images/portfolio/banheiro-bancada-marmore.jpg',
    pos: 'center center',
    lines: ['Pedra natural,', 'acabamento', 'impecável'],
    sub: 'Travertino, mármore e granito sob medida para o seu projeto',
  },
  {
    src: '/images/portfolio/piso-marmore-ambiente.jpg',
    pos: 'center center',
    lines: ['Pisos que', 'transformam', 'ambientes'],
    sub: 'Instalação com precisão milimétrica em residências e comerciais',
  },
];

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '+14',  label: 'Anos de mercado'        },
  { value: '+4mil',label: 'Projetos entregues'      },
  { value: '100%', label: 'Projetos personalizados' },
  { value: 'SP',   label: 'São Paulo e região'      },
];

/* ─── Marquee ────────────────────────────────────────────────────────────── */
const MARQUEE = [
  'Mármore', 'Granito', 'Alto Padrão', 'São Paulo', 'Projetos Personalizados',
  'Bancadas', 'Pias', 'Pisos', 'Revestimentos', 'Painéis Esculpidos',
  'Mármore Carrara', 'Granito Negro', 'Travertino Romano',
];
const MARQUEE_STR = MARQUEE.join('  ·  ') + '  ·  ';

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const imgRefs  = useRef([]);   // refs das imgs para reiniciar Ken Burns via DOM

  /* Reinicia Ken Burns na imagem ativa sem remontar o elemento */
  useEffect(() => {
    const img = imgRefs.current[current];
    if (!img) return;
    img.style.animation = 'none';
    img.getBoundingClientRect(); // força reflow
    img.style.animation = 'kenBurns 7s ease-out forwards';
  }, [current]);

  /* Avança slide a cada 6s */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
      setTextKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    setCurrent(i);
    setTextKey(prev => prev + 1);
  };

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">

      {/* ══════════════════════════════════════════════════════════════════════
          BACKGROUND — slideshow fullscreen
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0" aria-hidden="true">

        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: 'opacity 2000ms ease-in-out',
            }}
          >
            <img
              ref={el => { imgRefs.current[i] = el; }}
              src={s.src}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: s.pos }}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}

        {/* Gradiente: escurece de baixo para cima (bottom forte, top leve) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.28) 100%)',
          }}
        />
        {/* Véu adicional para leitura no mobile */}
        <div className="absolute inset-0 z-10 bg-[#0a0a0a]/20" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTEÚDO PRINCIPAL
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-20 flex-1 flex items-center w-full pt-20 sm:pt-24 pb-6">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">

          {/* Pre-headline — estático */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="h-px w-7 bg-gold" />
            <span className="font-inter text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-gold">
              14 anos lapidando cada detalhe
            </span>
          </div>

          {/* Headline — muda com o slide, animação de entrada por linha.
              aria-label garante que crawlers/screen readers leiam como uma
              frase contínua, mesmo o visual sendo quebrado em múltiplos spans. */}
          <h1
            key={textKey}
            className="mb-5 sm:mb-7"
            aria-label={slide.lines.join(' ')}
          >
            {slide.lines.map((line, idx) => (
              <span
                key={idx}
                aria-hidden="true"
                className="block font-playfair font-medium text-white leading-[1.08] tracking-tight"
                style={{
                  fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
                  opacity: 0,
                  animation: 'textRise 0.65s cubic-bezier(0.22,1,0.36,1) forwards',
                  animationDelay: `${0.12 + idx * 0.14}s`,
                }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Subtítulo — muda com o slide */}
          <p
            key={`sub-${textKey}`}
            className="font-inter text-[14px] sm:text-[15px] text-white/55 leading-relaxed mb-8 sm:mb-10 max-w-md"
            style={{
              opacity: 0,
              animation: 'textRise 0.65s cubic-bezier(0.22,1,0.36,1) forwards',
              animationDelay: '0.55s',
            }}
          >
            {slide.sub}
          </p>

          {/* CTAs — estáticos */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <a
              href="#contato"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-[#0a0a0a] font-inter font-semibold text-[11px] tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Solicitar Orçamento
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('home_hero')}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-white/15 text-white/65 font-inter text-[11px] tracking-[0.22em] uppercase hover:border-[#25d366]/50 hover:text-[#25d366] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z"/>
              </svg>
              Chamar no WhatsApp
            </a>
          </div>

          {/* Indicadores de slide + trust badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            {/* Indicadores */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Navegação de slides">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  className="h-px rounded-full transition-all duration-500 focus:outline-none"
                  style={{
                    width:      i === current ? '32px' : '14px',
                    background: i === current ? '#c9a96e' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {['Orçamento grátis em 24h', '+200 projetos', 'SP e Grande SP'].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 font-inter text-[11px] text-white/35">
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-gold/60 flex-shrink-0" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-20 border-t border-white/[0.08]"
        style={{ background: 'linear-gradient(180deg, rgba(14,14,14,0.95) 0%, rgba(10,10,10,1) 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="relative py-6 sm:py-8 px-4 sm:px-6 lg:px-10 flex flex-col gap-1.5 sm:gap-2 group"
              >
                {i > 0 && (
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 sm:h-10 bg-white/[0.1] ${i === 2 ? 'hidden sm:block' : ''}`}
                    aria-hidden="true"
                  />
                )}
                <div className="w-5 sm:w-6 h-0.5 bg-gold/50 mb-1 group-hover:w-10 transition-all duration-400" aria-hidden="true" />
                <span
                  className="font-playfair font-bold text-gold leading-none"
                  style={{ fontSize: 'clamp(1.9rem, 5vw, 3.8rem)' }}
                >
                  {s.value}
                </span>
                <span className="font-inter text-[11px] sm:text-[13px] text-white/55 tracking-[0.04em] leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Faixa de fotos — mobile only ── */}
      <div className="relative z-20 lg:hidden">
        <PhotoStrip />
      </div>

      {/* ── Marquee ── */}
      <div
        className="relative z-20 overflow-hidden border-t border-white/[0.05] py-3 sm:py-3.5 bg-[#080808]"
        aria-hidden="true"
      >
        <div className="marquee-track flex whitespace-nowrap">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-inter text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/20 flex-shrink-0 px-4 sm:px-6"
            >
              {MARQUEE_STR}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
