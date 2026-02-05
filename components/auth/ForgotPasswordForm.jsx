"use client";

import React, { useState } from "react";
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import FormInput from "./FormInput";

const ForgotPasswordForm = ({ onBack, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        if (!email) {
            setError("Email is required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight mb-2">Check Your Email</h3>
                <p className="text-stone-500 font-bold text-sm leading-relaxed mb-8">
                    We&apos;ve sent password reset instructions to <br />
                    <span className="text-emerald-700">{email}</span>
                </p>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-stone-400 hover:text-emerald-700 font-black text-xs uppercase tracking-widest transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={Mail}
                    error={error}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-xl shadow-stone-200 disabled:bg-stone-400 flex items-center justify-center gap-2"
                >
                    {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : "Send Reset Link"}
                </button>
            </form>

            <div className="mt-8 text-center pt-2">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 mx-auto text-stone-400 hover:text-emerald-700 font-black text-xs uppercase tracking-widest transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
