"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  enabled?: boolean;
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "click" | "view">("default");
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation for follower
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!enabled || isMobile) return;

    // Direct updates for cursor position - framer-motion handles optimization
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Handle hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data-cursor attribute
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr) {
        if (cursorAttr === "view") {
          setCursorState("view");
          setCursorText("View");
        } else if (cursorAttr === "drag") {
          setCursorState("view");
          setCursorText("Drag");
        } else if (cursorAttr === "play") {
          setCursorState("view");
          setCursorText("Play");
        } else {
          setCursorState("hover");
          setCursorText("");
        }
        return;
      }

      // Check for interactive elements
      const isLink = target.closest("a, button, [role='button'], input, select, textarea, [tabindex]");
      if (isLink) {
        setCursorState("hover");
        setCursorText("");
        return;
      }

      // Check for images that might want "view"
      const isGalleryImage = target.closest("[data-gallery], .gallery-image");
      if (isGalleryImage) {
        setCursorState("view");
        setCursorText("View");
        return;
      }

      setCursorState("default");
      setCursorText("");
    };

    const handleMouseDown = () => setCursorState("click");
    const handleMouseUp = () => setCursorState(prev => prev === "click" ? "default" : prev);

    // Use passive listeners where possible for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });

    // Hide default cursor globally via class
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, isMobile, cursorX, cursorY]);

  // Don't render on mobile or if disabled
  if (!enabled || isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999]",
          !isVisible && "opacity-0"
        )}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="bg-ink/80 rounded-full shadow-[0_0_0_1.5px_rgba(255,255,255,0.7),0_2px_6px_rgba(0,0,0,0.2)]"
          animate={{
            width: cursorState === "click" ? 6 : 8,
            height: cursorState === "click" ? 6 : 8,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Follower circle */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9998]",
          !isVisible && "opacity-0"
        )}
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className={cn(
            "rounded-full border flex items-center justify-center",
            cursorState === "view"
              ? "bg-gold/90 border-gold shadow-lg"
              : "bg-transparent border-ink/50 shadow-[0_0_0_1.5px_rgba(255,255,255,0.6)]"
          )}
          animate={{
            width: cursorState === "view" ? 80 : cursorState === "hover" ? 48 : cursorState === "click" ? 24 : 32,
            height: cursorState === "view" ? 80 : cursorState === "hover" ? 48 : cursorState === "click" ? 24 : 32,
            borderWidth: cursorState === "view" ? 0 : 1.5,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-white text-xs font-medium tracking-wider uppercase"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

// Hook to control cursor state from anywhere
export function useCursor() {
  const setCursorView = (text?: string) => {
    document.body.setAttribute("data-cursor-state", "view");
    if (text) document.body.setAttribute("data-cursor-text", text);
  };

  const resetCursor = () => {
    document.body.removeAttribute("data-cursor-state");
    document.body.removeAttribute("data-cursor-text");
  };

  return { setCursorView, resetCursor };
}
