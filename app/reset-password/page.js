"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, Loader2, ShoppingBag, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        let newErrors = {};
        if (!formData.password) newErrors.password = "New password is required";
        else if (formData.password.length < 6) newErrors.password = "Min 6 characters required";

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-lg">
                {/* Logo */}
                <div className="flex justify-center mb-12">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-100">
                            <ShoppingBag className="text-white w-7 h-7" />
                        </div>
                        <span className="text-3xl font-black text-stone-900 tracking-tighter uppercase italic">
                            Drop<span className="text-emerald-700">Shop</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] p-8 sm:p-12 border border-stone-100/50">
                    {!isSuccess ? (
                        <>
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-black text-stone-900 uppercase tracking-tight mb-3">Reset Password</h1>
                                <p className="text-stone-400 font-bold text-sm uppercase tracking-wide">Enter your new security credentials</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="relative group">
                                    <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5.5 h-5.5 transition-colors ${errors.password ? "text-red-400" : "text-stone-300 group-focus-within:text-emerald-600"}`} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        className={`w-full pl-14 pr-14 py-5 bg-stone-50 border-2 rounded-[24px] outline-none font-bold text-stone-900 transition-all placeholder:text-stone-300 sm:text-lg ${errors.password ? "border-red-100 bg-red-50/30" : "border-transparent focus:border-emerald-600/20 focus:bg-white"}`}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-900 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5.5 h-5.5" /> : <Eye className="w-5.5 h-5.5" />}
                                    </button>
                                    {errors.password && <p className="absolute left-5 -bottom-5 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.password}</p>}
                                </div>

                                <div className="relative group pt-2">
                                    <ShieldCheck className={`absolute left-5 top-1/2 -translate-y-1/2 w-5.5 h-5.5 transition-colors ${errors.confirmPassword ? "text-red-400" : "text-stone-300 group-focus-within:text-emerald-600"}`} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm New Password"
                                        className={`w-full pl-14 pr-4 py-5 bg-stone-50 border-2 rounded-[24px] outline-none font-bold text-stone-900 transition-all placeholder:text-stone-300 sm:text-lg ${errors.confirmPassword ? "border-red-100 bg-red-50/30" : "border-transparent focus:border-emerald-600/20 focus:bg-white"}`}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                    {errors.confirmPassword && <p className="absolute left-5 -bottom-5 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.confirmPassword}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-stone-900 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-2xl shadow-stone-200 mt-8 disabled:bg-stone-400 flex items-center justify-center gap-3 text-lg"
                                >
                                    {isLoading ? <><Loader2 className="w-6 h-6 animate-spin" /> Updating...</> : "Reset Password"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight mb-4">Password Updated</h2>
                            <p className="text-stone-500 font-bold mb-10 leading-relaxed uppercase text-sm tracking-wide">
                                Your account is now secure. <br />
                                You can now sign in with your new password.
                            </p>
                            <Link
                                href="/"
                                className="inline-block px-12 py-5 bg-stone-900 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-stone-200 text-lg"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center mt-12 text-stone-400 font-bold text-xs uppercase tracking-[0.2em]">
                    &copy; 2026 Nexora Professional • Secured by SSL
                </p>
            </div>
        </div>
    );
}
