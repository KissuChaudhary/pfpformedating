"use client"
import React, { useState } from 'react';
import { Zap, Sun, Film, Video, ArrowRight, Aperture, Layers, Focus, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LightingLabSection: React.FC = () => {
    const [activeStyle, setActiveStyle] = useState(0);

    const styles = [
        {
            icon: Zap,
            name: "Flash Photography",
            desc: "Simulates direct on-camera flash. Creates high-energy, candid 'night out' aesthetics with sharp shadows and realistic skin highlights.",
            img: "/images/demo8.jpg",
            tag: "HARD_LIGHT_SOURCE",
            tech: "Direct Flash Simulation"
        },
        {
            icon: Sun,
            name: "Natural Sun + Reflector",
            desc: "Simulates 6PM golden hour sun with a soft fill light. Generates approachable, warm tones that signal 'friendly' and 'social'.",
            img: "/images/golden-photo.webp",
            tag: "WARM_DIFFUSED",
            tech: "Global Illumination"
        },
        {
            icon: Film,
            name: "Analog 35mm Grain",
            desc: "Emulates Kodak Portra 400 ISO grain structure. Adds micro-texture to prevent the 'plastic skin' look common in other AI generators.",
            img: "/images/vintage-roll.webp",
            tag: "FILM_EMULSION",
            tech: "Texture Mapping"
        },
        {
            icon: Video,
            name: "Cinematic Rim Light",
            desc: "High-contrast color grading with strong backlighting. Separates subject from background for a premium, editorial magazine look.",
            img: "/images/cinematic-photo.webp",
            tag: "VOLUMETRIC_LIGHT",
            tech: "Color Grading Engine"
        }
    ];

    return (
        <section className="min-h-screen bg-black text-white relative border-b border-[#333] overflow-hidden flex flex-col lg:flex-row">
            
            {/* --- Left Panel: Controls (40%) --- */}
            <div className="w-full lg:w-[40%] p-8 md:p-16 flex flex-col justify-center border-r border-[#333] relative z-20 bg-black">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 border border-[#CCFF00] text-[#CCFF00] px-3 py-1.5 font-mono text-[10px] uppercase w-fit mb-6 shadow-[0_0_15px_rgba(204,255,0,0.15)] bg-[#CCFF00]/5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-[#CCFF00] animate-pulse rounded-full"></span>
                        Virtual Studio Engine
                    </div>
                    <h2 className="font-display text-5xl md:text-6xl font-bold uppercase leading-[0.9] mb-6">
                        Physics-Based Lighting<br/>
                        <span className="text-transparent stroke-text-lime">to avoid AI detection</span>
                    </h2>
                    <p className="font-mono text-[#888] text-sm leading-relaxed max-w-md">
                        Other AI tools just paste your face. We simulate real-world photography physics—<strong className="text-white">shutter speed, aperture, and film grain</strong>—to trick the eye into seeing reality.
                    </p>
                </div>

                {/* Style Selector */}
                <div className="space-y-2">
                    {styles.map((style, i) => (
                        <button 
                            key={i}
                            onClick={() => setActiveStyle(i)}
                            className={`w-full text-left p-4 border transition-all duration-300 group relative overflow-hidden ${
                                activeStyle === i 
                                ? 'border-[#CCFF00] bg-[#CCFF00]/5' 
                                : 'border-[#333] hover:border-[#666] bg-black'
                            }`}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 flex items-center justify-center border ${
                                        activeStyle === i ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-[#333] text-[#666] group-hover:text-white'
                                    }`}>
                                        <style.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`font-display text-lg uppercase tracking-wide leading-none mb-1 ${
                                            activeStyle === i ? 'text-white' : 'text-[#888] group-hover:text-white'
                                        }`}>
                                            {style.name}
                                        </span>
                                        <span className="font-mono text-[10px] text-[#555] uppercase tracking-widest group-hover:text-[#777]">
                                            // {style.tech}
                                        </span>
                                    </div>
                                </div>
                                {activeStyle === i && <ArrowRight className="w-4 h-4 text-[#CCFF00]" />}
                            </div>
                            
                            {/* Progress Bar for Active State */}
                            {activeStyle === i && (
                                <motion.div 
                                    layoutId="activeGlow"
                                    className="absolute bottom-0 left-0 h-[2px] bg-[#CCFF00]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.5 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Right Panel: Visual Preview (60%) --- */}
            <div className="w-full lg:w-[60%] relative bg-[#050505] overflow-hidden min-h-[50vh] lg:min-h-auto">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeStyle}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "circOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img 
                            src={styles[activeStyle].img} 
                            alt={styles[activeStyle].name} 
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        
                        {/* Camera HUD Overlay */}
                        <div className="absolute top-8 right-8 flex flex-col items-end gap-2 font-mono text-[10px] text-[#CCFF00]/70 uppercase tracking-widest pointer-events-none">
                            <div className="flex items-center gap-2 border border-[#CCFF00]/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                                <Aperture className="w-3 h-3" /> F/1.8
                            </div>
                            <div className="flex items-center gap-2 border border-[#CCFF00]/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                                <Focus className="w-3 h-3" /> ISO 400
                            </div>
                            <div className="flex items-center gap-2 border border-[#CCFF00]/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                                <Layers className="w-3 h-3" /> RAW
                            </div>
                        </div>

                        {/* Overlay Info */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pointer-events-none">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="max-w-xl"
                            >
                                <div className="font-mono text-[#CCFF00] text-xs mb-2 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#CCFF00]"></div>
                                    {styles[activeStyle].tag}
                                </div>
                                <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 uppercase leading-none">
                                    {styles[activeStyle].name}
                                </h3>
                                <p className="font-mono text-white/80 text-sm md:text-base border-l-2 border-[#CCFF00] pl-4 bg-black/50 backdrop-blur-sm py-2 pr-4">
                                    {styles[activeStyle].desc}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" 
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
                </div>
                
                {/* Crosshairs */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <div className="w-[90%] h-[90%] border border-white/20 relative">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#CCFF00]"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#CCFF00]"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#CCFF00]"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#CCFF00]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#CCFF00] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
