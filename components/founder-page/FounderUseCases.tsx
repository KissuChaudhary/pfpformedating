
export const FounderUseCases = () => {
    const cases = [
        {
            title: "Twitter (X) Avatars",
            desc: "Stand out in the timeline with high-contrast, colorful shots that pop against dark mode.",
            icon: "🐦"
        },
        {
            title: "Podcast Cover Art",
            desc: "Get high-resolution (4K) close-ups that look professional on Spotify and Apple Podcasts.",
            icon: "🎙️"
        },
        {
            title: "Substack & Medium",
            desc: "Add personality to your writing with author photos that feel like you, not a stock photo model.",
            icon: "✍️"
        },
        {
            title: "Speaker Kits",
            desc: "Send event organizers a photo that actually looks cool on a conference slide.",
            icon: "🎤"
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 border-b border-foreground/10 bg-background text-center md:text-left">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8 leading-none sticky top-24">
                            Built for the <br /><span className="text-accent">Creator Economy.</span>
                        </h2>
                    </div>
                    <div className="md:col-span-7 grid sm:grid-cols-2 gap-8">
                        {cases.map((item, i) => (
                            <div key={i} className="p-8 border border-foreground/10 hover:border-accent/50 transition-colors bg-[#0a0a0a]">
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <h3 className="font-display text-xl font-bold uppercase mb-4">{item.title}</h3>
                                <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
