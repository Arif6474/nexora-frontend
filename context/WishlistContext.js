"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("nexora-wishlist");
        if (saved) {
            try {
                setWishlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    // Save to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("nexora-wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // Accepts a full product object
    const toggleWishlist = (product) => {
        if (!product?._id) return;
        setWishlist((prev) => {
            const exists = prev.some((p) => p._id === product._id);
            if (exists) {
                return prev.filter((p) => p._id !== product._id);
            } else {
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (productId) => wishlist.some((p) => p._id === productId);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
