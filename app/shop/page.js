"use client";

import React, { useState } from "react";
import FilterSection from "../../components/shop/FilterSection";
import SortDropdown from "../../components/shop/SortDropdown";
import ProductCard from "../../components/shop/ProductCard";
import QuickViewModal from "../../components/shop/QuickViewModal";
import { Grid3x3, LayoutGrid, Loader2 } from "lucide-react";
import useFetch from "@/utils/hooks/useFetch";
import { GET_ALL_PRODUCTS_WITH_QUERY_API } from "@/utils/APIs";

const ShopPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("4-col");
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    // Filter state
    const [selectedFilters, setSelectedFilters] = useState({
        category: "",
        subcategory: "",
        brand: "",
    });

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (selectedFilters.category) queryParams.append("category", selectedFilters.category);
    if (selectedFilters.subcategory) queryParams.append("subcategory", selectedFilters.subcategory);
    if (selectedFilters.brand) queryParams.append("brand", selectedFilters.brand);
    if (sortBy) queryParams.append("sortBy", sortBy);

    const url = `${GET_ALL_PRODUCTS_WITH_QUERY_API}?${queryParams.toString()}`;
    const { data: products = [], isLoading } = useFetch(url);

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Page Header */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 mb-3 tracking-tight">
                        Shop All Products
                    </h1>
                    <p className="text-base sm:text-lg text-stone-600 font-medium">
                        Discover our curated collection of premium fashion pieces
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
                        onFilterChange={setSelectedFilters}
                    />

                    {/* Products Section */}
                    <div className="flex-1 min-w-0">
                        {/* Top Bar */}
                        <div className="bg-white border-b border-stone-200 px-4 sm:px-8 py-4 sticky top-0 z-10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <p className="text-sm font-medium text-stone-600">
                                        Showing <span className="font-black text-stone-900">{products.length}</span> products
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    {/* View Mode Toggle */}
                                    <div className="hidden sm:flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode("4-col")}
                                            className={`p-2 rounded-md transition-all ${viewMode === "4-col"
                                                ? "bg-white shadow-sm text-emerald-600"
                                                : "text-stone-500 hover:text-stone-700"
                                                }`}
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("3-col")}
                                            className={`p-2 rounded-md transition-all ${viewMode === "3-col"
                                                ? "bg-white shadow-sm text-emerald-600"
                                                : "text-stone-500 hover:text-stone-700"
                                                }`}
                                        >
                                            <Grid3x3 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sort Dropdown */}
                                    <SortDropdown value={sortBy} onChange={setSortBy} />
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="p-4 sm:p-8">
                            {isLoading ? (
                                <div className="py-20 flex justify-center items-center">
                                    <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                                </div>
                            ) : products.length === 0 ? (
                                <div className="py-20 text-center">
                                    <p className="text-2xl font-black text-stone-400 mb-2">No products found</p>
                                    <p className="text-stone-500">Try adjusting your filters</p>
                                </div>
                            ) : (
                                <div
                                    className={`grid gap-2 sm:gap-4 ${viewMode === "4-col"
                                        ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                        : "grid-cols-2 lg:grid-cols-3"
                                        }`}
                                >
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            onQuickView={setQuickViewProduct}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-bold text-stone-700 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                                        Previous
                                    </button>
                                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold">
                                        1
                                    </button>
                                    <button className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-bold text-stone-700 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                                        2
                                    </button>
                                    <button className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-bold text-stone-700 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                                        3
                                    </button>
                                    <button className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-bold text-stone-700 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                                        Next
                                    </button>
                                </div>
                            </div>
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

export default ShopPage;
