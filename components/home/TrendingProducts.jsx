"use client";

import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Sparkles, ChevronRight, ArrowUpRight, Zap } from "lucide-react";
import ProductCard from "../shop/ProductCard";
import { allProducts } from "@/app/data/products";
import Link from "next/link";

const TrendingProducts = ({ onQuickView }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    // Curated trending products with editorial metadata
    const trendingConfigs = [
        { id: 1, rank: "01", scale: "scale-105", offset: "-translate-y-8" },
        { id: 2, rank: "02", scale: "scale-90", offset: "translate-y-12" },
        { id: 21, rank: "03", scale: "scale-100", offset: "-translate-y-4" },
        { id: 17, rank: "04", scale: "scale-110", offset: "translate-y-6" },
        { id: 22, rank: "05", scale: "scale-95", offset: "-translate-y-10" },
        { id: 4, rank: "06", scale: "scale-105", offset: "translate-y-16" },
    ];

    const trendingProducts = trendingConfigs.map(config => ({
        ...allProducts.find(p => p.id === config.id),
        ...config
    }));

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-40 bg-stone-950 overflow-hidden"
        >
            {/* Dynamic Spotlight Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-300"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`
                }}
            />

            {/* Kinetic Marquee Ribbon */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none opacity-3 select-none rotate-[-5deg] overflow-hidden whitespace-nowrap">
                <div className="text-[25vw] font-black uppercase tracking-tighter animate-marquee inline-block text-white">
                    Nexora Elite • Trending Now • Luxury Drops • Nexora Elite • Trending Now • Luxury Drops •
                </div>
            </div>

            {/* Floating Glass Shards */}
            <div className="absolute top-20 right-[10%] w-64 h-64 bg-emerald-500/10 backdrop-blur-3xl rounded-[60px] border border-white/5 rotate-12 animate-float" />
            <div className="absolute bottom-20 left-[5%] w-48 h-48 bg-amber-500/5 backdrop-blur-2xl rounded-[40px] border border-white/5 -rotate-12 animate-float-delayed" />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                {/* High-Impact Header */}
                <div className="flex flex-col items-center text-center mb-32">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 animate-bounce-subtle">
                        <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">The Pulse of Luxury</span>
                    </div>

                    <h2 className="text-7xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase mb-12">
                        Trend <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-white to-emerald-600 animate-gradient-text">Laboratory</span>
                    </h2>

                    <p className="text-stone-400 font-medium text-lg sm:text-xl max-w-2xl leading-relaxed mb-12">
                        Real-time editorial drops designed for the top 1%. <br className="hidden sm:block" />
                        Where algorithmic precision meets haute couture.
                    </p>

                    <Link
                        href="/shop"
                        className="group relative inline-flex items-center gap-6 px-12 py-6 bg-white rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/10"
                    >
                        <span className="relative z-10 text-stone-900 font-black uppercase tracking-widest text-xs">Access Full Vault</span>
                        <div className="relative z-10 w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors">
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-r from-emerald-50 via-white to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>

                {/* Kinetic Depth Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {trendingProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            className={`group relative animate-kinetic-entry`}
                            style={{ animationDelay: `${idx * 200}ms` }}
                        >
                            {/* Number Backdrop */}
                            <div className="absolute -top-16 -right-4 text-[120px] font-black text-white/3 italic group-hover:text-emerald-500/10 transition-colors duration-700 pointer-events-none">
                                {product.rank}
                            </div>

                            {/* Product Container with Depth */}
                            <div className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4 ${product.scale} ${product.offset}`}>
                                <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <ProductCard
                                    product={product}
                                    onQuickView={onQuickView}
                                />

                                {/* Interactive Tag */}
                                <div className="absolute -bottom-4 right-6 px-4 py-2 bg-stone-900 border border-white/10 rounded-xl shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-widest">High Demand</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Interactive Scroller Footer */}
                <div className="mt-48 flex flex-col items-center">
                    <div className="w-full h-px bg-linear-to-r from-transparent via-stone-800 to-transparent mb-16" />
                    <div className="flex items-center gap-12 sm:gap-24 opacity-40">
                        {["Curated", "Premium", "Global", "Elite"].map((text, i) => (
                            <span key={i} className="text-[10px] font-black text-stone-500 uppercase tracking-[0.5em] hover:text-emerald-500 transition-colors cursor-crosshair">
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(12deg); }
                    50% { transform: translate(-20px, -20px) rotate(15deg); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translate(0, 0) rotate(-12deg); }
                    50% { transform: translate(20px, 20px) rotate(-15deg); }
                }
                .animate-float-delayed {
                    animation: float-delayed 10s ease-in-out infinite;
                }
                @keyframes gradient-text {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-text {
                    background-size: 200% auto;
                    animation: gradient-text 5s ease infinite;
                }
                @keyframes kinetic-entry {
                    from { 
                        opacity: 0; 
                        transform: translateY(60px) scale(0.9); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                .animate-kinetic-entry {
                    animation: kinetic-entry 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                    opacity: 0;
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default TrendingProducts;
