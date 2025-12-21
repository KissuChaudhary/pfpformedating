import React from 'react';
import { Button } from '@/components/ui/button';

interface CameraBagProps {
    onOpenCamera: () => void;
}

export const CameraBag: React.FC<CameraBagProps> = ({ onOpenCamera }) => {
    return (
        <div className="container mx-auto px-6 py-12 max-w-6xl">
            {/* Top Bar */}
            <div className="flex justify-between items-end mb-16 pb-6 border-b border-zinc-700">
                <div>
                    <h2 className="font-display text-3xl font-bold mb-2">Camera Bag</h2>
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Pro Plan Active
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    Buy Film Packs
                </Button>
            </div>

            {/* Center Stage: The Active Camera */}
            <div className="flex justify-center mb-24">
                <div className="relative w-full max-w-2xl group cursor-pointer" onClick={onOpenCamera}>
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                    {/* The Card */}
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-[1.01] group-hover:border-zinc-700">

                        <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                            {/* Camera Specs */}
                            <div className="text-left">
                                <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-3">
                                    Current Device
                                </div>
                                <h3 className="font-display text-4xl font-bold text-white mb-4">
                                    Disposable Gen-2
                                </h3>
                                <div className="flex gap-2">
                                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-zinc-700 text-[10px] font-medium text-zinc-400">ISO 3200</span>
                                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-zinc-700 text-[10px] font-medium text-zinc-400">35mm</span>
                                </div>
                            </div>

                            {/* The Counter */}
                            <div className="text-center min-w-[120px]">
                                <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">Exposures</div>
                                <div className="font-display text-4xl text-white font-bold tabular-nums">
                                    24<span className="text-zinc-400/40 text-2xl">/24</span>
                                </div>
                            </div>
                        </div>

                        {/* The Action Button (Fake) */}
                        <div className="mt-10 pt-8 border-t border-zinc-700 flex justify-between items-center">
                            <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">Tap to Shoot</span>
                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Archive */}
            <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-6">Recent Rolls</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((roll) => (
                        <div key={roll} className="group cursor-pointer">
                            <div className="aspect-[4/5] bg-zinc-800/30 border border-zinc-700 rounded-xl p-1.5 relative hover:border-zinc-700 transition-all hover:-translate-y-1">
                                <div className="grid grid-cols-2 gap-1 h-full rounded-lg overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                                    <img src={`https://picsum.photos/200/300?random=${roll}1`} className="w-full h-full object-cover" />
                                    <img src={`https://picsum.photos/200/300?random=${roll}2`} className="w-full h-full object-cover" />
                                    <img src={`https://picsum.photos/200/300?random=${roll}3`} className="w-full h-full object-cover" />
                                    <img src={`https://picsum.photos/200/300?random=${roll}4`} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-medium text-white">
                                    Roll #{roll}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};