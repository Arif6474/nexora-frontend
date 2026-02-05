"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthModal = ({ isOpen, onClose }) => {
    const [authView, setAuthView] = useState("login"); // 'login', 'register', or 'forgot-password'

    // Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setAuthView("login"); // Reset to login when opening
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const getHeaderInfo = () => {
        switch (authView) {
            case "register":
                return {
                    title: "Join Nexora",
                    subtitle: "Start Your Professional Journey"
                };
            case "forgot-password":
                return {
                    title: "Recover Access",
                    subtitle: "We'll help you get back in"
                };
            default:
                return {
                    title: "Welcome Back",
                    subtitle: "Premium Shopping Experience"
                };
        }
    };

    const header = getHeaderInfo();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop Layer */}
            <div
                className={`absolute inset-0 bg-stone-900/40 backdrop-blur-xl transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative w-full max-w-lg bg-white rounded-[40px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 ${isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-95"}`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 text-stone-300 hover:text-stone-900 hover:bg-stone-50 rounded-full transition-all z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="p-8 sm:p-10 text-center">
                    <div className="inline-flex w-16 h-16 bg-emerald-50 rounded-3xl items-center justify-center mb-6">
                        <ShoppingBag className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h2 className="text-3xl font-black text-stone-900 tracking-tight uppercase">
                        {header.title}
                    </h2>
                    <p className="text-stone-400 font-bold mt-2 text-sm uppercase tracking-wide">
                        {header.subtitle}
                    </p>
                </div>

                <div className="px-8 sm:px-12 pb-10">
                    {/* Social Login (Hidden for forgot password) */}
                    {authView !== "forgot-password" && (
                        <>
                            <button className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-stone-100 rounded-2xl font-black text-stone-900 hover:bg-stone-50 hover:border-stone-200 transition-all active:scale-[0.98] group">
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-stone-100"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
                                    <span className="bg-white px-4 text-stone-300">Or continue with</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Dynamic Auth Forms */}
                    {authView === "login" ? (
                        <LoginForm
                            onSwitch={() => setAuthView("register")}
                            onForgotPassword={() => setAuthView("forgot-password")}
                            onSuccess={onClose}
                        />
                    ) : authView === "register" ? (
                        <RegisterForm
                            onSwitch={() => setAuthView("login")}
                            onSuccess={onClose}
                        />
                    ) : (
                        <ForgotPasswordForm
                            onBack={() => setAuthView("login")}
                            onSuccess={onClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
