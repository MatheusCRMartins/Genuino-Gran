/**
 * PhotoStrip — faixa horizontal de fotos com scroll infinito automático.
 * Pausa ao hover (desktop). Colocada entre o Hero e o Portfolio.
 */

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

/* Duplica para o loop infinito ser perfeito */
const TRACK = [...PHOTOS, ...PHOTOS];

export default function PhotoStrip() {
  return (
    <div className="bg-[#080808] overflow-hidden select-none">

      {/* Fio dourado superior */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Faixa de fotos */}
      <div
        className="flex gap-2 sm:gap-3"
        style={{
          animation: 'marquee 55s linear infinite',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
      >
        {TRACK.map((photo, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden"
            style={{
              width: 'clamp(260px, 68vw, 380px)',
              height: 'clamp(190px, 48vw, 270px)',
            }}
          >
            <img
              src={photo.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
