"use client";

import React from "react";
import Link from "next/link";
import { Search, X, Loader2, ChevronRight, ArrowRight } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";

const SearchModal = ({
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    isSearching,
    filteredProducts = [],
    searchInputRef
}) => {
    const router = useRouter();
    const spacesUrl = (process.env.NEXT_PUBLIC_SPACES_URL || "").trim();

    const getImageUrl = (image) => {
        if (!image) return "/api/placeholder/400/533";
        if (image.startsWith("http://") || image.startsWith("https://")) return image;
        return `${spacesUrl.replace(/\/$/, '')}/${image.replace(/^\//, '')}`;
    };

    const getCategoryName = (category) => {
        if (!category) return "";
        if (typeof category === "object") return category.name || category.slug || "";
        return category;
    };

    const handleNavigateToShop = (term) => {
        const query = (term || searchQuery || "").trim();
        if (!query) return;
        setIsSearchOpen(false);
        setSearchQuery("");
        router.push(`/shop?search=${encodeURIComponent(query)}`);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleNavigateToShop(searchQuery);
    };

    return (
        <div
            className={`fixed inset-0 z-100 flex items-start justify-center pt-20 sm:pt-28 px-4 transition-all duration-300 ${isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-300 ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
                onClick={() => setIsSearchOpen(false)}
            />

            {/* Modal Box */}
            <div
                className={`relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-stone-100 overflow-hidden transition-all duration-300 ${isSearchOpen ? "translate-y-0 scale-100" : "-translate-y-8 scale-95"}`}
            >
                {/* Search Bar Header */}
                <div className="p-5 sm:p-7 border-b border-stone-100">
                    <form onSubmit={handleFormSubmit} className="relative flex items-center">
                        <Search className={`absolute left-0 w-6 h-6 transition-colors duration-300 ${searchQuery ? "text-emerald-600" : "text-stone-300"}`} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search pieces, blazers, silk, coats, bags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-24 py-2 text-lg sm:text-2xl font-bold bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-300"
                        />
                        <div className="absolute right-0 flex items-center gap-2">
                            {isSearching && <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />}
                            {searchQuery && !isSearching && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                                    title="Clear query"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="hidden sm:inline-flex px-3.5 py-1.5 bg-stone-900 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Search Results Area */}
                <div className="max-h-[60vh] overflow-y-auto py-3">
                    {searchQuery.trim() ? (
                        isSearching ? (
                            <div className="px-3 sm:px-4 flex flex-col gap-2">
                                <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                                    <span>Searching catalog...</span>
                                </div>
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl">
                                        <Skeleton className="w-14 h-16 rounded-xl shrink-0" />
                                        <div className="grow space-y-2">
                                            <Skeleton className="h-4 w-3/5 rounded-md" />
                                            <Skeleton className="h-3 w-2/5 rounded-md opacity-70" />
                                        </div>
                                        <Skeleton className="w-5 h-5 rounded-full shrink-0 opacity-30" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="px-3 sm:px-4 flex flex-col gap-1">
                                <div className="px-3 py-1 flex items-center justify-between text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                                    <span>Products ({filteredProducts.length})</span>
                                    <span>Press Enter to view all</span>
                                </div>

                                {filteredProducts.map((product) => {
                                    const prodId = product._id || product.id;
                                    const prodSlug = product.slug || prodId;
                                    const prodTitle = product.title || product.name || "Product";
                                    const catName = getCategoryName(product.category);
                                    const imgUrl = getImageUrl(product.image);

                                    return (
                                        <Link
                                            key={prodId}
                                            href={`/product/${prodSlug}`}
                                            className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-emerald-50/70 transition-all border border-transparent hover:border-emerald-100 cursor-pointer"
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                setSearchQuery("");
                                            }}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={prodTitle}
                                                className="w-14 h-16 rounded-xl object-cover bg-stone-100 shadow-xs group-hover:scale-105 transition-transform shrink-0"
                                            />
                                            <div className="grow min-w-0">
                                                <h4 className="font-bold text-stone-900 truncate group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
                                                    {prodTitle}
                                                </h4>
                                                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mt-0.5 flex items-center gap-2 flex-wrap">
                                                    {catName && <span>{catName}</span>}
                                                    {catName && <span>•</span>}
                                                    <span className="font-black text-stone-900">${product.price}</span>
                                                    {product.gender && (
                                                        <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                                                            {product.gender}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
                                        </Link>
                                    );
                                })}

                                {/* View All In Shop CTA */}
                                <div className="pt-2 pb-1 px-1">
                                    <button
                                        type="button"
                                        onClick={() => handleNavigateToShop(searchQuery)}
                                        className="w-full py-3 px-4 bg-stone-900 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                                    >
                                        <span>View All Results for &quot;{searchQuery}&quot; in Shop</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : !isSearching ? (
                            <div className="p-8 sm:p-12 text-center space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                                    <Search className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-base sm:text-lg font-bold text-stone-900">
                                        No pieces found for &quot;{searchQuery}&quot;
                                    </p>
                                    <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mt-1">
                                        Try keywords like Blazer, Silk, Coat, Bag, Shoes, or Denim.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleNavigateToShop(searchQuery)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                    <span>Search in Shop catalog</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ) : null
                    ) : (
                        <div className="px-6 sm:px-8 py-4">
                            <p className="text-[11px] font-black uppercase tracking-widest text-stone-400 mb-4">
                                Popular Searches
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Blazer",
                                    "Silk",
                                    "Coat",
                                    "Leather Bag",
                                    "Shoes",
                                    "Denim",
                                    "Women",
                                    "Men"
                                ].map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery(tag);
                                        }}
                                        className="px-4 py-2 bg-stone-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent rounded-full font-bold text-xs transition-all cursor-pointer"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
