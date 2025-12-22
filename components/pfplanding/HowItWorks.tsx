import React from 'react';

export const HowItWorks: React.FC = () => {
    return (
        <section className="grid md:grid-cols-12 border-b border-foreground/10">
            <div className="col-span-12 md:col-span-4 p-8 md:p-12 border-b md:border-b-0 md:border-r border-foreground/10 flex flex-col justify-between">
                <h2 className="font-display text-4xl font-bold uppercase leading-tight">
                    3 Steps to <br />
                    <span className="text-foreground/30">The Vibe.</span>
                </h2>
                <div className="font-mono text-xs text-foreground/40 mt-8">
                    PROCESS_ID: GEN_V2.0
                </div>
            </div>

            <div className="col-span-12 md:col-span-8 grid md:grid-cols-3">
                {[
                    {
                        step: '01',
                        title: 'Upload Selfies',
                        desc: 'Upload 4-5 clear photos of yourself. The AI learns your unique features to create your personal model.',
                        meta: 'MODEL_TRAINING'
                    },
                    {
                        step: '02',
                        title: 'Pick Your Vibe',
                        desc: 'Choose from 5 film modes: Night Flash, Golden Hour, Gritty Vintage, Cine Shoot, or Headshot. Set lighting and describe your scene.',
                        meta: 'STYLE_SELECT'
                    },
                    {
                        step: '03',
                        title: 'Get Photos',
                        desc: 'AI generates hyper-realistic photos in under 60 seconds. Download instantly. No plastic AI look—real skin, real texture.',
                        meta: 'INSTANT_RENDER'
                    }
                ].map((item, i) => (
                    <div key={i} className={`p-8 border-b md:border-b-0 border-foreground/10 flex flex-col justify-between hover:bg-white/5 transition-colors group ${i !== 2 ? 'md:border-r' : ''}`}>
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="font-display text-6xl text-foreground/30 group-hover:text-accent/20 transition-colors font-bold">
                                    {item.step}
                                </span>
                                <span className="font-mono text-[9px] border border-foreground/20 px-1 text-foreground/50">
                                    {item.meta}
                                </span>
                            </div>
                            <h3 className="font-display text-xl font-bold uppercase mb-2 group-hover:text-accent transition-colors">
                                {item.title}
                            </h3>
                            <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};