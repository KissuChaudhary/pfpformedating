import React from 'react';

export const ConsistencySection: React.FC = () => {
    return (
        <section className="py-24 border-b border-foreground/10 bg-[#050505] relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#EBEBEB 1px, transparent 1px), linear-gradient(90deg, #EBEBEB 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4 leading-none">
                            The Algorithm <span className="text-accent">Isn't Rigged.</span>
                        </h2>
                        <p className="font-mono text-foreground/60 max-w-xl text-sm md:text-base">
                            You aren't "shadowbanned." You're just using photos that scream "boring" and "low effort." We replace the 3 biggest red flags in your profile with green flags that make them stop scrolling.
                        </p>
                    </div>
                    <div className="font-mono text-[10px] md:text-xs text-accent text-right">
                        PROBLEM: NO_MATCHES <br />
                        SOLUTION: BETTER_DATA
                    </div>
                </div>

                {/* The Matrix Grid */}
                <div className="relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent/30 hidden md:block z-20"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { 
                                title: 'PROBLEM: "HE LOOKS TRY-HARD"', 
                                desc: 'Fix: Candid shots that look effortless & fun.',
                                img: '/images/candid-solo.webp' 
                            },
                            { 
                                title: 'PROBLEM: "JUST HEADSHOTS?"', 
                                desc: 'Fix: Full body shots that show confidence.',
                                img: '/images/full-body-photo.webp' 
                            },
                            { 
                                title: 'PROBLEM: "BLURRY SELFIES"', 
                                desc: 'Fix: High-status photos that command respect.',
                                img: '/images/cinematic-photo.webp' 
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden border border-foreground/10 bg-black">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                                    />

                                    {/* Face Mesh Overlay */}
                                    <div className="absolute top-[20%] left-[25%] w-[50%] h-[30%] border border-accent/60 opacity-0 group-hover:opacity-80 z-30 flex flex-col justify-between p-1 transition-opacity duration-300">
                                        <div className="flex justify-between">
                                            <div className="w-1 h-1 bg-accent"></div>
                                            <div className="w-1 h-1 bg-accent"></div>
                                        </div>

                                        {/* Center Target */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-accent/40 rounded-full flex items-center justify-center">
                                            <div className="w-0.5 h-0.5 bg-accent"></div>
                                        </div>

                                        <div className="flex justify-between">
                                            <div className="w-1 h-1 bg-accent"></div>
                                            <div className="w-1 h-1 bg-accent"></div>
                                        </div>
                                    </div>

                                    {/* Scanning line animation - Only on Hover now to be less distracting but still techy */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] z-30 shadow-[0_0_10px_rgba(255,77,0,0.5)] transition-opacity"></div>
                                </div>

                                {/* Meta Label */}
                                <div className="mt-4 border-l-2 border-accent pl-3">
                                    <div className="font-mono text-[10px] text-accent/70 uppercase tracking-widest mb-1">
                                        {item.title}
                                    </div>
                                    <div className="font-display text-lg font-bold text-foreground leading-none">
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
            @keyframes scan {
                0% { top: 10%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 90%; opacity: 0; }
            }
        `}</style>
        </section>
    );
};