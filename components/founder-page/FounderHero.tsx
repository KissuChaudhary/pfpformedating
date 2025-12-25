import Link from "next/link";
import { Button } from "@/components/pfplanding/ui/Button";

export const FounderHero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col md:grid md:grid-cols-12 border-b border-foreground/10 bg-background">
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col justify-center p-6 md:p-12 lg:p-20 border-r border-foreground/10 relative z-10">
                <div className="mb-6 font-mono text-xs text-accent uppercase tracking-widest">
          // FOR FOUNDERS & CREATIVES
                </div>

                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter uppercase mb-6">
                    Non-Corporate <br />
                    Headshots for <br />
                    <span className="text-transparent stroke-text">Founders & Creatives.</span>
                </h1>

                <div className="font-mono text-xl text-accent mb-8 font-bold uppercase">
                    Stop looking like a banker.
                </div>

                <p className="font-mono text-foreground/70 text-sm md:text-base max-w-xl mb-10 leading-relaxed">
                    Your profile picture should have as much personality as your work. Get gritty, flash-lit, or cinematic headshots perfect for your Twitter, Substack, or Portfolio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Link href="/login">
                        <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                            UPGRADE MY PERSONAL BRAND
                        </Button>
                    </Link>

                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            No Suits Required
                        </span>
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            100% Candid Vibes
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Visuals - Grid of "Anti-Corporate" shots */}
            <div className="md:col-span-5 relative h-[50vh] md:h-auto bg-[#050505] grid grid-cols-2 grid-rows-2">
                <div className="relative border-r border-b border-white/10 group overflow-hidden">
                    <img src="/hero3.png" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" alt="Creative Headshot 1" />
                    <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white bg-black/50 px-1">FLASH_MODE</div>
                </div>
                <div className="relative border-b border-white/10 group overflow-hidden">
                    <img src="/candid-solo.png" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="Creative Headshot 2" />
                    <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white bg-black/50 px-1">GRITTY_MODE</div>
                </div>
                <div className="relative border-r border-white/10 group overflow-hidden">
                    <img src="/hero2.png" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="Creative Headshot 3" />
                    <div className="absolute bottom-2 left-2 font-mono text-[9px] text-white bg-black/50 px-1">CINE_MODE</div>
                </div>
                {/* Manifest Text Block */}
                <div className="relative bg-accent flex items-center justify-center p-4">
                    <div className="text-center">
                        <span className="block font-display text-4xl font-bold text-black uppercase leading-none">NO</span>
                        <span className="block font-display text-4xl font-bold text-black uppercase leading-none">MORE</span>
                        <span className="block font-display text-4xl font-bold text-black uppercase leading-none">SUITS</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
