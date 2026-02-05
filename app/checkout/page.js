"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
    ChevronLeft,
    CreditCard,
    Truck,
    ShieldCheck,
    ArrowRight,
    ShoppingBag,
    CheckCircle2,
    Lock
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";

const CheckoutPage = () => {
    const { cart, cartTotal, cartCount, clearCart } = useCart();
    const [isOrdered, setIsOrdered] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod"); // "online" or "cod"

    // Form States
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        address: "",
        city: "",
        zipCode: "",
        phone: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOrdered(true);
        // In a real app, clearCart would happen after success
        // clearCart(); 
    };

    if (isOrdered) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight mb-4">Order Placed Successfully!</h1>
                <p className="text-stone-500 font-medium mb-12 max-w-md">
                    Thank you for your purchase. We've sent a confirmation email to <span className="font-bold text-stone-900">{formData.email}</span>. Your order will be paid via <span className="font-bold text-emerald-600">{paymentMethod === "online" ? "Credit/Debit Card" : "Cash on Delivery"}</span>.
                </p>
                <Link
                    href="/shop"
                    className="py-5 px-12 bg-stone-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-emerald-700 transition-all shadow-2xl shadow-stone-900/10"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-stone-300" />
                </div>
                <h1 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-4">Your cart is empty</h1>
                <Link
                    href="/shop"
                    className="py-4 px-8 bg-stone-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-stone-900/10"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                {/* Back to Cart */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-emerald-700 transition-colors mb-8 group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Store
                </Link>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Form */}
                    <div className="flex-1 space-y-12">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Contact Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center shadow-lg">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Delivery Details</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-stone-900"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-stone-900"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Address</label>
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-stone-900"
                                            placeholder="123 Luxury Lane"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">City</label>
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-stone-900"
                                            placeholder="Dhaka"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Zip Code</label>
                                        <input
                                            required
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-stone-900"
                                            placeholder="1200"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-black text-stone-900 uppercase tracking-tight">Payment Method</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("cod")}
                                        className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === "cod" ? "border-stone-900 bg-stone-900 text-white shadow-lg shadow-stone-900/10" : "border-stone-100 bg-white text-stone-400 hover:border-stone-200"}`}
                                    >
                                        <Truck className={`w-6 h-6 ${paymentMethod === "cod" ? "text-white" : "text-stone-300"}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Cash on Delivery</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("online")}
                                        className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === "online" ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-600/10" : "border-stone-100 bg-white text-stone-400 hover:border-stone-200"}`}
                                    >
                                        <CreditCard className={`w-6 h-6 ${paymentMethod === "online" ? "text-emerald-600" : "text-stone-300"}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Online Payment</span>
                                    </button>

                                </div>

                                {paymentMethod === "online" ? (
                                    <div className="p-8 bg-stone-900 rounded-[32px] text-white space-y-6 shadow-2xl shadow-stone-900/40 relative overflow-hidden animate-fade-in">
                                        {/* Card Background Decoration */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] -ml-32 -mb-32" />

                                        <div className="relative group">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-emerald-400 transition-colors">Card Number</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full px-0 py-2 bg-transparent border-b-2 border-stone-800 focus:border-emerald-500 outline-none transition-all font-mono text-xl placeholder:text-stone-700"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
                                                    <div className="w-8 h-5 bg-white/10 rounded-sm" />
                                                    <div className="w-8 h-5 bg-white/10 rounded-sm" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="relative group">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-emerald-400 transition-colors">Expiry Date</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="expiry"
                                                    value={formData.expiry}
                                                    onChange={handleInputChange}
                                                    className="w-full px-0 py-2 bg-transparent border-b-2 border-stone-800 focus:border-emerald-500 outline-none transition-all font-mono text-xl placeholder:text-stone-700"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-emerald-400 transition-colors">CVC</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        type="text"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        className="w-full px-0 py-2 bg-transparent border-b-2 border-stone-800 focus:border-emerald-500 outline-none transition-all font-mono text-xl placeholder:text-stone-700"
                                                        placeholder="123"
                                                    />
                                                    <Lock className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 bg-emerald-50 rounded-[32px] border-2 border-emerald-100 flex items-center gap-4 animate-fade-in">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-emerald-600/10">
                                            <Truck className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-stone-900 uppercase tracking-widest mb-1">Pay on Arrival</p>
                                            <p className="text-[10px] font-medium text-emerald-600/80 leading-relaxed uppercase tracking-tighter">You will pay the delivery person in cash or via mobile payment upon receiving your order.</p>
                                        </div>
                                    </div>
                                )}
                            </section>

                            <button
                                type="submit"
                                className="w-full py-6 bg-stone-900 text-white font-black uppercase tracking-[0.2em] text-sm rounded-[24px] hover:bg-emerald-600 transition-all shadow-2xl shadow-stone-900/20 flex items-center justify-center gap-4 group"
                            >
                                Complete Purchase
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="w-full lg:w-[450px]">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-xl shadow-stone-200/50">
                                <h3 className="text-sm font-black text-stone-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                                    Order Summary
                                    <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-[10px]">{cartCount}</span>
                                </h3>

                                <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto no-scrollbar">
                                    {cart.map((item, idx) => (
                                        <div key={`${item.id}-${item.size}-${item.color}-${idx}`} className="flex gap-4">
                                            <div className="w-24 h-24 bg-stone-100 rounded-2xl overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 py-1">
                                                <h4 className="text-[11px] font-black text-stone-900 uppercase truncate mb-1">{item.name}</h4>
                                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                                                    {item.size} / {item.color}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-stone-500">QTY: {item.quantity}</span>
                                                    <span className="text-sm font-black text-emerald-700">${item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-stone-100">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-stone-400 px-1">
                                        <span>Subtotal</span>
                                        <span className="text-stone-900">${cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-stone-400 px-1">
                                        <span>Shipping</span>
                                        <span className="text-emerald-600 font-black">Free</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-stone-400 px-1">
                                        <span>Estimated Tax</span>
                                        <span className="text-stone-900">$0.00</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-4 px-1">
                                        <span className="text-sm font-black uppercase tracking-widest text-stone-900">Total</span>
                                        <span className="text-3xl font-black text-stone-900 leading-none">${cartTotal}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-stone-900 uppercase tracking-widest mb-1">Secure Checkout</p>
                                    <p className="text-[10px] font-medium text-stone-500 leading-relaxed uppercase tracking-tighter">Your payment data is encrypted & protected.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
