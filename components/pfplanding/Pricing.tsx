import type React from "react"
import { Button } from "./ui/Button"
import Link from "next/link"

const plans = [
    {
        name: "STANDARD ROLL",
        subtitle: "15 Exposures.",
        price: "$8.99",
        priceNote: "/ roll",
        features: [
            "15 Hyper-Realistic Photos",
            "4 Film Modes Included",
            "Nano-Texture Engine",
            "Auto-Delete Privacy",
            "Commercial License",
        ],
        cta: "Buy Standard Roll",
        isPopular: false,
    },
    {
        name: "PRO ROLL",
        subtitle: "50 Exposures.",
        price: "$18.99",
        priceNote: "/ roll",
        badge: "BEST VALUE",
        features: [
            "50 Hyper-Realistic Photos ",
            "Best Value ($0.37 per photo)",
            "4 Film Modes Included",
            "Perfect for Couples & Solos",
            "Nano-Texture Engine",
            "Auto-Delete Privacy",
        ],
        cta: "Buy Pro Roll",
        isPopular: true,
    },
]

export const Pricing: React.FC = () => {
    return (
        <section className="border-b border-foreground/10">
            {/* Plans Grid */}
            <div className="grid md:grid-cols-2">
                {/* Left: Title + Standard Plan */}
                <div className="p-8 md:p-12 md:border-r border-foreground/10">
                    {/* Section Title */}
                    <div className="mb-12">
                        <div className="font-mono text-xs text-foreground/40 mb-4">
                            PRICING // SINGLE_PAYMENT
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-[0.95] mb-3">
                            Pick Your<br />
                            <span className="text-foreground/30">Film Roll.</span>
                        </h2>
                        <p className="font-mono text-foreground/60 text-sm">
                            No subscriptions. Pay once, own forever.
                        </p>
                    </div>

                    {/* Standard Plan */}
                    <div className="border border-foreground/20 p-6 md:p-8">
                        <div className="mb-6">
                            <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-1">
                                {plans[0].name}
                            </h3>
                            <p className="font-mono text-sm text-foreground/50">{plans[0].subtitle}</p>
                        </div>

                        <div className="flex items-baseline mb-6">
                            <span className="font-display text-4xl md:text-5xl font-bold text-white">
                                {plans[0].price}
                            </span>
                            <span className="font-mono text-foreground/50 ml-2">{plans[0].priceNote}</span>
                        </div>

                        <ul className="space-y-3 font-mono text-sm mb-8">
                            {plans[0].features.map((feature, i) => (
                                <li key={i} className="flex items-start text-foreground/70">
                                    <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link href="/login">
                            <Button size="lg" variant="outline" className="w-full">
                                {plans[0].cta} →
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right: Pro Plan (Featured) */}
                <div className="p-8 md:p-12 bg-[#0a0a0a] relative overflow-hidden">
                    {/* Grid Background */}
                    <div
                        className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(#EBEBEB 1px, transparent 1px), linear-gradient(90deg, #EBEBEB 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    ></div>

                    <div className="relative z-10">
                        {/* Badge */}
                        <div className="inline-block bg-accent text-background font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-6">
                            {plans[1].badge}
                        </div>

                        {/* Plan Name & Subtitle */}
                        <div className="mb-6">
                            <h3 className="font-display text-xl md:text-2xl font-bold uppercase mb-1">
                                {plans[1].name}
                            </h3>
                            <p className="font-mono text-sm text-foreground/50">{plans[1].subtitle}</p>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline mb-6">
                            <span className="font-display text-4xl md:text-5xl font-bold text-white">
                                {plans[1].price}
                            </span>
                            <span className="font-mono text-foreground/50 ml-2">{plans[1].priceNote}</span>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 font-mono text-sm mb-8">
                            {plans[1].features.map((feature, i) => (
                                <li key={i} className="flex items-start text-foreground/80">
                                    <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <Link href="/login">
                            <Button size="lg" variant="primary" className="w-full">
                                {plans[1].cta} →
                            </Button>
                        </Link>

                        <p className="text-center font-mono text-[10px] text-foreground/30 mt-4">
                            SECURE PAYMENT // 100% MONEY-BACK GUARANTEE
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}