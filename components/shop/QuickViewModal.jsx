"use client";

import { X, ShoppingCart, Star, Heart, Maximize2, Plus, Minus } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetch from "@/utils/hooks/useFetch";
import { SINGLE_PRODUCT_API } from "@/utils/APIs";

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRating = ({ count = 4, total = 5 }) => (
    <div className="flex items-center gap-1">
        {[...Array(total)].map((_, i) => (
            <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < count ? "fill-amber-400 text-amber-400" : "text-stone-200"}`}
            />
        ))}
    </div>
);

const ImageGallery = ({ productImages, mainImage, onSelectImage }) => {
    const spacesUrl = process.env.NEXT_PUBLIC_SPACES_URL;

    return (
        <div className="w-full md:w-1/2 flex flex-col bg-stone-100">
            {/* Main Image */}
            <div className="relative aspect-[1/1] bg-stone-100 ">
                <img
                    src={spacesUrl + mainImage}
                    alt="Product image"
                    className="w-full h-full object-cover transition-all duration-500"
                />
            </div>

            {/* Thumbnails */}
            {productImages?.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2 bg-white">
                    {productImages?.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSelectImage(img.image)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${mainImage === img.image
                                ? "border-emerald-600 scale-95"
                                : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                        >
                            <img
                                src={spacesUrl + img.image}
                                alt={`Product view ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const SelectionField = ({ label, showError, hasSelection, children }) => (
    <div
        className={`transition-all duration-300 ${showError && !hasSelection ? "p-3 bg-red-50 rounded-2xl ring-2 ring-red-500/10" : ""
            }`}
    >
        <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400">{label}</h3>
            {showError && !hasSelection && (
                <span className="text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                    Required
                </span>
            )}
        </div>
        {children}
    </div>
);

const ColorSelector = ({ colors, selectedColor, onSelect, showError }) => (
    <SelectionField label="Color" showError={showError} hasSelection={!!selectedColor}>
        <div className="flex gap-2 flex-wrap">
            {colors.map((c) => (
                <button
                    key={c.color?.name}
                    title={c.color?.name}
                    onClick={() => onSelect(c.color?.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.color?.name ? "border-emerald-600 scale-110" : "border-transparent"
                        }`}
                    style={{ backgroundColor: c.color?.hexCode || c.color?.colorHex || c.color?.color }}
                />
            ))}
        </div>
    </SelectionField>
);

const SizeSelector = ({ sizes, selectedSize, onSelect, showError }) => (
    <SelectionField label="Size" showError={showError} hasSelection={!!selectedSize}>
        <div className="grid grid-cols-4 gap-2">
            {sizes.map((s) => {
                const label = s.size?.size;
                return (
                    <button
                        key={label}
                        onClick={() => onSelect(label)}
                        className={`py-2 text-xs font-black rounded-xl border-2 transition-all ${selectedSize === label
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                            : "border-stone-100 text-stone-500 hover:border-stone-200"
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    </SelectionField>
);

const QuantityControl = ({ quantity, onDecrement, onIncrement }) => (
    <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-1 min-w-[100px]">
        <button
            onClick={onDecrement}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
        >
            <Minus className="w-3 h-3" />
        </button>
        <span className="text-xs font-black text-stone-900">{quantity}</span>
        <button
            onClick={onIncrement}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
        >
            <Plus className="w-3 h-3" />
        </button>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const QuickViewModal = ({ product, isOpen, onClose }) => {

    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showError, setShowError] = useState(false);
    const [mainImage, setMainImage] = useState("");

    const { data, isLoading } = useFetch(SINGLE_PRODUCT_API + product?._id);

    // Reset state whenever the viewed product changes
    useEffect(() => {
        if (product) {
            setMainImage(product.image);
            setSelectedSize("");
            setSelectedColor("");
            setQuantity(1);
            setShowError(false);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    // Derive sizes & colors from fetched product data
    const sizes = data?.productSizes || [];
    const colors = data?.productColors || [];
    const hasSizes = sizes.length > 0;
    const hasColors = colors.length > 0;

    const wishlisted = isInWishlist(product._id);

    const handleAddToCart = () => {
        const needsSize = hasSizes && !selectedSize;
        const needsColor = hasColors && !selectedColor;

        if (needsSize || needsColor) {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            return;
        }

        addToCart(product, selectedSize, selectedColor, quantity);
        onClose();
    };

    const isErrorState = showError && ((hasSizes && !selectedSize) || (hasColors && !selectedColor));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-stone-100 flex items-center justify-center text-stone-900 hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Image Gallery */}
                <ImageGallery
                    productImages={data?.productImages}
                    mainImage={mainImage}
                    onSelectImage={setMainImage}
                />

                {/* Right: Product Details */}
                <div className="w-full md:w-1/2 p-8 sm:p-10 overflow-y-auto no-scrollbar">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                            <span>{product?.category?.name}</span>
                            <span className="text-stone-300">•</span>
                            <span>{product?.brand?.name}</span>
                        </div>
                        <h2 className="text-3xl font-black text-stone-900 leading-tight mb-4 uppercase">
                            {product?.title}
                        </h2>
                        <div className="flex items-center gap-4">
                            <StarRating count={4} />
                            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                                {product?.reviews?.length ?? 0} Reviews
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-8">
                        <span className="text-3xl font-black text-emerald-700">${product?.price}</span>
                        {product?.originalPrice && (
                            <span className="text-lg font-bold text-stone-400 line-through">
                                ${product?.originalPrice}
                            </span>
                        )}
                    </div>

                    {/* Description  dangerouslySetInnerHTML*/}
                    <p className="text-stone-500 font-medium leading-relaxed mb-8 text-sm" dangerouslySetInnerHTML={{ __html: product?.description.slice(0, 200) }} />

                    {/* Selectors */}
                    {(data?.productColors?.length > 0 || data?.productSizes?.length > 0) && (
                        <div className="space-y-6">
                            {data?.productColors?.length > 0 && (
                                <ColorSelector
                                    colors={data?.productColors}
                                    selectedColor={selectedColor}
                                    onSelect={setSelectedColor}
                                    showError={showError}
                                />
                            )}
                            {data?.productSizes?.length > 0 && (
                                <SizeSelector
                                    sizes={data?.productSizes}
                                    selectedSize={selectedSize}
                                    onSelect={setSelectedSize}
                                    showError={showError}
                                />
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-stone-100">
                        <div className="flex items-center gap-4">
                            <QuantityControl
                                quantity={quantity}
                                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                                onIncrement={() => setQuantity((q) => q + 1)}
                            />
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 py-4 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 ${isErrorState
                                    ? "bg-red-500 text-white shadow-red-500/20"
                                    : "bg-stone-900 text-white shadow-stone-900/20 hover:bg-emerald-700"
                                    }`}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {isErrorState ? "Select Options" : "Add To Basket"}
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`flex-1 h-12 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${wishlisted
                                    ? "border-emerald-600 bg-emerald-50 text-emerald-600"
                                    : "border-stone-100 text-stone-400 hover:border-stone-200"
                                    }`}
                            >
                                <Heart className={`w-4 h-4 ${wishlisted ? "fill-emerald-600" : ""}`} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Wishlist</span>
                            </button>
                            <Link
                                href={`/product/${product._id}`}
                                onClick={onClose}
                                className="flex-1 h-12 rounded-xl border-2 border-stone-100 flex items-center justify-center gap-2 text-stone-400 hover:text-stone-900 transition-all"
                            >
                                <Maximize2 className="w-4 h-4" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Details</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
