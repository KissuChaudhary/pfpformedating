import React from 'react';
import { Zap, Sun, Film, Video } from 'lucide-react';

export const LightingLabSection: React.FC = () => {
    const styles = [
        {
            icon: Zap,
            name: "The 'After Party'",
            desc: "Flash on. Messy hair. Looks like you just left the coolest club in Berlin."
        },
        {
            icon: Sun,
            name: "The 'Golden Hour'",
            desc: "Warm sunlight. Coffee in hand. The 'boyfriend material' shot she sends to her group chat."
        },
        {
            icon: Film,
            name: "The 'Film Grain'",
            desc: "Vintage Kodak vibes. Artsy, mysterious, and effortlessly cool."
        },
        {
            icon: Video,
            name: "The 'Cinematic'",
            desc: "Moody lighting. Neon accents. Looks like a still from a Netflix documentary about you."
        },
    ];

    return (
        <section className="min-h-[80vh] border-b border-foreground/10 bg-[#080808] grid md:grid-cols-2">
            {/* Left Column: Text & Visual Menu */}
            <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 border-r border-foreground/10 h-full">
                {/* Heading */}
                <div className="mb-8">
                    <div className="font-mono text-[10px] text-foreground/40 mb-4 tracking-widest">
                        VIBE_CHECK // PASSED
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] mb-6">
                        Stop Looking<br />
                        <span className="text-transparent stroke-text">Generic</span>.
                    </h2>
                    <p className="font-mono text-foreground/60 text-sm max-w-md leading-relaxed">
                        Women swipe left on boring. They swipe right on <strong>intrigue</strong>. We don't just generate photos; we generate an entire <em>mood</em> that makes them pause and wonder, "Who is this guy?"
                    </p>
                </div>

                {/* The 4 Styles List */}
                <div className="space-y-3 mt-4">
                    {styles.map((style, i) => (
                        <div key={i} className="group flex items-start gap-4 p-3 -mx-3 border border-transparent hover:border-foreground/10 hover:bg-white/5 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center border border-foreground/20 group-hover:border-accent/50 transition-colors">
                                <style.icon className="w-4 h-4 text-foreground/50 group-hover:text-accent transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-display text-sm font-bold uppercase text-foreground group-hover:text-accent transition-colors mb-1">
                                    {style.name}
                                </h4>
                                <p className="font-mono text-[11px] text-foreground/50 leading-relaxed">
                                    {style.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: 2x2 Grid of Samples */}
            <div className="grid grid-cols-2 bg-black">
                {[
                    { title: "The After Party", k: "FLASH", desc: "Flash on. Messy hair. 3am energy.", img: "/images/demo8.jpg" },
                    { title: "Golden Hour", k: "GOLDEN", desc: "Boyfriend material. Warm & inviting.", img: "/images/golden-photo.webp" },
                    { title: "Film Grain", k: "VINTAGE", desc: "Artsy, mysterious, Kodak vibes.", img: "/images/vintage-roll.webp" },
                    { title: "Cinematic", k: "MOODY", desc: "Main character energy. Neon & shadows.", img: "/images/cinematic-photo.webp" },
                ].map((item, i) => (
                    <div key={i} className={`group cursor-pointer relative aspect-[3/4] overflow-hidden border-foreground/10 bg-[#111]
                            ${i % 2 === 0 ? 'border-r' : ''} 
                            ${i < 2 ? 'border-b' : ''}
                        `}>
                        {/* Interactive Card */}
                        <div className="w-full h-full relative">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            
                            {/* Hover UI elements */}
                            <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-end z-20">
                                {/* Top Corners */}
                                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="font-mono text-[9px] text-accent mb-2 tracking-widest uppercase">
                                        {item.k}
                                    </div>
                                    <h3 className="font-display text-lg font-bold uppercase text-white mb-1">
                                        {item.title}
                                    </h3>
                                    {/* Description reveal */}
                                    <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                                        <p className="font-mono text-[10px] text-foreground/60 pt-2 border-t border-white/10 mt-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Static Label (Always visible until hover) */}
                            <div className="absolute bottom-4 left-4 z-20 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                <span className="font-mono text-[10px] bg-black/50 backdrop-blur-md px-2 py-1 text-foreground/50 border border-white/5">
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};