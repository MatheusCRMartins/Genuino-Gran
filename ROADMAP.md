# Roadmap — Genuíno Gran

> Site institucional + Landing Page de conversão para tráfego pago.
> Última atualização: 2026-05-09

---

## 📊 STATUS ATUAL

### ✅ Pronto no ar (genuinogran.com.br)

**Site institucional**
- React 18 + Vite 5 + Tailwind 3
- 7 seções: Hero, Portfólio, Serviços, Diferenciais, Sobre, Depoimentos, Contato, Footer
- Totalmente responsivo (320px → 1920px) — testado em iPhone, iPad, desktop
- Hero com slides animados + faixa de urgência "Agenda 2026 aberta"
- Seção Sobre com história do Antonio Roberto + foto real
- Depoimento real da Larissa + 3 hipotéticos editáveis
- WhatsApp flutuante em todas as seções
- Form integrado ao Formspree (`xrejlgvj`) — leads chegam em `genuinogran@gmail.com`

**Infraestrutura**
- Hospedado no Hostinger (`public_html`)
- HTTPS forçado, cache de assets, SPA fallback (`.htaccess`)
- Deploy automático via GitHub Actions a cada `git push`
- Repositório: https://github.com/MatheusCRMartins/Genuino-Gran

**SEO técnico**
- `<title>` e `meta description` otimizados para busca local
- Conteúdo SEO no HTML cru (2.463 chars indexáveis sem JS)
- 4 schemas JSON-LD: Organization, LocalBusiness, FAQPage, Review
- `sitemap.xml` com `image:image` tags
- `robots.txt` blindado (bloqueia AhrefsBot, SemrushBot, MJ12)
- Geo tags (geo.region, geo.position, ICBM)
- Verificação Google Search Console ativa (meta + arquivo HTML)
- **Indexação solicitada** em 2026-05-09 → resultado em 2-7 dias

**Analytics**
- Google Analytics 4 ativo: `G-68DNKCETG3`
- Stream "Genuíno Gran" configurado
- Anonymize IP ativado (LGPD-friendly)
- Form dispara evento `generate_lead` automaticamente

**Performance**
- Total dist: 2.5 MB (de 5 MB)
- 19 de 20 imagens com `loading="lazy"`
- Preload do LCP (marble-swirl.jpg)
- DNS prefetch para Google Fonts
- Imagens otimizadas (50% economia)

---

## 🚀 FASE 1 — Landing Page de Conversão (`/orcamento`)

### Objetivo
LP dedicada para tráfego pago (Google Ads + Meta Ads).
Conversion rate esperada: **5-15%** (vs 1-2% do site institucional).

### Estrutura proposta
```
1. HERO
   - H1: "Bancada de cozinha em mármore sob medida em 10 dias"
   - Sub: 14 anos · +4mil projetos · garantia 5 anos
   - CTA primário: botão WhatsApp gigante verde
   - CTA secundário: form inline (só Nome + WhatsApp)
   - Foto real de projeto (Unsplash temporário)

2. PROVA SOCIAL (1 linha)
   ★ 5.0 Google · +4mil projetos · 14 anos no mercado

3. PROCESSO em 3 passos
   1. Chama no zap → 2. Medição grátis → 3. Instalada em 10 dias

4. DEPOIMENTO ÂNCORA (Larissa, único)

5. GARANTIA + DIFERENCIAIS (4 ícones)
   Acabamento · 10 dias · 5 anos garantia · Cobrimos orçamentos

6. FAQ (5 perguntas)
   - Quanto custa?
   - Como funciona o pagamento?
   - Vocês atendem minha região?
   - Que materiais usam?
   - Tem garantia?

7. CTA FINAL
   WhatsApp + form 2 campos

8. FOOTER mínimo (3 linhas)
```

### Tecnicamente
- Adicionar **React Router** ao projeto atual
- Nova rota: `genuinogran.com.br/orcamento`
- Mesmo repositório, mesmo deploy
- Reusa componentes (Logo, Avatar, Stars, etc.)
- Sem nav, sem footer institucional → 0 distração

### Roadmap de LPs futuras (Fase 2+)
- `/lp/bancada-cozinha`
- `/lp/pia-banheiro`
- `/lp/piso-marmore`
- `/lp/painel-esculpido`
- `/lp/alphaville` (por região)
- `/lp/santana-de-parnaiba`
- `/lp/cotia`

### Decisões pendentes pra começar
- [ ] Plataforma de ads: **Google Ads** (busca) ou **Meta Ads** (Instagram)?
- [ ] Foto hero: usar Unsplash ou tem foto real de bancada de cozinha?
- [ ] Oferta secundária: "Sem taxa de visita" / "Orçamento em 24h" / "Garantia 5 anos"?

**Tempo estimado de execução:** 3-4 horas de implementação.

---

## 📋 PENDÊNCIAS

### 🚨 URGENTE — Off-page (você faz, alto impacto)

| # | Tarefa | Onde | Tempo |
|---|---|---|---|
| 1 | Enviar `sitemap.xml` no Search Console | Search Console → Sitemaps → digita `sitemap.xml` | 2 min |
| 2 | Resolver Meta Pixel (criação travada) | Tenta no Edge ou desativa adblock | 15 min |
| 3 | Marcar `generate_lead` como conversão no GA4 | GA4 → Admin → Eventos (após 1º lead) | 1 min |
| 4 | Bing Webmaster Tools (importa do GSC) | https://www.bing.com/webmasters | 5 min |

### 🏆 ALTA prioridade — Google Meu Negócio (SEO local)

| # | Tarefa | Tempo |
|---|---|---|
| 5 | Otimizar descrição com palavras-chave (marmoraria SP, alphaville, etc) | 10 min |
| 6 | Definir categoria principal: "Marmoraria" | 1 min |
| 7 | Adicionar áreas atendidas: SP, Alphaville, Santana, Cotia, Litoral, Interior | 5 min |
| 8 | Postar 8-10 fotos de projetos reais | 10 min |
| 9 | Pedir avaliações a clientes existentes (meta: +20 reviews em 30 dias) | ongoing |

### 📦 MÉDIA prioridade — Materiais do briefing (cliente fornece)

#### Mídias visuais (alto impacto na conversão)
- [ ] **Fotos reais de projetos** — substituir Unsplash do portfólio (mín. 6, ideal 20+)
  - Mínimo 1200px de largura, JPG/PNG, sem marca d'água
  - Cozinhas, banheiros, pisos, painéis
- [ ] **Foto do Antonio Roberto** — substituir avatar "AR" da seção Sobre
- [ ] **Vídeo 60-90s do Antonio Roberto** — apresentação da empresa para Hero/About
- [ ] **Logo PNG fundo transparente** alta resolução (briefing pediu 800px+)

#### Depoimentos (briefing seção 8 incompleto)
- [ ] **Depoimento 2** (Samuel — Osasco/Bela Vista): texto + autorização
- [ ] **Depoimento 3**: cliente + texto + autorização
- [ ] **Foto opcional** de cada cliente (autorização)
- [ ] Substituir depoimentos hipotéticos (Marina, Rafael, Camila) por reais

#### Dados cadastrais (briefing seção 1 vazio)
- [ ] CNPJ
- [ ] Razão Social
- [ ] Inscrição Estadual
- [ ] Endereço fiscal completo
- [ ] Ano oficial de fundação (estou usando 2011 — confirmar)

#### Identidade visual (briefing seção 3 vazio)
- [ ] Cores oficiais (hex)
- [ ] Fonte oficial (se houver)
- [ ] Brandbook (se houver)

#### Dados de ads (briefing seção 9 vazio)
- [ ] Orçamento mensal para anúncios (R$)
- [ ] Plataforma preferida (Google / Meta / ambos)
- [ ] Ticket médio por projeto (R$)
- [ ] Meta de leads/mês
- [ ] 3-5 concorrentes diretos (nome + site/IG + ponto fraco/forte)
- [ ] Tom de voz desejado (luxo / custo-benefício / técnico)
- [ ] Palavras que representam/NÃO representam a marca
- [ ] Referências de sites/marcas admiradas

#### Contas digitais
- [ ] **Meta Pixel** criado e ID copiado
- [ ] Meta Business Manager verificado
- [ ] Google Ads conta criada + cartão cadastrado
- [ ] E-mail profissional `contato@genuinogran.com.br` (opcional mas recomendado)

### 🛠 TÉCNICAS — Posso fazer quando você autorizar

#### Alta prioridade
- [ ] **LP de conversão `/orcamento`** ← FASE 1 deste roadmap
- [ ] **Página 404 customizada** — hoje 404 fica em branco
- [ ] **Política de Privacidade + Termos de Uso** — LGPD (form coleta dados)
- [ ] **Open Graph image otimizada** (1200×630) — preview no WhatsApp/Facebook
- [ ] **Compressão WebP** — economia adicional de ~30% (~700KB)

#### Média prioridade
- [ ] **Form multi-step** no mobile (Tipo → Nome → Contato) — +10-25% conversão mobile
- [ ] **Calculadora de orçamento** simples ("estimar em 30s")
- [ ] **Service Worker / PWA** — site abre offline depois da 1ª visita
- [ ] **Schema BreadcrumbList** — rich snippet adicional
- [ ] **Pre-render real com Puppeteer** — SEO ainda mais robusto

#### Baixa prioridade
- [ ] Skeleton screens (perceived speed)
- [ ] Modal de imagem fullscreen no Portfólio
- [ ] Blog (artigos sobre tipos de mármore, cuidados) — SEO cauda longa, depende de conteúdo

#### Off-page extra
- [ ] Cadastrar em Tele Listas, Apontador, GuiaMais, Soluções Industriais
- [ ] Perfil Houzz (alta autoridade SEO arquitetura)
- [ ] Backlinks com arquitetos parceiros

---

## 📅 CRONOGRAMA SUGERIDO

### Esta semana
1. ✅ Enviar sitemap.xml no Search Console (2 min)
2. ✅ Resolver criação Meta Pixel (Edge/sem adblock)
3. ✅ Otimizar Google Meu Negócio
4. 🛠 Eu construo a LP `/orcamento`

### Próximas 2 semanas
- Cliente entrega **fotos reais** de projetos → atualizo Portfólio
- Cliente entrega **foto do Antonio** → atualizo Sobre
- Coletar **+2 depoimentos reais** → atualizo Testimonials
- Eu implemento **Política de Privacidade + LGPD**

### Mês 1
- Início campanhas Google Ads + Meta Ads apontando para LP
- Monitorar GA4 + Meta Events Manager
- A/B testing da LP (variação A vs B)
- Coleta de reviews no Google Meu Negócio

### Mês 2-3
- Análise de funil de conversão
- LPs adicionais por intenção (banheiro, piso, painel)
- Otimização baseada em dados reais (heatmap, scroll depth)
- Blog opcional (SEO cauda longa)

### Mês 3-6
- Top 3 do Google Maps (com GMB ativo + reviews)
- Backlinks orgânicos (Houzz, parceiros)
- Possíveis LPs regionais (Alphaville, Santana)

---

## 🛠 STACK TÉCNICA

- **Frontend:** React 18 + Vite 5 + Tailwind CSS 3
- **Hospedagem:** Hostinger (Apache + .htaccess)
- **CI/CD:** GitHub Actions → FTP deploy automático
- **Form backend:** Formspree (plano grátis, 50 submissões/mês)
- **Analytics:** Google Analytics 4 (G-68DNKCETG3)
- **Search Console:** verificado em 2026-05-09
- **Repositório:** https://github.com/MatheusCRMartins/Genuino-Gran

### Comandos do dia a dia (atualizar o site)
```bash
# Dentro da pasta do projeto:
git add .
git commit -m "descrição da mudança"
git push
# Em 2 minutos o site atualiza sozinho
```

### Endpoints úteis
- Site: https://genuinogran.com.br
- Search Console: https://search.google.com/search-console
- GA4: https://analytics.google.com
- Formspree: https://formspree.io
- GitHub Actions: https://github.com/MatheusCRMartins/Genuino-Gran/actions

---

## 📞 CONTATOS DO NEGÓCIO (do config.js)

- **WhatsApp:** (11) 97023-6499
- **E-mail:** genuinogran@gmail.com
- **Horário:** Todos os dias · 8h–19h
- **Áreas:** São Paulo, Alphaville, Santana de Parnaíba, Cotia, Sorocaba, Litoral, Interior
- **Instagram:** @genuinogran
- **Facebook:** https://www.facebook.com/profile.php?id=61589398436507
