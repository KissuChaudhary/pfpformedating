
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
        <section className="py-20 border-b border-foreground/10">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="font-display text-4xl font-bold uppercase mb-16 text-center">How to Create an AI Couple Photoshoot</h2>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group">
                            <div className="font-mono text-6xl font-bold text-foreground/5 absolute -top-10 -left-6 z-0 group-hover:text-accent/10 transition-colors">
                                0{i + 1}
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-display text-xl font-bold uppercase mb-4">{step.title}</h3>
                                <p className="font-mono text-sm text-foreground/60">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
