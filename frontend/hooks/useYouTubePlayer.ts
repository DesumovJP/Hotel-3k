"use client";

import { useState, useEffect, useRef } from "react";
import type { YTPlayer } from "@/types/youtube";

interface UseYouTubePlayerOptions {
  videoId: string;
  containerId: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onReady?: () => void;
  onError?: () => void;
}

export function useYouTubePlayer({
  videoId,
  containerId,
  autoplay = true,
  muted = true,
  loop = true,
  onReady,
  onError,
}: UseYouTubePlayerOptions) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const isInitializedRef = useRef(false);
  const containerIdRef = useRef(containerId);

  useEffect(() => {
    if (isInitializedRef.current || !videoId) return;

    // Recreate container div for fresh player
    const recreateContainer = () => {
      const oldContainer = document.getElementById(containerIdRef.current);
      if (oldContainer && oldContainer.parentNode) {
        const newContainer = document.createElement('div');
        newContainer.id = containerIdRef.current;
        newContainer.className = oldContainer.className;
        newContainer.style.cssText = oldContainer.style.cssText;
        oldContainer.parentNode.replaceChild(newContainer, oldContainer);
      }
    };

    const createPlayer = () => {
      const container = document.getElementById(containerIdRef.current);
      if (!container) return;

      playerRef.current = new window.YT.Player(containerIdRef.current, {
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          mute: muted ? 1 : 0,
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
          // Request HD quality
          vq: 'hd1080',
        },
        events: {
          onReady: (event) => {
            setIsLoaded(true);
            if (autoplay) {
              event.target.playVideo();
            }
            onReady?.();
          },
          onStateChange: (event) => {
            // When video ends, destroy and recreate player for fresh HD quality
            if (loop && event.data === window.YT.PlayerState.ENDED) {
              // Destroy current player
              try {
                playerRef.current?.destroy();
              } catch {
                // ignore
              }
              playerRef.current = null;

              // Recreate container and player after short delay
              setTimeout(() => {
                recreateContainer();
                setTimeout(() => {
                  createPlayer();
                }, 50);
              }, 50);
            }

            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }

            if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
          onError: () => {
            onError?.();
          },
        },
      });
    };

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        isInitializedRef.current = true;
        createPlayer();
        return;
      }

      if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const checkInterval = setInterval(() => {
          if (window.YT && window.YT.Player) {
            clearInterval(checkInterval);
            isInitializedRef.current = true;
            createPlayer();
          }
        }, 100);
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        isInitializedRef.current = true;
        createPlayer();
      };
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Player may already be destroyed
        }
        playerRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, [videoId, autoplay, muted, loop, onReady, onError]);

  return {
    isLoaded,
    isPlaying,
    player: playerRef.current,
  };
}
