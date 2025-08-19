import { ReactNode, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface MicroInteractionProps {
  children: ReactNode;
  className?: string;
  effect?: 'ripple' | 'glow' | 'morphing' | 'elastic' | 'magnetic';
  disabled?: boolean;
  onClick?: () => void;
}

export const MicroInteraction = ({
  children,
  className,
  effect = 'ripple',
  disabled = false,
  onClick
}: MicroInteractionProps) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion) {
      onClick?.();
      return;
    }

    if (effect === 'ripple') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      
      setRipples(prev => [...prev, { id, x, y }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, 600);
    }

    onClick?.();
  };

  const handleMouseEnter = () => {
    if (!disabled && !prefersReducedMotion) {
      setIsInteracting(true);
    }
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
  };

  const getEffectClasses = () => {
    if (prefersReducedMotion || disabled) return '';
    
    switch (effect) {
      case 'glow':
        return isInteracting ? 'shadow-glow animate-pulse-glow' : '';
      case 'morphing':
        return isInteracting ? 'animate-morph-hover' : '';
      case 'elastic':
        return 'hover:animate-elastic active:animate-elastic-click';
      case 'magnetic':
        return 'hover:animate-magnetic';
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden cursor-pointer transition-all duration-300',
        getEffectClasses(),
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Ripple Effect */}
      {effect === 'ripple' && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {ripples.map(({ id, x, y }) => (
            <div
              key={id}
              className="absolute rounded-full bg-white/30 animate-ripple"
              style={{
                left: x - 10,
                top: y - 10,
                width: 20,
                height: 20,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glow Effect */}
      {effect === 'glow' && isInteracting && !prefersReducedMotion && (
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-pulse-glow pointer-events-none" />
      )}
    </div>
  );
};