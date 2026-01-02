"use client";

import { useState, useEffect, useRef } from "react";
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
          "flex items-center gap-1 text-[13px] tracking-[0.12em] uppercase transition-all duration-150 hover:opacity-100 tap-target focus-visible-ring",
          isScrolled || useDarkText
            ? "text-ink/70 hover:text-ink"
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
            <div className="bg-white shadow-lg py-2 min-w-[160px] rounded-lg">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-5 py-2.5 text-[13px] tracking-[0.08em] text-ink/70 hover:text-ink hover:bg-white/50 transition-colors duration-150 focus-visible-ring"
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

  const useDarkText = variant === "dark" && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isScrolled
            ? "bg-white py-3 shadow-sm border-b border-sand-200"
            : useDarkText
              ? "bg-white py-5 md:py-6 border-b border-sand-200"
              : "bg-gradient-to-b from-black/30 to-transparent py-5 md:py-6"
        )}
      >
        <div className="px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <div className={cn(
                "relative transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isScrolled ? "w-12 h-12 md:w-14 md:h-14" : "w-14 h-14 md:w-16 md:h-16"
              )}>
                <Image
                  src="/icon.png"
                  alt="Grand Hotel Opduin"
                  fill
                  className={cn(
                    "object-contain transition-all duration-200",
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
                      "text-[13px] tracking-[0.12em] uppercase transition-colors duration-150 hover:opacity-100 tap-target focus-visible-ring",
                      isScrolled || useDarkText
                        ? "text-ink/70 hover:text-ink"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Book Button */}
            <Link
              href="/book"
              className={cn(
                "hidden md:flex items-center gap-2 px-5 py-2.5 rounded-sm transition-all duration-200 ease-out tap-target focus-visible-ring",
                isScrolled || useDarkText
                  ? "bg-deepsea text-white hover:bg-deepsea-600 hover:shadow-lg hover:shadow-deepsea/20 active:bg-deepsea-800"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 active:bg-white/30"
              )}
            >
              <span className="text-[13px] tracking-[0.1em] uppercase">Reserve</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2 transition-colors duration-150 tap-target focus-visible-ring rounded-lg",
                isScrolled || useDarkText
                  ? "text-ink hover:bg-sand-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-gradient-neutral-sand"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="h-full flex flex-col justify-center px-6">
              {/* Logo in mobile menu */}
              <div className="absolute top-6 left-6">
                <Image
                  src="/icon.png"
                  alt="Grand Hotel Opduin"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              <nav className="space-y-5" role="navigation">
                {[...navItems, { href: "/book", label: "Reserve" }].map(
                  (item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block font-display text-2xl text-ink hover:text-gold transition-colors duration-150 tap-target focus-visible-ring"
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
                              className="block text-lg text-ink/60 hover:text-gold transition-colors duration-150 tap-target focus-visible-ring"
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

              {/* Contact info in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.2 }}
                className="absolute bottom-8 left-6 right-6"
              >
                <p className="text-sm text-ink/60">
                  Ruijslaan 22, De Koog, Texel
                </p>
                <p className="text-sm text-ink/60">
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
