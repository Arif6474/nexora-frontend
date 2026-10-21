import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ShopSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Banner Skeleton */}
      <div className="bg-stone-900 text-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <Skeleton className="h-4 w-32 bg-stone-800 rounded-md" />
          <Skeleton className="h-10 w-64 bg-stone-800 rounded-xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Skeleton (Desktop) */}
          <div className="hidden lg:block w-72 shrink-0 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md opacity-70" />
              </div>

              {[1, 2, 3, 4].map((group) => (
                <div key={group} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-4 w-4 rounded-full opacity-50" />
                  </div>
                  <div className="space-y-2 pl-1">
                    <Skeleton className="h-3.5 w-3/4 rounded-md opacity-70" />
                    <Skeleton className="h-3.5 w-2/3 rounded-md opacity-70" />
                    <Skeleton className="h-3.5 w-4/5 rounded-md opacity-70" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Grid Area */}
          <div className="flex-1 space-y-6">
            {/* Top Bar Skeleton */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between">
              <Skeleton className="h-4 w-40 rounded-md" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-28 rounded-xl" />
                <Skeleton className="h-9 w-20 rounded-xl" />
              </div>
            </div>

            {/* Product Cards Grid Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
