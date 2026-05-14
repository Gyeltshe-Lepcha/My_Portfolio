import { redirect } from "next/navigation";
import ComponentsPage from "../../components/page";
import { resolveShareLink } from "@/services/shareService";

export default async function SharedPortfolioPage({ params }) {
  const { identifier } = await params;
  const portfolio = await resolveShareLink(identifier);
  if (!portfolio) redirect("/access-denied");
  return <ComponentsPage portfolio={portfolio} />;
}
