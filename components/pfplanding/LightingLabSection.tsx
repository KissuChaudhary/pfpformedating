import React from 'react';

export const LightingLabSection: React.FC = () => {
  return (
    <section className="py-24 border-b border-foreground/10">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">
                    Choose Your <span className="text-transparent stroke-text">Physics</span>.
                </h2>
                <p className="font-mono text-foreground/60 max-w-2xl mx-auto">
                    We don't use filters. We re-render the scene's light transport. Choose the lighting condition that matches your vibe.
                </p>
                <div className="mt-6 inline-block border border-foreground/20 px-3 py-1 bg-white/5">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/40">
                        LIGHTING_ENGINE_V2 // SELECT_MODE
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Tungsten Flash", k: "3200K + FLASH", desc: "Harsh, night-out, paparazzi.", img: "https://picsum.photos/400/600?grayscale&random=30" },
                    { title: "Cinematic Cold", k: "5600K DAYLIGHT", desc: "Moody blue, bedroom, soft.", img: "https://picsum.photos/400/600?grayscale&random=31" },
                    { title: "Golden Hour", k: "2800K WARM", desc: "Sun flare, haze, warmth.", img: "https://picsum.photos/400/600?grayscale&random=32" },
                    { title: "B&W Noir", k: "MONOCHROME", desc: "High contrast, grain, 35mm.", img: "https://picsum.photos/400/600?grayscale&random=33" },
                ].map((item, i) => (
                    <div key={i} className="group cursor-pointer relative">
                        {/* Interactive Card */}
                        <div className="aspect-[9/16] relative overflow-hidden bg-[#111] border border-foreground/10 transition-all duration-300 group-hover:border-foreground/80">
                            {/* Dark Overlay that vanishes on hover */}
                            <div className="absolute inset-0 bg-black/60 z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>
                            
                            <img 
                                src={item.img} 
                                alt={item.title}
                                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" 
                            />

                            {/* Hover UI elements */}
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="font-mono text-[10px] text-accent mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    {item.k}
                                </div>
                                <h3 className="font-display text-xl font-bold uppercase text-white/50 group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>
                                <p className="font-mono text-xs text-foreground/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150 h-0 group-hover:h-auto overflow-hidden">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Active Indicator */}
                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-foreground/20 group-hover:bg-accent transition-colors z-20"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};