import React from "react";
import CustomLoaderTable from "@/customs/CustomLoaderTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "next-i18next";
import { useDeleteCountry } from "@/hooks/Actions/Country/useCurdsCountry";
import {  Loader2, SquarePen, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const CountryTable = ({ country, page, setPage, countriesPending }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const countries = country?.data ?? [];
  const meta = country?.meta;
  const links = country?.links;

  const { mutate: deleteCountry, isPending: deleteIsPending } =
    useDeleteCountry();

  if (countriesPending) return <CustomLoaderTable />;

  return (
    <div>
      <div className="rounded-md border">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Country Name")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Code")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Created At")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {countries.map((item, index) => (
              <TableRow
                key={item.id}
                className={`
                  cursor-pointer transition-colors
                  ${index % 2 === 0 ? "bg-background" : "bg-muted/70"}
                  hover:bg-muted/60
                `}
              >
                {/* Name */}
                <TableCell className="font-medium">
                  {item.name}
                </TableCell>

                {/* Code */}
                <TableCell>{item.code}</TableCell>

                {/* Created At */}
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString("en-US" )}
                </TableCell>

                {/* Actions */}
                <TableCell className="flex items-center gap-4">
                  <Link to={`/address/countries/edit/${item.id}`}>
                    <SquarePen className="h-4 w-4 hover:text-gray-800 duration-300 transform hover:scale-110" />
                  </Link>

                  {deleteIsPending ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  ) : (
                    <Trash2Icon
                      onClick={() => deleteCountry({ id: item.id })}
                      className="h-4 w-4 hover:text-gray-800 duration-300 transform hover:scale-110 cursor-pointer"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="mt-4">
          <Pagination className="flex justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => links?.prev && setPage(page - 1)}
                  className={!links?.prev ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(
                (p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === meta.current_page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => links?.next && setPage(page + 1)}
                  className={!links?.next ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CountryTable;
