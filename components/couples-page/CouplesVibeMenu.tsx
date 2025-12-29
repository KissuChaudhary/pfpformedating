
export const CouplesVibeMenu = () => {
    const vibes = [
        {
            title: "The \"Hard Launch\"",
            mode: "Flash Mode",
            vibe: "Late-night diner dates, blurry elevator selfies, and street flash photography.",
            useCase: "Instagram Stories and \"Soft Launch\" photo dumps.",
            image: "/hero3.png" // Placeholder
        },
        {
            title: "The \"Dream Vacation\"",
            mode: "Golden Hour",
            vibe: "Sunsets in Santorini, walks in Paris, or hiking in the Alps.",
            useCase: "Travel goals (even if you haven't bought the tickets yet).",
            image: "/hero2.png" // Placeholder
        },
        {
            title: "The \"Cozy Sunday\"",
            mode: "Cine Mode",
            vibe: "Cooking together, coffee in bed, or movie marathons.",
            useCase: "Wallpapers and intimate anniversary posts.",
            image: "/candid-solo.png" // Placeholder
        }
    ];

    return (
        <section className="border-b border-foreground/10 bg-black">
            {/* Header Block - Full Width */}
            <div className="p-8 md:p-12 border-b border-foreground/10 flex flex-col md:flex-row justify-between items-end gap-6">
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-none">
                    Pick Your <br /> <span className="text-transparent stroke-text">Aesthetic</span>.
                </h2>
                <div className="font-mono text-xs text-foreground/40 max-w-xs text-right hidden md:block">
                     // VIBE_CHECK: INIT<br />
                     // SELECT_MODE: ACTIVE
                </div>
            </div>

            <div className="grid md:grid-cols-3">
                {vibes.map((item, i) => (
                    <div key={i} className="group border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0 relative min-h-[600px] flex flex-col justify-end overflow-hidden cursor-crosshair">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                        {/* Hover Overlay Flash */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-100 pointer-events-none"></div>

                        <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="font-mono text-accent text-xs uppercase tracking-widest mb-2 border-l-2 border-accent pl-2">
                                {item.mode}
                            </div>
                            <h3 className="font-display text-3xl font-bold uppercase mb-4 text-white leading-none">
                                {item.title}
                            </h3>
                            <p className="font-mono text-sm text-foreground/70 mb-6 h-12 border-l border-white/10 pl-4 ml-1">
                                {item.vibe}
                            </p>

                            <div className="font-mono text-[10px] text-foreground/40 uppercase pt-4 border-t border-white/10 flex justify-between items-center group-hover:text-white transition-colors">
                                <span>USE_CASE: {item.useCase}</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
