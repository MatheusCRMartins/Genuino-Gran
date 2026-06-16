/**
 * LandingPageImmersive — variação B da LP de conversão.
 *
 * Inspiração: lusion.co + revistas de arquitetura de alto padrão.
 * Visual: editorial cinematográfico. Tipografia ENORME, marquees,
 * scrolly storytelling com pinning, galeria horizontal.
 *
 * Roda em paralelo com /orcamento para A/B testing.
 * - /orcamento  → versão "premium card-based"
 * - /orcamento-b → versão "editorial imersivo" (esta)
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { LogoMark, LogoWordmark } from '../components/Logo';
import { WA_URL, BUSINESS, TRACKING, reportAdsConversion } from '../config';

// ────────────────────────────────────────────────────────────────────────────────
// LOADING CURTAIN — cortina de abertura cinematográfica
// ────────────────────────────────────────────────────────────────────────────────
function LoadingCurtain({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const DURATION = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      // Easing easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setClosing(true);
        setTimeout(() => onDone && onDone(), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          {/* G gigante reveal */}
          <div className="relative">
            <LogoMark
              className="h-32 sm:h-40 w-auto"
              color="white"
            />
            {/* Stroke animation overlay */}
            <div
              className="absolute inset-0 bg-[#0a0a0a]"
              style={{
                clipPath: `inset(${(1 - progress) * 100}% 0 0 0)`,
                transition: 'clip-path 80ms linear',
                mixBlendMode: 'destination-out',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-56">
            <div className="h-px bg-white/10 mb-2 overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-white/30 text-center">
              {Math.round(progress * 100)}%
            </p>
          </div>

          {/* Linhas decorativas */}
          <div className="absolute top-8 left-8 right-8 h-px bg-white/[0.05]" aria-hidden="true" />
          <div className="absolute bottom-8 left-8 right-8 h-px bg-white/[0.05]" aria-hidden="true" />
          <div className="absolute top-8 left-8 bottom-8 w-px bg-white/[0.05]" aria-hidden="true" />
          <div className="absolute top-8 right-8 bottom-8 w-px bg-white/[0.05]" aria-hidden="true" />

          {/* Label canto */}
          <div className="absolute top-12 left-12 font-inter text-[10px] tracking-[0.3em] uppercase text-white/40">
            Genuíno Gran
          </div>
          <div className="absolute top-12 right-12 font-inter text-[10px] tracking-[0.3em] uppercase text-gold">
            BR · 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// CURSOR CUSTOM — só desktop, com pointer enlarged no hover de elementos clicáveis
// ────────────────────────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Só ativa em dispositivos com hover real (desktop com mouse)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);

    // Esconde cursor nativo enquanto o componente está montado
    document.body.style.cursor = 'none';

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };
    const onHoverIn = (e) => {
      if (e.target.closest('a, button, [role="slider"]')) setHovering(true);
    };
    const onHoverOut = (e) => {
      if (e.target.closest('a, button, [role="slider"]')) setHovering(false);
    };

    // Anel segue com lerp (smooth)
    let raf;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onHoverIn);
    document.addEventListener('mouseout', onHoverOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHoverIn);
      document.removeEventListener('mouseout', onHoverOut);
      // Restaura cursor nativo ao desmontar (quando o usuário sai da LP B)
      document.body.style.cursor = '';
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold z-[90] pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-gold/40 z-[89] pointer-events-none transition-all duration-200"
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
          scale: hovering ? '1.8' : '1',
          borderColor: hovering ? 'rgba(201,169,110,0.8)' : 'rgba(201,169,110,0.3)',
        }}
      />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// HEADER FLOATING — minimalista, transparente
// ────────────────────────────────────────────────────────────────────────────────
function FloatingHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'h-[60px] bg-[#0a0a0a]/85 backdrop-blur-lg border-b border-white/[0.06]' : 'h-[80px] bg-transparent'
      }`}
    >
      <div className="h-full max-w-screen-2xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" aria-label="Genuíno Gran · Início" className="flex items-center gap-3">
          <LogoMark className="h-8 w-auto flex-shrink-0" color="white" />
          <LogoWordmark className="h-[11px] w-auto hidden sm:block" color="white" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <span className="font-inter text-[9px] tracking-[0.3em] uppercase text-white/35">
            Mármore · Granito · Quartzo
          </span>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-[11px] tracking-[0.18em] uppercase text-gold hover:text-white transition-colors"
          >
            WhatsApp →
          </a>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// IMMERSIVE HERO — Ken Burns full-bleed + tipografia ENORME letra-por-letra
// ────────────────────────────────────────────────────────────────────────────────
function ImmersiveHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  // Imagem dá zoom out conforme rola
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  // Texto sobe e some
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);

  // Splitting de letras pra entrada cinematográfica
  const linha1 = 'GENUÍNO';
  const linha2 = 'GRAN';

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] lg:h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Imagem hero com Ken Burns + zoom no scroll */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0"
      >
        <img
          src="/images/portfolio/cozinha-quartzo-pendentes.jpg"
          alt="Cozinha em mármore — projeto Genuíno Gran"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
          style={{ animation: 'kenBurnsImmersive 18s ease-in-out infinite alternate' }}
        />
        {/* Vinheta + escurecimento editorial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 200px rgba(10,10,10,0.5)' }}
        />
      </motion.div>

      {/* Borda editorial */}
      <div className="absolute top-24 left-6 right-6 lg:left-10 lg:right-10 h-px bg-white/[0.1]" aria-hidden="true" />
      <div className="absolute bottom-8 left-6 right-6 lg:left-10 lg:right-10 h-px bg-white/[0.1]" aria-hidden="true" />

      {/* Meta info — canto superior */}
      <div className="absolute top-28 left-6 lg:left-10 flex flex-col gap-1.5 z-10">
        <span className="font-inter text-[9px] tracking-[0.35em] uppercase text-gold">
          Vol. 14 · Edição 2026
        </span>
        <span className="font-inter text-[9px] tracking-[0.35em] uppercase text-white/40">
          Marmoraria · São Paulo
        </span>
      </div>
      <div className="absolute top-28 right-6 lg:right-10 flex flex-col items-end gap-1.5 z-10">
        <span className="font-inter text-[9px] tracking-[0.35em] uppercase text-white/40">
          14 ANOS
        </span>
        <span className="font-inter text-[9px] tracking-[0.35em] uppercase text-white/40">
          +4 MIL OBRAS
        </span>
      </div>

      {/* Tipografia GIGANTE centrada */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6"
      >
        <h1 className="font-playfair font-medium text-white text-center leading-[0.85] tracking-tighter">
          <span className="block overflow-hidden">
            {linha1.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  fontSize: 'clamp(3.5rem, 14vw, 11rem)',
                  animation: `heroLetterIn 1s cubic-bezier(0.22,1,0.36,1) ${0.6 + i * 0.07}s both`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden -mt-2 sm:-mt-3">
            {linha2.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  fontSize: 'clamp(3.5rem, 14vw, 11rem)',
                  animation: `heroLetterIn 1s cubic-bezier(0.22,1,0.36,1) ${1.1 + i * 0.07}s both`,
                  color: '#c9a96e',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="mt-6 sm:mt-8 font-inter text-[11px] sm:text-xs tracking-[0.4em] uppercase text-white/65"
          style={{ animation: 'heroFadeUp 1s ease 1.8s both' }}
        >
          Mármore · Granito · Quartzo — sob medida
        </p>
      </motion.div>

      {/* CTA inferior */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'heroFadeUp 1s ease 2.2s both' }}
      >
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-[#25d366] text-white font-inter font-semibold text-sm tracking-wide hover:brightness-110 active:scale-[0.99] transition-all whitespace-nowrap"
          style={{ boxShadow: '0 12px 40px rgba(37,211,102,0.4)' }}
        >
          Falar no WhatsApp
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        style={{ animation: 'heroFadeUp 1s ease 2.5s both' }}
      >
        <span className="font-inter text-[9px] tracking-[0.4em] uppercase text-white/30">
          Role para descobrir
        </span>
        <svg viewBox="0 0 12 16" fill="none" className="w-3 h-4 text-white/30" aria-hidden="true" style={{ animation: 'scrollHintBounce 2.2s ease-in-out infinite' }}>
          <path d="M6 2v10M2 9l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// BIG MARQUEE — texto gigante rolando horizontalmente
// ────────────────────────────────────────────────────────────────────────────────
function BigMarquee({ items, speed = 60, accent = false }) {
  const text = items.join(' · ') + ' · ';
  return (
    <div className="relative py-10 sm:py-14 overflow-hidden bg-[#080808] border-y border-white/[0.06]">
      <div className="flex marquee-track-immersive" style={{ animationDuration: `${speed}s` }}>
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            className={`flex-shrink-0 font-playfair font-medium whitespace-nowrap pr-8 ${
              accent ? 'text-gold' : 'text-white/85'
            }`}
            style={{
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// SCROLLY TELLER — processo com pinning (texto fica, imagem muda)
// ────────────────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'A conversa',
    desc: 'Tudo começa com uma mensagem. Conte seu projeto pelo WhatsApp em 2 minutos. A gente já volta com um orçamento inicial.',
    img: '/images/portfolio/cozinha-quartzo-pendentes.jpg',
  },
  {
    num: '02',
    title: 'A visita',
    desc: 'Vamos à sua obra para medir com precisão milimétrica. Sem custo. Sem compromisso.',
    img: '/images/portfolio/banheiro-bancada-marmore.jpg',
  },
  {
    num: '03',
    title: 'A pedra',
    desc: 'Mármore, granito ou quartzo. Cada material tem sua personalidade. Te guiamos pela escolha que combina com seu projeto.',
    img: '/images/portfolio/cozinha-bancada-quartzo.jpg',
  },
  {
    num: '04',
    title: 'A execução',
    desc: 'Cortamos com precisão e instalamos com cuidado. Em até 10 dias, sua bancada está pronta — mais limpa que a obra inteira.',
    img: '/images/portfolio/cozinha-bancada-preta.jpg',
  },
  {
    num: '05',
    title: 'A garantia',
    desc: '5 anos de garantia com suporte completo. Você nunca fica sozinho. A Genuíno Gran existe há 14 anos cumprindo prazo e palavra.',
    img: '/images/portfolio/painel-marmore-penteadeira.jpg',
  },
];

function ScrollyTeller() {
  return (
    <section className="relative bg-[#0a0a0a]">
      {/* Section heading */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-20 sm:pt-32">
        <div className="grid grid-cols-12 gap-4 items-end mb-12 sm:mb-20">
          <span className="col-span-12 lg:col-span-3 font-inter text-[10px] tracking-[0.3em] uppercase text-gold">
            O Processo · Cap. 02
          </span>
          <h2
            className="col-span-12 lg:col-span-9 font-playfair font-light text-white leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            Da conversa<br />
            <em className="not-italic text-gold">à instalação</em>
          </h2>
        </div>
      </div>

      {/* Steps com layout alternado (zig-zag) — foto e texto trocam de lado
          a cada step. Mesmo padrão em mobile e desktop, só muda largura. */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pb-20 sm:pb-32 space-y-20 lg:space-y-32">
        {STEPS.map((step, i) => {
          const reverse = i % 2 === 1;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}
            >
              {/* Coluna imagem */}
              <div className={`lg:col-span-7 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 80px rgba(10,10,10,0.4)' }}
                    aria-hidden="true"
                  />
                  {/* Numeração no canto da foto */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-white bg-[#0a0a0a]/75 backdrop-blur-sm px-3 py-1.5">
                      {step.num} / {String(STEPS.length).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Linha dourada decorativa */}
                  <div
                    className="absolute top-0 left-0 w-px"
                    style={{ height: '90px', background: 'linear-gradient(to bottom, #c9a96e, transparent)' }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Coluna texto */}
              <div className={`lg:col-span-5 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
                <span
                  className="block font-playfair font-bold text-gold/15 leading-none mb-4 select-none"
                  style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3
                  className="font-playfair font-medium text-white mb-5 leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
                >
                  {step.title}
                </h3>
                <p className="font-inter text-[15px] sm:text-base text-white/55 leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// HORIZONTAL GALLERY — rolagem vertical vira deslocamento horizontal
// ────────────────────────────────────────────────────────────────────────────────
const GALLERY_PROJECTS = [
  { src: '/images/portfolio/cozinha-quartzo-pendentes.jpg', material: 'Quartzo Branco', place: 'Alphaville · SP' },
  { src: '/images/portfolio/cozinha-bancada-quartzo.jpg', material: 'Quartzo Polido', place: 'Santana de Parnaíba · SP' },
  { src: '/images/portfolio/cozinha-bancada-preta.jpg', material: 'Granito Preto', place: 'Cotia · SP' },
  { src: '/images/portfolio/banheiro-bancada-marmore.jpg', material: 'Mármore Travertino', place: 'São Paulo · SP' },
  { src: '/images/portfolio/piso-marmore-ambiente.jpg', material: 'Mármore Calacatta', place: 'Sorocaba · SP' },
  { src: '/images/portfolio/painel-marmore-penteadeira.jpg', material: 'Mármore Branco', place: 'Alphaville · SP' },
];

function HorizontalGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef(null);
  const itemRefs = useRef([]);

  // Detecta qual card está mais visível (mobile + desktop)
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
      { root: scroller, threshold: [0.3, 0.5, 0.7, 1] }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i) => {
    const el = itemRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };
  const next = () => goTo(Math.min(activeIdx + 1, GALLERY_PROJECTS.length - 1));
  const prev = () => goTo(Math.max(activeIdx - 1, 0));

  return (
    <section className="relative py-20 sm:py-32 bg-[#080808]">
      {/* Heading */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 mb-10 lg:mb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
              Portfólio · Cap. 03
            </span>
            <h2
              className="font-playfair font-light text-white leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              Cada projeto<br />
              <em className="not-italic text-gold">é único</em>
            </h2>
          </div>
          {/* Setas desktop */}
          <div className="hidden lg:flex items-center gap-2 pb-2">
            <button
              onClick={prev}
              disabled={activeIdx === 0}
              aria-label="Projeto anterior"
              className="w-12 h-12 flex items-center justify-center border border-white/15 text-white hover:bg-gold hover:text-[#0a0a0a] hover:border-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/15 transition-all"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={activeIdx === GALLERY_PROJECTS.length - 1}
              aria-label="Próximo projeto"
              className="w-12 h-12 flex items-center justify-center border border-white/15 text-white hover:bg-gold hover:text-[#0a0a0a] hover:border-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/15 transition-all"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carrossel — funciona com touch (mobile) e arrasto + setas (desktop) */}
      <div
        ref={scrollerRef}
        className="flex gap-4 lg:gap-6 overflow-x-auto px-6 lg:px-10 pb-4 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {GALLERY_PROJECTS.map((p, i) => (
          <div
            key={p.src}
            ref={(el) => (itemRefs.current[i] = el)}
            data-idx={i}
            className="relative flex-shrink-0 overflow-hidden group"
            style={{
              width: 'min(78vw, 540px)',
              aspectRatio: '3/4',
              scrollSnapAlign: 'center',
            }}
          >
            <img
              src={p.src}
              alt={`${p.material} — ${p.place}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)' }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-1.5">
                {p.material}
              </span>
              <span className="block font-playfair text-white text-lg lg:text-2xl">
                {p.place}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="font-inter text-[10px] tracking-wider text-white/70 bg-[#0a0a0a]/70 backdrop-blur-sm px-2.5 py-1">
                {String(i + 1).padStart(2, '0')} / {String(GALLERY_PROJECTS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 mt-6 flex items-center gap-4">
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 flex-shrink-0">
          {String(activeIdx + 1).padStart(2, '0')} / {String(GALLERY_PROJECTS.length).padStart(2, '0')}
        </span>
        <div className="flex-1 h-px bg-white/[0.08] overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${((activeIdx + 1) / GALLERY_PROJECTS.length) * 100}%` }}
          />
        </div>
        <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/30 hidden sm:block flex-shrink-0">
          arraste / use as setas
        </span>
        <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/30 sm:hidden flex-shrink-0">
          ← arraste →
        </span>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// MANIFESTO BLOCK — texto editorial de impacto
// ────────────────────────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section className="py-32 sm:py-48 bg-[#0a0a0a] relative overflow-hidden">
      {/* Glow ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-8">
            Manifesto · Cap. 04
          </span>
          <p
            className="font-playfair font-light text-white leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            A pedra natural não é só um material.
            {' '}<em className="not-italic text-gold/90">É a alma</em>{' '}
            que diferencia um ambiente comum
            {' '}de uma <em className="not-italic text-gold/90">obra-prima</em>.
          </p>
          <div className="mt-12 sm:mt-16 flex items-center gap-4">
            <div className="w-12 h-px bg-gold" aria-hidden="true" />
            <span className="font-inter text-[11px] tracking-[0.3em] uppercase text-white/40">
              Antonio Roberto · Mestre Marmorista
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// EDITORIAL FORM — form com revelação dramática
// ────────────────────────────────────────────────────────────────────────────────
function EditorialForm() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [projeto, setProjeto] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || nome.trim().length < 2) { setError('Informe seu nome.'); return; }
    const digits = whatsapp.replace(/\D/g, '');
    if (digits.length < 10) { setError('WhatsApp inválido — inclua o DDD.'); return; }
    if (!projeto.trim() || projeto.trim().length < 5) { setError('Conte um pouco do seu projeto.'); return; }

    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`https://formspree.io/f/${TRACKING.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nome: nome, WhatsApp: whatsapp, Projeto: projeto,
          Origem: 'LP /orcamento-b (Editorial Imersivo)',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lp_orcamento_b' });
        }
        // Conversão Google Ads + Conversões Otimizadas (telefone com hash)
        reportAdsConversion({ phone: whatsapp });
        if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
      } else {
        setError('Erro ao enviar. Fale direto pelo WhatsApp.');
      }
    } catch {
      setError('Erro de conexão. Tente o WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="orcamento" className="relative py-24 sm:py-32 bg-[#080808] overflow-hidden">
      {/* Texto fantasma de fundo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <span
          className="font-playfair font-bold text-white select-none"
          style={{
            fontSize: 'clamp(10rem, 30vw, 28rem)',
            opacity: 0.02,
            letterSpacing: '-0.06em',
          }}
        >
          GG
        </span>
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Coluna texto */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
            Contato · Cap. 05
          </span>
          <h2
            className="font-playfair font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
          >
            Comece seu<br />
            <em className="not-italic text-gold">projeto</em>
          </h2>
          <p className="font-inter text-base text-white/55 leading-relaxed mb-8 max-w-md">
            Conte sobre o que você imagina. Nossa equipe responde em até 2 minutos pelo WhatsApp ou e-mail.
          </p>
          <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.07]">
            <div className="flex items-center gap-3 font-inter text-sm text-white/55">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold flex-shrink-0">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Resposta em até 2 minutos
            </div>
            <div className="flex items-center gap-3 font-inter text-sm text-white/55">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold flex-shrink-0">
                <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Visita de medição gratuita
            </div>
            <div className="flex items-center gap-3 font-inter text-sm text-white/55">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold flex-shrink-0">
                <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cobrimos qualquer orçamento da concorrência
            </div>
          </div>
        </motion.div>

        {/* Coluna form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-6">
              <div className="w-16 h-16 border-2 border-gold/40 rounded-full flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path d="M20 6L9 17l-5-5" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-playfair text-3xl text-white mb-2">Mensagem enviada</p>
              <p className="font-inter text-sm text-white/45">
                Retornaremos em até <strong className="text-white/70">2 minutos</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-0">
              {/* Inputs editoriais — sem caixa, só linha embaixo */}
              <div className="border-b border-white/15 focus-within:border-gold transition-colors">
                <label className="block font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 pt-6 pb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); setError(''); }}
                  placeholder="Como você se chama?"
                  autoComplete="name"
                  className="w-full bg-transparent text-white placeholder-white/20 font-inter text-lg sm:text-xl pb-4 focus:outline-none"
                />
              </div>

              <div className="border-b border-white/15 focus-within:border-gold transition-colors">
                <label className="block font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 pt-6 pb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => { setWhatsapp(e.target.value); setError(''); }}
                  placeholder="(11) 9 9999-9999"
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full bg-transparent text-white placeholder-white/20 font-inter text-lg sm:text-xl pb-4 focus:outline-none"
                />
              </div>

              <div className="border-b border-white/15 focus-within:border-gold transition-colors">
                <label className="block font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 pt-6 pb-1">
                  Seu projeto
                </label>
                <textarea
                  value={projeto}
                  onChange={(e) => { setProjeto(e.target.value); setError(''); }}
                  placeholder="Cozinha, banheiro, painel... me conta um pouco."
                  rows={3}
                  className="w-full bg-transparent text-white placeholder-white/20 font-inter text-lg sm:text-xl pb-4 focus:outline-none resize-none"
                />
              </div>

              {error && <p className="font-inter text-xs text-red-400/80 mt-4">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="group mt-10 flex items-center justify-between gap-4 px-8 py-6 bg-gold text-[#0a0a0a] font-inter font-semibold text-sm tracking-[0.18em] uppercase hover:brightness-110 active:scale-[0.99] disabled:opacity-70 transition-all"
              >
                {submitting ? 'Enviando...' : 'Enviar pedido de orçamento'}
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p className="font-inter text-[11px] text-white/30 text-center mt-4">
                ou{' '}
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-[#25d366] hover:text-[#1ebe57] underline underline-offset-2">
                  fale agora pelo WhatsApp
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// EPIC FOOTER — GG gigante de fundo + contato editorial
// ────────────────────────────────────────────────────────────────────────────────
function EpicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#050505] pt-24 sm:pt-32 pb-10 overflow-hidden">
      {/* GG gigante de fundo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none overflow-hidden"
      >
        <span
          className="font-playfair font-bold text-white select-none leading-[0.8]"
          style={{
            fontSize: 'clamp(12rem, 38vw, 36rem)',
            opacity: 0.04,
            letterSpacing: '-0.06em',
            transform: 'translateY(20%)',
          }}
        >
          GG
        </span>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Top: claim + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 sm:mb-32">
          <div className="lg:col-span-7">
            <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
              Genuíno Gran · Desde 2011
            </span>
            <h3
              className="font-playfair font-light text-white leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}
            >
              Pronto para<br />
              <em className="not-italic text-gold">conversar?</em>
            </h3>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 px-8 py-5 bg-[#25d366] text-white font-inter font-semibold text-sm tracking-wide hover:brightness-110 transition-all"
              style={{ boxShadow: '0 12px 40px rgba(37,211,102,0.3)' }}
            >
              Chamar no WhatsApp
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              to="/"
              className="group flex items-center justify-between gap-4 px-8 py-5 border border-gold/40 text-gold hover:bg-gold hover:text-[#0a0a0a] font-inter text-sm tracking-wide transition-all"
            >
              Visitar site institucional
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 pt-10 border-t border-white/[0.06]">
          <div>
            <span className="block font-inter text-[9px] tracking-[0.3em] uppercase text-white/30 mb-2">WhatsApp</span>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="font-playfair text-base sm:text-lg text-white hover:text-gold transition-colors">
              {BUSINESS.phone}
            </a>
          </div>
          <div>
            <span className="block font-inter text-[9px] tracking-[0.3em] uppercase text-white/30 mb-2">E-mail</span>
            <a href={`mailto:${BUSINESS.email}`} className="font-playfair text-base sm:text-lg text-white hover:text-gold transition-colors break-all">
              {BUSINESS.email}
            </a>
          </div>
          <div>
            <span className="block font-inter text-[9px] tracking-[0.3em] uppercase text-white/30 mb-2">Atendimento</span>
            <p className="font-playfair text-base sm:text-lg text-white">{BUSINESS.city}</p>
          </div>
          <div>
            <span className="block font-inter text-[9px] tracking-[0.3em] uppercase text-white/30 mb-2">Horário</span>
            <p className="font-playfair text-base sm:text-lg text-white">{BUSINESS.hours}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark className="h-7 w-auto flex-shrink-0" color="white" />
            <span className="font-inter text-[11px] text-white/25">
              © {year} Genuíno Gran · Todos os direitos reservados
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/politica-de-privacidade" className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors">
              Privacidade
            </Link>
            <Link to="/orcamento" className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors">
              Versão A
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────────────────────
export default function LandingPageImmersive() {
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Genuíno Gran · Mármore, Granito e Quartzo';
    window.scrollTo(0, 0);
    // Se o usuário pediu reduce motion, pula a cortina
    if (reduceMotion) setReady(true);
  }, [reduceMotion]);

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {!reduceMotion && !ready && <LoadingCurtain onDone={() => setReady(true)} />}
      <CustomCursor />
      <FloatingHeader />
      <ImmersiveHero />
      <BigMarquee items={['BANCADAS', 'COZINHA', 'BANHEIRO', 'PISO', 'PAINEL']} speed={50} />
      <ScrollyTeller />
      <HorizontalGallery />
      <BigMarquee
        items={['+ 4 MIL OBRAS', '14 ANOS', '5 ANOS DE GARANTIA', 'AGENDA 2026']}
        speed={45}
        accent
      />
      <Manifesto />
      <EditorialForm />
      <EpicFooter />
    </div>
  );
}
