import { test, expect } from "@playwright/test";
import {
  PROJECTS,
  getPublicProjects,
  getPrivateProjects,
  type PrivateCase,
} from "@/lib/design/portfolio-data";

test.describe("portfolio-data", () => {
  test("has at least 2 public projects", () => {
    expect(getPublicProjects().length).toBeGreaterThanOrEqual(2);
  });

  test("public projects have name + year (URL optional)", () => {
    for (const p of getPublicProjects()) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.year).toMatch(/^20\d{2}$/);
      expect(typeof p.url === "string").toBe(true);
    }
  });

  test("private cases have clientSize but no industry/sector/name", () => {
    for (const c of getPrivateProjects()) {
      expect((c as any).name).toBeUndefined();
      expect((c as any).sector).toBeUndefined();
      expect((c as any).cat).toBeUndefined();
      expect(["small", "large"]).toContain(c.clientSize);
      expect(c.year).toMatch(/^20\d{2}$/);
    }
  });

  test("PROJECTS combines public + private", () => {
    expect(PROJECTS.length).toBe(getPublicProjects().length + getPrivateProjects().length);
  });

  test("private cases include at least one small and one large client", () => {
    const sizes = getPrivateProjects().map((c: PrivateCase) => c.clientSize);
    expect(sizes).toContain("small");
    expect(sizes).toContain("large");
  });
});
