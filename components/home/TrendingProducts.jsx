"use client";

import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Sparkles, ArrowRight, Play, Pause, Flame } from "lucide-react";
import ProductCard from "../shop/ProductCard";
import { allProducts } from "@/app/data/products";
import Link from "next/link";

const TrendingProducts = ({ onQuickView, products = [] }) => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isPaused, setIsPaused] = useState(false);
    const sectionRef = useRef(null);

    // Dynamic mouse spotlight
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100
            });
        };
        const el = sectionRef.current;
        if (el) {
            el.addEventListener("mousemove", handleMouseMove);
            return () => el.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    // Product source resolution with fallback
    const rawProducts = (products && products.length > 0) ? products : allProducts;

    // Ensure enough products for a seamless looping track across wide screens (min 8 items)
    let displayProducts = [...(rawProducts || [])];
    if (displayProducts.length > 0) {
        while (displayProducts.length < 8) {
            displayProducts = [...displayProducts, ...rawProducts];
        }
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-24 sm:py-32 bg-stone-950 overflow-hidden text-stone-100 select-none"
        >
            {/* Dynamic Interactive Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none opacity-25 transition-all duration-500 ease-out"
                style={{
                    background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.05) 40%, transparent 80%)`
                }}
            />

            {/* Ambient Background Glowing Orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 -right-32 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

            {/* Kinetic Watermark Ribbon */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none opacity-[0.03] select-none overflow-hidden whitespace-nowrap">
                <div className="text-[18vw] font-black uppercase tracking-tighter text-white inline-block animate-watermark">
                    NEXORA SELECTION • TRENDING MOMENTUM • COUTURE • LIMITED EDITIONS •
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 mb-12 sm:mb-16">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        {/* Eyebrow Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-1.5">
                                <Flame className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                                Trending Laboratory
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                            Trending <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-400">Products</span>
                        </h2>
                    </div>

                    {/* Right Controls & Actions */}
                    <div className="flex flex-wrap items-center gap-4 self-start md:self-end">

                        {/* View All CTA */}
                        <Link
                            href="/shop"
                            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-950 font-black text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10 cursor-pointer"
                        >
                            <span>Explore Vault</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Marquee Track Container */}
            <div
                className="marquee-container relative w-full overflow-hidden py-4 group/marquee select-auto"
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* Left & Right Smooth Edge Fade Masks */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent z-20" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-stone-950 via-stone-950/80 to-transparent z-20" />

                {/* Animated Flex Track */}
                <div
                    className={`animate-marquee-horizontal flex ${isPaused ? "is-paused" : ""}`}
                >
                    {/* Track Segment 1 */}
                    <div className="flex gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
                        {displayProducts.map((product, idx) => (
                            <div
                                key={`track1-${product._id || product.id || idx}-${idx}`}
                                className="w-[280px] sm:w-[320px] shrink-0 group/card transition-transform duration-300 hover:-translate-y-2"
                            >
                                {/* Micro Ranking Header */}
                                <div className="flex items-center justify-between mb-2.5 px-2 text-[10px] font-black uppercase tracking-widest text-stone-500">
                                    <span className="flex items-center gap-1.5 text-emerald-400">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Rank #{String((idx % rawProducts.length) + 1).padStart(2, "0")}</span>
                                    </span>
                                    <span className="text-stone-500 font-mono text-[9px] bg-stone-900 border border-stone-800 px-2 py-0.5 rounded-full">
                                        TRENDING
                                    </span>
                                </div>

                                <ProductCard
                                    product={product}
                                    onQuickView={onQuickView}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Track Segment 2 (Exact Clone for Seamless Infinite Loop) */}
                    <div className="flex gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
                        {displayProducts.map((product, idx) => (
                            <div
                                key={`track2-${product._id || product.id || idx}-${idx}`}
                                className="w-[280px] sm:w-[320px] shrink-0 group/card transition-transform duration-300 hover:-translate-y-2"
                            >
                                {/* Micro Ranking Header */}
                                <div className="flex items-center justify-between mb-2.5 px-2 text-[10px] font-black uppercase tracking-widest text-stone-500">
                                    <span className="flex items-center gap-1.5 text-emerald-400">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Rank #{String((idx % rawProducts.length) + 1).padStart(2, "0")}</span>
                                    </span>
                                    <span className="text-stone-500 font-mono text-[9px] bg-stone-900 border border-stone-800 px-2 py-0.5 rounded-full">
                                        TRENDING
                                    </span>
                                </div>

                                <ProductCard
                                    product={product}
                                    onQuickView={onQuickView}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Editorial Footer Strip */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24 relative z-10">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent mb-12" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                    {[
                        { title: "Curated Daily", desc: "Selected by editorial tastemakers" },
                        { title: "Limited Allocations", desc: "Small-batch craftsmanship" },
                        { title: "Carbon Neutral", desc: "Worldwide express dispatch" },
                        { title: "Bespoke Packaging", desc: "Signature unboxing experience" },
                    ].map((item, i) => (
                        <div key={i} className="space-y-1">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-stone-300">
                                {item.title}
                            </h4>
                            <p className="text-[11px] text-stone-500 font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee-scroll {
                    0% {
                        transform: translate3d(0, 0, 0);
                    }
                    100% {
                        transform: translate3d(-50%, 0, 0);
                    }
                }

                .animate-marquee-horizontal {
                    display: flex;
                    width: max-content;
                    animation: marquee-scroll 45s linear infinite;
                    will-change: transform;
                }

                .marquee-container:hover .animate-marquee-horizontal,
                .animate-marquee-horizontal:hover,
                .animate-marquee-horizontal.is-paused {
                    animation-play-state: paused !important;
                }

                @keyframes watermark-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .animate-watermark {
                    animation: watermark-scroll 75s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default TrendingProducts;
