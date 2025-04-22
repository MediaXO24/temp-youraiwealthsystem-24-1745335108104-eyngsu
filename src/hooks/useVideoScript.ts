
import { useEffect, useRef } from 'react';

export const useVideoScript = (
  addDebugInfo: (info: string) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  toast: any
) => {
  const scriptLoaded = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scriptLoaded.current) return;
    
    const loadScript = () => {
      const currentDomain = window.location.hostname;
      addDebugInfo(`Loading video player script on domain: ${currentDomain}`);
      
      // Monitor for video element errors
      window.addEventListener('error', (event) => {
        if (event.target && (event.target as HTMLElement).tagName === 'VIDEO') {
          addDebugInfo(`Video error: ${event.message}`);
        }
      }, true);
      
      const newScript = document.createElement("script");
      newScript.id = "scr_6807870c003181962988ac69";
      newScript.innerHTML = `
        var playerElement = document.getElementById('vid_6807870c003181962988ac69');
        if (playerElement) {
          var s = document.createElement("script");
          s.src = "https://scripts.converteai.net/75fb8ed8-bab8-4acd-a223-59f27247e275/ab-test/6807870c003181962988ac69/player.js";
          s.async = true;
          s.onload = function() { console.log("Player script loaded successfully"); };
          s.onerror = function(err) { 
            console.error("Error loading player script:", err);
            document.dispatchEvent(new CustomEvent('video-script-error', { detail: 'Failed to load video player script' }));
          };
          document.head.appendChild(s);
          console.log("Player script appended to head");
        } else {
          console.error("Player container not found");
          document.dispatchEvent(new CustomEvent('video-script-error', { detail: 'Player container not found' }));
        }
      `;
      
      document.body.appendChild(newScript);
      scriptLoaded.current = true;
      addDebugInfo("Script injection completed");
      
      // Listen for custom script error events
      document.addEventListener('video-script-error', (e: any) => {
        const errorMsg = e.detail || "Error loading video player";
        addDebugInfo(errorMsg);
        setError(errorMsg);
        setIsLoading(false);
      });
      
      // Set a timeout to check if video player initialized
      timeoutRef.current = setTimeout(() => {
        const videoElement = document.querySelector('video');
        if (!videoElement) {
          // Include domain information in the error message
          const errorMsg = `The video player failed to initialize. This may be due to domain restrictions. Current domain: ${currentDomain}`;
          addDebugInfo("No video element found after 10 seconds - possible domain authorization issue");
          addDebugInfo(`Current domain is: ${currentDomain}`);
          setError(errorMsg);
          setIsLoading(false);
          toast({
            title: "Video Player Error",
            description: errorMsg,
            variant: "destructive"
          });
        }
      }, 10000);
    };

    if (document.readyState === 'complete') {
      loadScript();
    } else {
      window.addEventListener('load', loadScript);
      return () => window.removeEventListener('load', loadScript);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [addDebugInfo, setIsLoading, setError, toast]);

  return scriptLoaded;
};
