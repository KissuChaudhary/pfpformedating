"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${isOpen
                ? 'bg-[#080808] border-foreground/10'
                : scrolled
                    ? 'bg-[#080808]/95 backdrop-blur-md border-foreground/10'
                    : 'bg-[#080808] border-foreground/10 md:bg-transparent md:border-transparent'
                }`}
        >
            <div className="flex justify-between items-center h-16 px-6 md:px-12 relative z-50">
                {/* Logo Section */}
                <Link href="/">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center w-5 h-5 border border-accent/30 group-hover:border-accent transition-colors">
                            <div className="w-1.5 h-1.5 bg-accent animate-pulse shadow-[0_0_8px_rgba(255,77,0,0.5)]"></div>
                            {/* Corner ticks */}
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-foreground/50"></div>
                            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-foreground/50"></div>
                        </div>
                        <span className="font-display font-bold text-lg md:text-xl tracking-tight uppercase text-foreground">
                            UnrealShot AI
                        </span>
                    </div>
                </Link>


                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-12">
                    {[
                        { name: 'About', href: '/about' },
                        { name: 'Blog', href: '/blog' },
                        { name: 'Pricing', href: '/pricing' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative font-mono text-xs uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors group py-2"
                        >
                            <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-accent font-bold translate-x-2 group-hover:translate-x-0">
                                /
                            </span>
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="h-4 w-[1px] bg-foreground/10"></div>
                    <a href="/login" className="font-mono text-xs uppercase text-foreground/60 hover:text-accent transition-colors">Login</a>
                    <Link href="/login">
                        <Button size="sm" className="bg-accent text-background hover:bg-white hover:text-black border-0 shadow-[0_0_15px_rgba(255,77,0,0.2)]">
                            Start Roll
                        </Button>
                    </Link>
                </div>

                {/* Mobile Actions & Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    {/* Mobile CTA (Mini) - Visible on Navbar */}
                    <button className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-accent text-background border border-accent hover:bg-white hover:text-black hover:border-white transition-colors">
                        Generate
                    </button>

                    {/* Hamburger / Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex flex-col justify-center items-end gap-[5px] w-8 h-8 group p-1"
                        aria-label="Toggle Menu"
                    >
                        <span className={`h-[2px] bg-foreground transition-all duration-300 origin-center ${isOpen ? 'w-6 rotate-45 translate-y-[3.5px]' : 'w-6'}`}></span>
                        <span className={`h-[2px] bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4 group-hover:w-6'}`}></span>
                        <span className={`h-[2px] bg-foreground transition-all duration-300 origin-center ${isOpen ? 'w-6 -rotate-45 -translate-y-[3.5px]' : 'w-6'}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#080808] z-40 flex flex-col pt-28 px-6 transition-all duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
            >

                {/* Background Grid for Mobile Menu */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#EBEBEB 1px, transparent 1px), linear-gradient(90deg, #EBEBEB 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="flex flex-col gap-6 relative z-10 h-full">
                    {[
                        { name: 'About', href: '/about' },
                        { name: 'Blog', href: '/blog' },
                        { name: 'Pricing', href: '/pricing' },
                        { name: 'Login', href: '/login' },
                    ].map((item, i) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="font-display text-5xl font-bold uppercase text-foreground/40 hover:text-foreground transition-all duration-300 flex items-baseline gap-4 group"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">0{i + 1}</span>
                            {item.name}
                        </Link>
                    ))}

                    <div className="mt-auto mb-12 space-y-6">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button size="lg" className="w-full text-center justify-center">
                                Start Your Roll ($9.99)
                            </Button>
                        </Link>

                        <div className="flex justify-between font-mono text-[10px] text-foreground/30 border-t border-foreground/10 pt-6">
                            <span>SYS_STATUS: ONLINE</span>
                            <span>V2.0.4 MOBILE_VIEW</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};