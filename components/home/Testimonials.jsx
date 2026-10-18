"use client";

import React from "react";
import { Quote, Star, User } from "lucide-react";
import useFetch from "@/utils/hooks/useFetch";
import { TESTIMONIALS_API } from "@/utils/APIs";

const FALLBACK_TESTIMONIALS = [
    {
        _id: "1",
        content: "Nexora has redefined how I view lifestyle luxury. Each piece is a masterclass in detail and modern soul.",
        author: "Sarah Jenkins",
        role: "Creative Director, Paris",
        rating: 5,
        size: "large",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
    },
    {
        _id: "2",
        content: "The curated selection is unparalleled. I finally found a store that speaks my aesthetic language of quiet sophistication.",
        author: "Marcus Thorne",
        role: "Architect, Milan",
        rating: 5,
        size: "medium",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
        _id: "3",
        content: "Shopping here feels less like a transaction and more like discovering a piece of functional art. The craftsmanship is flawless.",
        author: "Elena Laurent",
        role: "Fashion Stylist, London",
        rating: 5,
        size: "small",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face"
    },
    {
        _id: "4",
        content: "The attention to detail in packaging, hand-stitching, and delivery is just as impressive as the products themselves.",
        author: "James West",
        role: "Interior Designer, New York",
        rating: 5,
        size: "medium",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
    },
    {
        _id: "5",
        content: "Nexora is my definitive destination for pieces that are minimal yet command subtle attention in any setting.",
        author: "Sophia Rossi",
        role: "Art Director, Florence",
        rating: 5,
        size: "small",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face"
    },
    {
        _id: "6",
        content: "A seamless experience from digital discovery to unboxing. Truly the gold standard of modern luxury e-commerce.",
        author: "David Kowalski",
        role: "Venture Partner, Zurich",
        rating: 5,
        size: "medium",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    }
];

// Sub-component for individual columns to keep animation clean
const MarqueeColumn = ({ items, duration, reverse = false }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="flex flex-col gap-8 h-[800px] overflow-hidden relative">
            <div
                className={`flex flex-col gap-8 ${reverse ? 'animate-marquee-vertical-reverse' : 'animate-marquee-vertical'}`}
                style={{ '--duration': duration }}
            >
                {/* Original Items */}
                {items.map((t, idx) => (
                    <TestimonialCard key={`${t._id || idx}-orig`} t={t} />
                ))}
                {/* Cloned Items for Smooth Loop */}
                {items.map((t, idx) => (
                    <TestimonialCard key={`${t._id || idx}-clone`} t={t} />
                ))}
            </div>
        </div>
    );
};

const TestimonialCard = ({ t }) => {
    const spacesUrl = (process.env.NEXT_PUBLIC_SPACES_URL || "").trim();
    const avatarUrl = t.image
        ? (t.image.startsWith("http") ? t.image : `${spacesUrl.replace(/\/$/, '')}/${t.image.replace(/^\//, '')}`)
        : null;

    return (
        <div className="relative bg-white rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:border-emerald-200 transition-all overflow-hidden group">
            <div className="absolute -top-4 -right-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                <Quote className="w-24 h-24 rotate-12" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-1 mb-5 sm:mb-6">
                    {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                </div>

                <p className={`text-stone-900 font-bold leading-relaxed mb-6 sm:mb-8 ${
                    t.size === 'large' ? 'text-lg sm:text-xl italic font-serif' : 'text-sm sm:text-base tracking-tight'
                }`}>
                    "{t.content}"
                </p>

                <div className="flex items-center gap-4 pt-5 sm:pt-6 border-t border-stone-100">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={t.author}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-cover border border-stone-200/80 shadow-xs group-hover:border-emerald-300 transition-colors"
                        />
                    ) : (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-500 font-serif font-bold text-sm group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all">
                            {t.author ? t.author.charAt(0) : <User className="w-5 h-5 text-stone-400" />}
                        </div>
                    )}
                    <div>
                        <h4 className="font-black text-stone-900 uppercase tracking-widest text-[11px] mb-0.5">
                            {t.author}
                        </h4>
                        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide">
                            {t.role || "Verified Buyer"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Testimonials = ({ testimonials: propTestimonials }) => {
    // If not passed via props, fetch from API
    const { data: fetchedTestimonials } = useFetch(
        !propTestimonials ? TESTIMONIALS_API : null
    );

    const activeList =
        (propTestimonials && propTestimonials.length > 0)
            ? propTestimonials
            : (fetchedTestimonials && fetchedTestimonials.length > 0)
            ? fetchedTestimonials
            : FALLBACK_TESTIMONIALS;

    // Distribute testimonials across 3 columns
    const col1 = activeList.filter((_, idx) => idx % 3 === 0);
    const col2 = activeList.filter((_, idx) => idx % 3 === 1);
    const col3 = activeList.filter((_, idx) => idx % 3 === 2);

    // Ensure fallback items if a column has fewer than 2 items
    const col1Items = col1.length >= 2 ? col1 : [...col1, ...activeList.slice(0, 2 - col1.length)];
    const col2Items = col2.length >= 2 ? col2 : (col2.length > 0 ? [...col2, col2[0]] : col1Items);
    const col3Items = col3.length >= 2 ? col3 : (col3.length > 0 ? [...col3, col3[0]] : col1Items);

    return (
        <section className="relative py-24 sm:py-32 bg-stone-100 overflow-hidden">
            {/* Background Ghost Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.02] select-none scale-150 rotate-[-15deg]">
                <h2 className="text-[20rem] font-black uppercase tracking-tighter text-stone-900 leading-none">
                    Voices
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 sm:mb-24">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="w-8 h-px bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600">The Curation</span>
                        <span className="w-8 h-px bg-emerald-500" />
                    </div>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                        Voices of <span className="font-serif italic font-light text-emerald-800">Nexora</span>
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto font-medium">
                        Unfiltered reflections from our global community of collectors, tastemakers, and patrons.
                    </p>
                </div>

                {/* Vertical Marquee Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[700px] overflow-hidden rounded-[40px] sm:rounded-[60px] relative mt-10 px-2 sm:px-4">
                    {/* Fading Edge Effects */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-stone-100 to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-100 to-transparent z-20 pointer-events-none" />

                    <MarqueeColumn items={col1Items} duration="28s" />
                    <div className="hidden md:block">
                        <MarqueeColumn items={col2Items} duration="36s" reverse={true} />
                    </div>
                    <div className="hidden lg:block">
                        <MarqueeColumn items={col3Items} duration="32s" />
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
                    animation: marquee-vertical var(--duration, 30s) linear infinite;
                }
                .animate-marquee-vertical-reverse {
                    animation: marquee-vertical-reverse var(--duration, 30s) linear infinite;
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
