import React from "react";
import Link from "next/link";
import { Search, X, Loader2, ChevronRight } from "lucide-react";

const SearchModal = ({
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    isSearching,
    filteredProducts,
    searchInputRef
}) => {
    return (
        <div
            className={`fixed inset-0 z-100 flex items-start justify-center pt-24 sm:pt-32 px-4 transition-all duration-500 ${isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            <div
                className={`absolute inset-0 bg-stone-900/40 backdrop-blur-xl transition-opacity duration-500 ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
                onClick={() => setIsSearchOpen(false)}
            />
            <div
                className={`relative w-full max-w-2xl bg-white rounded-[32px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 ${isSearchOpen ? "translate-y-0 scale-100" : "-translate-y-12 scale-95"}`}
            >
                <div className="p-6 sm:p-8 border-b border-stone-100">
                    <div className="relative flex items-center">
                        <Search className={`absolute left-0 w-6 h-6 transition-colors duration-300 ${searchQuery ? "text-emerald-600" : "text-stone-300"}`} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search products, categories, styles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-12 py-2 text-xl sm:text-2xl font-bold bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-200"
                        />
                        {isSearching ? <Loader2 className="absolute right-0 w-6 h-6 text-emerald-600 animate-spin" /> : searchQuery && <button onClick={() => setSearchQuery("")}><X className="w-5 h-5 text-stone-400" /></button>}
                    </div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto py-4">
                    {searchQuery ? (
                        filteredProducts.length > 0 ? (
                            <div className="px-4 flex flex-col gap-1">
                                {filteredProducts.map((product) => (
                                    <Link key={product.id} href={`/product/${product.id}`} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-emerald-50/50 transition-all" onClick={() => setIsSearchOpen(false)}>
                                        <img src={product.image} className="w-16 h-16 rounded-xl object-cover" />
                                        <div className="grow">
                                            <h4 className="font-bold text-stone-900">{product.title}</h4>
                                            <p className="text-xs font-semibold text-stone-400 uppercase">{product.category} • {product.price}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-stone-200 group-hover:text-emerald-400" />
                                    </Link>
                                ))}
                            </div>
                        ) : !isSearching && <div className="p-12 text-center">No results found</div>
                    ) : (
                        <div className="px-8 pb-4">
                            <p className="text-[11px] font-black uppercase tracking-widest text-stone-400 mb-4">Popular Searches</p>
                            <div className="flex flex-wrap gap-2">
                                {["Denim", "Silk Dress", "Watches", "Accessories", "Amber"].map((tag) => <button key={tag} onClick={() => setSearchQuery(tag)} className="px-4 py-2 bg-stone-50 hover:bg-emerald-50 rounded-full font-bold text-sm transition-all">{tag}</button>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
