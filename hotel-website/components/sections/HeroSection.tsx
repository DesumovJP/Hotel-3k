"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SplitText } from "@/components/animations";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";
import {
  easeOutExpo,
  duration,
  stagger,
} from "@/lib/motion";

interface HeroSectionProps {
  youtubeId?: string;
  videoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  headline?: string;
  subheadline?: string;
  tagline?: string;
  location?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function HeroSection({
  youtubeId = "7WGS5SUVbcg",
  videoSrc,
  imageSrc = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070",
  imageAlt = "Grand Hotel Opduin - Luxury beachfront hotel on Texel",
  headline = "Grand Hotel Opduin",
  subheadline = "The Hamptons of the Wadden",
  tagline = "Where luxury meets the rhythm of the tides",
  location = "Texel Island, Netherlands",
  primaryCta = { label: "Check Availability", href: "/book" },
  secondaryCta = { label: "Explore Rooms", href: "/rooms" },
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Video loading handler
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, [videoLoaded]);

  const showLocalVideo = videoSrc && videoLoaded && !videoError && !youtubeId;
  const showYoutube = youtubeId && !isMobile;

  // YouTube embed URL with autoplay, loop, mute
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&start=0`
    : "";

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden bg-navy"
      aria-label="Hero section"
    >
      {/* Background Media Layer */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -inset-y-[15%]"
      >
        {/* YouTube Video Background */}
        {showYoutube && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src={youtubeEmbedUrl}
              title="Background video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setYoutubeLoaded(true)}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "pointer-events-none",
                "transition-opacity duration-1000",
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

        {/* Local Video Background (fallback) */}
        {videoSrc && !youtubeId && !videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              showLocalVideo ? "opacity-100" : "opacity-0"
            )}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Fallback Image (shows while loading or on mobile) */}
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
            (showYoutube && youtubeLoaded) || showLocalVideo ? "opacity-0" : "opacity-100"
          )}
          style={{ backgroundImage: `url('${imageSrc}')` }}
          role="img"
          aria-label={imageAlt}
        />
      </motion.div>

      {/* Dynamic Overlay - darkens on scroll */}
      <motion.div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity }}
      />

      {/* Bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-transparent" />

      {/* Subtle Film Grain */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content - Bottom Left Positioned */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 lg:pb-36 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-2xl">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, delay: 0.2, ease: easeOutExpo }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-3 text-shell-300 text-overline tracking-widest">
              <span className="w-6 h-px bg-shell" />
              {location}
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: duration.slower, delay: 0.3, ease: easeOutExpo }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight"
            >
              <SplitText
                type="words"
                animation="fadeUp"
                staggerDelay={stagger.normal}
                delay={0.4}
              >
                {headline}
              </SplitText>
            </motion.h1>
          </div>

          {/* Subheadline - "Hamptons of the Wadden" */}
          <div className="overflow-hidden mb-5">
            <motion.p
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: duration.slow, delay: 0.7, ease: easeOutExpo }}
              className="font-display text-xl md:text-2xl text-shell italic"
            >
              {subheadline}
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.normal, delay: 1, ease: easeOutExpo }}
            className="text-base md:text-lg text-white/70 max-w-md mb-10"
          >
            {tagline}
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.normal, delay: 1.2, ease: easeOutExpo }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={primaryCta.href}>
              <Button
                size="lg"
                className="bg-shell text-navy hover:bg-shell-400 min-w-[180px] group"
              >
                <span>{primaryCta.label}</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  →
                </motion.span>
              </Button>
            </Link>
            <Link href={secondaryCta.href}>
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 min-w-[180px] border border-white/20"
              >
                {secondaryCta.label}
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: duration.slow }}
        className="absolute bottom-8 right-6 md:right-12 lg:right-24 z-10 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/50 text-[10px] tracking-[0.2em] uppercase"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>

      {/* Premium Corner Accent - Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: duration.slow }}
        className="absolute top-24 right-6 md:right-12 lg:right-24 w-16 h-16 md:w-20 md:h-20 border-t border-r border-white/10"
      />
    </section>
  );
}
