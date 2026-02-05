"use client";

import { X, ShoppingCart, Star, Heart, Maximize2, Plus, Minus } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showError, setShowError] = useState(false);
    const [mainImage, setMainImage] = useState(product?.image || "");

    // Update mainImage when product changes or modal opens
useEffect(() => {
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
                        {product.description || "Elevate your everyday style with this premium piece from Nexora. Crafted with unparalleled attention to detail."}
                    </p>

                    <div className="space-y-6">
                        {/* Color selection */}
                        <div className={`transition-all duration-300 ${showError && !selectedColor ? "p-3 bg-red-50 rounded-2xl ring-2 ring-red-500/10" : ""}`}>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400">Color</h3>
                                {showError && !selectedColor && <span className="text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">Required</span>}
                            </div>
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
                        <div className={`transition-all duration-300 ${showError && !selectedSize ? "p-3 bg-red-50 rounded-2xl ring-2 ring-red-500/10" : ""}`}>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400">Size</h3>
                                {showError && !selectedSize && <span className="text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">Required</span>}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`py-2 text-xs font-black rounded-xl border-2 transition-all ${selectedSize === s ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-stone-100 text-stone-500 hover:border-stone-200"}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-stone-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-1 min-w-[100px]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-black text-stone-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    if (!selectedSize || !selectedColor) {
                                        setShowError(true);
                                        setTimeout(() => setShowError(false), 2000);
                                        return;
                                    }
                                    addToCart(product, selectedSize, selectedColor, quantity);
                                }}
                                className={`flex-1 py-4 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 ${showError && (!selectedSize || !selectedColor) ? "bg-red-500 shadow-red-500/20" : "bg-stone-900 shadow-stone-900/20 hover:bg-emerald-700"}`}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {showError && (!selectedSize || !selectedColor) ? "Select Options" : "Add To Basket"}
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={`flex-1 h-12 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${wishlisted ? "border-emerald-600 bg-emerald-50 text-emerald-600" : "border-stone-100 text-stone-400 hover:border-stone-200"}`}
                            >
                                <Heart className={`w-4 h-4 ${wishlisted ? "fill-emerald-600" : ""}`} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Wishlist</span>
                            </button>
                            <Link
                                href={`/product/${product.id}`}
                                onClick={onClose}
                                className="flex-1 h-12 rounded-xl border-2 border-stone-100 flex items-center justify-center gap-2 text-stone-400 hover:text-stone-900 transition-all"
                            >
                                <Maximize2 className="w-4 h-4" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Details</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
