"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("nexora-user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
        setLoading(false);
    }, []);

    // Save user to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("nexora-user", JSON.stringify(user));
        } else {
            localStorage.removeItem("nexora-user");
        }
    }, [user]);

    const login = async (email, password) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = {
                    id: "user-123",
                    name: "John Doe",
                    email: email,
                    phone: "+880 1234 567 890",
                    address: "123 Luxury Lane, Banani, Dhaka",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                };
                setUser(newUser);
                resolve(newUser);
            }, 1000);
        });
    };

    const register = async (userData) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = {
                    id: `user-${Math.random().toString(36).substr(2, 9)}`,
                    ...userData,
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                };
                setUser(newUser);
                resolve(newUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
    };

    const updateProfile = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
