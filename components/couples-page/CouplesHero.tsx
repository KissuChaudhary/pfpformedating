import Link from "next/link";
import { Button } from "@/components/pfplanding/ui/Button";

export const CouplesHero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col md:grid md:grid-cols-12 border-b border-foreground/10">
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col justify-center p-6 md:p-12 lg:p-20 border-r border-foreground/10 relative z-10 bg-background/95 backdrop-blur-sm md:bg-transparent">
                <div className="mb-6 font-mono text-xs text-accent uppercase tracking-widest">
          // NO PHOTOGRAPHER NEEDED
                </div>

                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter uppercase mb-6">
                    Generate Cute <br />
                    <span className="text-transparent stroke-text">Couple Photos</span> <br />
                    Without a Photographer.
                </h1>

                <p className="font-mono text-foreground/70 text-sm md:text-base max-w-xl mb-10 leading-relaxed">
                    The only &quot;Third Wheel&quot; you need is our AI. Upload photos of you and your partner to get aesthetic, romantic, and hyper-realistic shots—perfect for your hard launch or anniversary.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Link href="/login">
                        <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                            START OUR PHOTOSHOOT
                        </Button>
                    </Link>

                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            Supports 2 Distinct Faces
                        </span>
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            50+ Photos Included
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Visuals */}
            <div className="md:col-span-5 relative h-[50vh] md:h-auto overflow-hidden bg-[#050505] group">
                <img
                    src="/hero-couple.png"
                    alt="AI Generated Couple Photo"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur border border-white/10 px-4 py-2">
                    <div className="font-mono text-xs text-accent mb-1 border-b border-white/10 pb-1">DUAL-IDENTITY ENGINE</div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-mono text-[10px] text-white">SUBJECT A: LOCK</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-mono text-[10px] text-white">SUBJECT B: LOCK</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
