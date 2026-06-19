# MEMORIA.md — Genuíno Gran
> Arquivo de contexto do projeto. Leia este arquivo no início de cada nova sessão para ter contexto completo.
> **Mantenha sempre atualizado** ao final de cada sessão de trabalho.

---

## 1. O QUE É O PROJETO

Site institucional + landing page de conversão para a **Marmoraria Genuíno Gran**, empresa de bancadas, pias, pisos e painéis em mármore, granito e quartzo. Atende São Paulo capital, Alphaville, Osasco, Barueri, Santana de Parnaíba, Cotia, Jundiaí, Sorocaba, litoral e interior paulista.

- **URL em produção:** https://genuinogran.com.br
- **Repositório:** https://github.com/MatheusCRMartins/Genuino-Gran
- **Deploy:** GitHub Actions → FTP Hostinger (automático a cada `git push`)

---

## 2. DADOS DO CLIENTE

| Campo | Valor |
|---|---|
| Empresa | Genuíno Gran |
| Dono | Antonio Roberto (Mestre Marmorista, fundador) |
| WhatsApp | (11) 96723-8569 · link: `wa.me/5511967238569` |
| E-mail | genuinogran@gmail.com |
| Horário | Todos os dias · 8h–19h |
| Mercado | 14 anos, +4mil projetos, 4 colaboradores |
| Garantia | 5 anos em todos os projetos |
| Prazo bancada | 10 dias úteis |
| Prazo projeto completo | 20 dias |
| Áreas | SP capital, Alphaville, Osasco, Barueri, Santana de Parnaíba, Cotia, Jundiaí, Sorocaba, litoral, interior — sem taxa de deslocamento |
| Instagram | @genuinogran |
| Facebook | facebook.com/profile.php?id=61589398436507 |
| Avaliação Google | 5.0 (2 reviews) |

### Depoimentos reais
- **Larissa Peixoto** — Cozinha, Sorocaba, fev/2024. Instalador: Luiz Eduardo. Texto completo em `src/components/Testimonials.jsx`.
- **Samuel** (Osasco/Bela Vista) — pendente texto e autorização.
- Depoimento 3 — pendente.

---

## 3. STACK TÉCNICA

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite 5 + Tailwind CSS 3 |
| Roteamento | React Router DOM v6 |
| Formulários | Formspree (ID: `xrejlgvj`) |
| Analytics | Google Analytics 4 (ID: `G-68DNKCETG3`) |
| Ads pixel | Meta Pixel (ID: `980929907635898`) |
| Hospedagem | Hostinger — Apache + .htaccess SPA fallback |
| CI/CD | GitHub Actions → FTP deploy |
| Linguagem | JavaScript puro (sem TypeScript) |

### Comandos do dia a dia
```bash
npm run dev      # servidor local
npm run build    # build de produção
git add .
git commit -m "descrição"
git push         # deploy automático em ~2 min
```

---

## 4. DESIGN SYSTEM

| Token | Valor |
|---|---|
| Background principal | `#0a0a0a` |
| Background secundário | `#080808` |
| Gold | `#c9a96e` (Tailwind: `text-gold`, `bg-gold`) |
| Gold light | `#d4b88a` (Tailwind: `bg-gold-light`) |
| Fonte título | Playfair Display (Tailwind: `font-playfair`) |
| Fonte corpo | Inter (Tailwind: `font-inter`) |
| Borda sutil | `border-white/[0.07]` |
| Texto principal | `text-white` |
| Texto secundário | `text-white/55` ou `text-white/40` |

---

## 5. ESTRUTURA DE ARQUIVOS

```
genuino-gran/
├── index.html              ← SEO, schemas JSON-LD, GA4, Meta Pixel, conteúdo crawlável
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── .htaccess           ← HTTPS, SPA fallback, cache, gzip
│   ├── logo-full.svg / logo-symbol.svg / logo-wordmark.svg
│   └── images/
│       ├── antonio/        ← antonio-1.jpg, antonio-2.jpg (JÁ INTEGRADAS no About)
│       ├── avatars/        ← cliente-1.jpg, cliente-2.jpg, cliente-3.jpg
│       ├── portfolio/      ← 11 fotos de projetos
│       └── *.jpg           ← marble-swirl, kitchen-wide, kitchen-angle, marble-counter, etc.
├── src/
│   ├── config.js           ← FONTE DA VERDADE de todos os dados do negócio e IDs
│   ├── App.jsx             ← BrowserRouter + Routes
│   ├── main.jsx
│   ├── pages/
│   │   ├── Home.jsx        ← Site institucional completo
│   │   ├── LandingPage.jsx ← LP de conversão (/orcamento)
│   │   ├── NotFound.jsx    ← 404 customizada
│   │   └── PrivacyPolicy.jsx ← Política LGPD (/politica-de-privacidade)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx        ← Slides animados + faixa de urgência
│   │   ├── PhotoStrip.jsx  ← Faixa de fotos (desktop, após Hero)
│   │   ├── Portfolio.jsx   ← Grid de projetos (11 fotos)
│   │   ├── Services.jsx
│   │   ├── Differentials.jsx
│   │   ├── About.jsx       ← Foto do Antonio + história + stats
│   │   ├── Testimonials.jsx
│   │   ├── ContactForm.jsx ← Form Formspree + eventos GA4/Pixel
│   │   ├── Footer.jsx      ← Link para Política de Privacidade
│   │   ├── ParallaxDivider.jsx
│   │   ├── Logo.jsx        ← LogoMark + LogoWordmark
│   │   └── ...
│   └── hooks/
│       └── useScrollAnimation.js ← IntersectionObserver fade-up
├── ROADMAP.md              ← Plano completo do projeto
└── MEMORIA.md              ← Este arquivo
```

---

## 6. ROTAS DO SITE

| URL | Arquivo | Descrição |
|---|---|---|
| `/` | `pages/Home.jsx` | Site institucional (7 seções) |
| `/orcamento` | `pages/LandingPage.jsx` | LP de conversão para tráfego pago |
| `/politica-de-privacidade` | `pages/PrivacyPolicy.jsx` | Política LGPD |
| `*` (qualquer outra) | `pages/NotFound.jsx` | 404 customizada |

---

## 7. REGRA DE OURO — config.js

**Nunca hardcode dados do negócio nos componentes.** Tudo passa pelo `src/config.js`:
- `BUSINESS` — nome, telefone, email, cidade, horário, etc.
- `SOCIAL` — links de redes sociais
- `TRACKING` — IDs de GA4, Meta Pixel, Formspree
- `WA_URL` — link completo do WhatsApp com mensagem pré-preenchida

---

## 8. SEO — O QUE ESTÁ IMPLEMENTADO

### index.html
- `<title>` e `<meta description>` otimizados para busca local
- Keywords: marmoraria são paulo, osasco, barueri, alphaville, grande são paulo, etc.
- Schemas JSON-LD: Organization, LocalBusiness, FAQPage (7 perguntas), Review
- `LocalBusiness.areaServed`: SP, Osasco, Barueri, Santana de Parnaíba, Cotia, Jundiaí, Sorocaba, Alphaville, Litoral, Interior
- Conteúdo HTML estático crawlável (Google indexa sem JS) — seção "Cidades atendidas"
- Open Graph + Twitter Card
- Geo tags (BR-SP)
- Google Search Console verificado (2026-05-09)
- `sitemap.xml` com image tags
- `robots.txt` bloqueando crawlers ruins (Ahrefs, Semrush, MJ12)

### Analytics e rastreamento
- GA4 `G-68DNKCETG3` — ativo, anonymize_ip true
- Meta Pixel `980929907635898` — ativo (ativado em 2026-05-14)
- Evento `generate_lead` disparado no submit do formulário (ContactForm + LandingPage)
- Evento `Lead` Meta Pixel também disparado no submit

---

## 9. LANDING PAGE /orcamento

LP minimalista de conversão sem distrações (sem navbar completa, sem footer institucional).

**Estrutura:**
1. Header fixo (logo + botão WhatsApp)
2. Hero — H1 "Bancada de cozinha em mármore sob medida em 10 dias" + stats + CTAs
3. Barra de prova social (★5.0 · +4mil projetos · 14 anos)
4. Processo em 3 passos
5. Depoimento da Larissa
6. 4 diferenciais
7. Formulário (Nome + WhatsApp) com Formspree — campo `Origem: 'LP /orcamento'`
8. FAQ com accordion (5 perguntas — inclui Osasco/Grande SP)
9. CTA final (botão WhatsApp grande)
10. Footer mínimo (logo + email + links)

---

## 10. O QUE ESTÁ PENDENTE

### Aguardando o cliente fornecer
- [ ] Fotos reais de projetos (mín. 6, ideal 20+) — hoje usa fotos do portfolio existente no projeto
- [ ] Vídeo 60-90s do Antonio Roberto
- [ ] Logo PNG fundo transparente alta res (800px+)
- [ ] Depoimento 2 (Samuel — Osasco/Bela Vista): texto + autorização
- [ ] Depoimento 3: cliente + texto + autorização
- [ ] CNPJ, Razão Social, Inscrição Estadual, endereço fiscal
- [ ] Cores oficiais hex e fonte oficial (brandbook)
- [ ] Dados de ads: orçamento, ticket médio, meta de leads/mês, concorrentes

### Você faz (off-page, não precisa de código)
- [ ] Sitemap no Search Console → Search Console → Sitemaps → digita `sitemap.xml`
- [ ] Google Meu Negócio — categoria "Marmoraria", áreas atendidas (Osasco, Barueri, etc.), fotos, pedir reviews
- [ ] Bing Webmaster Tools — importa do Google Search Console
- [ ] GA4 — marcar `generate_lead` como conversão (só após chegar 1º lead)
- [ ] Meta Business Manager — verificar conta

### Técnicas que posso fazer quando autorizar
- [ ] Compressão WebP — ~30% menos peso nas imagens
- [ ] Form multi-step no mobile — +10-25% conversão
- [ ] Open Graph image otimizada 1200×630 — melhor preview no WhatsApp
- [ ] Service Worker / PWA
- [ ] LPs adicionais: `/lp/bancada-cozinha`, `/lp/osasco`, `/lp/alphaville`, etc.

---

## 11. HISTÓRICO DE SESSÕES

### Sessão 2026-05-07
- Briefing respondido pelo cliente, dados inseridos no `config.js`
- Site base construído (7 seções)

### Sessão 2026-05-09
- SEO técnico completo (schemas, sitemap, robots.txt)
- GA4 ativado
- Google Search Console verificado e indexação solicitada
- Performance: imagens otimizadas, lazy loading, preload LCP

### Sessão 2026-05-14
- **SEO local expandido:** keywords + meta description + LocalBusiness.areaServed + FAQ + conteúdo estático — todos com Osasco, Barueri, Jundiaí, Sorocaba
- **React Router DOM** instalado e configurado
- **LP `/orcamento`** criada (landing page de conversão completa)
- **Página 404** customizada
- **Política de Privacidade** LGPD completa em `/politica-de-privacidade`
- **Footer + ContactForm** — link de privacidade adicionado
- **Meta Pixel `980929907635898`** ativado (script no `<head>` + noscript no `<body>`)
- Sitemap `lastmod` atualizado para 2026-05-14

---

## 12. COMO USAR ESTE ARQUIVO EM NOVO CHAT

Cole no início da conversa:
> "Leia o arquivo MEMORIA.md que está na raiz do projeto e use como contexto completo para continuar o desenvolvimento."

Ou cole o conteúdo deste arquivo diretamente.

**Após cada sessão de trabalho:** atualize a seção 11 (Histórico) com o que foi feito e a seção 10 (Pendências) marcando o que foi concluído.
