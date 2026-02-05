
import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Send, Sparkles, Zap, TrendingUp } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative bg-stone-950 text-stone-300 overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Top Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-600 via-emerald-400 to-emerald-600 animate-pulse" />

            {/* Premium Newsletter Section */}
            <div className="relative border-b border-stone-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
                    <div className="relative">
                        {/* Glassmorphic Card */}
                        <div className="relative bg-linear-to-br from-emerald-900/20 to-stone-900/20 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 sm:p-12 overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                            <Sparkles className="absolute top-6 right-6 w-8 h-8 text-emerald-400/30 animate-pulse" />
                            <Zap className="absolute bottom-6 left-6 w-6 h-6 text-amber-400/30 animate-pulse delay-500" />

                            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                                <div className="text-center lg:text-left flex-1">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Exclusive Access</span>
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
                                        JOIN THE <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">ELITE</span>
                                    </h3>
                                    <p className="text-base sm:text-lg text-stone-400 font-medium max-w-xl">
                                        Get first access to new drops, insider deals, and exclusive style guides. Join 25,000+ fashion enthusiasts.
                                    </p>
                                </div>
                                <div className="w-full lg:w-auto lg:min-w-[450px]">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="flex-1 px-6 py-5 bg-stone-900/80 backdrop-blur-xl border-2 border-stone-700/50 rounded-2xl text-white placeholder:text-stone-500 font-medium outline-none focus:border-emerald-500 focus:bg-stone-900 transition-all shadow-lg"
                                        />
                                        <button className="group relative px-8 py-5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-900/30 overflow-hidden">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                Subscribe Now
                                            </span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block mb-6 group">
                            <h2 className="text-3xl font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                                Nexora
                            </h2>
                        </Link>
                        <p className="text-sm text-stone-400 leading-relaxed mb-8 max-w-xs">
                            Redefining modern elegance through curated collections that blend minimalism with luxury. Crafted for those who dare to stand out.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="group relative w-12 h-12 rounded-2xl bg-linear-to-br from-stone-800 to-stone-900 hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center transition-all hover:scale-110 hover:-rotate-6 shadow-lg overflow-hidden"
                            >
                                <Instagram className="relative z-10 w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
                                <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="#"
                                className="group relative w-12 h-12 rounded-2xl bg-linear-to-br from-stone-800 to-stone-900 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center transition-all hover:scale-110 hover:-rotate-6 shadow-lg"
                            >
                                <Facebook className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
                            </a>
                            <a
                                href="#"
                                className="group relative w-12 h-12 rounded-2xl bg-linear-to-br from-stone-800 to-stone-900 hover:from-sky-500 hover:to-sky-600 flex items-center justify-center transition-all hover:scale-110 hover:-rotate-6 shadow-lg"
                            >
                                <Twitter className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-emerald-500" />
                            Shop
                        </h4>
                        <ul className="space-y-4">
                            {["New Arrivals", "Men", "Collections", "Sale"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="group text-sm text-stone-400 hover:text-white transition-colors font-medium inline-flex items-center gap-2"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service Column */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-emerald-500" />
                            Support
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Contact Us", href: "/contact" },
                                { name: "Shipping Info", href: "#" },
                                { name: "Returns", href: "#" },
                                { name: "Size Guide", href: "#" },
                                { name: "FAQ", href: "#" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="group text-sm text-stone-400 hover:text-white transition-colors font-medium inline-flex items-center gap-2"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-emerald-500" />
                            Contact
                        </h4>
                        <ul className="space-y-5">
                            <li className="group">
                                <a href="mailto:hello@nexora.com" className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                                        <Mail className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-500 uppercase tracking-wider font-bold mb-0.5">Email</p>
                                        <p className="text-sm text-stone-300 group-hover:text-emerald-400 transition-colors font-medium">
                                            hello@nexora.com
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li className="group">
                                <a href="tel:+1234567890" className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                                        <Phone className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-500 uppercase tracking-wider font-bold mb-0.5">Phone</p>
                                        <p className="text-sm text-stone-300 group-hover:text-emerald-400 transition-colors font-medium">
                                            +1 (234) 567-890
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li className="group">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-500 uppercase tracking-wider font-bold mb-0.5">Address</p>
                                        <p className="text-sm text-stone-300 font-medium">
                                            123 Fashion Ave<br />New York, NY 10001
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-stone-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="text-sm text-stone-500 font-medium text-center sm:text-left">
                            © 2026 <span className="text-white font-bold">Nexora</span>. All rights reserved. Crafted with <span className="text-emerald-400">♥</span> for excellence.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-sm text-stone-500 hover:text-emerald-400 transition-colors font-medium">
                                Privacy Policy
                            </Link>
                            <span className="text-stone-700">•</span>
                            <Link href="#" className="text-sm text-stone-500 hover:text-emerald-400 transition-colors font-medium">
                                Terms of Service
                            </Link>
                            <span className="text-stone-700">•</span>
                            <Link href="#" className="text-sm text-stone-500 hover:text-emerald-400 transition-colors font-medium">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
