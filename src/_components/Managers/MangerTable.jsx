import CustomLoaderTable from "@/customs/CustomLoaderTable";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "next-i18next";
import { Eye, Loader2, SquarePen, Trash2Icon, User } from "lucide-react";

import { Link } from "react-router-dom";
import { useDeleteManager } from "@/hooks/Actions/mangers/useCurdsMangers";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MangerTable = ({ managers, isPending, page, setPage }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const safeManagers = Array.isArray(managers?.data) ? managers?.data : [];

  const meta = managers?.meta;
  const links = managers?.links;

  const { mutate: deleteManager, isPending: deleteIsPending } =
    useDeleteManager();

  if (isPending) {
    return <CustomLoaderTable />;
  }

  return (
    <div className=" ">
      <div className="rounded-md border">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Name")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Identity")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Phone")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Email")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Status")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {safeManagers?.map((manager, index) => (
              <TableRow
                key={manager.id}
                className={`
        cursor-pointer transition-colors
        ${index % 2 === 0 ? "bg-background" : "bg-muted/70"}
        hover:bg-muted/60
      `}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span>
                      {manager.first_name} {manager.second_name}{" "}
                      {manager.last_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{manager.identity}</TableCell>
                <TableCell
                  dir="ltr"
                  className={isRTL ? "text-right" : "text-left"}
                >
                  {manager.phone_number}
                </TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      manager.status === "active" ? "default" : "secondary"
                    }
                    className={
                      manager.status === "active"
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }
                  >
                    {t(manager.status)}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link to={`/managers/${manager.id}`}>
                    <Eye className="h-4 w-4  hover:text-gray-800 duration-300 transform hover:scale-110" />
                  </Link>

                  <Link to={`/managers/edit/${manager.id}`}>
                    <SquarePen className="h-4 w-4  hover:text-gray-800 duration-300 transform hover:scale-110" />
                  </Link>
                  {deleteIsPending ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  ) : (
                    <Trash2Icon
                      onClick={() => deleteManager({ id: manager.id })}
                      className="h-4 w-4 hover:text-gray-800 duration-300 transform hover:scale-110 cursor-pointer"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {meta && (
        <div className="mt-4 ">
          <Pagination className="flex items-center justify-end">
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => links?.prev && setPage(page - 1)}
                  className={
                    !links?.prev
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(
                (p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === meta.current_page}
                      onClick={() => setPage(p)}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => links?.next && setPage(page + 1)}
                  className={
                    !links?.next
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default MangerTable;
