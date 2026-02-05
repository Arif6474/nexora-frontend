'use client'
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

const ProductCard = ({ product, onQuickView }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);
    const {
        id,
        name,
        price,
        originalPrice,
        discount,
        image,
        rating = 4.5,
        reviews = 0,
        badge = null,
    } = product;

    const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : discount;

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10">
            {/* Image Container */}
            <Link href={`/product/${id}`} className="relative block aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                    src={image || "/api/placeholder/400/533"}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badges */}
                {discountPercent > 0 && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg">
                        -{discountPercent}%
                    </div>
                )}
                {badge && (
                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-amber-500 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg">
                        {badge}
                    </div>
                )}

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onQuickView?.(product);
                        }}
                        className="w-12 h-12 rounded-full bg-white hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg group/btn"
                    >
                        <Eye className="w-5 h-5 text-stone-900 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                        }}
                        className="w-12 h-12 rounded-full bg-white hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg group/btn"
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-emerald-600 text-emerald-600" : "text-stone-900 group-hover/btn:text-white"
                                }`}
                        />
                    </button>
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <Link href={`/product/${id}`}>
                    <h3 className="text-sm font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < Math.floor(rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-stone-200 text-stone-200"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-stone-500 font-medium">({reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-black text-stone-900">${price}</span>
                    {originalPrice && (
                        <span className="text-sm font-medium text-stone-400 line-through">${originalPrice}</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                {/* <button className="w-full py-3 bg-stone-900 hover:bg-emerald-600 text-white font-black uppercase tracking-wider text-xs rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </button> */}
            </div>
        </div>
    );
};

export default ProductCard;
