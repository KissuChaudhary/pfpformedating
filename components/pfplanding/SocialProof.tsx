import React from 'react';

export const SocialProof: React.FC = () => {
  return (
    <section className="grid md:grid-cols-2 border-b border-foreground/10">
        <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-foreground/10 flex items-center bg-[#0a0a0a]">
            <blockquote className="relative">
                <span className="absolute -top-8 -left-8 text-6xl text-foreground/10 font-display">"</span>
                <p className="font-display text-2xl md:text-3xl font-medium leading-tight mb-8">
                    I spent $500 on a photoshoot that looked stiff. I spent $19 here and got the best photo of myself I've ever seen. The flash glare makes it look so real.
                </p>
                <footer className="font-mono text-sm">
                    <span className="text-accent font-bold block mb-1">SARAH J.</span>
                    <span className="text-foreground/50 text-xs uppercase tracking-wider">Indie Maker</span>
                </footer>
            </blockquote>
        </div>

        <div className="p-12 md:p-24 flex items-center">
            <blockquote className="relative">
                <span className="absolute -top-8 -left-8 text-6xl text-foreground/10 font-display">"</span>
                <p className="font-display text-2xl md:text-3xl font-medium leading-tight mb-8">
                    Finally, an AI that doesn't make me look like a cartoon superhero. This is the only tool I trust for my dating apps.
                </p>
                <footer className="font-mono text-sm">
                    <span className="text-accent font-bold block mb-1">MIKE T.</span>
                    <span className="text-foreground/50 text-xs uppercase tracking-wider">Product Designer</span>
                </footer>
            </blockquote>
        </div>
    </section>
  );
};