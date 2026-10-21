"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Package, Settings, ChevronRight, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAvatarUrl, getInitials } from "@/utils/avatar";

export default function ProfileSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [imageError, setImageError] = useState(false);

    const avatarUrl = getAvatarUrl(user);
    const initials = getInitials(user?.name);

    useEffect(() => {
        setImageError(false);
    }, [avatarUrl]);

    const menuItems = [
        { id: "info", label: "Account Overview", href: "/profile", icon: User },
        { id: "orders", label: "My Orders", href: "/profile/orders", icon: Package },
        { id: "settings", label: "Settings", href: "/profile/settings", icon: Settings },
    ];

    return (
        <aside className="bg-white rounded-[32px] p-5 sm:p-6 border border-stone-100 shadow-xl shadow-stone-200/40">
            {/* User Mini Profile Badge */}
            {user && (
                <div className="flex items-center gap-3.5 pb-6 mb-5 border-b border-stone-100">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-100 bg-emerald-50 flex items-center justify-center flex-shrink-0 shadow-sm">
                        {avatarUrl && !imageError ? (
                            <img
                                src={avatarUrl}
                                alt={user.name || "User"}
                                onError={() => setImageError(true)}
                                className="w-full h-full object-cover"
                            />
                        ) : initials ? (
                            <span className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white font-black text-sm flex items-center justify-center uppercase select-none tracking-tight">
                                {initials}
                            </span>
                        ) : (
                            <User className="w-5 h-5 text-emerald-700" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none mb-1">
                            Welcome
                        </p>
                        <h4 className="font-black text-sm text-stone-900 uppercase truncate">
                            {user.name || "Customer"}
                        </h4>
                        <p className="text-[11px] text-stone-400 font-medium truncate mt-0.5">
                            {user.email}
                        </p>
                    </div>
                </div>
            )}

            {/* Menu List */}
            <div className="mb-2">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] px-3 mb-3">
                    Menu
                </p>
            </div>

            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`group flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-wider ${
                                isActive
                                    ? "bg-stone-900 text-white shadow-xl shadow-stone-900/15"
                                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                            }`}
                        >
                            <div className="flex items-center gap-3.5">
                                <Icon
                                    size={18}
                                    className={`transition-colors ${
                                        isActive
                                            ? "text-emerald-400"
                                            : "text-stone-400 group-hover:text-emerald-600"
                                    }`}
                                />
                                <span>{item.label}</span>
                            </div>
                            {isActive ? (
                                <ChevronRight size={14} className="text-emerald-400" />
                            ) : (
                                <ChevronRight
                                    size={14}
                                    className="text-stone-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                                />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-4 border-t border-stone-100 mt-2">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-2xl text-stone-400 hover:text-red-600 hover:bg-red-50/80 transition-all font-black text-xs uppercase tracking-wider group"
                    >
                        <div className="flex items-center gap-3.5">
                            <LogOut
                                size={18}
                                className="text-stone-400 group-hover:text-red-500 transition-colors"
                            />
                            <span>Logout</span>
                        </div>
                        <span className="text-[10px] font-bold text-stone-400 group-hover:text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Sign Out
                        </span>
                    </button>
                </div>
            </nav>
        </aside>
    );
}
