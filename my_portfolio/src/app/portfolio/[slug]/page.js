import { notFound } from "next/navigation";
import ComponentsPage from "../../components/page";
import { getPortfolioBySlug } from "@/services/portfolioService";

export default async function PortfolioSlugPage({ params }) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);
  if (!portfolio) notFound();
  return <ComponentsPage portfolio={portfolio} />;
}
