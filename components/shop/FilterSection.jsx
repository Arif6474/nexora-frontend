"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal, Loader2 } from "lucide-react";
import useFetch from "@/utils/hooks/useFetch";
import { CATEGORIES_API, BRANDS_API, SUBCATEGORIES_BY_CATEGORY_API } from "@/utils/APIs";

const FilterSection = ({ isOpen, onToggle, selectedFilters, onFilterChange }) => {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        subcategory: false,
        brand: false,
        size: false,
        color: false,
        discount: false,
    });

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleFilterChange = (type, value) => {
        const newFilters = {
            ...selectedFilters,
            [type]: selectedFilters[type] === value ? "" : value,
        };
        onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        onFilterChange({
            category: "",
            subcategory: "",
            brand: "",
            size: "",
            color: "",
            discount: "",
        });
    };

    const totalActiveFilters = Object.values(selectedFilters).filter(v => v !== "").length;

    // Fetch dynamic data
    const { data: categories = [], isLoading: isLoadingCats } = useFetch(CATEGORIES_API);
    const { data: brands = [], isLoading: isLoadingBrands } = useFetch(BRANDS_API);

    const { data: subcategories = [], isLoading: isLoadingSubcats } = useFetch(
        selectedFilters.category ? `${SUBCATEGORIES_BY_CATEGORY_API}${selectedFilters.category}` : null,
        !!selectedFilters.category
    );

    // Optional: Hide sizes, colors, and static discounts if not supported by backend.
    // We'll keep them as empty arrays for now if unused, or remove them entirely from rendering.

    const FilterRadio = ({ label, checked, onChange, name }) => (
        <label className="flex items-center gap-3 py-2 cursor-pointer group">
            <div className="relative">
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-stone-300 rounded-full peer-checked:border-emerald-600 transition-all group-hover:border-emerald-500" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-600 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">{label}</span>
        </label>
    );

    const FilterGroup = ({ title, items, type, isExpanded }) => (
        <div className="border-b border-stone-200 last:border-0">
            <button
                onClick={() => toggleSection(type)}
                className="w-full flex items-center justify-between py-4 text-left group"
            >
                <span className="text-sm font-black uppercase tracking-wider text-stone-900">{title}</span>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-500 group-hover:text-emerald-600 transition-colors" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500 group-hover:text-emerald-600 transition-colors" />
                )}
            </button>
            {isExpanded && (
                <div className="pb-4 space-y-1">
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <FilterRadio
                                key={item._id}
                                label={item.name}
                                name={type}
                                checked={selectedFilters[type] === item._id}
                                onChange={() => handleFilterChange(type, item._id)}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-stone-500 italic py-2">
                            {type === 'subcategory' && !selectedFilters.category ? 'Select a category first' : 'No options available'}
                        </p>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* Mobile Filter Toggle Button */}
            <button
                onClick={onToggle}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
                <SlidersHorizontal className="w-6 h-6" />
                {totalActiveFilters > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 text-white text-xs font-black rounded-full flex items-center justify-center">
                        {totalActiveFilters}
                    </span>
                )}
            </button>

            {/* Filter Sidebar */}
            <div
                className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white border-r border-stone-200 z-40 transition-transform duration-300 overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-lg font-black uppercase tracking-wider text-stone-900">Filters</h2>
                            {totalActiveFilters > 0 && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full">
                                    {totalActiveFilters}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onToggle}
                            className="lg:hidden w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5 text-stone-500" />
                        </button>
                    </div>

                    {/* Clear All Button */}
                    {totalActiveFilters > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="w-full mb-6 py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-lg transition-colors"
                        >
                            Clear All Filters
                        </button>
                    )}

                    {/* Filter Groups */}
                    <div className="space-y-0">
                        <FilterGroup
                            title="Category"
                            items={categories}
                            type="category"
                            isExpanded={expandedSections.category}
                        />
                        <FilterGroup
                            title="Subcategory"
                            items={subcategories}
                            type="subcategory"
                            isExpanded={expandedSections.subcategory}
                        />
                        <FilterGroup
                            title="Brand"
                            items={brands}
                            type="brand"
                            isExpanded={expandedSections.brand}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={onToggle}
                    className="lg:hidden fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-30 animate-fade-in"
                />
            )}
        </>
    );
};

export default FilterSection;
