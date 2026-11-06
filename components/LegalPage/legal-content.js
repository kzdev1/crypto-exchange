// Textos das páginas legais. Cada documento é uma lista de seções (título, parágrafos e,
// se houver, uma lista). Use {owner} e {site} para inserir o nome do responsável e do site.
// IMPORTANTE: se o site passar a coletar dados (login, métricas, anúncios), estes textos
// precisam ser revisados antes.

export const legalDocuments = {
  privacidade: {
    title: "Política de Privacidade",
    description:
      "Como o Crypto Exchange trata dados pessoais, em linha com a Lei Geral de Proteção de Dados (LGPD).",
    showContact: true,
    sections: [
      {
        heading: "Quem somos",
        paragraphs: [
          "O {site} é um projeto de portfólio, sem fins comerciais, mantido por {owner}. Esta política explica como o site trata dados, em linha com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).",
        ],
      },
      {
        heading: "Quais dados coletamos",
        paragraphs: [
          "O site não coleta dados pessoais diretamente. Ele não tem cadastro, login, formulários nem comentários, e não usa ferramentas de análise de acesso ou de publicidade.",
          "Os botões “Entrar” e “Criar conta” e o campo de busca do menu são apenas ilustrativos nesta versão e não enviam informações a ninguém.",
        ],
      },
      {
        heading: "Dados técnicos de acesso",
        paragraphs: [
          "Como qualquer site, o servidor que o hospeda pode registrar automaticamente dados técnicos de acesso, como endereço IP, data e hora, páginas acessadas e tipo de navegador. Esses registros servem para a segurança e o funcionamento do serviço e ficam sob responsabilidade do provedor de hospedagem, pelo prazo que ele definir.",
        ],
      },
      {
        heading: "Cookies e armazenamento no navegador",
        paragraphs: [
          "O site não usa cookies de rastreamento nem de publicidade. Ele usa apenas um armazenamento temporário do navegador (sessionStorage) para lembrar, durante a navegação, até onde rolar a página quando você clica em alguns links do menu. Esse dado não identifica você, não é enviado a ninguém e é apagado ao fechar a aba. Veja mais na página de Cookies.",
        ],
      },
      {
        heading: "Serviços de terceiros",
        paragraphs: [
          "Preços e dados de mercado vêm da CoinGecko, o índice Medo e Ganância vem do Alternative.me, as notícias vêm de feeds públicos de sites de notícias e as manchetes em inglês são traduzidas automaticamente pelo DeepL. Essas consultas são feitas pelo servidor do site, e não pelo seu navegador, e envolvem apenas informações públicas, como o título de uma notícia. Nenhum dado seu é enviado a esses serviços. Os ícones das moedas também são baixados pelo servidor e entregues ao seu navegador a partir do próprio site.",
          "Ao clicar em links externos (matérias, fontes, GitHub, LinkedIn), você sai do site e passa a estar sujeito à política de privacidade de cada um deles.",
        ],
      },
      {
        heading: "Compartilhamento",
        paragraphs: [
          "Não vendemos nem compartilhamos dados pessoais, porque não os coletamos. Os registros técnicos de acesso podem ser tratados pelo provedor de hospedagem, que atua como operador.",
        ],
      },
      {
        heading: "Seus direitos",
        paragraphs: ["A LGPD garante a você, a qualquer momento, o direito de:"],
        items: [
          "confirmar se existe tratamento dos seus dados;",
          "acessar os seus dados;",
          "corrigir dados incompletos, inexatos ou desatualizados;",
          "pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados de forma irregular;",
          "pedir a portabilidade dos dados;",
          "saber com quem os dados são compartilhados;",
          "revogar um consentimento, quando ele existir;",
          "se opor a um tratamento que considere irregular.",
        ],
        after: [
          "Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
        ],
      },
      {
        heading: "Crianças e adolescentes",
        paragraphs: [
          "O site tem conteúdo informativo geral e não coleta dados de crianças ou adolescentes.",
        ],
      },
      {
        heading: "Mudanças nesta política",
        paragraphs: [
          "Esta política pode ser atualizada, e a data da última atualização aparece no topo da página. Se um dia o site passar a coletar dados (por exemplo, com cadastro ou métricas de acesso), a política será atualizada antes e, quando necessário, pediremos o seu consentimento.",
        ],
      },
    ],
  },

  termos: {
    title: "Termos de Uso",
    description: "Regras de uso do site Crypto Exchange.",
    showContact: true,
    sections: [
      {
        heading: "Aceitação",
        paragraphs: [
          "Ao usar o {site}, você concorda com estes termos. Se não concordar, não use o site.",
        ],
      },
      {
        heading: "O que é o site",
        paragraphs: [
          "O {site} é um projeto de portfólio, sem fins comerciais, mantido por {owner}. Ele reúne preços de criptomoedas, estatísticas de mercado, notícias e conteúdo educativo.",
          "O site não é corretora, casa de câmbio, gestora de recursos nem consultoria. Ele não permite comprar, vender, guardar ou transferir criptomoedas.",
        ],
      },
      {
        heading: "Informações e fontes",
        paragraphs: [
          "Os dados vêm de serviços de terceiros e são atualizados em intervalos de alguns minutos. Eles podem ter atraso, erros ou ficar indisponíveis. Não use o site como única base para tomar decisões financeiras.",
        ],
      },
      {
        heading: "Sem recomendação de investimento",
        paragraphs: [
          "Nada no site é recomendação, oferta ou convite para comprar, vender ou manter qualquer ativo. Leia também o Aviso legal.",
        ],
      },
      {
        heading: "Uso permitido",
        paragraphs: ["Ao usar o site, você se compromete a não:"],
        items: [
          "tentar invadir, sobrecarregar ou prejudicar o funcionamento do site;",
          "usar programas para coletar dados do site em grande volume;",
          "usar o site para atividades ilegais.",
        ],
      },
      {
        heading: "Propriedade intelectual",
        paragraphs: [
          "O código e o projeto do site pertencem ao seu autor. Nomes, marcas, dados e notícias pertencem aos respectivos titulares. Das notícias, o site mostra apenas o título e o link para a matéria original. As traduções de títulos são automáticas.",
        ],
      },
      {
        heading: "Links externos",
        paragraphs: [
          "O site tem links para páginas de terceiros. Não controlamos esses sites e não nos responsabilizamos pelo conteúdo ou pelas práticas deles.",
        ],
      },
      {
        heading: "Limitação de responsabilidade",
        paragraphs: [
          "O site é oferecido “como está”, sem garantia de funcionamento contínuo ou de exatidão das informações. Na medida permitida pela lei, não nos responsabilizamos por perdas decorrentes do uso das informações do site.",
        ],
      },
      {
        heading: "Mudanças e disponibilidade",
        paragraphs: [
          "O site e estes termos podem mudar, e o site pode ficar fora do ar a qualquer momento. A data da última atualização aparece no topo da página.",
        ],
      },
      {
        heading: "Lei aplicável",
        paragraphs: ["Estes termos seguem a legislação brasileira."],
      },
    ],
  },

  cookies: {
    title: "Cookies",
    description:
      "Quais cookies o Crypto Exchange usa e como você pode controlá-los.",
    showContact: false,
    sections: [
      {
        heading: "O que são cookies",
        paragraphs: [
          "Cookies são pequenos arquivos que um site guarda no seu navegador para lembrar informações, como preferências ou para medir acessos e exibir anúncios.",
        ],
      },
      {
        heading: "O que este site usa",
        paragraphs: [
          "O site não usa cookies de rastreamento, de estatística nem de publicidade e, até esta versão, não define cookies próprios.",
          "Ele usa apenas um armazenamento temporário do navegador (sessionStorage) para lembrar até onde rolar a página quando você clica em alguns links do menu. Esse dado não identifica você, não é enviado a ninguém e é apagado ao fechar a aba.",
        ],
      },
      {
        heading: "Por que não há banner de cookies",
        paragraphs: [
          "Como não há cookies opcionais, o site não mostra banner de consentimento. Se isso mudar, você terá uma escolha clara de aceitar ou recusar antes de qualquer cookie ser ativado, e esta página será atualizada.",
        ],
      },
      {
        heading: "Como controlar cookies no navegador",
        paragraphs: [
          "Você pode ver, bloquear e apagar cookies nas configurações de privacidade do seu navegador (Chrome, Edge, Firefox, Safari e outros).",
        ],
      },
      {
        heading: "Sites externos",
        paragraphs: [
          "Ao abrir links para outros sites (matérias, fontes, GitHub, LinkedIn), esses sites podem usar os próprios cookies, de acordo com as políticas deles.",
        ],
      },
    ],
  },

  "aviso-legal": {
    title: "Aviso legal",
    description:
      "Avisos sobre riscos, fontes dos dados e a natureza do projeto Crypto Exchange.",
    showContact: false,
    sections: [
      {
        heading: "Sem recomendação de investimento",
        paragraphs: [
          "Nada neste site é recomendação, oferta ou convite para comprar, vender ou manter qualquer ativo. As informações são educativas e informativas.",
        ],
      },
      {
        heading: "Riscos",
        paragraphs: [
          "Criptomoedas são ativos de alto risco, com preços que variam muito em pouco tempo. É possível perder todo o valor investido, e o desempenho passado não garante resultados futuros. Decida por conta própria e, se precisar, procure um profissional habilitado.",
        ],
      },
      {
        heading: "Não somos corretora",
        paragraphs: [
          "O {site} é um projeto de portfólio, sem fins comerciais. Não há compra, venda, custódia ou transferência de criptomoedas, e nenhuma plataforma de negociação.",
        ],
      },
      {
        heading: "Fontes e atribuição",
        items: [
          "Preços e dados de mercado: CoinGecko.",
          "Índice Medo e Ganância: Alternative.me.",
          "Notícias: veículos indicados em cada notícia, com link para a matéria original.",
          "Traduções de títulos: feitas automaticamente pelo DeepL e podem conter erros. Consulte a matéria original.",
        ],
      },
      {
        heading: "Valores em reais",
        paragraphs: [
          "Os preços são mostrados em reais a partir de cotações de fontes externas e podem diferir dos valores de corretoras. A variação da capitalização total no resumo do mercado é calculada em dólares.",
        ],
      },
      {
        heading: "Marcas",
        paragraphs: [
          "Nomes e marcas citados pertencem aos seus titulares e são usados apenas para identificação, sem qualquer vínculo ou aprovação.",
        ],
      },
    ],
  },
};