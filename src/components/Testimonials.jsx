import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SOCIAL } from '../config';

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DEPOIMENTOS REAIS
 *
 * Campos:
 *   name         — Nome completo do cliente
 *   role         — Contexto  (ex.: "Cozinha · Alphaville, SP")
 *   quote        — Texto do depoimento
 *   rating       — 1 a 5
 *   avatar       — Caminho em /public/images/avatars/  ou  null para iniciais
 *   googleReview — true = card clicável que abre o Google para verificação
 *   date         — Data da avaliação (ex.: "março de 2024")
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  SUBSTITUA os campos marcados com "← EDITAR" pelos dados reais do Google.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const TESTIMONIALS = [
  {
    name: 'Larissa Peixoto',
    role: 'Cozinha completa · Sorocaba, SP',
    quote:
      'Fiz toda a minha cozinha com a Genuíno Gran em fevereiro de 2024 e posso dizer com tranquilidade que foi uma excelente escolha. Desde o primeiro contato, o atendimento foi extremamente atencioso e profissional. O Luiz Eduardo, responsável pela instalação, teve um cuidado fora do comum com cada detalhe. Ficou exatamente como eu imaginei, ou até melhor.',
    rating: 5,
    avatar: null,
    googleReview: true,
    date: 'fevereiro de 2024',
  },
  {
    name: '← Nome do cliente',        // ← EDITAR com o nome real do Google
    role: '← Tipo · Cidade, SP',      // ← EDITAR
    quote:
      '← Cole aqui o texto exato da avaliação do Google.',  // ← EDITAR
    rating: 5,
    avatar: null,
    googleReview: true,
    date: '← mês e ano',              // ← EDITAR
  },
];

/* ─── Google logo SVG ────────────────────────────────────────────────────── */
function GoogleLogo({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

/* ─── Stars ──────────────────────────────────────────────────────────────── */
function Stars({ rating, size = 'sm' }) {
  const dim = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 14 14" className={dim} aria-hidden="true">
          <path
            d="M7 1l1.6 4.2H13l-3.5 2.6 1.3 4.2L7 9.6l-3.8 2.4 1.3-4.2L1 5.2h4.4z"
            fill={i < rating ? '#c9a96e' : 'none'}
            stroke="#c9a96e"
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </div>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────────────────── */
function Avatar({ name, src }) {
  if (src) {
    return (
      <img src={src} alt={`Foto de ${name}`} loading="lazy"
        className="w-11 h-11 rounded-full object-cover border border-white/10 flex-shrink-0" />
    );
  }
  const initials = name.replace('← ', '').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%)' }}>
      <span className="font-playfair text-sm text-gold/60 leading-none">{initials}</span>
    </div>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
function TestimonialCard({ t, delay, visible }) {
  const isPlaceholder = t.name.startsWith('←');

  const inner = (
    <>
      {/* Header: estrelas + badge Google */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <Stars rating={t.rating} />
        {t.googleReview && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <GoogleLogo size={14} />
            <span className="font-inter text-[10px] text-white/40 tracking-wide">Google</span>
          </div>
        )}
      </div>

      {/* Texto */}
      <p className={`font-inter text-[14px] sm:text-[15px] leading-relaxed mb-6 flex-1 ${isPlaceholder ? 'text-white/25 italic' : 'text-white/70'}`}>
        {isPlaceholder ? 'Avaliação real do Google — cole o texto aqui.' : `"${t.quote}"`}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <Avatar name={t.name} src={t.avatar} />
        <div className="flex-1 min-w-0">
          <p className={`font-inter text-[13px] font-medium leading-tight ${isPlaceholder ? 'text-white/25' : 'text-white'}`}>
            {isPlaceholder ? 'Nome do cliente' : t.name}
          </p>
          <p className="font-inter text-[11px] text-gold/55 mt-0.5">{isPlaceholder ? 'Tipo · Cidade, SP' : t.role}</p>
          {t.date && !isPlaceholder && (
            <p className="font-inter text-[10px] text-white/25 mt-0.5">{t.date}</p>
          )}
        </div>
        {t.googleReview && !isPlaceholder && (
          <div className="flex-shrink-0">
            <span className="font-inter text-[9px] tracking-[0.18em] uppercase text-gold/50 flex items-center gap-1">
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M6 1l1.5 1L9.5 1.7l.8 1.8L12 4.5l-.7 1.8L12 8.1l-1.7.8-.8 1.8-2-.3L6 11l-1.5-.6-2 .3-.8-1.8L0 8.1l.7-1.8L0 4.5l1.7-.8L2.5 1.9 4.5 2 6 1z" stroke="currentColor" strokeWidth="0.9"/>
                <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verificado
            </span>
          </div>
        )}
      </div>

      {/* "Ver no Google" hint */}
      {t.googleReview && !isPlaceholder && (
        <div className="mt-3 flex items-center gap-1.5 text-white/20 group-hover:text-gold/50 transition-colors duration-300">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M7 1h4v4M11 1L5 7M3 3H1v8h8V9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-inter text-[9px] tracking-[0.15em] uppercase">Ver no Google</span>
        </div>
      )}
    </>
  );

  const baseClass = `group flex flex-col p-6 sm:p-8 border transition-all duration-300 fade-up delay-${delay} ${visible ? 'visible' : ''}`;
  const style = { background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' };

  if (t.googleReview && !isPlaceholder) {
    return (
      <a
        href={SOCIAL.google}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} border-white/[0.07] hover:border-gold/25 cursor-pointer`}
        style={style}
        aria-label={`Avaliação de ${t.name} no Google — clique para verificar`}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={`${baseClass} border-white/[0.07]`} style={style}>
      {inner}
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [bodyRef,   bodyVisible]   = useScrollAnimation(0.08);

  const realReviews = TESTIMONIALS.filter(t => !t.name.startsWith('←'));
  const avg = realReviews.length > 0
    ? (realReviews.reduce((s, t) => s + t.rating, 0) / realReviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Textura sutil */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.03, mixBlendMode: 'screen' }}>
        <img src="/images/marble-texture-2.jpg" alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              O que dizem sobre nós
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white title-accent">
              Quem já viveu a experiência
            </h2>
          </div>

          {/* Badge Google */}
          <a
            href={SOCIAL.google}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-5 py-4 border border-white/[0.07] hover:border-gold/25 transition-colors duration-300 lg:self-end"
            style={{ background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' }}
            aria-label="Ver avaliações no Google"
          >
            <GoogleLogo size={28} />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-playfair text-2xl font-semibold text-gold leading-none">{avg}</span>
                <Stars rating={5} />
              </div>
              <p className="font-inter text-[11px] text-white/35 mt-1">
                Avaliação no Google · clique para verificar
              </p>
            </div>
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/20 group-hover:text-gold/50 transition-colors ml-1" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div
          ref={bodyRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 fade-up ${bodyVisible ? 'visible' : ''}`}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name + i} t={t} delay={i + 1} visible={bodyVisible} />
          ))}
        </div>

        {/* CTA ver todos no Google */}
        <div className={`mt-8 flex justify-center fade-up delay-3 ${bodyVisible ? 'visible' : ''}`}>
          <a
            href={SOCIAL.google}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 font-inter text-[12px] tracking-[0.18em] uppercase text-white/30 hover:text-gold transition-colors duration-300"
          >
            <GoogleLogo size={14} />
            Ver todas as avaliações no Google
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
