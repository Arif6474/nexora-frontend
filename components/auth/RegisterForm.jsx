"use client";

import React, { useState } from "react";
import { Mail, Lock, Loader2, AtSign, ShieldCheck } from "lucide-react";
import FormInput from "./FormInput";

const RegisterForm = ({ onSwitch, onSuccess }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

        if (!formData.password) newErrors.password = "Password is required";
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
            onSuccess?.();
        }, 1500);
    };

    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    icon={AtSign}
                    error={errors.name}
                />

                <FormInput
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    icon={Mail}
                    error={errors.email}
                    className="pt-1"
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

                <FormInput
                    isPassword
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    icon={ShieldCheck}
                    error={errors.confirmPassword}
                    className="pt-1"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-xl shadow-stone-200 mt-6 disabled:bg-stone-400 flex items-center justify-center gap-2"
                >
                    {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</> : "Join Nexora"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm font-bold text-stone-400">
                <p>Already have an account? <button onClick={onSwitch} className="text-emerald-700 hover:underline uppercase tracking-tight">Sign In</button></p>
            </div>
        </div>
    );
};

export default RegisterForm;
