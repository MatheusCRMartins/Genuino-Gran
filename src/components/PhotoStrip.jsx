import { useRef, useEffect } from 'react';

const PHOTOS = [
  { src: '/images/portfolio/cozinha-quartzo-pendentes.jpg', pos: 'center 40%' },
  { src: '/images/portfolio/banheiro-painel-marmore.jpg',   pos: 'center 35%' },
  { src: '/images/portfolio/cozinha-quartzo-inox.jpg',      pos: 'center 40%' },
  { src: '/images/portfolio/mesa-marmore-rose.jpg',         pos: 'center center' },
  { src: '/images/portfolio/banheiro-bancada-marmore.jpg',  pos: 'center center' },
  { src: '/images/portfolio/cozinha-bancada-quartzo.jpg',   pos: 'center 60%' },
  { src: '/images/portfolio/cozinha-bancada-preta.jpg',     pos: 'center 40%' },
  { src: '/images/portfolio/painel-marmore-penteadeira.jpg',pos: 'center center' },
  { src: '/images/portfolio/piso-marmore-ambiente.jpg',     pos: 'center center' },
  { src: '/images/portfolio/textura-marmore-carrara.jpg',   pos: 'center center' },
  { src: '/images/portfolio/textura-marmore-veios.jpg',     pos: 'center center' },
];

const TRACK = [...PHOTOS, ...PHOTOS];

const SPEED = 0.03; // px por ms — ajuste aqui para mais/menos rápido

export default function PhotoStrip() {
  const trackRef     = useRef(null);
  const offsetRef    = useRef(0);
  const dragging     = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartOff = useRef(0);
  const lastTime     = useRef(null);
  const rafId        = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = (time) => {
      // Primeira frame após início ou retomada: zera dt para evitar salto
      if (!lastTime.current) lastTime.current = time;
      const dt = time - lastTime.current;
      lastTime.current = time;

      if (!dragging.current) {
        offsetRef.current += SPEED * dt;
        const half = track.scrollWidth / 2;
        if (offsetRef.current >= half) offsetRef.current -= half;
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  /* ── Handlers de arraste ── */
  const startDrag = (clientX) => {
    dragging.current   = true;
    dragStartX.current = clientX;
    dragStartOff.current = offsetRef.current;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const moveDrag = (clientX) => {
    if (!dragging.current) return;
    const delta    = dragStartX.current - clientX;
    const half     = trackRef.current.scrollWidth / 2;
    let newOffset  = dragStartOff.current + delta;
    // Wrap suave
    while (newOffset < 0) newOffset += half;
    while (newOffset >= half) newOffset -= half;
    offsetRef.current = newOffset;
    trackRef.current.style.transform = `translateX(${-newOffset}px)`;
  };

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    lastTime.current = null; // reseta dt para retomada suave
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  return (
    <div className="bg-[#080808] overflow-hidden select-none">
      {/* Fio dourado superior */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-2 sm:gap-3"
        style={{ willChange: 'transform', cursor: 'grab', touchAction: 'pan-y' }}
        /* Mouse */
        onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX); }}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        /* Touch */
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
        onTouchCancel={endDrag}
      >
        {TRACK.map((photo, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden"
            style={{
              width:  'clamp(260px, 68vw, 380px)',
              height: 'clamp(190px, 48vw, 270px)',
            }}
          >
            <img
              src={photo.src}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
              style={{ objectPosition: photo.pos }}
              loading={i < 4 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Fio dourado inferior */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}
