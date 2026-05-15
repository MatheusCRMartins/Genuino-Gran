import { useEffect, useRef, useState } from 'react';

/**
 * Hero3DParallax — Hero com efeito de profundidade 3D real.
 *
 * Desktop: mouse move → camadas se deslocam em profundidades diferentes
 *  (paralaxe de mouse com perspective CSS)
 * Mobile:  DeviceOrientation → tilt do celular movimenta as camadas
 *  (sensação imersiva tipo "iPhone wallpaper")
 *
 * Z-depth das camadas (ordem do mais distante pro mais próximo):
 *  - Glow gold ambient    : z = -40px  (parallax FORTE)
 *  - Foto principal       : z =   0px  (referência)
 *  - Trust badge          : z =  20px  (parallax INVERSO mais sutil)
 *  - Texto + CTAs         : z =  40px  (sempre nítido, segue o cursor)
 *
 * Props:
 *  - children: conteúdo do hero (texto, CTAs, badges)
 *  - imageSrc: caminho da foto principal
 *  - imageAlt
 *  - caption:  string (caption contextual sobre a foto)
 */
export default function Hero3DParallax({ children, imageSrc, imageAlt, caption }) {
  const wrapperRef = useRef(null);
  // x e y são valores -1 a 1 (centro = 0,0; canto = ±1)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hasGyro, setHasGyro] = useState(false);

  // ── DESKTOP: mouse parallax ────────────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    // Verifica se é touch device — pula mouse handler
    if (window.matchMedia('(hover: none)').matches) return;

    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        const y = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
        setTilt({ x, y });
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── MOBILE: DeviceOrientation API ───────────────────────────────────────
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;
    if (typeof window.DeviceOrientationEvent === 'undefined') return;

    let raf;
    const onOrient = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // gamma: rotação lateral (-90 a 90) — usamos pra eixo X
        // beta:  rotação vertical (-180 a 180) — usamos pra eixo Y
        const x = Math.max(-1, Math.min(1, (e.gamma || 0) / 25));
        const y = Math.max(-1, Math.min(1, ((e.beta || 0) - 45) / 25));
        setTilt({ x, y });
        setHasGyro(true);
      });
    };

    // iOS 13+ exige permissão. Tentativa silenciosa.
    const tryAdd = () => window.addEventListener('deviceorientation', onOrient, true);

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS — só funciona após interação. Pedimos no primeiro toque na tela.
      const onFirstTouch = async () => {
        try {
          const perm = await DeviceOrientationEvent.requestPermission();
          if (perm === 'granted') tryAdd();
        } catch {}
        window.removeEventListener('touchstart', onFirstTouch);
      };
      window.addEventListener('touchstart', onFirstTouch, { once: true });
    } else {
      tryAdd();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('deviceorientation', onOrient, true);
    };
  }, []);

  // Cálculo das translações por camada
  const layer = (depth) => ({
    transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
    transition: hasGyro ? 'transform 80ms linear' : 'transform 200ms cubic-bezier(0.22,1,0.36,1)',
    willChange: 'transform',
  });

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Camada -40: glow ambient gold (parallax FORTE pra criar profundidade) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          ...layer(-40),
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.18) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 80% 70%, rgba(201,169,110,0.08) 0%, transparent 45%)',
        }}
      />

      {/* Camada 0: foto principal */}
      <div
        className="absolute inset-0"
        style={{
          ...layer(15),
          // Ligeira escala extra pra evitar bordas vazias com tilt
          transform: `${layer(15).transform} scale(1.08)`,
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
          draggable="false"
        />
        {/* Vinheta editorial sobre a foto */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 -80px 80px -20px rgba(10,10,10,0.85), inset 0 0 120px rgba(10,10,10,0.35)' }}
        />
      </div>

      {/* Camada 20: badge "5.0 Google" (parallax inverso mais sutil) */}
      <div
        className="absolute top-5 right-5 pointer-events-none"
        style={layer(-25)}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a]/85 backdrop-blur-sm border border-gold/30">
          <div className="flex gap-0.5" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 12 12" fill="#c9a96e" className="w-2.5 h-2.5">
                <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 2.5 10.5l.5-3.5L.5 4.5 4 4z" />
              </svg>
            ))}
          </div>
          <span className="font-inter text-[10px] tracking-wide text-white/90">5.0 Google</span>
        </div>
      </div>

      {/* Caption contextual */}
      {caption && (
        <div
          className="absolute bottom-4 left-5 pointer-events-none flex items-center gap-2"
          style={layer(-15)}
        >
          <div className="w-4 h-px bg-gold/70" aria-hidden="true" />
          <span className="font-inter text-[10px] tracking-[0.18em] uppercase text-white/80">
            {caption}
          </span>
        </div>
      )}

      {/* Camada 40: conteúdo principal (texto + CTAs) */}
      <div className="relative h-full" style={layer(8)}>
        {children}
      </div>
    </div>
  );
}
