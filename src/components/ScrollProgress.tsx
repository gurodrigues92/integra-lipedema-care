import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/20 backdrop-blur-sm">
      <div 
        className={`h-full bg-gradient-to-r from-primary via-accent to-primary transition-all ${
          prefersReducedMotion ? 'duration-0' : 'duration-300'
        } ease-out`}
        style={{ 
          width: `${scrollProgress}%`,
          background: prefersReducedMotion 
            ? 'hsl(var(--primary))' 
            : 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))'
        }}
      />
    </div>
  );
};