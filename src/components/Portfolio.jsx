import { useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PROJECTS = [
  {
    title: 'Cozinha em Quartzo Branco com Ilha Central',
    material: 'Quartzo Branco',
    type: 'Cozinha',
    src: '/images/portfolio/cozinha-quartzo-pendentes.jpg',
    alt: 'Cozinha de alto padrão com ilha central em quartzo branco e pendentes dourados',
  },
  {
    title: 'Cozinha Verde com Bancada em Quartzo Polido',
    material: 'Quartzo Polido',
    type: 'Cozinha',
    src: '/images/portfolio/cozinha-bancada-quartzo.jpg',
    alt: 'Bancada de cozinha em quartzo branco polido com armários verdes e flores',
  },
  {
    title: 'Piso em Mármore Calacatta Polido',
    material: 'Mármore Calacatta',
    type: 'Revestimento',
    src: '/images/portfolio/piso-marmore-ambiente.jpg',
    alt: 'Piso em mármore calacatta polido com brilho espelhado',
  },
  {
    title: 'Bancada Preta com Cooktop',
    material: 'Granito Preto',
    type: 'Cozinha',
    src: '/images/portfolio/cozinha-bancada-preta.jpg',
    alt: 'Bancada de cozinha em granito preto com cooktop e coifa de inox',
  },
  {
    title: 'Bancada de Banheiro em Mármore',
    material: 'Mármore Travertino',
    type: 'Banheiro',
    src: '/images/portfolio/banheiro-bancada-marmore.jpg',
    alt: 'Bancada de banheiro em mármore com torneira dourada e cuba ovalada',
  },
  {
    title: 'Banheiro com Painel em Mármore',
    material: 'Mármore Branco',
    type: 'Painel',
    src: '/images/portfolio/painel-marmore-penteadeira.jpg',
    alt: 'Banheiro com paredes revestidas em mármore branco e armário em madeira',
  },
];

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose }) {
  const [visible, setVisible] = useState(false);

  /* Anima entrada */
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  /* Trava scroll da página */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Fecha com animação de saída */
  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  /* Escape fecha */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{
        background: `rgba(4,4,4,${visible ? 0.95 : 0})`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        transition: 'background 320ms ease',
        cursor: 'zoom-out',
      }}
      onClick={close}
    >
      {/* Container da imagem */}
      <div
        className="relative w-full max-w-4xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.88) translateY(24px)',
          transition: 'opacity 350ms cubic-bezier(0.22,1,0.36,1), transform 350ms cubic-bezier(0.22,1,0.36,1)',
          cursor: 'default',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem */}
        <img
          src={project.src}
          alt={project.alt}
          className="w-full object-contain"
          style={{ maxHeight: '78vh', display: 'block' }}
        />

        {/* Barra inferior com info */}
        <div
          className="absolute bottom-0 inset-x-0 px-5 py-4 sm:px-6 sm:py-5"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)' }}
        >
          <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold block mb-1">
            {project.type} · {project.material}
          </span>
          <p className="font-playfair text-lg sm:text-xl text-white leading-snug">
            {project.title}
          </p>
        </div>

        {/* Botão fechar */}
        <button
          onClick={close}
          aria-label="Fechar"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
function Card({ project, className = '', onOpen }) {
  return (
    <article
      className={`portfolio-card group relative overflow-hidden bg-[#0d0d0d] cursor-zoom-in ${className}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`Ampliar: ${project.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(); }}
    >
      <div className="portfolio-img absolute inset-0 transition-transform duration-700 ease-out">
        <img
          src={project.src}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.92) saturate(0.95)' }}
        />
      </div>

      {/* Label do material */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <span className="font-inter text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/85 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
          {project.material}
        </span>
      </div>

      {/* Overlay */}
      <div className="portfolio-overlay absolute inset-0 flex flex-col justify-end opacity-100 sm:opacity-0 transition-all duration-500">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)' }}
        />
        <div className="relative p-4 sm:p-6 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-500">
          <span className="font-inter text-[10px] tracking-[0.28em] uppercase text-gold block mb-1 sm:mb-1.5">
            {project.type}
          </span>
          <p className="font-playfair text-base sm:text-lg text-white leading-snug mb-3 sm:mb-4">
            {project.title}
          </p>
          <span className="inline-flex items-center gap-2 font-inter text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/20 px-3 sm:px-4 py-2 group-hover:border-gold/50 group-hover:text-gold transition-all duration-300">
            Toque para ampliar
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M1 1h4M1 1v4M11 11H7M11 11V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [gridRef,   gridVisible]   = useScrollAnimation(0.05);
  const [selected, setSelected]    = useState(null);

  const [p0, p1, p2, p3, p4, p5] = PROJECTS;

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div
          ref={headerRef}
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Cada projeto tem uma história
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white title-accent">
              Projetos que já entregamos
            </h2>
          </div>
          <p className="font-inter text-[13px] text-white/35 mt-5 sm:mt-0 sm:max-w-xs sm:text-right leading-relaxed">
            Mais de 4 mil projetos entregues em São Paulo, Litoral e Interior.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className={`fade-up ${gridVisible ? 'visible' : ''}`}>
          {/* Mobile / Tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
            {PROJECTS.map((p) => (
              <Card key={p.title} project={p} className="aspect-[4/3]" onOpen={() => setSelected(p)} />
            ))}
          </div>

          {/* Desktop bento */}
          <div className="hidden lg:grid grid-cols-3 gap-3" style={{ gridTemplateRows: '280px 280px auto' }}>
            <Card project={p0} className="col-span-2" onOpen={() => setSelected(p0)} />
            <Card project={p1} className="row-span-2" onOpen={() => setSelected(p1)} />
            <Card project={p2} className="col-span-2" onOpen={() => setSelected(p2)} />
            <Card project={p3} className="aspect-[4/3]" onOpen={() => setSelected(p3)} />
            <Card project={p4} className="aspect-[4/3]" onOpen={() => setSelected(p4)} />
            <Card project={p5} className="aspect-[4/3]" onOpen={() => setSelected(p5)} />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <Lightbox project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
