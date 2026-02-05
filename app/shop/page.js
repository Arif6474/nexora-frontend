"use client";

import React, { useState, useMemo } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import FilterSection from "../../components/shop/FilterSection";
import SortDropdown from "../../components/shop/SortDropdown";
import ProductCard from "../../components/shop/ProductCard";
import { Grid3x3, LayoutGrid } from "lucide-react";

const ShopPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("featured");
    const [viewMode, setViewMode] = useState("4-col"); // 4-col or 3-col

    // Filter state
    const [selectedFilters, setSelectedFilters] = useState({
        category: "",
        subcategory: "",
        brand: "",
        size: "",
        color: "",
        discount: "",
    });

    // Sample product data with metadata for filtering
    const allProducts = [
        // Men's Products
        {
            id: 1,
            name: "Premium Emerald Blazer",
            price: 299,
            originalPrice: 399,
            discount: 25,
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=533&fit=crop",
            rating: 4.8,
            reviews: 124,
            badge: "New",
            category: "Men",
            subcategory: "Jackets",
            brand: "Gucci",
            size: "L",
            color: "Emerald",
        },
        {
            id: 2,
            name: "Minimalist Stone Trousers",
            price: 149,
            originalPrice: null,
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=533&fit=crop",
            rating: 4.5,
            reviews: 89,
            category: "Men",
            subcategory: "Jeans",
            brand: "Zara",
            size: "M",
            color: "Stone",
        },
        {
            id: 3,
            name: "Luxury White T-Shirt",
            price: 79,
            originalPrice: 99,
            discount: 20,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=533&fit=crop",
            rating: 4.9,
            reviews: 256,
            category: "Men",
            subcategory: "T-Shirts",
            brand: "Uniqlo",
            size: "XL",
            color: "White",
        },
        {
            id: 4,
            name: "Wool Blend Overcoat",
            price: 399,
            originalPrice: null,
            image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=533&fit=crop",
            rating: 4.7,
            reviews: 67,
            category: "Men",
            subcategory: "Jackets",
            brand: "Gucci",
        },
        {
            id: 5,
            name: "Slim Fit Denim Jeans",
            price: 89,
            originalPrice: 129,
            discount: 31,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=533&fit=crop",
            rating: 4.6,
            reviews: 198,
            category: "Men",
            subcategory: "Jeans",
            brand: "H&M",
        },
        {
            id: 6,
            name: "Classic Polo Shirt",
            price: 59,
            originalPrice: null,
            image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=533&fit=crop",
            rating: 4.4,
            reviews: 145,
            category: "Men",
            subcategory: "T-Shirts",
            brand: "Nike",
            size: "M",
            color: "Blue",
        },

        // Kids Products
        {
            id: 13,
            name: "Kids Sneakers",
            price: 89,
            originalPrice: 119,
            discount: 25,
            image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=533&fit=crop",
            rating: 4.6,
            reviews: 54,
            category: "Kids",
            subcategory: "Sneakers",
            brand: "Adidas",
        },
        {
            id: 14,
            name: "Kids Graphic T-Shirt",
            price: 29,
            originalPrice: 45,
            discount: 36,
            image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=533&fit=crop",
            rating: 4.7,
            reviews: 112,
            category: "Kids",
            subcategory: "T-Shirts",
            brand: "Nike",
        },
        {
            id: 15,
            name: "Kids Denim Jacket",
            price: 79,
            originalPrice: null,
            image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop",
            rating: 4.5,
            reviews: 67,
            category: "Kids",
            subcategory: "Jackets",
            brand: "Zara",
        },
        {
            id: 16,
            name: "Kids Stretch Jeans",
            price: 49,
            originalPrice: 69,
            discount: 29,
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=533&fit=crop",
            rating: 4.6,
            reviews: 93,
            category: "Kids",
            subcategory: "Jeans",
            brand: "H&M",
        },

        // Shoes
        {
            id: 17,
            name: "Premium Black Sneakers",
            price: 199,
            originalPrice: null,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=533&fit=crop",
            rating: 4.7,
            reviews: 178,
            badge: "Best Seller",
            category: "Shoes",
            subcategory: "Sneakers",
            brand: "Nike",
        },
        {
            id: 18,
            name: "Sport Running Shoes",
            price: 159,
            originalPrice: 199,
            discount: 20,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop",
            rating: 4.9,
            reviews: 312,
            category: "Shoes",
            subcategory: "Sneakers",
            brand: "Nike",
        },
        {
            id: 19,
            name: "Casual White Sneakers",
            price: 129,
            originalPrice: null,
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=533&fit=crop",
            rating: 4.5,
            reviews: 167,
            category: "Shoes",
            subcategory: "Sneakers",
            brand: "Adidas",
        },
        {
            id: 20,
            name: "Classic Leather Sneakers",
            price: 179,
            originalPrice: 249,
            discount: 28,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=533&fit=crop",
            rating: 4.8,
            reviews: 201,
            category: "Shoes",
            subcategory: "Sneakers",
            brand: "Adidas",
        },

        // Accessories
        {
            id: 21,
            name: "Leather Crossbody Bag",
            price: 229,
            originalPrice: 299,
            discount: 23,
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop",
            rating: 4.9,
            reviews: 201,
            badge: "New",
            category: "Accessories",
            subcategory: "Bags",
            brand: "Prada",
        },
        {
            id: 22,
            name: "Designer Sunglasses",
            price: 249,
            originalPrice: 349,
            discount: 29,
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=533&fit=crop",
            rating: 4.7,
            reviews: 89,
            category: "Accessories",
            subcategory: "Bags",
            brand: "Prada",
        },
        {
            id: 23,
            name: "Canvas Tote Bag",
            price: 79,
            originalPrice: 119,
            discount: 34,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=533&fit=crop",
            rating: 4.6,
            reviews: 156,
            category: "Accessories",
            subcategory: "Bags",
            brand: "Zara",
        },
        {
            id: 24,
            name: "Luxury Leather Wallet",
            price: 149,
            originalPrice: null,
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=533&fit=crop",
            rating: 4.8,
            reviews: 134,
            category: "Accessories",
            subcategory: "Bags",
            brand: "Gucci",
        },

        // Additional variety for 50%+ discount filter
        {
            id: 26,
            name: "Outlet Sneakers",
            price: 69,
            originalPrice: 149,
            discount: 54,
            image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=533&fit=crop",
            rating: 4.4,
            reviews: 112,
            badge: "Sale",
            category: "Shoes",
            subcategory: "Sneakers",
            brand: "Nike",
        },
        {
            id: 27,
            name: "End of Season Jacket",
            price: 99,
            originalPrice: 249,
            discount: 60,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=533&fit=crop",
            rating: 4.5,
            reviews: 76,
            badge: "Sale",
            category: "Men",
            subcategory: "Jackets",
            brand: "Zara",
        },
        {
            id: 28,
            name: "Clearance Kids T-Shirt Pack",
            price: 19,
            originalPrice: 49,
            discount: 61,
            image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop",
            rating: 4.2,
            reviews: 145,
            badge: "Sale",
            category: "Kids",
            subcategory: "T-Shirts",
            brand: "Uniqlo",
        },
    ];

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Apply category filter
        if (selectedFilters.category) {
            filtered = filtered.filter((product) =>
                product.category === selectedFilters.category
            );
        }

        // Apply subcategory filter
        if (selectedFilters.subcategory) {
            filtered = filtered.filter((product) =>
                product.subcategory === selectedFilters.subcategory
            );
        }

        // Apply brand filter
        if (selectedFilters.brand) {
            filtered = filtered.filter((product) =>
                product.brand === selectedFilters.brand
            );
        }

        // Apply size filter
        if (selectedFilters.size) {
            filtered = filtered.filter((product) =>
                product.size === selectedFilters.size
            );
        }

        // Apply color filter
        if (selectedFilters.color) {
            filtered = filtered.filter((product) =>
                product.color === selectedFilters.color
            );
        }

        // Apply discount filter
        if (selectedFilters.discount) {
            const minDiscount = parseInt(selectedFilters.discount);
            filtered = filtered.filter((product) =>
                (product.discount || 0) >= minDiscount
            );
        }

        // Apply sorting
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                filtered.reverse();
                break;
            case "best-selling":
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                break;
        }

        return filtered;
    }, [selectedFilters, sortBy]);

    return (
        <div className="min-h-screen bg-stone-50">
            <Navbar />

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
                                        Showing <span className="font-black text-stone-900">{filteredAndSortedProducts.length}</span> of <span className="font-black text-stone-900">{allProducts.length}</span> products
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
                            {filteredAndSortedProducts.length === 0 ? (
                                <div className="py-20 text-center">
                                    <p className="text-2xl font-black text-stone-400 mb-2">No products found</p>
                                    <p className="text-stone-500">Try adjusting your filters</p>
                                </div>
                            ) : (
                                <div
                                    className={`grid gap-6 ${viewMode === "4-col"
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                        }`}
                                >
                                    {filteredAndSortedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
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

            <Footer />
        </div>
    );
};

export default ShopPage;
