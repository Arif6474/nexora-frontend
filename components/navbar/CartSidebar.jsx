"use client";

import React from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

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
                                    <ShoppingBag className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Your Cart</h2>
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">
                                        {cartCount} {cartCount === 1 ? 'Item' : 'Items'} Ready
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
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center mb-6">
                                        <ShoppingBag className="w-10 h-10 text-stone-200" />
                                    </div>
                                    <h3 className="text-lg font-black text-stone-900 uppercase tracking-tight mb-2">Your cart is empty</h3>
                                    <p className="text-stone-400 font-medium mb-8 max-w-[200px]">Looks like you haven't added anything yet.</p>
                                    <Link
                                        href="/shop"
                                        onClick={onClose}
                                        className="py-4 px-8 bg-stone-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-stone-900/10"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item, idx) => (
                                        <div key={`${item.id}-${item.size}-${item.color}-${idx}`} className="group relative flex gap-4 p-4 rounded-3xl border border-stone-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
                                            <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="text-sm font-black text-stone-900 uppercase line-clamp-1">
                                                            {item.name}
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                                                            className="p-1 text-stone-300 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-0.5 bg-stone-100 text-[10px] font-black uppercase tracking-widest text-stone-600 rounded-md">{item.size}</span>
                                                        <span className="px-2 py-0.5 bg-stone-100 text-[10px] font-black uppercase tracking-widest text-stone-600 rounded-md">{item.color}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-lg font-black text-emerald-700">${item.price}</span>

                                                        <div className="flex items-center gap-3 bg-white border border-stone-100 rounded-xl px-2 py-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                                className="text-stone-400 hover:text-stone-900 transition-colors"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="text-xs font-black text-stone-900 w-4 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                                className="text-stone-400 hover:text-stone-900 transition-colors"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="px-6 py-6 border-t border-stone-100 space-y-4 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)] flex-shrink-0">
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-xs font-black uppercase tracking-widest text-stone-400">Subtotal</span>
                                    <span className="text-2xl font-black text-stone-900">${cartTotal}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="w-full py-5 bg-stone-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-stone-900/20 group"
                                >
                                    Checkout
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <p className="text-[10px] font-bold text-stone-400 text-center uppercase tracking-widest">
                                    Shipping & taxes calculated at checkout
                                </p>
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

export default CartSidebar;
