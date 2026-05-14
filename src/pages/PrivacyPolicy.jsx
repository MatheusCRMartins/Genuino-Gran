import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark, LogoWordmark } from '../components/Logo';
import { BUSINESS } from '../config';

const LAST_UPDATED = '14 de maio de 2026';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Política de Privacidade · Genuíno Gran';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/[0.07] py-5 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Genuíno Gran">
            <LogoMark className="h-7 w-auto" color="white" />
            <LogoWordmark className="h-[10px] w-auto" color="white" />
          </Link>
          <Link
            to="/"
            className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-16 sm:py-20">
        <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Legal</p>
        <h1 className="font-playfair text-3xl sm:text-4xl font-medium text-white mb-3">
          Política de Privacidade
        </h1>
        <p className="font-inter text-xs text-white/30 mb-12">
          Última atualização: {LAST_UPDATED}
        </p>

        <div className="flex flex-col gap-10 font-inter text-sm text-white/60 leading-relaxed">

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">1. Quem somos</h2>
            <p>
              A <strong className="text-white/80">Genuíno Gran</strong> ({BUSINESS.email}) é uma
              marmoraria especializada em bancadas, pias e revestimentos em pedra natural, com
              atuação em São Paulo e região. Esta Política de Privacidade descreve como coletamos,
              usamos e protegemos seus dados pessoais em conformidade com a Lei Geral de Proteção
              de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">2. Dados que coletamos</h2>
            <p className="mb-3">Ao preencher nosso formulário de contato, coletamos:</p>
            <ul className="list-disc list-inside flex flex-col gap-1.5 ml-2">
              <li><strong className="text-white/75">Nome completo</strong></li>
              <li><strong className="text-white/75">Número de WhatsApp</strong> (com DDD)</li>
              <li><strong className="text-white/75">E-mail</strong> (campo opcional)</li>
              <li><strong className="text-white/75">Tipo de projeto</strong> e descrição da necessidade</li>
            </ul>
            <p className="mt-3">
              Também coletamos dados de navegação de forma anônima por meio do Google Analytics 4
              (endereço IP anonimizado) para entender o desempenho do site.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">3. Como usamos seus dados</h2>
            <ul className="list-disc list-inside flex flex-col gap-1.5 ml-2">
              <li>Responder sua solicitação de orçamento</li>
              <li>Entrar em contato para agendar visita de medição</li>
              <li>Enviar informações sobre nossos serviços (somente quando solicitado)</li>
              <li>Melhorar a experiência do site (dados de analytics)</li>
            </ul>
            <p className="mt-3">
              Não utilizamos seus dados para spam, não os vendemos a terceiros e não os
              compartilhamos com fins comerciais.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">4. Compartilhamento de dados</h2>
            <p className="mb-3">
              Seus dados podem ser processados pelos seguintes parceiros técnicos:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-1.5 ml-2">
              <li>
                <strong className="text-white/75">Formspree</strong> — serviço de processamento de
                formulários (formspree.io). Os dados são transmitidos de forma segura (HTTPS) e
                entregues ao nosso e-mail.
              </li>
              <li>
                <strong className="text-white/75">Google Analytics 4</strong> — análise de tráfego
                com IP anonimizado (analytics.google.com).
              </li>
              <li>
                <strong className="text-white/75">Meta Pixel</strong> (quando ativo) — rastreamento
                de conversões para campanhas de anúncios no Facebook e Instagram
                (business.facebook.com).
              </li>
            </ul>
            <p className="mt-3">
              Todos esses serviços possuem suas próprias políticas de privacidade e são responsáveis
              pela proteção dos dados em suas plataformas.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">5. Retenção dos dados</h2>
            <p>
              Mantemos seus dados pelo tempo necessário para prestar o serviço solicitado e, após
              isso, pelo período exigido pela legislação aplicável. Você pode solicitar a exclusão
              dos seus dados a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">6. Seus direitos (LGPD)</h2>
            <p className="mb-3">Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc list-inside flex flex-col gap-1.5 ml-2">
              <li>Confirmar se tratamos seus dados</li>
              <li>Acessar os dados que temos sobre você</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento dado anteriormente</li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-gold hover:text-gold-light underline transition-colors"
              >
                {BUSINESS.email}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">7. Cookies</h2>
            <p>
              Utilizamos cookies técnicos essenciais para o funcionamento do site e cookies de
              analytics (Google Analytics 4 com IP anonimizado). Ao continuar navegando no site,
              você concorda com o uso desses cookies.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">8. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Sempre que houver alteração relevante,
              a data de "Última atualização" será modificada. Recomendamos revisar esta página
              periodicamente.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-white mb-3">9. Contato</h2>
            <p>Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato:</p>
            <div
              className="mt-4 p-5 border border-white/[0.07]"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <p className="text-white/70 mb-1">
                <strong className="text-white/85">Genuíno Gran</strong>
              </p>
              <p>
                E-mail:{' '}
                <a href={`mailto:${BUSINESS.email}`} className="text-gold">
                  {BUSINESS.email}
                </a>
              </p>
              <p>WhatsApp: {BUSINESS.phone}</p>
              <p>Horário: {BUSINESS.hours}</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-6 mt-4">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-[11px] text-white/20">
            © {new Date().getFullYear()} Genuíno Gran. Todos os direitos reservados.
          </p>
          <Link
            to="/"
            className="font-inter text-[11px] text-white/25 hover:text-white/50 transition-colors"
          >
            Voltar ao site
          </Link>
        </div>
      </footer>
    </div>
  );
}
