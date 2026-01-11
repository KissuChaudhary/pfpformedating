
export const FounderManifesto = () => {
    return (
        <section className="relative border-b border-foreground/10 bg-[#080808]">
            <div className="md:grid md:grid-cols-2 min-h-[600px]">
                {/* Left Column: The Statement */}
                <div className="relative p-8 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-foreground/10">


                    <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
                        The Suit <br />
                        is a <span className="text-transparent stroke-text">Costume.</span>
                    </h2>

                    <p className="font-mono text-foreground/70 text-sm md:text-base leading-relaxed max-w-md">
                        Investors don&apos;t buy the suit. They buy the builder.
                        <br /><br />
                        Traditional headshots look like they were made for LinkedIn in 2010. We built an engine for the rest of us.
                    </p>
                </div>

                {/* Right Column: The "Git Diff" Evidence */}
                <div className="relative bg-[#050505] p-8 md:p-20 flex flex-col justify-center">
                    <div className="absolute top-6 right-6 md:top-10 md:right-10 font-mono text-[10px] text-foreground/20 uppercase tracking-widest text-right">
                        // DIFF_CHECK
                    </div>

                    <div className="space-y-8 font-mono">
                        {/* Item 1 */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                <span className="text-red-500 text-xs">[ - ]</span>
                                <span className="text-red-500 line-through decoration-red-500/50 text-sm md:text-lg">SMOOTH SKIN TEXTURE</span>
                            </div>
                            <div className="flex items-center gap-4 pl-8 border-l border-accent/20">
                                <span className="text-accent text-xs">[ + ]</span>
                                <span className="text-white font-bold text-lg md:text-2xl uppercase tracking-tighter">SCARS & PORES</span>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                <span className="text-red-500 text-xs">[ - ]</span>
                                <span className="text-red-500 line-through decoration-red-500/50 text-sm md:text-lg">OFFICE BACKDROP</span>
                            </div>
                            <div className="flex items-center gap-4 pl-8 border-l border-accent/20">
                                <span className="text-accent text-xs">[ + ]</span>
                                <span className="text-white font-bold text-lg md:text-2xl uppercase tracking-tighter">BRICK & FILM GRAIN</span>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                <span className="text-red-500 text-xs">[ - ]</span>
                                <span className="text-red-500 line-through decoration-red-500/50 text-sm md:text-lg">FAKE SMILE</span>
                            </div>
                            <div className="flex items-center gap-4 pl-8 border-l border-accent/20">
                                <span className="text-accent text-xs">[ + ]</span>
                                <span className="text-white font-bold text-lg md:text-2xl uppercase tracking-tighter">DEADPAN STARE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
