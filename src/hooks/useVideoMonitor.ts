
import { useEffect, useRef } from 'react';
import { monitorNetworkRequests } from '../utils/debugUtils';

export const useVideoMonitor = (
  addDebugInfo: (info: string) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  onVideoProgress?: (currentTime: number) => void
) => {
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const failedSegmentsRef = useRef<number>(0);
  const totalSegmentsRef = useRef<number>(0);
  const setupCompletedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only log this once to avoid endless console messages
    if (!setupCompletedRef.current) {
      addDebugInfo("Setting up video element monitor");
      setupCompletedRef.current = true;
    }
    
    // Clear previous intervals if they exist
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
    
    let attemptCount = 0;
    const maxAttempts = 20; // Limit the number of attempts to find the video element
    
    checkIntervalRef.current = setInterval(() => {
      attemptCount++;
      const videoElement = document.querySelector('video');
      
      if (videoElement) {
        addDebugInfo("Video element found");
        if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        setIsLoading(false);
        
        // Monitor video buffering state
        videoElement.addEventListener('waiting', () => {
          addDebugInfo("Video buffering...");
        });
        
        // Monitor when video starts playing
        videoElement.addEventListener('playing', () => {
          addDebugInfo("Video playing");
          setError(null);
        });
        
        // Monitor video errors
        videoElement.addEventListener('error', (e) => {
          const videoError = (videoElement as any).error;
          const errorCode = videoError ? videoError.code : 'unknown';
          const errorMsg = `Video error: Code ${errorCode}`;
          addDebugInfo(errorMsg);
          setError(errorMsg);
        });
        
        // Track video progress
        const handleTimeUpdate = () => {
          if (onVideoProgress) {
            onVideoProgress(videoElement.currentTime);
          }
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        
        // Check for player error messages
        const errorElem = document.querySelector('.smartplayer-error-message');
        if (errorElem && errorElem.textContent) {
          const errorMsg = errorElem.textContent;
          addDebugInfo(`Player error message: ${errorMsg}`);
          setError(errorMsg);
        }
        
        // Check segment loading status
        const checkSegmentStatus = () => {
          monitorNetworkRequests(addDebugInfo);
          
          // Count failed segments to determine if we should show an error
          if (window.performance) {
            const resources = performance.getEntriesByType('resource');
            const videoSegments = resources.filter(r => r.name.includes('.ts'));
            
            if (videoSegments.length > 0) {
              totalSegmentsRef.current = videoSegments.length;
              let failedCount = 0;
              
              videoSegments.forEach(segment => {
                const resourceSegment = segment as PerformanceResourceTiming;
                if (resourceSegment.transferSize <= 0) {
                  failedCount++;
                }
              });
              
              failedSegmentsRef.current = failedCount;
              
              // If all segments are failing, show a domain authorization error
              if (failedCount === videoSegments.length && videoSegments.length > 3) {
                const errorMsg = "Domain not authorized to play this video. The video segments cannot be loaded.";
                setError(errorMsg);
                addDebugInfo(`All ${failedCount} segments failed to load - ${errorMsg}`);
              }
            }
          }
        };
        
        // Initial check
        checkSegmentStatus();
        
        // Periodic checks for network requests (less frequent)
        const networkCheckInterval = setInterval(checkSegmentStatus, 10000);

        return () => {
          videoElement.removeEventListener('timeupdate', handleTimeUpdate);
          videoElement.removeEventListener('waiting', () => {});
          videoElement.removeEventListener('playing', () => {});
          videoElement.removeEventListener('error', () => {});
          clearInterval(networkCheckInterval);
        };
      } else if (attemptCount >= maxAttempts) {
        // Stop checking after max attempts to prevent infinite loop
        addDebugInfo(`Gave up looking for video element after ${maxAttempts} attempts`);
        if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        
        // Show error to user after max attempts
        const errorMsg = "Could not find video player. Please try refreshing the page.";
        setError(errorMsg);
        setIsLoading(false);
      }
    }, 500);
    
    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [addDebugInfo, onVideoProgress, setError, setIsLoading]);

  return checkIntervalRef;
};
