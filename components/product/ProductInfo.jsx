import { Star } from "lucide-react";

const ProductInfo = ({ title, rating, reviews, price, originalPrice, description }) => (
    <div className="flex flex-col">
        <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4 uppercase">
                {title}
            </h1>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating || 0) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
                        ))}
                    </div>
                    <span className="text-sm font-black text-stone-900">{rating || 0}</span>
                </div>
                <span className="text-stone-300">|</span>
                <button className="text-sm font-bold text-stone-500 hover:text-emerald-600 transition-colors uppercase tracking-wide">
                    {reviews || 0} Reviews
                </button>
            </div>
        </div>

        <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-black text-emerald-700">${price}</span>
            {originalPrice && (
                <span className="text-xl font-bold text-stone-400 line-through">${originalPrice}</span>
            )}
        </div>

        <p className="text-stone-500 font-medium leading-relaxed mb-8 text-lg">
            {description ? (
                <span dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
                "Indulge in the epitome of modern elegance with this meticulously crafted piece. Designed for those who appreciate the finer details and timeless style."
            )}
        </p>
    </div>
);

export default ProductInfo;
