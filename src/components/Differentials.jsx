import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ITEMS = [
  {
    num: '01',
    title: 'Acabamento Alto Padrão',
    description:
      'Em 14 anos, aprendemos que a perfeição está nos detalhes que a maioria nem nota. Cada peça sai daqui revisada e aprovada antes de ir pra sua casa.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path
          d="M14 2.5l2.8 8.2 8.7.2-7 5 2.6 8.3L14 19.5l-7.1 4.7 2.6-8.3-7-5 8.7-.2z"
          stroke="#c9a96e"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Entrega Rápida',
    description:
      'Combinamos um prazo e cumprimos. Bancadas em até 10 dias, projetos completos em 20. Sem enrolação e sem surpresa no final.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <circle cx="14" cy="14" r="11" stroke="#c9a96e" strokeWidth="1.4" />
        <path d="M14 8v6l4.5 2.5" stroke="#c9a96e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Valor Competitivo',
    description:
      'Trabalhamos direto com você, sem atravessadores. Nosso preço é justo e, se você trouxer um orçamento menor, a gente conversa. Qualidade não precisa custar absurdo.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M14 3v22M19 7.5h-7a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H8" stroke="#c9a96e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Garantia de 5 Anos',
    description:
      'Todo projeto tem 5 anos de garantia. Se aparecer qualquer problema nesse período, a gente resolve. É o nosso compromisso com você depois da entrega.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M14 2.5l9.5 3.5v8c0 5.5-4 10-9.5 12-5.5-2-9.5-6.5-9.5-12v-8L14 2.5z" stroke="#c9a96e" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9.5 14.5l3 3 6-6" stroke="#c9a96e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Differentials() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [gridRef, gridVisible] = useScrollAnimation(0.05);

  return (
    <section id="diferenciais" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden bg-[#0d0d0d]">
      {/* Textura de mármore — muito sutil, só adiciona grão orgânico */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.035, mixBlendMode: 'screen' }}
      >
        <img src="/images/marble-texture-1.jpg" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-12 lg:mb-20 fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
            Por que a Genuíno Gran
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white title-accent">
            O que nos diferencia
          </h2>
        </div>

        {/* ── Grid: 1 col em telas estreitas, 2x2 a partir de 480px ── */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 min-[480px]:grid-cols-2 border-t border-l border-white/[0.07] fade-up ${gridVisible ? 'visible' : ''}`}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.num}
              className={`relative group border-b border-r border-white/[0.07] p-6 sm:p-8 lg:p-14 overflow-hidden bg-[#0d0d0d] hover:bg-[#111] transition-colors duration-500 delay-${i + 1}`}
            >
              {/* Ghost number — decorativo */}
              <span
                className="absolute -top-2 -right-2 font-playfair font-bold text-white leading-none select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  opacity: 0.025,
                  transition: 'opacity 0.5s ease',
                }}
                aria-hidden="true"
              >
                {item.num}
              </span>

              {/* Gold accent line */}
              <div
                className="w-6 sm:w-8 h-px bg-gold/50 mb-5 sm:mb-8 group-hover:w-12 sm:group-hover:w-14 transition-all duration-500"
                aria-hidden="true"
              />

              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/[0.1] flex items-center justify-center mb-4 sm:mb-6 group-hover:border-gold/30 transition-colors duration-300">
                {item.icon}
              </div>

              {/* Número + título */}
              <div className="mb-3 sm:mb-4">
                <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold/50 block mb-1.5 sm:mb-2">
                  {item.num}
                </span>
                <h3 className="font-playfair text-lg sm:text-xl lg:text-2xl font-medium text-white leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="font-inter text-[13px] sm:text-[14px] text-white/45 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
