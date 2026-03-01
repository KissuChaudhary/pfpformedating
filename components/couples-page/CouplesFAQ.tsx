"use client"
import type React from "react"
import { useState } from "react"

const couplesFaqData = [
    {
        q: "Is there an AI that generates couple photos?",
        a: "Yes. PFPforME is the first AI specialized in Couple Portraits. Unlike standard avatar makers, it allows you to upload two distinct subject identities and generates scenes where both people interact naturally (hugging, holding hands, sitting together)."
    },
    {
        q: "Can I generate photos with my long-distance partner?",
        a: "Absolutely. This is one of our most popular use cases. Since you upload photos separately, you don't need to be in the same physical room to generate a photoshoot together."
    },
    {
        q: "Do the photos look fake or \"AI-generated\"?",
        a: "We prioritize \"Anti-AI\" textures. Our model adds film grain, natural skin pores, and imperfect lighting (like camera flash) to ensure your couple photos look like real memories, not digital art."
    },
    {
        q: "Can I use these for \"Save the Date\" cards?",
        a: "Yes. Our Pro Plan delivers 4K resolution images suitable for printing on wedding invites, holiday cards, or framing for your home."
    }
]

export const CouplesFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="grid md:grid-cols-12 border-b border-foreground/10 min-h-[50vh]">
            <div className="col-span-12 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-foreground/10">
                <h2 className="font-display text-4xl font-bold uppercase mb-4">Couple Photos FAQ</h2>
                <p className="font-mono text-xs text-foreground/50">Everything you need to know about our Couple Mode.</p>
            </div>

            <div className="col-span-12 md:col-span-8">
                {couplesFaqData.map((item, i) => (
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
