"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { YTPlayer } from "@/types/youtube";

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
  const playerRef = useRef<YTPlayer | null>(null);
  const containerIdRef = useRef(`yt-player-${videoId}-${Math.random().toString(36).slice(2, 9)}`);

  // Set quality to highest available
  const setHighestQuality = useCallback((player: YTPlayer) => {
    const qualities = player.getAvailableQualityLevels();
    // Priority: hd1080 > hd720 > large > medium
    const preferredQualities = ['hd1080', 'hd720', 'large', 'medium'];
    for (const quality of preferredQualities) {
      if (qualities.includes(quality)) {
        player.setPlaybackQuality(quality);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Load YouTube IFrame API
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      // Check if script is already loading
      if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        // Wait for it to load
        const checkInterval = setInterval(() => {
          if (window.YT && window.YT.Player) {
            clearInterval(checkInterval);
            initPlayer();
          }
        }, 100);
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    };

    const initPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(containerIdRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          cc_load_policy: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            setIsLoaded(true);
            setHighestQuality(event.target);
            event.target.playVideo();
          },
          onStateChange: (event) => {
            // When video ends, seek to beginning and set quality again
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0, true);
              setHighestQuality(event.target);
              event.target.playVideo();
            }
            // When buffering or playing, ensure quality
            if (event.data === window.YT.PlayerState.PLAYING ||
                event.data === window.YT.PlayerState.BUFFERING) {
              setHighestQuality(event.target);
            }
          },
        },
      });
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, isMobile, setHighestQuality]);

  // Mobile: show fallback image
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
      {/* YouTube Player Container */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          id={containerIdRef.current}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "pointer-events-none",
            "transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: "max(130vw, 230.77vh)",
            height: "max(130vh, 73.125vw)",
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
