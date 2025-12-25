import { Badge } from "@/components/pfplanding/ui/Badge";

export const CouplesLDRAngle = () => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10 bg-[#080808]">
            <div className="p-8 md:p-20 flex flex-col justify-center">
                <Badge className="mb-6 w-fit bg-purple-600 border-none text-white">LDR SPECIAL FEATURE</Badge>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-6 leading-none">
                    Miles Apart? <br /> Not in These Photos.
                </h2>
                <p className="font-mono text-foreground/70 mb-8 leading-relaxed">
                    Long-distance relationships are hard. You miss having recent photos together.
                    Unrealshot bridges the gap. You upload your selfies from New York; they upload theirs from London.
                    Our AI merges them into a cohesive, realistic moment where you are finally together.
                </p>
                <div className="bg-foreground/5 p-6 border-l-2 border-purple-500">
                    <p className="font-mono text-xs text-foreground/80 font-bold mb-2">🎁 THE PERFECT GIFT</p>
                    <p className="font-mono text-xs text-foreground/60">
                        Visualize your reunion before it happens.
                    </p>
                </div>
            </div>

            <div className="relative min-h-[50vh] overflow-hidden group">
                <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative border-r border-white/10">
                        <img src="/dude.jpeg" className="object-cover w-full h-full opacity-60 grayscale" />
                        <div className="absolute bottom-4 left-4 font-mono text-xs bg-black/50 px-2 py-1 backdrop-blur text-white">
                            LOC_A: NEW YORK
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/girl.jpeg" className="object-cover w-full h-full opacity-60 grayscale" />
                        <div className="absolute bottom-4 left-4 font-mono text-xs bg-black/50 px-2 py-1 backdrop-blur text-white">
                            LOC_B: LONDON
                        </div>
                    </div>
                </div>

                {/* Center Merge Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center z-10 shadow-lg shadow-purple-900/50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M8 3L12 7L16 3"></path>
                        <path d="M8 21L12 17L16 21"></path>
                    </svg>
                </div>

                {/* Simulated Result Overlay on Hover (Optional, maybe for V2) */}
            </div>
        </section>
    )
}
