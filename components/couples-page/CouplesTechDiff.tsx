import { Badge } from "@/components/pfplanding/ui/Badge";

export const CouplesTechDiff = () => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10">
            {/* Visual */}
            <div className="relative min-h-[50vh] bg-[#0c0c0c] border-b md:border-b-0 md:border-r border-foreground/10 overflow-hidden flex items-center justify-center p-8">
                {/* Abstract representation of two faces being analyzed */}
                <div className="relative w-full max-w-sm aspect-square border border-foreground/20 p-4">
                    <div className="absolute top-0 left-0 w-full h-px bg-accent/50 animate-scan"></div>
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="bg-foreground/5 border border-foreground/10 flex flex-col items-center justify-center relative overflow-hidden">
                            <img src="/dude.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
                            <div className="z-10 bg-black/80 px-2 py-1 text-[10px] font-mono border border-white/20">ID_A: MATCH</div>
                        </div>
                        <div className="bg-foreground/5 border border-foreground/10 flex flex-col items-center justify-center relative overflow-hidden">
                            <img src="/girl.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
                            <div className="z-10 bg-black/80 px-2 py-1 text-[10px] font-mono border border-white/20">ID_B: MATCH</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-20 flex flex-col justify-center">
                <Badge className="mb-6 w-fit bg-blue-600 text-white border-none">TECH DIFFERENCE</Badge>
                <h2 className="font-display text-4xl leading-[0.9] font-bold uppercase mb-6">
                    The &quot;Dual-Identity&quot; Engine.
                </h2>
                <p className="font-mono text-foreground/70 mb-8 leading-relaxed">
                    Most AI generators struggle with two people—they merge faces or make you look like siblings.
                    Unrealshot uses a <strong>Dual-Identity Lock™</strong>. We track both bone structures separately, ensuring
                    <em> you look like you</em> and <em>they look like them</em>.
                </p>

                <ul className="space-y-4 font-mono text-sm">
                    <li className="flex gap-3">
                        <span className="text-green-500">✅</span>
                        <span className="text-foreground/80"><strong>Interracial/Mixed Couples:</strong> We respect individual skin tones and features perfectly.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-green-500">✅</span>
                        <span className="text-foreground/80"><strong>Height & Proportion:</strong> The AI understands who is taller and adjusts the pose naturally.</span>
                    </li>
                </ul>
            </div>
        </section>
    )
}
