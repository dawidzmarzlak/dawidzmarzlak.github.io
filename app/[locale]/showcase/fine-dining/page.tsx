import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  RestaurantHero,
  RestaurantMenu,
  RestaurantChef,
  RestaurantReservation,
} from "@/components/showcase/fine-dining";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function FineDiningPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <BackToPortfolio />
      <RestaurantHero />
      <RestaurantMenu />
      <RestaurantChef />
      <RestaurantReservation />
      <ShowcaseCTA
        theme="dark"
        accentColor="#D4AF37"
        projectName="Noir et Or"
      />
      <ShowcaseFooter
        projectName="Noir et Or"
        accentColor="#D4AF37"
        theme="dark"
      />
    </div>
  );
}
