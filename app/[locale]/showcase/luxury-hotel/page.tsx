import { BackToPortfolio } from "@/components/showcase/shared/BackToPortfolio";
import { ShowcaseCTA } from "@/components/showcase/shared/ShowcaseCTA";
import { ShowcaseFooter } from "@/components/showcase/shared/ShowcaseFooter";
import {
  HotelHero,
  HotelAbout,
  HotelRooms,
  HotelAmenities,
  HotelBooking,
} from "@/components/showcase/luxury-hotel";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LuxuryHotelPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <BackToPortfolio />
      <HotelHero />
      <HotelAbout />
      <HotelRooms />
      <HotelAmenities />
      <HotelBooking />
      <ShowcaseCTA
        theme="light"
        accentColor="#C9A962"
        projectName="Grand Riviera"
      />
      <ShowcaseFooter
        projectName="Grand Riviera"
        accentColor="#C9A962"
        theme="light"
      />
    </div>
  );
}
