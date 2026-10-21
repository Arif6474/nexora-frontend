import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 flex flex-col">
      {/* Aspect 3/4 Image placeholder */}
      <div className="relative aspect-[3/4] w-full bg-stone-100/90 overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Info placeholder */}
      <div className="p-4 space-y-2.5">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-3.5 w-1/2 rounded-md opacity-70" />
        </div>
        <div className="pt-1 flex items-baseline gap-2">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md opacity-50" />
        </div>
      </div>
    </div>
  );
}
