import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orcamento" element={<LandingPage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
