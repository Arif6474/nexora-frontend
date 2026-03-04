import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ProductBreadcrumbs = ({ categoryName, title }) => (
    <nav className="flex items-center gap-2 text-sm font-bold text-stone-400 mb-8 sm:mb-12">
        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-stone-400">{categoryName}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-stone-900 line-clamp-1">{title}</span>
    </nav>
);

export default ProductBreadcrumbs;
