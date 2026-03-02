import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Fingerprint } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#CCFF00] selection:text-black flex flex-col w-full overflow-x-hidden">
      
     

      {/* Main Hero Area */}
      <div className="flex flex-col xl:flex-row w-full min-h-[90vh] border-b border-[#333]">
        
     

        {/* Center Pane: Copy & CTA */}
        <div className="w-full xl:w-[55%] p-6 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center relative z-10">
          
          <div className="inline-flex items-center gap-3 border border-[#CCFF00] text-[#CCFF00] px-3 py-1.5 font-mono text-[10px] md:text-xs uppercase w-fit mb-8 shadow-[0_0_15px_rgba(204,255,0,0.15)] bg-[#CCFF00]/5">
            <span className="w-2 h-2 bg-[#CCFF00] animate-pulse"></span>
            #1 Dating Photoshoot app for Men</div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[5.5rem] leading-[0.85] tracking-wide uppercase mb-8">
            <span className="text-white">Hyper-Realistic AI Photos</span><br />
            <span className="stroke-text-lime">for 10x More Matches</span>
          </h1>

          <p className="font-mono text-[#888] text-sm md:text-base max-w-xl mb-12 leading-relaxed">
            Stop losing to guys with better cameras. Our engine generates field-tested, hyper-realistic dating photos engineered to mathematically increase your match rate.
          </p>

          <button className="bg-[#CCFF00] text-black font-display text-2xl md:text-3xl uppercase py-5 px-8 hover:bg-white transition-colors duration-300 flex items-center justify-between group w-full max-w-xl">
            <span>Generate Your Photos</span>
            <span className="font-mono text-sm md:text-lg tracking-widest group-hover:translate-x-2 transition-transform">-&gt;</span>
          </button>
        </div>

        {/* Right Pane: 4 Showcase Photos Grid */}
        <div className="w-full xl:w-[45%] relative min-h-[60vh] xl:min-h-full border-t xl:border-t-0 xl:border-l border-[#333] bg-grid-pattern overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

          {/* 2x2 Grid - Full Bleed */}
          <div className="absolute inset-0 z-10 grid grid-cols-2 grid-rows-2 w-full h-full">
            {/* Photo 1 */}
            <div className="relative w-full h-full overflow-hidden border-r border-b border-[#333] group bg-[#050505]">
              <img src="https://picsum.photos/seed/showcase1/600/800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" alt="Showcase 1" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#333] text-white font-mono text-[9px] px-2 py-1 uppercase tracking-widest">
                Vibe: Cinematic
              </div>
            </div>
            {/* Photo 2 */}
            <div className="relative w-full h-full overflow-hidden border-b border-[#333] group bg-[#050505]">
              <img src="https://picsum.photos/seed/showcase2/600/800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" alt="Showcase 2" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#333] text-white font-mono text-[9px] px-2 py-1 uppercase tracking-widest">
                Vibe: Golden Hour
              </div>
            </div>
            {/* Photo 3 */}
            <div className="relative w-full h-full overflow-hidden border-r border-[#333] group bg-[#050505]">
              <img src="https://picsum.photos/seed/showcase3/600/800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" alt="Showcase 3" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#333] text-white font-mono text-[9px] px-2 py-1 uppercase tracking-widest">
                Vibe: Candid
              </div>
            </div>
            {/* Photo 4 */}
            <div className="relative w-full h-full overflow-hidden group bg-[#050505]">
              <img src="https://picsum.photos/seed/showcase4/600/800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" alt="Showcase 4" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#333] text-white font-mono text-[9px] px-2 py-1 uppercase tracking-widest">
                Vibe: Studio
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3 Processing Nodes (Replaces standard 3 steps) */}
      <div className="flex flex-col xl:flex-row w-full bg-black border-b border-[#333]">
        
        {/* Left Group (55% to match Hero split) - Contains Header & Step 1 */}
        <div className="flex flex-col md:flex-row w-full xl:w-[55%] border-b xl:border-b-0 xl:border-r border-[#333]">
            
            {/* New Header Section (32.5% of total / 59.1% of parent) */}
            <div className="w-full md:w-[59.1%] p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-between">
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8">
                    3 Steps to <br />
                    <span className="text-[#333]">The Vibe.</span>
                </h2>
                <div className="font-mono text-xs text-[#666] mt-8">
                    PROCESS_ID: GEN_V2.0
                </div>
            </div>

            {/* Node 1 (22.5% of total / 40.9% of parent) */}
            <div className="w-full md:w-[40.9%] p-8 md:p-12 relative group hover:bg-[#050505] transition-colors">
                <div className="flex justify-between items-start mb-12">
                <div className="font-display text-6xl text-[#333] group-hover:text-white transition-colors">01</div>
                <div className="font-mono text-[9px] text-[#CCFF00] border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-2 py-1 uppercase tracking-widest">
                    Upload_Photos
                </div>
                </div>
                <h3 className="font-display text-3xl uppercase mb-3 text-white">Provide Base Photos</h3>
                <p className="font-mono text-[#888] text-xs md:text-sm leading-relaxed">
    Upload 4 different & clear photos of yourself (avoid only selfie). The AI learns your unique features to create your personal model.          </p>
            </div>
        </div>

        {/* Right Group (45% to match Hero split) - Contains Step 2 & Step 3 */}
        <div className="flex flex-col md:flex-row w-full xl:w-[45%]">
            
            {/* Node 2 (22.5% of total / 50% of parent) */}
            <div className="w-full md:w-[50%] p-8 md:p-12 border-b md:border-b-0 border-r border-[#333] relative group hover:bg-[#050505] transition-colors">
                <div className="flex justify-between items-start mb-12">
                <div className="font-display text-6xl text-[#333] group-hover:text-white transition-colors">02</div>
                <div className="font-mono text-[9px] text-[#CCFF00] border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-2 py-1 uppercase tracking-widest">
                    Choose_Vibe
                </div>
                </div>
                <h3 className="font-display text-3xl uppercase mb-3 text-white">Pick Your Vibe</h3>
                <p className="font-mono text-[#888] text-xs md:text-sm leading-relaxed">
    Choose from 4 film modes: Night Flash, Golden Hour, Gritty Vintage, or Cineamtic Shoot. Set lighting and describe your scene.          </p>
            </div>

            {/* Node 3 (22.5% of total / 50% of parent) */}
            <div className="w-full md:w-[50%] p-8 md:p-12 relative group hover:bg-[#050505] transition-colors">
                <div className="flex justify-between items-start mb-12">
                <div className="font-display text-6xl text-[#333] group-hover:text-[#CCFF00] transition-colors">03</div>
                <div className="font-mono text-[9px] text-[#CCFF00] border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-2 py-1 uppercase tracking-widest">
                    Get_Results
                </div>
                </div>
                <h3 className="font-display text-3xl uppercase mb-3 text-white">Get Your Matches</h3>
                <p className="font-mono text-[#888] text-xs md:text-sm leading-relaxed">
    AI generates hyper-realistic photos ready for dating apps in under 60 seconds. Download instantly. No plastic AI look. Real skin, real texture.          </p>
            </div>
        </div>

      </div>
    </div>
  );
};
