import { useGetAllLogs } from "@/hooks/Actions/allLogs/useCurdsLogs";
import { useTranslation } from "next-i18next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import ActivityLogHeader from "@/_components/ActivityLog/ActivityLogHeader";
import ActivityLogTable from "@/_components/ActivityLog/ActivityLogTable";
import SearchAndFiltersSelectActicityLog from "./SearchAndFiltersSelectActicityLog";

const ActivityLogPage = () => {
  const { t , i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [page, setPage] = useState(1);
  
    const [type, setType] = useState("");

  const { data: logsData, isPending } = useGetAllLogs(page, type);
  const logs = logsData?.data?.data || [];
  const meta = logsData?.data?.meta || {};

  const totalPages = meta.last_page || 1;
  const currentPage = meta.current_page || 1;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6">
      <ActivityLogHeader />
      <SearchAndFiltersSelectActicityLog type={type} setType={setType}/>
      <div className="overflow-x-auto">
        <ActivityLogTable logs={logs} isPending={isPending} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination className="flex justify-end">
            <PaginationContent className={isRTL ? "flex-row-reverse" : ""}>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`cursor-pointer ${currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-muted"
                    }`}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNum)}
                    isActive={pageNum === currentPage}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`cursor-pointer ${currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-muted"
                    }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ActivityLogPage;
