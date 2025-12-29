
export const CouplesHowItWorks = () => {
    const steps = [
        {
            title: "Select Couple Mode",
            desc: "Choose the dual-subject workflow in your dashboard."
        },
        {
            title: "Upload Separately",
            desc: "Upload 5-10 clear selfies of Partner A, and 5-10 of Partner B."
        },
        {
            title: "Define the Scene",
            desc: "Choose \"Date Night,\" \"Travel,\" or \"Casual Home.\""
        },
        {
            title: "Download",
            desc: "Get 50+ high-res photos delivered in <30 minutes."
        }
    ];

    return (
        <section className="border-b border-foreground/10 bg-black">
            <div className="grid md:grid-cols-12 min-h-[40vh]">
                {/* Header */}
                <div className="md:col-span-4 p-8 md:p-12 border-r border-foreground/10 flex flex-col justify-center bg-[#0a0a0a]">
                    <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none mb-6">
                        How It <br /> Works.
                    </h2>
                    <p className="font-mono text-foreground/60 text-sm">
                        Create your photoshoot in 4 simple steps. <br /> No camera required.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="md:col-span-8 grid md:grid-cols-2">
                    {steps.map((step, i) => (
                        <div key={i} className="p-8 border-b md:border-b-0 border-foreground/10 md:even:border-l relative group hover:bg-foreground/5 transition-colors">
                            <div className="font-mono text-5xl font-bold text-foreground/10 absolute top-4 right-4 group-hover:text-accent/20 transition-colors">
                                0{i + 1}
                            </div>

                            <div className="relative z-10 pt-8">
                                <h3 className="font-display text-xl font-bold uppercase mb-2">{step.title}</h3>
                                <p className="font-mono text-xs text-foreground/60 h-10 border-l border-foreground/10 pl-3">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
