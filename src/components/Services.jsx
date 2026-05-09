import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SERVICES = [
  {
    num: '01',
    title: 'Pias e Bancadas de Cozinha',
    description:
      'Feitas especialmente para o seu espaço, em quartzo, mármore, granito ou quartzito. A cuba pode ser gourmet ou esculpida em bloco único. Cada detalhe pensado pra combinar com o que você tem em mente.',
    tag: 'Mais pedido',
    timeline: 'Entrega em até 10 dias',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect x="3" y="25" width="34" height="5" rx="1" stroke="#c9a96e" strokeWidth="1.6" />
        <rect x="7" y="9" width="26" height="16" rx="1" stroke="#c9a96e" strokeWidth="1.6" />
        <line x1="12" y1="30" x2="12" y2="37" stroke="#c9a96e" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="28" y1="30" x2="28" y2="37" stroke="#c9a96e" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="20" cy="17" r="4" stroke="#c9a96e" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Pias e Lavatórios de Banheiro',
    description:
      'Cada cuba é esculpida em bloco único de pedra natural. Você escolhe o estilo, nós garantimos que encaixe perfeitamente com a bancada e o ambiente.',
    tag: 'Bloco único',
    timeline: 'Entrega em até 10 dias',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M7 17h26v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V17z" stroke="#c9a96e" strokeWidth="1.6" />
        <path d="M3 17h34" stroke="#c9a96e" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 30v5" stroke="#c9a96e" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M17 7v6a3 3 0 0 0 6 0V7" stroke="#c9a96e" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 7V4" stroke="#c9a96e" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Pisos e Revestimentos',
    description:
      'Travertino, mármore, granito, ardósia. Cortamos e instalamos em ambientes internos e externos, com precisão em cada junta e atenção ao rejunte e nivelamento.',
    tag: 'Interno e externo',
    timeline: 'Projeto completo em até 20 dias',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect x="4"  y="4"  width="14" height="14" rx="0.8" stroke="#c9a96e" strokeWidth="1.6" />
        <rect x="22" y="4"  width="14" height="14" rx="0.8" stroke="#c9a96e" strokeWidth="1.6" />
        <rect x="4"  y="22" width="14" height="14" rx="0.8" stroke="#c9a96e" strokeWidth="1.6" />
        <rect x="22" y="22" width="14" height="14" rx="0.8" stroke="#c9a96e" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Painéis Esculpidos',
    description:
      'Para quem quer transformar uma parede em algo que as pessoas param pra admirar. Painéis, frisos, molduras e esculturas em mármore ou granito, do projeto à instalação.',
    tag: 'Sob medida',
    timeline: 'Projeto completo em até 20 dias',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect x="4" y="4" width="32" height="32" rx="1.5" stroke="#c9a96e" strokeWidth="1.6" />
        <path
          d="M11 29 Q16 16 20 23 Q24 30 29 12"
          stroke="#c9a96e"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="11" cy="29" r="1.5" fill="#c9a96e" />
        <circle cx="29" cy="12" r="1.5" fill="#c9a96e" />
      </svg>
    ),
  },
];

export default function Services() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [listRef, listVisible] = useScrollAnimation(0.06);

  return (
    <section id="servicos" className="py-20 sm:py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-12 lg:mb-20 fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
            Como podemos te ajudar
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-4">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white title-accent">
              O que fazemos
            </h2>
            <p className="font-inter text-[13px] text-white/35 lg:max-w-sm leading-relaxed">
              A gente não copia projeto. Cada ambiente recebe atenção e cuidado do início ao fim.
            </p>
          </div>
        </div>

        {/* ── Linhas de serviço ── */}
        <div ref={listRef} className="divide-y divide-white/[0.07]">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className={`group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-8 sm:py-10 lg:py-12 cursor-default hover:bg-white/[0.015] transition-colors duration-300 -mx-4 px-4 fade-up delay-${i + 1} ${listVisible ? 'visible' : ''}`}
            >
              {/* Mobile: número + ícone em linha. Desktop: itens separados via sm:contents */}
              <div className="flex items-center gap-4 sm:contents">
                <span className="font-playfair text-4xl sm:text-5xl font-light text-gold/20 leading-none sm:w-16 flex-shrink-0 group-hover:text-gold/35 transition-colors duration-300">
                  {s.num}
                </span>
                <div className="w-12 h-12 border border-white/[0.09] flex items-center justify-center flex-shrink-0 group-hover:border-gold/30 transition-colors duration-300">
                  {s.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <h3 className="font-playfair text-xl sm:text-2xl font-medium text-white">
                    {s.title}
                  </h3>
                  {s.tag && (
                    <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-gold border border-gold/40 px-2 py-1 flex-shrink-0">
                      {s.tag}
                    </span>
                  )}
                </div>
                <p className="font-inter text-[14px] text-white/45 leading-relaxed max-w-2xl">
                  {s.description}
                </p>
                {s.timeline && (
                  <p className="font-inter text-[10px] tracking-[0.22em] uppercase text-gold/70 mt-3 flex items-center gap-2">
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                      <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    {s.timeline}
                  </p>
                )}
              </div>

              {/* Arrow CTA — desktop only */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <a
                  href="#contato"
                  className="font-inter text-[11px] tracking-[0.2em] uppercase text-gold whitespace-nowrap"
                >
                  Solicitar
                </a>
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-gold" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 fade-up delay-5 ${listVisible ? 'visible' : ''}`}>
          <div>
            <p className="font-playfair text-xl text-white/60 italic">
              Todos os projetos com 5 anos de garantia.
            </p>
            <p className="font-inter text-[12px] text-white/30 mt-1">
              Não encontrou o que procura? Fale com a nossa equipe.
            </p>
          </div>
          <a
            href="#contato"
            className="inline-flex items-center gap-3 px-7 py-3.5 border border-gold/50 text-gold font-inter text-[11px] tracking-[0.2em] uppercase hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
          >
            Fale com nossa equipe
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
