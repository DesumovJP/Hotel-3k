"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageTiltProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  scale?: number;
  perspective?: number;
  glare?: boolean;
  glareOpacity?: number;
}

export function ImageTilt({
  children,
  className,
  tiltAmount = 10,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  glareOpacity = 0.2,
}: ImageTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? scale : 1,
        }}
        transition={{ scale: { duration: 0.3 } }}
        className="w-full h-full"
      >
        {children}

        {/* Glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ opacity: { duration: 0.3 } }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// Simpler hover scale effect
interface HoverScaleProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function HoverScale({
  children,
  className,
  scale = 1.05,
  duration = 0.4,
}: HoverScaleProps) {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      whileHover={{ scale }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Card with 3D hover effect
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export function Card3D({
  children,
  className,
  depth = 20,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [depth, -depth]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-depth, depth]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
