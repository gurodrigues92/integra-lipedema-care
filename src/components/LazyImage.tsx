import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage = ({
  src,
  alt,
  className,
  width,
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjMgZjQgZjYiLz48L3N2Zz4=',
  blurDataURL,
  priority = false,
  quality = 85,
  sizes = '100vw',
  onLoad,
  onError,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : placeholder);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Update src when in view
  useEffect(() => {
    if (isInView && currentSrc !== src) {
      setCurrentSrc(src);
    }
  }, [isInView, src, currentSrc]);

  // Generate responsive srcSet
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc || baseSrc.startsWith('data:')) return undefined;
    
    // For external URLs or if it's already optimized, return as-is
    return undefined;
  };

  // Generate optimized src with quality
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc || originalSrc.startsWith('data:')) return originalSrc;
    
    // If it's a Cloudinary URL, add optimization parameters
    if (originalSrc.includes('cloudinary.com')) {
      // Add quality and format optimizations
      const optimizations = `q_auto:${quality},f_auto,c_limit,w_${width || 800}`;
      return originalSrc.replace('/upload/', `/upload/${optimizations}/`);
    }
    
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    setCurrentSrc(placeholder);
    onError?.();
  };

  const optimizedSrc = getOptimizedSrc(currentSrc);
  const srcSet = generateSrcSet(src);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg opacity-50 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'w-full h-full object-cover transition-all duration-500',
          {
            'opacity-0 scale-105': !isLoaded && currentSrc === src,
            'opacity-100 scale-100': isLoaded || currentSrc === placeholder,
            'filter blur-sm': !isLoaded && currentSrc === src,
          }
        )}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Loading indicator */}
      {!isLoaded && !isError && currentSrc === src && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-muted/50 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xs">Erro ao carregar imagem</p>
          </div>
        </div>
      )}
    </div>
  );
};