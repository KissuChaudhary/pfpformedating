
import { Badge } from "@/components/pfplanding/ui/Badge";

export const CouplesTechDiff = () => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10">
            {/* Visual (Left Side on Desktop for variety) */}
            <div className="relative min-h-[60vh] bg-black border-b md:border-b-0 md:border-r border-foreground/10 overflow-hidden flex flex-col items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>

                {/* 1. INPUTS */}
                <div className="flex gap-4 mb-4 relative z-10">
                    <div className="relative w-32 h-32 border border-foreground/10 overflow-hidden group/a">
                        <img src="/dude.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity" />
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-accent/50 animate-scan-slow"></div>
                        <div className="absolute bottom-1 left-1 font-mono text-[8px] text-accent bg-black/50 px-1 border border-accent/20">ID_A: LOCKED</div>
                    </div>
                    <div className="relative w-32 h-32 border border-foreground/10 overflow-hidden group/b">
                        <img src="/girl.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/50 animate-scan"></div>
                        <div className="absolute bottom-1 left-1 font-mono text-[8px] text-accent bg-black/50 px-1 border border-accent/20">ID_B: LOCKED</div>
                    </div>
                </div>

                {/* 2. ENGINE PROCESS */}
                <div className="flex flex-col items-center justify-center mb-4 relative z-10">
                    <div className="h-4 w-px bg-accent/20 mb-2"></div>
                    <div className="bg-black border border-accent/20 px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(255,77,0,0.2)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                        <span className="font-mono text-[9px] text-accent uppercase tracking-widest">DUAL_ENGINE™ PROCESSING</span>
                    </div>
                    <div className="h-4 w-px bg-accent/20 mt-2"></div>
                </div>

                {/* 3. RESULT */}
                <div className="relative w-full max-w-xs aspect-[4/3] border border-accent/20 p-1 bg-accent/5 z-10">
                    <div className="relative w-full h-full overflow-hidden border border-accent/10">
                        <img src="/hero-couple.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />

                        {/* Final Result Badge */}
                        <div className="absolute top-3 left-3 flex gap-2">
                            <div className="bg-accent text-black text-[9px] font-bold px-2 py-0.5 font-mono uppercase">FINAL_RENDER</div>
                            <div className="bg-black/80 text-white text-[9px] border border-white/10 px-2 py-0.5 font-mono uppercase">100% QUALITY</div>
                        </div>
                    </div>
                </div>

                {/* Background Grid connecting everything */}
                <div className="absolute inset-0 z-0 opacity-20"
                    style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                ></div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-20 flex flex-col justify-center bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs uppercase text-accent tracking-widest">Tech Specs</span>
                </div>

                <h2 className="font-display text-4xl md:text-5xl leading-[0.9] font-bold uppercase mb-8">
                    The "Dual-Identity" <br /> Engine.
                </h2>

                <p className="font-mono text-foreground/70 mb-10 leading-relaxed max-w-md">
                    Most AI generators struggle with two people—they merge faces or make you look like siblings.
                    PFPforME uses a <span className="text-white border-b border-white/20">Dual-Identity Lock™</span>. We track both bone structures separately.
                </p>

                <div className="space-y-6 pt-8 border-t border-foreground/10">
                    <div className="group">
                        <h3 className="font-display text-lg text-foreground font-bold uppercase mb-2 group-hover:text-accent transition-colors">
                            01 // Interracial Couples
                        </h3>
                        <p className="font-mono text-xs text-foreground/60 pl-4 border-l border-foreground/10">
                            We respect individual skin tones. No whitewashing or blending features.
                        </p>
                    </div>

                    <div className="group">
                        <h3 className="font-display text-lg text-foreground font-bold uppercase mb-2 group-hover:text-accent transition-colors">
                            02 // Height & Proportion
                        </h3>
                        <p className="font-mono text-xs text-foreground/60 pl-4 border-l border-foreground/10">
                            The AI understands who is taller and adjusts the pose naturally.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
