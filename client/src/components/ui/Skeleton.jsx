import React from 'react';

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#F0F0F0] rounded-md ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="mono-card p-6 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="pt-4 border-t border-[#E7E7E7] flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-20" />
      </div>
    </div>
  );
}

export default Skeleton;
