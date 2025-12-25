import React from 'react';

interface FeatureItem {
    title: string;
    description: string;
}

interface UseCaseFeatureProps {
    title: string;
    subtitle: string;
    features: FeatureItem[];
    image: string;
    imageAlt?: string;
    imageCaption?: string;
    reverse?: boolean; // Option to swap text/image sides
}

export const UseCaseFeature: React.FC<UseCaseFeatureProps> = ({
    title,
    subtitle,
    features,
    image,
    imageAlt = "Feature Image",
    imageCaption,
    reverse = false
}) => {
    return (
        <section className="grid md:grid-cols-2 border-b border-foreground/10">
            {/* Content Side */}
            <div className={`p-8 md:p-20 border-r border-foreground/10 bg-[#0a0a0a] flex flex-col justify-center ${reverse ? 'md:order-2' : ''}`}>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none mb-6">
                    {title}
                </h2>
                <p className="font-mono text-foreground/60 mb-12 max-w-md">
                    {subtitle}
                </p>

                <div className="relative pl-6 md:pl-8 border-l border-foreground/10">
                    <div className="space-y-10">
                        {features.map((feature, index) => (
                            <div key={index}>
                                <h3 className="font-display text-xl md:text-2xl text-foreground font-bold uppercase mb-2 flex items-center gap-2">
                                    <span className="text-accent text-sm">0{index + 1} //</span> {feature.title}
                                </h3>
                                <p className="font-mono text-xs text-foreground/60 pl-8 border-l border-foreground/10 ml-1">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Visual Side */}
            <div className={`relative min-h-[50vh] md:h-auto overflow-hidden group ${reverse ? 'md:order-1 md:border-r border-foreground/10' : ''}`}>
                {imageCaption && (
                    <div className="absolute top-0 left-0 w-full p-2 text-center text-sm font-mono text-accent bg-black/50 backdrop-blur-sm z-10 font-bold tracking-wider">
                        {imageCaption}
                    </div>
                )}

                <img
                    src={image}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 ease-out hover:scale-105"
                    alt={imageAlt}
                />

                {/* Film grain effect overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 pointer-events-none mix-blend-overlay transition-opacity"></div>
            </div>
        </section>
    );
};
