"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ChevronRight,
    Star,
    ShoppingCart,
    Heart,
    ShieldCheck,
    Truck,
    ArrowLeftRight,
    Minus,
    Plus,
    Share2
} from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { allProducts } from "../../data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [mainImage, setMainImage] = useState("");
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [showError, setShowError] = useState(false);

    const product = useMemo(() => {
        return allProducts.find((p) => p.id.toString() === id);
    }, [id]);

    useEffect(() => {
        if (product) setMainImage(product.image);
    }, [product]);

    const productImages = useMemo(() => {
        if (!product) return [];
        return product.images || [product.image];
    }, [product]);

    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return allProducts
            .filter((p) => p.category === product.category && p.id !== product.id)
            .concat(allProducts.filter(p => p.category !== product.category)) // Add more for better sliding
            .slice(0, 8);
    }, [product]);

    useEffect(() => {
        if (!sliderRef.current || isPaused) return;

        const interval = setInterval(() => {
            if (sliderRef.current) {
                const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
                if (sliderRef.current.scrollLeft >= maxScroll - 1) {
                    sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, relatedProducts]);

    if (!product) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-stone-900 mb-4">Product Not Found</h1>
                    <Link href="/shop" className="text-emerald-600 font-bold hover:underline">
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const sizes = ["S", "M", "L", "XL", "XXL"];
    const colors = [
        { name: "Black", hex: "#000000" },
        { name: "Emerald", hex: "#10B981" },
        { name: "Stone", hex: "#78716C" },
        { name: "White", hex: "#FFFFFF" }
    ];

    const currentSize = selectedSize || product.size || "";
    const currentColor = selectedColor || product.color || "";

    const handleAddToCart = () => {
        if (!currentSize || !currentColor) {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            return;
        }
        addToCart(product, currentSize, currentColor, quantity);
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm font-bold text-stone-400 mb-8 sm:mb-12">
                    <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-stone-400">{product.category}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-stone-900 line-clamp-1">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Image Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-[4/5] bg-white rounded-[40px] overflow-hidden border border-stone-200 shadow-2xl shadow-stone-200/50 group relative">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {product.badge && (
                                <div className="absolute top-8 left-8 px-4 py-2 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl">
                                    {product.badge}
                                </div>
                            )}
                        </div>
                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {productImages.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square bg-white rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${mainImage === img ? "border-emerald-600 scale-95" : "border-stone-100 hover:border-stone-200"}`}
                                >
                                    <img src={img} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4 uppercase">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-black text-stone-900">{product.rating}</span>
                                </div>
                                <span className="text-stone-300">|</span>
                                <button className="text-sm font-bold text-stone-500 hover:text-emerald-600 transition-colors uppercase tracking-wide">
                                    {product.reviews} Reviews
                                </button>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-black text-emerald-700">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl font-bold text-stone-400 line-through">${product.originalPrice}</span>
                            )}
                        </div>

                        <p className="text-stone-500 font-medium leading-relaxed mb-8 text-lg">
                            {product.description || "Indulge in the epitome of modern elegance with this meticulously crafted piece. Designed for those who appreciate the finer details and timeless style."}
                        </p>

                        {/* Color Selector */}
                        <div className={`mb-8 transition-all duration-300 ${showError && !currentColor ? "p-4 bg-red-50 rounded-3xl border border-red-100 ring-4 ring-red-500/10" : ""}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">Select Color</h3>
                                {showError && !currentColor && (
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-bounce">Required</span>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`group relative w-10 h-10 rounded-full border-2 transition-all ${currentColor === color.name ? "border-emerald-600 scale-110" : "border-transparent"}`}
                                    >
                                        <div
                                            className={`w-full h-full rounded-full border border-stone-100 shadow-sm`}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        {currentColor === color.name && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className={`mb-8 transition-all duration-300 ${showError && !currentSize ? "p-4 bg-red-50 rounded-3xl border border-red-100 ring-4 ring-red-500/10" : ""}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">Select Size</h3>
                                {showError && !currentSize && (
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-bounce">Required</span>
                                )}
                                <button className="text-[10px] font-black uppercase tracking-widest text-emerald-700 hover:underline">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 rounded-2xl font-black text-sm transition-all border-2 ${currentSize === size
                                            ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-700/5 rotate-1"
                                            : "border-stone-100 text-stone-400 hover:border-stone-300 hover:text-stone-900"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-4">
                            <div className="flex items-center justify-between bg-white border-2 border-stone-100 rounded-2xl p-1 min-w-[140px]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-black text-lg text-stone-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 py-5 font-black uppercase tracking-[0.2em] text-sm rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 ${showError && (!currentSize || !currentColor) ? "bg-red-500 shadow-red-500/20" : "bg-stone-900 shadow-stone-900/20 hover:bg-emerald-700"}`}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {showError && (!currentSize || !currentColor) ? "Select Options" : "Add To Basket"}
                            </button>
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={`w-16 h-16 flex items-center justify-center border-2 rounded-2xl transition-all group ${isInWishlist(product.id) ? "border-emerald-600 bg-emerald-50 text-emerald-600" : "border-stone-100 text-stone-400 hover:text-emerald-600 hover:border-emerald-600"}`}
                            >
                                <Heart className={`w-6 h-6 group-hover:fill-emerald-600 transition-all ${isInWishlist(product.id) ? "fill-emerald-600" : ""}`} />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 py-8 border-t border-stone-100">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Truck className="w-5 h-5 text-emerald-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Free Logistics</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Insured Value</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <ArrowLeftRight className="w-5 h-5 text-emerald-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Elite Exchange</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-20">
                    <div className="flex items-center gap-8 border-b border-stone-200 mb-10 overflow-x-auto pb-px">
                        {["description", "specifications", "shipping"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-6 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? "text-emerald-700" : "text-stone-400 hover:text-stone-900"}`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-700 rounded-full" />}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl">
                        {activeTab === "description" && (
                            <div className="space-y-6 animate-fade-in-up">
                                <p className="text-stone-500 font-medium leading-loose text-lg">
                                    {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(product.features || []).map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-stone-600 font-bold">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === "specifications" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 animate-fade-in-up">
                                {[
                                    { label: "Material", value: "100% Premium Cotton" },
                                    { label: "Weight", value: "240 GSM" },
                                    { label: "Origin", value: "Crafted in Italy" },
                                    { label: "Care", value: "Dry clean only" }
                                ].map((spec, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-stone-400 w-24">{spec.label}</span>
                                        <span className="text-stone-900 font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight mb-2">Complete The Look</h2>
                            <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Recommended Curations</p>
                        </div>
                        <Link href="/shop" className="group flex items-center gap-2 text-stone-900 font-black uppercase tracking-widest text-xs">
                            Shop All
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div
                        ref={sliderRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className="flex gap-8 overflow-x-auto pb-8 scroll-smooth no-scrollbar"
                    >
                        {relatedProducts.map((p) => (
                            <div key={p.id} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px]">
                                <ProductCard
                                    product={p}
                                    onQuickView={setQuickViewProduct}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />

            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    );
};

export default ProductDetails;
