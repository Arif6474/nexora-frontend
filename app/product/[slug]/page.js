"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import QuickViewModal from "@/components/shop/QuickViewModal";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import useFetch from "@/utils/hooks/useFetch";
import { SINGLE_PRODUCT_BY_SLUG_API } from "@/utils/APIs";

// Imported Refactored Components
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductVariants from "@/components/product/ProductVariants";
import ProductActions from "@/components/product/ProductActions";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

const ProductDetailsPage = () => {
    const { slug } = useParams();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [showError, setShowError] = useState(false);

    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();

    const { data: responseData, isLoading, error } = useFetch(slug ? SINGLE_PRODUCT_BY_SLUG_API + slug : null);

    const product = responseData?.product;
    const productColors = responseData?.productColors || [];
    const productSizes = responseData?.productSizes || [];
    const apiProductImages = responseData?.productImages || [];
    const relatedProducts = responseData?.relatedProducts || [];

    const spacesUrl = process.env.NEXT_PUBLIC_SPACES_URL;

    const productImages = useMemo(() => {
        if (!product) return [];
        if (apiProductImages.length > 0) return apiProductImages.map(img => img.image);
        return [product.image];
    }, [product, apiProductImages]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin" />
                    <p className="text-stone-400 font-black uppercase tracking-widest text-[10px]">Loading Nexora Style...</p>
                </div>
            </div>
        );
    }

    if (!product || error) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-stone-200" />
                    </div>
                    <h1 className="text-4xl font-black text-stone-900 mb-4 uppercase tracking-tight">Product Not Found</h1>
                    <p className="text-stone-500 font-medium mb-8">The piece you're looking for might have moved or is no longer available in our curation.</p>
                    <a href="/shop" className="inline-flex items-center justify-center h-14 px-10 bg-stone-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-stone-900/10">
                        Explore Collection
                    </a>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        const hasColors = productColors.length > 0;
        const hasSizes = productSizes.length > 0;

        if ((hasSizes && !selectedSize) || (hasColors && !selectedColor)) {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            return;
        }
        addToCart(product, selectedSize, selectedColor, quantity);
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
                <ProductBreadcrumbs
                    categoryName={product.category?.name}
                    title={product.title}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductGallery
                        productImages={productImages}
                        initialMainImage={product.image}
                        title={product.title}
                        badge={product.badge}
                        spacesUrl={spacesUrl}
                    />

                    <div className="flex flex-col">
                        <ProductInfo
                            title={product.title}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            description={product.description}
                        />

                        <ProductVariants
                            productColors={productColors}
                            productSizes={productSizes}
                            currentColor={selectedColor}
                            onSelectColor={setSelectedColor}
                            currentSize={selectedSize}
                            onSelectSize={setSelectedSize}
                            showError={showError}
                        />

                        <ProductActions
                            quantity={quantity}
                            setQuantity={setQuantity}
                            onAddToCart={handleAddToCart}
                            onToggleWishlist={() => toggleWishlist(product)}
                            isInWishlist={isInWishlist(product._id)}
                            showError={showError}
                            hasSizes={productSizes.length > 0}
                            hasColors={productColors.length > 0}
                            currentSize={selectedSize}
                            currentColor={selectedColor}
                        />
                    </div>
                </div>

                <ProductTabs
                    description={product.description}
                    features={product.features}
                />

                <RelatedProducts
                    relatedProducts={relatedProducts}
                    setQuickViewProduct={setQuickViewProduct}
                />
            </div>

            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    );
};

export default ProductDetailsPage;
