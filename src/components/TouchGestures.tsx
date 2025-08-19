import { useEffect, useRef, useState, ReactNode } from 'react';

interface TouchGesturesProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  enableHaptic?: boolean;
  className?: string;
}

const TouchGestures = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  enableHaptic = true,
  className = ""
}: TouchGesturesProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [pinchStart, setPinchStart] = useState<{ distance: number; scale: number } | null>(null);

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHaptic) return;
    
    try {
      if ('vibrate' in navigator) {
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [30, 10, 30]
        };
        navigator.vibrate(patterns[type]);
      }
    } catch (error) {
      console.warn('[TouchGestures] Haptic feedback not supported:', error);
    }
  };

  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let startDistance = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Single touch - swipe gesture
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        setTouchStart({ x: startX, y: startY });
      } else if (e.touches.length === 2) {
        // Two finger touch - pinch gesture
        startDistance = getDistance(e.touches[0], e.touches[1]);
        setPinchStart({ distance: startDistance, scale: 1 });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStart && onPinch) {
        // Handle pinch gesture
        const currentDistance = getDistance(e.touches[0], e.touches[1]);
        const scale = currentDistance / pinchStart.distance;
        onPinch(scale);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;

      const deltaX = e.changedTouches[0].clientX - touchStart.x;
      const deltaY = e.changedTouches[0].clientY - touchStart.y;
      
      const minSwipeDistance = 50;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Determine swipe direction
      if (absX > minSwipeDistance || absY > minSwipeDistance) {
        if (absX > absY) {
          // Horizontal swipe
          if (deltaX > 0 && onSwipeRight) {
            hapticFeedback('light');
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            hapticFeedback('light');
            onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && onSwipeDown) {
            hapticFeedback('light');
            onSwipeDown();
          } else if (deltaY < 0 && onSwipeUp) {
            hapticFeedback('light');
            onSwipeUp();
          }
        }
      }

      setTouchStart(null);
      setPinchStart(null);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart, pinchStart, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch, enableHaptic]);

  return (
    <div ref={elementRef} className={className} style={{ touchAction: 'pan-y' }}>
      {children}
    </div>
  );
};

export default TouchGestures;