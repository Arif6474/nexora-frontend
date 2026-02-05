"use client";

import React, { useRef } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Eye, Heart } from "lucide-react";
import { allProducts } from "@/app/data/products";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

const NewArrivals = ({ onQuickView }) => {
    const scrollContainerRef = useRef(null);
    const { toggleWishlist, isInWishlist } = useWishlist();

    // Curated new arrivals (IDs 13, 14, 15, 16, 21, 22)
    const arrivalIds = [13, 14, 15, 16, 21, 22];
    const products = allProducts.filter(p => arrivalIds.includes(p.id));

    const scroll = (direction) => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = direction === "left" ? -400 : 400;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section className="relative py-32 bg-stone-50 overflow-hidden">
            {/* Minimalist Accents */}
            <div className="absolute top-0 left-0 w-full h-px bg-stone-200" />

            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                {/* Clean Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-px bg-stone-900" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">The Studio Collection</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl font-serif italic text-stone-900 leading-tight tracking-tighter">
                            Latest <span className="font-sans normal-case not-italic font-black text-emerald-800">Additions</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-all active:scale-90"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-all active:scale-90"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Film Strip Scroller */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory"
                >
                    {products.map((product, idx) => (
                        <div
                            key={product.id}
                            className="relative min-w-[300px] sm:min-w-[400px] aspect-4/5 group snap-start overflow-hidden rounded-[40px] bg-white border border-stone-100 shadow-xl shadow-stone-200/50"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Actions (Wishlist & Quick View) */}
                            <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all transform -translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500 border ${isInWishlist(product.id)
                                        ? "bg-stone-900 border-stone-900 text-white"
                                        : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-stone-900"
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                                </button>
                                <button
                                    onClick={() => onQuickView(product)}
                                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all transform -translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500 delay-75"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Magazine Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-3 h-3 text-emerald-400" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Newly Sourced</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-4">
                                        {product.name}
                                    </h3>
                                    <div className="flex justify-between items-end">
                                        <span className="text-2xl font-serif italic text-white">${product.price}</span>
                                        <Link
                                            href={`/product/${product.id}`}
                                            className="px-6 py-3 bg-white text-stone-900 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-emerald-600 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 opacity-0 group-hover:opacity-100"
                                        >
                                            View Piece
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Rank Badge */}
                            <div className="absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-[10px]">
                                {idx + 1}
                            </div>
                        </div>
                    ))}

                    {/* Final "View All" Card */}
                    <div className="min-w-[300px] sm:min-w-[400px] aspect-4/5 flex flex-col items-center justify-center bg-emerald-800 rounded-[40px] relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                        </div>
                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter text-center mb-8 relative z-10 px-8">
                            Browse Entire Collection
                        </h3>
                        <Link
                            href="/shop"
                            className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-emerald-800 transition-all hover:scale-110 active:scale-95 group-hover:rotate-12"
                        >
                            <ArrowRight className="w-8 h-8" />
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default NewArrivals;
