import { useState, useEffect } from 'react';
import { WA_URL } from '../config';

/* ─── Marble Orb ─────────────────────────────────────────────────────────── */
function MarbleOrb() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outermost faint ring — slow spin */}
      <div
        className="orb-ring-1 absolute rounded-full border border-white/[0.04]"
        style={{ inset: '-52px' }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold/30" />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/50" />
      </div>

      {/* Middle ring — reverse spin */}
      <div
        className="orb-ring-2 absolute rounded-full border border-gold/[0.12]"
        style={{ inset: '-28px' }}
        aria-hidden="true"
      >
        <span className="absolute bottom-0 right-6 translate-y-1/2 w-1 h-1 rounded-full bg-gold/40" />
      </div>

      {/* Inner ring — static */}
      <div
        className="absolute rounded-full border border-white/[0.06]"
        style={{ inset: '-12px' }}
        aria-hidden="true"
      />

      {/* Main orb */}
      <div
        className="relative w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden"
        style={{
          boxShadow: `
            inset 0 0 60px rgba(0,0,0,0.5),
            0 0 80px rgba(201,169,110,0.08),
            0 0 160px rgba(201,169,110,0.04)
          `,
        }}
      >
        {/* Textura de mármore real */}
        <img
          src="/images/marble-swirl.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(0.75)', transform: 'scale(1.05)' }}
        />

        {/* Escurecimento radial — mantém o efeito de profundidade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(10,8,6,0.25) 0%, rgba(5,4,3,0.65) 100%)',
          }}
        />

        {/* Veio extra sutil em cima */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(112deg, transparent 33%, rgba(255,255,255,0.04) 33.5%, transparent 34%),
              linear-gradient(78deg,  transparent 68%, rgba(201,169,110,0.03) 68.4%, transparent 68.8%)
            `,
          }}
        />

        {/* Surface sheen — reflexo de luz */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.10) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* Floating stat card — bottom left */}
      <div
        className="absolute -bottom-6 -left-10 lg:-left-16 bg-[#0e0e0e] border border-white/[0.1] px-5 py-4 flex flex-col gap-1"
        style={{ animation: 'floatY 6s ease-in-out infinite' }}
      >
        <span className="font-playfair text-3xl font-semibold text-gold leading-none">+14</span>
        <span className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/35">
          Anos de mercado
        </span>
      </div>

      {/* Floating tag — top right */}
      <div
        className="absolute -top-5 -right-6 lg:-right-10 flex items-center gap-2.5 bg-[#0e0e0e] border border-white/[0.1] px-4 py-2.5"
        style={{ animation: 'floatY 7s ease-in-out infinite 1.5s' }}
      >
        <span
          className="w-2 h-2 rounded-full bg-gold flex-shrink-0"
          style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}
        />
        <span className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/45">
          São Paulo, SP
        </span>
      </div>
    </div>
  );
}

/* ─── Stats bar data ─────────────────────────────────────────────────────── */
const STATS = [
  { value: '+14',   label: 'Anos de mercado'              },
  { value: '+4mil', label: 'Projetos entregues'           },
  { value: '5 anos', label: 'De garantia com suporte'     },
  { value: 'SP',    label: 'Capital, Litoral e Interior'  },
];

/* ─── Marquee strip ──────────────────────────────────────────────────────── */
const MARQUEE = [
  'Mármore', 'Granito', 'Alto Padrão', 'São Paulo', 'Projetos Personalizados',
  'Bancadas', 'Pias', 'Pisos', 'Revestimentos', 'Painéis Esculpidos',
  'Mármore Carrara', 'Granito Negro', 'Travertino Romano',
];
const MARQUEE_STR = MARQUEE.join('  ·  ') + '  ·  ';

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay, yOffset = 20) => ({
    transition: `opacity 900ms ease, transform 900ms ease`,
    transitionDelay: show ? `${delay}ms` : '0ms',
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : `translateY(${yOffset}px)`,
  });

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">

      {/* ── Background layers ── */}

      {/* Marble texture de fundo — muito sutil */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity: 0.055, mixBlendMode: 'screen' }}>
        <img src="/images/marble-texture-1.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Subtle dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ghost "GG" behind everything */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-end pr-0 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-playfair font-bold leading-none text-white"
          style={{
            fontSize: 'clamp(8rem, 38vw, 42rem)',
            opacity: 0.018,
            letterSpacing: '-0.04em',
            transform: 'translateX(12%) translateY(8%)',
          }}
        >
          GG
        </span>
      </div>

      {/* Gold ambient glow — bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '55%',
          height: '55%',
          background: 'radial-gradient(ellipse at 0% 100%, rgba(201,169,110,0.09) 0%, transparent 65%)',
        }}
      />

      {/* Gold ambient glow — top-right */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '40%',
          height: '40%',
          background: 'radial-gradient(ellipse at 100% 0%, rgba(201,169,110,0.05) 0%, transparent 65%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-center w-full pt-20 sm:pt-24 pb-10">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-6 items-center">

            {/* Left vertical rule — desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:flex col-span-1 flex-col items-center self-stretch py-8 gap-3"
            >
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
              <p
                className="font-inter text-[9px] tracking-[0.35em] uppercase text-white/20 whitespace-nowrap"
                style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              >
                Genuíno Gran
              </p>
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
            </div>

            {/* ── Headline block ── */}
            <div className="col-span-1 lg:col-span-6 xl:col-span-7">

              {/* Pre-headline */}
              <div style={fade(150)} className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-px w-7 bg-gold" />
                <span className="font-inter text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-gold">
                  Pedras Naturais de Alto Padrão
                </span>
              </div>

              {/* Editorial headline */}
              <h1 style={fade(300)} className="mb-6 sm:mb-8">
                {/* Line 1 — huge display */}
                <span
                  className="block font-playfair font-light text-white leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.4rem, 8vw, 7rem)' }}
                >
                  Transforme
                </span>

                {/* Line 2 — smaller, Inter, muted */}
                <span
                  className="block font-inter font-light text-white/35 tracking-[0.1em] my-2 sm:my-3"
                  style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)' }}
                >
                  sua cozinha ou banheiro
                </span>

                {/* Line 3 — large Playfair + gold */}
                <span
                  className="block font-playfair font-semibold text-white leading-[0.95] tracking-tight"
                  style={{ fontSize: 'clamp(2.2rem, 6.5vw, 5.8rem)' }}
                >
                  com{' '}
                  <em
                    className="not-italic"
                    style={{ color: '#c9a96e' }}
                  >
                    mármore
                  </em>
                </span>

                {/* Line 4 */}
                <span
                  className="block font-playfair font-medium text-white/70 leading-[1.1] tracking-tight mt-1"
                  style={{ fontSize: 'clamp(1.5rem, 4.5vw, 4rem)' }}
                >
                  &amp; granito premium
                </span>
              </h1>

              {/* Divider */}
              <div style={fade(450)} className="flex items-center gap-5 mb-6 sm:mb-8" aria-hidden="true">
                <div className="h-px flex-1 max-w-[80px] bg-white/10" />
                <div className="w-1 h-1 rounded-full bg-gold/50" />
              </div>

              {/* Body copy */}
              <p
                style={fade(500)}
                className="font-inter text-[14px] text-white/40 leading-relaxed mb-8 sm:mb-10 max-w-sm"
              >
                Projetos sob medida com acabamento impecável para residências e
                comerciais em São Paulo, Litoral e Interior há mais de 14 anos.
              </p>

              {/* CTAs */}
              <div style={fade(650)} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-white/15 text-white/65 font-inter text-[11px] tracking-[0.22em] uppercase hover:border-[#25d366]/50 hover:text-[#25d366] transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z"/>
                  </svg>
                  Chamar no WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div style={fade(800)} className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
                {[
                  'Orçamento grátis em 24h',
                  '+4mil projetos entregues',
                  'SP, Litoral e Interior',
                ].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 font-inter text-[11px] text-white/35">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-gold/70 flex-shrink-0" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Marble orb — desktop only ── */}
            <div
              style={fade(200, 16)}
              className="hidden lg:flex col-span-5 xl:col-span-4 items-center justify-center"
            >
              <MarbleOrb />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="relative border-t border-white/[0.08]"
        style={{
          ...fade(900, 0),
          background: 'linear-gradient(180deg, #0e0e0e 0%, #0a0a0a 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="relative py-6 sm:py-8 px-4 sm:px-6 lg:px-10 flex flex-col gap-1.5 sm:gap-2 group"
              >
                {/* Separador vertical — no mobile só mostra para colunas direitas */}
                {i > 0 && (
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 sm:h-10 bg-white/[0.1] ${
                      i === 2 ? 'hidden sm:block' : ''
                    }`}
                    aria-hidden="true"
                  />
                )}

                {/* Top gold accent line */}
                <div className="w-5 sm:w-6 h-0.5 bg-gold/50 mb-1 group-hover:w-10 transition-all duration-400" aria-hidden="true" />

                {/* Number */}
                <span
                  className="font-playfair font-bold text-gold leading-none"
                  style={{ fontSize: 'clamp(1.9rem, 5vw, 3.8rem)' }}
                >
                  {s.value}
                </span>

                {/* Label */}
                <span className="font-inter text-[11px] sm:text-[13px] text-white/55 tracking-[0.04em] leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div
        className="overflow-hidden border-t border-white/[0.05] py-3 sm:py-3.5 bg-[#080808]"
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
