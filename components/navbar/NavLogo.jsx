import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const NavLogo = () => {
    return (
        <Link href="/" className="flex items-center gap-2.5 group transition-all duration-300">
            <div className="relative w-11 h-11 bg-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-105 transition-all duration-300 group-hover:rotate-3">
                <ShoppingBag className="text-white w-6 h-6" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
            </div>
            <span className="text-2xl font-bold text-stone-900 tracking-tight flex items-baseline gap-0.5">
                Nexora
                <span className="text-emerald-700 font-black relative">
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-700 group-hover:w-full transition-all duration-500"></span>
                </span>
            </span>
        </Link>
    );
};

export default NavLogo;
