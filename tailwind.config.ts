import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-alt": "rgb(var(--bg-alt) / <alpha-value>)",
        "bg-card": "rgb(var(--bg-card) / <alpha-value>)",
        "bg-light": "rgb(var(--bg-light) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--fg-muted) / <alpha-value>)",
        "fg-on-light": "rgb(var(--fg-on-light) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-fg": "rgb(var(--accent-fg) / <alpha-value>)",
        line: "rgb(var(--line))",
        // shadcn back-compat aliases (kept until consumers migrate)
        background: "rgb(var(--bg) / <alpha-value>)",
        foreground: "rgb(var(--fg) / <alpha-value>)",
        primary: { DEFAULT: "rgb(var(--accent) / <alpha-value>)", foreground: "rgb(var(--accent-fg) / <alpha-value>)" },
        border: "rgb(var(--line))",
        muted: { DEFAULT: "rgb(var(--bg-alt) / <alpha-value>)", foreground: "rgb(var(--fg-muted) / <alpha-value>)" },
        card: { DEFAULT: "rgb(var(--bg-card) / <alpha-value>)", foreground: "rgb(var(--fg) / <alpha-value>)" },
        // Additional shadcn back-compat aliases (kept until consumer components migrate)
        secondary: { DEFAULT: "rgb(var(--bg-alt) / <alpha-value>)", foreground: "rgb(var(--fg) / <alpha-value>)" },
        destructive: { DEFAULT: "rgb(220 38 38 / <alpha-value>)", foreground: "rgb(247 247 245 / <alpha-value>)" },
        popover: { DEFAULT: "rgb(var(--bg-card) / <alpha-value>)", foreground: "rgb(var(--fg) / <alpha-value>)" },
        input: "rgb(var(--line))",
        ring: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        full: "9999px",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulse:   { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "1" } },
        rise:    { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 45s linear infinite",
        pulse: "pulse 1.5s ease-in-out infinite",
        rise: "rise 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
