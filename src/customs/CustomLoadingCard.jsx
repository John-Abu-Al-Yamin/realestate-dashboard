import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CustomLoadingCard = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto w-full space-y-8">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
};

export default CustomLoadingCard;
