import ComponentsPage from "./components/page";
import { getPrimaryPortfolio } from "@/services/portfolioService";

export default async function MainPage() {
  const portfolio = await getPrimaryPortfolio();
  return <ComponentsPage portfolio={portfolio} />;
}
