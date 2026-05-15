import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

// LP V2 com 3D / Three.js / Framer Motion — code-split pra não pesar
// o bundle das outras páginas (Three.js ~600KB).
const LandingPageV2 = lazy(() => import('./pages/LandingPageV2'));

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold/60">
          Carregando experiência
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orcamento" element={<LandingPage />} />
        <Route path="/orcamento/obrigado" element={<ThankYou />} />
        <Route
          path="/orcamento-v2"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <LandingPageV2 />
            </Suspense>
          }
        />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
