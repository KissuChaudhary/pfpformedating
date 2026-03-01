
export const DatingTechSpecs = () => {
    return (
        <section className="py-20 border-b border-foreground/10 bg-background text-center md:text-left">
            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="mb-6 font-mono text-xs text-accent uppercase tracking-widest">
                        TECH SPECS // FORMAT_OPTIMIZED
                    </div>
                    <h2 className="font-display text-4xl font-bold uppercase mb-6">
                        Built for the Feed <br /> (9:16 Vertical)
                    </h2>
                    <p className="font-mono text-foreground/70 mb-8 leading-relaxed max-w-md">
                        Most AI generators give you square images that look awkward when cropped.
                        PFPforME generates native Vertical (9:16) full-body shots.
                    </p>

                    <ul className="space-y-4 font-mono text-sm text-foreground/60">
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                            Show Your Style: Don&apos;t be a floating head. Show your outfits and fits.
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <span className="w-2 h-2 bg-accent rounded-full"></span>
                            Context Matters: We build the entire environment—cafe, street, park.
                        </li>
                    </ul>
                </div>

                {/* Visual Representation of 9:16 vs Square */}
                <div className="relative aspect-video bg-[#0a0a0a] border border-foreground/10 flex items-center justify-center p-8">
                    <div className="flex gap-4 h-full items-center">
                        <div className="aspect-[9/16] h-48 sm:h-64 bg-accent/20 border-2 border-accent flex flex-col items-center justify-center relative">
                            <span className="font-mono text-accent text-xs font-bold mb-2">9:16</span>
                            <span className="font-display text-foreground uppercase text-lg">PFPforME</span>
                        </div>
                        <div className="aspect-square h-32 sm:h-40 bg-foreground/5 border border-foreground/20 flex flex-col items-center justify-center grayscale opacity-50">
                            <span className="font-mono text-foreground/40 text-xs mb-2">1:1</span>
                            <span className="font-display text-foreground/40 uppercase text-sm">Others</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
