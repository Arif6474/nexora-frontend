"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Save, Camera } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileForm() {
    const { user, updateProfile, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        bio: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                bio: user.bio || ""
            });
        }
    }, [user]);

    const handleSave = async (e) => {
        e?.preventDefault?.();
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            // Error is handled in context
        }
    };

    if (loading || !user) return (
        <div className="flex items-center justify-center p-20">
            <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="relative group">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl relative">
                        <img
                            src={user.avatar || "/api/placeholder/400/400"}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-stone-500 hover:text-emerald-600 shadow-xl border border-stone-100 transition-all hover:scale-110 active:scale-95">
                        <Camera className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-between w-full">
                        <div>
                            <h1 className="text-3xl font-black text-stone-900 uppercase tracking-tight mb-2">{user.name}</h1>
                            <p className="text-stone-400 font-bold text-sm uppercase tracking-wide">Account Status: <span className="text-emerald-600">Premium Member</span></p>
                        </div>
                        <button
                            onClick={(e) => isEditing ? handleSave(e) : setIsEditing(true)}
                            className={`hidden md:flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isEditing ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" : "bg-stone-50 text-stone-900 hover:bg-stone-100"}`}
                        >
                            {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-stone-100/50 shadow-xl shadow-stone-200/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                        {isEditing ? (
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent rounded-[24px] outline-none font-bold text-stone-900 transition-all focus:border-emerald-600/10 focus:bg-white"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 p-5 bg-stone-50/50 rounded-[24px] border border-transparent">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <User className="w-6 h-6 text-emerald-600" />
                                </div>
                                <span className="font-bold text-stone-800 text-lg">{user.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                        <div className="flex items-center gap-4 p-5 bg-stone-50/20 rounded-[24px] border border-stone-50 opacity-60">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Mail className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="font-bold text-stone-800 text-lg">{user.email}</span>
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Phone Number</label>
                        {isEditing ? (
                            <div className="relative group">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent rounded-[24px] outline-none font-bold text-stone-900 transition-all focus:border-emerald-600/10 focus:bg-white"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 p-5 bg-stone-50/50 rounded-[24px]">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="font-bold text-stone-800 text-lg">{user.phone || "Not set"}</span>
                            </div>
                        )}
                    </div>

                    {/* Address Field */}
                    <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Delivery Address</label>
                        {isEditing ? (
                            <div className="relative group">
                                <MapPin className="absolute left-5 top-8 w-5 h-5 text-stone-300 group-focus-within:text-emerald-600 transition-colors" />
                                <textarea
                                    rows="3"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent rounded-[24px] outline-none font-bold text-stone-900 transition-all focus:border-emerald-600/10 focus:bg-white resize-none"
                                    placeholder="Enter your full delivery address"
                                />
                            </div>
                        ) : (
                            <div className="flex items-start gap-4 p-5 bg-stone-50/50 rounded-[24px]">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                    <MapPin className="w-6 h-6 text-rose-600" />
                                </div>
                                <span className="font-bold text-stone-800 text-lg leading-relaxed pt-2">{user.address || "Not set"}</span>
                            </div>
                        )}
                    </div>

                    {/* Bio Field */}
                    <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Short Bio</label>
                        {isEditing ? (
                            <textarea
                                rows="3"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full px-6 py-5 bg-stone-50 border-2 border-transparent rounded-[24px] outline-none font-bold text-stone-900 transition-all focus:border-emerald-600/10 focus:bg-white resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        ) : (
                            <div className="p-6 bg-stone-50/50 rounded-[24px] min-h-[100px]">
                                <p className="text-stone-600 font-bold leading-relaxed">{user.bio || "No bio yet."}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 pt-12 border-t border-stone-50 md:hidden">
                    <button
                        onClick={(e) => isEditing ? handleSave(e) : setIsEditing(true)}
                        className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${isEditing ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" : "bg-stone-900 text-white shadow-xl shadow-stone-900/20"}`}
                    >
                        {isEditing ? <><Save className="w-5 h-5" /> Save Changes</> : "Edit Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
}
