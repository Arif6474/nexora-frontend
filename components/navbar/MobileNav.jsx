import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, ShoppingBag, Search, User } from "lucide-react";

const MobileNav = ({
    isOpen,
    setIsOpen,
    navLinks,
    activeSubmenu,
    toggleSubmenu,
    activeNestedMenu,
    toggleNestedMenu,
    handleSearchClick,
    handleAuthClick
}) => {
    return (
        <div
            className={`lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-stone-100 shadow-2xl transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[85vh] opacity-100 py-6" : "max-h-0 opacity-0"
                }`}
        >
            <div className="flex flex-col px-6 gap-1.5 h-full overflow-y-auto max-h-[70vh]">
                {navLinks.map((link) => (
                    <div key={link.name} className="flex flex-col">
                        <div className="flex items-center justify-between border-b border-stone-50">
                            <Link
                                href={link.href}
                                className={`font-black text-xl py-4 grow tracking-tight transition-colors uppercase ${link.isAccent ? "text-amber-600" : "text-stone-900 hover:text-emerald-700"}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                            {link.subItems && (
                                <button
                                    onClick={() => toggleSubmenu(link.name)}
                                    className="p-4 text-stone-400"
                                >
                                    <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${activeSubmenu === link.name ? "rotate-180 text-emerald-600" : ""}`} />
                                </button>
                            )}
                        </div>

                        {link.subItems && (
                            <div className={`flex flex-col transition-all duration-500 overflow-hidden ${activeSubmenu === link.name ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                {link.subItems.map((category) => (
                                    <div key={category.title} className="flex flex-col ml-2 mb-1">
                                        <button
                                            onClick={() => toggleNestedMenu(category.title)}
                                            className="flex items-center justify-between px-4 py-3 text-[14px] font-black text-stone-700 uppercase tracking-wide bg-stone-50/60 rounded-xl"
                                        >
                                            {category.title}
                                            <ChevronRight className={`w-4 h-4 transition-transform ${activeNestedMenu === category.title ? "rotate-90" : ""}`} />
                                        </button>

                                        <div className={`flex flex-col transition-all duration-300 overflow-hidden ${activeNestedMenu === category.title ? "max-h-64 py-2 opacity-100" : "max-h-0 opacity-0"}`}>
                                            {category.links.map((subLink) => (
                                                <Link
                                                    key={subLink.name}
                                                    href={subLink.href}
                                                    className="text-stone-500 hover:text-emerald-700 font-bold text-[13px] px-8 py-2.5 rounded-xl hover:bg-emerald-50/30 flex items-center gap-3 transition-all uppercase tracking-tight"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <div className="w-1.5 h-1.5 border border-stone-300 rounded-full"></div>
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Mobile Quick Actions */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-stone-100">
                    <button
                        onClick={handleSearchClick}
                        className="flex items-center justify-center gap-3 bg-stone-50 p-4 text-stone-900 font-black rounded-2xl hover:bg-stone-100 transition-all active:scale-95 uppercase text-xs tracking-widest"
                    >
                        <Search className="w-5 h-5" />
                        Search
                    </button>
                    <button
                        onClick={handleAuthClick}
                        className="flex items-center justify-center gap-3 bg-stone-50 p-4 text-stone-900 font-black rounded-2xl hover:bg-stone-100 transition-all active:scale-95 uppercase text-xs tracking-widest"
                    >
                        <User className="w-5 h-5" />
                        Account
                    </button>
                </div>

                <button className="mt-4 flex items-center justify-center gap-3 bg-emerald-700 text-white p-5 font-black rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-800 transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
                    <ShoppingBag className="w-5.5 h-5.5" />
                    View Cart (0)
                </button>
            </div>
        </div>
    );
};

export default MobileNav;
