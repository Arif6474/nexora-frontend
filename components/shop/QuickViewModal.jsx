"use client";

import React, { useState } from "react";
import { X, ShoppingCart, Star, Heart, Maximize2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [mainImage, setMainImage] = useState(product?.image || "");

    // Update mainImage when product changes or modal opens
    React.useEffect(() => {
        if (product) setMainImage(product.image);
    }, [product]);

    if (!isOpen || !product) return null;

    const productImages = product.images || [product.image];

    const wishlisted = isInWishlist(product.id);
    const sizes = ["S", "M", "L", "XL"];
    const colors = [
        { name: "Black", hex: "#000000" },
        { name: "Emerald", hex: "#10B981" },
        { name: "Stone", hex: "#78716C" },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-stone-100 flex items-center justify-center text-stone-900 hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Image Side */}
                <div className="w-full md:w-1/2 flex flex-col bg-stone-100">
                    <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                        {product.badge && (
                            <div className="absolute top-6 left-6 px-4 py-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                                {product.badge}
                            </div>
                        )}
                    </div>

                    {/* Gallery Thumbnails */}
                    {productImages.length > 1 && (
                        <div className="p-4 grid grid-cols-4 gap-2 bg-white">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? "border-emerald-600 scale-95" : "border-transparent opacity-60 hover:opacity-100"}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Product Details Side */}
                <div className="w-full md:w-1/2 p-8 sm:p-10 overflow-y-auto no-scrollbar">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                            <span>{product.category}</span>
                            <span className="text-stone-300">•</span>
                            <span>{product.brand}</span>
                        </div>
                        <h2 className="text-3xl font-black text-stone-900 leading-tight mb-4 uppercase">
                            {product.name}
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">{product.reviews} Reviews</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-3 mb-8">
                        <span className="text-3xl font-black text-emerald-700">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-lg font-bold text-stone-400 line-through">${product.originalPrice}</span>
                        )}
                    </div>

                    <p className="text-stone-500 font-medium leading-relaxed mb-8 text-sm">
                        Elevate your everyday style with this premium piece from Nexora. Crafted with unparalleled attention to detail and designed for the modern individual who values both aesthetics and quality.
                    </p>

                    {/* Color selection */}
                    <div className="mb-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Color</h3>
                        <div className="flex gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => setSelectedColor(c.name)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-emerald-600 scale-110" : "border-transparent"}`}
                                    style={{ backgroundColor: c.hex }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size selection */}
                    <div className="mb-8">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Size</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    className={`py-2 text-xs font-black rounded-xl border-2 transition-all ${selectedSize === s ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-black" : "border-stone-100 text-stone-500 hover:border-stone-200"}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
                        <button className="flex-1 py-4 bg-stone-900 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-stone-900/10 flex items-center justify-center gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${wishlisted ? "border-emerald-600 bg-emerald-50 text-emerald-600" : "border-stone-100 text-stone-400 hover:border-stone-200"}`}
                            >
                                <Heart className={`w-5 h-5 ${wishlisted ? "fill-emerald-600" : ""}`} />
                            </button>
                            <Link
                                href={`/product/${product.id}`}
                                onClick={onClose}
                                className="w-14 h-14 rounded-2xl border-2 border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
