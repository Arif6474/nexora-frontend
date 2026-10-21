"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    Camera,
    Pencil,
    X,
    CheckCircle2,
    ShieldCheck,
    Package,
    Heart,
    Sparkles,
    Loader2,
    ArrowUpRight
} from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { getAvatarUrl, getInitials } from "@/utils/avatar";
import toast from "react-hot-toast";

export default function ProfileForm() {
    const { user, updateProfile, loading } = useAuth();
    const { wishlist } = useWishlist();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
        image: ""
    });

    const avatarUrl = formData.image?.trim() || getAvatarUrl(user);
    const initials = getInitials(formData.name || user?.name);

    useEffect(() => {
        setImageError(false);
    }, [avatarUrl]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                bio: user.bio || "",
                image: user.image || user.avatar || ""
            });
        }
    }, [user]);

    const resetForm = () => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                bio: user.bio || "",
                image: user.image || user.avatar || ""
            });
        }
    };

    const handleSave = async (e) => {
        e?.preventDefault?.();
        setSaving(true);
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            // Error handled in AuthContext
        } finally {
            setSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="animate-fade-in space-y-8">
                {/* Header Skeleton */}
                <div className="bg-white rounded-[36px] p-6 sm:p-8 border border-stone-100 shadow-xl shadow-stone-200/20">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Skeleton className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] flex-shrink-0" />
                        <div className="flex-1 text-center sm:text-left space-y-3 w-full">
                            <Skeleton className="h-4 w-24 rounded-md mx-auto sm:mx-0" />
                            <Skeleton className="h-8 w-56 rounded-xl mx-auto sm:mx-0" />
                            <Skeleton className="h-4 w-40 rounded-md mx-auto sm:mx-0 opacity-70" />
                            <div className="flex justify-center sm:justify-start gap-2 pt-2">
                                <Skeleton className="h-6 w-28 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Card Skeleton */}
                <div className="bg-white rounded-[36px] p-8 sm:p-12 border border-stone-100 shadow-xl shadow-stone-200/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="h-3 w-24 rounded" />
                                <Skeleton className="h-16 w-full rounded-[24px]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-8">
            {/* 1. Header Profile Banner Card */}
            <div className="bg-white rounded-[36px] p-6 sm:p-8 border border-stone-100 shadow-xl shadow-stone-200/30 transition-all">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                        {/* Avatar */}
                        <div className="relative group flex-shrink-0">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[32px] overflow-hidden border-4 border-white shadow-xl shadow-stone-200/60 relative bg-emerald-50 flex items-center justify-center">
                                {avatarUrl && !imageError ? (
                                    <img
                                        src={avatarUrl}
                                        alt={user.name || "User"}
                                        onError={() => setImageError(true)}
                                        className="w-full h-full object-cover"
                                    />
                                ) : initials ? (
                                    <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center text-white font-black text-3xl sm:text-4xl uppercase select-none shadow-inner tracking-wider">
                                        {initials}
                                    </div>
                                ) : (
                                    <User className="w-14 h-14 text-emerald-700" />
                                )}
                            </div>

                            {/* Camera overlay / trigger */}
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                title="Change avatar photo"
                                className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 w-10 h-10 sm:w-11 sm:h-11 bg-white hover:bg-emerald-50 rounded-2xl flex items-center justify-center text-stone-600 hover:text-emerald-700 shadow-lg border border-stone-100 transition-all hover:scale-105 active:scale-95"
                            >
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Name & Details */}
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">
                                Customer Account
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 uppercase tracking-tight">
                                {user.name || "Customer"}
                            </h2>
                            <p className="text-xs sm:text-sm font-semibold text-stone-500 mt-0.5 truncate">
                                {user.email}
                            </p>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-black uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active Member
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-black uppercase tracking-wider">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                        {isEditing ? (
                            <div className="flex items-center justify-center sm:justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        resetForm();
                                    }}
                                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-xs uppercase tracking-wider transition-all"
                                >
                                    <X className="w-3.5 h-3.5" />
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-3.5 h-3.5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-stone-900/10 hover:shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Quick Dashboard Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                    href="/profile/orders"
                    className="group bg-white rounded-[28px] p-5 border border-stone-100 shadow-lg shadow-stone-200/30 hover:border-emerald-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Package className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">
                        My Orders
                    </p>
                    <p className="text-sm font-black text-stone-900 uppercase">
                        Track Purchases
                    </p>
                </Link>

                <div className="bg-white rounded-[28px] p-5 border border-stone-100 shadow-lg shadow-stone-200/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                            <Heart className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">
                            {wishlist?.length || 0}
                        </span>
                    </div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">
                        Saved Items
                    </p>
                    <p className="text-sm font-black text-stone-900 uppercase">
                        {wishlist?.length || 0} in Wishlist
                    </p>
                </div>

                <Link
                    href="/profile/settings"
                    className="group bg-white rounded-[28px] p-5 border border-stone-100 shadow-lg shadow-stone-200/30 hover:border-emerald-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-sky-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">
                        Security
                    </p>
                    <p className="text-sm font-black text-stone-900 uppercase">
                        Account Settings
                    </p>
                </Link>
            </div>

            {/* 3. Personal Information Card */}
            <div className="bg-white rounded-[36px] p-6 sm:p-10 border border-stone-100 shadow-xl shadow-stone-200/30">
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-100">
                    <div>
                        <h3 className="text-lg font-black text-stone-900 uppercase tracking-tight">
                            Personal Information
                        </h3>
                        <p className="text-xs text-stone-400 font-medium mt-0.5">
                            Manage your personal profile and delivery preferences
                        </p>
                    </div>
                    {isEditing && (
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-black uppercase tracking-wider">
                            Editing Mode
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Full Name */}
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                            Full Name
                        </label>
                        {isEditing ? (
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-2xl outline-none font-bold text-stone-900 transition-all focus:border-emerald-600 focus:bg-white text-sm shadow-xs"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3.5 p-4 bg-stone-50/80 rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-700 shadow-xs flex-shrink-0">
                                    <User className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-stone-900 text-sm">
                                    {user.name || "Not set"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                                Email Address
                            </label>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                Primary
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-stone-50/80 rounded-2xl border border-stone-100">
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-xs flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-stone-800 text-sm truncate">
                                    {user.email}
                                </span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider flex-shrink-0">
                                Verified
                            </span>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                            Phone Number
                        </label>
                        {isEditing ? (
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-2xl outline-none font-bold text-stone-900 transition-all focus:border-emerald-600 focus:bg-white text-sm shadow-xs"
                                    placeholder="+880 1XXXXXXXXX"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3.5 p-4 bg-stone-50/80 rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sky-600 shadow-xs flex-shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-stone-900 text-sm">
                                    {user.phone ? (
                                        user.phone
                                    ) : (
                                        <span className="text-stone-400 italic font-medium">Not provided</span>
                                    )}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Avatar URL in edit mode */}
                    {isEditing ? (
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                                Avatar Photo URL
                            </label>
                            <div className="relative group">
                                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-2xl outline-none font-bold text-stone-900 transition-all focus:border-emerald-600 focus:bg-white text-sm shadow-xs"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                                Account Security
                            </label>
                            <div className="flex items-center gap-3.5 p-4 bg-stone-50/80 rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-xs flex-shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-stone-800 text-sm">
                                    Protected Password
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Delivery Address */}
                    <div className="space-y-2.5 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                            Delivery Address
                        </label>
                        {isEditing ? (
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-4 w-4 h-4 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                                <textarea
                                    rows="3"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-2xl outline-none font-bold text-stone-900 transition-all focus:border-emerald-600 focus:bg-white text-sm shadow-xs resize-none"
                                    placeholder="Enter your street address, apartment, city, and postal code"
                                />
                            </div>
                        ) : (
                            <div className="flex items-start gap-3.5 p-4 bg-stone-50/80 rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-xs flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 pt-2">
                                    {user.address ? (
                                        <p className="font-bold text-stone-900 text-sm leading-relaxed">
                                            {user.address}
                                        </p>
                                    ) : (
                                        <p className="text-stone-400 italic font-medium text-sm">
                                            No delivery address specified yet. Click "Edit Profile" to add one.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Short Bio */}
                    <div className="space-y-2.5 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                            About Me / Bio
                        </label>
                        {isEditing ? (
                            <div className="relative group">
                                <Sparkles className="absolute left-4 top-4 w-4 h-4 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                                <textarea
                                    rows="3"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200/80 rounded-2xl outline-none font-bold text-stone-900 transition-all focus:border-emerald-600 focus:bg-white text-sm shadow-xs resize-none"
                                    placeholder="Tell us a little bit about yourself or your style preferences..."
                                />
                            </div>
                        ) : (
                            <div className="flex items-start gap-3.5 p-4 bg-stone-50/80 rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-xs flex-shrink-0">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 pt-2">
                                    {user.bio ? (
                                        <p className="font-bold text-stone-800 text-sm leading-relaxed">
                                            {user.bio}
                                        </p>
                                    ) : (
                                        <p className="text-stone-400 italic font-medium text-sm">
                                            No bio added yet.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Bottom Action Button */}
                {isEditing && (
                    <div className="mt-8 pt-6 border-t border-stone-100 flex sm:hidden items-center gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                resetForm();
                            }}
                            className="flex-1 py-3.5 rounded-2xl bg-stone-100 text-stone-700 font-black text-xs uppercase tracking-wider"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
