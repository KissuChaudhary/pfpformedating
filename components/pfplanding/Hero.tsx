import type React from "react"
import { Button } from "./ui/Button"
import Link from "next/link"

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-[#050505] border-b border-foreground/10">
      
      {/* Background Gradient Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Badge */}
           <div className="font-mono items-center text-xs text-foreground/80 mb-4 mb-8 ">
                             // #1 AI DATING PHOTO APP FOR MEN
                        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 uppercase text-foreground">
           <span className="text-transparent stroke-text relative">
            Hyper-Realistic AI Photos
          
          </span> <br className="hidden lg:block" />for 10x More Matches
        </h1>

        {/* Subhead */}
        <p className="font-mono text-foreground/60 text-sm md:text-lg max-w-2xl mb-10 leading-relaxed">
          Stop getting banned for fake photos. Our hyper-realism engine generates dating pics so real, even your mom won't know. Perfect for <span className="text-foreground border-b border-foreground/20">Tinder</span>, <span className="text-foreground border-b border-foreground/20">Hinge</span>, & <span className="text-foreground border-b border-foreground/20">Bumble</span>.
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-6 w-full items-center justify-center mb-20">
            <Link href="/login">
            <Button size="lg" className="px-8 py-4 text-lg h-auto w-full sm:w-auto rounded-none border border-foreground/20 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 uppercase font-bold tracking-wider">
              Generate My Dating Photos
            </Button>
            </Link>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-foreground/40 uppercase tracking-widest">
                <span>[!] 100% Ban-Proof</span>
                <span>//</span>
                <span>No Plastic Skin</span>
            </div>
        </div>

        {/* Visuals - The "Cards" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl px-4 md:px-0">
            
            {/* Card 1 - Tinder Style */}
            <div className="relative aspect-[9/16] md:aspect-[3/4] group overflow-hidden border border-foreground/10 bg-foreground/5 rounded-none md:rotate-[-3deg] md:hover:rotate-0 transition-all duration-500 hover:z-30 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                <img src="/images/demo14.jpg" alt="Candid Photo" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur px-2 py-1 border border-white/10">
                    <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">● Active Now</span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-left">
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-2xl font-bold text-white font-display">Josh</span>
                        <span className="text-lg text-white/80 font-mono mb-1">27</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur rounded text-[10px] font-mono text-white/80 border border-white/10">
                            ☕ Coffee
                        </span>
                        <span className="px-2 py-1 bg-white/10 backdrop-blur rounded text-[10px] font-mono text-white/80 border border-white/10">
                            ✈️ Travel
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 2 - Hinge Style (Center Highlight) */}
             <div className="relative aspect-[9/16] md:aspect-[3/4] group overflow-hidden border border-foreground/10 bg-foreground/5 rounded-none z-20 md:-mt-12 shadow-2xl shadow-red-500/10 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
                <img src="/images/demo13.jpg" alt="Couple Photo" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                
                 <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white text-black px-3 py-1 text-[10px] font-bold tracking-wider uppercase transform rotate-3">
                        Hinge Standout
                    </div>
                </div>

                 <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-left">
                    <div className="font-mono text-[10px] text-white/60 mb-2 uppercase tracking-widest">My simple pleasure</div>
                    <div className="text-white font-display text-2xl leading-tight mb-4">
                        Weekend trips to nowhere with a film camera 📸
                    </div>
                    <div className="h-1 w-12 bg-red-500 rounded-full"></div>
                </div>
            </div>

            {/* Card 3 - Bumble/Insta Style */}
             <div className="relative aspect-[9/16] md:aspect-[3/4] group overflow-hidden border border-foreground/10 bg-foreground/5 rounded-none md:rotate-[3deg] md:hover:rotate-0 transition-all duration-500 hover:z-30 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                <img src="/images/demo12.jpg" alt="Messy Bun" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-4 left-4 z-20">
                     <div className="bg-red-500 text-white px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase">
                        12 New Likes
                    </div>
                </div>

                <div className="absolute bottom-6 left-0 w-full px-6 z-20 text-center">
                    <div className="bg-[#FFC629] text-black p-3 font-bold uppercase tracking-wider text-xs transform -rotate-2 shadow-lg">
                        "You made the first move!"
                    </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  )
}
