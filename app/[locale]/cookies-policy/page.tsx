import type { Metadata } from "next";
import { CookiesPolicyClient } from "./CookiesPolicyClient";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description:
    "Polityka cookies IT Solutions — dowiedz się jakich plików cookies używamy i w jaki sposób.",
};

export const dynamic = "force-static";

export default function CookiesPolicyPage() {
  return <CookiesPolicyClient />;
}
