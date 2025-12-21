import React from 'react';

export const LightingLabSection: React.FC = () => {
    return (
        <section className="min-h-[80vh] border-b border-foreground/10 bg-[#080808] grid md:grid-cols-2">
            {/* Left Column: Text & Context */}
            <div className="flex flex-col justify-center p-8 md:p-20 border-r border-foreground/10 h-full">
                <div className="mb-8">
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.9] mb-6">
                        Choose Your <br />
                        <span className="text-transparent stroke-text">Physics</span>.
                    </h2>
                    <p className="font-mono text-foreground/70 text-sm md:text-base max-w-md leading-relaxed">
                        We don't use filters. We re-render the scene's light transport. Choose the lighting condition that matches your vibe.
                    </p>
                </div>

                <div className="mt-8 inline-block border border-foreground/20 px-4 py-2 bg-white/5 w-fit">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/40 uppercase">
                        Lighting_Engine_V2 // SELECT_MODE
                    </span>
                </div>
            </div>

            {/* Right Column: 2x2 Grid of Samples */}
            <div className="grid grid-cols-2 bg-black">
                {[
                    { title: "Tungsten Flash", k: "3200K + FLASH", desc: "Harsh, night-out, paparazzi.", img: "/showcase18.png" },
                    { title: "Cinematic Cold", k: "5600K DAYLIGHT", desc: "Moody blue, window, soft.", img: "/showcase16.png" },
                    { title: "Golden Hour", k: "2800K WARM", desc: "Late Night, haze, warmth.", img: "/showcase14.png" },
                    { title: "B&W Noir", k: "MONOCHROME", desc: "High contrast, grain, 35mm.", img: "/showcase19.png" },
                ].map((item, i) => (
                    <div key={i} className={`group cursor-pointer relative aspect-[3/4] overflow-hidden border-foreground/10 bg-[#111]
                            ${i % 2 === 0 ? 'border-r' : ''} 
                            ${i < 2 ? 'border-b' : ''}
                        `}>
                        {/* Interactive Card */}
                        <div className="w-full h-full relative">
                            {/* Dark Overlay that vanishes on hover */}
                            <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>

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