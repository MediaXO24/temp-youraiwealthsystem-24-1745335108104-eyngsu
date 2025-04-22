
export const createDebugLogger = (setDebugInfo: React.Dispatch<React.SetStateAction<string[]>>) => {
  return (info: string) => {
    console.log(info);
    setDebugInfo(prev => [...prev, info]);
  };
};

export const setupPerformanceObserver = (addDebugInfo: (info: string) => void) => {
  if (window.PerformanceObserver) {
    try {
      const perfObserver = new PerformanceObserver((entries) => {
        entries.getEntries().forEach((entry) => {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (entry.name.includes('.ts') && resourceEntry.initiatorType === 'media') {
            const success = resourceEntry.transferSize > 0;
            addDebugInfo(`Segment loaded: ${entry.name.split('/').pop()} - ${success ? 'Success' : 'Failed'}`);
          }
        });
      });
      perfObserver.observe({ type: 'resource', buffered: true });
    } catch (e) {
      console.log("Performance observer not supported", e);
    }
  }
};

export const monitorNetworkRequests = (addDebugInfo: (info: string) => void) => {
  if (window.performance) {
    const resources = performance.getEntriesByType('resource');
    const videoSegments = resources.filter(r => r.name.includes('.ts'));
    if (videoSegments.length > 0) {
      addDebugInfo(`Found ${videoSegments.length} video segments`);
      let allFailed = true;
      
      videoSegments.forEach(segment => {
        const resourceSegment = segment as PerformanceResourceTiming;
        const status = resourceSegment.transferSize > 0 ? 'loaded' : 'failed';
        if (status === 'loaded') allFailed = false;
        addDebugInfo(`Segment ${segment.name.split('/').pop()}: ${status}`);
      });
      
      if (allFailed && videoSegments.length > 3) {
        addDebugInfo(`WARNING: All ${videoSegments.length} segments failed - this indicates a domain authorization issue`);
      }
    }
  }
};
