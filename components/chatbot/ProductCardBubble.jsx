"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProductCardBubble({ product }) {
    if (!product) return null;

    const spacesUrl = process.env.NEXT_PUBLIC_SPACES_URL || "";
    const rawImage = product.image || "";
    const imageUrl = rawImage.startsWith("http")
        ? rawImage
        : (spacesUrl ? `${spacesUrl.replace(/\/$/, '')}/${rawImage.replace(/^\//, '')}` : rawImage);

    return (
        <div className="group bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all overflow-hidden flex flex-col sm:flex-row w-full max-w-sm my-2">
            {/* Image preview */}
            <div className="relative w-full sm:w-28 h-32 sm:h-auto bg-stone-100 flex-shrink-0 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <Sparkles className="w-6 h-6 text-stone-300" />
                    </div>
                )}
                {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-full uppercase">
                        -{product.discount}%
                    </span>
                )}
            </div>

            {/* Product details */}
            <div className="p-3.5 flex flex-col justify-between flex-1 min-w-0">
                <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider truncate">
                            {product.brand || product.category}
                        </span>
                        {product.inStock ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> In Stock
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-md">
                                <AlertCircle className="w-2.5 h-2.5" /> Out of Stock
                            </span>
                        )}
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {product.title}
                    </h4>
                </div>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-stone-100">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-stone-900">
                            ${product.finalPrice || product.price}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-[10px] font-medium text-stone-400 line-through">
                                ${product.price}
                            </span>
                        )}
                    </div>

                    <Link
                        href={product.link || `/product/${product.slug || product.id}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg transition-colors"
                    >
                        View <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
