"use client";

import { motion } from "framer-motion";

interface BrushStrokeProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export function BrushStroke({
  className,
  color = "#3A3A3A",
  opacity = 0.12
}: BrushStrokeProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.4,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`${className} transform-gpu`}
      style={{
        position: 'absolute',
        top: '5%',
        left: '0',
        right: '50%',
        bottom: '5%',
        zIndex: 0,
        pointerEvents: 'none',
        background: color,
        opacity: opacity,
        filter: 'blur(80px)',
        borderRadius: '50%',
        willChange: 'transform, opacity',
        contain: 'layout style paint',
        backfaceVisibility: 'hidden',
      }}
    />
  );
}
