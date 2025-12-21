import React from 'react';

export const MoatSection: React.FC = () => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10">
            {/* Manifesto / Text Side */}
            <div className="p-8 md:p-20 border-r border-foreground/10 bg-[#0a0a0a] flex flex-col justify-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none mb-2">
                    Perfection <br /> is Boring.
                </h2>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none text-foreground/50 mb-16">
                    Authenticity <br /> is Viral.
                </h2>

                {/* Comparison Logic - Replaced Cards with "Git Diff" Style Layout */}
                <div className="relative pl-6 md:pl-8 border-l border-foreground/10">

                    {/* 1. The Competitors (Deprecated) */}
                    <div className="mb-12 relative transition-opacity duration-300">
                        {/* Node Dot */}
                        <div className="absolute -left-[31px] md:-left-[39px] top-0 w-3 h-3 bg-red-900/50 border border-red-500/30 rounded-full"></div>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-red-500/50">Other AI Image Tools</span>
                            <span className="h-[1px] w-8 bg-red-500/20"></span>
                        </div>

                        <ul className="space-y-4 font-mono text-sm text-foreground/40">
                            <li className="flex items-baseline gap-3">
                                <span className="text-red-500/50">[x]</span>
                                <span className="line-through decoration-red-500/30">Plastic Skin Texture</span>
                            </li>
                            <li className="flex items-baseline gap-3">
                                <span className="text-red-500/50">[x]</span>
                                <span className="line-through decoration-red-500/30">Perfect Studio Lighting</span>
                            </li>
                            <li className="flex items-baseline gap-3">
                                <span className="text-red-500/50">[x]</span>
                                <span className="line-through decoration-red-500/30">Uncanny Valley Glare</span>
                            </li>
                        </ul>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-[31px] md:-left-[39px] top-1 w-3 h-3 bg-accent border border-accent shadow-[0_0_10px_rgba(255,77,0,0.5)] rounded-full animate-pulse"></div>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">PfpForMe Profile photo maker </span>
                            <span className="h-[1px] w-8 bg-accent/50"></span>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="font-display text-xl md:text-2xl text-foreground font-bold uppercase mb-1 flex items-center gap-2">
                                    <span className="text-accent text-sm">01 //</span> Real Texture
                                </h3>
                                <p className="font-mono text-xs text-foreground/60 pl-8 border-l border-foreground/10 ml-1">
                                    We preserve acne scars, freckles, and messy hair.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-xl md:text-2xl text-foreground font-bold uppercase mb-1 flex items-center gap-2">
                                    <span className="text-accent text-sm">02 //</span> Bad Lighting™
                                </h3>
                                <p className="font-mono text-xs text-foreground/60 pl-8 border-l border-foreground/10 ml-1">
                                    Engineered motion blur, red-eye, and harsh flash.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-display text-xl md:text-2xl text-foreground font-bold uppercase mb-1 flex items-center gap-2">
                                    <span className="text-accent text-sm">03 //</span> The Reaction
                                </h3>
                                <p className="font-mono text-xs text-foreground/60 pl-8 border-l border-foreground/10 ml-1">
                                    Friends ask "Who took this?" instead of "Which AI?"
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Visual Comparison Grid (Right Side) */}
            <div className="grid grid-cols-2 h-[50vh] md:h-auto">
                <div className="border-r border-foreground/10 relative group h-full">
                    <div className="absolute top-0 left-0 w-full p-2 text-center text-sm font-mono text-foreground/80 bg-black/50 backdrop-blur-sm z-10">// OTHERS</div>
                    <img
                        src="/comparegenericai.jpg"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        alt="Bad AI"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="font-display text-2xl md:text-4xl text-foreground/40 font-bold -rotate-12 border-4 border-foreground/20 p-4 opacity-80">PLASTIC</span>
                    </div>
                </div>
                <div className="relative group h-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-full p-2 text-center text-sm font-mono text-accent bg-black/50 backdrop-blur-sm z-10 font-bold tracking-wider">// UNREALSHOT AI</div>
                    <img
                        src="/comparepfpforme.png"
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-80 group-hover:brightness-100 transition-all duration-700 ease-out"
                        alt="Our AI"
                    />
                    {/* Flash overlay element */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 mix-blend-overlay transition-all duration-100 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};