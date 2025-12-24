"use client";

import { useState } from "react";
import Image from "next/image";

interface FadeInImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
}

export function FadeInImage({
    src,
    alt,
    width,
    height,
    className = "",
    priority = false,
}: FadeInImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={`relative overflow-hidden bg-zinc-800 ${className}`}>
            {/* Skeleton Loader - Visible while loading */}
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-800 animate-pulse">
                    <div className="w-10 h-10 border-4 border-zinc-600 border-t-white rounded-full animate-spin opacity-20"></div>
                </div>
            )}

            {/* The Image itself */}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                unoptimized
                className={`
                    duration-700 ease-in-out block w-full h-auto object-cover
                    ${isLoading ? "scale-105 blur-lg opacity-0" : "scale-100 blur-0 opacity-100"}
                `}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
