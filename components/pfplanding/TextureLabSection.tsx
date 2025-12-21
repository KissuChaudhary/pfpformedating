"use client"
import type React from "react"
import { useState, useRef, type MouseEvent } from "react"

export const TextureLabSection: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [showMagnifier, setShowMagnifier] = useState(false)
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
    const imgRef = useRef<HTMLImageElement>(null)

    // Function to handle mouse movement over the image
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return

        const { left, top, width, height } = imgRef.current.getBoundingClientRect()

        // Update image size state if it changes (responsive)
        if (width !== imgSize.width || height !== imgSize.height) {
            setImgSize({ width, height })
        }

        // Calculate relative position (0 to 1)
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setPosition({ x, y })
    }

    const imgUrl = "/zoom.png"
    const ZOOM_LEVEL = 3
    const MAGNIFIER_SIZE = 200 // px

    return (
        <section className="py-24 border-b border-foreground/10 bg-[#080808]">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Visual Side (The Lab) */}
                <div className="order-2 md:order-1">
                    <div
                        className="relative overflow-hidden cursor-none border border-foreground/10 group"
                        onMouseEnter={() => setShowMagnifier(true)}
                        onMouseLeave={() => setShowMagnifier(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            ref={imgRef}
                            src={imgUrl || "/placeholder.svg"}
                            alt="Texture Inspection"
                            className="w-full h-auto object-cover"
                            onLoad={(e) => {
                                const target = e.currentTarget
                                setImgSize({ width: target.width, height: target.height })
                            }}
                        />

                        {/* Default Overlay Prompt */}
                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${showMagnifier ? "opacity-0" : "opacity-100"}`}
                        >
                            <div className="bg-black/80 backdrop-blur border border-foreground/20 px-4 py-2">
                                <span className="font-mono text-xs text-accent animate-pulse uppercase tracking-widest">
                                    <span className="md:hidden">[ Tap to Inspect Texture ]</span>
                                    <span className="hidden md:inline">[ Hover to Inspect Texture ]</span>
                                </span>
                            </div>
                        </div>

                        {/* The Magnifier Loupe */}
                        {showMagnifier && (
                            <div
                                className="absolute border-2 border-accent rounded-full pointer-events-none bg-black overflow-hidden z-20 shadow-2xl"
                                style={{
                                    top: `${position.y * 100}%`,
                                    left: `${position.x * 100}%`,
                                    width: `${MAGNIFIER_SIZE}px`,
                                    height: `${MAGNIFIER_SIZE}px`,
                                    transform: "translate(-50%, -50%)",
                                    // The background logic:
                                    backgroundImage: `url(${imgUrl})`,
                                    backgroundRepeat: "no-repeat",
                                    // 1. Scale the background image
                                    backgroundSize: `${imgSize.width * ZOOM_LEVEL}px ${imgSize.height * ZOOM_LEVEL}px`,
                                    // 2. Position it so the point under cursor is centered
                                    // Formula: Center_of_Loupe - (Relative_Cursor_Pos * Scaled_Image_Size)
                                    backgroundPositionX: `${MAGNIFIER_SIZE / 2 - position.x * imgSize.width * ZOOM_LEVEL}px`,
                                    backgroundPositionY: `${MAGNIFIER_SIZE / 2 - position.y * imgSize.height * ZOOM_LEVEL}px`,
                                }}
                            >
                                {/* Reticle / HUD inside loupe */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-1 h-4 bg-accent/50"></div>
                                    <div className="h-1 w-4 bg-accent/50 absolute"></div>
                                </div>
                                <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                                    <span className="text-[9px] font-mono text-accent bg-black/50 px-1">MAG: 300%</span>
                                </div>
                            </div>
                        )}

                        {/* Technical Readout */}
                        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-foreground/50 hidden md:block">
                            RES: 4K (24MP) <br />
                            GRAIN_DENSITY: HIGH <br />
                            SMOOTHING: 0%
                        </div>
                    </div>
                </div>

                {/* Copy Side */}
                <div className="order-1 md:order-2">
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8 leading-[0.9]">
                        Pixel Peepers <br />
                        <span className="text-transparent stroke-text">Welcome.</span>
                    </h2>

                    <p className="font-mono text-foreground/70 mb-8 text-sm md:text-base leading-relaxed">
                        Most AI generators fall apart at 100% crop. The eyes get weird, the skin turns into plastic.
                        <br />
                        <br />
                        We invite you to <strong className="text-white">zoom in</strong>. Inspect the pores, the film grain, and the
                        iris details. Our engine renders texture, not just shapes.
                    </p>

                    <div className="grid grid-cols-2 gap-6 border-t border-foreground/10 pt-8">
                        <div>
                            <h4 className="font-mono text-accent text-xs mb-2 uppercase">No Plastic Skin</h4>
                            <p className="font-mono text-[10px] text-foreground/50">
                                We preserve micro-contrast and skin imperfections for realism.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-mono text-accent text-xs mb-2 uppercase">Real Film Grain</h4>
                            <p className="font-mono text-[10px] text-foreground/50">
                                Procedural grain simulation based on Kodak 35mm film stocks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}