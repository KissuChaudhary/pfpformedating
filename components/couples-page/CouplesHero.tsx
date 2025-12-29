import Link from "next/link";
import { Button } from "@/components/pfplanding/ui/Button";

export const CouplesHero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col md:grid md:grid-cols-12 border-b border-foreground/10 bg-black">
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col justify-center p-6 md:p-12 lg:p-20 border-r border-foreground/10 relative z-10">
                <div className="mb-6 font-mono text-xs text-foreground/40 uppercase tracking-widest">
          // NO PHOTOGRAPHER NEEDED
                </div>

                <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tighter uppercase mb-8">
                    Generate Cute <br />
                    <span className="text-transparent stroke-text">Couple Photos</span>.
                </h1>

                <p className="font-mono text-foreground/70 text-sm md:text-base max-w-xl mb-10 leading-relaxed">
                    The only &quot;Third Wheel&quot; you need is our AI. Upload photos of you and your partner to get aesthetic, romantic, and hyper-realistic shots—perfect for your hard launch or anniversary.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Link href="/login?mode=couple">
                        <Button size="lg" className="w-full sm:w-auto">
                            Start Photoshoot ($14.99)
                        </Button>
                    </Link>

                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            [!] Supports 2 Distinct Faces
                        </span>
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            [!] 50+ Photos Included
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Visuals */}
            <div className="md:col-span-5 relative h-[50vh] md:h-auto overflow-hidden bg-[#050505] group border-t md:border-t-0 border-foreground/10">
                <div className="absolute inset-0">
                    <img
                        src="/hero-couple.png"
                        alt="AI Generated Couple Photo"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                </div>

                {/* Technical Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-foreground/20 px-4 py-3">
                    <div className="flex justify-between items-center mb-2 border-b border-foreground/20 pb-2">
                        <div className="font-mono text-[10px] text-accent">DUAL-IDENTITY ENGINE™</div>
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-foreground/60">SUBJECT A</span>
                            <span className="font-mono text-[10px] text-accent">LOCKED</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-foreground/60">SUBJECT B</span>
                            <span className="font-mono text-[10px] text-accent">LOCKED</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
