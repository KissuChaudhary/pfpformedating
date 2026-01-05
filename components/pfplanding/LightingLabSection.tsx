import React from 'react';
import { Zap, Sun, Film, Video } from 'lucide-react';

export const LightingLabSection: React.FC = () => {
    const modes = [
        {
            icon: Zap,
            name: "Flash Mode",
            desc: "Hard light, red eyes, and the messy energy of a 3am party."
        },
        {
            icon: Sun,
            name: "Golden Mode",
            desc: "Soft natural sunlight, dreamy skin tones, and morning coffee vibes."
        },
        {
            icon: Film,
            name: "Gritty Mode",
            desc: "High contrast, street texture, and raw documentary realism."
        },
        {
            icon: Video,
            name: "Cine Mode",
            desc: "Neon lights, moody shadows, and cinematic color grading."
        },
    ];

    return (
        <section className="min-h-[80vh] border-b border-foreground/10 bg-[#080808] grid md:grid-cols-2">
            {/* Left Column: Text & Visual Menu */}
            <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 border-r border-foreground/10 h-full">
                {/* Heading */}
                <div className="mb-8">
                    <div className="font-mono text-[10px] text-foreground/40 mb-4 tracking-widest">
                        AESTHETIC_ENGINE // 4_MODES
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.9] mb-6">
                        Choose Your<br />
                        <span className="text-transparent stroke-text">Aesthetic</span>.
                    </h2>
                    <p className="font-mono text-foreground/60 text-sm max-w-md leading-relaxed">
                        Don't settle for one generic "AI look." We give you <strong className="text-foreground">four distinct film stocks</strong> to match your mood. Unlike basic filters that just overlay color, our engine completely rebuilds the lighting, texture, and environment of the scene.
                    </p>
                </div>

                {/* The 4 Modes List */}
                <div className="space-y-3 mt-4">
                    {modes.map((mode, i) => (
                        <div key={i} className="group flex items-start gap-4 p-3 -mx-3 border border-transparent hover:border-foreground/10 hover:bg-white/5 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center border border-foreground/20 group-hover:border-accent/50 transition-colors">
                                <mode.icon className="w-4 h-4 text-foreground/50 group-hover:text-accent transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-display text-sm font-bold uppercase text-foreground group-hover:text-accent transition-colors mb-1">
                                    {mode.name}
                                </h4>
                                <p className="font-mono text-[11px] text-foreground/50 leading-relaxed">
                                    {mode.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: 2x2 Grid of Samples */}
            <div className="grid grid-cols-2 bg-black">
                {[
                    { title: "Flash Mode", k: "FLASH", desc: "Hard light, red eyes, 3am party energy.", img: "/showcase18.png" },
                    { title: "Golden Mode", k: "GOLDEN", desc: "Soft sunlight, dreamy skin tones.", img: "/images/golden-photo.webp" },
                    { title: "Gritty Mode", k: "GRITTY", desc: "High contrast, raw documentary feel.", img: "/images/gritty-photo.webp" },
                    { title: "Cine Mode", k: "CINE", desc: "Neon lights, cinematic color grading.", img: "/images/cinematic-photo.webp" },
                ].map((item, i) => (
                    <div key={i} className={`group cursor-pointer relative aspect-[3/4] overflow-hidden border-foreground/10 bg-[#111]
                            ${i % 2 === 0 ? 'border-r' : ''} 
                            ${i < 2 ? 'border-b' : ''}
                        `}>
                        {/* Interactive Card */}
                        <div className="w-full h-full relative">
                            {/* Dark Overlay that vanishes on hover */}
                            <div className="absolute inset-0  z-10 transition-opacity duration-300 pointer-events-none"></div>

                            <img
                                src={item.img}
                                alt={item.title}
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
                                    {item.k.split(' ')[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};