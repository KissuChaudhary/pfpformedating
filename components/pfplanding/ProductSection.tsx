import React from 'react';

const cases = [
    {
        title: 'The "Candid" Solo',
        desc: 'Laughing at a cafe, messy hair, waiting for subway.',
        img: '/candid-solo.png'
    },
    {
        title: 'The "Power Couple"',
        desc: 'Chemistry engine included. Night out, holding hands.',
        img: '/power-couple.jpg'
    },
    {
        title: 'The "Vintage" Roll',
        desc: 'Kodak Portra simulation. Nostalgic soul.',
        img: '/roll.jpg'
    },
    {
        title: 'The "Hinge" Fix',
        desc: 'Not staged. Not corporate. Just vibes.',
        img: '/hinge.png'
    },
];

export const ProductSection: React.FC = () => {
    return (
        <section className="py-24 border-b border-foreground/10 overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div>
                        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">
                            Digital Lifestyle.
                        </h2>
                        <p className="font-mono text-foreground/60 max-w-md">
                            Whether you need to fix your Hinge profile or upgrade your Instagram aesthetic, we generate the photos you actually want to post.
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="font-mono text-accent text-xs mb-2 animate-pulse">● LIVE PREVIEW</div>
                        <div className="h-[1px] w-32 bg-accent ml-auto"></div>
                    </div>
                </div>
            </div>

            {/* Film Strip Container */}
            <div className="w-full overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
                <div className="flex gap-0 w-max pl-6 md:pl-24">
                    {cases.map((item, index) => (
                        <div key={index} className="relative group w-[300px] md:w-[400px] flex-shrink-0 mr-12">
                            {/* Film Sprockets Top */}
                            <div className="h-6 w-full bg-black border-y border-foreground/20 flex justify-between items-center px-2 mb-2">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={i} className="w-3 h-4 bg-[#1a1a1a] rounded-[2px]"></div>
                                ))}
                            </div>

                            {/* Image Frame */}
                            <div className="relative aspect-[2/3] overflow-hidden bg-[#111]">
                                <div className="absolute top-2 right-2 z-10 font-mono text-[9px] text-white/50 bg-black/50 px-1">
                                    {index + 1}A
                                </div>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-100 group-hover:grayscale-80 group-hover:opacity-80 transition-all duration-100 ease-out hover:brightness-110"
                                />
                            </div>

                            {/* Film Sprockets Bottom */}
                            <div className="h-6 w-full bg-black border-y border-foreground/20 flex justify-between items-center px-2 mt-2">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={i} className="w-3 h-4 bg-[#1a1a1a] rounded-[2px]"></div>
                                ))}
                            </div>

                            {/* Caption */}
                            <div className="mt-4">
                                <h3 className="font-display text-2xl font-bold uppercase">{item.title}</h3>
                                <p className="font-mono text-xs text-foreground/50 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};