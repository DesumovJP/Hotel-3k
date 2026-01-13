"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, easings } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/accessibility";

interface GalleryItem {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface HorizontalGalleryProps {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HorizontalGallery({
  items,
  title = "Gallery",
  subtitle,
  className,
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !trackRef.current) return;

    const container = containerRef.current;
    const track = trackRef.current;

    // Calculate total scroll width
    const trackWidth = track.scrollWidth;
    const containerWidth = container.offsetWidth;
    const scrollDistance = trackWidth - containerWidth;

    // Create horizontal scroll animation
    const tween = gsap.to(track, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate individual items on scroll
    const items = track.querySelectorAll(".gallery-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0.3, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ease: easings.luxury,
          scrollTrigger: {
            trigger: item,
            containerAnimation: tween,
            start: "left 80%",
            end: "left 20%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [prefersReducedMotion, items]);

  // Fallback for reduced motion - simple horizontal scroll
  if (prefersReducedMotion) {
    return (
      <section className={cn("py-24 bg-sand-50", className)}>
        <div className="container-luxury mb-12">
          {subtitle && (
            <span className="text-overline text-gold tracking-widest mb-4 block">
              {subtitle}
            </span>
          )}
          <h2 className="font-display text-display-md text-ink">{title}</h2>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-6 min-w-max">
            {items.map((item, i) => (
              <div key={i} className="w-[400px] flex-shrink-0">
                <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {item.title && (
                  <h3 className="font-display text-lg text-ink mt-4">{item.title}</h3>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={cn("relative h-screen-stable bg-sand-50 overflow-hidden", className)}
    >
      {/* Header - Fixed during scroll */}
      <div className="absolute top-12 left-0 right-0 z-10 pointer-events-none">
        <div className="container-luxury">
          {subtitle && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-overline text-gold tracking-widest mb-4 block"
            >
              {subtitle}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display-md text-ink"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 pl-[5vw] pr-[20vw]"
        style={{ paddingTop: "120px" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="gallery-item flex-shrink-0 w-[35vw] max-w-[500px]"
            data-cursor="view"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="35vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Title overlay */}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="font-display text-xl text-white">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-ink/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
