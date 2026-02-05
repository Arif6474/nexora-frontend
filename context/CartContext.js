"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("nexora-cart");
        if (saved) {
            try {
                setCart(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("nexora-cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, color, quantity = 1) => {
        setCart((prev) => {
            // Check if item with same size and color already exists
            const existingItemIndex = prev.findIndex(
                (item) => item.id === product.id && item.size === size && item.color === color
            );

            if (existingItemIndex > -1) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prev, { ...product, size, color, quantity }];
            }
        });
    };

    const removeFromCart = (productId, size, color) => {
        setCart((prev) => prev.filter(
            (item) => !(item.id === productId && item.size === size && item.color === color)
        ));
    };

    const updateQuantity = (productId, size, color, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prev) => prev.map((item) =>
            (item.id === productId && item.size === size && item.color === color)
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
