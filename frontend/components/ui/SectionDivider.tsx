"use client";

import { cn } from "@/lib/utils";

type DividerVariant = "wave" | "curve" | "fade" | "line" | "space";
type DividerColor = "sand" | "white" | "sand-dark";

interface SectionDividerProps {
  variant?: DividerVariant;
  color?: DividerColor;
  className?: string;
  flip?: boolean;
}

export function SectionDivider({
  variant = "wave",
  color = "sand",
  className,
  flip = false,
}: SectionDividerProps) {
  const baseClasses = {
    wave: "section-divider-wave",
    curve: "section-divider-curve",
    fade: "section-divider-fade",
    line: "section-divider-line",
    space: "section-divider-space",
  };

  const colorClasses = {
    wave: {
      sand: "",
      white: "wave-white",
      "sand-dark": "wave-sand",
    },
    curve: {
      sand: "",
      white: "curve-white",
      "sand-dark": "",
    },
    fade: {
      sand: "",
      white: "fade-white",
      "sand-dark": "fade-sand-dark",
    },
    line: {
      sand: "",
      white: "",
      "sand-dark": "",
    },
    space: {
      sand: "",
      white: "",
      "sand-dark": "",
    },
  };

  if (variant === "line") {
    return (
      <div
        className={cn(baseClasses[variant], colorClasses[variant][color], className)}
        aria-hidden="true"
      >
        <span className="divider-accent" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses[variant],
        colorClasses[variant][color],
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    />
  );
}
