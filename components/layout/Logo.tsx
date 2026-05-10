type LogoProps = {
  /** Tailwind classes to control rendered height (default `h-9`). Width auto from aspect. */
  className?: string;
};

/**
 * Brand lockup. Renders both light and dark SVG variants and lets Tailwind's
 * `dark:` variant show/hide the right one — no client JS, no theme flash.
 */
export function Logo({ className = "h-9" }: LogoProps) {
  return (
    <>
      <img
        src="/brand/logo-full-light.svg"
        alt="IT Solutions — Dawid Zmarzlak"
        width={448}
        height={64}
        className={`${className} w-auto block dark:hidden`}
      />
      <img
        src="/brand/logo-full-dark.svg"
        alt="IT Solutions — Dawid Zmarzlak"
        width={448}
        height={64}
        className={`${className} w-auto hidden dark:block`}
        aria-hidden="true"
      />
    </>
  );
}
