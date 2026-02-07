"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, MoveDown } from "lucide-react";

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        setIsLoaded(true);
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center overflow-hidden bg-stone-900"
        >
            {/* Immersive Background Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero_luxury_fashion_bg.png"
                    alt="Luxury Fashion Hero"
                    className={`w-full h-full object-cover object-center transition-transform duration-[3000ms] ease-out ${isLoaded ? 'scale-110' : 'scale-125'}`}
                    style={{
                        transform: `scale(${isLoaded ? 1.1 : 1.25}) translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`
                    }}
                />
                {/* Dynamic Gradient Depth */}
                <div className="absolute inset-0 bg-linear-to-r from-stone-950 via-stone-900/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-stone-950/30 z-10" />

                {/* Kinetic Ghost Typography */}
                <div
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none opacity-[0.03] select-none z-20"
                    style={{
                        transform: `translate(${mousePos.x}px, ${mousePos.y}px) translateY(-50%) rotate(-5deg)`
                    }}
                >
                    <span className="text-[30vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
                        NEXORA • GENESIS
                    </span>
                </div>
            </div>

            {/* Content Core */}
            <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">

                    {/* Primary Content (Left) */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 self-start transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Season 01 • The Nexus Collection</span>
                        </div>

                        {/* Headline Matrix */}
                        <h1 className="flex flex-col mb-10">
                            <span className={`text-2xl sm:text-3xl font-serif italic text-emerald-400 mb-4 transition-all duration-1000 delay-100 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                                Redefine your
                            </span>
                            <span className={`text-6xl sm:text-8xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter transition-all duration-1000 delay-200 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                ARCHITECTURAL <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-emerald-100 to-stone-400">ELEGANCE</span>
                            </span>
                        </h1>

                        {/* Description Reveal */}
                        <p className={`max-w-xl text-lg sm:text-xl text-stone-400 font-medium leading-relaxed mb-14 transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            Where algorithmic precision meets the soul of craftsmanship. <br />
                            Nexora is a dialogue between form and modern function.
                        </p>

                        {/* Action Suite */}
                        <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-6 transition-all duration-1000 delay-400 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <Link
                                href="/shop"
                                className="group relative px-10 py-6 bg-emerald-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl overflow-hidden transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-emerald-900/40 text-center"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Access Collection
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <button className="group relative px-8 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-white font-black uppercase tracking-widest text-xs transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 overflow-hidden">
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-600/20 group-hover:scale-110 transition-all">
                                        <Play className="w-4 h-4 fill-white" />
                                    </div>
                                    The Manifesto
                                </span>
                                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/50 w-0 group-hover:w-full transition-all duration-500" />
                            </button>
                        </div>
                    </div>

                    {/* Secondary Context (Right - Visual Stats) */}
                    <div className="lg:col-span-4 hidden lg:flex flex-col items-end gap-16">
                        <div className={`text-right group transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                            <p className="text-5xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors tracking-tighter">25K+</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 leading-none">Global Curations</p>
                        </div>
                        <div className={`text-right group transition-all duration-1000 delay-600 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                            <p className="text-5xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors tracking-tighter">4.9</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 leading-none">Trust Factor</p>
                        </div>
                        <div className={`text-right group transition-all duration-1000 delay-700 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                            <div className="inline-flex items-center gap-2 mb-2">
                                <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
                                <p className="text-5xl font-black text-white tracking-tighter">FAST</p>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 leading-none">Global Distribution</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kinetic Scroll Anchor */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-30 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                    <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30 group-hover:text-emerald-400 transition-colors">Discover Abyss</span>
                    <div className="w-px h-24 bg-linear-to-b from-emerald-500 via-emerald-500/20 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
                    </div>
                    <MoveDown className="w-4 h-4 text-emerald-500 group-hover:translate-y-2 transition-transform" />
                </div>
            </div>

            {/* Vignette & Grain */}
            <div className="absolute inset-0 z-40 pointer-events-none bg-radial-vignette opacity-50" />
            <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-grain" />

            <style jsx global>{`
                @keyframes scroll-line {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scroll-line {
                    animation: scroll-line 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                .bg-radial-vignette {
                    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
                }
                .bg-grain {
                    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
                }
            `}</style>
        </section>
    );
};

export default Hero;
