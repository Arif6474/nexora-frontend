
import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const DesktopNav = ({ navLinks }) => {
    return (
        <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
                <div key={link.name} className="relative group/nav">
                    <Link
                        href={link.href}
                        className={`flex items-center gap-1.5 px-4 py-2 font-bold text-[13px] uppercase tracking-wide transition-all duration-300 rounded-full ${link.isAccent
                            ? "text-amber-600 hover:bg-amber-50"
                            : "text-stone-600 hover:text-emerald-700 hover:bg-emerald-50/50"}`}
                    >
                        {link.name}
                        {link.subItems && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover/nav:opacity-100 group-hover/nav:rotate-180 transition-transform duration-300" />}
                    </Link>

                    {/* Mega Menu */}
                    {link.subItems && (
                        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 min-w-[500px] bg-white border border-stone-100 rounded-3xl opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] p-8 translate-y-2 group-hover/nav:translate-y-0">
                            <div className="grid grid-cols-2 gap-8">
                                {link.subItems.map((category) => (
                                    <div key={category.title} className="flex flex-col gap-4">
                                        <h3 className="text-[12px] font-black uppercase tracking-widest text-emerald-700/80 mb-1 border-b border-stone-100 pb-2">
                                            {category.title}
                                        </h3>
                                        <div className="flex flex-col gap-3">
                                            {category.links.map((subLink) => (
                                                <Link
                                                    key={subLink.name}
                                                    href={subLink.href}
                                                    className="text-[13px] font-bold text-stone-500 hover:text-emerald-700 transition-all flex items-center gap-2 group/link"
                                                >
                                                    <span className="w-1 h-1 bg-emerald-700 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DesktopNav;
