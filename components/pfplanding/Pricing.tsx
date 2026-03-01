import type React from "react"
import { Button } from "./ui/Button"
import Link from "next/link"

const plans = [
    {
        name: "STARTER PACK",
        subtitle: "Perfect for a quick profile refresh.",
        price: "$19.00",
        priceNote: "/ month",
        features: [
            "Create 20 Match-Ready Photos",
            "Optimized for Dating Apps",
            "100% Undetectable",
            "Commercial License",
            "Private & Secure"
        ],
        cta: "Get Started",
        isPopular: false,
    },
    {
        name: "PREMIUM PACK",
        subtitle: "Enough for all your dating profiles.",
        price: "$150.00",
        priceNote: "/ month",
        badge: "10X YOUR MATCHES",
        features: [
            "Create 500 Match-Ready Photos",
            "Priority Generation",
            "Commercial License",
            "Anti-Ban Protection",
            "Commercial License",
            "Private & Secure"
        ],
        cta: "Get Premium",
        isPopular: true,
    },
]

interface PricingProps {
    asH1?: boolean; // When true, renders main heading as H1 (for dedicated pricing page)
}

export const Pricing: React.FC<PricingProps> = ({ asH1 = false }) => {
    const HeadingTag = asH1 ? 'h1' : 'h2';
    return (
        <section className="border-b border-foreground/10">
            {/* Plans Grid */}
            <div className="grid md:grid-cols-2">
                {/* Left: Title + Standard Plan */}
                <div className="p-8 md:p-12 md:border-r border-foreground/10">
                    {/* Section Title */}
                    <div className="mb-12">
                        <div className="font-mono text-xs text-foreground/40 mb-4">
                            PRICING // SUBSCRIPTION
                        </div>
                        <HeadingTag className="font-display text-4xl md:text-5xl font-bold uppercase leading-[0.95] mb-3">
                            Invest in Your<br />
                            <span className="text-foreground/30">Love Life.</span>
                        </HeadingTag>
                        <p className="font-mono text-foreground/60 text-sm">
                            Cheaper than a bad date. Cancel anytime.
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