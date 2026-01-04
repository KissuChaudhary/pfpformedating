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
 * 
 * Key: NO spinner/skeleton shown until image enters viewport
 */
export function LazyGalleryImage({ src, alt, onLoad, onError, isLoaded }: LazyGalleryImageProps) {
    const [isInView, setIsInView] = useState(false);
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
                        observer.unobserve(element);
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before entering viewport
                threshold: 0.01,
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // NOT in view yet - render minimal dark placeholder (no spinner!)
    if (!isInView) {
        return (
            <div
                ref={containerRef}
                className="w-full aspect-[3/4] rounded-lg bg-zinc-900/50"
            />
        );
    }

    // IN VIEW - now show spinner and load the image
    return (
        <div ref={containerRef} className="relative w-full">
            {/* Loading skeleton with spinner - only when in view and not loaded */}
            {!isLoaded && (
                <div className="w-full aspect-[3/4] rounded-lg bg-zinc-800 animate-pulse flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
                </div>
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                className={`w-full h-auto rounded-lg transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'absolute inset-0 opacity-0'
                    }`}
                onLoad={onLoad}
                onError={onError}
            />
        </div>
    );
}
