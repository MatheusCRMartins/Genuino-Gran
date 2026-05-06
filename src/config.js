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
  ga4Id:          'G-XXXXXXXXXX',   // ← substitua pelo ID do Google Analytics 4
  metaPixelId:    'XXXXXXXXXXXXXXX', // ← substitua pelo ID do Meta Pixel
  formspreeId:    'xrejlgvj',        // https://formspree.io/f/xrejlgvj
};
