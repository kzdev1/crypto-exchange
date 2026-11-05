import Container from "../Container/Container";
import Variation from "../MarketOverview/Variation";
import RetryButton from "../ErrorNotice/RetryButton";
import { toneText } from "../MarketOverview/tones";
import { formatCompactBRL } from "../MarketOverview/format";
import { getGlobalStats } from "../../lib/api/coingecko";
import { getFearGreed } from "../../lib/api/alternative";
import { getErrorMessage } from "../../lib/api/errors";

const MISSING = "—";
const FEAR_GREED_SOURCE_URL = "https://alternative.me/crypto/fear-and-greed-index/";

const integer = new Intl.NumberFormat("pt-BR");
const oneDecimal = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const orMissing = (value, format) => (value === null ? MISSING : format(value));

// A API devolve a classificação em inglês; aqui ela vira texto e cor.
const fearGreedLabels = {
  "Extreme Fear": { text: "Medo extremo", tone: "negative" },
  Fear: { text: "Medo", tone: "negative" },
  Neutral: { text: "Neutro", tone: "neutral" },
  Greed: { text: "Ganância", tone: "positive" },
  "Extreme Greed": { text: "Ganância extrema", tone: "positive" },
};

function buildItems(stats, fearGreed) {
  const items = [
    { id: "coins", label: "Moedas", value: orMissing(stats.activeCoins, integer.format) },
    { id: "exchanges", label: "Corretoras", value: orMissing(stats.exchanges, integer.format) },
    {
      id: "market-cap",
      label: "Capitalização",
      value: orMissing(stats.marketCap, formatCompactBRL),
      change: stats.marketCapChange24h,
    },
    { id: "volume", label: "Volume 24h", value: orMissing(stats.volume24h, formatCompactBRL) },
    {
      id: "btc-dominance",
      label: "Dominância BTC",
      value: orMissing(stats.btcDominance, (n) => `${oneDecimal.format(n)}%`),
    },
    {
      id: "eth-dominance",
      label: "Dominância ETH",
      value: orMissing(stats.ethDominance, (n) => `${oneDecimal.format(n)}%`),
    },
  ];

  if (fearGreed.ok) {
    const label = fearGreedLabels[fearGreed.data.classification];
    items.push({
      id: "fear-greed",
      label: "Medo e Ganância",
      value: `${label?.text ?? fearGreed.data.classification} (${fearGreed.data.value})`,
      tone: label?.tone ?? "neutral",
      sourceUrl: FEAR_GREED_SOURCE_URL, // a fonte precisa aparecer junto do dado
    });
  } else {
    items.push({
      id: "fear-greed",
      label: "Medo e Ganância",
      value: "Indisponível",
      tone: "neutral",
    });
  }

  return items;
}

// Faixa fina abaixo da navbar com os números gerais do mercado.
// Fica sempre em uma linha; em telas estreitas, rola para o lado.
export default async function MarketStatsBar() {
  const [globalStats, fearGreed] = await Promise.all([
    getGlobalStats(),
    getFearGreed(),
  ]);

  const sectionStyle =
    "overflow-x-auto border-b border-neutral-200 bg-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-900";

  if (!globalStats.ok) {
    return (
      <section aria-label="Resumo do mercado" className={sectionStyle}>
        <Container className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-xs sm:text-sm">
          <p role="alert" className="font-semibold text-red-700">
            <span aria-hidden="true">⚠ </span>
            Resumo do mercado indisponível.
          </p>
          <span className="text-neutral-600">
            {getErrorMessage(globalStats.error)}
          </span>
          <RetryButton />
        </Container>
      </section>
    );
  }

  const items = buildItems(globalStats.data, fearGreed);

  return (
    <section aria-label="Resumo do mercado" tabIndex={0} className={sectionStyle}>
      <Container as="dl" className="flex gap-x-4 py-2 text-xs sm:text-sm">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
          >
            <dt className="text-neutral-600">{item.label}</dt>
            <dd
              className={`font-semibold ${
                item.tone ? toneText[item.tone] : "text-neutral-900"
              }`}
            >
              {item.value}
            </dd>
            {item.change !== undefined && item.change !== null && (
              <dd>
                <Variation value={item.change} />
              </dd>
            )}
            {item.sourceUrl && (
              <dd>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-600 underline hover:text-neutral-900"
                >
                  Fonte: Alternative.me
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </dd>
            )}
          </div>
        ))}
      </Container>
    </section>
  );
}
