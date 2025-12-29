
export const CouplesTripodStruggle = () => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10 bg-black">
            {/* Left Content */}
            <div className="p-8 md:p-20 border-r border-foreground/10 flex flex-col justify-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none mb-2">
                    Stop Asking <br /> Strangers.
                </h2>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none text-foreground/50 mb-12">
                    Start Being <br /> In The Moment.
                </h2>

                <div className="relative pl-6 md:pl-8 border-l border-foreground/10">
                    <div className="absolute -left-[31px] md:-left-[39px] top-0 w-3 h-3 bg-red-900/50 border border-red-500/30 rounded-full"></div>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-red-500/50">The Old Way</span>
                        <span className="h-[1px] w-8 bg-red-500/20"></span>
                    </div>

                    <ul className="space-y-6">
                        <li>
                            <h3 className="font-display text-xl text-foreground font-bold uppercase mb-1 flex items-center gap-2">
                                <span className="text-red-500 text-sm">[x]</span> Awkward Posing
                            </h3>
                            <p className="font-mono text-xs text-foreground/60 pl-6">
                                Trying to look natural while 50 tourists watch you.
                            </p>
                        </li>
                        <li>
                            <h3 className="font-display text-xl text-foreground font-bold uppercase mb-1 flex items-center gap-2">
                                <span className="text-red-500 text-sm">[x]</span> "Bad Angle" Fights
                            </h3>
                            <p className="font-mono text-xs text-foreground/60 pl-6">
                                Nothing ruins a date faster than taking the same photo 40 times.
                            </p>
                        </li>
                        <li>
                            <h3 className="font-display text-xl text-foreground font-bold uppercase mb-1 flex items-center gap-2">
                                <span className="text-red-500 text-sm">[x]</span> Expensive Photographers
                            </h3>
                            <p className="font-mono text-xs text-foreground/60 pl-6">
                                Save the $500. Spend it on a better dinner.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Visuals */}
            <div className="relative min-h-[50vh] bg-[#080808] flex items-center justify-center border-b md:border-b-0 border-foreground/10 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

                <div className="relative z-10 text-center max-w-sm p-6 border border-foreground/10 bg-black/50 backdrop-blur-sm">
                    <div className="font-mono text-xs text-accent mb-2 uppercase tracking-widest border-b border-foreground/10 pb-2">
                        // UNREALSHOT SOLUTION
                    </div>
                    <p className="font-display text-2xl uppercase font-bold leading-tight mb-4">
                        We capture the chemistry from your couch.
                    </p>
                    <p className="font-mono text-xs text-foreground/60">
                        Upload your selfies. We generate the date night photos you wish you took.
                    </p>
                </div>
            </div>
        </section>
    );
};
