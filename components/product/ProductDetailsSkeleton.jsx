import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import ProductCardSkeleton from "@/components/shop/ProductCardSkeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-14 rounded-md" />
          <span className="text-stone-300">/</span>
          <Skeleton className="h-3.5 w-24 rounded-md" />
          <span className="text-stone-300">/</span>
          <Skeleton className="h-3.5 w-36 rounded-md opacity-70" />
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full rounded-[32px] overflow-hidden bg-stone-200/70">
              <Skeleton className="w-full h-full rounded-none" />
            </div>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-200/70 flex-shrink-0">
                  <Skeleton className="w-full h-full rounded-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Info & Actions Skeleton */}
          <div className="flex flex-col space-y-6">
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-stone-200">
              <Skeleton className="h-4 w-28 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-4/5 rounded-xl" />
                <Skeleton className="h-9 w-2/3 rounded-xl" />
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md opacity-60" />
              </div>
              <div className="pt-2 flex items-baseline gap-3">
                <Skeleton className="h-8 w-28 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-md opacity-50" />
              </div>
            </div>

            {/* Description lines */}
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-full rounded-md opacity-80" />
              <Skeleton className="h-3.5 w-11/12 rounded-md opacity-80" />
              <Skeleton className="h-3.5 w-3/4 rounded-md opacity-70" />
            </div>

            {/* Color variants skeleton */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <div className="flex items-center gap-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-9 h-9 rounded-full" />
                ))}
              </div>
            </div>

            {/* Size variants skeleton */}
            <div className="space-y-3 pt-1">
              <Skeleton className="h-3.5 w-20 rounded-md" />
              <div className="flex items-center gap-2.5">
                {["S", "M", "L", "XL"].map((s) => (
                  <Skeleton key={s} className="w-12 h-10 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="pt-4 flex items-center gap-4">
              <Skeleton className="w-32 h-14 rounded-2xl flex-shrink-0" />
              <Skeleton className="flex-1 h-14 rounded-2xl" />
              <Skeleton className="w-14 h-14 rounded-2xl flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="border-t border-stone-200 pt-10 space-y-6">
          <div className="flex gap-8 border-b border-stone-200 pb-3">
            <Skeleton className="h-5 w-28 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md opacity-60" />
            <Skeleton className="h-5 w-24 rounded-md opacity-60" />
          </div>
          <div className="space-y-3 max-w-3xl">
            <Skeleton className="h-4 w-full rounded-md opacity-80" />
            <Skeleton className="h-4 w-5/6 rounded-md opacity-80" />
            <Skeleton className="h-4 w-2/3 rounded-md opacity-70" />
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="border-t border-stone-200 pt-12 space-y-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48 rounded-xl" />
            <Skeleton className="h-4 w-20 rounded-md opacity-70" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
