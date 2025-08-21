import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  section?: string;
  element?: string;
}

interface ConversionEvent {
  event_name: string;
  parameters: Record<string, any>;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const AnalyticsTracker = () => {
  const location = useLocation();
  const scrollDepthRef = useRef<Set<number>>(new Set());
  const timeOnPageRef = useRef<number>(Date.now());
  const sectionTimesRef = useRef<Map<string, number>>(new Map());
  const isDev = process.env.NODE_ENV === 'development';
  
  // Track page views
  useEffect(() => {
    if (isDev) return; // Skip in development
    
    const pageTitle = document.title;
    const pageLocation = location.pathname;
    
    // Reset tracking data for new page
    scrollDepthRef.current.clear();
    timeOnPageRef.current = Date.now();
    sectionTimesRef.current.clear();
    
    // Google Analytics 4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pageLocation
      });
      
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pageLocation,
        timestamp: Date.now()
      });
    }
    
    // Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView', {
        page_title: pageTitle,
        page_location: window.location.href
      });
    }
    
    if (isDev) console.log('[Analytics] Page view tracked:', pageLocation);
  }, [location, isDev]);

  // Optimized scroll depth tracking
  useEffect(() => {
    if (isDev) return; // Skip in development
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Track scroll milestones
      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthRef.current.has(milestone)) {
          scrollDepthRef.current.add(milestone);
          
          trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${milestone}%`,
            value: milestone
          });
        }
      });
    };

    const throttledScroll = throttle(handleScroll, 1000); // Increased throttle time
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isDev]);

  // Optimized section timing tracking
  useEffect(() => {
    if (isDev) return; // Skip in development
    
    const observeSection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id || entry.target.className;
        
        if (entry.isIntersecting) {
          // User entered section
          sectionTimesRef.current.set(sectionId, Date.now());
        } else if (sectionTimesRef.current.has(sectionId)) {
          // User left section
          const enterTime = sectionTimesRef.current.get(sectionId);
          if (enterTime) {
            const timeSpent = Date.now() - enterTime;
            
            // Only track if spent more than 2 seconds
            if (timeSpent > 2000) {
              trackEvent({
                action: 'section_time',
                category: 'engagement',
                label: sectionId,
                value: Math.round(timeSpent / 1000),
                section: sectionId
              });
            }
          }
          
          sectionTimesRef.current.delete(sectionId);
        }
      });
    };

    // Delayed observer initialization to avoid affecting initial render
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(observeSection, {
        threshold: 0.5,
        rootMargin: '0px 0px -20% 0px'
      });

      const sections = document.querySelectorAll('section, [data-section]');
      sections.forEach(section => observer.observe(section));

      return () => observer.disconnect();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [location, isDev]);

  // Track time on page when user leaves
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - timeOnPageRef.current;
      
      trackEvent({
        action: 'time_on_page',
        category: 'engagement',
        label: location.pathname,
        value: Math.round(timeOnPage / 1000)
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleBeforeUnload();
      } else if (document.visibilityState === 'visible') {
        timeOnPageRef.current = Date.now(); // Reset timer when page becomes visible again
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location]);

  return null; // This component doesn't render anything
};

// Analytics utility functions
export const trackEvent = (event: AnalyticsEvent) => {
  const { action, category, label, value, section, element } = event;
  
  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      custom_section: section,
      custom_element: element,
      timestamp: Date.now()
    });
  }
  
  // Facebook Pixel
  if (typeof window.fbq !== 'undefined') {
    window.fbq('trackCustom', action, {
      category,
      label,
      value,
      section,
      element
    });
  }
  
  console.log('[Analytics] Event tracked:', event);
};

export const trackConversion = (event: ConversionEvent) => {
  const { event_name, parameters } = event;
  
  // Google Analytics 4 Enhanced Ecommerce
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', event_name, {
      ...parameters,
      timestamp: Date.now(),
      currency: 'BRL'
    });
  }
  
  // Facebook Pixel Conversion
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', event_name, parameters);
  }
  
  console.log('[Analytics] Conversion tracked:', event);
};

export const trackFormInteraction = (formName: string, action: string, field?: string) => {
  trackEvent({
    action: `form_${action}`,
    category: 'form_interaction',
    label: formName,
    element: field,
    section: formName
  });
};

export const trackCTAClick = (location: string, ctaText: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'conversion',
    label: location,
    element: ctaText,
    section: location
  });
  
  // Track as conversion event
  trackConversion({
    event_name: 'generate_lead',
    parameters: {
      source: location,
      cta_text: ctaText,
      page_path: window.location.pathname
    }
  });
};

export const trackVideoInteraction = (action: string, videoTitle: string, progress?: number) => {
  trackEvent({
    action: `video_${action}`,
    category: 'engagement',
    label: videoTitle,
    value: progress,
    element: 'video'
  });
};

export const trackScrollMilestone = (percentage: number) => {
  trackEvent({
    action: 'scroll_milestone',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage
  });
};

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}