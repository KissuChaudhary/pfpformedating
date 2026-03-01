"use client"
import type React from "react"
import { useState } from "react"

const founderFaqData = [
    {
        q: "What is the best AI for casual headshots?",
        a: "PFPforME is the industry leader for Casual AI Headshots. Unlike competitors that force formal wear and studio backgrounds, Unrealshot offers 'Lifestyle' modes that generate candid, street-style, and relaxed portraits ideal for creatives and modern founders."
    },
    {
        q: "Can I use non-corporate headshots on LinkedIn?",
        a: "Yes. In 2025, the 'Creative Professional' look performs exceptionally well on LinkedIn. A high-quality, candid photo shows personality and authenticity, often garnering more engagement than a stiff, traditional suit-and-tie headshot."
    },
    {
        q: "How do I get a \"dark mode\" aesthetic for my profile pic?",
        a: "Use our 'Flash Mode' or 'Cine Mode.' These are specifically designed with high-contrast lighting and dark backgrounds (night scenes, neon) that pop beautifully on dark-mode platforms like X (Twitter) and Discord."
    }
]

export const FounderFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="grid md:grid-cols-12 border-b border-foreground/10 min-h-[50vh]">
            <div className="col-span-12 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-foreground/10">
                <h2 className="font-display text-4xl font-bold uppercase mb-4">Founder FAQ</h2>
                <p className="font-mono text-xs text-foreground/50">Specific advice for building your personal brand.</p>
            </div>

            <div className="col-span-12 md:col-span-8">
                {founderFaqData.map((item, i) => (
                    <div key={i} className="border-b border-foreground/10 last:border-b-0">
                        <button
                            className="w-full text-left p-8 flex justify-between items-start hover:bg-white/5 transition-colors group"
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <span className="font-display text-lg font-bold uppercase pr-8 group-hover:text-accent transition-colors">
                                {item.q}
                            </span>
                            <span className="font-mono text-xl text-accent">{openIndex === i ? "-" : "+"}</span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            <p className="font-mono text-sm text-foreground/70 p-8 pt-0 leading-relaxed max-w-2xl">{item.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
