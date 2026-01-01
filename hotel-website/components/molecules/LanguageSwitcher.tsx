"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "en" | "nl" | "de";

interface LanguageSwitcherProps {
  className?: string;
}

const languages: Record<Language, string> = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>("en");

  const handleSelect = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2",
          "text-sm font-medium text-[var(--color-gray-700)]",
          "hover:text-[var(--color-ocean)] transition-colors"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe size={16} />
        <span className="uppercase">{currentLang}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full right-0 mt-2",
              "min-w-[140px] py-2",
              "bg-white rounded-md shadow-lg",
              "border border-[var(--color-gray-200)]",
              "z-50"
            )}
          >
            {(Object.entries(languages) as [Language, string][]).map(
              ([code, name]) => (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm",
                    "transition-colors",
                    currentLang === code
                      ? "bg-[var(--color-sand)] text-[var(--color-ocean)]"
                      : "text-[var(--color-gray-700)] hover:bg-[var(--color-sand-light)]"
                  )}
                >
                  {name}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
