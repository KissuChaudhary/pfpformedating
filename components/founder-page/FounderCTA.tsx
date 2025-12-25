import Link from "next/link";
import { Button } from "@/components/pfplanding/ui/Button";

export const FounderCTA = () => {
    return (
        <section className="py-24 px-6 border-b border-foreground/10 bg-accent text-background text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-4xl sm:text-7xl font-bold uppercase mb-8 leading-[0.9]">
                    Your Work Isn&apos;t Generic. <br /> Your Photo Shouldn&apos;t Be Either.
                </h2>
                <p className="font-mono text-background/70 mb-10 text-lg font-bold">
                    Join thousands of founders, writers, and artists using Unrealshot to upgrade their digital presence.
                </p>

                <Link href="/login">
                    <Button size="lg" className="bg-background text-accent hover:bg-black/80 px-12 py-8 text-xl w-full sm:w-auto border-none">
                        GENERATE MY CREATIVE HEADSHOTS - $8.99
                    </Button>
                </Link>
                <div className="mt-4 font-mono text-xs text-background/50 uppercase tracking-widest font-bold">
                    Instant Delivery • Commercial Usage Rights
                </div>
            </div>
        </section>
    )
}
