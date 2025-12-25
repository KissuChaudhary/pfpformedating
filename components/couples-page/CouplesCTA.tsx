import Link from "next/link";
import { Button } from "@/components/pfplanding/ui/Button";

// Custom CTA component as per user request (instead of generic Pricing)
export const CouplesCTA = () => {
    return (
        <section className="py-24 px-6 border-b border-foreground/10 bg-[#0a0a0a] relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(#EBEBEB 1px, transparent 1px), linear-gradient(90deg, #EBEBEB 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            ></div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase mb-6 leading-none">
                    Capture the Chemistry. <br /> <span className="text-accent">Skip the Studio.</span>
                </h2>
                <p className="font-mono text-foreground/70 mb-10 text-lg">
                    Get 50+ aesthetic photos of you and your favorite person for less than the cost of two cocktails.
                </p>

                <Link href="/login?plan=pro_roll">
                    <Button size="lg" className="px-12 py-8 text-xl w-full sm:w-auto">
                        CREATE COUPLE PORTRAITS - $18.99
                    </Button>
                </Link>
                <div className="mt-4 font-mono text-xs text-foreground/40 uppercase tracking-widest">
                    Includes &quot;Pro Roll&quot; with 50 Frames
                </div>
            </div>
        </section>
    )
}
