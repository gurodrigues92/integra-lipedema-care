import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'testimonial' | 'timeline' | 'metrics';
  className?: string;
  animate?: boolean;
  count?: number;
}

export const SkeletonLoader = ({ 
  variant = 'card',
  className,
  animate = true,
  count = 1
}: SkeletonLoaderProps) => {
  const baseClasses = cn(
    'bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg',
    animate && 'animate-pulse',
    className
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={cn('space-y-4 p-6 border border-border rounded-2xl', className)}>
            <div className={cn(baseClasses, 'h-48 rounded-xl')} />
            <div className="space-y-3">
              <div className={cn(baseClasses, 'h-6 w-3/4')} />
              <div className={cn(baseClasses, 'h-4 w-full')} />
              <div className={cn(baseClasses, 'h-4 w-2/3')} />
            </div>
            <div className="flex gap-2">
              <div className={cn(baseClasses, 'h-8 w-20 rounded-full')} />
              <div className={cn(baseClasses, 'h-8 w-16 rounded-full')} />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={cn('space-y-2', className)}>
            <div className={cn(baseClasses, 'h-4 w-full')} />
            <div className={cn(baseClasses, 'h-4 w-4/5')} />
            <div className={cn(baseClasses, 'h-4 w-3/5')} />
          </div>
        );

      case 'avatar':
        return (
          <div className={cn('flex items-center space-x-4', className)}>
            <div className={cn(baseClasses, 'h-12 w-12 rounded-full')} />
            <div className="space-y-2 flex-1">
              <div className={cn(baseClasses, 'h-4 w-1/3')} />
              <div className={cn(baseClasses, 'h-3 w-1/4')} />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className={cn(baseClasses, 'h-12 w-32 rounded-xl', className)} />
        );

      case 'testimonial':
        return (
          <div className={cn('space-y-6 p-8 border border-border rounded-3xl', className)}>
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className={cn(baseClasses, 'h-12 w-12 rounded-full')} />
              <div className="space-y-2 flex-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={cn(baseClasses, 'h-4 w-4 rounded mr-1')} />
                  ))}
                </div>
                <div className={cn(baseClasses, 'h-5 w-2/3')} />
                <div className={cn(baseClasses, 'h-3 w-1/2')} />
              </div>
            </div>
            
            {/* Testimonial text */}
            <div className="space-y-3">
              <div className={cn(baseClasses, 'h-4 w-full')} />
              <div className={cn(baseClasses, 'h-4 w-full')} />
              <div className={cn(baseClasses, 'h-4 w-3/4')} />
            </div>
            
            {/* Results */}
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(baseClasses, 'h-2 w-2 rounded-full')} />
                  <div className={cn(baseClasses, 'h-3 w-1/3')} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className={cn('space-y-8', className)}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative flex gap-8">
                {/* Timeline node */}
                <div className="relative">
                  <div className={cn(baseClasses, 'h-8 w-8 rounded-full')} />
                  {i < 3 && (
                    <div className={cn(baseClasses, 'absolute top-8 left-1/2 -translate-x-0.5 w-0.5 h-16')} />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 space-y-4 pb-8">
                  <div className="space-y-2">
                    <div className={cn(baseClasses, 'h-6 w-1/2')} />
                    <div className={cn(baseClasses, 'h-4 w-1/4')} />
                  </div>
                  <div className="space-y-2">
                    <div className={cn(baseClasses, 'h-4 w-full')} />
                    <div className={cn(baseClasses, 'h-4 w-4/5')} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'metrics':
        return (
          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4 p-6 border border-border rounded-2xl text-center">
                <div className={cn(baseClasses, 'h-12 w-12 mx-auto rounded-xl')} />
                <div className="space-y-2">
                  <div className={cn(baseClasses, 'h-8 w-16 mx-auto')} />
                  <div className={cn(baseClasses, 'h-3 w-8 mx-auto')} />
                </div>
                <div className="space-y-2">
                  <div className={cn(baseClasses, 'h-4 w-3/4 mx-auto')} />
                  <div className={cn(baseClasses, 'h-3 w-full')} />
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div className={cn(baseClasses, 'h-4 w-full', className)} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={count > 1 ? 'mb-4' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};