import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { TextureLoader, RepeatWrapping } from 'three';

/**
 * MarbleScene3D — cena Three.js interativa: bancada de mármore flutuante.
 *
 * O usuário pode arrastar pra girar (OrbitControls). Auto-rotação leve
 * quando sem interação. Texturas de mármore reais aplicadas em PBR
 * (physically-based rendering) com reflexos de ambiente HDRI.
 *
 * Mobile: drag = giro, pinch = zoom. Desktop: mouse drag, scroll = zoom.
 */

function MarbleSlab() {
  const meshRef = useRef(null);

  // Carrega a textura de mármore que já está no projeto
  const texture = useLoader(TextureLoader, '/images/marble-texture-2.jpg');
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  texture.anisotropy = 16;

  // Rotação automática lenta quando ninguém interage
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Bancada principal (slab) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.18, 2.2]} />
        <meshPhysicalMaterial
          map={texture}
          roughness={0.18}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          reflectivity={0.5}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Borda dourada decorativa */}
      <mesh position={[0, 0.092, 0]}>
        <boxGeometry args={[4.005, 0.005, 2.205]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Texto flutuante "GENUÍNO GRAN" no slab */}
      {/* Removido pra performance — pode adicionar depois com Text3D */}
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[2, 0.1, 1]} />
      <meshBasicMaterial color="#1a1a1a" wireframe />
    </mesh>
  );
}

export default function MarbleScene3D({ className = '' }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [3.5, 2.5, 4], fov: 35 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        style={{ background: 'transparent' }}
      >
        {/* Iluminação cinematográfica */}
        <ambientLight intensity={0.35} />
        <directionalLight
          castShadow
          position={[5, 8, 5]}
          intensity={1.4}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 4, -3]} intensity={0.45} color="#c9a96e" />
        <pointLight position={[0, 3, 3]} intensity={0.3} color="#fff" />

        <Suspense fallback={<Loader />}>
          <MarbleSlab />
          {/* Ambient HDRI sutil pra reflexos (preset 'apartment' = neutro) */}
          <Environment preset="apartment" />
          {/* Sombra de contato sob a bancada — aterra o objeto na cena */}
          <ContactShadows
            position={[0, -0.12, 0]}
            opacity={0.55}
            scale={8}
            blur={2.5}
            far={2}
            color="#000"
          />
        </Suspense>

        {/* Controles de câmera */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3.5}
          maxDistance={7}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={false}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>

      {/* Hint de interação */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a]/70 backdrop-blur-sm border border-white/10">
        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-gold/80" aria-hidden="true">
          <path d="M3 8c0-2.8 2.2-5 5-5s5 2.2 5 5M5 8L3 6m0 0L1 8m2-2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-inter text-[10px] tracking-wide text-white/60">
          arraste para girar · role para aproximar
        </span>
      </div>
    </div>
  );
}
