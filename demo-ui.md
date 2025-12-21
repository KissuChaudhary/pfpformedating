import React, { useEffect, useState } from "react"

interface StoneCardProps {
    children?: React.ReactNode
    className?: string
    contentClassName?: string
}

export function GlobalCard({
    children,
    className = "",
    contentClassName = "",
}: StoneCardProps) {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
        }
    }, [])

    // Common styling for the inner card borders/bg
    const outerBg = isDark ? 'bg-stone-800' : 'bg-stone-100'
    const innerBg = isDark ? 'bg-stone-900 border-stone-700' : 'bg-white border-stone-200'

    return (
        <div className={`relative flex w-full flex-col ${className}`}>
            {/* Outer Muted Wrapper */}
            <div className={`
        relative p-1 overflow-hidden w-full transition-all duration-300 rounded-[16px]
        shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.04)]
        ${outerBg}
      `}>
                {/* Inner Content Card */}
                <div className={`
           relative border overflow-hidden transition-all h-full rounded-[12px]
           ${innerBg}
           ${contentClassName}
        `}>
                    {children}
                </div>
            </div>
        </div>
    )
}



 <div className="w-full mt-24 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
      <div className="flex items-center gap-4 mb-8 opacity-60">
         <div className="h-px bg-stone-200 flex-1"></div>
         <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">System Architecture</span>
         <div className="h-px bg-stone-200 flex-1"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.id} className="h-full">
            <GlobalCard className="h-full">
              <div className="p-6 h-full flex flex-col hover:bg-stone-50 transition-colors duration-500 group">
                <div className="flex justify-between items-start mb-5">
                  <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 group-hover:text-[#e78468] group-hover:border-[#e78468]/30 transition-all">
                      {step.icon}
                  </div>
                  <span className="text-[10px] font-bold text-stone-300 font-mono group-hover:text-[#e78468] transition-colors">STEP {step.id}</span>
                </div>
                
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-3">{step.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </GlobalCard>
          </div>
        ))}
      </div>
    </div>



<div className="min-h-screen flex items-center justify-center p-6 bg-stone-50">
      <div className="w-full max-w-md">
        <GlobalCard>
          <div className="p-12 flex flex-col items-center text-center space-y-8">
             <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
             </div>
             
             <div>
               <h1 className="text-3xl font-light text-stone-900 tracking-tight mb-2">BringBack AI</h1>
               <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Professional Studio Access</p>
             </div>

             <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">
               To access the Gemini 3 Pro Vision & Imaging models for high-fidelity restoration, a verified API key is required.
             </p>

             <button 
               onClick={handleConnect}
               className="w-full py-4 bg-[#e78468] text-white text-xs font-bold uppercase tracking-widest hover:brightness-90 transition-all rounded-lg shadow-xl hover:-translate-y-0.5"
             >
               Authenticate Session
             </button>
             
             <div className="text-[10px] text-stone-400 max-w-[200px] leading-tight">
               By connecting, you agree to use your Google Cloud Project for billing. 
               <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-stone-600 ml-1">View Documentation</a>
             </div>
          </div>
        </GlobalCard>
      </div>
    </div>


    <div className="min-h-screen p-6 md:p-12 max-w-[1600px] mx-auto flex flex-col animate-in fade-in duration-700">
      
      {/* Brand Header - Minimal */}
      <header className="mb-8 flex items-end justify-between">
        <div>
           <h1 className="text-3xl font-light tracking-tight text-stone-900 leading-none">BringBack AI- Family Portrait Studio</h1>
           <p className="text-stone-400 text-xs font-medium tracking-wide mt-2">Generate studio quality <span className="text-[#e78468]">Family Portraits</span> with AI</p>
        </div>
      </header>

      {/* Main Studio Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[700px]">
        
        {/* UNIFIED COMMAND CENTER (LEFT) - 4 Columns */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <GlobalCard className="h-full">
            <div className="flex flex-col h-full divide-y divide-stone-100 bg-white">
              
              {/* Section 1: Source Material */}
              <div className="p-6">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#e78468] rounded-full"></div>
                      Source Assets
                    </h2>
                    <span className="text-[10px] text-stone-400 font-mono bg-stone-50 px-2 py-1 rounded">{images.length}/{MAX_IMAGES}</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    {images.map((img) => (
                       <div key={img.id} className="relative aspect-square group rounded-md overflow-hidden bg-stone-50 border border-stone-200 shadow-sm">
                         {img.originalUrl && (
                            <img 
                              src={img.restoredUrl || img.originalUrl} 
                              alt="asset" 
                              className={`w-full h-full object-cover transition-all duration-700 ${img.status !== 'ready' && img.status !== 'pending' ? 'scale-105 filter grayscale contrast-125' : ''}`}
                            />
                         )}

                         {(img.status === 'uploading' || img.status === 'analyzing' || img.status === 'restoring') && (
                            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-2 text-center">
                               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mb-2"></div>
                               <span className="text-[9px] font-bold tracking-widest text-white uppercase">
                                 {img.status}
                               </span>
                            </div>
                         )}

                         {img.status !== 'pending' && img.status !== 'ready' && img.status !== 'failed' && (
                            <div className="absolute bottom-0 left-0 right-0">
                               <MinimalProgressBar progress={img.progress} className="h-[3px]" />
                            </div>
                         )}

                         <div className="absolute top-1 right-1">
                           <StatusBadge status={img.status} />
                         </div>

                         <button 
                           onClick={() => removeImage(img.id)}
                           disabled={processingState === 'processing'}
                           className="absolute top-1 left-1 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100 disabled:hidden"
                         >
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                         </button>
                       </div>
                    ))}
                    
                    {images.length < MAX_IMAGES && (
                      <label className={`
                        aspect-square flex flex-col items-center justify-center 
                        border border-dashed border-stone-300 rounded-md cursor-pointer 
                        hover:border-[#e78468] hover:bg-[#e78468]/5 transition-all duration-300 group
                        ${processingState === 'processing' ? 'opacity-30 pointer-events-none' : ''}
                      `}>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} multiple disabled={processingState === 'processing'} />
                        <svg className="text-stone-300 group-hover:text-[#e78468] transition-colors w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                        <span className="text-[9px] uppercase tracking-widest text-stone-400 group-hover:text-[#e78468] font-medium transition-colors">Add</span>
                      </label>
                    )}
                 </div>
              </div>

              {/* Section 2: Restoration Config */}
              <div className="p-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full"></div>
                  Restoration Protocol
                </h2>
                
                <div 
                   onClick={() => !processingState.startsWith('process') && setIsRestoreEnabled(!isRestoreEnabled)}
                   className={`
                     p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3
                     ${isRestoreEnabled ? 'bg-[#e78468]/5 border-[#e78468] ring-1 ring-[#e78468]/20' : 'bg-white border-stone-200 hover:border-stone-300'}
                     ${processingState === 'processing' ? 'opacity-60 pointer-events-none' : ''}
                   `}
                >
                   <div className={`
                      mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0
                      ${isRestoreEnabled ? 'bg-[#e78468] border-[#e78468]' : 'bg-white border-stone-300'}
                   `}>
                      {isRestoreEnabled && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                   </div>
                   <div>
                      <span className={`text-sm font-semibold ${isRestoreEnabled ? 'text-[#e78468]' : 'text-stone-700'}`}>AI Structural Repair</span>
                      <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                         Analyzes and reconstructs damaged areas (tears, water damage) using Gemini 3 Vision.
                      </p>
                   </div>
                </div>
              </div>

              {/* Section 3: Output Settings */}
              <div className="p-6 flex-1">
                 <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full"></div>
                  Output Configuration
                </h2>

                 <div className="space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 block">Aspect Ratio</label>
                       <div className="grid grid-cols-3 gap-2">
                          {Object.values(AspectRatio).map((ratio) => (
                            <button
                              key={ratio}
                              onClick={() => setSelectedRatio(ratio)}
                              disabled={processingState === 'processing'}
                              className={`
                                py-2 text-[10px] font-bold uppercase tracking-wider rounded border transition-all
                                ${selectedRatio === ratio 
                                  ? 'bg-[#be5b40] text-white border-[#be5b40]' 
                                  : 'bg-[#e78468] text-white hover:brightness-105'}
                              `}
                            >
                              {ratio}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 block">Studio Environment</label>
                       <div className="relative">
                          <select 
                              value={selectedBackground}
                              onChange={(e) => setSelectedBackground(e.target.value as BackgroundStyle)}
                              disabled={processingState === 'processing'}
                              className="cursor-pointer w-full text-xs font-medium rounded border-stone-200 focus:border-[#e78468] focus:ring-[#e78468] py-2.5 pl-3 pr-8 bg-stone-50"
                          >
                              {Object.entries(BackgroundStyle).map(([key, value]) => (
                                <option key={key} value={value}>
                                  {value.charAt(0).toUpperCase() + value.slice(1)} Studio
                                </option>
                              ))}
                          </select>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Footer Action */}
              <div className="p-6 bg-stone-50 border-t border-stone-100">
                <button
                  onClick={startGeneration}
                  disabled={images.length === 0 || processingState === 'processing'}
                  className={`
                    cursor-pointer w-full py-4 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2
                    ${processingState === 'processing' 
                       ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none' 
                       : 'bg-[#e78468] text-white hover:brightness-105'}
                  `}
                >
                  {processingState === 'processing' ? (
                    <>
                      <div className="w-3 h-3 border-2 border-stone-400 border-t-stone-600 rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : 'Start Synthesis'}
                </button>
              </div>

            </div>
          </GlobalCard>
        </div>

        {/* TECHNICAL WORKSPACE (RIGHT) - 8 Columns */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-[600px]">
           <GlobalCard className="h-full flex flex-col" contentClassName="flex flex-col bg-[#fbfaf9]">
              
              {/* Toolbar */}
              <div className="h-12 border-b border-stone-200 bg-white px-4 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Family Portrait Studio</span>
                 </div>
                 <div className="text-[10px] font-mono text-stone-300">
                    GEMINI-3-PRO // BRINGBACK AI
                 </div>
              </div>

              {/* Main Canvas Area */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden p-8">
                 
                 {/* Technical Grid Background */}
                 <div className="absolute inset-0 opacity-[0.05]" style={{ 
                     backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                 }}></div>

                 {/* Canvas Content */}
                 <div className="relative z-10 w-full h-full flex items-center justify-center">
                    
                    {/* IDLE STATE: Composition Guide */}
                    {!finalPortrait && processingState === 'idle' && (
                       <div className="text-center w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                          <CompositionGuide ratio={selectedRatio} />
                          <p className="mt-6 text-stone-400 text-xs uppercase tracking-widest font-medium">Waiting for Input</p>
                       </div>
                    )}

                    {/* PROCESSING STATE */}
                    {processingState === 'processing' && (
                        <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-stone-200 shadow-xl">
                            <div className="flex items-center gap-4 mb-6">
                               <div className="relative w-12 h-12 flex items-center justify-center">
                                  <div className="absolute inset-0 border-2 border-stone-100 rounded-full"></div>
                                  <div className="absolute inset-0 border-2 border-t-[#e78468] rounded-full animate-spin"></div>
                               </div>
                               <div>
                                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest">{processingStep}</h3>
                                  <p className="text-xs text-stone-500 font-mono mt-1">Please wait while we process your assets...</p>
                               </div>
                            </div>

                            {/* Detailed Log Stream */}
                            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin">
                               {images.map((img, i) => (
                                  <div key={img.id} className="flex items-center gap-3 text-xs border-b border-stone-50 pb-2 last:border-0">
                                     <span className={`w-1.5 h-1.5 rounded-full ${img.status === 'ready' ? 'bg-green-500' : 'bg-[#e78468] animate-pulse'}`}></span>
                                     <span className="font-mono text-stone-400">IMG_0{i+1}</span>
                                     <span className="text-stone-600 flex-1 truncate">{img.log[img.log.length - 1] || 'Pending...'}</span>
                                     <span className="font-mono text-stone-300">{Math.round(img.progress)}%</span>
                                  </div>
                               ))}
                            </div>
                        </div>
                    )}

                    {/* ERROR STATE */}
                    {processingState === 'error' && (
                        <div className="max-w-md bg-white p-8 rounded border border-red-100 shadow-lg text-center">
                           <div className="w-12 h-12 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                           </div>
                           <h3 className="text-stone-900 font-bold uppercase tracking-widest text-xs mb-2">Process Interrupted</h3>
                           <p className="text-stone-500 text-sm mb-6">{errorMsg}</p>
                           <button onClick={() => setProcessingState('idle')} className="text-xs font-bold text-[#e78468] border-b border-[#e78468] pb-0.5 hover:text-stone-900 hover:border-stone-900 transition-colors">RETURN TO WORKSPACE</button>
                        </div>
                    )}

                    {/* SUCCESS STATE */}
                    {processingState === 'complete' && finalPortrait && (
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                           <div className={`relative shadow-2xl ${selectedRatio === AspectRatio.PORTRAIT ? 'max-h-full' : 'max-w-full'}`}>
                              <img src={finalPortrait} alt="Final Portrait" className="max-h-full max-w-full object-contain block" />
                              
                              {/* Download Overlay on Hover */}
                              <div className="absolute inset-0 bg-stone-900/0 hover:bg-stone-900/10 transition-colors flex items-end justify-center pb-6 opacity-0 hover:opacity-100 duration-300">
                                 <a 
                                   href={finalPortrait} 
                                   download="bringback_portrait.jpg"
                                   className="bg-[#e78468] text-white px-6 py-3 rounded shadow-lg text-xs font-bold uppercase tracking-widest hover:-translate-y-1 transition-transform flex items-center gap-2"
                                 >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                    Save Master File
                                 </a>
                              </div>
                           </div>
                        </div>
                    )}

                 </div>
              </div>
           </GlobalCard>
        </div>
      </div>
      