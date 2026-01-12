import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CustomLoaderTable = ({ rows = 4, columns = 3 }) => {
  return (
    <div className="overflow-x-auto w-full border rounded-md">
      <table className="w-full table-auto">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th key={idx} className="p-2 text-left">
                <Skeleton className="h-4 w-24 rounded" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="p-2">
                  <Skeleton className="h-4 w-full rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Skeleton للـ Pagination */}
      <div className="flex justify-end items-center p-4 gap-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="h-8 w-12 rounded" />
        ))}
      </div>
    </div>
  );
};

export default CustomLoaderTable;
