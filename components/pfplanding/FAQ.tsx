"use client"
import type React from "react"
import { useState } from "react"
import { faqData } from "./faq-data"

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="grid md:grid-cols-12 border-b border-foreground/10 min-h-[50vh]">
            <div className="col-span-12 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-foreground/10">
                <h2 className="font-display text-4xl font-bold uppercase mb-4">Frequently Asked Questions</h2>
                <p className="font-mono text-xs text-foreground/50">Everything you need to know about PFPforME.</p>
            </div>

            <div className="col-span-12 md:col-span-8">
                {faqData.map((item, i) => (
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