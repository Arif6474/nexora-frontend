"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, ArrowRight, X } from "lucide-react";

const HERO_SLIDES = [
    {
        id: 1,
        tag: "NEW COLLECTION",
        titleLine1: "Modern",
        titleLine2: "Essentials",
        titleLine3: "for Every You",
        subtitle: "Timeless pieces, modern silhouettes, made to elevate your everyday.",
        primaryCta: { label: "Shop Collection", href: "/shop" },
        secondaryCta: { label: "Watch Film" },
        image: "/images/hero/hero-banner.jpg",
        imageAlt: "Lumière Modern Essentials Collection - Model in camel blazer with sunglasses",
    },
    {
        id: 2,
        tag: "THE EMERALD CAPSULE",
        titleLine1: "Architectural",
        titleLine2: "Elegance",
        titleLine3: "in Silk Satin",
        subtitle: "Pure emerald silk tailoring and architectural fluid silhouettes crafted for refined evenings.",
        primaryCta: { label: "Explore The Capsule", href: "/shop?search=Silk" },
        secondaryCta: { label: "Watch Film" },
        image: "/hero_luxury_fashion_bg.png",
        imageAlt: "Lumière Emerald Capsule - Luxury model in rich emerald silk suit",
    },
    {
        id: 3,
        tag: "AUTUMN EDIT 2026",
        titleLine1: "Sculpted",
        titleLine2: "Silhouettes",
        titleLine3: "in Pure Wool",
        subtitle: "Masterfully tailored trench coats and soft cashmere layers designed for effortless warmth.",
        primaryCta: { label: "Explore Outerwear", href: "/shop?search=Coat" },
        secondaryCta: { label: "Watch Film" },
        image: "/images/hero/dept-women.jpg",
        imageAlt: "Lumière Autumn Edit - Tailored trench coat and neutral essentials",
    },
];

const DEPARTMENT_CARDS = [
    {
        title: "Women",
        href: "/shop?search=Women",
        image: "/images/hero/dept-women.jpg",
        alt: "Women's Collection - Tailored coats and dresses",
    },
    {
        title: "Men",
        href: "/shop?search=Men",
        image: "/images/hero/dept-men.jpg",
        alt: "Men's Collection - Tailored blazers and knitwear",
    },
    {
        title: "Bags",
        href: "/shop?search=Bag",
        image: "/images/hero/dept-bags.jpg",
        alt: "Luxury Handbags - Italian leather shoulder bags",
    },
    {
        title: "Accessories",
        href: "/shop?search=Accessory",
        image: "/images/hero/dept-accessories.jpg",
        alt: "Designer Accessories - Sunglasses and jewelry",
    },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // Auto-advance slides every 7 seconds when not hovered
    useEffect(() => {
        if (isHovered || isVideoModalOpen) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isHovered, isVideoModalOpen]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    };

    const activeSlideData = HERO_SLIDES[currentSlide];

    return (
        <section className="w-full bg-[#fafaf9] pt-0 pb-10 sm:pb-16">
            {/* ==================== FULL-WIDTH MAIN HERO BANNER ==================== */}
            <div
                className="relative w-full overflow-hidden min-h-[560px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[740px] flex items-center select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Slide Images (Edge to Edge Full Width) */}
                {HERO_SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.imageAlt}
                            className={`w-full h-full object-cover object-[75%_center] sm:object-[70%_center] md:object-center transition-transform duration-[8000ms] ease-out ${
                                index === currentSlide ? "scale-105" : "scale-100"
                            }`}
                        />
                    </div>
                ))}

                {/* Editorial Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent sm:from-stone-950/80 sm:via-stone-950/40 sm:to-transparent lg:w-[65%]" />
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/20 sm:hidden" />

                {/* Inner Content Area (Constrained to max-w-7xl container) */}
                <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24">
                    <div className="max-w-2xl flex flex-col justify-center">
                        {/* Eyebrow Tag with Emerald Accent */}
                        <div className="mb-3 sm:mb-4">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                {activeSlideData.tag}
                            </span>
                        </div>

                        {/* Large Editorial Serif Headline */}
                        <h1 className="font-serif text-[42px] sm:text-5xl md:text-6xl lg:text-[72px] font-normal text-white leading-[1.06] tracking-tight mb-4 sm:mb-5 drop-shadow-md">
                            {activeSlideData.titleLine1}
                            <br />
                            {activeSlideData.titleLine2}
                            <br />
                            {activeSlideData.titleLine3}
                        </h1>

                        {/* Subtitle / Description */}
                        <p className="text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-md mb-8 sm:mb-9 drop-shadow-xs">
                            {activeSlideData.subtitle}
                        </p>

                        {/* Dual Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            {/* Primary Button (Emerald Theme) */}
                            <Link
                                href={activeSlideData.primaryCta.href}
                                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shadow-md shadow-emerald-950/30 hover:shadow-lg hover:shadow-emerald-900/40 active:scale-[0.98]"
                            >
                                {activeSlideData.primaryCta.label}
                            </Link>

                            {/* Secondary Button (Watch Film) */}
                            <button
                                type="button"
                                onClick={() => setIsVideoModalOpen(true)}
                                className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 sm:py-4 rounded-lg border border-white/40 hover:border-emerald-400/60 bg-white/10 hover:bg-emerald-950/30 backdrop-blur-xs text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98]"
                            >
                                <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-all">
                                    <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5 group-hover:fill-emerald-300" />
                                </div>
                                <span>{activeSlideData.secondaryCta.label}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slide Navigation Controls (Bottom Right) */}
                <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 lg:right-12 z-30 flex items-center gap-2">
                    {/* Arrow Previous */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 hover:border-emerald-400 bg-black/25 hover:bg-black/50 hover:text-emerald-300 backdrop-blur-xs text-white flex items-center justify-center transition-all active:scale-90"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Arrow Next */}
                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 hover:border-emerald-400 bg-black/25 hover:bg-black/50 hover:text-emerald-300 backdrop-blur-xs text-white flex items-center justify-center transition-all active:scale-90"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Pagination Dots with Emerald Active Indicator */}
                    <div className="flex items-center gap-1.5 ml-2 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/20">
                        {HERO_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`transition-all duration-300 rounded-full ${
                                    i === currentSlide
                                        ? "w-6 h-1.5 bg-emerald-500 shadow-xs shadow-emerald-400/50"
                                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ==================== 4 DEPARTMENT TEASER CARDS ==================== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-7">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {DEPARTMENT_CARDS.map((card) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/5] sm:aspect-[3/4] block cursor-pointer bg-stone-900 shadow-xs hover:shadow-xl transition-all duration-300 border border-transparent hover:border-emerald-500/20"
                        >
                            {/* Card Image with Subtle Zoom on Hover */}
                            <img
                                src={card.image}
                                alt={card.alt}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            {/* Card Bottom Shadow Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                            {/* Card Content (Bottom Aligned) */}
                            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
                                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-normal text-white mb-0.5 tracking-tight drop-shadow-xs">
                                    {card.title}
                                </h3>
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-200 group-hover:text-emerald-300 font-normal transition-all group-hover:translate-x-1">
                                    Shop Now
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:text-emerald-400 transition-colors" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ==================== WATCH FILM VIDEO MODAL ==================== */}
            {isVideoModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                    LUMIÈRE CAMPAIGN FILM
                                </span>
                                <h4 className="font-serif text-lg text-white">Modern Essentials • Season 2026</h4>
                            </div>
                            <button
                                onClick={() => setIsVideoModalOpen(false)}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Video Container */}
                        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                            <video
                                autoPlay
                                controls
                                playsInline
                                className="w-full h-full object-cover"
                                poster="/images/hero/hero-banner.jpg"
                            >
                                <source
                                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Hero;
