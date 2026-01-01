"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/rooms", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/wellness", label: "Wellness" },
  { href: "/island", label: "The Island" },
];

interface HeaderProps {
  variant?: "light" | "dark";
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
        transition={{ duration: 1, delay: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-700 ease-out",
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-3 shadow-sm"
            : useDarkText
              ? "bg-white/80 backdrop-blur-sm py-5 md:py-6"
              : "bg-gradient-to-b from-black/30 to-transparent py-5 md:py-6"
        )}
      >
        <div className="px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <div className={cn(
                "relative transition-all duration-500",
                isScrolled ? "w-12 h-12 md:w-14 md:h-14" : "w-14 h-14 md:w-16 md:h-16"
              )}>
                <Image
                  src="/icon.png"
                  alt="Grand Hotel Opduin"
                  fill
                  className={cn(
                    "object-contain transition-all duration-500",
                    isScrolled || useDarkText
                      ? "brightness-100"
                      : "brightness-0 invert"
                  )}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10 lg:gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] tracking-[0.12em] uppercase transition-all duration-500 hover:opacity-100",
                    isScrolled || useDarkText
                      ? "text-navy-500 hover:text-navy"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Book Button */}
            <Link
              href="/book"
              className={cn(
                "hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-500",
                isScrolled || useDarkText
                  ? "bg-navy text-white hover:bg-navy-600"
                  : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
              )}
            >
              <span className="text-[13px] tracking-[0.1em] uppercase">Reserve</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2 transition-colors",
                isScrolled || useDarkText
                  ? "text-navy"
                  : "text-white"
              )}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden bg-sand"
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

              <nav className="space-y-6">
                {[...navItems, { href: "/book", label: "Reserve" }].map(
                  (item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block font-display text-3xl md:text-4xl text-navy hover:text-shell transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              {/* Contact info in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-6 right-6"
              >
                <p className="text-sm text-navy-400">
                  Ruijslaan 22, De Koog, Texel
                </p>
                <p className="text-sm text-navy-400">
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
