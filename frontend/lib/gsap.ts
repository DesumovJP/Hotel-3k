"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Premium easing curves
export const easings = {
  // Luxury slow ease - Aman style
  luxury: "power2.out",
  // Smooth exponential
  smooth: "expo.out",
  // Elegant reveal
  reveal: "power3.inOut",
  // Snappy response
  snappy: "power4.out",
  // Bounce subtle
  bounce: "back.out(1.2)",
};

// Hook for scroll-triggered animations
export function useScrollTrigger(
  ref: RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  options?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.fromTo(ref.current,
      { opacity: 0, y: 50, ...animation },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: easings.luxury,
        scrollTrigger: {
          trigger: ref.current,
          start: options?.start || "top 85%",
          end: options?.end || "bottom 15%",
          scrub: options?.scrub || false,
          pin: options?.pin || false,
          markers: options?.markers || false,
          onEnter: options?.onEnter,
          onLeave: options?.onLeave,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [ref, animation, options]);
}

// Hook for horizontal scroll sections
export function useHorizontalScroll(
  containerRef: RefObject<HTMLElement>,
  options?: {
    speed?: number;
    pin?: boolean;
  }
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sections = container.querySelectorAll(".horizontal-section");

    if (sections.length === 0) return;

    const totalWidth = Array.from(sections).reduce(
      (acc, section) => acc + (section as HTMLElement).offsetWidth,
      0
    );

    const tween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: options?.pin !== false,
        scrub: options?.speed || 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [containerRef, options]);
}

// Hook for parallax effects
export function useParallaxGSAP(
  ref: RefObject<HTMLElement>,
  speed: number = 0.5
) {
  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [ref, speed]);
}

// Hook for staggered reveal animations
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement>,
  selector: string,
  options?: {
    stagger?: number;
    duration?: number;
    y?: number;
  }
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const tween = gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: options?.y || 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration || 0.8,
        stagger: options?.stagger || 0.1,
        ease: easings.luxury,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [containerRef, selector, options]);
}

// Hook for text reveal with split lines
export function useTextReveal(
  ref: RefObject<HTMLElement>,
  options?: {
    delay?: number;
    duration?: number;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const text = element.textContent || "";
    const words = text.split(" ");

    // Wrap each word in a span
    element.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(" ");

    const innerSpans = element.querySelectorAll("span > span");

    const tween = gsap.fromTo(
      innerSpans,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: options?.duration || 0.6,
        stagger: 0.05,
        ease: easings.reveal,
        delay: options?.delay || 0,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
      }
    );

    return () => {
      tween.kill();
      element.textContent = text; // Restore original text
    };
  }, [ref, options]);
}

export { gsap, ScrollTrigger };
