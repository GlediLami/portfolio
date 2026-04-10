import { useState, useEffect, useRef, useCallback } from 'react';

// Global mute state shared across all components
let globalMuted = true;
const listeners = new Set();

function notify() {
  listeners.forEach(fn => fn(globalMuted));
}

/**
 * Shared hook for mute/unmute across pages.
 * Returns [isMuted, toggleMute, registerVideo]
 * Pass registerVideo to one or more <video> refs or use as a callback ref:
 * <video ref={registerVideo} ... />
 */
export function useMuted() {
  const [isMuted, setIsMuted] = useState(globalMuted);
  const videoRefs = useRef(new Set());

  // Function to register a video element (can be used as a callback ref)
  const registerVideo = useCallback((el) => {
    if (el) {
      videoRefs.current.add(el);
      // Synchronize immediately
      el.muted = globalMuted;
    }
  }, []);

  // Subscribe to global changes
  useEffect(() => {
    const handler = (val) => setIsMuted(val);
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  // Sync all registered video elements whenever isMuted changes
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = isMuted;
      }
    });
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    globalMuted = !globalMuted;
    notify();
  }, []);

  return [isMuted, toggleMute, registerVideo];
}
