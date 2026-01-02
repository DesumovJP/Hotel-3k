"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface YouTubeBackgroundProps {
  videoId: string;
  className?: string;
  overlayClassName?: string;
  fallbackImage?: string;
}

export function YouTubeBackground({
  videoId,
  className,
  overlayClassName,
  fallbackImage,
}: YouTubeBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile (YouTube autoplay doesn't work well on mobile)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // YouTube embed URL with parameters for background video behavior
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

  // On mobile or if fallback needed, show image
  if (isMobile && fallbackImage) {
    return (
      <div
        className={cn("absolute inset-0 bg-cover bg-center bg-no-repeat", className)}
        style={{ backgroundImage: `url('${fallbackImage}')` }}
      />
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* YouTube iframe - scaled up to hide controls and fill container */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src={embedUrl}
          title="Background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[300%] h-[300%] min-w-[100vw] min-h-[100vh]",
            "pointer-events-none",
            "transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            border: "none",
            aspectRatio: "16/9",
          }}
        />
      </div>

      {/* Fallback image while loading */}
      {fallbackImage && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ backgroundImage: `url('${fallbackImage}')` }}
        />
      )}

      {/* Optional overlay */}
      {overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}
    </div>
  );
}
