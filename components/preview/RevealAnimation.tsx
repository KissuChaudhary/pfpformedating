'use client';

import { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface RevealAnimationProps {
    onComplete?: () => void;
    autoTrigger?: boolean;
}

export function RevealAnimation({ onComplete, autoTrigger = true }: RevealAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);

    const fireConfetti = useCallback(() => {
        // Central burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Side bursts
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 }
            });
        }, 150);

        setIsVisible(true);
        onComplete?.();
    }, [onComplete]);

    useEffect(() => {
        if (autoTrigger) {
            // Small delay for dramatic effect
            const timer = setTimeout(fireConfetti, 300);
            return () => clearTimeout(timer);
        }
    }, [autoTrigger, fireConfetti]);

    return (
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* This component is mainly for the confetti effect */}
            {/* The actual revealed content should be rendered by the parent */}
        </div>
    );
}

// Export a trigger function for manual use
export function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 }
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 }
        });
    }, 150);
}
