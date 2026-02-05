"use client";

import React from "react";
import { Quote, Star, User } from "lucide-react";

const testimonials = [
    {
        id: 1,
        content: "Nexora has redefined how I view lifestyle luxury. Each piece is a masterclass in detail and modern soul.",
        author: "Sarah J.",
        role: "Creative Director",
        rating: 5,
        size: "large"
    },
    {
        id: 2,
        content: "The curated selection is unparalleled. I finally found a store that speaks my aesthetic language.",
        author: "Marcus T.",
        role: "Architect",
        rating: 5,
        size: "medium"
    },
    {
        id: 3,
        content: "Shopping here feels less like a transaction and more like discovering a piece of functional art.",
        author: "Elena L.",
        role: "Fashion Stylist",
        rating: 5,
        size: "small"
    },
    {
        id: 4,
        content: "The attention to detail in packaging and delivery is just as impressive as the products themselves.",
        author: "James W.",
        role: "Interior Designer",
        rating: 5,
        size: "medium"
    },
    {
        id: 5,
        content: "Nexora is my go-to for pieces that are minimal yet make a profound statement in any room.",
        author: "Sophia R.",
        role: "Minimalist Enthusiast",
        rating: 5,
        size: "small"
    },
    {
        id: 6,
        content: "A seamless experience from discovery to unboxing. Truly the gold standard of modern e-commerce.",
        author: "David K.",
        role: "Tech Founder",
        rating: 5,
        size: "medium"
    }
];

// Sub-component for individual columns to keep logic clean
const MarqueeColumn = ({ items, duration, reverse = false }) => {
    return (
        <div className="flex flex-col gap-8 h-[800px] overflow-hidden relative">
            <div
                className={`flex flex-col gap-8 ${reverse ? 'animate-marquee-vertical-reverse' : 'animate-marquee-vertical'}`}
                style={{ '--duration': duration }}
            >
                {/* Original Items */}
                {items.map((t) => (
                    <TestimonialCard key={`${t.id}-orig`} t={t} />
                ))}
                {/* Cloned Items for Loop */}
                {items.map((t) => (
                    <TestimonialCard key={`${t.id}-clone`} t={t} />
                ))}
            </div>
        </div>
    );
};

const TestimonialCard = ({ t }) => (
    <div className="relative bg-white rounded-[40px] p-8 sm:p-10 border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-emerald-200 transition-all overflow-hidden group">
        <div className="absolute -top-4 -right-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
            <Quote className="w-24 h-24 rotate-12" />
        </div>

        <div className="relative z-10">
            <div className="flex items-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
            </div>

            <p className={`text-stone-900 font-bold leading-relaxed mb-8 ${t.size === 'large' ? 'text-xl italic font-serif' : 'text-base tracking-tight'
                }`}>
                "{t.content}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-black text-stone-900 uppercase tracking-widest text-[10px] mb-0.5">
                        {t.author}
                    </h4>
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">
                        {t.role}
                    </span>
                </div>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    // Split testimonials for different columns
    const col1 = [...testimonials.slice(0, 2)];
    const col2 = [...testimonials.slice(2, 4)];
    const col3 = [...testimonials.slice(4, 6)];

    return (
        <section className="relative py-12 bg-stone-100 overflow-hidden">
            {/* Background Ghost Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.02] select-none scale-150 rotate-[-15deg]">
                <h2 className="text-[20rem] font-black uppercase tracking-tighter text-stone-900 leading-none">
                    Voices
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="w-8 h-px bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600">The Curation</span>
                        <span className="w-8 h-px bg-emerald-500" />
                    </div>
                    <h2 className="text-5xl sm:text-7xl font-black text-stone-900 uppercase tracking-tighter mb-6">
                        Voices of <span className="font-serif italic font-light text-emerald-800">Nexora</span>
                    </h2>
                </div>

                {/* Vertical Marquee Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[700px] overflow-hidden rounded-[60px] relative mt-16 px-4">
                    {/* Fading Edge Effects */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-stone-50 to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-stone-50 to-transparent z-20 pointer-events-none" />

                    <MarqueeColumn items={col1} duration="25s" />
                    <div className="hidden md:block">
                        <MarqueeColumn items={col2} duration="35s" />
                    </div>
                    <div className="hidden lg:block">
                        <MarqueeColumn items={col3} duration="30s" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee-vertical {
                    from { transform: translateY(0); }
                    to { transform: translateY(-50%); }
                }
                @keyframes marquee-vertical-reverse {
                    from { transform: translateY(-50%); }
                    to { transform: translateY(0); }
                }
                .animate-marquee-vertical {
                    animation: marquee-vertical var(--duration) linear infinite;
                }
                .animate-marquee-vertical-reverse {
                    animation: marquee-vertical-reverse var(--duration) linear infinite;
                }
                .animate-marquee-vertical:hover,
                .animate-marquee-vertical-reverse:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
