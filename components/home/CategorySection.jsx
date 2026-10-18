"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import useFetch from "@/utils/hooks/useFetch";
import { CATEGORIES_API } from "@/utils/APIs";

const CategorySection = () => {
    const scrollContainerRef = useRef(null);
    const { data: categories = [], isLoading, error } = useFetch(CATEGORIES_API);
    const spacesUrl = (process.env.NEXT_PUBLIC_SPACES_URL || "").trim();

    const scroll = (direction) => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = direction === "left" ? -350 : 350;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section className="relative py-16 sm:py-20 bg-stone-50 border-b border-stone-200/70 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
                                Curated Departments
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
                            Shop by <span className="font-serif italic font-normal text-emerald-800">Category</span>
                        </h2>
                        <p className="text-sm sm:text-base text-stone-600 max-w-xl font-medium">
                            Explore tailored silhouettes, luxurious knitwear, and handcrafted essentials across our signature collections.
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                        <button
                            onClick={() => scroll("left")}
                            aria-label="Scroll categories left"
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-stone-200 bg-white hover:bg-stone-900 hover:border-stone-900 text-stone-600 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            aria-label="Scroll categories right"
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-stone-200 bg-white hover:bg-stone-900 hover:border-stone-900 text-stone-600 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                        >
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* Categories Slider */}
                {isLoading ? (
                    /* Skeleton Loading State */
                    <div className="flex gap-6 sm:gap-8 overflow-x-hidden pb-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center flex-shrink-0 animate-pulse">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-stone-200 p-1" />
                                <div className="w-20 h-3.5 bg-stone-200 rounded-full mt-3" />
                                <div className="w-12 h-2.5 bg-stone-100 rounded-full mt-1.5" />
                            </div>
                        ))}
                    </div>
                ) : error || categories.length === 0 ? (
                    <div className="py-12 text-center text-stone-500 font-medium">
                        Unable to load categories. Please check back shortly.
                    </div>
                ) : (
                    <div
                        ref={scrollContainerRef}
                        className="flex items-start gap-6 sm:gap-8 lg:gap-10 overflow-x-auto no-scrollbar scroll-smooth pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {categories.map((category) => {
                            const imageSrc = category.image
                                ? (spacesUrl.endsWith("/") ? spacesUrl : spacesUrl + "/") + category.image.replace(/^\//, "")
                                : "/api/placeholder/200/200";

                            return (
                                <Link
                                    key={category._id}
                                    href={`/shop?category=${category._id}`}
                                    className="group flex flex-col items-center flex-shrink-0 snap-start text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
                                >
                                    {/* Circular Card Container */}
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full p-[3px] bg-gradient-to-tr from-stone-200 via-stone-100 to-stone-300 group-hover:from-emerald-500 group-hover:via-teal-400 group-hover:to-emerald-600 transition-all duration-500 shadow-md group-hover:shadow-2xl group-hover:shadow-emerald-900/15">
                                        {/* Inner White Ring */}
                                        <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 border-2 border-white relative">
                                            {/* Image */}
                                            <img
                                                src={imageSrc}
                                                alt={category.name}
                                                className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-700 ease-out"
                                                loading="lazy"
                                            />

                                            {/* Hover Vignette Overlay */}
                                            <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                                    <ArrowUpRight className="w-4 h-4 text-emerald-800" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Label Underneath */}
                                    <span className="mt-3.5 text-xs sm:text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors uppercase tracking-wider max-w-[110px] sm:max-w-[130px] lg:max-w-[140px] truncate">
                                        {category.name}
                                    </span>
                                    {/* <span className="text-[10px] sm:text-[11px] font-medium text-stone-400 group-hover:text-emerald-600 transition-colors">
                                        Explore &rarr;
                                    </span> */}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default CategorySection;
