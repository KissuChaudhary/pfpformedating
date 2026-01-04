'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyGalleryImageProps {
    src: string;
    alt: string;
    onLoad: () => void;
    onError: () => void;
    isLoaded: boolean;
}

/**
 * Lazy loading image component that only starts loading when in viewport.
 * Uses Intersection Observer for efficient lazy loading.
 */
export function LazyGalleryImage({ src, alt, onLoad, onError, isLoaded }: LazyGalleryImageProps) {
    const [isInView, setIsInView] = useState(false);
    const [hasStartedLoading, setHasStartedLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer to detect when image enters viewport
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        // Once in view, we can stop observing
                        observer.unobserve(element);
                    }
                });
            },
            {
                rootMargin: '100px', // Start loading 100px before entering viewport
                threshold: 0.1,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Start loading image when in view
    useEffect(() => {
        if (isInView && !hasStartedLoading) {
            setHasStartedLoading(true);
        }
    }, [isInView, hasStartedLoading]);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Skeleton - shown until image loads */}
            {!isLoaded && (
                <div className="w-full aspect-[3/4] rounded-lg bg-zinc-800/50 animate-pulse flex items-center justify-center">
                    {hasStartedLoading && (
                        <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
                    )}
                </div>
            )}

            {/* Actual image - only render when in viewport */}
            {hasStartedLoading && (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-auto rounded-lg transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'absolute inset-0 opacity-0'
                        }`}
                    onLoad={onLoad}
                    onError={onError}
                    loading="lazy"
                />
            )}
        </div>
    );
}
