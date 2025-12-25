import type React from "react"
import { Button } from "./ui/Button"
import Link from "next/link"

interface UseCaseHeroProps {
    headline: React.ReactNode
    subheadline?: string
    hook: string
    badgeText?: string
    image1: string
    image2: string
    ctaText?: string
    ctaLink?: string
}

export const UseCaseHero: React.FC<UseCaseHeroProps> = ({
    headline,
    subheadline,
    hook,
    badgeText = "// DESIGNED FOR REALISM",
    image1,
    image2,
    ctaText = "Create Your Photos ($8.99)",
    ctaLink = "/login"
}) => {
    return (
        <section className="relative min-h-screen flex flex-col md:grid md:grid-cols-12 border-b border-foreground/10">
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col justify-center p-6 md:p-12 lg:p-20 border-r border-foreground/10 relative">
                <div className="mb-6 font-mono text-xs text-foreground/40">
                    {badgeText}
                </div>

                <h1 className="font-display text-4xl sm:text-7xl font-bold leading-[0.9] tracking-tighter uppercase mb-8">
                    {headline}
                </h1>

                {subheadline && (
                    <h2 className="font-mono text-xl text-accent mb-6 font-bold uppercase">
                        {subheadline}
                    </h2>
                )}

                <p className="font-mono text-foreground/70 text-sm md:text-base max-w-xl mb-12 leading-relaxed whitespace-pre-line">
                    {hook}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Link href={ctaLink}>
                        <Button size="lg" className="w-full sm:w-auto">
                            {ctaText}
                        </Button>
                    </Link>

                    <span className="font-mono text-xs text-foreground/40 sm:max-w-[200px] max-w-full">
                        [!] No plastic skin. No fake smiles. 100% Aesthetic.
                    </span>
                </div>
            </div>

            {/* Right Visuals */}
            <div className="md:col-span-5 relative bg-[#050505] overflow-hidden group border-t md:border-t-0 border-foreground/10 aspect-[2/3] md:aspect-auto md:h-auto">
                <div className="absolute inset-0 grid grid-rows-2">
                    {/* Image 1 */}
                    <div className="relative overflow-hidden border-b border-foreground/10 h-full w-full">
                        <img
                            src={image1}
                            alt="UseCase Image 1"
                            className="w-full h-full object-cover opacity-90 hover:grayscale-100 hover:opacity-100 transition-all duration-100 ease-linear cursor-none"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-foreground/20 px-2 py-1 text-[10px] font-mono uppercase">
             // 35mm film, high grain shot
                        </div>
                    </div>

                    {/* Image 2 */}
                    <div className="relative overflow-hidden h-full w-full">
                        <img
                            src={image2}
                            alt="UseCase Image 2"
                            className="w-full h-full object-cover opacity-90 hover:grayscale-100 hover:opacity-100 transition-all duration-100 ease-linear cursor-none"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-foreground/20 px-2 py-1 text-[10px] font-mono uppercase">
             // raw mode, high shutter speed
                        </div>
                    </div>
                </div>

                {/* Center label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest rotate-90 md:rotate-0 z-10 pointer-events-none mix-blend-hard-light">
                    AI GENERATED
                </div>
            </div>
        </section>
    )
}
