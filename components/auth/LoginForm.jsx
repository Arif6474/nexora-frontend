"use client";

import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import FormInput from "./FormInput";
import { useAuth } from "@/context/AuthContext";

const LoginForm = ({ onSwitch, onForgotPassword, onSuccess }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const validate = () => {
        let newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

        if (!formData.password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            onSuccess?.();
        } catch (error) {
            setErrors({ submit: "Failed to login. Please check your credentials." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    icon={Mail}
                    error={errors.email}
                />

                <FormInput
                    isPassword
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    icon={Lock}
                    error={errors.password}
                    className="pt-1"
                />

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-xs font-black text-emerald-700 hover:underline uppercase tracking-tight"
                    >
                        Forgot Password?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-xl shadow-stone-200 mt-4 disabled:bg-stone-400 flex items-center justify-center gap-2"
                >
                    {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : "Sign In"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm font-bold text-stone-400">
                <p>Don&apos;t have an account? <button onClick={onSwitch} className="text-emerald-700 hover:underline uppercase tracking-tight">Register Now</button></p>
            </div>
        </div>
    );
};

export default LoginForm;
