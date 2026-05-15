import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogoMark, LogoWordmark } from '../components/Logo';
import { BUSINESS, TRACKING, SOCIAL } from '../config';

// ── Utilitários globais da LP ──────────────────────────────────────────────────

// A) Lê ?material= da URL e valida. Fallback: 'mármore'.
function useMaterial() {
  const VALID = ['mármore', 'granito', 'quartzo', 'quartzito'];
  const raw = new URLSearchParams(window.location.search).get('material') ?? '';
  const m = raw.toLowerCase().trim();
  return VALID.includes(m) ? m : 'mármore';
}

// B) Gera link WA com mensagem pré-preenchida por material.
function waUrlFor(material) {
  const msg = `Olá! Vim pelo site e gostaria de um orçamento de bancada em ${material}.\nCidade: \nMetragem aproximada: `;
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// F) Push no dataLayer (compatível com Google Tag Manager).
function pushDL(event, extra = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...extra });
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z" />
  </svg>
);

const SELECT_BASE =
  'w-full bg-white/[0.04] border border-white/15 text-white font-inter text-sm px-4 py-3.5 focus:border-gold focus:outline-none transition-colors cursor-pointer appearance-none';

const SELECT_ARROW = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23c9a96e' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  backgroundSize: '16px',
};

// ── D + E) Lead Form — com novos campos e redirect para /obrigado ──────────────
function LeadForm({ id = 'lead-form', material }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cidade, setCidade] = useState('');
  const [metragem, setMetragem] = useState('');
  const [prazo, setPrazo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || nome.trim().length < 2) { setError('Informe seu nome completo.'); return; }
    const digits = whatsapp.replace(/\D/g, '');
    if (!digits || digits.length < 10) { setError('WhatsApp inválido — inclua o DDD.'); return; }
    if (!cidade) { setError('Selecione sua cidade.'); return; }
    if (!metragem) { setError('Informe a metragem aproximada.'); return; }
    if (!prazo) { setError('Informe o prazo desejado.'); return; }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`https://formspree.io/f/${TRACKING.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nome: nome,
          WhatsApp: whatsapp,
          Cidade: cidade,
          'Metragem aproximada': metragem,
          Prazo: prazo,
          Material: material,
          Origem: 'LP /orcamento',
        }),
      });

      if (res.ok) {
        // F) DataLayer — envio de formulário
        pushDL('envio_formulario', { material, cidade });
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lp_orcamento', material });
        }
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
        }
        // E) Redireciona para /obrigado preservando UTMs e outros params (I)
        navigate('/orcamento/obrigado' + location.search);
      } else {
        setError('Erro ao enviar. Fale direto pelo WhatsApp.');
      }
    } catch {
      setError('Erro de conexão. Fale direto pelo WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Campos existentes */}
      <input
        type="text"
        placeholder="Seu nome completo"
        value={nome}
        onChange={(e) => { setNome(e.target.value); setError(''); }}
        autoComplete="name"
        className="w-full bg-white/[0.04] border border-white/15 text-white placeholder-white/25 font-inter text-sm px-4 py-3.5 focus:border-gold focus:outline-none transition-colors"
      />
      <input
        type="tel"
        placeholder="WhatsApp com DDD — (11) 9 9999-9999"
        value={whatsapp}
        onChange={(e) => { setWhatsapp(e.target.value); setError(''); }}
        inputMode="tel"
        autoComplete="tel"
        className="w-full bg-white/[0.04] border border-white/15 text-white placeholder-white/25 font-inter text-sm px-4 py-3.5 focus:border-gold focus:outline-none transition-colors"
      />

      {/* D) Novos campos obrigatórios */}
      <select
        value={cidade}
        onChange={(e) => { setCidade(e.target.value); setError(''); }}
        required
        className={SELECT_BASE}
        style={{ ...SELECT_ARROW, color: cidade ? '#fff' : 'rgba(255,255,255,0.25)' }}
      >
        <option value="" disabled>Sua cidade *</option>
        {['São Paulo capital','Osasco','Barueri','Alphaville','Santana de Parnaíba','Cotia','Sorocaba','Jundiaí','Litoral','Interior','Outra'].map(c => (
          <option key={c} value={c} style={{ color: '#000', background: '#fff' }}>{c}</option>
        ))}
      </select>

      <select
        value={metragem}
        onChange={(e) => { setMetragem(e.target.value); setError(''); }}
        required
        className={SELECT_BASE}
        style={{ ...SELECT_ARROW, color: metragem ? '#fff' : 'rgba(255,255,255,0.25)' }}
      >
        <option value="" disabled>Metragem aproximada *</option>
        {['Até 2m²','2 a 4m²','4 a 6m²','Acima de 6m²','Não sei informar'].map(m => (
          <option key={m} value={m} style={{ color: '#000', background: '#fff' }}>{m}</option>
        ))}
      </select>

      <select
        value={prazo}
        onChange={(e) => { setPrazo(e.target.value); setError(''); }}
        required
        className={SELECT_BASE}
        style={{ ...SELECT_ARROW, color: prazo ? '#fff' : 'rgba(255,255,255,0.25)' }}
      >
        <option value="" disabled>Prazo desejado *</option>
        {['Nas próximas 2 semanas','Neste mês','Em até 3 meses','Ainda pesquisando'].map(p => (
          <option key={p} value={p} style={{ color: '#000', background: '#fff' }}>{p}</option>
        ))}
      </select>

      {error && <p className="font-inter text-xs text-red-400/80">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-gold text-[#0a0a0a] font-inter font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold-light disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? 'Enviando...' : (
          <>
            Quero meu orçamento gratuito
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
      <p className="font-inter text-[11px] text-white/25 text-center leading-relaxed">
        Respondemos em até 2 minutos · Seus dados não são compartilhados.{' '}
        <Link to="/politica-de-privacidade" className="underline underline-offset-2 hover:text-white/45 transition-colors">
          Privacidade
        </Link>
      </p>
    </form>
  );
}

// ── LP Header — logo desliza esquerda → centro sincronizada com StickyBar ──────
function LPHeader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setProgress(Math.min(window.scrollY / 380, 1));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoLeft = `calc(${24 * (1 - progress)}px + ${progress * 50}%)`;
  const logoTranslate = `translateX(-${progress * 50}%)`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.08]">
      <Link
        to="/"
        aria-label="Genuíno Gran"
        className="absolute top-1/2 flex items-center gap-3"
        style={{ left: logoLeft, transform: `${logoTranslate} translateY(-50%)` }}
      >
        <LogoMark className="h-9 w-auto flex-shrink-0" color="white" />
        <div className="leading-none">
          <LogoWordmark className="h-[13px] w-auto" color="white" />
          <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-gold mt-1.5">
            Mármore &amp; Granito
          </p>
        </div>
      </Link>
    </header>
  );
}

// ── C) Botão flutuante desktop — sempre visível, canto inferior direito ─────────
function FloatingWA({ material }) {
  return (
    <a
      href={waUrlFor(material)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale no WhatsApp"
      className="hidden lg:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25d366] items-center justify-center hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300"
      style={{ boxShadow: '0 6px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.3)' }}
      onClick={() => pushDL('clique_whatsapp', { material, origem: 'floating' })}
    >
      <span className="absolute inset-0 rounded-full bg-[#25d366]/40 animate-ping" aria-hidden="true" />
      <span className="relative w-6 h-6 text-white">{WA_ICON}</span>
    </a>
  );
}

// ── Sticky Bar — mobile only, aparece após 380px ───────────────────────────────
function StickyBar({ material }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!visible}
    >
      <div
        className="flex border-t border-white/10"
        style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(12px)' }}
      >
        <a
          href={waUrlFor(material)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25d366] text-white font-inter font-semibold text-sm"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }}
          onClick={() => pushDL('clique_whatsapp', { material, origem: 'sticky_bar' })}
        >
          <span className="w-5 h-5 text-white flex-shrink-0">{WA_ICON}</span>
          WhatsApp
        </a>
        <a
          href="#orcamento"
          className="flex-1 flex items-center justify-center gap-2 py-4 border-l border-white/[0.08] text-gold font-inter text-sm font-medium hover:bg-gold/5 transition-colors"
        >
          Orçamento grátis
        </a>
      </div>
    </div>
  );
}

// ── Hero — A) material dinâmico + B) WA pré-preenchido + F) dataLayer ─────────
function Hero({ material }) {
  return (
    <section className="relative pt-[68px] min-h-[100svh] lg:min-h-screen flex flex-col lg:flex-row lg:items-center bg-[#0a0a0a] overflow-hidden">

      {/* Mobile: imagem banner superior protagonista */}
      <div
        className="lg:hidden relative w-full overflow-hidden"
        style={{ height: '48vh', minHeight: '340px' }}
      >
        <img
          src="/images/portfolio/cozinha-quartzo-pendentes.jpg"
          alt={`Bancada de cozinha em ${material} — projeto Genuíno Gran`}
          className="w-full h-full object-cover object-center hero-fade-in"
          loading="eager"
          fetchpriority="high"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ boxShadow: 'inset 0 -60px 60px -10px rgba(10,10,10,0.92), inset 0 0 120px rgba(10,10,10,0.4)' }}
        />
        <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a]/85 backdrop-blur-sm border border-gold/25">
          <div className="flex gap-0.5" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 12 12" fill="#c9a96e" className="w-2.5 h-2.5">
                <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 2.5 10.5l.5-3.5L.5 4.5 4 4z" />
              </svg>
            ))}
          </div>
          <span className="font-inter text-[10px] tracking-wide text-white/85">5.0 Google</span>
        </div>
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <div className="w-4 h-px bg-gold/60" aria-hidden="true" />
          <span className="font-inter text-[10px] tracking-[0.15em] uppercase text-white/70">
            Projeto realizado · Alphaville, SP
          </span>
        </div>
      </div>

      {/* Glow ambient desktop */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 10% 50%, rgba(201,169,110,0.08) 0%, transparent 55%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="pt-6 pb-8 lg:py-24">
            <div className="hero-line-1 flex items-center gap-3 mb-5 lg:mb-8">
              <div className="w-8 h-px bg-gold" aria-hidden="true" />
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold">
                Agenda 2026 · 14 anos em SP
              </span>
            </div>

            {/* A) Material dinâmico no H1 */}
            <h1 className="hero-line-2 font-playfair text-white leading-[1.05] tracking-tight mb-5 lg:mb-9">
              <span className="block font-light text-[2.3rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
                Bancada de cozinha
              </span>
              <span className="block font-medium text-[2.3rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
                em <em className="not-italic text-gold">{material}</em>
              </span>
              <span className="block font-light text-[1.3rem] sm:text-2xl lg:text-[1.6rem] text-white/65 mt-2 sm:mt-3 tracking-wide">
                sob medida — entrega em <span className="text-white font-medium">10 dias</span>
              </span>
            </h1>

            <div className="hero-line-3 inline-flex items-center gap-2.5 mb-5 px-3.5 py-2 bg-[#25d366]/10 border border-[#25d366]/30">
              <span
                className="w-2 h-2 rounded-full bg-[#25d366] flex-shrink-0"
                style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
                aria-hidden="true"
              />
              <p className="font-inter text-[12px] text-white/85 leading-none">
                Resposta em <strong className="text-white font-semibold">2 minutos</strong> · Sem taxa de visita
              </p>
            </div>

            {/* B + F) CTAs com WA pré-preenchido e dataLayer */}
            <div className="hero-line-4 flex flex-col gap-3">
              <a
                href={waUrlFor(material)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 py-[18px] bg-[#25d366] text-white font-inter font-semibold text-[14px] tracking-wide hover:brightness-110 active:scale-[0.99] transition-all"
                style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.35), 0 2px 8px rgba(37,211,102,0.2)' }}
                onClick={() => pushDL('clique_whatsapp', { material, origem: 'hero' })}
              >
                <span className="w-5 h-5 flex-shrink-0 text-white">{WA_ICON}</span>
                Chamar no WhatsApp agora
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#orcamento"
                className="group flex items-center justify-center gap-2 py-4 border-[1.5px] border-gold/70 bg-gold/[0.04] text-gold hover:bg-gold hover:text-[#0a0a0a] font-inter text-[13px] tracking-wider uppercase font-medium transition-all duration-300"
              >
                Solicitar orçamento por escrito
              </a>
            </div>

            <div className="lg:hidden flex justify-center mt-7">
              <a
                href="#orcamento"
                aria-label="Ver mais conteúdo"
                className="hero-scroll-hint flex flex-col items-center gap-1.5 text-white/30 hover:text-gold transition-colors"
              >
                <span className="font-inter text-[9px] tracking-[0.3em] uppercase">Saiba mais</span>
                <svg viewBox="0 0 12 16" fill="none" className="w-3 h-4" aria-hidden="true">
                  <path d="M6 2v10M2 9l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Imagem desktop */}
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img
                src="/images/portfolio/cozinha-quartzo-pendentes.jpg"
                alt={`Bancada de cozinha em ${material} — projeto Genuíno Gran`}
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{ boxShadow: 'inset 0 0 100px rgba(10,10,10,0.35)' }}
              />
              <div
                className="absolute top-0 left-0 w-px"
                style={{ height: '120px', background: 'linear-gradient(to bottom, #c9a96e, transparent)' }}
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 right-6 px-5 py-4 bg-[#0a0a0a]/92 backdrop-blur-sm border border-gold/20">
                <div className="flex items-start gap-3">
                  <img
                    src="/images/avatars/cliente-1.jpg"
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full object-cover border border-gold/30 flex-shrink-0"
                    loading="eager"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-0.5 mb-1.5" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox="0 0 12 12" fill="#c9a96e" className="w-3 h-3">
                          <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 2.5 10.5l.5-3.5L.5 4.5 4 4z" />
                        </svg>
                      ))}
                    </div>
                    <p className="font-playfair text-[15px] text-white leading-snug italic">"Acabamento perfeito."</p>
                    <p className="font-inter text-[10px] text-white/40 mt-1">Larissa P. · Sorocaba</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Social Proof Bar ───────────────────────────────────────────────────────────
function SocialProof() {
  const items = [
    { label: '★ 5.0 no Google' },
    { label: '+4.000 projetos entregues' },
    { label: '14 anos no mercado' },
    { label: 'Garantia de 5 anos' },
    { label: 'Sem taxa de deslocamento' },
  ];
  return (
    <div className="border-y border-white/[0.07] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-10 lg:gap-x-14">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="hidden lg:block w-px h-3.5 bg-white/[0.1]" aria-hidden="true" />}
              <span className="font-inter text-[12px] sm:text-[13px] text-white/45">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Gallery Strip — mobile only ────────────────────────────────────────────────
const GALLERY = [
  { src: '/images/portfolio/cozinha-quartzo-pendentes.jpg', label: 'Cozinha em quartzo branco' },
  { src: '/images/portfolio/cozinha-bancada-preta.jpg',     label: 'Granito preto absoluto' },
  { src: '/images/portfolio/banheiro-bancada-marmore.jpg',  label: 'Banheiro em mármore' },
  { src: '/images/portfolio/cozinha-quartzo-inox.jpg',      label: 'Cozinha com inox' },
  { src: '/images/portfolio/painel-marmore-penteadeira.jpg', label: 'Painel esculpido' },
];

function MobileGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let best = { ratio: 0, idx: 0 };
        entries.forEach((e) => {
          const idx = Number(e.target.dataset.idx);
          if (e.intersectionRatio > best.ratio) best = { ratio: e.intersectionRatio, idx };
        });
        if (best.ratio > 0.5) setActiveIdx(best.idx);
      },
      { root: scroller, threshold: [0.25, 0.5, 0.75, 1] }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i) => {
    const el = itemRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  return (
    <div className="lg:hidden py-8 bg-[#0a0a0a] overflow-hidden">
      <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold/50 text-center mb-5 px-6">
        Nossos projetos · arraste para o lado
      </p>
      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto px-6 pb-3 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {GALLERY.map((photo, i) => (
          <div
            key={photo.src}
            ref={(el) => (itemRefs.current[i] = el)}
            data-idx={i}
            className="relative flex-shrink-0 overflow-hidden"
            style={{ width: '68vw', aspectRatio: '3/4', scrollSnapAlign: 'start' }}
          >
            <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" loading="lazy" />
            <div
              className="absolute inset-x-0 bottom-0 px-4 py-3"
              style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)' }}
            >
              <p className="font-inter text-xs text-white/70">{photo.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-4" role="tablist" aria-label="Galeria de projetos">
        {GALLERY.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para projeto ${i + 1}`}
            aria-selected={activeIdx === i}
            className={`rounded-full transition-all duration-300 ${activeIdx === i ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Processo ───────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: '01', title: 'Chame no WhatsApp', desc: 'Manda uma mensagem, conta o seu projeto. Já enviamos um orçamento inicial.' },
    { n: '02', title: 'Medição gratuita', desc: 'Agendamos uma visita à sua obra sem custo. Medição precisa, sem surpresas no orçamento.' },
    { n: '03', title: 'Instalado em 10 dias', desc: 'Bancada produzida e instalada pela nossa equipe em até 10 dias úteis após aprovação.' },
  ];
  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Como funciona</p>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white">
            Do primeiro contato à bancada instalada
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div key={step.n} className="relative p-8 border border-white/[0.07]" style={{ background: 'linear-gradient(145deg, #111 0%, #0d0d0d 100%)' }}>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2.5 w-5 h-px bg-gold/25 z-10" aria-hidden="true" />
              )}
              <span className="font-playfair text-5xl font-bold text-gold/15 select-none block mb-4" aria-hidden="true">{step.n}</span>
              <h3 className="font-playfair text-lg text-white mb-2">{step.title}</h3>
              <p className="font-inter text-sm text-white/45 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Depoimento ─────────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section className="py-16 sm:py-20 bg-[#080808] border-y border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex justify-center gap-1 mb-6" aria-label="5 estrelas">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 16 16" fill="#c9a96e" className="w-4 h-4" aria-hidden="true">
              <path d="M8 1.5l1.9 3.8 4.2.6-3 3 .7 4.1L8 11l-3.8 2 .7-4.1-3-3 4.2-.6z" />
            </svg>
          ))}
        </div>
        <blockquote className="font-playfair text-xl sm:text-2xl md:text-3xl text-white/90 italic leading-relaxed mb-8">
          "Fiz toda a minha cozinha com a Genuíno Gran. O atendimento foi extremamente atencioso
          desde o primeiro contato. Acabamento perfeito, ficou exatamente como eu imaginei."
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <img src="/images/avatars/cliente-1.jpg" alt="Larissa Peixoto" className="w-10 h-10 rounded-full object-cover border border-gold/30 flex-shrink-0" loading="lazy" />
          <div className="text-left">
            <p className="font-inter text-sm text-white font-medium">Larissa Peixoto</p>
            <p className="font-inter text-xs text-white/40">Cozinha em mármore · Sorocaba, fev/2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Diferenciais ───────────────────────────────────────────────────────────────
const DIFFS = [
  { title: 'Acabamento alto padrão', desc: 'Mais de 14 anos de experiência em cada detalhe. Executamos com precisão milimétrica.', path: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z' },
  { title: 'Entrega em 10 dias', desc: 'Bancada de cozinha pronta e instalada em até 10 dias úteis após aprovação do orçamento.', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { title: 'Garantia de 5 anos', desc: 'Todos os projetos com 5 anos de garantia e suporte completo. Qualidade que a gente assina.', path: 'M12 2L4 5v7c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z' },
  { title: 'Cobrimos orçamentos', desc: 'Recebeu proposta mais barata? Enviamos e igualamos sem abrir mão da qualidade.', path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
];

function Differentials() {
  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Por que nos escolher</p>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white">Qualidade que fala por si</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIFFS.map((d) => (
            <div key={d.title} className="p-7 border border-white/[0.07] hover:border-gold/25 transition-colors duration-300" style={{ background: 'linear-gradient(145deg, #111 0%, #0d0d0d 100%)' }}>
              <div className="w-10 h-10 border border-gold/20 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold" aria-hidden="true">
                  <path d={d.path} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-playfair text-base text-white mb-2">{d.title}</h3>
              <p className="font-inter text-sm text-white/40 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Form Section ───────────────────────────────────────────────────────────────
function FormSection({ material }) {
  return (
    <section id="orcamento" className="py-16 sm:py-20 bg-[#080808] border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Orçamento gratuito</p>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-6">
              Receba seu orçamento em até 24 horas
            </h2>
            <ul className="flex flex-col gap-3 mb-8">
              {['Visita de medição 100% gratuita','Orçamento detalhado sem compromisso','Atendemos toda a Grande SP','Cobrimos qualquer orçamento da concorrência'].map((item) => (
                <li key={item} className="flex items-center gap-3 font-inter text-sm text-white/55">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 pt-5 border-t border-white/[0.07]">
              <img src="/images/antonio/antonio-1.jpg" alt="Antonio Roberto, fundador da Genuíno Gran" className="w-12 h-12 rounded-full object-cover border-2 border-gold/30 flex-shrink-0" style={{ objectPosition: '50% 18%' }} loading="lazy" />
              <div>
                <p className="font-playfair text-sm text-white">Antonio Roberto</p>
                <p className="font-inter text-[10px] text-gold/60 tracking-wide uppercase">Fundador · Mestre Marmorista</p>
              </div>
            </div>
          </div>

          <div className="p-8 border border-white/[0.07]" style={{ background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' }}>
            <div className="h-px w-full bg-gradient-to-r from-gold/60 via-gold/20 to-transparent mb-6" aria-hidden="true" />
            <p className="font-playfair text-xl text-white mb-6">Fale com a gente agora</p>
            <LeadForm id="form-orcamento" material={material} />
            <div className="flex items-center gap-3 mt-5">
              <div className="flex-1 h-px bg-white/[0.07]" aria-hidden="true" />
              <span className="font-inter text-[11px] text-white/25 tracking-widest uppercase">ou</span>
              <div className="flex-1 h-px bg-white/[0.07]" aria-hidden="true" />
            </div>
            <a
              href={waUrlFor(material)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2.5 py-3.5 border border-[#25d366]/30 text-[#25d366] bg-[#25d366]/[0.06] hover:bg-[#25d366]/15 font-inter text-xs tracking-wide transition-all"
              onClick={() => pushDL('clique_whatsapp', { material, origem: 'form_section' })}
            >
              <span className="w-4 h-4 text-[#25d366]">{WA_ICON}</span>
              Prefere chamar no WhatsApp?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────────
const LP_FAQ = [
  { q: 'Quanto custa uma bancada de cozinha em mármore?', a: 'Uma bancada de 1,80m × 60cm com cuba gourmet em quartzo branco começa em R$ 2.790. O valor final depende das dimensões, do material escolhido e dos detalhes do projeto. Solicite um orçamento gratuito personalizado.' },
  { q: 'Vocês atendem Osasco, Barueri e Grande São Paulo?', a: 'Sim. Atendemos Osasco, Barueri, Alphaville, Santana de Parnaíba, Cotia, Jundiaí, Sorocaba e toda a Grande São Paulo sem taxa de deslocamento.' },
  { q: 'Qual o prazo de entrega?', a: 'Bancadas de cozinha ficam prontas em até 10 dias úteis após medição e aprovação do orçamento. Projetos completos (cozinha + banheiros + pisos) em até 20 dias.' },
  { q: 'Como funciona o pagamento?', a: 'Trabalhamos com entrada no início e o restante na entrega. Aceitamos PIX, transferência e cartão. Fale pelo WhatsApp para saber as condições atuais.' },
  { q: 'Os projetos têm garantia?', a: 'Sim. Todos os projetos da Genuíno Gran têm 5 anos de garantia com suporte completo. Qualquer problema no período, a gente resolve.' },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Dúvidas frequentes</p>
          <h2 className="font-playfair text-2xl sm:text-3xl font-medium text-white">Perguntas e respostas</h2>
        </div>
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {LP_FAQ.map((item, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left gap-4" aria-expanded={open === i}>
                <span className={`font-inter text-sm sm:text-[15px] leading-snug transition-colors ${open === i ? 'text-white' : 'text-white/60'}`}>{item.q}</span>
                <span className={`flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-200 ${open === i ? 'border-gold/50 rotate-45' : 'border-white/20'}`} aria-hidden="true">
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path d="M6 2v8M2 6h8" stroke={open === i ? '#c9a96e' : 'rgba(255,255,255,0.4)'} strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {open === i && <p className="font-inter text-sm text-white/50 leading-relaxed pb-5 pr-9">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Final ──────────────────────────────────────────────────────────────────
function FinalCTA({ material }) {
  return (
    <section className="py-16 sm:py-20 bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Pronto para começar?</p>
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-3">Fale agora com a nossa equipe</h2>
        <p className="font-inter text-sm text-white/40 mb-8">{BUSINESS.hours} · Respondemos rápido</p>
        <a
          href={waUrlFor(material)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#25d366] text-white font-inter font-semibold text-sm hover:brightness-110 transition-all"
          style={{ boxShadow: '0 4px 24px rgba(37,211,102,0.3)' }}
          onClick={() => pushDL('clique_whatsapp', { material, origem: 'final_cta' })}
        >
          <span className="w-5 h-5 text-white">{WA_ICON}</span>
          Chamar no WhatsApp — {BUSINESS.phone}
        </a>
      </div>
    </section>
  );
}

// ── Footer Mínimo ──────────────────────────────────────────────────────────────
function MinimalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-[#080808] py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-6 w-auto flex-shrink-0" color="white" />
          <LogoWordmark className="h-[9px] w-auto" color="white" />
        </div>
        <p className="font-inter text-[11px] text-white/20 hidden sm:block">{BUSINESS.email} · {BUSINESS.phone}</p>
        <div className="flex items-center gap-5">
          <Link to="/" className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors">Site principal</Link>
          <Link to="/politica-de-privacidade" className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors">Privacidade</Link>
          <p className="font-inter text-[11px] text-white/20">© {year}</p>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const material = useMaterial();

  useEffect(() => {
    // A) Título dinâmico por material
    const mat = material.charAt(0).toUpperCase() + material.slice(1);
    document.title = `Orçamento de Bancada em ${mat} · Genuíno Gran`;
    window.scrollTo(0, 0);

    // H) Schema.org LocalBusiness específico da LP (complementa o do index.html)
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Genuíno Gran',
      description: `Marmoraria especializada em bancadas de ${material}, granito e quartzo sob medida. 14 anos de experiência em São Paulo e Grande SP.`,
      telephone: '+5511970236499',
      email: 'genuinogran@gmail.com',
      url: 'https://genuinogran.com.br/orcamento',
      openingHours: 'Mo-Su 08:00-19:00',
      areaServed: ['São Paulo','Osasco','Barueri','Alphaville','Santana de Parnaíba','Cotia','Jundiaí','Sorocaba'],
      priceRange: '$$$',
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'lp-localbusiness';
    el.text = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => { const s = document.getElementById('lp-localbusiness'); if (s) s.remove(); };
  }, [material]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-16 lg:pb-0">
      <LPHeader />
      <StickyBar material={material} />
      <FloatingWA material={material} />
      <Hero material={material} />
      <SocialProof />
      <MobileGallery />
      <Process />
      <Testimonial />
      <Differentials />
      <FormSection material={material} />
      <FAQ />
      <FinalCTA material={material} />
      <MinimalFooter />
    </div>
  );
}
