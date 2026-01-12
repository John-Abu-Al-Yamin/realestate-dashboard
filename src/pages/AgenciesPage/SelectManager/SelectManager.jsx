import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Check, Loader2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllManagers } from "@/hooks/Actions/mangers/useCurdsMangers";
import CustomLoaderTable from "@/customs/CustomLoaderTable";
import { useAddManagerTheAgency } from "@/hooks/Actions/agencies/useCurdsAgencies";
import SearchAndFiltersSelectManger from "./SearchAndFiltersSelectManger";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SelectManager = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const navigate = useNavigate();

  const { data: managersData, isPending } = useGetAllManagers(
    page,
    search,
    status
  );
  const managers = managersData?.data;
  const meta = managers?.meta;
  const links = managers?.links;

  const { mutate: addManagerTheAgency, isPending: isPendingAddManagerTheAgency } = useAddManagerTheAgency();

  const handleSearch = (term) => {
    if (typeof term === "string") {
      setTempSearch(term);
      setSearch(term);
    } else {
      setSearch(tempSearch);
    }
    refetch();
  };

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (!selectedId) return;

    addManagerTheAgency(
      {
        data: { manager_id: selectedId },
      },
      {
        onSuccess: (res) => {
          sessionStorage.setItem("managerId", selectedId);
          sessionStorage.setItem("managerData", JSON.stringify(res));

          navigate("/agencies/add");
        },
        onError: (error) => {
          console.error("Failed to add manager:", error);
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center mx-4 w-full min-h-screen">
        <CustomLoaderTable />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("Select Manager")}</h2>
        <div className="text-sm text-muted-foreground">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            {isRTL ? "رجوع" : "Back"}
          </Button>
        </div>
      </div>

      <SearchAndFiltersSelectManger
        searchValue={tempSearch}
        setSearchValue={setTempSearch}
        statusValue={status}
        setStatusValue={setStatus}
        onSearch={handleSearch}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {managers?.data?.map((manager) => (
              <TableRow
                key={manager.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedId === manager.id ? "bg-muted border-primary/20" : ""
                }`}
                onClick={() => handleRowClick(manager.id)}
              >
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${
                        selectedId === manager.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedId === manager.id && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!selectedId}
          className={`bg-primary w-40 text-primary-foreground hover:bg-primary/90 disabled:bg-primary/50 disabled:text-primary-foreground/50 disabled:cursor-not-allowed`}
        >
          {isPendingAddManagerTheAgency ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t("Next")
          )}
        </Button>
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

export default SelectManager;
