"use client"
import type React from "react"
import { useState } from "react"

const questions = [
    {
        q: "Why don't these look like normal AI photos?",
        a: "Because we trained our models to un-learn 'perfection.' We focus on texture, lighting dynamics, and candid expressions to bypass the 'AI look.'",
    },
    {
        q: "Can I use these for dating apps?",
        a: "Absolutely. Our 'Full Body' and 'Candid' modes are specifically designed to perform well on Hinge and Tinder because they don't look staged.",
    },
    {
        q: "Do you offer the 'Pixel Art' stuff?",
        a: "No. We do one thing, and we do it perfectly: Hyper-realism. (If you want cartoons, we're not for you).",
    },
    {
        q: "How long does the training take?",
        a: "Typically 30-45 minutes. We use H100 GPU clusters to ensure the highest fidelity texture rendering.",
    },
]

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="grid md:grid-cols-12 border-b border-foreground/10 min-h-[50vh]">
            <div className="col-span-12 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-foreground/10">
                <h2 className="font-display text-4xl font-bold uppercase mb-4">FAQ</h2>
                <p className="font-mono text-xs text-foreground/50">Common questions about our anti-perfection engine.</p>
            </div>

            <div className="col-span-12 md:col-span-8">
                {questions.map((item, i) => (
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