"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const SortDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const sortOptions = [
        { value: "featured", label: "Featured" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "newest", label: "Newest First" },
        { value: "best-selling", label: "Best Selling" },
    ];

    const selectedOption = sortOptions.find((opt) => opt.value === value) || sortOptions[0];

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl hover:border-emerald-500 transition-all font-medium text-sm text-stone-700 min-w-[200px] justify-between"
            >
                <span className="text-stone-900 font-bold">{selectedOption.label}</span>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full mt-2 right-0 w-full bg-white border border-stone-200 rounded-xl shadow-2xl z-20 overflow-hidden animate-fade-in-up">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between ${option.value === value
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-stone-700 hover:bg-stone-50"
                                    }`}
                            >
                                {option.label}
                                {option.value === value && <Check className="w-4 h-4 text-emerald-600" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SortDropdown;
