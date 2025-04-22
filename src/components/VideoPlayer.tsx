
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { createDebugLogger, setupPerformanceObserver } from "@/utils/debugUtils";
import { useVideoScript } from "@/hooks/useVideoScript";
import { useVideoMonitor } from "@/hooks/useVideoMonitor";
import VideoError from "./VideoError";

interface VideoPlayerProps {
  onVideoProgress?: (currentTime: number) => void;
}

const VideoPlayer = ({ onVideoProgress }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  const addDebugInfo = createDebugLogger(setDebugInfo);
  const scriptLoaded = useVideoScript(addDebugInfo, setIsLoading, setError, toast);
  useVideoMonitor(addDebugInfo, setIsLoading, setError, onVideoProgress);

  // Set up performance monitoring for video segments
  setupPerformanceObserver(addDebugInfo);

  const tryAgain = () => {
    setIsLoading(true);
    setError(null);
    setDebugInfo([]);
    scriptLoaded.current = false;
    
    const existingScript = document.getElementById("scr_6807870c003181962988ac69");
    if (existingScript) {
      existingScript.remove();
    }
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Card className="overflow-hidden bg-slate-950 border-slate-700 shadow-xl">
      <CardContent className="p-0">
        <div 
          id="vid_6807870c003181962988ac69" 
          ref={playerContainerRef}
          style={{ position: 'relative', width: '100%', padding: '56.25% 0 0' }}
        >
          {isLoading && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
                <p>Loading video player...</p>
              </div>
            </div>
          )}
          
          {error && (
            <VideoError 
              error={error}
              debugInfo={debugInfo}
              onTryAgain={tryAgain}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
