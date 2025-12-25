
export const CouplesTripodStruggle = () => {
    return (
        <section className="py-20 px-6 md:px-12 border-b border-foreground/10 bg-[#080808]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-8 leading-none">
                    Stop Asking Strangers <br />
                    <span className="text-foreground/50">To Take Your Picture.</span>
                </h2>

                <p className="font-mono text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                    We’ve all been there: setting up a phone on a rock, running into the frame, and hoping the timer works.
                    Or worse—awkwardly asking a stranger to take a photo, only to get a blurry result.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-left mt-16 border-t border-foreground/10 pt-12">
                    <div className="space-y-4">
                        <div className="text-red-500 font-mono text-xl">X</div>
                        <h3 className="font-display text-xl font-bold uppercase">No Awkward Posing</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            In public with people watching.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-red-500 font-mono text-xl">X</div>
                        <h3 className="font-display text-xl font-bold uppercase">No Expensive Photographers</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            Save the $500+ for the actual date.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-red-500 font-mono text-xl">X</div>
                        <h3 className="font-display text-xl font-bold uppercase">No &quot;Bad Angles&quot;</h3>
                        <p className="font-mono text-sm text-foreground/60">
                            Ruining the moment.
                        </p>
                    </div>
                </div>

                <div className="mt-16 bg-accent/10 border border-accent/20 p-6 rounded-none inline-block">
                    <p className="font-mono text-accent text-sm font-bold">
                        THE SOLUTION: Unrealshot is your private, digital photographer. It captures the chemistry from your couch.
                    </p>
                </div>
            </div>
        </section>
    );
};
