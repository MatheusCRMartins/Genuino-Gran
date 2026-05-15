import { useState, useRef, useEffect } from 'react';

/**
 * BeforeAfterSlider — comparador interativo de imagens.
 *
 * O usuário arrasta o slider (mouse, touch ou teclado) para revelar
 * progressivamente a imagem "depois" sobre a imagem "antes".
 *
 * Props:
 *  - before:   { src, alt }   — imagem antes (fica como fundo)
 *  - after:    { src, alt }   — imagem depois (vai sendo revelada)
 *  - initial:  número 0-100   — posição inicial do slider (default 50)
 */
export default function BeforeAfterSlider({ before, after, initial = 50 }) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const containerRef = useRef(null);

  // Esconde o hint depois da primeira interação
  useEffect(() => {
    if (!dragging) return;
    setHintVisible(false);
  }, [dragging]);

  // Esconde o hint depois de 4s mesmo sem interação (UX: não bloqueia atenção)
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const updatePos = (clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(pct);
  };

  // Mouse handlers
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => updatePos(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  // Touch handlers
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => { if (e.touches[0]) updatePos(e.touches[0].clientX); };
    const onEnd = () => setDragging(false);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [dragging]);

  // Teclado (a11y): setas movem 5%
  const onKey = (e) => {
    if (e.key === 'ArrowLeft')  setPos((p) => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden cursor-ew-resize select-none"
      style={{ aspectRatio: '4/3' }}
      onMouseDown={(e) => { setDragging(true); updatePos(e.clientX); }}
      onTouchStart={(e) => { if (e.touches[0]) { setDragging(true); updatePos(e.touches[0].clientX); } }}
    >
      {/* IMAGEM ANTES (fundo) */}
      <img
        src={before.src}
        alt={before.alt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable="false"
        loading="lazy"
      />
      {/* Label "ANTES" */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#0a0a0a]/85 backdrop-blur-sm border border-white/15 pointer-events-none">
        <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-white/70">Antes</span>
      </div>

      {/* IMAGEM DEPOIS (revelada via clip-path) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
      >
        <img
          src={after.src}
          alt={after.alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
          loading="lazy"
        />
        {/* Label "DEPOIS" — só visível quando o slider está revelando */}
        {pos > 15 && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-gold/95 backdrop-blur-sm">
            <span className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a] font-semibold">
              Depois · Genuíno Gran
            </span>
          </div>
        )}
      </div>

      {/* LINHA DIVISÓRIA + HANDLE */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${pos}%`,
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, #c9a96e 15%, #c9a96e 85%, transparent)',
          boxShadow: '0 0 12px rgba(201,169,110,0.6)',
        }}
      >
        {/* Handle circular no meio */}
        <div
          role="slider"
          tabIndex="0"
          aria-label="Arraste para comparar antes e depois"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKey}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold border-2 border-[#0a0a0a] shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-gold/40"
          style={{ boxShadow: '0 4px 20px rgba(201,169,110,0.45), 0 0 0 4px rgba(10,10,10,0.4)' }}
        >
          <svg viewBox="0 0 16 16" fill="#0a0a0a" className="w-5 h-5" aria-hidden="true">
            <path d="M5 4l-4 4 4 4M11 4l4 4-4 4" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* Hint inicial — pulso suave indicando "arraste" */}
      {hintVisible && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${pos}%`, animation: 'beforeAfterHint 1.8s ease-in-out infinite' }}
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gold/95 whitespace-nowrap">
            <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] font-semibold">
              ← Arraste →
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
