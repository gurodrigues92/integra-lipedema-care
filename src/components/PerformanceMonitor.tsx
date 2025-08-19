import { useEffect, useRef, useState } from 'react';
import { trackEvent } from './AnalyticsTracker';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  loadTime: number;
  domContentLoaded: number;
  resourceLoadTime: number;
  memoryUsage?: number;
}

interface PerformanceMonitorProps {
  reportThreshold?: number; // Report metrics every X seconds
  enableConsoleLogging?: boolean;
  enableRealTimeTracking?: boolean;
}

export const PerformanceMonitor = ({
  reportThreshold = 30000, // 30 seconds
  enableConsoleLogging = process.env.NODE_ENV === 'development',
  enableRealTimeTracking = true
}: PerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const observerRef = useRef<PerformanceObserver | null>(null);
  const metricsCollectedRef = useRef<Set<string>>(new Set());

  // Web Vitals measurement
  useEffect(() => {
    if (!enableRealTimeTracking) return;

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          if (lastEntry && !metricsCollectedRef.current.has('lcp')) {
            const lcp = lastEntry.startTime;
            setMetrics(prev => ({ ...prev, lcp }));
            metricsCollectedRef.current.add('lcp');
            
            trackEvent({
              action: 'web_vital_lcp',
              category: 'performance',
              value: Math.round(lcp),
              label: getLCPRating(lcp)
            });
            
            observer.disconnect();
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        observerRef.current = observer;
      }
    };

    // First Contentful Paint (FCP)
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint' && !metricsCollectedRef.current.has('fcp')) {
              const fcp = entry.startTime;
              setMetrics(prev => ({ ...prev, fcp }));
              metricsCollectedRef.current.add('fcp');
              
              trackEvent({
                action: 'web_vital_fcp',
                category: 'performance',
                value: Math.round(fcp),
                label: getFCPRating(fcp)
              });
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint'] });
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry: any) => {
            if (!metricsCollectedRef.current.has('fid')) {
              const fid = entry.processingStart - entry.startTime;
              setMetrics(prev => ({ ...prev, fid }));
              metricsCollectedRef.current.add('fid');
              
              trackEvent({
                action: 'web_vital_fid',
                category: 'performance',
                value: Math.round(fid),
                label: getFIDRating(fid)
              });
              
              observer.disconnect();
            }
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Report CLS after 5 seconds
        setTimeout(() => {
          if (!metricsCollectedRef.current.has('cls')) {
            setMetrics(prev => ({ ...prev, cls: clsValue }));
            metricsCollectedRef.current.add('cls');
            
            trackEvent({
              action: 'web_vital_cls',
              category: 'performance',
              value: Math.round(clsValue * 1000) / 1000,
              label: getCLSRating(clsValue)
            });
            
            observer.disconnect();
          }
        }, 5000);
      }
    };

    // Navigation timing metrics
    const measureNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          
          setMetrics(prev => ({
            ...prev,
            ttfb,
            domContentLoaded,
            loadTime
          }));
          
          // Track individual metrics
          trackEvent({
            action: 'navigation_timing',
            category: 'performance',
            value: Math.round(ttfb),
            label: 'ttfb'
          });
        }
      }
    };

    // Resource timing
    const measureResourceTiming = () => {
      if ('performance' in window) {
        const resources = performance.getEntriesByType('resource');
        const totalResourceTime = resources.reduce((total, resource: any) => {
          return total + (resource.responseEnd - resource.startTime);
        }, 0);
        
        setMetrics(prev => ({
          ...prev,
          resourceLoadTime: totalResourceTime
        }));
      }
    };

    // Memory usage (if available)
    const measureMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize
        }));
      }
    };

    // Initialize measurements
    observeLCP();
    observeFCP();
    observeFID();
    observeCLS();
    
    // Wait for page load to measure navigation metrics
    if (document.readyState === 'complete') {
      measureNavigationTiming();
      measureResourceTiming();
      measureMemoryUsage();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          measureNavigationTiming();
          measureResourceTiming();
          measureMemoryUsage();
        }, 1000);
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enableRealTimeTracking]);

  // Periodic reporting
  useEffect(() => {
    if (!enableRealTimeTracking) return;

    const interval = setInterval(() => {
      if (Object.keys(metrics).length > 0) {
        reportPerformanceMetrics(metrics);
      }
    }, reportThreshold);

    return () => clearInterval(interval);
  }, [metrics, reportThreshold, enableRealTimeTracking]);

  // Console logging for development
  useEffect(() => {
    if (enableConsoleLogging && Object.keys(metrics).length > 0) {
      console.group('🚀 Performance Metrics');
      console.log('First Contentful Paint:', metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A');
      console.log('Largest Contentful Paint:', metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A');
      console.log('First Input Delay:', metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A');
      console.log('Cumulative Layout Shift:', metrics.cls ? metrics.cls.toFixed(3) : 'N/A');
      console.log('Time to First Byte:', metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A');
      console.log('Load Time:', metrics.loadTime ? `${Math.round(metrics.loadTime)}ms` : 'N/A');
      console.log('Memory Usage:', metrics.memoryUsage ? `${(metrics.memoryUsage / 1048576).toFixed(2)}MB` : 'N/A');
      console.groupEnd();
    }
  }, [metrics, enableConsoleLogging]);

  return null; // This component doesn't render anything
};

// Rating functions for Web Vitals
const getFCPRating = (fcp: number): string => {
  if (fcp <= 1800) return 'good';
  if (fcp <= 3000) return 'needs-improvement';
  return 'poor';
};

const getLCPRating = (lcp: number): string => {
  if (lcp <= 2500) return 'good';
  if (lcp <= 4000) return 'needs-improvement';
  return 'poor';
};

const getFIDRating = (fid: number): string => {
  if (fid <= 100) return 'good';
  if (fid <= 300) return 'needs-improvement';
  return 'poor';
};

const getCLSRating = (cls: number): string => {
  if (cls <= 0.1) return 'good';
  if (cls <= 0.25) return 'needs-improvement';
  return 'poor';
};

// Report metrics to analytics
const reportPerformanceMetrics = (metrics: Partial<PerformanceMetrics>) => {
  trackEvent({
    action: 'performance_summary',
    category: 'performance',
    label: 'web_vitals',
    value: 1
  });

  // Log performance score
  const score = calculatePerformanceScore(metrics);
  trackEvent({
    action: 'performance_score',
    category: 'performance',
    value: score,
    label: getScoreRating(score)
  });
};

// Calculate overall performance score (0-100)
const calculatePerformanceScore = (metrics: Partial<PerformanceMetrics>): number => {
  let score = 0;
  let metricsCount = 0;

  if (metrics.fcp) {
    score += getFCPRating(metrics.fcp) === 'good' ? 100 : getFCPRating(metrics.fcp) === 'needs-improvement' ? 50 : 0;
    metricsCount++;
  }

  if (metrics.lcp) {
    score += getLCPRating(metrics.lcp) === 'good' ? 100 : getLCPRating(metrics.lcp) === 'needs-improvement' ? 50 : 0;
    metricsCount++;
  }

  if (metrics.fid !== undefined) {
    score += getFIDRating(metrics.fid) === 'good' ? 100 : getFIDRating(metrics.fid) === 'needs-improvement' ? 50 : 0;
    metricsCount++;
  }

  if (metrics.cls !== undefined) {
    score += getCLSRating(metrics.cls) === 'good' ? 100 : getCLSRating(metrics.cls) === 'needs-improvement' ? 50 : 0;
    metricsCount++;
  }

  return metricsCount > 0 ? Math.round(score / metricsCount) : 0;
};

const getScoreRating = (score: number): string => {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 50) return 'needs-improvement';
  return 'poor';
};