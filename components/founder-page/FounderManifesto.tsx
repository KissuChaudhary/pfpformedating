
export const FounderManifesto = () => {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-foreground/10 bg-[#080808]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-8 leading-none">
                    The &quot;Grey Backdrop&quot; <span className="text-foreground/30">is Dead.</span>
                </h2>

                <p className="font-mono text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed text-lg">
                    Traditional AI headshot generators are trained on one thing: LinkedIn in 2010.
                    They put you in a suit, smooth your skin until you look like plastic, and place you in front of a fake office window.
                    <br /><br />
                    <strong className="text-white">If you are a writer, a builder, or a creative, that look doesn&apos;t build trust. It destroys it.</strong>
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left mt-16 border-t border-foreground/10 pt-12">
                    <div className="space-y-4 p-8 border border-foreground/10 bg-white/5">
                        <h3 className="font-display text-2xl font-bold uppercase text-accent">Texture over Smoothness</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            We keep the pores, the stubble, and the real skin details.
                        </p>
                    </div>
                    <div className="space-y-4 p-8 border border-foreground/10 bg-white/5">
                        <h3 className="font-display text-2xl font-bold uppercase text-accent">Street over Studio</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            We replace the office background with neon lights, brick walls, and city streets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
