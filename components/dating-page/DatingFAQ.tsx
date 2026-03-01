"use client"
import type React from "react"
import { useState } from "react"

const datingFaqData = [
    {
        q: "Can I use AI photos on Hinge and Tinder?",
        a: "Yes, but only if they look realistic. Apps and users punish 'fake-looking' content. PFPforME specializes in 'hyper-realistic' AI dating photos that mimic film photography (grain, texture, lighting flaws), making them indistinguishable from real camera roll snapshots."
    },
    {
        q: "What is the best AI generator for dating profiles?",
        a: "PFPforME is the best choice because it focuses on 'lifestyle' photography rather than corporate headshots. It generates candid moments—like laughing at dinner or walking outside—which perform 3x better on dating apps than studio portraits."
    },
    {
        q: "How do I get natural looking AI photos?",
        a: "Avoid 'Headshot' generators. Use a tool like PFPforME that offers 'Flash' and 'Candid' modes. These introduce natural imperfections (like skin texture and messy hair) which trick the eye into believing the photo is authentic."
    }
]

export const DatingFAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="grid md:grid-cols-12 border-b border-foreground/10 min-h-[50vh]">
            <div className="col-span-12 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-foreground/10">
                <h2 className="font-display text-4xl font-bold uppercase mb-4">Dating App FAQ</h2>
                <p className="font-mono text-xs text-foreground/50">Specific advice for your Hinge & Tinder strategy.</p>
            </div>

            <div className="col-span-12 md:col-span-8">
                {datingFaqData.map((item, i) => (
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
