import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen sm:h-[92vh] flex items-center overflow-hidden bg-stone-100">
            {/* Background Image Wrapper */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero_luxury_fashion_bg.png"
                    alt="Luxury Fashion Hero"
                    className="w-full h-full object-cover object-center animate-fade-in-slow scale-105"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-linear-to-r from-stone-900/40 via-stone-900/10 to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/20 to-transparent z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full">
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">New Collection 2026</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 sm:mb-8 animate-fade-in-up delay-100">
                        ELEVATE YOUR <br />
                        <span className="text-emerald-400">SIGNATURE</span> STYLE
                    </h1>

                    {/* Description */}
                    {/* <p className="text-base sm:text-lg lg:text-xl text-stone-200 font-medium mb-8 sm:mb-12 max-w-lg leading-relaxed animate-fade-in-up delay-150">
                        Discover the intersection of minimalism and luxury. Our curated pieces are crafted for those who redefine modern elegance.
                    </p> */}

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 animate-fade-in-up delay-200">
                        <Link
                            href="/collections"
                            className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-emerald-700 text-white font-black uppercase tracking-widest text-xs sm:text-sm rounded-2xl overflow-hidden transition-all hover:bg-emerald-800 hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-900/20 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Shop Collection
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        <button className="group flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black uppercase tracking-widest text-xs sm:text-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                            </div>
                            The Experience
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Stats/Info Bar */}
            <div className="absolute bottom-6 sm:bottom-20 left-0 right-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex flex-wrap items-center gap-6 sm:gap-12 pt-6 sm:pt-12 border-t border-white/10">
                        <div className="animate-fade-in-up delay-300">
                            <p className="text-xl sm:text-2xl font-black text-white">25k+</p>
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-400">Active Curations</p>
                        </div>
                        <div className="animate-fade-in-up delay-400">
                            <p className="text-xl sm:text-2xl font-black text-white">4.9/5</p>
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-400">Customer Rating</p>
                        </div>
                        <div className="animate-fade-in-up delay-500">
                            <p className="text-xl sm:text-2xl font-black text-emerald-400">Free</p>
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-400">Worldwide Shipping</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
                    <div className="w-1 h-2 bg-emerald-500 rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
