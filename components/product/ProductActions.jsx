import { Minus, Plus, ShoppingCart, Heart, Truck, ShieldCheck, ArrowLeftRight } from "lucide-react";

const ProductActions = ({
    quantity,
    setQuantity,
    onAddToCart,
    onToggleWishlist,
    isInWishlist,
    showError,
    hasSizes,
    hasColors,
    currentSize,
    currentColor
}) => {
    const isErrorState = showError && ((hasSizes && !currentSize) || (hasColors && !currentColor));

    return (
        <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-4">
                <div className="flex items-center justify-between bg-white border-2 border-stone-100 rounded-2xl p-1 min-w-[140px]">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-lg text-stone-900">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <button
                    onClick={onAddToCart}
                    className={`flex-1 py-5 font-black uppercase tracking-[0.2em] text-sm rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 ${isErrorState ? "bg-red-500 text-white shadow-red-500/20" : "bg-stone-900 text-white shadow-stone-900/20 hover:bg-emerald-700"}`}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {isErrorState ? "Select Options" : "Add To Basket"}
                </button>
                <button
                    onClick={onToggleWishlist}
                    className={`w-16 h-16 flex items-center justify-center border-2 rounded-2xl transition-all group ${isInWishlist ? "border-emerald-600 bg-emerald-50 text-emerald-600" : "border-stone-100 text-stone-400 hover:text-emerald-600 hover:border-emerald-600"}`}
                >
                    <Heart className={`w-6 h-6 group-hover:fill-emerald-600 transition-all ${isInWishlist ? "fill-emerald-600" : ""}`} />
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-stone-100">
                <div className="flex flex-col items-center text-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Free Logistics</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Insured Value</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <ArrowLeftRight className="w-5 h-5 text-emerald-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Elite Exchange</span>
                </div>
            </div>
        </div>
    );
};

export default ProductActions;
