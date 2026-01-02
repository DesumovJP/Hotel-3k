"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SplitText } from "@/components/animations";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

interface PageHeroProps {
  /** YouTube video ID for background */
  youtubeId?: string;
  /** Static background image URL */
  imageSrc: string;
  /** Alt text for image */
  imageAlt?: string;
  /** Small label above headline (e.g., "Wellness", "Restaurant") */
  label: string;
  /** Main headline text */
  headline: string;
  /** Optional description text below headline */
  description?: string;
  /** Height variant */
  size?: "sm" | "md" | "lg";
  /** Overlay intensity */
  overlayIntensity?: "light" | "medium" | "dark";
}

const sizeClasses = {
  sm: "h-[50vh] min-h-[400px]",
  md: "h-[60vh] min-h-[450px]",
  lg: "h-[70vh] min-h-[500px]",
};

export function PageHero({
  youtubeId,
  imageSrc,
  imageAlt = "",
  label,
  headline,
  description,
  size = "md",
  overlayIntensity = "medium",
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    overlayIntensity === "light" ? [0.3, 0.5] :
    overlayIntensity === "dark" ? [0.5, 0.7] : [0.4, 0.6]
  );

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
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0`
    : "";

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative overflow-hidden bg-navy",
        sizeClasses[size]
      )}
    >
      {/* Background Media */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        {/* YouTube Background */}
        {showYoutube && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src={youtubeEmbedUrl}
              title="Background video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setYoutubeLoaded(true)}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "pointer-events-none transition-opacity duration-1000",
                youtubeLoaded ? "opacity-100" : "opacity-0"
              )}
              style={{
                border: "none",
                width: "max(130vw, 230.77vh)",
                height: "max(130vh, 73.125vw)",
              }}
            />
          </div>
        )}

        {/* Image Background */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            showYoutube && youtubeLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt || headline}
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          {/* Decorative line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
            className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-gold to-gold/30 mx-auto mb-6 origin-top"
            aria-hidden="true"
          />

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: easeOutExpo }}
          >
            <span className="inline-flex items-center gap-3 text-gold/80 text-[11px] md:text-xs tracking-[0.25em] uppercase mb-4 block">
              {label}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-4 md:mb-6">
            <motion.h1
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
              className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-[0.95] tracking-tight"
            >
              <SplitText type="words" animation="fadeUp" staggerDelay={0.04} delay={0.25}>
                {headline}
              </SplitText>
            </motion.h1>
          </div>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: easeOutExpo }}
              className="text-base md:text-lg text-white/70 font-light max-w-lg mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: easeOutExpo }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </section>
  );
}
