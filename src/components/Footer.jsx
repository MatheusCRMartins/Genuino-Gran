import { LogoMark, LogoWordmark } from './Logo';
import { WA_URL, BUSINESS, SOCIAL } from '../config';

const NAV = [
  ['#portfolio',    'Portfólio'],
  ['#servicos',     'Serviços'],
  ['#diferenciais', 'Diferenciais'],
  ['#sobre',        'Sobre'],
  ['#contato',      'Contato'],
];

/* ─── Pre-footer CTA band ────────────────────────────────────────────────── */
function PreFooter() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #111 0%, #0e0e0e 100%)' }}
    >
      {/* Ghost text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-playfair font-bold text-white leading-none"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)', opacity: 0.02, transform: 'translateX(5%)' }}
        >
          GG
        </span>
      </div>

      {/* Gold ambient glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: '50%', height: '100%', background: 'radial-gradient(ellipse at 0% 100%, rgba(201,169,110,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-5 sm:mb-6">
            Quer transformar seu ambiente?
          </p>
          <h2 className="font-playfair text-3xl md:text-5xl font-medium text-white leading-tight mb-6 sm:mb-8">
            Seu projeto de mármore{' '}
            <em className="not-italic text-gold">começa com uma conversa</em>
          </h2>
          <p className="font-inter text-[14px] sm:text-[15px] text-white/45 leading-relaxed mb-8 sm:mb-10 max-w-xl">
            Manda uma mensagem e a gente já começa a entender o que você precisa. Atendemos todos os dias e respondemos rápido.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 bg-gold text-[#0a0a0a] font-inter font-semibold text-[11px] tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Solicitar orçamento gratuito
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 border border-white/15 text-white/65 font-inter text-[11px] tracking-[0.22em] uppercase hover:border-white/35 hover:text-white transition-all duration-300"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <PreFooter />

      {/* Main footer */}
      <div className="border-t border-white/[0.07] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 sm:pt-14 pb-8">

          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10 sm:mb-12">

            {/* Brand — 5 cols */}
            <div className="md:col-span-5">
              <a href="#" className="flex items-center gap-3 mb-5 sm:mb-6" aria-label="Genuíno Gran">
                <LogoMark className="h-9 w-auto flex-shrink-0" color="white" />
                <div className="leading-none">
                  <LogoWordmark className="h-[13px] w-auto" color="white" />
                  <p className="font-inter text-[9px] tracking-[0.22em] uppercase text-gold mt-1.5">
                    Mármore &amp; Granito
                  </p>
                </div>
              </a>
              <p className="font-inter text-[13px] text-white/35 leading-relaxed max-w-xs">
                Pedras naturais de alto padrão para projetos residenciais e comerciais. Mais de 14 anos transformando espaços em São Paulo, Litoral e Interior.
              </p>

              {/* Redes sociais */}
              <div className="flex items-center gap-3 mt-5">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Genuíno Gran"
                  className="w-9 h-9 border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Genuíno Gran"
                  className="w-9 h-9 border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.4H8v3h2.5V21h3z"/>
                  </svg>
                </a>
                <a
                  href={SOCIAL.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Genuíno Gran no Google"
                  className="w-9 h-9 border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M12 2l2.4 7.2H22l-6.2 4.5L18.2 21 12 16.5 5.8 21l2.4-7.3L2 9.2h7.6L12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav + Contact — mobile: side by side. Desktop: separate columns */}
            <div className="grid grid-cols-2 md:contents gap-8">
              {/* Nav — 3 cols */}
              <div className="md:col-span-3 md:col-start-7">
                <p className="font-inter text-[9px] tracking-[0.28em] uppercase text-white/25 mb-4 sm:mb-5">
                  Navegação
                </p>
                <ul className="flex flex-col gap-3.5" role="list">
                  {NAV.map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="font-inter text-[13px] text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" aria-hidden="true" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact — 4 cols */}
              <div className="md:col-span-4 md:col-start-10">
                <p className="font-inter text-[9px] tracking-[0.28em] uppercase text-white/25 mb-4 sm:mb-5">
                  Contato
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-[13px] text-white/40 hover:text-gold transition-colors duration-200 flex items-center gap-2.5"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold/40 flex-shrink-0" aria-hidden="true">
                      <path d="M13.5 10.2c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2C4.7 2.1 4.4 2.1 4.3 2.1h-.6c-.2 0-.5.1-.8.4C2.7 2.8 2 3.5 2 4.9c0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.2z" stroke="currentColor" strokeWidth="0.8"/>
                    </svg>
                    {BUSINESS.phone}
                  </a>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="font-inter text-[13px] text-white/40 hover:text-gold transition-colors duration-200 flex items-center gap-2.5 break-all"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold/40 flex-shrink-0" aria-hidden="true">
                      <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M2.5 4.5L8 8.5l5.5-4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
                    </svg>
                    {BUSINESS.email}
                  </a>
                  <p className="font-inter text-[13px] text-white/40 flex items-center gap-2.5">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold/40 flex-shrink-0" aria-hidden="true">
                      <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6C12.5 3.5 10.5 1.5 8 1.5zM8 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" stroke="currentColor" strokeWidth="0.8"/>
                    </svg>
                    {BUSINESS.city}
                  </p>
                  <p className="font-inter text-[13px] text-white/40 flex items-center gap-2.5">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold/40 flex-shrink-0" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
                    </svg>
                    {BUSINESS.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="font-inter text-[11px] text-white/20 tracking-wide">
              © {year} Genuíno Gran. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-gold/20" aria-hidden="true" />
              <p className="font-inter text-[11px] text-white/15 tracking-[0.15em] uppercase">
                Mármore &amp; Granito · São Paulo, SP
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
