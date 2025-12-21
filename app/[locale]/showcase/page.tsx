import { ShowcaseList } from "@/components/showcase/ShowcaseList";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ShowcasePage() {
  return <ShowcaseList />;
}
