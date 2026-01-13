"use client";

import { motion } from "framer-motion";

interface BrushStrokeProps {
  className?: string;
}

export function BrushStroke({
  className,
}: BrushStrokeProps) {
  return (
    <>
      {/* Desktop version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`${className} transform-gpu hidden md:block`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '60vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 15% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 50%, transparent 75%)',
          willChange: 'opacity',
        }}
      />
      {/* Mobile version - covers more area, centered on left side where text is */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`${className} transform-gpu block md:hidden`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 100% 60% at 30% 55%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.12) 45%, transparent 70%)',
          willChange: 'opacity',
        }}
      />
    </>
  );
}
