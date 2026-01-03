"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: "/rooms", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/wellness", label: "Wellness" },
  { href: "/offers", label: "Offers" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Our Story" },
      { href: "/about/sister-hotels", label: "Sister Hotels" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" },
    ],
  },
  { href: "/meetings", label: "Meetings" },
];

interface HeaderProps {
  variant?: "light" | "dark";
}

// Dropdown Menu Component
function DropdownMenu({
  item,
  isScrolled,
  useDarkText,
}: {
  item: NavItem;
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

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-[13px] tracking-[0.12em] uppercase transition-colors duration-150 hover:opacity-100 tap-target focus-visible-ring",
          isScrolled || useDarkText
            ? "text-ink/70 hover:text-shell"
            : "text-white/80 hover:text-white"
        )}
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
            <div className="bg-white/95 backdrop-blur-md py-2 min-w-[160px] rounded-xl shadow-neo-md">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-5 py-2.5 text-[13px] tracking-[0.08em] text-neutral-600 hover:text-shell hover:bg-sand-50 transition-colors duration-150 focus-visible-ring"
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  const useDarkText = variant === "dark" && !isScrolled;

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
          // GPU acceleration for smooth scrolling over video
          "transform-gpu will-change-transform",
          isScrolled
            ? "py-3 bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-b border-sand-100"
            : useDarkText
              ? "py-5 md:py-6 bg-white/80 backdrop-blur-sm border-b border-sand-100"
              : "py-5 md:py-6 bg-gradient-to-b from-black/30 to-transparent"
        )}
      >
        <div className="px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between">
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
                      : "brightness-0 invert"
                  )}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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
                      "text-[13px] tracking-[0.12em] uppercase transition-colors duration-150 tap-target focus-visible-ring",
                      isScrolled || useDarkText
                        ? "text-ink/70 hover:text-shell"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Book Button - Neomorphic */}
            <Link
              href="/book"
              className={cn(
                "hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 tap-target focus-visible-ring",
                isScrolled || useDarkText
                  ? "bg-navy text-white hover:bg-navy-600 shadow-neo-btn"
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25 shadow-neo-btn"
              )}
            >
              <span className="text-[13px] tracking-[0.1em] uppercase">Reserve</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2.5 rounded-xl transition-all duration-150 tap-target focus-visible-ring",
                isScrolled || useDarkText
                  ? "text-ink bg-sand-50 shadow-neo-sm"
                  : "text-white bg-white/15 backdrop-blur-sm"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Neomorphic */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-gradient-to-b from-sand-50 to-sand-100"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="h-full flex flex-col justify-center px-8">
              {/* Logo in mobile menu */}
              <div className="absolute top-6 left-6">
                <Image
                  src="/icon.png"
                  alt="Grand Hotel Opduin"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>

              <nav className="space-y-4" role="navigation">
                {[...navItems, { href: "/book", label: "Reserve" }].map(
                  (item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block font-display text-2xl text-ink hover:text-shell transition-colors duration-150 tap-target focus-visible-ring py-1"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-base text-neutral-500 hover:text-shell transition-colors duration-150 tap-target focus-visible-ring"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )
                )}
              </nav>

              {/* Contact info - Neomorphic card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="absolute bottom-8 left-6 right-6 p-5 rounded-2xl bg-white/60 shadow-neo-md"
              >
                <p className="text-sm text-neutral-600">
                  Ruijslaan 22, De Koog, Texel
                </p>
                <p className="text-sm text-shell font-medium mt-1">
                  +31 222 317 445
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
