import React from 'react';

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-slate-200/80 rounded-xl ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="light-card p-6 rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="pt-4 border-t border-slate-100 flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
}

export default Skeleton;
