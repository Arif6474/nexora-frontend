import React from "react";

export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-stone-200/80 ${className}`}
      {...props}
    />
  );
}

export default Skeleton;
