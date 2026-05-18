import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

// LP de conversão com efeitos WOW (Hero3D, BeforeAfter, CoverFlow, Framer Motion).
// Code-split pra manter a Home leve — só baixa Framer Motion quando alguém
// acessa /orcamento (via ad pago, por exemplo).
const LandingPage = lazy(() => import('./pages/LandingPage'));

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
        <Route
          path="/orcamento"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route path="/orcamento/obrigado" element={<ThankYou />} />
        {/* /orcamento-v2 foi unificada com /orcamento — redirect permanente
            pra preservar tráfego pago que ainda aponte pra ela. */}
        <Route path="/orcamento-v2" element={<Navigate to="/orcamento" replace />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
