"use client";

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-luxury-900/50 animate-pulse" />
      
      {/* Main Content Skeleton */}
      <div className="flex-1 p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="h-16 bg-luxury-900/30 rounded-xl animate-pulse" />
        
        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-luxury-900/30 rounded-xl animate-pulse" />
          ))}
        </div>
        
        {/* Charts Skeleton */}
        <div className="grid grid-cols-2 gap-6">
          <div className="h-96 bg-luxury-900/30 rounded-xl animate-pulse" />
          <div className="h-96 bg-luxury-900/30 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
