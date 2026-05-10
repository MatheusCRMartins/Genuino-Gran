import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { WA_URL } from '../config';

const STATS = [
  { value: '14', suffix: '+',    label: 'Anos de experiência' },
  { value: '4',  suffix: 'mil+', label: 'Projetos entregues' },
  { value: '5',  suffix: ' anos', label: 'De garantia' },
  { value: '0',  suffix: ' taxa', label: 'De deslocamento' },
];

export default function About() {
  const [photoRef, photoVisible] = useScrollAnimation(0.1);
  const [textRef,  textVisible]  = useScrollAnimation(0.12);

  return (
    <section
      id="sobre"
      className="relative py-20 sm:py-24 lg:py-32 bg-[#0a0a0a] overflow-x-hidden"
    >
      {/* Glows de fundo */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 90% 10%, rgba(201,169,110,0.07) 0%, transparent 50%)' }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 5% 90%, rgba(201,169,110,0.04) 0%, transparent 50%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 xl:gap-x-20 gap-y-16 items-start">

          {/* ── Coluna das fotos ────────────────────────────────────────── */}
          <div
            ref={photoRef}
            className={`order-2 lg:order-1 lg:col-span-5 relative fade-up ${photoVisible ? 'visible' : ''}`}
          >
            {/* Linha dourada vertical */}
            <div
              className="absolute top-0 left-0 w-px z-10 pointer-events-none"
              style={{ height: '110px', background: 'linear-gradient(to bottom, #c9a96e, transparent)' }}
              aria-hidden="true"
            />

            {/* Foto principal */}
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '3 / 4' }}>
              <img
                src="/images/antonio/antonio-1.jpg"
                alt="Antonio Roberto, fundador da Genuíno Gran, em exposição internacional de pedras naturais"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Vinheta interna suave */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 80px rgba(10,10,10,0.25)' }}
                aria-hidden="true"
              />
            </div>

            {/* Foto secundária — sobreposta no canto inferior direito */}
            <div
              className="absolute z-10 overflow-hidden border-[5px] border-[#0a0a0a] shadow-2xl"
              style={{
                width: 'clamp(160px, 45%, 240px)',
                aspectRatio: '3 / 4',
                bottom: '-24px',
                right: '-12px',
              }}
            >
              <img
                src="/images/antonio/antonio-2.jpg"
                alt="Antonio Roberto no salão internacional HLV Stones"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(201,169,110,0.3)' }}
                aria-hidden="true"
              />
            </div>

            {/* Spacer para compensar a foto sobreposta */}
            <div style={{ height: 'clamp(40px, 6vw, 56px)' }} />
          </div>

          {/* ── Coluna de texto ─────────────────────────────────────────── */}
          <div
            ref={textRef}
            className={`order-1 lg:order-2 lg:col-span-7 fade-up delay-2 ${textVisible ? 'visible' : ''}`}
          >
            <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Conheça nossa história
            </p>

            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-white title-accent mb-8 lg:mb-10">
              Da bancada do pai ao alto padrão de São Paulo
            </h2>

            <div className="flex flex-col gap-5 font-inter text-[15px] sm:text-[16px] text-white/65 leading-relaxed mb-8">
              <p>
                Filho de marmorista,{' '}
                <span className="text-white font-medium">Antonio Roberto</span>{' '}
                cresceu dentro do setor. Seus primeiros contatos com o trabalho
                foram ainda na infância, ajudando o pai no dia a dia da profissão.
              </p>
              <p>
                Com o tempo, o que era convivência virou interesse. E depois,
                especialização. Ao longo dos anos, aprofundou conhecimento,
                desenvolveu técnica e passou a atuar profissionalmente no segmento.
              </p>
              <p>
                Hoje, com{' '}
                <span className="text-gold font-medium">mais de 14 anos de experiência</span>{' '}
                e mais de 4 mil projetos entregues, a Genuíno Gran une tradição,
                prática e compromisso com qualidade em cada bancada, pia, piso ou painel.
              </p>
            </div>

            {/* Assinatura com foto real */}
            <div className="flex items-center gap-4 pb-8 border-b border-white/[0.08] mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gold/35 flex-shrink-0">
                <img
                  src="/images/antonio/antonio-1.jpg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 18%' }}
                />
              </div>
              <div>
                <p className="font-playfair text-lg sm:text-xl text-white leading-tight">
                  Antonio Roberto
                </p>
                <p className="font-inter text-[11px] tracking-[0.18em] uppercase text-gold/70 mt-0.5">
                  Fundador e Mestre Marmorista
                </p>
              </div>
            </div>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`group p-5 sm:p-6 border border-white/[0.07] hover:border-gold/30 transition-colors duration-300 delay-${i + 1}`}
                  style={{ background: 'linear-gradient(145deg, #111 0%, #0d0d0d 100%)' }}
                >
                  <div className="w-5 h-px bg-gold/50 mb-4 group-hover:w-10 transition-all duration-400" aria-hidden="true" />
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="font-playfair text-3xl sm:text-4xl font-semibold text-gold leading-none">
                      {s.value}
                    </span>
                    <span className="font-playfair text-lg sm:text-xl font-medium text-gold/70 leading-none">
                      {s.suffix}
                    </span>
                  </div>
                  <p className="font-inter text-[11px] sm:text-[12px] text-white/50 leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA WhatsApp */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 w-full p-5 sm:p-6 border border-gold/40 hover:bg-gold transition-all duration-300"
            >
              <div className="flex flex-col">
                <span className="font-inter text-[10px] tracking-[0.22em] uppercase text-gold group-hover:text-[#0a0a0a]/80 transition-colors">
                  Agenda 2026 aberta
                </span>
                <span className="font-playfair text-base sm:text-lg text-white group-hover:text-[#0a0a0a] mt-1 transition-colors">
                  Fale direto com nossa equipe
                </span>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gold group-hover:text-[#0a0a0a] flex-shrink-0 transition-colors"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
