// YouTube IFrame API types
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setPlaybackQuality: (quality: string) => void;
  getPlaybackQuality: () => string;
  getAvailableQualityLevels: () => string[];
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
}

interface YTPlayerConfig {
  videoId: string;
  playerVars: Record<string, number | string>;
  events: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number; target: YTPlayer }) => void;
    onError?: (event: { data: number }) => void;
  };
}

interface YT {
  Player: new (elementId: string | HTMLElement, config: YTPlayerConfig) => YTPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
    UNSTARTED: number;
  };
}

declare global {
  interface Window {
    YT: YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export { YTPlayer, YTPlayerConfig, YT };
