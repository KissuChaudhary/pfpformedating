
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
        <section className="py-20 border-b border-foreground/10">
            <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
                    Pick Your <br /> <span className="text-accent">Date Night Aesthetic.</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-3 border-t border-foreground/10">
                {vibes.map((item, i) => (
                    <div key={i} className="group border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0 relative min-h-[600px] flex flex-col justify-end overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

                        <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="font-mono text-accent text-xs uppercase tracking-widest mb-2 border-l-2 border-accent pl-2">
                                {item.mode}
                            </div>
                            <h3 className="font-display text-2xl font-bold uppercase mb-4 text-white">
                                {item.title}
                            </h3>
                            <p className="font-mono text-sm text-foreground/80 mb-4 h-12">
                                {item.vibe}
                            </p>
                            <div className="font-mono text-[10px] text-foreground/50 uppercase border-t border-white/10 pt-4 mt-4">
                                BEST FOR: {item.useCase}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
