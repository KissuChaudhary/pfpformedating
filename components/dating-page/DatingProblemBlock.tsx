
export const DatingProblemBlock = () => {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-foreground/10 bg-[#080808]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-8 leading-none">
                    The &quot;Uncanny Valley&quot; <br />
                    <span className="text-red-500">Is Killing Your Matches.</span>
                </h2>

                <p className="font-mono text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                    We’ve all seen them on Hinge: those glossy, plastic-skinned AI headshots that scream &quot;Fake Profile.&quot;
                    They don&apos;t just look bad—they make people swipe left because they don&apos;t trust you exist.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-left mt-16 border-t border-foreground/10 pt-12">
                    <div className="space-y-4">
                        <div className="text-accent font-mono text-xl">01 //</div>
                        <h3 className="font-display text-xl font-bold uppercase">Real Skin Texture</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            Pores, sweat, and natural imperfections. We don&apos;t airbrush the humanity out of you.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-accent font-mono text-xl">02 //</div>
                        <h3 className="font-display text-xl font-bold uppercase">Messy Hair</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            Wind-blown and imperfect. The opposite of a salon-fresh studio shot.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-accent font-mono text-xl">03 //</div>
                        <h3 className="font-display text-xl font-bold uppercase">Bad Lighting</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            (The Good Kind). Flash glare, low-light grain, and shadows that simulate real cameras.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
