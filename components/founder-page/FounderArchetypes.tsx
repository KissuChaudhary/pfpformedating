import { Badge } from "@/components/pfplanding/ui/Badge";

export const FounderArchetypes = () => {
    const archetypes = [
        {
            title: "The \"Builder in Public\"",
            mode: "Flash Mode",
            vibe: "High energy, chaotic, raw, late-night coding sessions.",
            look: "Direct camera flash, high contrast, messy hair, \"caught in the moment.\"",
            bestFor: "Twitter/X profile pics and \"Ship It\" announcements.",
            image: "/hero3.png" // Placeholder
        },
        {
            title: "The \"Thought Leader\"",
            mode: "Gritty Mode",
            vibe: "Stoic, serious, timeless, high-signal.",
            look: "Black & white street photography, high grain, intense eye contact.",
            bestFor: "Substack headers, Podcast artwork, and manifesto posts.",
            image: "/candid-solo.png" // Placeholder
        },
        {
            title: "The \"Visionary\"",
            mode: "Cine Mode",
            vibe: "Cinematic, futuristic, moody.",
            look: "Colorful lighting (neon/street), shallow depth of field, atmospheric.",
            bestFor: "Personal websites and press kits.",
            image: "/hero2.png" // Placeholder
        }
    ];

    return (
        <section className="py-24 border-b border-foreground/10">
            <div className="container mx-auto px-6 md:px-12 mb-16">
                <Badge className="mb-6 w-fit">YOUR PERSONA</Badge>
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">
                    Define Your <br /> Internet Archetype.
                </h2>
            </div>

            <div className="flex flex-col md:flex-row border-y border-foreground/10">
                {archetypes.map((item, i) => (
                    <div key={i} className="flex-1 group border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0 relative min-h-[700px] overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>

                        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                            <div className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
                                {item.mode}
                            </div>
                            <h3 className="font-display text-3xl font-bold uppercase mb-6 text-white leading-none">
                                {item.title}
                            </h3>

                            <div className="space-y-4 border-t border-white/20 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <div>
                                    <span className="font-mono text-[10px] text-white/50 uppercase block mb-1">VIBE</span>
                                    <p className="font-mono text-sm text-white">{item.vibe}</p>
                                </div>
                                <div>
                                    <span className="font-mono text-[10px] text-white/50 uppercase block mb-1">THE LOOK</span>
                                    <p className="font-mono text-sm text-white">{item.look}</p>
                                </div>
                                <div>
                                    <span className="font-mono text-[10px] text-white/50 uppercase block mb-1">BEST FOR</span>
                                    <p className="font-mono text-sm text-accent font-bold">{item.bestFor}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
