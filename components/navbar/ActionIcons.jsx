import { Search, User, ShoppingBag, X, Menu, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

const ActionIcons = ({
    setIsSearchOpen,
    setIsWishlistOpen,
    handleAuthClick,
    isOpen,
    setIsOpen
}) => {
    const { wishlist } = useWishlist();
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
            <button
                onClick={handleAuthClick}
                className="p-2 sm:p-2.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100/50 rounded-full transition-all duration-300"
            >
                <User className="w-5.5 h-5.5" />
            </button>
            <button className="relative p-2 sm:p-2.5 text-white rounded-xl sm:rounded-2xl bg-emerald-700 hover:bg-emerald-700 shadow-lg shadow-stone-200 transition-all duration-300 hover:scale-105 active:scale-95 group">
                <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 group-hover:rotate-6 transition-transform" />
                <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-amber-500 text-white text-[9px] sm:text-[10px] font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 sm:border-[3px] border-white shadow-sm ring-1 ring-stone-100/10">
                    0
                </span>
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
