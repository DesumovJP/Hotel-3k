"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  labelKey: string;
  children?: { href: string; labelKey: string }[];
}

const navItemsConfig: NavItem[] = [
  { href: "/rooms", labelKey: "rooms" },
  { href: "/restaurant", labelKey: "restaurant" },
  { href: "/wellness", labelKey: "wellness" },
  { href: "/offers", labelKey: "offers" },
  {
    href: "/about",
    labelKey: "about",
    children: [
      { href: "/about", labelKey: "ourStory" },
      { href: "/about/sister-hotels", labelKey: "sisterHotels" },
      { href: "/gallery", labelKey: "gallery" },
      { href: "/contact", labelKey: "contact" },
    ],
  },
  { href: "/meetings", labelKey: "meetings" },
];

interface HeaderProps {
  variant?: "light" | "dark";
}

interface ResolvedNavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

// Dropdown Menu Component
function DropdownMenu({
  item,
  isScrolled,
  useDarkText,
}: {
  item: ResolvedNavItem;
  isScrolled: boolean;
  useDarkText: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const textShadowStyle = !(isScrolled || useDarkText) ? { textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)' } : undefined;

  return (
    <div
      className="relative overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-nav transition-colors duration-300 tap-target focus-visible-ring",
          isScrolled || useDarkText
            ? "text-ink/70 hover:text-ink"
            : "text-white hover:text-white/80"
        )}
        style={textShadowStyle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-150",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
            role="menu"
          >
            <div className="bg-white py-2 min-w-[160px] rounded-xl shadow-lg">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-5 py-2.5 text-nav text-neutral-600 hover:text-shell hover:bg-sand-50 transition-colors duration-150 focus-visible-ring"
                  role="menuitem"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({ variant = "light" }: HeaderProps) {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  const useDarkText = variant === "dark" && !isScrolled;

  // Resolve nav items with translations
  const navItems: ResolvedNavItem[] = navItemsConfig.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
    children: item.children?.map((child) => ({
      href: child.href,
      label: t(child.labelKey),
    })),
  }));

  // Optimized scroll handler with RAF for smooth performance
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 80);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-out",
          // GPU acceleration for smooth transitions
          "transform-gpu",
          isScrolled
            ? "py-3 header-glass"
            : useDarkText
              ? "py-5 md:py-6 header-glass"
              : "py-5 md:py-6 bg-gradient-to-b from-black/70 via-black/40 to-transparent"
        )}
        style={{ contain: "layout style", backfaceVisibility: "hidden" }}
      >
        <div className="px-6 md:px-12 lg:px-24 overflow-visible">
          <div className="flex items-center justify-between overflow-visible">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <div className={cn(
                "relative transition-all duration-300 ease-out",
                isScrolled ? "w-14 h-14 md:w-16 md:h-16" : "w-16 h-16 md:w-20 md:h-20"
              )}>
                <Image
                  src="/icon.png"
                  alt="Grand Hotel Opduin"
                  fill
                  className={cn(
                    "object-contain transition-all duration-300",
                    isScrolled || useDarkText
                      ? "brightness-100"
                      : "brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                  )}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 overflow-visible">
              {navItems.map((item) => (
                item.children ? (
                  <DropdownMenu
                    key={item.href}
                    item={item}
                    isScrolled={isScrolled}
                    useDarkText={useDarkText}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative text-nav transition-colors duration-300 tap-target focus-visible-ring group",
                      isScrolled || useDarkText
                        ? "text-ink/70 hover:text-ink"
                        : "text-white hover:text-white/80"
                    )}
                    style={!(isScrolled || useDarkText) ? { textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)' } : undefined}
                  >
                    {item.label}
                    {/* Aman-style underline animation */}
                    <span className={cn(
                      "absolute -bottom-1 left-0 w-full h-px origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100",
                      isScrolled || useDarkText ? "bg-gold" : "bg-white/70"
                    )} />
                  </Link>
                )
              ))}
            </nav>

            {/* Right side: Language Switcher + Book Button */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher
                variant={isScrolled || useDarkText ? "default" : "compact"}
                isScrolled={isScrolled || useDarkText}
              />
              <Link
                href="/book"
                className={cn(
                  "flex items-center px-5 py-2 rounded-full transition-colors duration-200 tap-target focus-visible-ring",
                  isScrolled || useDarkText
                    ? "bg-shell text-white hover:bg-shell-600"
                    : "text-white hover:text-white/80"
                )}
                style={!(isScrolled || useDarkText) ? { textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)' } : undefined}
              >
                <span className="text-nav">
                  {t("reserve")}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2.5 rounded-xl transition-all duration-150 tap-target focus-visible-ring",
                isScrolled || useDarkText
                  ? "text-ink bg-sand-50 shadow-neo-sm"
                  : "text-white bg-white/20"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden bg-[linear-gradient(to_bottom,#FEFDFB,#F9F3E8)]"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="h-full flex flex-col px-6 py-6">
              {/* Header with logo, language switcher and close button */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/icon.png"
                    alt="Grand Hotel Opduin"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher variant="default" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl text-ink bg-white/80 shadow-sm"
                    aria-label="Close menu"
                  >
                    <X size={22} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Navigation - takes remaining space */}
              <nav className="flex-1 space-y-3" role="navigation">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-xl font-display text-ink hover:text-shell transition-colors duration-150 py-1.5"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="mt-1.5 ml-4 space-y-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm text-neutral-500 hover:text-shell transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Reserve button - styled differently */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.04, duration: 0.25 }}
                  className="pt-4"
                >
                  <Link
                    href="/book"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-2 text-xl font-display text-shell hover:text-ink transition-colors duration-150"
                  >
                    {t("reserve")}
                    <span className="w-6 h-px bg-shell" />
                  </Link>
                </motion.div>
              </nav>

              {/* Contact info - at bottom */}
              <motion.a
                href="tel:+31222317445"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="mt-6 p-5 rounded-2xl bg-white shadow-md border border-sand-200/50 block group active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-shell/10 flex items-center justify-center group-hover:bg-shell transition-colors duration-200">
                      <Phone size={14} className="text-shell group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="text-sm text-ink font-medium">{t("call")}</span>
                  </div>
                  <div className="w-px h-6 bg-sand-200" />
                  <div className="flex-1">
                    <p className="text-xs text-neutral-500">Ruijslaan 22, De Koog</p>
                    <p className="text-xs text-neutral-400">Texel Island</p>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
