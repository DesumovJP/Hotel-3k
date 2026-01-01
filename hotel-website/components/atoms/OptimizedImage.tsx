"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
  overlay?: boolean;
  overlayOpacity?: number;
}

const aspectRatios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  auto: "",
};

export function OptimizedImage({
  src,
  alt,
  aspectRatio = "auto",
  overlay = false,
  overlayOpacity = 0.3,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-mist)]",
        aspectRatios[aspectRatio],
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05,
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </motion.div>

      {overlay && (
        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-[var(--color-cloud)]" />
      )}
    </div>
  );
}
