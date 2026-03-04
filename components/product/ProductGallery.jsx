import { useState, useEffect } from "react";

const ProductGallery = ({ productImages, initialMainImage, title, badge, spacesUrl }) => {
    const [mainImage, setMainImage] = useState(initialMainImage);

    useEffect(() => {
        setMainImage(initialMainImage);
    }, [initialMainImage]);

    return (
        <div className="space-y-6">
            <div className="aspect-4/5 bg-white rounded-[40px] overflow-hidden border border-stone-200 shadow-2xl shadow-stone-200/50 group relative">
                <img
                    src={spacesUrl + mainImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {badge && (
                    <div className="absolute top-8 left-8 px-4 py-2 bg-amber-50 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl">
                        {badge}
                    </div>
                )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, i) => (
                    <div
                        key={i}
                        onClick={() => setMainImage(img)}
                        className={`aspect-square bg-white rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${mainImage === img ? "border-emerald-600 scale-95" : "border-stone-100 hover:border-stone-200"}`}
                    >
                        <img src={spacesUrl + img} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
