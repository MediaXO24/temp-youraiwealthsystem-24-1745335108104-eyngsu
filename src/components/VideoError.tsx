
import { AlertCircle, Info, RefreshCw, Globe, ExternalLink } from "lucide-react";

interface VideoErrorProps {
  error: string;
  debugInfo: string[];
  onTryAgain: () => void;
}

const VideoError = ({ error, debugInfo, onTryAgain }: VideoErrorProps) => {
  // Check if we have a domain authorization issue
  const isDomainAuthError = debugInfo.some(info => 
    info.includes("failed to load") || 
    info.includes("Domain not authorized") || 
    (info.includes("segment") && info.includes("failed"))
  );
  
  // Check if we have a video element not found issue
  const isVideoNotFoundError = error.includes("Could not find video player") || 
    debugInfo.some(info => info.includes("Gave up looking for video element"));

  // Get the current domain for displaying in the error message
  const currentDomain = window.location.hostname;
  const fullUrl = window.location.href;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white px-6 overflow-auto">
      <div className="flex flex-col items-center text-center py-6">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="font-semibold text-lg mb-2">Video Player Error</p>
        <p className="text-sm opacity-80 mb-4">{error}</p>
        
        <div className="mt-2 mb-4">
          <button 
            onClick={onTryAgain} 
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
        
        <div className="mt-4 p-4 bg-slate-800 rounded-lg text-sm text-left w-full">
          <p className="font-mono text-amber-400 mb-2">Possible solutions:</p>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            {isDomainAuthError ? (
              <>
                <li className="text-yellow-300">Video segments are failing to load - this is likely a domain authorization issue</li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Current domain: <code className="bg-slate-700 px-1 rounded">{currentDomain}</code></span>
                </li>
                <li>Make sure this exact domain is in your authorized domains list</li>
                <li>For preview/development environments, authorize <code className="bg-slate-700 px-1 rounded">*.lovable.app</code></li>
                <li>Check if your domain settings include the protocol (http:// or https://)</li>
                <li>Some video providers require an exact match (with or without www)</li>
                <li>Wait 5-10 minutes after saving domain changes for them to propagate</li>
              </>
            ) : isVideoNotFoundError ? (
              <>
                <li className="text-yellow-300">Video player initialization failed</li>
                <li>Refresh the page</li>
                <li>Try using a different browser</li>
                <li>Check your internet connection</li>
              </>
            ) : (
              <>
                <li>Check your internet connection</li>
                <li>Try a different browser</li>
                <li>Clear your browser cache</li>
              </>
            )}
          </ul>
        </div>
        
        {isDomainAuthError && (
          <div className="mt-4 p-4 bg-slate-800 rounded-lg text-sm text-left w-full">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-blue-400" />
              <p className="font-mono text-blue-400">Full URL for reference:</p>
            </div>
            <p className="text-gray-300 break-all font-mono text-xs">{fullUrl}</p>
          </div>
        )}
        
        {debugInfo.length > 0 && (
          <div className="mt-4 p-4 bg-slate-800 rounded-lg text-xs text-left w-full max-h-40 overflow-y-auto">
            <div className="flex items-center mb-2">
              <Info className="h-4 w-4 text-blue-400 mr-2" />
              <p className="font-mono text-blue-400">Debug Information:</p>
            </div>
            <ul className="text-gray-400 space-y-1 font-mono">
              {debugInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoError;
