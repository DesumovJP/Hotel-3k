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
  imageSrc = "/home/hero-fallback.jpg",
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
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

  // Reload iframe when video ends to get fresh HD quality
  useEffect(() => {
    if (!youtubeId || isMobile) return;

    // Listen for messages from YouTube iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com' && event.origin !== 'https://www.youtube-nocookie.com') return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        // YouTube sends playerState: 0 when video ends
        if (data.event === 'onStateChange' && data.info === 0) {
          // Fade out, reload, fade in
          setYoutubeLoaded(false);
          setTimeout(() => {
            setIframeKey(prev => prev + 1);
          }, 300);
        }
      } catch {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [youtubeId, isMobile]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, [videoLoaded]);

  // Origin state for hydration-safe YouTube URL
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const showLocalVideo = videoSrc && videoLoaded && !videoError && !youtubeId;
  const showYoutube = youtubeId && !isMobile && origin;

  // enablejsapi=1 needed to receive postMessage events
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1&origin=${origin}`
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
                key={iframeKey}
                ref={iframeRef}
                src={youtubeEmbedUrl}
                title="Background video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onLoad={() => setYoutubeLoaded(true)}
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "pointer-events-none transition-opacity duration-500",
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

        {/* Overlay - minimal to show video */}
        <div className="absolute inset-0 bg-gradient-to-t from-deepsea/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-deepsea/50 via-transparent to-transparent" />

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
                <div className="flex gap-1 drop-shadow-lg">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="h-4 w-px bg-white/30" />
                <span
                  className="text-white text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }}
                >
                  {location}
                </span>
              </motion.div>

              {/* Main Headline */}
              <h1
                className="font-display text-[clamp(3rem,10vw,7rem)] text-white leading-[0.95] tracking-[-0.03em] mb-6"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
              >
                <SplitText
                  type="words"
                  animation="fadeUp"
                  staggerDelay={stagger.tight}
                  delay={0.25}
                >
                  {headline}
                </SplitText>
              </h1>

              {/* Subheadline with decorative line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: easeOutExpo }}
                className="flex items-center gap-6 mb-8"
              >
                <div className="w-16 h-px bg-gold drop-shadow-lg" />
                <p
                  className="font-display text-xl md:text-2xl lg:text-3xl text-gold italic"
                  style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))' }}
                >
                  {subheadline}
                </p>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: easeOutExpo }}
                className="text-lg md:text-xl text-white font-normal max-w-lg mb-12 leading-relaxed"
                style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.6))' }}
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

        {/* Scroll Indicator - Bottom center - Neomorphic */}
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
            className="w-8 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex justify-center pt-3 shadow-[4px_4px_12px_rgba(0,0,0,0.1),-2px_-2px_8px_rgba(255,255,255,0.1)]"
          >
            <div className="w-1.5 h-2.5 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>

      </section>
    </>
  );
}
