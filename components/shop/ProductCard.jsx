'use client'
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

const ProductCard = ({ product, onQuickView }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    if (!product) return null;

    const {
        _id,
        id,
        title,
        name,
        price,
        originalPrice,
        discount,
        image,
        rating = 4.5,
        reviews = 0,
        badge = null,
        slug
    } = product;

    const productId = _id || id;
    const isWishlisted = isInWishlist(productId);
    const displayTitle = title || name || "Product";
    const productSlug = slug || productId;

    const spacesUrl = (process.env.NEXT_PUBLIC_SPACES_URL || "").trim();
    const resolvedImage = image
        ? (image.startsWith("http://") || image.startsWith("https://")
            ? image
            : `${spacesUrl.replace(/\/$/, '')}/${image.replace(/^\//, '')}`)
        : "/api/placeholder/400/533";

    const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : discount;

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10">
            {/* Image Container */}
            <Link href={`/product/${productSlug}`} className="relative block aspect-[3/4] overflow-hidden bg-stone-100">
                <img
                    src={resolvedImage}
                    alt={displayTitle}
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
                        className="w-12 h-12 rounded-full bg-white hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg group/btn cursor-pointer"
                        title="Quick View"
                    >
                        <Eye className="w-5 h-5 text-stone-900 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                        }}
                        className="w-12 h-12 rounded-full bg-white hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg group/btn cursor-pointer"
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
                <Link href={`/product/${productSlug}`}>
                    <h3 className="text-sm font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {displayTitle}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 ">
                    <span className="text-xl font-black text-stone-900">${price}</span>
                    {originalPrice && (
                        <span className="text-sm font-medium text-stone-400 line-through">${originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
