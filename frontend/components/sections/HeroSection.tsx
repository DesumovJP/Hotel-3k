"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SplitText } from "@/components/animations";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { easeOutExpo, stagger } from "@/lib/motion";
import { useReducedMotion } from "@/lib/accessibility";
import { trackViewContent, trackStartBooking } from "@/lib/analytics";
import { generateHotelSchema, toJsonLd } from "@/lib/seo";

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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    trackViewContent('page', 'home', { name: 'Homepage Hero' });
  }, []);

  const hotelSchema = generateHotelSchema();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, [videoLoaded]);

  const showLocalVideo = videoSrc && videoLoaded && !videoError && !youtubeId;
  const showYoutube = youtubeId && !isMobile;

  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&start=0`
    : "";

  const handlePrimaryCTAClick = () => {
    trackStartBooking('hero_cta', { value: 295 });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(hotelSchema) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-ink focus:rounded focus-visible-ring"
      >
        Skip to main content
      </a>

      <section
        ref={containerRef}
        className="relative h-screen min-h-[700px] overflow-hidden bg-deepsea"
        role="banner"
        aria-label={`Welcome to ${headline} - ${subheadline}`}
      >
        {/* Background Media Layer */}
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

          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
              (showYoutube && youtubeLoaded) || showLocalVideo ? "opacity-0" : "opacity-100"
            )}
            style={{ backgroundImage: `url('${imageSrc}')` }}
            role="img"
            aria-label={imageAlt}
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-deepsea/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-deepsea/80 via-deepsea/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deepsea/70 via-transparent to-deepsea/20" />

        {/* Main Content - Left aligned for premium feel */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="h-4 w-px bg-white/30" />
                <span className="text-white/70 text-xs tracking-[0.2em] uppercase font-light">
                  {location}
                </span>
              </motion.div>

              {/* Main Headline */}
              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
                  className="font-display text-[clamp(3rem,10vw,7rem)] text-white leading-[0.95] tracking-[-0.03em]"
                >
                  <SplitText
                    type="words"
                    animation="fadeUp"
                    staggerDelay={stagger.tight}
                    delay={0.25}
                  >
                    {headline}
                  </SplitText>
                </motion.h1>
              </div>

              {/* Subheadline with decorative line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: easeOutExpo }}
                className="flex items-center gap-6 mb-8"
              >
                <div className="w-16 h-px bg-gold" />
                <p className="font-display text-xl md:text-2xl lg:text-3xl text-gold italic">
                  {subheadline}
                </p>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: easeOutExpo }}
                className="text-lg md:text-xl text-white/80 font-light max-w-lg mb-12 leading-relaxed"
              >
                {tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.6, ease: easeOutExpo }}
                className="flex flex-wrap gap-4"
                role="group"
                aria-label="Booking actions"
              >
                <Link href={primaryCta.href} onClick={handlePrimaryCTAClick}>
                  <Button size="lg" variant="primary" className="min-w-[180px]">
                    {primaryCta.label}
                  </Button>
                </Link>
                <Link href={secondaryCta.href}>
                  <Button variant="glass" size="lg" className="min-w-[180px]">
                    {secondaryCta.label}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Bottom center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Right side info panel - Desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: easeOutExpo }}
          className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-8 text-right"
        >
          <div>
            <span className="text-white/50 text-xs tracking-widest uppercase block mb-1">Established</span>
            <span className="text-white text-2xl font-display">1928</span>
          </div>
          <div className="w-px h-12 bg-white/20 self-end" />
          <div>
            <span className="text-white/50 text-xs tracking-widest uppercase block mb-1">Rooms</span>
            <span className="text-white text-2xl font-display">22</span>
          </div>
        </motion.div>
      </section>
    </>
  );
}
