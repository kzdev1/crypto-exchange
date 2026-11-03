import MarketOverview from "@/components/MarketOverview/MarketOverview";
import CoinsTable from "@/components/CoinsTable/CoinsTable";
import NewsSection from "@/components/NewsSection/NewsSection";


export default function Home() {
  return (
    <main className="mt-6">
      <MarketOverview />
      <CoinsTable />
      <NewsSection />
    </main>
  );
}