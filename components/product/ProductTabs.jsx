import { useState } from "react";

const ProductTabs = ({ description, features }) => {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="mt-20">
            <div className="flex items-center gap-8 border-b border-stone-200 mb-10 overflow-x-auto pb-px">
                {["description", "specifications", "shipping"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-6 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? "text-emerald-700" : "text-stone-400 hover:text-stone-900"}`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-700 rounded-full" />}
                    </button>
                ))}
            </div>

            <div className="max-w-4xl">
                {activeTab === "description" && (
                    <div className="space-y-6 animate-fade-in-up">
                        <p className="text-stone-500 font-medium leading-loose text-lg" dangerouslySetInnerHTML={{ __html: description }} />
                        {features && features.length > 0 && (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-stone-600 font-bold">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {activeTab === "specifications" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 animate-fade-in-up">
                        {[
                            { label: "Material", value: "100% Premium Cotton" },
                            { label: "Weight", value: "240 GSM" },
                            { label: "Origin", value: "Crafted in Italy" },
                            { label: "Care", value: "Dry clean only" }
                        ].map((spec, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-xs font-black uppercase tracking-widest text-stone-400 w-24">{spec.label}</span>
                                <span className="text-stone-900 font-bold">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "shipping" && (
                    <div className="space-y-4 animate-fade-in-up text-stone-500">
                        <p className="font-medium">Free standard shipping on all orders over $200. Delivered within 3-5 business days.</p>
                        <p className="font-medium">Express delivery options available at checkout.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
