import Link from "next/link";
import { Button } from "@/components/pfplanding/ui/Button";

export const DatingHero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col md:grid md:grid-cols-12 border-b border-foreground/10">
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col justify-center p-6 md:p-12 lg:p-20 border-r border-foreground/10 relative z-10 bg-background/95 backdrop-blur-sm md:bg-transparent">
                <div className="mb-6 font-mono text-xs text-accent uppercase tracking-widest">
          // DATE SMARTER NOT HARDER
                </div>

                <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[0.9] tracking-tighter uppercase mb-6">
                    The Best AI Photos for <span className="text-transparent stroke-text">Hinge & Tinder</span> <br />
                    <span className="text-2xl sm:text-4xl block mt-2 text-foreground/80 lowercase tracking-normal font-sans">(That Actually Get Matches)</span>
                </h1>

                <p className="font-mono text-foreground/70 text-sm md:text-base max-w-xl mb-10 leading-relaxed">
                    Dating apps are allergic to &quot;LinkedIn energy.&quot; Stop using stiff headshots.
                    Use PFPforME to generate candid, messy, &quot;friend-took-this&quot; photos that pass the vibe check.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Link href="/login">
                        <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                            GENERATE MY DATING PROFILE
                        </Button>
                    </Link>

                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            9:16 Vertical Photos
                        </span>
                        <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                            100% Candid Look
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Visuals - 9:16 Focus */}
            <div className="md:col-span-5 relative h-[50vh] md:h-auto overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 grid grid-cols-2">
                    <div className="border-r border-foreground/10 relative group">
                        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-2 py-1 text-[10px] font-mono text-accent border border-accent/20">
                    // BEFORE: STIFF
                        </div>
                        <img
                            src="/hero3.png"
                            alt="Stiff AI Photo"
                            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div className="relative group">
                        <div className="absolute top-4 left-4 z-10 bg-accent text-background px-2 py-1 text-[10px] font-bold font-mono">
                    // AFTER: CANDID
                        </div>
                        <img
                            src="/candid-solo.png"
                            alt="Candid PFPforME Photo"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent opacity-80"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
