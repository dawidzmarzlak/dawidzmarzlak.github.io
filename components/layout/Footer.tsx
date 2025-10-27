"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IT Solutions
              </span>
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              {t("tagline")}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@itsolutions.com" className="hover:text-foreground transition-colors">
                  hello@itsolutions.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+48123456789" className="hover:text-foreground transition-colors">
                  +48 123 456 789
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Warszawa, Polska</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["about", "services", "portfolio", "blog", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "about" ? "/about" : `/${item}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {t(`links.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["nextjs", "wordpress", "woocommerce", "prestashop", "webapp"].map((service) => (
                <li key={service}>
                  <Link href="/services" className="hover:text-foreground transition-colors">
                    {t(`servicesList.${service}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">{t("newsletter")}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("newsletterText")}
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit" className="w-full">
                {t("subscribe")}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} IT Solutions. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
