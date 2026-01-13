"use client";

import { useState, useTransition, useRef } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "default" | "compact";
  isScrolled?: boolean;
}

export function LanguageSwitcher({ className, variant = "default", isScrolled = true }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleSelect = (newLocale: Locale) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const useDarkText = variant === "default" || isScrolled;
  const textShadowStyle = !useDarkText ? { textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)' } : undefined;

  return (
    <div
      className={cn("relative overflow-visible", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-1 text-nav transition-colors duration-300 tap-target focus-visible-ring",
          isPending && "opacity-50 cursor-wait",
          useDarkText
            ? "text-ink/70 hover:text-ink"
            : "text-white hover:text-white/80"
        )}
        style={textShadowStyle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={14} className="mr-1" />
        <span className="uppercase">{locale}</span>
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
            className="absolute top-full right-0 pt-3"
            role="menu"
          >
            <div className="bg-white py-2 min-w-[140px] rounded-xl shadow-lg">
              {locales.map((code) => (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  disabled={isPending}
                  className={cn(
                    "w-full px-5 py-2.5 text-left text-nav transition-colors duration-150 focus-visible-ring",
                    locale === code
                      ? "text-shell font-medium bg-sand-50"
                      : "text-neutral-600 hover:text-shell hover:bg-sand-50"
                  )}
                  role="menuitem"
                >
                  {localeNames[code]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
