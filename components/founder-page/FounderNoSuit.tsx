
export const FounderNoSuit = () => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10">
            <div className="p-8 md:p-20 flex flex-col justify-center bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-foreground/10">
                <h2 className="font-display text-4xl leading-[0.9] font-bold uppercase mb-6">
                    Wear What You <span className="text-foreground/50">Actually Work In.</span>
                </h2>
                <p className="font-mono text-foreground/70 mb-8 leading-relaxed max-w-md">
                    Don&apos;t own a blazer? Good. <br />
                    Our AI creates outfits that match the creative lifestyle. You pick the vibe, we generate the fit.
                </p>

                <ul className="space-y-4 font-mono text-sm">
                    <li className="flex items-center gap-3">
                        <span className="w-12 h-12 flex items-center justify-center border border-foreground/10 rounded-full bg-white/5">🧥</span>
                        <div>
                            <strong className="block text-white uppercase">Leather Jackets & Denim</strong>
                            <span className="text-foreground/60">For the gritty, street-smart look.</span>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-12 h-12 flex items-center justify-center border border-foreground/10 rounded-full bg-white/5">👕</span>
                        <div>
                            <strong className="block text-white uppercase">Hoodies & Tees</strong>
                            <span className="text-foreground/60">For the tech founder vibe.</span>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-12 h-12 flex items-center justify-center border border-foreground/10 rounded-full bg-white/5">🧣</span>
                        <div>
                            <strong className="block text-white uppercase">Turtlenecks</strong>
                            <span className="text-foreground/60">For the design minimalist.</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="relative min-h-[50vh] bg-[#111] grid grid-cols-2">
                <img src="/hero2.png" className="w-full h-full object-cover opacity-70 border-r border-white/5" />
                <img src="/hero3.png" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <p className="font-mono text-xs text-center text-white/50 uppercase tracking-widest">
                        AI-GENERATED WARDROBE
                    </p>
                </div>
            </div>
        </section>
    )
}
