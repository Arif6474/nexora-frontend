"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "../../components/shop/FilterSection";
import SortDropdown from "../../components/shop/SortDropdown";
import ProductCard from "../../components/shop/ProductCard";
import ProductCardSkeleton from "../../components/shop/ProductCardSkeleton";
import ShopSkeleton from "../../components/shop/ShopSkeleton";
import QuickViewModal from "../../components/shop/QuickViewModal";
import { Grid3x3, LayoutGrid, X, RotateCcw, Search } from "lucide-react";
import useFetch from "@/utils/hooks/useFetch";
import { GET_ALL_PRODUCTS_WITH_QUERY_API, CATEGORIES_API } from "@/utils/APIs";

const ShopContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("4-col");
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    // Derived filters directly from URL searchParams (single source of truth)
    const selectedFilters = {
        category: searchParams.get("category") || "",
        gender: searchParams.get("gender") || "",
        searchQuery: searchParams.get("search") || searchParams.get("searchQuery") || "",
        subcategory: searchParams.get("subcategory") || "",
        brand: searchParams.get("brand") || "",
    };

    // Fetch categories for friendly chip labels
    const { data: categories = [] } = useFetch(CATEGORIES_API);

    // Build query parameters for API
    const queryParams = new URLSearchParams();
    if (selectedFilters.category) queryParams.append("category", selectedFilters.category);
    if (selectedFilters.gender) queryParams.append("gender", selectedFilters.gender);
    if (selectedFilters.searchQuery) queryParams.append("searchQuery", selectedFilters.searchQuery);
    if (selectedFilters.subcategory) queryParams.append("subcategory", selectedFilters.subcategory);
    if (selectedFilters.brand) queryParams.append("brand", selectedFilters.brand);
    if (sortBy) queryParams.append("sortBy", sortBy);

    const url = `${GET_ALL_PRODUCTS_WITH_QUERY_API}?${queryParams.toString()}`;
    const { data: products = [], isLoading } = useFetch(url);

    // Helper to push updated filters to the URL
    const updateFilters = (newFilters) => {
        const nextParams = new URLSearchParams();
        if (newFilters.category) nextParams.set("category", newFilters.category);
        if (newFilters.gender) nextParams.set("gender", newFilters.gender);
        if (newFilters.searchQuery) nextParams.set("search", newFilters.searchQuery);
        if (newFilters.subcategory) nextParams.set("subcategory", newFilters.subcategory);
        if (newFilters.brand) nextParams.set("brand", newFilters.brand);

        const newQuery = nextParams.toString();
        router.push(newQuery ? `/shop?${newQuery}` : "/shop", { scroll: false });
    };

    const handleRemoveFilter = (filterKey) => {
        updateFilters({ ...selectedFilters, [filterKey]: "" });
    };

    const handleClearAll = () => {
        router.push("/shop", { scroll: false });
    };

    // Calculate active filter chips
    const activeChips = [];
    if (selectedFilters.gender) {
        activeChips.push({
            key: "gender",
            label: `Department: ${selectedFilters.gender}`,
        });
    }
    if (selectedFilters.category) {
        const foundCat = categories.find(
            c => c._id === selectedFilters.category || c.slug === selectedFilters.category
        );
        activeChips.push({
            key: "category",
            label: `Category: ${foundCat ? foundCat.name : selectedFilters.category}`,
        });
    }
    if (selectedFilters.searchQuery) {
        activeChips.push({
            key: "searchQuery",
            label: `Search: "${selectedFilters.searchQuery}"`,
        });
    }
    if (selectedFilters.subcategory) {
        activeChips.push({
            key: "subcategory",
            label: `Subcategory Filter`,
        });
    }
    if (selectedFilters.brand) {
        activeChips.push({
            key: "brand",
            label: `Brand Filter`,
        });
    }

    // Dynamic Page Title
    let pageTitle = "Shop All Products";
    let pageSubtitle = "Discover our curated collection of premium fashion pieces";

    if (selectedFilters.gender) {
        pageTitle = `${selectedFilters.gender}'s Collection`;
        pageSubtitle = `Explore signature ${selectedFilters.gender.toLowerCase()}'s pieces crafted with exquisite attention to detail`;
    } else if (selectedFilters.searchQuery) {
        pageTitle = `Results for "${selectedFilters.searchQuery}"`;
        pageSubtitle = "Browse curated pieces matching your search query";
    } else if (selectedFilters.category) {
        const foundCat = categories.find(
            c => c._id === selectedFilters.category || c.slug === selectedFilters.category
        );
        pageTitle = foundCat ? foundCat.name : "Curated Collection";
        pageSubtitle = foundCat?.description || "Handpicked silhouettes from our signature archives";
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Page Header */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 mb-3 tracking-tight">
                        {pageTitle}
                    </h1>
                    <p className="text-base sm:text-lg text-stone-600 font-medium">
                        {pageSubtitle}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto">
                <div className="flex">
                    {/* Filter Sidebar */}
                    <FilterSection
                        isOpen={isFilterOpen}
                        onToggle={() => setIsFilterOpen(!isFilterOpen)}
                        selectedFilters={selectedFilters}
                        onFilterChange={updateFilters}
                    />

                    {/* Products Section */}
                    <div className="flex-1 min-w-0">
                        {/* Top Bar */}
                        <div className="bg-white border-b border-stone-200 px-4 sm:px-8 py-4 sticky top-0 z-10 shadow-xs">
                            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap grow">
                                    <p className="text-sm font-medium text-stone-600 shrink-0">
                                        Showing <span className="font-black text-stone-900">{products.length}</span> products
                                    </p>

                                    {/* Instant Catalog Search Input */}
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const val = e.currentTarget.elements.searchCatalog?.value || "";
                                            updateFilters({ ...selectedFilters, searchQuery: val.trim() });
                                        }}
                                        className="relative w-full max-w-xs"
                                    >
                                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                                        <input
                                            key={selectedFilters.searchQuery}
                                            name="searchCatalog"
                                            defaultValue={selectedFilters.searchQuery}
                                            type="text"
                                            placeholder="Search pieces, coats, silk..."
                                            className="w-full pl-9 pr-8 py-2 bg-stone-100 hover:bg-stone-50 focus:bg-white border border-stone-200 focus:border-emerald-600 rounded-xl text-xs font-semibold text-stone-900 placeholder:text-stone-400 outline-none transition-all"
                                        />
                                        {selectedFilters.searchQuery && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFilter("searchQuery")}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                                                title="Clear search"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </form>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                    {/* View Mode Toggle */}
                                    <div className="hidden sm:flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode("4-col")}
                                            className={`p-2 rounded-md transition-all cursor-pointer ${viewMode === "4-col"
                                                ? "bg-white shadow-sm text-emerald-600"
                                                : "text-stone-500 hover:text-stone-700"
                                                }`}
                                            title="4-column grid"
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("3-col")}
                                            className={`p-2 rounded-md transition-all cursor-pointer ${viewMode === "3-col"
                                                ? "bg-white shadow-sm text-emerald-600"
                                                : "text-stone-500 hover:text-stone-700"
                                                }`}
                                            title="3-column grid"
                                        >
                                            <Grid3x3 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sort Dropdown */}
                                    <SortDropdown value={sortBy} onChange={setSortBy} />
                                </div>
                            </div>

                            {/* Active Filter Chips */}
                            {activeChips.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-stone-100">
                                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mr-1">
                                        Active Filters:
                                    </span>
                                    {activeChips.map((chip) => (
                                        <button
                                            key={chip.key}
                                            onClick={() => handleRemoveFilter(chip.key)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer group"
                                            title={`Remove ${chip.label}`}
                                        >
                                            <span>{chip.label}</span>
                                            <X className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-900" />
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleClearAll}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors ml-2 cursor-pointer"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                        <span>Clear all</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Product Grid */}
                        <div className="p-4 sm:p-8">
                            {isLoading ? (
                                <div
                                    className={`grid gap-4 sm:gap-6 ${viewMode === "4-col"
                                        ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                        : "grid-cols-2 lg:grid-cols-3"
                                        }`}
                                >
                                    {[...Array(8)].map((_, i) => (
                                        <ProductCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : products.length === 0 ? (
                                <div className="py-24 text-center max-w-md mx-auto space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
                                        <X className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-stone-900 mb-1">No products found</h3>
                                        <p className="text-stone-500 text-sm">
                                            No pieces match your current filter combination. Try clearing some filters.
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleClearAll}
                                        className="px-6 py-2.5 bg-stone-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className={`grid gap-4 sm:gap-6 ${viewMode === "4-col"
                                        ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                        : "grid-cols-2 lg:grid-cols-3"
                                        }`}
                                >
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product._id || product.id}
                                            product={product}
                                            onQuickView={setQuickViewProduct}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Pagination (if products exist) */}
                            {products.length > 0 && (
                                <div className="mt-16 flex justify-center">
                                    <div className="flex items-center gap-2">
                                        <button className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-bold text-stone-700 hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer">
                                            Previous
                                        </button>
                                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm">
                                            1
                                        </button>
                                        <button className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-bold text-stone-700 hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    );
};

const ShopPage = () => {
    return (
        <Suspense fallback={<ShopSkeleton />}>
            <ShopContent />
        </Suspense>
    );
};

export default ShopPage;
