"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SettingsToggle } from "@/components/ui/settings-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const backgroundColorDark = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.9)"]
  );

  const translateY = useTransform(
    scrollY,
    [0, 50],
    ["-100%", "0%"]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/blog', label: t('blog') },
    { href: '/pricing', label: t('pricing') },
  ];

  return (
    <motion.nav
      style={{
        backgroundColor: theme === 'dark' ? backgroundColorDark : backgroundColor
      }}
      className="fixed top-0 w-full z-50 backdrop-blur-sm border-b border-border/40 h-16"
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              IT Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {/* Language Toggle */}
            <LanguageSwitcher />

            {/* CTA Button */}
            <Button asChild>
              <Link href="/contact">{t('contact')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`md:hidden fixed left-0 right-0 top-16 bg-white dark:bg-gray-950 z-40 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ height: 'calc(100vh - 4rem)' }}
      >
        <div className="h-full flex flex-col justify-between px-6 py-8">
          {/* Navigation Links */}
          <nav className="space-y-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
                transition={{ delay: isOpen ? index * 0.1 : 0 }}
              >
                <Link
                  href={item.href}
                  className="block text-2xl font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
              transition={{ delay: isOpen ? navItems.length * 0.1 : 0 }}
            >
              <Button asChild className="w-full mt-4">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  {t('contact')}
                </Link>
              </Button>
            </motion.div>
          </nav>

          {/* Settings Section - Separated at bottom */}
          <div className="space-y-6 border-t border-border/50 pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ delay: isOpen ? (navItems.length + 1) * 0.1 : 0 }}
              className="space-y-4"
            >
              <div className="text-sm font-medium text-foreground/60 uppercase tracking-wider">
                {t('settings')}
              </div>

              {/* Theme Toggle */}
              {mounted && (
                <div className="space-y-2">
                  <SettingsToggle
                    checked={theme === "light"}
                    onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
                    leftIcon={<Moon className="h-4 w-4" />}
                    rightIcon={<Sun className="h-4 w-4" />}
                    leftLabel="Dark"
                    rightLabel="Light"
                  />
                </div>
              )}

              {/* Language Toggle */}
              <div className="space-y-2">
                <SettingsToggle
                  checked={locale === "en"}
                  onCheckedChange={(checked) => {
                    const newLocale = checked ? "en" : "pl";
                    router.push(pathname, { locale: newLocale });
                  }}
                  leftLabel="PL"
                  rightLabel="EN"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
