import { useEffect, useRef, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0-1, where 0.5 is half speed
  direction?: 'up' | 'down' | 'left' | 'right';
  disabled?: boolean;
}

export const ParallaxElement = ({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  disabled = false
}: ParallaxElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (disabled || prefersReducedMotion) return;

    const element = elementRef.current;
    if (!element) return;

    let requestId: number;
    let currentY = 0;
    let targetY = 0;

    const updateParallax = () => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate if element is in viewport
      const isInViewport = elementTop < windowHeight && (elementTop + elementHeight) > 0;
      
      if (isInViewport) {
        // Calculate parallax offset based on scroll position
        const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        const maxOffset = 50; // Maximum pixels to move
        
        let offset = (scrollProgress - 0.5) * maxOffset * speed;
        
        // Apply direction
        switch (direction) {
          case 'down':
            offset = -offset;
            break;
          case 'left':
            targetY = 0;
            element.style.transform = `translateX(${offset}px)`;
            return;
          case 'right':
            targetY = 0;
            element.style.transform = `translateX(${-offset}px)`;
            return;
          default: // 'up'
            break;
        }
        
        targetY = offset;
      }
      
      // Smooth interpolation
      currentY += (targetY - currentY) * 0.1;
      
      if (direction === 'up' || direction === 'down') {
        element.style.transform = `translateY(${currentY}px)`;
      }
      
      requestId = requestAnimationFrame(updateParallax);
    };

    const handleScroll = () => {
      if (!requestId) {
        requestId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [speed, direction, disabled, prefersReducedMotion]);

  return (
    <div
      ref={elementRef}
      className={cn('will-change-transform', className)}
    >
      {children}
    </div>
  );
};