"use client";

import React from "react";
import Link from "next/link";
import { User, Package, Settings, ChevronRight, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfileSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const menuItems = [
        { id: "info", label: "Account Overview", href: "/profile", icon: User },
        { id: "orders", label: "My Orders", href: "/profile/orders", icon: Package },
        { id: "settings", label: "Settings", href: "/profile/settings", icon: Settings },
    ];

    return (
        <nav className="flex flex-col gap-3">
            <div className="px-6 mb-4">
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Profile Menu</h3>
            </div>

            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 border ${isActive
                                ? "bg-stone-900 text-white shadow-xl shadow-stone-900/20 border-transparent"
                                : "text-stone-400 hover:text-stone-900 hover:bg-white hover:border-stone-100 border-transparent"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <Icon size={20} className={isActive ? "text-emerald-500" : "text-stone-300 group-hover:text-emerald-600 transition-colors"} />
                            <span className="font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                        </div>
                        {isActive && <ChevronRight size={14} className="text-white/40" />}
                    </Link>
                );
            })}

            <div className="pt-8 px-6 border-t border-stone-100 mt-4">
                <button
                    onClick={logout}
                    className="flex items-center gap-4 text-stone-400 hover:text-red-500 transition-all font-black text-[10px] uppercase tracking-[0.2em] group"
                >
                    <LogOut size={20} className="text-stone-300 group-hover:text-red-500 transition-colors" />
                    Logout
                </button>
            </div>
        </nav>
    );
}
