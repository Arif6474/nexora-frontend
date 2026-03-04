const ProductVariants = ({
    productColors,
    productSizes,
    currentColor,
    onSelectColor,
    currentSize,
    onSelectSize,
    showError
}) => {
    return (
        <>
            {/* Color Selector */}
            {productColors.length > 0 && (
                <div className={`mb-8 transition-all duration-300 ${showError && !currentColor ? "p-4 bg-red-50 rounded-3xl border border-red-100 ring-4 ring-red-500/10" : ""}`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">Select Color</h3>
                        {showError && !currentColor && (
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-bounce">Required</span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {productColors.map((pc) => {
                            const color = pc.color;
                            return (
                                <button
                                    key={color.name}
                                    onClick={() => onSelectColor(color.name)}
                                    title={color.name}
                                    className={`group relative w-10 h-10 rounded-full border-2 transition-all ${currentColor === color.name ? "border-emerald-600 scale-110" : "border-transparent"}`}
                                >
                                    <div
                                        className={`w-full h-full rounded-full border border-stone-100 shadow-sm`}
                                        style={{ backgroundColor: color.hexCode || color.colorHex || color.color }}
                                    />
                                    {currentColor === color.name && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Size Selector */}
            {productSizes.length > 0 && (
                <div className={`mb-8 transition-all duration-300 ${showError && !currentSize ? "p-4 bg-red-50 rounded-3xl border border-red-100 ring-4 ring-red-500/10" : ""}`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-stone-400">Select Size</h3>
                        {showError && !currentSize && (
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-bounce">Required</span>
                        )}
                        <button className="text-[10px] font-black uppercase tracking-widest text-emerald-700 hover:underline">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        {productSizes.map((ps) => {
                            const size = ps.size?.size;
                            return (
                                <button
                                    key={size}
                                    onClick={() => onSelectSize(size)}
                                    className={`py-3 rounded-2xl font-black text-sm transition-all border-2 ${currentSize === size
                                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-700/5 rotate-1"
                                        : "border-stone-100 text-stone-400 hover:border-stone-300 hover:text-stone-900"
                                        }`}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductVariants;
