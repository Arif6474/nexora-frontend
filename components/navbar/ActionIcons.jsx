import { Search, User, ShoppingBag, X, Menu, Heart, LogOut, Settings, Package, ChevronDown } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const ActionIcons = ({
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    handleAuthClick,
    isOpen,
    setIsOpen
}) => {
    const { wishlist } = useWishlist();
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-1 sm:gap-4">
            <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100/50 rounded-full transition-all duration-300"
            >
                <Search className="w-5.5 h-5.5" />
            </button>
            <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 sm:p-2.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100/50 rounded-full transition-all duration-300 group"
            >
                <Heart className="w-5.5 h-5.5 group-hover:fill-emerald-700/10 transition-all" />
                {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-600 rounded-full border-2 border-white animate-pulse" />
                )}
            </button>
            {user ? (
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className={`p-1.5 flex items-center gap-2 rounded-2xl transition-all duration-300 ${isUserMenuOpen ? "bg-stone-900 text-white shadow-lg" : "text-stone-500 hover:text-emerald-700 hover:bg-stone-100/50"}`}
                    >
                        <div className="w-8 h-8 rounded-xl overflow-hidden bg-emerald-100 border border-emerald-200">
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                        <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-100/50 overflow-hidden py-3 z-50 animate-fade-in-up">
                            <div className="px-6 py-4 border-b border-stone-50 mb-2">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">Welcome back</p>
                                <p className="text-sm font-black text-stone-900 uppercase truncate">{user.name}</p>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-6 py-3 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all group"
                            >
                                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-widest">My Profile</span>
                            </Link>

                            <Link
                                href="/profile?tab=orders"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-6 py-3 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all group"
                            >
                                <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-widest">My Orders</span>
                            </Link>

                            <div className="mx-6 my-2 border-t border-stone-50" />

                            <button
                                onClick={() => {
                                    logout();
                                    setIsUserMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-6 py-3 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all group"
                            >
                                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={handleAuthClick}
                    className="p-2 sm:p-2.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100/50 rounded-full transition-all duration-300"
                >
                    <User className="w-5.5 h-5.5" />
                </button>
            )}
            <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 text-white rounded-xl sm:rounded-2xl bg-emerald-700 hover:bg-stone-900 shadow-lg shadow-stone-200 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
                <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 group-hover:rotate-6 transition-transform" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-amber-500 text-white text-[9px] sm:text-[10px] font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 sm:border-[3px] border-white shadow-sm ring-1 ring-stone-100/10 animate-bounce">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Mobile Toggle */}
            <button
                className="lg:hidden p-2 text-stone-900 hover:bg-stone-50 rounded-xl transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
        </div>
    );
};

export default ActionIcons;
