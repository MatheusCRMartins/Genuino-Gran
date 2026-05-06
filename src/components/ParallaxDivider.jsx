/**
 * ParallaxDivider — divisor visual entre seções com efeito parallax.
 * Desktop: background-attachment: fixed faz a imagem ficar "presa" enquanto
 * o conteúdo rola por cima (efeito de sair de trás do site).
 * Mobile/touch: parallax desabilitado via CSS (iOS não suporta fixed).
 */
export default function ParallaxDivider({
  src,
  position = 'center center',
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 'clamp(320px, 55vw, 700px)' }}
    >
      {/* Imagem parallax — background-attachment é controlado pela classe
          .parallax-img (em index.css), que desativa o `fixed` em mobile/touch.
          NÃO usar backgroundAttachment inline aqui — sobrescreveria a media
          query e quebraria o layout no iOS Safari. */}
      <div
        className="parallax-img absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: position,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay leve — só harmoniza com o tema escuro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(10,10,10,0.15)' }}
      />
    </div>
  );
}
