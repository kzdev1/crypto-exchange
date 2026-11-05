import Container from "../Container/Container";
import Variation from "../MarketOverview/Variation";
import { marketStats } from "./mock-stats";

// Faixa fina abaixo da navbar com os números gerais do mercado.
export default function MarketStatsBar() {
  return (
    <section
      aria-label="Resumo do mercado"
      className="border-b border-neutral-200 bg-white"
    >
      <Container
        as="dl"
        className="flex flex-wrap gap-x-6 gap-y-1 py-2 text-xs sm:text-sm"
      >
        {marketStats.map((stat) => (
          <div key={stat.id} className="flex items-center gap-1.5">
            <dt className="text-neutral-600">{stat.label}</dt>
            <dd className="font-semibold text-neutral-900">{stat.value}</dd>
            {stat.change !== undefined && (
              <dd>
                <Variation value={stat.change} />
              </dd>
            )}
          </div>
        ))}
      </Container>
    </section>
  );
}
