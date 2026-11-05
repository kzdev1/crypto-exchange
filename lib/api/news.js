import "server-only";
import { XMLParser } from "fast-xml-parser";
import { ApiError } from "./errors";
import { fetchText, toResult } from "./http";
import {
  newsFeeds,
  MAX_ITEMS_PER_FEED,
  FEED_TIMEOUT_MS,
  NEWS_REVALIDATE_SECONDS,
} from "./news-sources";

// As entidades (&amp;, &#8217; etc.) são convertidas por decodeEntities, uma vez só.
const parser = new XMLParser({
  ignoreAttributes: false,
  processEntities: false,
});

const FEED_HEADERS = {
  accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
  "user-agent": "CryptoExchangePortfolio/1.0 (+https://github.com/kzdev1/crypto-exchange)",
};

const toArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const namedEntities = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

// Converte códigos como &amp; e &#8217; no caractere correspondente (uma passada só).
function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const isHex = code[1].toLowerCase() === "x";
      const number = parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : match;
    }
    return namedEntities[code.toLowerCase()] ?? match;
  });
}

// Pega o texto de um campo, mesmo quando o XML o entrega como objeto.
function textOf(value) {
  const raw = typeof value === "object" && value !== null ? value["#text"] : value;
  return typeof raw === "string"
    ? decodeEntities(raw.replace(/<[^>]*>/g, "")).trim()
    : "";
}

// Aceita só links http/https (nunca javascript: ou outros).
function getLink(item) {
  const links = toArray(item.link);
  const preferred = links.find((link) => link?.["@_rel"] === "alternate") ?? links[0];
  const raw = typeof preferred === "string" ? preferred : preferred?.["@_href"];

  try {
    const url = new URL(decodeEntities(String(raw)).trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

// Assuntos que contam como "Regulação", mesmo em fontes de outras abas.
const regulationWords =
  /regulat|regulaç|regulament|legisla|lawmaker|congress|senado|projeto de lei|tribut|imposto|\btax(es)?\b|\blaw(s|suit)?\b|proib|\bban(s|ned)?\b|sanction|sanç|compliance|banco central|central bank/i;
const regulators = /\b(SEC|CFTC|CVM)\b/;

const isRegulation = (title) => regulationWords.test(title) || regulators.test(title);

function formatTimeAgo(timestamp) {
  if (!timestamp) return "";
  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 60) return `há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `há ${hours} ${hours === 1 ? "hora" : "horas"}`;
  const days = Math.round(hours / 24);
  return `há ${days} ${days === 1 ? "dia" : "dias"}`;
}

function toNewsItem(item, feed) {
  const title = textOf(item.title);
  const href = getLink(item);
  if (!title || !href) return null;

  const published = Date.parse(
    textOf(item.pubDate) || textOf(item.published) || textOf(item.updated) || textOf(item["dc:date"])
  );
  const publishedAt = Number.isFinite(published) ? published : null;

  const categories = [feed.category];
  if (feed.category !== "Regulação" && isRegulation(title)) categories.push("Regulação");

  return {
    id: href,
    title,
    href,
    source: feed.source,
    language: feed.language,
    categories,
    publishedAt,
    time: formatTimeAgo(publishedAt),
  };
}

async function loadFeed(feed) {
  const xml = await fetchText(feed.url, {
    headers: FEED_HEADERS,
    revalidate: NEWS_REVALIDATE_SECONDS,
    timeoutMs: FEED_TIMEOUT_MS,
  });

  const parsed = parser.parse(xml);
  const rawItems = toArray(parsed?.rss?.channel?.item ?? parsed?.feed?.entry);
  if (rawItems.length === 0) throw new ApiError("invalid-data");

  return rawItems
    .map((item) => toNewsItem(item, feed))
    .filter(Boolean)
    .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
    .slice(0, MAX_ITEMS_PER_FEED);
}

// Notícias de todas as fontes, da mais nova para a mais antiga.
// Devolve { ok: true, data } ou { ok: false, error } (só quando TODAS as fontes falham).
export async function getNews() {
  const results = await Promise.all(
    newsFeeds.map(async (feed) => ({ feed, result: await toResult(() => loadFeed(feed)) }))
  );

  const failed = results.filter(({ result }) => !result.ok);
  for (const { feed, result } of failed) {
    console.error(`[news] feed indisponível: ${feed.id} (${result.error})`);
  }
  if (failed.length === results.length) {
    return { ok: false, error: failed[0].result.error };
  }

  const seen = new Set();
  const items = results
    .flatMap(({ result }) => (result.ok ? result.data : []))
    .filter((item) => (seen.has(item.id) ? false : seen.add(item.id)))
    .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0));

  return { ok: true, data: items, isExample: false };
}
