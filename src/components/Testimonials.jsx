import { useScrollAnimation } from '../hooks/useScrollAnimation';

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * DEPOIMENTOS — campos editáveis
 *
 * Cada objeto aceita:
 *   name      — Nome do cliente
 *   role      — Tipo de projeto · Bairro/Cidade   (ex.: "Cozinha · Alphaville, SP")
 *   quote     — Texto (3–5 frases ideal)
 *   rating    — 1 a 5 (estrelas)
 *   avatar    — Caminho da foto em /public/images/avatars/  ou  null para usar iniciais
 *   instagram — Handle (@usuario) ou null para ocultar
 *   verified  — true se o depoimento for confirmado/autorizado pelo cliente real
 *
 * COMO EDITAR:
 *   1. Substitua os valores hipotéticos pelos dados reais conforme os
 *      clientes autorizarem.
 *   2. Para adicionar foto: salve o arquivo em public/images/avatars/ e
 *      atualize o campo `avatar` com o caminho.
 *   3. Para remover um depoimento, apague o objeto inteiro do array.
 *
 * O depoimento da Larissa Peixoto é REAL (do briefing). Os outros 3 são
 * hipotéticos baseados nos perfis de cliente típicos da empresa
 * (Alphaville, Santana de Parnaíba, Cotia) — substitua pelos reais quando
 * tiver autorização.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const TESTIMONIALS = [
  {
    name: 'Larissa Peixoto',
    role: 'Cozinha completa · Sorocaba, SP',
    quote:
      'Fiz toda a minha cozinha com a Genuíno Gran em fevereiro de 2024 e posso dizer com tranquilidade que foi uma excelente escolha. Desde o primeiro contato, o atendimento foi extremamente atencioso e profissional. O Luiz Eduardo, responsável pela instalação, teve um cuidado fora do comum com cada detalhe — acabamento perfeito, tudo muito bem alinhado. Ficou exatamente como eu imaginei, ou até melhor.',
    rating: 5,
    avatar: null,
    instagram: null,
    verified: true,
  },
  {
    name: 'Marina Castro',                                   // ⇽ EDITAR
    role: 'Bancada de Cozinha · Alphaville, SP',             // ⇽ EDITAR
    quote:                                                    // ⇽ EDITAR
      'Reformei a cozinha inteira e a bancada de quartzo branco ficou impecável. Instalação rápida, no prazo combinado, e o acabamento é de primeira. Recebi várias visitas que elogiaram. Recomendo de olhos fechados.',
    rating: 5,                                                // ⇽ EDITAR (1–5)
    avatar: '/images/avatars/cliente-1.jpg',                  // ⇽ EDITAR
    instagram: '@marina.castro',                              // ⇽ EDITAR ou null
    verified: false,                                          // ⇽ true quando autorizado
  },
  {
    name: 'Rafael Andrade',                                   // ⇽ EDITAR
    role: 'Lavabo + Pia em Granito · Santana de Parnaíba',   // ⇽ EDITAR
    quote:
      'Procurei várias marmorarias e a Genuíno Gran cobriu o orçamento sem abrir mão da qualidade. Fizeram a pia esculpida em bloco único e o resultado superou expectativas. Equipe pontual e organizada, levaram menos tempo do que outras concorrentes.',
    rating: 5,
    avatar: '/images/avatars/cliente-2.jpg',
    instagram: '@rafael.andrade',
    verified: false,
  },
  {
    name: 'Camila Ribeiro',                                   // ⇽ EDITAR
    role: 'Bancada com Cooktop · Cotia, SP',                  // ⇽ EDITAR
    quote:
      'Atendimento excelente do começo ao fim. Eles fizeram a medição, mostraram opções de pedras e me ajudaram a escolher o material que combinava com o projeto. A bancada com cooktop ficou linda e a garantia de 5 anos passa muita segurança.',
    rating: 5,
    avatar: '/images/avatars/cliente-3.jpg',
    instagram: '@camila.ribeiro',
    verified: false,
  },
];

/* ─── UI helpers ─────────────────────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 14 14" className="w-3.5 h-3.5" aria-hidden="true">
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

function Avatar({ name, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={`Foto de ${name}`}
        loading="lazy"
        decoding="async"
        className="w-12 h-12 rounded-full object-cover border border-gold/30 flex-shrink-0"
      />
    );
  }
  // Fallback com iniciais (para depoimentos sem foto)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%)' }}
      aria-hidden="true"
    >
      <span className="font-playfair text-base text-gold/70 leading-none">{initials}</span>
    </div>
  );
}

function TestimonialCard({ t, delay, visible }) {
  return (
    <blockquote
      className={`flex flex-col p-7 sm:p-9 lg:p-10 border border-white/[0.07] hover:border-white/[0.14] transition-colors duration-400 fade-up delay-${delay} ${visible ? 'visible' : ''}`}
      style={{ background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' }}
    >
      {/* Quote mark + estrelas */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="font-playfair text-5xl text-gold/20 leading-none select-none" aria-hidden="true">"</span>
        <Stars rating={t.rating} />
      </div>

      {/* Texto */}
      <p className="font-playfair text-[16px] sm:text-[17px] text-white/75 leading-relaxed italic mb-7 flex-1">
        {t.quote}
      </p>

      {/* Footer: avatar + identidade */}
      <footer className="flex items-center gap-4 pt-5 border-t border-white/[0.06]">
        <Avatar name={t.name} src={t.avatar} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-inter text-[14px] font-medium text-white">{t.name}</p>
            {t.verified && (
              <span className="inline-flex items-center gap-1 font-inter text-[9px] tracking-[0.18em] uppercase text-gold/70" title="Depoimento verificado">
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M6 1l1.5 1L9.5 1.7l.8 1.8L12 4.5l-.7 1.8L12 8.1l-1.7.8-.8 1.8-2-.3L6 11l-1.5-.6-2 .3-.8-1.8L0 8.1l.7-1.8L0 4.5l1.7-.8L2.5 1.9 4.5 2 6 1z" stroke="currentColor" strokeWidth="0.9"/>
                  <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verificado
              </span>
            )}
          </div>
          <p className="font-inter text-[11px] text-gold/60 mt-0.5">{t.role}</p>
          {t.instagram && (
            <p className="font-inter text-[11px] text-white/35 mt-1 flex items-center gap-1.5">
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
                <rect x="1.5" y="1.5" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="0.9"/>
                <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="0.9"/>
                <circle cx="8.7" cy="3.3" r="0.5" fill="currentColor"/>
              </svg>
              {t.instagram}
            </p>
          )}
        </div>
      </footer>
    </blockquote>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [bodyRef, bodyVisible] = useScrollAnimation(0.08);

  const total = TESTIMONIALS.length;
  const avg =
    total > 0
      ? (TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / total).toFixed(1)
      : '0.0';

  return (
    <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Textura de mármore — muito sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.03, mixBlendMode: 'screen' }}
      >
        <img src="/images/marble-texture-2.jpg" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              O que dizem nossos clientes
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white title-accent">
              Depoimentos
            </h2>
          </div>

          {total > 0 && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-playfair text-3xl font-semibold text-gold leading-none">{avg}</p>
                <div className="mt-1.5 flex justify-end"><Stars rating={Math.round(avg)} /></div>
                <p className="font-inter text-[11px] text-white/30 mt-1.5">
                  {total} {total === 1 ? 'depoimento' : 'depoimentos'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Grid 2x2 no desktop, 1 col no mobile */}
        <div
          ref={bodyRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 fade-up ${bodyVisible ? 'visible' : ''}`}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i + 1} visible={bodyVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
