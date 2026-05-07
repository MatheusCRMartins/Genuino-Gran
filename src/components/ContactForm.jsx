import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { LogoMark, LogoWordmark } from './Logo';
import { TRACKING, WA_URL, BUSINESS } from '../config';

const INITIAL = { nome: '', whatsapp: '', email: '', tipo: '', mensagem: '' };

function validate(form) {
  const errors = {};
  if (!form.nome.trim() || form.nome.trim().length < 2)
    errors.nome = 'Informe seu nome completo.';
  const digits = form.whatsapp.replace(/\D/g, '');
  if (!digits || digits.length < 10 || digits.length > 11)
    errors.whatsapp = 'Informe um WhatsApp válido com DDD.';
  // E-mail é opcional, mas se preenchido deve ser válido
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'E-mail inválido.';
  if (!form.tipo)
    errors.tipo = 'Selecione o tipo de projeto.';
  if (!form.mensagem.trim() || form.mensagem.trim().length < 10)
    errors.mensagem = 'Descreva brevemente o seu projeto (mín. 10 caracteres).';
  return errors;
}

/* ─── Label + error wrapper ──────────────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-[10px] tracking-[0.22em] uppercase text-white/40">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-inter text-[12px] text-red-400/80 flex items-center gap-1.5">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  'form-field w-full bg-transparent border-b border-white/15 text-white placeholder-white/20 font-inter text-[14px] px-0 py-3.5 transition-all duration-200 focus:border-gold focus:outline-none';

/* ─── Marble feature panel (left column) — desktop only ─────────────────── */
function MarblePanel() {
  return (
    <div className="relative h-full overflow-hidden flex flex-col justify-between p-10 lg:p-12">
      {/* Foto de mármore real — escurecida para servir de pano de fundo */}
      <img
        src="/images/marble-texture-2.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.32) saturate(0.65)' }}
      />

      {/* Overlay escuro principal — garante contraste do texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(14,14,14,0.78) 60%, rgba(10,10,10,0.92) 100%)' }}
      />

      {/* Gradiente dourado — calor no canto inferior direito */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 100%, rgba(201,169,110,0.18) 0%, transparent 55%)' }}
      />

      {/* Surface sheen — reflexo sutil no topo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 10%, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
      />

      {/* Left gold border */}
      <div aria-hidden="true" className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-auto flex-shrink-0" color="white" />
          <LogoWordmark className="h-[12px] w-auto" color="white" />
        </div>
        <p className="font-inter text-[10px] tracking-[0.22em] uppercase text-gold mt-0.5">
          Mármore &amp; Granito Premium
        </p>
      </div>

      {/* Pull quote */}
      <div className="relative z-10 my-auto">
        <span className="font-playfair text-6xl text-gold/30 leading-none select-none" aria-hidden="true">"</span>
        <blockquote className="font-playfair text-xl lg:text-2xl text-white/95 leading-relaxed -mt-4">
          A beleza da pedra natural está na sua singularidade. Nenhuma peça é igual à outra.
        </blockquote>
      </div>

      {/* Contact details */}
      <div className="relative z-10 flex flex-col gap-4">
        <div className="h-px bg-white/15" />
        <div className="flex flex-col gap-3">
          {[
            { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z', label: 'WhatsApp', value: BUSINESS.phone },
            { icon: 'M3 6h18v12H3zM3 6l9 7 9-7', label: 'E-mail', value: BUSINESS.email },
            { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z', label: 'Atendimento', value: BUSINESS.city },
            { icon: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z', label: 'Horário', value: BUSINESS.hours },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gold flex-shrink-0">
                <path d={c.icon} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-white/55">{c.label}</span>
                <span className="font-inter text-[13px] text-white/90">{c.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Faixa de contato compacta — mobile only ────────────────────────────── */
function MobileContactStrip() {
  return (
    <div
      className="lg:hidden mb-5 p-5 border border-white/[0.07]"
      style={{ background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' }}
    >
      <div className="h-px w-full bg-gradient-to-r from-gold/60 via-gold/20 to-transparent mb-4" />
      <div className="flex flex-col gap-3">
        {[
          { label: 'WhatsApp', value: BUSINESS.phone },
          { label: 'E-mail', value: BUSINESS.email },
          { label: 'Atendimento', value: BUSINESS.city },
          { label: 'Horário', value: BUSINESS.hours },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-white/30">{c.label}</span>
              <span className="font-inter text-[13px] text-white/60">{c.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [leftRef, leftVisible] = useScrollAnimation(0.12);
  const [rightRef, rightVisible] = useScrollAnimation(0.08);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    setFormError('');

    try {
      const res = await fetch(`https://formspree.io/f/${TRACKING.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          Nome: form.nome,
          WhatsApp: form.whatsapp,
          'E-mail': form.email || '(não informado)',
          'Tipo de Projeto': form.tipo,
          Mensagem: form.mensagem,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        // ── Disparar eventos de conversão ──────────────────────────────
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', { content_name: form.tipo });
        }
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'formulario',
            event_label: form.tipo,
          });
        }
      } else {
        setFormError('Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.');
      }
    } catch {
      setFormError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contato" className="bg-[#0a0a0a]">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 sm:pt-24 pb-8 sm:pb-10">
        <div className={`fade-up ${leftVisible ? 'visible' : ''}`} ref={leftRef}>
          <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
            Fale Conosco
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white title-accent">
            Solicite seu orçamento gratuito
          </h2>
        </div>
      </div>

      {/* Two-column: marble panel + form */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 sm:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Faixa de contato mobile */}
          <MobileContactStrip />

          {/* Marble panel — desktop only */}
          <div className={`hidden lg:block fade-up ${leftVisible ? 'visible' : ''}`}>
            <MarblePanel />
          </div>

          {/* Form */}
          <div
            ref={rightRef}
            className={`fade-up lg:delay-2 ${rightVisible ? 'visible' : ''}`}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-8 text-center p-8 sm:p-10 border border-white/[0.07]"
                style={{ background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' }}
              >
                <div className="w-16 h-16 border border-gold/40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-playfair text-3xl text-white mb-3">Mensagem enviada!</p>
                  <p className="font-inter text-[14px] text-white/45 leading-relaxed max-w-xs mx-auto">
                    Obrigado pelo contato. Nossa equipe retornará em até{' '}
                    <strong className="text-white/70 font-medium">24 horas</strong>.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm(INITIAL); }}
                  className="font-inter text-[11px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors underline underline-offset-4"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-7 sm:gap-8 p-6 sm:p-8 lg:p-12 border border-white/[0.07] h-full"
                style={{ background: 'linear-gradient(145deg, #111 0%, #0e0e0e 100%)' }}
              >
                {/* Top gold accent */}
                <div className="h-px w-full bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
                  <Field label="Nome *" error={errors.nome}>
                    <input
                      type="text"
                      className={inputBase}
                      placeholder="Seu nome completo"
                      value={form.nome}
                      onChange={set('nome')}
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="WhatsApp *" error={errors.whatsapp}>
                    <input
                      type="tel"
                      className={inputBase}
                      placeholder="(11) 9 9999-9999"
                      value={form.whatsapp}
                      onChange={set('whatsapp')}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </Field>
                </div>

                <Field label="E-mail (opcional)" error={errors.email}>
                  <input
                    type="email"
                    className={inputBase}
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                    inputMode="email"
                  />
                </Field>

                <Field label="Tipo de Projeto *" error={errors.tipo}>
                  <select
                    className={`${inputBase} cursor-pointer appearance-none`}
                    value={form.tipo}
                    onChange={set('tipo')}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23c9a96e' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 4px center',
                      backgroundSize: '18px',
                      color: form.tipo ? '#ffffff' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <option value="" disabled>Selecione o tipo de projeto</option>
                    <option value="cozinha"  style={{ color: '#000', background: '#fff' }}>Bancada de Cozinha</option>
                    <option value="banheiro" style={{ color: '#000', background: '#fff' }}>Pia / Banheiro</option>
                    <option value="piso"     style={{ color: '#000', background: '#fff' }}>Piso / Revestimento</option>
                    <option value="painel"   style={{ color: '#000', background: '#fff' }}>Painel Esculpido</option>
                    <option value="outro"    style={{ color: '#000', background: '#fff' }}>Outro</option>
                  </select>
                </Field>

                <Field label="Mensagem *" error={errors.mensagem}>
                  <textarea
                    rows={4}
                    className={`${inputBase} resize-none`}
                    placeholder="Descreva o projeto: cômodo, dimensões aproximadas, material de preferência..."
                    value={form.mensagem}
                    onChange={set('mensagem')}
                  />
                </Field>

                {/* Submit */}
                <div className="mt-auto flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gold text-[#0a0a0a] font-inter font-semibold text-[11px] tracking-[0.25em] uppercase hover:bg-gold-light active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Quero meu orçamento gratuito
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  {formError && (
                    <div className="flex flex-col gap-2">
                      <p className="font-inter text-[12px] text-red-400/80 text-center">{formError}</p>
                      <a
                        href={WA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter text-[11px] text-[#25d366]/70 hover:text-[#25d366] text-center transition-colors underline underline-offset-4"
                      >
                        Falar pelo WhatsApp
                      </a>
                    </div>
                  )}

                  <p className="font-inter text-[11px] text-white/25 text-center tracking-wide">
                    Retorno em até <span className="text-white/45">24 horas</span>
                    {' '}·{' '}
                    Seus dados estão seguros
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
