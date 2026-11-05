import { toneStroke } from "../MarketOverview/tones";

// Mini gráfico de linha em SVG. A cor vem da tendência (tone).
const WIDTH = 100;
const HEIGHT = 32;
const PADDING = 2;

export default function Sparkline({ data, label, tone = "neutral" }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * WIDTH;
      const y =
        PADDING + (1 - (value - min) / range) * (HEIGHT - PADDING * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={`h-6 w-24 ${toneStroke[tone]}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
