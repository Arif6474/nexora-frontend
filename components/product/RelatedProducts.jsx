import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";

const RelatedProducts = ({ relatedProducts, setQuickViewProduct }) => {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!sliderRef.current || isPaused) return;

        const interval = setInterval(() => {
            if (sliderRef.current) {
                const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
                if (sliderRef.current.scrollLeft >= maxScroll - 1) {
                    sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, relatedProducts]);

    if (!relatedProducts || relatedProducts.length === 0) return null;

    return (
        <div className="mt-32">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight mb-2">Complete The Look</h2>
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Recommended Curations</p>
                </div>
                <Link href="/shop" className="group flex items-center gap-2 text-stone-900 font-black uppercase tracking-widest text-xs">
                    Shop All
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div
                ref={sliderRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="grid grid-cols-5 gap-8 overflow-x-auto pb-8 scroll-smooth no-scrollbar"
            >
                {relatedProducts.map((p) => (
                    <div key={p._id}>
                        <ProductCard
                            product={p}
                            onQuickView={setQuickViewProduct}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
