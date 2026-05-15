/**
 * LandingPageV2 — versão experimental "WOW" da LP de conversão.
 *
 * Características vs /orcamento (v1):
 *  - Hero com paralaxe 3D (mouse + giroscópio mobile)
 *  - Comparador antes/depois interativo (drag slider)
 *  - Cena 3D real com Three.js (bancada de mármore girando)
 *  - Scroll cinematográfico com Framer Motion (reveals + pinning)
 *
 * Estratégia: rodar 50% do tráfego pago aqui vs /orcamento e ver qual
 * converte mais. A perdedora é descartada após 1-2 semanas de dados.
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { LogoMark, LogoWordmark } from '../components/Logo';
import { WA_URL, BUSINESS, TRACKING } from '../config';
import Hero3DParallax from '../components/lp/Hero3DParallax';
import BeforeAfterSlider from '../components/lp/BeforeAfterSlider';
import CoverFlowGallery from '../components/lp/CoverFlowGallery';

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.44c-.21.59-1.05 1.1-1.72 1.24-.46.1-1.06.17-3.08-.66-2.58-1.06-4.25-3.68-4.37-3.85-.13-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.12.23-.26.51-.33.67-.33h.48c.15 0 .37-.06.57.44.21.51.72 1.76.78 1.89.06.13.1.28.02.44-.08.17-.12.27-.25.42-.12.15-.26.33-.38.45-.12.12-.25.26-.11.51.15.25.65 1.08 1.4 1.75.97.86 1.78 1.12 2.03 1.24.25.12.4.1.54-.06.15-.16.65-.76.82-1.02.18-.27.35-.22.58-.13.24.09 1.52.72 1.78.85.27.13.44.2.5.31.07.11.07.65-.13 1.25z" />
  </svg>
);

// ── Helpers de animação Framer Motion ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Lead Form (mini, igual à v1) ───────────────────────────────────────────────
function LeadForm({ id = 'lead-form' }) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || nome.trim().length < 2) { setError('Informe seu nome completo.'); return; }
    const digits = whatsapp.replace(/\D/g, '');
    if (!digits || digits.length < 10) { setError('WhatsApp inválido — inclua o DDD.'); return; }

    setSubmitting(true); setError('');

    try {
      const res = await fetch(`https://formspree.io/f/${TRACKING.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ Nome: nome, WhatsApp: whatsapp, Origem: 'LP /orcamento-v2 (WOW)' }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lp_orcamento_v2' });
        }
        if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
      } else {
        setError('Erro ao enviar. Fale direto pelo WhatsApp.');
      }
    } catch {
      setError('Erro de conexão. Fale direto pelo WhatsApp.');
    } finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <div className="w-14 h-14 border border-gold/40 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="font-playfair text-2xl text-white mb-1">Recebemos seu contato!</p>
          <p className="font-inter text-sm text-white/45">
            Retornaremos em até <strong className="text-white/70">2 minutos</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <input
        type="text" placeholder="Seu nome completo" value={nome}
        onChange={(e) => { setNome(e.target.value); setError(''); }}
        autoComplete="name"
        className="w-full bg-white/[0.04] border border-white/15 text-white placeholder-white/25 font-inter text-sm px-4 py-3.5 focus:border-gold focus:outline-none transition-colors"
      />
      <input
        type="tel" placeholder="WhatsApp com DDD — (11) 9 9999-9999" value={whatsapp}
        onChange={(e) => { setWhatsapp(e.target.value); setError(''); }}
        inputMode="tel" autoComplete="tel"
        className="w-full bg-white/[0.04] border border-white/15 text-white placeholder-white/25 font-inter text-sm px-4 py-3.5 focus:border-gold focus:outline-none transition-colors"
      />
      {error && <p className="font-inter text-xs text-red-400/80">{error}</p>}
      <button
        type="submit" disabled={submitting}
        className="w-full py-4 bg-gold text-[#0a0a0a] font-inter font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold-light disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? 'Enviando...' : (
          <>
            Quero meu orçamento gratuito
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
      <p className="font-inter text-[11px] text-white/25 text-center">
        Respondemos em até 2 minutos ·{' '}
        <Link to="/politica-de-privacidade" className="underline underline-offset-2 hover:text-white/45">
          Privacidade
        </Link>
      </p>
    </form>
  );
}

// ── Header simples ─────────────────────────────────────────────────────────────
function LPHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.08]' : 'bg-transparent'
      }`}
    >
      <div className="h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-center">
        <Link to="/" aria-label="Genuíno Gran" className="flex items-center gap-3">
          <LogoMark className="h-9 w-auto flex-shrink-0" color="white" />
          <div className="leading-none">
            <LogoWordmark className="h-[13px] w-auto" color="white" />
            <p className="font-inter text-[9px] tracking-[0.25em] uppercase text-gold mt-1.5">
              Mármore &amp; Granito
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}

// ── Sticky Bar mobile ──────────────────────────────────────────────────────────
function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!visible}
    >
      <div className="flex border-t border-white/10" style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(12px)' }}>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25d366] text-white font-inter font-semibold text-sm">
          <span className="w-5 h-5 text-white">{WA_ICON}</span>
          WhatsApp
        </a>
        <a href="#orcamento" className="flex-1 flex items-center justify-center gap-2 py-4 border-l border-white/[0.08] text-gold font-inter text-sm">
          Orçamento
        </a>
      </div>
    </div>
  );
}

// ── HERO V2 — com paralaxe 3D ──────────────────────────────────────────────────
function HeroV2() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-[68px] lg:min-h-screen bg-[#0a0a0a] overflow-hidden">

      {/* MOBILE: foto com paralaxe 3D acima do conteúdo */}
      <div className="lg:hidden relative w-full overflow-hidden" style={{ height: '46vh', minHeight: '320px', maxHeight: '420px' }}>
        <Hero3DParallax
          imageSrc="/images/portfolio/cozinha-quartzo-pendentes.jpg"
          imageAlt="Bancada de cozinha em mármore — projeto Genuíno Gran"
          caption="Projeto realizado · Alphaville, SP"
        >
          {/* Sem conteúdo dentro do parallax mobile, o texto fica abaixo */}
          <span />
        </Hero3DParallax>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center lg:min-h-[calc(100vh-68px)]">

          {/* Coluna esquerda: conteúdo */}
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={stagger}
            className="pt-6 pb-8 lg:py-24"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 lg:mb-8">
              <div className="w-8 h-px bg-gold" aria-hidden="true" />
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold">
                Agenda 2026 · 14 anos em SP
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-playfair text-white leading-[1.05] tracking-tight mb-5 lg:mb-9"
            >
              <span className="block font-light text-[2.3rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
                Bancada de cozinha
              </span>
              <span className="block font-medium text-[2.3rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
                em <em className="not-italic text-gold">mármore</em>
              </span>
              <span className="block font-light text-[1.3rem] sm:text-2xl lg:text-[1.6rem] text-white/65 mt-2 sm:mt-3 tracking-wide">
                sob medida — entrega em <span className="text-white font-medium">10 dias</span>
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 mb-5 px-3.5 py-2 bg-[#25d366]/10 border border-[#25d366]/30"
            >
              <span className="w-2 h-2 rounded-full bg-[#25d366]" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} aria-hidden="true" />
              <p className="font-inter text-[12px] text-white/85 leading-none">
                Resposta em <strong className="text-white font-semibold">2 minutos</strong> · Sem taxa de visita
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <a
                href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 py-[18px] bg-[#25d366] text-white font-inter font-semibold text-[14px] tracking-wide hover:brightness-110 active:scale-[0.99] transition-all"
                style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.35)' }}
              >
                <span className="w-5 h-5 text-white">{WA_ICON}</span>
                Chamar no WhatsApp agora
              </a>
              <a
                href="#orcamento"
                className="group flex items-center justify-center gap-2 py-4 border-[1.5px] border-gold/70 bg-gold/[0.04] text-gold hover:bg-gold hover:text-[#0a0a0a] font-inter text-[13px] tracking-wider uppercase font-medium transition-all"
              >
                Solicitar orçamento por escrito
              </a>
            </motion.div>
          </motion.div>

          {/* Coluna direita: paralaxe 3D desktop */}
          <div className="hidden lg:block h-[80vh] max-h-[640px]">
            <div className="relative w-full h-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <Hero3DParallax
                imageSrc="/images/portfolio/cozinha-quartzo-pendentes.jpg"
                imageAlt="Bancada de cozinha em mármore — projeto Genuíno Gran"
                caption="Projeto realizado · Alphaville, SP"
              >
                <span />
              </Hero3DParallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Comparador antes/depois ────────────────────────────────────────────────────
function BeforeAfterSection() {
  return (
    <section className="relative py-20 sm:py-24 bg-[#080808] border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">A transformação</p>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-3">
            Veja o que mármore faz com a sua cozinha
          </h2>
          <p className="font-inter text-sm text-white/45 max-w-xl mx-auto">
            Arraste o controle para comparar o antes e o depois de uma reforma real.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-gold/15"
          style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}
        >
          <BeforeAfterSlider
            before={{
              src: '/images/before-after/cozinha-antes.jpg',
              alt: 'Cozinha antiga com bancada de fórmica e armários de madeira velha',
            }}
            after={{
              src: '/images/before-after/cozinha-depois.jpg',
              alt: 'Cozinha luxuosa com bancada em mármore branco e detalhes dourados — Genuíno Gran',
            }}
            initial={48}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="font-inter text-xs text-white/35 italic">
            * Imagens ilustrativas. Cada projeto é único e desenhado sob medida.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Cover Flow — galeria 3D de projetos reais ──────────────────────────────────
function CoverFlowSection() {
  return (
    <section className="relative py-20 sm:py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Glow gold ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
            Galeria de projetos
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-3">
            Mais de 4 mil projetos entregues
          </motion.h2>
          <motion.p variants={fadeUp} className="font-inter text-sm text-white/45 max-w-xl mx-auto">
            Conheça alguns dos trabalhos realizados em São Paulo, Litoral e Interior.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
          style={{ height: 'clamp(440px, 60vw, 560px)' }}
        >
          <CoverFlowGallery />
        </motion.div>
      </div>
    </section>
  );
}

// ── Social Proof ───────────────────────────────────────────────────────────────
function SocialProof() {
  const items = [
    '★ 5.0 no Google',
    '+4.000 projetos entregues',
    '14 anos no mercado',
    'Garantia de 5 anos',
    'Sem taxa de deslocamento',
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-y border-white/[0.07] bg-[#080808]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-10 lg:gap-x-14">
          {items.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="hidden lg:block w-px h-3.5 bg-white/[0.1]" aria-hidden="true" />}
              <span className="font-inter text-[12px] sm:text-[13px] text-white/55">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Processo ───────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: '01', title: 'Chame no WhatsApp', desc: 'Manda uma mensagem, conta o seu projeto. Já enviamos um orçamento inicial.' },
    { n: '02', title: 'Medição gratuita', desc: 'Agendamos uma visita à sua obra sem custo. Sem surpresas no orçamento.' },
    { n: '03', title: 'Instalado em 10 dias', desc: 'Bancada produzida e instalada pela nossa equipe em até 10 dias úteis.' },
  ];
  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={stagger} className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Como funciona</motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white">
            Do primeiro contato à bancada instalada
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
          variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.n} variants={fadeUp}
              className="relative p-8 border border-white/[0.07] hover:border-gold/25 transition-colors duration-400"
              style={{ background: 'linear-gradient(145deg, #111 0%, #0d0d0d 100%)' }}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2.5 w-5 h-px bg-gold/25 z-10" aria-hidden="true" />
              )}
              <span className="font-playfair text-5xl font-bold text-gold/15 select-none block mb-4">{step.n}</span>
              <h3 className="font-playfair text-lg text-white mb-2">{step.title}</h3>
              <p className="font-inter text-sm text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Depoimento ─────────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section className="py-16 sm:py-20 bg-[#080808] border-y border-white/[0.06]">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        variants={stagger} className="max-w-3xl mx-auto px-6 lg:px-10 text-center"
      >
        <motion.div variants={fadeUp} className="flex justify-center gap-1 mb-6" aria-label="5 estrelas">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 16 16" fill="#c9a96e" className="w-4 h-4" aria-hidden="true">
              <path d="M8 1.5l1.9 3.8 4.2.6-3 3 .7 4.1L8 11l-3.8 2 .7-4.1-3-3 4.2-.6z" />
            </svg>
          ))}
        </motion.div>
        <motion.blockquote variants={fadeUp} className="font-playfair text-xl sm:text-2xl md:text-3xl text-white/90 italic leading-relaxed mb-8">
          "Fiz toda a minha cozinha com a Genuíno Gran. O atendimento foi extremamente atencioso
          desde o primeiro contato. Acabamento perfeito, ficou exatamente como eu imaginei."
        </motion.blockquote>
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
          <img
            src="/images/avatars/cliente-1.jpg" alt="Larissa Peixoto"
            className="w-10 h-10 rounded-full object-cover border border-gold/30 flex-shrink-0"
            loading="lazy"
          />
          <div className="text-left">
            <p className="font-inter text-sm text-white font-medium">Larissa Peixoto</p>
            <p className="font-inter text-xs text-white/40">Cozinha em mármore · Sorocaba, fev/2024</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Diferenciais ───────────────────────────────────────────────────────────────
const DIFFS = [
  { title: 'Acabamento alto padrão', desc: 'Mais de 14 anos de experiência em cada detalhe. Precisão milimétrica.', path: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z' },
  { title: 'Entrega em 10 dias', desc: 'Bancada pronta e instalada em até 10 dias úteis após aprovação.', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { title: 'Garantia de 5 anos', desc: 'Todos os projetos com 5 anos de garantia e suporte completo.', path: 'M12 2L4 5v7c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z' },
  { title: 'Cobrimos orçamentos', desc: 'Recebeu proposta mais barata? Enviamos e igualamos sem perder qualidade.', path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
];

function Differentials() {
  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          variants={stagger} className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Por que nos escolher</motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white">
            Qualidade que fala por si
          </motion.h2>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
          variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {DIFFS.map((d) => (
            <motion.div
              key={d.title} variants={fadeUp}
              className="p-7 border border-white/[0.07] hover:border-gold/25 transition-colors duration-300"
              style={{ background: 'linear-gradient(145deg, #111 0%, #0d0d0d 100%)' }}
            >
              <div className="w-10 h-10 border border-gold/20 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold" aria-hidden="true">
                  <path d={d.path} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-playfair text-base text-white mb-2">{d.title}</h3>
              <p className="font-inter text-sm text-white/40 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Form Section ───────────────────────────────────────────────────────────────
function FormSection() {
  return (
    <section id="orcamento" className="py-16 sm:py-20 bg-[#080808] border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Orçamento gratuito</motion.p>
            <motion.h2 variants={fadeUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-6">
              Receba seu orçamento em até 24 horas
            </motion.h2>
            <motion.ul variants={stagger} className="flex flex-col gap-3 mb-8">
              {['Visita de medição 100% gratuita', 'Orçamento detalhado sem compromisso', 'Atendemos toda a Grande SP', 'Cobrimos qualquer orçamento da concorrência'].map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 font-inter text-sm text-white/55">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-5 border-t border-white/[0.07]">
              <img
                src="/images/antonio/antonio-1.jpg" alt="Antonio Roberto"
                className="w-12 h-12 rounded-full object-cover border-2 border-gold/30 flex-shrink-0"
                style={{ objectPosition: '50% 18%' }}
                loading="lazy"
              />
              <div>
                <p className="font-playfair text-sm text-white">Antonio Roberto</p>
                <p className="font-inter text-[10px] text-gold/60 tracking-wide uppercase">Fundador · Mestre Marmorista</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 border border-white/[0.07]"
            style={{ background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' }}
          >
            <div className="h-px w-full bg-gradient-to-r from-gold/60 via-gold/20 to-transparent mb-6" aria-hidden="true" />
            <p className="font-playfair text-xl text-white mb-6">Fale com a gente agora</p>
            <LeadForm id="form-orcamento" />
            <div className="flex items-center gap-3 mt-5">
              <div className="flex-1 h-px bg-white/[0.07]" aria-hidden="true" />
              <span className="font-inter text-[11px] text-white/25 tracking-widest uppercase">ou</span>
              <div className="flex-1 h-px bg-white/[0.07]" aria-hidden="true" />
            </div>
            <a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2.5 py-3.5 border border-[#25d366]/30 text-[#25d366] bg-[#25d366]/[0.06] hover:bg-[#25d366]/15 font-inter text-xs tracking-wide transition-all"
            >
              <span className="w-4 h-4 text-[#25d366]">{WA_ICON}</span>
              Prefere chamar no WhatsApp?
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 bg-[#080808] border-t border-white/[0.06]">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        variants={stagger} className="max-w-2xl mx-auto px-6 text-center"
      >
        <motion.p variants={fadeUp} className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Pronto para começar?</motion.p>
        <motion.h2 variants={fadeUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-3">
          Fale agora com a nossa equipe
        </motion.h2>
        <motion.p variants={fadeUp} className="font-inter text-sm text-white/40 mb-8">
          {BUSINESS.hours} · Respondemos rápido
        </motion.p>
        <motion.a
          variants={fadeUp}
          href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#25d366] text-white font-inter font-semibold text-sm hover:brightness-110 transition-all"
          style={{ boxShadow: '0 4px 24px rgba(37,211,102,0.3)' }}
        >
          <span className="w-5 h-5 text-white">{WA_ICON}</span>
          Chamar no WhatsApp — {BUSINESS.phone}
        </motion.a>
      </motion.div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function MinimalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-[#080808] py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-6 w-auto" color="white" />
          <LogoWordmark className="h-[9px] w-auto" color="white" />
        </div>
        <p className="font-inter text-[11px] text-white/20 hidden sm:block">
          {BUSINESS.email} · {BUSINESS.phone}
        </p>
        <div className="flex items-center gap-5">
          <Link to="/" className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors">Site principal</Link>
          <Link to="/politica-de-privacidade" className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors">Privacidade</Link>
          <p className="font-inter text-[11px] text-white/20">© {year}</p>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LandingPageV2() {
  useEffect(() => {
    document.title = 'Orçamento Premium · Genuíno Gran';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-16 lg:pb-0">
      <LPHeader />
      <StickyBar />
      <HeroV2 />
      <SocialProof />
      <BeforeAfterSection />
      <Process />
      <CoverFlowSection />
      <Testimonial />
      <Differentials />
      <FormSection />
      <FinalCTA />
      <MinimalFooter />
    </div>
  );
}
