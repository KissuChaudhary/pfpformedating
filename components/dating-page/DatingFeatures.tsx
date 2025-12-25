import { Badge } from "@/components/pfplanding/ui/Badge";

export const DatingFeatures = () => {
    return (
        <section className="border-b border-foreground/10">
            {/* Feature 1: Golden Hour */}
            <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-foreground/10">
                    <Badge className="mb-6 w-fit">MODE 01 // SUNDAY MORNING</Badge>
                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4">
                        The &quot;Wholesome&quot; Pic.
                    </h3>
                    <p className="font-mono text-foreground/60 mb-8 leading-relaxed">
                        Use our Golden Hour Mode to create warm, sun-drenched photos that look like they were taken during a coffee run or a beach walk.
                        Soft lighting makes you look approachable, trustworthy, and glowing.
                    </p>
                    <div className="font-mono text-xs bg-foreground/5 p-4 border-l-2 border-accent text-foreground/70">
                        PROMPT EXAMPLE: &quot;Laughing at a brunch table, holding an iced coffee, sun hitting the face.&quot;
                    </div>
                </div>
                <div className="h-[50vh] md:h-auto overflow-hidden relative group">
                    <img src="/hinge.png" alt="Golden Hour Mode" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                        <span className="font-display text-white text-2xl uppercase">Golden Hour Mode</span>
                    </div>
                </div>
            </div>

            {/* Feature 2: Cine Mode */}
            <div className="grid md:grid-cols-2">
                <div className="h-[50vh] md:h-auto overflow-hidden relative group md:order-1">
                    <img src="/hero2.png" alt="Cine Mode" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                        <span className="font-display text-white text-2xl uppercase">Cine Mode</span>
                    </div>
                </div>
                <div className="p-8 md:p-20 flex flex-col justify-center border-t md:border-t-0 md:border-l border-foreground/10 md:order-2">
                    <Badge className="mb-6 w-fit">MODE 02 // FRIDAY NIGHT</Badge>
                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4">
                        The &quot;Mysterious&quot; Pic.
                    </h3>
                    <p className="font-mono text-foreground/60 mb-8 leading-relaxed">
                        Dating profiles need variety. Switch to Cine Mode for low-light, neon-soaked shots in bars, concerts, or city streets.
                        Show that you have a social life without needing a cameraman to follow you around.
                    </p>
                    <div className="font-mono text-xs bg-foreground/5 p-4 border-l-2 border-accent text-foreground/70">
                        PROMPT EXAMPLE: &quot;Leaning against a bar counter, neon sign in background, candid smirk.&quot;
                    </div>
                </div>
            </div>
        </section>
    );
};
