"use client"
import type React from "react"
import { useEffect, useState } from "react"

const COLUMN_1_IMAGES = [
    { src: "/images/demo14.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo12.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo10.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo8.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo6.jpg", aspect: "aspect-[3/4]" },
]

const COLUMN_2_IMAGES = [
    { src: "/images/demo13.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo11.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo9.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo7.jpg", aspect: "aspect-[3/4]" },
    { src: "/images/demo5.jpg", aspect: "aspect-[3/4]" },
]

export const FullFrameSection: React.FC = () => {
    return (
        <section className="h-screen min-h-[800px] grid md:grid-cols-2 border-b border-foreground/10 bg-[#080808] overflow-hidden">
            {/* Copy Side (Left) */}
            <div className="flex flex-col justify-center p-8 md:p-20 border-r border-foreground/10 relative z-10 bg-[#080808]">
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8">
                    STOP BEING GHOSTED.
                    <span className="text-foreground/50"> START GETTING MATCHES.</span>
                </h2>

                <p className="font-mono text-foreground/70 mb-10 text-sm md:text-base max-w-md leading-relaxed">
                   Stop losing matches to bad selfies and awkward angles. We generate candid, lifestyle photos that look like <strong className="text-white">your best friend took them on a night out.</strong>
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                        <div className="w-8 h-8 flex items-center justify-center border border-foreground/20 font-mono text-xs text-accent">
                            01
                        </div>
                        <div className="font-mono text-sm uppercase text-foreground/60 group-hover:text-foreground transition-colors">
                            More Matches, Less Effort.
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-8 h-8 flex items-center justify-center border border-foreground/20 font-mono text-xs text-accent">
                            02
                        </div>
                        <div className="font-mono text-sm uppercase text-foreground/60 group-hover:text-foreground transition-colors">
                            Pass the "Vibe Check" Instantly.
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-8 h-8 flex items-center justify-center border border-foreground/20 font-mono text-xs text-accent">
                            03
                        </div>
                        <div className="font-mono text-sm uppercase text-foreground/60 group-hover:text-foreground transition-colors">
                            Photos that don't look like "AI".
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-8 h-8 flex items-center justify-center border border-foreground/20 font-mono text-xs text-accent">
                            04
                        </div>
                        <div className="font-mono text-sm uppercase text-foreground/60 group-hover:text-foreground transition-colors">
                            Optimized for Hinge, Tinder & Bumble.
                        </div>
                    </div>
                </div>

            </div>

            {/* Visual Side (Right) - Vertical Masonry */}
            <div className="relative bg-black/50 overflow-hidden h-full">
                {/* Context Overlay */}
                <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-foreground/30 text-right mix-blend-difference">
                    SCROLL_AXIS: Y-VERTICAL <br />
                    GRID_LAYOUT: MASONRY
                </div>

                {/* Gradient Masks (Top/Bottom) */}
                <div className="absolute left-0 top-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute left-0 bottom-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-10 pointer-events-none"></div>

                <div className="grid grid-cols-2 gap-4 h-[150%] -mt-[10%] px-4">
                    {/* Column 1 - Scrolls Up */}
                    <div className="flex flex-col gap-4 animate-scroll-up hover:[animation-play-state:paused]">
                        {[...COLUMN_1_IMAGES, ...COLUMN_1_IMAGES, ...COLUMN_1_IMAGES].map((img, i) => (
                            <div
                                key={`col1-${i}`}
                                className={`relative group w-full ${img.aspect} bg-foreground/5 border border-foreground/10 overflow-hidden hover:grayscale-80 transition-all duration-500`}
                            >
                                <img src={img.src} className="w-full h-full object-cover" alt={`Result Col 1 ${i}`} />
                                <div className="absolute top-2 left-2 font-mono text-[9px] text-white/50 bg-black/50 px-1">
                                    {i < 9 ? `0${i + 1}` : i + 1}A
                                </div>
                                {/* Selection Marker */}
                                <div className="absolute inset-0 border-4 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen"></div>
                            </div>
                        ))}
                    </div>

                    {/* Column 2 - Scrolls Down */}
                    <div className="flex flex-col gap-4 animate-scroll-down hover:[animation-play-state:paused]">
                        {[...COLUMN_2_IMAGES, ...COLUMN_2_IMAGES, ...COLUMN_2_IMAGES].map((img, i) => (
                            <div
                                key={`col2-${i}`}
                                className={`relative group w-full ${img.aspect} bg-foreground/5 border border-foreground/10 overflow-hidden hover:grayscale-80 transition-all duration-500`}
                            >
                                <img src={img.src} className="w-full h-full object-cover" alt={`Result Col 2 ${i}`} />
                                <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/50 bg-black/50 px-1">
                                    {i + 1}B
                                </div>
                                {/* Selection Marker */}
                                <div className="absolute inset-0 border-4 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-33.33% - 1rem)); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(calc(-33.33% - 1rem)); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 35s linear infinite;
        }
      `}</style>
        </section>
    )
}