import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TemplateProvider, useTheme, useContent, useMedia, useMeta } from "../provider";
import type { BrandConfig } from "../types";

const config: BrandConfig = {
  meta: { slug: "demo", brandName: "Demo Co", industry: "Test", tagline: "Hi", locale: "en" },
  theme: {
    palette: { bg: "#fff", fg: "#000", accent: "#0af" },
    fonts: { display: "Serif", body: "Sans", accent: "Cursive" },
    radius: { sm: "4px", md: "8px", lg: "16px" },
  },
  content: { hero: { title: "Hello" } },
  media: { hero: "/hero.jpg", gallery: ["/a.jpg", "/b.jpg"] },
};

function Probe() {
  const theme = useTheme();
  const hero = useContent<{ title: string }>("hero");
  const heroImg = useMedia<string>("hero");
  return (
    <>
      <span data-testid="bg">{theme.palette.bg}</span>
      <span data-testid="title">{hero.title}</span>
      <span data-testid="img">{heroImg}</span>
    </>
  );
}

describe("TemplateProvider", () => {
  it("provides theme/content/media via hooks", () => {
    render(
      <TemplateProvider config={config}>
        <Probe />
      </TemplateProvider>,
    );
    expect(screen.getByTestId("bg")).toHaveTextContent("#fff");
    expect(screen.getByTestId("title")).toHaveTextContent("Hello");
    expect(screen.getByTestId("img")).toHaveTextContent("/hero.jpg");
  });

  it("emits CSS custom properties on the wrapping element", () => {
    const { container } = render(
      <TemplateProvider config={config}>
        <span>x</span>
      </TemplateProvider>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue("--brand-color-bg")).toBe("#fff");
    expect(root.style.getPropertyValue("--brand-font-display")).toBe("Serif");
  });

  it("useContent throws helpful error when section missing", () => {
    function BadProbe() {
      useContent("missing-section");
      return null;
    }
    expect(() =>
      render(
        <TemplateProvider config={config}>
          <BadProbe />
        </TemplateProvider>,
      ),
    ).toThrow(/missing-section/);
  });

  it("useTheme throws when used outside provider", () => {
    function NakedProbe() {
      useTheme();
      return null;
    }
    expect(() => render(<NakedProbe />)).toThrow(/TemplateProvider/);
  });

  it("useMedia throws helpful error when key missing", () => {
    function BadMedia() {
      useMedia("missing-key");
      return null;
    }
    expect(() =>
      render(
        <TemplateProvider config={config}>
          <BadMedia />
        </TemplateProvider>,
      ),
    ).toThrow(/missing-key/);
  });

  it("useMeta returns the meta object", () => {
    function MetaProbe() {
      const meta = useMeta();
      return <span data-testid="slug">{meta.slug}</span>;
    }
    render(
      <TemplateProvider config={config}>
        <MetaProbe />
      </TemplateProvider>,
    );
    expect(screen.getByTestId("slug")).toHaveTextContent("demo");
  });
});
