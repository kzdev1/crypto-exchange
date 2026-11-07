# Crypto Exchange

Site de preços de criptomoedas **em reais**, com números gerais do mercado, notícias e conteúdo educativo. É um **projeto de portfólio**, sem fins comerciais.

**Versão 1.0**

> O Crypto Exchange **não é uma corretora**: não permite comprar, vender nem guardar criptomoedas. Nada no site é recomendação de investimento.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Como usar a plataforma](#como-usar-a-plataforma)
- [Tecnologias](#tecnologias)
- [Rodando o projeto](#rodando-o-projeto)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como os dados são buscados](#como-os-dados-são-buscados)
- [Como editar o conteúdo](#como-editar-o-conteúdo)
- [Segurança](#segurança)
- [Acessibilidade](#acessibilidade)
- [Privacidade e LGPD](#privacidade-e-lgpd)
- [Problemas comuns](#problemas-comuns)
- [Limitações conhecidas](#limitações-conhecidas)
- [Próximos passos](#próximos-passos)
- [Fontes e créditos](#fontes-e-créditos)
- [Autor](#autor)
- [Licença](#licença)

## Funcionalidades

- **Ranking** das maiores criptomoedas, com ordem (capitalização, volume, maiores altas e baixas), **busca** por nome ou sigla e paginação.
- **Resumo do mercado** no topo: número de moedas e corretoras, capitalização, volume, dominância do BTC e do ETH e o índice **Medo e Ganância**.
- **Cards** de moedas em alta, maiores altas e baixas e últimas notícias.
- **Conversor** entre uma criptomoeda e reais, nos dois sentidos.
- **Comparar moedas**: de 2 a 3 moedas lado a lado.
- **Notícias** por assunto (mercado, regulação e Brasil), com manchetes em inglês traduzidas automaticamente.
- **Aprender**: guias curtos e glossário.
- **Páginas legais**: Política de Privacidade, Termos de Uso, Cookies e Aviso legal.
- **Sobre o projeto**.
- Avisos de erro claros, faixa de "sem internet" e botão "Tentar novamente".
- Scroll suave e animações curtas (desligam sozinhas para quem pede menos movimento no sistema).

## Como usar a plataforma

| Quero... | Como fazer |
| --- | --- |
| Ver o ranking completo | Menu **Criptomoedas → Por capitalização**, ou o botão "Ver todas as criptomoedas" |
| Trocar a ordem do ranking | Em `/criptomoedas`, use os botões "Ordenar por" |
| Buscar uma moeda | Digite o nome ou a sigla no campo **Buscar** do menu (por exemplo `bit` ou `btc`) e aperte Enter. A busca vale para as 250 maiores moedas |
| Converter valores | Menu **Ferramentas → Conversor**. Escolha a moeda, digite o valor e use **Inverter** para converter de reais para a moeda |
| Comparar moedas | Menu **Ferramentas → Comparar moedas**. Escolha de 2 a 3 moedas |
| Ler notícias | Seção de notícias na página inicial ou menu **Notícias**. Clicar em um título abre a matéria original em outra aba |
| Entender o mercado | Menu **Aprender** |
| Atualizar um dado com erro | Clique em **Tentar novamente** no aviso |

Os valores do conversor aceitam `1234,56`, `1.234,56` e `1234.56`. Os preços são atualizados a cada alguns minutos, e não em tempo real.

## Tecnologias

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Interface | React e TypeScript |
| Estilo | Tailwind CSS v4 |
| Fonte | Inter (`next/font`) |
| Preços e mercado | CoinGecko API (plano Demo, gratuito) |
| Medo e Ganância | Alternative.me |
| Notícias | Feeds RSS públicos, lidos com `fast-xml-parser` |
| Tradução (opcional) | DeepL API Free |
| Segurança | Pacote `server-only`, cabeçalhos HTTP de segurança e validação de entradas |

## Rodando o projeto

### Pré-requisitos

- Node.js 20.9 ou superior (requisito do Next.js 16)
- npm
- Uma chave gratuita da CoinGecko (veja abaixo)

### Passo a passo

```bash
# 1. Baixe o projeto
git clone https://github.com/kzdev1/crypto-exchange.git
cd crypto-exchange

# 2. Instale as dependências
npm install

# 3. Crie o arquivo .env.local (veja a próxima seção)

# 4. Inicie em modo de desenvolvimento
npm run dev
```

Abra `http://localhost:3000`.

### Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o site em modo de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm start` | Inicia a versão de produção (depois do `build`) |

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
# Obrigatória para dados reais: chave Demo da CoinGecko
COINGECKO_API_KEY=cole-sua-chave-aqui

# Opcional: traduz manchetes em inglês (DeepL API Free)
DEEPL_API_KEY=cole-sua-chave-aqui
```

**Regras importantes:**

- Não use aspas e **não use o prefixo `NEXT_PUBLIC_`**, que deixaria a chave visível no navegador.
- Comentários ficam em uma linha própria, começando com `#`. **Nunca coloque um comentário na mesma linha da chave**, porque ele vira parte do valor e a API recusa a chave (erro 401).
- O `.env.local` já é ignorado pelo Git. Nunca o envie ao GitHub.
- Sem `COINGECKO_API_KEY`: em desenvolvimento o site usa **dados de exemplo** e avisa; em produção mostra uma mensagem de erro (nunca preços falsos).
- Sem `DEEPL_API_KEY`: as manchetes continuam em inglês.

## Estrutura do projeto

```
app/
  page.tsx                 Página inicial
  criptomoedas/            Ranking (ordem, busca e paginação pela URL)
  noticias/                Notícias (todas e por assunto)
  aprender/                Guias e glossário
  sobre/                   Sobre o projeto
  privacidade/ termos/ cookies/ aviso-legal/   Páginas legais
  layout.tsx               Estrutura comum (menu, resumo, rodapé)
  error.tsx                Tela de erro inesperado
  globals.css              Estilos globais, scroll suave e transições
components/
  Navbar/                  Menu, dropdowns e busca
  MarketStatsBar/          Resumo do mercado
  MarketOverview/          Cards do topo, formatação e cores
  CoinsTable/ RankingTable/   Tabelas de moedas
  QuickConverter/ CompareTool/   Ferramentas
  NewsSection/ NewsPage/   Notícias
  LearnPage/ AboutPage/ LegalPage/   Textos das páginas
  Footer/ Container/ CoinIcon/ ErrorNotice/ OfflineNotice/ SmoothAnchors/
lib/
  api/                     coingecko, alternative, news, translate, http, errors
  security/                validate-input.js (validação de texto digitado)
```

## Como os dados são buscados

Todas as chamadas às APIs saem do **servidor** do Next. O navegador do visitante nunca fala com a CoinGecko e nunca vê a chave.

| Dado | Fonte | Guardado por |
| --- | --- | --- |
| Lista de moedas (250) | CoinGecko `/coins/markets` | 10 minutos |
| Moedas em alta | CoinGecko `/search/trending` | 15 minutos |
| Resumo do mercado | CoinGecko `/global` | 30 minutos |
| Medo e Ganância | Alternative.me | 1 hora |
| Notícias | Feeds RSS | 10 minutos |
| Tradução de um título | DeepL | 7 dias |

Isso dá cerca de **8.600 chamadas por mês** à CoinGecko, dentro do limite gratuito (cerca de 10.000). Páginas diferentes reaproveitam a mesma lista, sem chamadas extras. Cada falha vira uma mensagem clara, sem detalhes técnicos.

## Como editar o conteúdo

| Quero mudar... | Edite |
| --- | --- |
| Links do menu | `components/Navbar/nav-links.js` |
| Links e textos do rodapé | `components/Footer/footer-links.js` |
| Fontes de notícias | `lib/api/news-sources.js` |
| Abas de notícias | `components/NewsSection/NewsSection.jsx` e `components/NewsPage/news-pages.js` |
| Guias e glossário | `components/LearnPage/learn-content.js` |
| Textos legais, nome e contato | `components/LegalPage/legal-content.js` e `legal-config.js` |
| Página Sobre | `components/AboutPage/about-content.js` |
| Cores de alta e queda | `components/MarketOverview/tones.js` |
| Colunas das tabelas | `components/CoinsTable/CoinsTable.jsx` e `components/RankingTable/RankingTable.jsx` |

## Segurança

- Chaves de API **só no servidor** (variáveis sem `NEXT_PUBLIC_` e pacote `server-only`), enviadas por cabeçalho e nunca na URL.
- Texto vindo da URL é validado por lista de valores permitidos (`ordem`, `pagina`, `categoria`) ou por `lib/security/validate-input.js` (`busca`), que descarta aspas, `;`, `=`, `<` e `>`.
- Links de notícias só aceitam `http` e `https`; imagens só vêm dos servidores da CoinGecko, por meio do otimizador do Next.
- Nenhum uso de `innerHTML` ou `eval`. O React escapa todo texto exibido.
- Cabeçalhos HTTP: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` (em produção) e uma Content-Security-Policy em modo de teste (`Report-Only`) em `next.config.ts`.
- Mensagens de erro genéricas, sem URL, chave ou detalhes internos.
- O projeto **não usa banco de dados**, então não há SQL. Ao adicionar um, use ORM ou consultas parametrizadas.
- Verifique as dependências de tempos em tempos com `npm audit`.

## Acessibilidade

- HTML semântico, hierarquia de títulos e link "Ir para o conteúdo".
- Navegação completa por teclado, com foco sempre visível.
- Contraste mínimo de 4,5:1 nos textos.
- Cor nunca é o único sinal: altas e quedas têm seta e texto para leitores de tela.
- Tabelas com legenda, cabeçalhos e rolagem acessível.
- Animações e scroll suave respeitam a preferência "reduzir movimento" do sistema.

## Privacidade e LGPD

O site não coleta dados pessoais, não tem cadastro nem login (os botões "Entrar" e "Criar conta" são ilustrativos) e não usa cookies de rastreamento, por isso não exibe banner de cookies. As páginas `/privacidade`, `/termos`, `/cookies` e `/aviso-legal` explicam isso. **Se o projeto passar a coletar dados (login, métricas, anúncios), os textos legais precisam ser revisados antes.** Os textos não substituem a orientação de um advogado.

## Problemas comuns

| Sintoma | Causa e solução |
| --- | --- |
| Avisos vermelhos "serviço de dados indisponível" | No terminal, procure `[api] falha:`. `http (401)` = chave recusada (veja se há comentário na linha da chave). `http (429)` = limite mensal atingido |
| Site sem estilo (HTML puro) | Pare o servidor, apague a pasta `.next`, rode `npm install` e `npm run dev`. Confira o bloco `turbopack` do `next.config.ts` |
| Servidor compilando sem parar | Evite deixar o projeto dentro do OneDrive. Mova-o para uma pasta como `C:\projetos` |
| Aba "Brasil" vazia | O terminal mostra `[news] feed indisponível`. Troque o endereço do feed em `lib/api/news-sources.js` |
| Aviso de hydration no console | Costuma ser extensão do navegador. O `<body>` já usa `suppressHydrationWarning` |

## Limitações conhecidas

- Preços atualizados a cada alguns minutos, não em tempo real.
- A busca e o ranking cobrem as 250 maiores moedas.
- A variação da capitalização total, no resumo, é em dólares (dado oferecido pela API).
- Endereços de feeds de notícias podem sair do ar; as outras fontes continuam funcionando.
- Traduções automáticas podem conter erros.
- Ainda não há páginas de detalhe por moeda nem login real.

## Próximos passos

- Página 404 personalizada, `sitemap.xml`, `robots.txt` e imagens para compartilhamento (Open Graph)
- Ativar a Content-Security-Policy (hoje em modo de teste)
- Publicar o site e atualizar os textos legais com o provedor de hospedagem
- Página de detalhes de cada moeda e categorias
- Testes automatizados

## Fontes e créditos

- Preços e dados de mercado: [CoinGecko](https://www.coingecko.com/)
- Índice Medo e Ganância: [Alternative.me](https://alternative.me/crypto/fear-and-greed-index/)
- Tradução de títulos: [DeepL](https://www.deepl.com/)
- Notícias: veículos indicados em cada notícia (por exemplo Cointelegraph, CoinDesk e Portal do Bitcoin), com link para a matéria original. O site mostra só título, fonte, horário e link.

## Autor

**Kauã Barbosa**, desenvolvedor front-end em início de carreira.

- LinkedIn: https://www.linkedin.com/in/kaua-barbosa/
- GitHub: https://github.com/kzdev1/

## Licença

Ainda não definida. Até que uma licença seja escolhida, todos os direitos permanecem com o autor.