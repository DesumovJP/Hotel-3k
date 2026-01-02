"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";
import {
  easeOutExpo,
  duration,
  stagger,
  fadeInUp,
  staggerContainer,
} from "@/lib/motion";

interface WellnessHeroProps {
  title?: string;
  tagline?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  youtubeId?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCta?: { label: string; href: string };
  stats?: Array<{ value: string; label: string }>;
}

export function WellnessHero({
  title = "Wellness in Opduin",
  tagline = "There is nothing like personal attention",
  description = "Discover our sanctuary of calm. Where expert therapists, premium products, and the healing essence of the Wadden Sea come together.",
  backgroundImage = "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070",
  youtubeId = "6JUXaDyk4Lo",
  ctaText = "Book your treatment",
  ctaHref = "#treatments",
  secondaryCta = { label: "View Facilities", href: "#facilities" },
  stats = [
    { value: "15+", label: "Years Experience" },
    { value: "50+", label: "Treatments" },
    { value: "9.6", label: "Guest Rating" },
  ],
}: WellnessHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.7]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showYoutube = youtubeId && !isMobile;
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&start=0`
    : "";

  return (
    <section
      ref={containerRef}
      className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden bg-deepsea"
      aria-label="Wellness hero section"
    >
      {/* Background Media Layer */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -inset-y-[20%]"
      >
        {/* YouTube Video */}
        {showYoutube && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src={youtubeEmbedUrl}
              title="Wellness atmosphere video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setYoutubeLoaded(true)}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "pointer-events-none transition-opacity duration-1000",
                youtubeLoaded ? "opacity-100" : "opacity-0"
              )}
              style={{
                border: "none",
                width: "max(177.78vh, 100%)",
                height: "max(56.25vw, 100%)",
              }}
            />
          </div>
        )}

        {/* Fallback Image */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            showYoutube && youtubeLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={backgroundImage}
            alt="Wellness spa atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Gradient Overlays */}
      <motion.div
        className="absolute inset-0 bg-deepsea"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deepsea/80 via-deepsea/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-deepsea/50 via-transparent to-transparent" />

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        className="absolute top-20 right-10 md:right-20 w-32 h-32 md:w-48 md:h-48 border border-gold/30 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="absolute top-32 right-20 md:right-32 w-48 h-48 md:w-72 md:h-72 border border-sand/20 rounded-full"
      />

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Label */}
            <motion.div
              variants={fadeInUp}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-3 text-sand-400 text-overline tracking-[0.2em] uppercase">
                <span className="w-8 h-px bg-gold" />
                Grand Hotel Opduin Wellness
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-4"
            >
              {title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="font-display text-xl md:text-2xl text-gold italic mb-6"
            >
              {tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-white/70 max-w-xl mb-10 leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href={ctaHref}>
                <Button
                  size="lg"
                  variant="primary"
                  className="min-w-[200px]"
                >
                  <span>{ctaText}</span>
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white hover:bg-white/10 min-w-[180px] border border-white/20"
                  >
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Bar - Bottom */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: easeOutExpo }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div className="bg-gradient-to-t from-deepsea via-deepsea/95 to-transparent pt-12 pb-8">
            <div className="px-6 md:px-12 lg:px-24">
              <div className="max-w-content-2xl mx-auto">
                <div className="flex flex-wrap justify-start md:justify-center gap-8 md:gap-16">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.4 + index * 0.1,
                        duration: 0.6,
                        ease: easeOutExpo,
                      }}
                      className="text-center"
                    >
                      <p className="font-display text-3xl md:text-4xl text-gold mb-1">
                        {stat.value}
                      </p>
                      <p className="text-white/60 text-sm tracking-wide">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 right-6 md:right-12 lg:right-24 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/50 text-[10px] tracking-[0.2em] uppercase"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
