import { notFound } from "next/navigation";
import ComponentsPage from "../../components/page";
import { getPortfolioBySlug } from "@/services/portfolioService";

export default async function UserPortfolioPage({ params }) {
  const { username } = await params;
  const portfolio = await getPortfolioBySlug(username);
  if (!portfolio) notFound();
  return <ComponentsPage portfolio={portfolio} />;
}
