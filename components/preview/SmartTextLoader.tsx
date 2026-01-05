'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
    "Analyzing your facial features...",
    "AI is learning your facial identity...",
    "Thinking of a cinematic shot for you...",
    "Applying professional lighting...",
    "Fine-tuning your features...",
    "Almost there...",
];

interface SmartTextLoaderProps {
    intervalMs?: number;
}

export function SmartTextLoader({ intervalMs = 20000 }: SmartTextLoaderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
                setIsAnimating(false);
            }, 500); // Half duration for fade out, then update
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return (
        <div className="text-center">
            <p
                className={`text-lg md:text-xl text-muted-foreground transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
            >
                {MESSAGES[currentIndex]}
            </p>

            {/* Loading dots */}
            <div className="flex justify-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}
