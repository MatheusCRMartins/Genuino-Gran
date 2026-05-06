import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* ─── Projetos do portfólio ──────────────────────────────────────────────────
 * Imagens em public/images/portfolio/ — todas em uso comercial livre (Unsplash).
 * Substitua pelos arquivos reais conforme o cliente envie fotos próprias.
 */
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

/* ─── Portfolio card ─────────────────────────────────────────────────────── */
function Card({ project, className = '', priority = false }) {
  return (
    <article className={`portfolio-card group relative overflow-hidden bg-[#0d0d0d] ${className}`}>
      <div className="portfolio-img absolute inset-0 transition-transform duration-700 ease-out">
        <img
          src={project.src}
          alt={project.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.92) saturate(0.95)' }}
        />
      </div>

      {/* Material label — sempre visível no topo */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <span className="font-inter text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/85 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
          {project.material}
        </span>
      </div>

      {/* Overlay — sempre visível em mobile, hover-only em desktop */}
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
          <a
            href="#contato"
            className="inline-flex items-center gap-2 font-inter text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/20 px-3 sm:px-4 py-2 group-hover:border-gold/50 group-hover:text-gold transition-all duration-300"
          >
            Quero algo assim
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [gridRef, gridVisible] = useScrollAnimation(0.05);

  const [p0, p1, p2, p3, p4, p5] = PROJECTS;

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <div>
            <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Nosso Trabalho
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white title-accent">
              Portfólio de Projetos
            </h2>
          </div>
          <p className="font-inter text-[13px] text-white/35 mt-5 sm:mt-0 sm:max-w-xs sm:text-right leading-relaxed">
            Mais de 4 mil projetos entregues em São Paulo, Litoral e Interior.
          </p>
        </div>

        {/* ── Grid ── */}
        <div
          ref={gridRef}
          className={`fade-up ${gridVisible ? 'visible' : ''}`}
        >
          {/* Mobile: 1 col. Tablet: 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
            {PROJECTS.map((p, i) => (
              <Card key={p.title} project={p} className="aspect-[4/3]" priority={i === 0} />
            ))}
          </div>

          {/* Desktop: bento assimétrico
              Linha 1: [p0 col-span-2] [p1 row-span-2]
              Linha 2: [p2 col-span-2] [p1 cont.]
              Linha 3: [p3] [p4] [p5]
              Total = 9 células / 9 ocupadas. */}
          <div
            className="hidden lg:grid grid-cols-3 gap-3"
            style={{ gridTemplateRows: '280px 280px auto' }}
          >
            <Card project={p0} className="col-span-2" priority />
            <Card project={p1} className="row-span-2" />
            <Card project={p2} className="col-span-2" />
            <Card project={p3} className="aspect-[4/3]" />
            <Card project={p4} className="aspect-[4/3]" />
            <Card project={p5} className="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  );
}
