import { Badge } from "@/components/pfplanding/ui/Badge";

export const CouplesLDRAngle = () => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10 bg-black">
            {/* Left Content */}
            <div className="p-8 md:p-20 flex flex-col justify-center border-r border-foreground/10">
                <Badge className="mb-6 w-fit bg-accent border-none text-background font-mono uppercase tracking-wider rounded-none px-3 py-1">Perfect For Long Distance</Badge>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-6 leading-none">
                    Miles Apart? <br /> Not in These Photos.
                </h2>
                <p className="font-mono text-foreground/70 mb-8 leading-relaxed max-w-md">
                    You don't need to be in the same room. Our engine accepts separate photo uploads from you and your partner, then merges them into a cohesive physical scene.
                </p>

                <div className="border-l-2 border-accent pl-6 py-2">
                    <p className="font-mono text-xs text-accent font-bold mb-1 uppercase tracking-widest text-[10px]">// TECHNICAL_ADVANTAGE</p>
                    <p className="font-mono text-sm text-foreground/80">
                        Uploads are processed independently. You take yours; they take theirs. We handle the chemistry.
                    </p>
                </div>
            </div>

            {/* Right Visual */}
            <div className="relative min-h-[50vh] overflow-hidden group">
                <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative border-r border-white/10 group-hover:border-accent/50 transition-colors duration-500">
                        <img src="/dude.jpeg" className="object-cover w-full h-full opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
                        <div className="absolute bottom-4 left-4 font-mono text-[10px] bg-black/50 px-2 py-1 backdrop-blur text-white border border-white/10">
                            LOC_A: NEW YORK
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/girl.jpeg" className="object-cover w-full h-full opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 delay-100" />
                        <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
                        <div className="absolute bottom-4 left-4 font-mono text-[10px] bg-black/50 px-2 py-1 backdrop-blur text-white border border-white/10">
                            LOC_B: LONDON
                        </div>
                    </div>
                </div>

                {/* Center Merge Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black border border-accent/50 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(255,77,0,0.3)] group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>
                    <span className="font-mono text-xs text-accent">MERGE</span>
                </div>
            </div>
        </section>
    )
}
