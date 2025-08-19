import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in' | 'stagger';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export const AnimatedSection = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}: AnimatedSectionProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });
  
  const prefersReducedMotion = useReducedMotion();

  const getAnimationClass = () => {
    if (prefersReducedMotion) return 'opacity-100';
    
    const baseClass = isVisible ? 'animate-in' : 'opacity-0';
    
    switch (animation) {
      case 'fade-up':
        return `${baseClass} ${isVisible ? 'animate-fade-in-up' : 'translate-y-8'}`;
      case 'fade-in':
        return `${baseClass} ${isVisible ? 'animate-fade-in' : ''}`;
      case 'slide-left':
        return `${baseClass} ${isVisible ? 'animate-slide-in-left' : 'translate-x-8'}`;
      case 'slide-right':
        return `${baseClass} ${isVisible ? 'animate-slide-in-right' : '-translate-x-8'}`;
      case 'scale-in':
        return `${baseClass} ${isVisible ? 'animate-scale-in' : 'scale-95'}`;
      case 'stagger':
        return `${baseClass} ${isVisible ? 'animate-stagger-fade-in' : 'translate-y-4'}`;
      default:
        return baseClass;
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-700 ease-out',
        getAnimationClass(),
        className
      )}
      style={!prefersReducedMotion && delay > 0 ? { 
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      } : {}}
    >
      {children}
    </div>
  );
};