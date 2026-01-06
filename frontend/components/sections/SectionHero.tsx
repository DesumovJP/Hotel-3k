"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, LucideIcon } from "lucide-react";
import { SplitText } from "@/components/animations";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HeroAction {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface SectionHeroProps {
  label: string;
  title: string;
  tagline?: string;
  description: string;
  primaryAction: HeroAction;
  secondaryAction?: {
    phone: string;
  };
  backgroundImage: string;
  youtubeId?: string;
  className?: string;
}

export function SectionHero({
  label,
  title,
  tagline,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  youtubeId,
  className,
}: SectionHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showYoutube = youtubeId && !isMobile;
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&vq=hd1080&hd=1&quality=hd1080`
    : "";

  const isExternal = primaryAction.href.startsWith("mailto:") || primaryAction.href.startsWith("tel:");
  const ActionIcon = primaryAction.icon;

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative h-[70vh] min-h-[500px] overflow-hidden bg-navy",
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {showYoutube && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src={youtubeEmbedUrl}
              title="Background video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setYoutubeLoaded(true)}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[177.78vh] h-[100vh] min-w-[100vw] min-h-[56.25vw]",
                "pointer-events-none transition-opacity duration-1000",
                youtubeLoaded ? "opacity-100" : "opacity-0"
              )}
              style={{ border: "none" }}
            />
          </div>
        )}

        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            showYoutube && youtubeLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <span className="text-overline text-shell tracking-widest mb-4 block">
              {label}
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            >
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                  {title}
                </SplitText>
              </h1>
            </motion.div>
          </div>

          {/* Tagline (optional) */}
          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
              className="text-xl md:text-2xl text-shell font-display italic mb-4"
            >
              {tagline}
            </motion.p>
          )}

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: tagline ? 0.4 : 0.3, ease: easeOutExpo }}
            className="text-lg text-white/80 max-w-lg mb-8"
          >
            {description}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: tagline ? 0.5 : 0.4, ease: easeOutExpo }}
            className="hidden md:flex gap-4"
          >
            {isExternal ? (
              <a
                href={primaryAction.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink font-medium hover:bg-sand-100 transition-colors text-sm tracking-wide"
              >
                {ActionIcon && <ActionIcon size={16} />}
                {primaryAction.label}
                {!ActionIcon && <ArrowRight size={16} />}
              </a>
            ) : (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink font-medium hover:bg-sand-100 transition-colors text-sm tracking-wide"
              >
                {ActionIcon && <ActionIcon size={16} />}
                {primaryAction.label}
                {!ActionIcon && <ArrowRight size={16} />}
              </Link>
            )}

            {secondaryAction && (
              <a
                href={`tel:${secondaryAction.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors text-sm tracking-wide"
              >
                <Phone size={16} />
                {secondaryAction.phone}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
