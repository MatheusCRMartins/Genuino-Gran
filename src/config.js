/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONFIGURAÇÕES DO NEGÓCIO — edite aqui para atualizar todo o site de uma vez.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const BUSINESS = {
  name:        'Genuíno Gran',
  tagline:     'Mármore e Granito Premium',
  phone:       '(11) 97023-6499',
  whatsapp:    '5511970236499',
  email:       'genuinogran@gmail.com',
  city:        'São Paulo, Litoral e Interior',
  hours:       'Todos os dias · 8h–19h',
  yearsActive: 14,
  projectsDelivered: '+4mil',
  warrantyYears: 5,
  siteUrl:     'https://genuinogran.com.br',
};

/** Redes sociais — strings vazias são ignoradas pelo Footer */
export const SOCIAL = {
  instagram: 'https://instagram.com/genuinogran',
  facebook:  'https://www.facebook.com/profile.php?id=61589398436507',
  google:    'https://www.google.com/search?q=Genu%C3%ADno+Gran&stick=H4sIAAAAAAAA_-NgU1I1qLA0SU5NSzM2M0k0MUgzTU2yMqgwT05KSUlOMU0yTjayTDRMXcTK656aV3p4bV6-gntRYh4AOs_ZVjkAAAA&hl=pt-BR',
};

/** Mensagem padrão do WhatsApp ao clicar nos botões do site */
const WA_MSG = encodeURIComponent(
  'Olá! Vim pelo site da Genuíno Gran e gostaria de solicitar um orçamento.'
);

export const WA_URL = `https://wa.me/${BUSINESS.whatsapp}?text=${WA_MSG}`;

/**
 * IDs de rastreamento — preencha após criar as contas:
 *
 *   GA4:        https://analytics.google.com  →  crie propriedade → copie o ID (G-XXXXXXXXXX)
 *   Meta Pixel: https://business.facebook.com → Events Manager → copie o ID (número de 15 dígitos)
 *   Formspree:  https://formspree.io          → crie um form → copie o ID da URL
 */
export const TRACKING = {
  ga4Id:          'G-68DNKCETG3',   // GA4 ativo · stream "Genuíno Gran"
  metaPixelId:    '980929907635898', // Meta Pixel ativo
  formspreeId:    'xrejlgvj',        // https://formspree.io/f/xrejlgvj
  googleAdsId:    'AW-18160112548',  // tag base do Google Ads (carregada no index.html)
  // Rótulo da ação de conversão "Enviar formulário de lead" (Google Ads)
  googleAdsConversion: 'AW-18160112548/eFqyCNCbsq0cEKSntdND',
};

/**
 * Normaliza um telefone brasileiro para o formato E.164 (+55DDDNUMERO),
 * exigido pelas Conversões Otimizadas (Enhanced Conversions) do Google Ads.
 * Retorna undefined se não houver dígitos. O gtag faz o hash do valor.
 */
export function toE164BR(raw) {
  const d = String(raw || '').replace(/\D/g, '');
  if (!d) return undefined;
  // 12–13 dígitos começando com 55 = já tem código do país (fixo/celular)
  if ((d.length === 12 || d.length === 13) && d.startsWith('55')) return '+' + d;
  return '+55' + d;
}

/**
 * Dispara a conversão do Google Ads com dados do usuário (Enhanced Conversions).
 * email é opcional; telefone é normalizado para E.164. Seguro: o gtag.js
 * aplica hash SHA-256 nos dados antes de enviá-los ao Google.
 */
export function reportAdsConversion({ phone, email } = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const userData = {};
  const tel = toE164BR(phone);
  if (tel) userData.phone_number = tel;
  if (email && email.includes('@')) userData.email = email.trim().toLowerCase();
  if (Object.keys(userData).length) window.gtag('set', 'user_data', userData);
  window.gtag('event', 'conversion', {
    send_to: TRACKING.googleAdsConversion,
    value: 1.0,
    currency: 'BRL',
  });
}
