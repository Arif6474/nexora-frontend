"use client";

import React from "react";
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { allProducts } from "../../app/data/products";
import Link from "next/link";

const WishlistSidebar = ({ isOpen, onClose }) => {
    const { wishlist, toggleWishlist } = useWishlist();

    const wishlistProducts = wishlist.map(id =>
        allProducts.find(p => p.id === id)
    ).filter(Boolean);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl animate-fade-in-left">
                    <div className="h-full flex flex-col pt-6 bg-white overflow-hidden">
                        {/* Header */}
                        <div className="px-6 flex items-center justify-between mb-8 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Wishlist</h2>
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">
                                        {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'} Saved
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto no-scrollbar px-6">
                            {wishlistProducts.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center mb-6">
                                        <Heart className="w-10 h-10 text-stone-200" />
                                    </div>
                                    <h3 className="text-lg font-black text-stone-900 uppercase tracking-tight mb-2">Your wishlist is empty</h3>
                                    <p className="text-stone-400 font-medium mb-8 max-w-[200px]">Save your favorite items to keep track of them.</p>
                                    <Link
                                        href="/shop"
                                        onClick={onClose}
                                        className="py-4 px-8 bg-stone-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-stone-900/10"
                                    >
                                        Start Exploring
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {wishlistProducts.map((product) => (
                                        <div key={product.id} className="group relative flex gap-4 p-4 rounded-3xl border border-stone-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
                                            <Link
                                                href={`/product/${product.id}`}
                                                onClick={onClose}
                                                className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-100"
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </Link>

                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <Link
                                                            href={`/product/${product.id}`}
                                                            onClick={onClose}
                                                            className="text-sm font-black text-stone-900 uppercase line-clamp-1 hover:text-emerald-700 transition-colors"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        <button
                                                            onClick={() => toggleWishlist(product.id)}
                                                            className="p-1 text-stone-300 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{product.category}</p>
                                                    <div className="mt-2 flex items-baseline gap-2">
                                                        <span className="text-lg font-black text-emerald-700">${product.price}</span>
                                                        {product.originalPrice && (
                                                            <span className="text-xs font-bold text-stone-300 line-through">${product.originalPrice}</span>
                                                        )}
                                                    </div>
                                                </div>

                                              
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {wishlistProducts.length > 0 && (
                            <div className="px-6 py-6 border-t border-stone-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)] flex-shrink-0">
                                <Link
                                    href="/shop"
                                    onClick={onClose}
                                    className="w-full py-5 bg-stone-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-stone-900/20"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in-left {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-fade-in-left {
                    animation: fade-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </div>
    );
};

export default WishlistSidebar;
