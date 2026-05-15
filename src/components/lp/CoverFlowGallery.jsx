import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * CoverFlowGallery — galeria 3D estilo "iPod Cover Flow".
 *
 * Cards de projetos em perspectiva CSS 3D. O card central fica frontal,
 * os laterais rotacionam (rotateY) criando profundidade real. Cliente
 * vê FOTOS REAIS dos projetos com efeito tridimensional sem perder
 * a tangibilidade — diferente de um modelo 3D abstrato.
 *
 * Interações:
 *  - Touch / mouse drag horizontal para navegar
 *  - Click num card lateral traz pro centro
 *  - Setas do teclado (← →) navegam (a11y)
 *
 * Por que isso é melhor que Three.js aqui:
 *  - Mostra os PROJETOS REAIS (não modelo abstrato)
 *  - Cliente percebe a textura natural do mármore (mais convertível)
 *  - Performance: 0 WebGL, puro CSS 3D (mobile baixo-end funciona)
 *  - Sem 600KB de bundle Three.js
 */

const PROJECTS = [
  {
    src: '/images/portfolio/cozinha-quartzo-pendentes.jpg',
    title: 'Cozinha em Quartzo Branco',
    place: 'Alphaville, SP',
    material: 'Quartzo Branco',
  },
  {
    src: '/images/portfolio/cozinha-bancada-quartzo.jpg',
    title: 'Cozinha com Ilha Central',
    place: 'Santana de Parnaíba, SP',
    material: 'Quartzo Branco',
  },
  {
    src: '/images/portfolio/cozinha-bancada-preta.jpg',
    title: 'Bancada Preta com Cooktop',
    place: 'Cotia, SP',
    material: 'Granito Preto',
  },
  {
    src: '/images/portfolio/banheiro-bancada-marmore.jpg',
    title: 'Bancada de Banheiro em Mármore',
    place: 'São Paulo, SP',
    material: 'Mármore Travertino',
  },
  {
    src: '/images/portfolio/piso-marmore-ambiente.jpg',
    title: 'Piso em Mármore Calacatta',
    place: 'Sorocaba, SP',
    material: 'Mármore Calacatta',
  },
  {
    src: '/images/portfolio/painel-marmore-penteadeira.jpg',
    title: 'Painel em Mármore Branco',
    place: 'Alphaville, SP',
    material: 'Mármore Branco',
  },
];

export default function CoverFlowGallery() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const dragState = useRef({ startX: 0, dragging: false, accumulated: 0 });

  const go = useCallback((idx) => {
    const n = PROJECTS.length;
    setActive(((idx % n) + n) % n);
  }, []);

  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  // Teclado a11y
  useEffect(() => {
    const onKey = (e) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Drag horizontal — touch + mouse
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (clientX) => {
      dragState.current = { startX: clientX, dragging: true, accumulated: 0 };
    };
    const onMove = (clientX) => {
      if (!dragState.current.dragging) return;
      const delta = clientX - dragState.current.startX;
      dragState.current.accumulated = delta;
      // Cada 80px = troca de card
      if (Math.abs(delta) > 80) {
        if (delta > 0) prev();
        else next();
        // Reset pra evitar múltiplas trocas seguidas
        dragState.current.startX = clientX;
      }
    };
    const onUp = () => { dragState.current.dragging = false; };

    const onMouseDown = (e) => onDown(e.clientX);
    const onMouseMove = (e) => onMove(e.clientX);
    const onTouchStart = (e) => onDown(e.touches[0].clientX);
    const onTouchMove = (e) => { if (e.touches[0]) onMove(e.touches[0].clientX); };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [next, prev]);

  // Auto-rotação suave — pausa quando o usuário interage
  useEffect(() => {
    const id = setInterval(() => {
      if (!dragState.current.dragging) next();
    }, 4500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative w-full h-full">
      {/* Container 3D */}
      <div
        ref={containerRef}
        role="region"
        aria-label="Galeria de projetos — arraste para navegar"
        tabIndex="0"
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing focus:outline-none"
        style={{ perspective: '1400px' }}
      >
        <div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {PROJECTS.map((p, i) => {
            // Distância do card ativo (com wrap)
            const total = PROJECTS.length;
            let offset = i - active;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            // Cards muito longe são escondidos pra performance
            if (absOffset > 2) return null;

            // Posicionamento em arco 3D
            const translateX = offset * 58;     // % do container
            const rotateY    = offset * -32;    // graus
            const translateZ = isCenter ? 0 : -200 * absOffset; // depth
            const scale      = isCenter ? 1 : 0.85;
            const opacity    = isCenter ? 1 : 0.55 - (absOffset - 1) * 0.25;
            const zIndex     = 10 - absOffset;

            return (
              <button
                key={p.src}
                onClick={() => go(i)}
                aria-label={`Ver projeto: ${p.title}`}
                aria-current={isCenter}
                className="absolute top-1/2 left-1/2 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none"
                style={{
                  width: 'min(280px, 65%)',
                  aspectRatio: '3/4',
                  transformStyle: 'preserve-3d',
                  transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: absOffset > 1 ? 'none' : 'auto',
                  cursor: isCenter ? 'default' : 'pointer',
                }}
              >
                <div className="relative w-full h-full overflow-hidden border border-gold/15">
                  <img
                    src={p.src}
                    alt={p.title}
                    draggable="false"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{
                      filter: isCenter ? 'brightness(1)' : 'brightness(0.6) saturate(0.85)',
                      transition: 'filter 600ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                  {/* Overlay com info quando é o card ativo */}
                  {isCenter && (
                    <div
                      className="absolute inset-x-0 bottom-0 p-5 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
                        animation: 'coverFlowOverlayIn 0.6s ease both',
                      }}
                    >
                      <span className="inline-block font-inter text-[9px] tracking-[0.25em] uppercase text-gold mb-1.5">
                        {p.material}
                      </span>
                      <p className="font-playfair text-base text-white leading-snug mb-1">
                        {p.title}
                      </p>
                      <p className="font-inter text-[11px] text-white/55">
                        {p.place}
                      </p>
                    </div>
                  )}
                  {/* Linha dourada decorativa no topo (só no centro) */}
                  {isCenter && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, #c9a96e 30%, #c9a96e 70%, transparent)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Botões nav — desktop */}
        <button
          onClick={prev}
          aria-label="Projeto anterior"
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center bg-[#0a0a0a]/70 hover:bg-gold border border-white/15 hover:border-gold text-white hover:text-[#0a0a0a] backdrop-blur-sm transition-all"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
            <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Próximo projeto"
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center bg-[#0a0a0a]/70 hover:bg-gold border border-white/15 hover:border-gold text-white hover:text-[#0a0a0a] backdrop-blur-sm transition-all"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
            <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Ir para projeto ${i + 1}`}
            aria-selected={active === i}
            className={`rounded-full transition-all duration-300 ${
              active === i ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Hint mobile */}
      <div className="lg:hidden absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-[#0a0a0a]/70 backdrop-blur-sm border border-white/10 pointer-events-none">
        <span className="font-inter text-[10px] tracking-wide text-white/60">
          ← arraste para ver mais →
        </span>
      </div>
    </div>
  );
}
