"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { LOGIN_API, REGISTER_API, LOGIN_WITH_GOOGLE_API, UPDATE_PROFILE_API } from "@/utils/APIs";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
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
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // Google Login synchronization
    useEffect(() => {
        const syncGoogleUser = async () => {
            if (status === "authenticated" && session?.user?.email && session?.user?.name) {
                try {
                    const res = await axios.post(LOGIN_WITH_GOOGLE_API, {
                        email: session.user.email,
                        name: session.user.name,
                        phone: session.user.phone || "",
                        image: session.user.image || "",
                    });

                    if (res.status === 200) {
                        const userData = res.data;
                        setUser(userData);
                        // toast.success("Google login successful!");
                    }
                } catch (err) {
                    console.error("Google login synchronization error:", err);
                }
            }
        };

        syncGoogleUser();
    }, [status, session]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(LOGIN_API, { email, password });
            if (res.status === 200) {
                const userData = res.data;
                setUser(userData);
                toast.success("Logged in successfully!");
                return userData;
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post(REGISTER_API, userData);
            if (res.status === 201) {
                const newUser = res.data;
                console.log(newUser);
                setUser(newUser);
                toast.success("Account created successfully!");
                return newUser;
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Failed to create account. Please try again.");
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
    };

    const updateProfile = async (updatedData) => {
        try {
            const res = await axios.patch(UPDATE_PROFILE_API, updatedData, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            if (res.status === 200) {
                const updatedUser = { ...user, ...res.data };
                setUser(updatedUser);
                // Notification is handled in the component for more specific feedback if needed, 
                // but adding it here for consistency with login/register
                toast.success("Profile updated successfully!");
                return updatedUser;
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
            throw error;
        }
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
