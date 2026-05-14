import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Differentials from '../components/Differentials';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import ParallaxDivider from '../components/ParallaxDivider';
import PhotoStrip from '../components/PhotoStrip';
import { WA_URL } from '../config';

function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      <span className="wa-pulse absolute inset-0 rounded-full bg-[#25d366]/30 pointer-events-none" />
      <span
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] hover:scale-105 hover:brightness-105 active:scale-95 transition-all duration-300"
        style={{ boxShadow: '0 6px 20px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.25)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-[26px] h-[26px]" aria-hidden="true">
          <path
            fill="white"
            d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z"
          />
        </svg>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main>
        <Hero />
        <div className="hidden lg:block">
          <PhotoStrip />
        </div>
        <Portfolio />

        <ParallaxDivider src="/images/kitchen-angle.jpg" position="center 35%" />

        <About />
        <Services />
        <Differentials />

        <ParallaxDivider src="/images/marble-counter.jpg" position="center 25%" />

        <Testimonials />
        <ContactForm />

        <ParallaxDivider src="/images/kitchen-wide.jpg" position="center 40%" />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
