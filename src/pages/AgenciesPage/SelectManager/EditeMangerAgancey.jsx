import { Button } from "@/components/ui/button";
import { useEditeAgencyManager } from "@/hooks/Actions/agencies/useCurdsAgencies";
import {
  useGetAllManagers,
  useGetManagerId,
} from "@/hooks/Actions/mangers/useCurdsMangers";
import { ArrowLeft, Check, Loader2, User } from "lucide-react";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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

import SearchAndFiltersEditeManger from "./SearchAndFiltersEditeManger";
import CustomLoaderTable from "@/customs/CustomLoaderTable";
import { useLocation } from "react-router-dom";

const EditeMangerAgancey = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const { id } = useParams();
  const location = useLocation();
  const agencyId = location.state?.agencyId;

  // console.log("agencyId",agencyId)

  const { data: managersData, isPending: isPendingManagers } =
    useGetAllManagers(page, search, status);
  const managers = managersData?.data;
  const meta = managers?.meta;
  const links = managers?.links;

  const { data: managerDataId, isPending: isPendingId } = useGetManagerId(id);

  // console.log(managerDataId?.data?.data)

  const { mutate: editeManager, isPending: isPendingEdite } =
    useEditeAgencyManager(agencyId);

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  const handleSearch = (term) => {
    if (typeof term === "string") {
      setTempSearch(term);
      setSearch(term);
    } else {
      setSearch(tempSearch);
    }
    refetch();
  };

  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   editeManager({ data: selectedId });
  // };

  // console.log("",selectedId)

  const handleSubmit = () => {
    if (!selectedId) return;

    editeManager(
      {
        data: { manager_id: selectedId },
      },
      {
        onSuccess: () => {
          navigate("/agencies");
        },
        onError: (error) => {
          console.error("Failed to add manager:", error);
        },
      }
    );
  };

  useEffect(() => {
    if (managerDataId?.data?.data?.id) {
      setSelectedId(managerDataId.data.data.id);
    }
  }, [managerDataId]);

  if (isPendingManagers) {
    return (
      <div className="flex items-center justify-center mx-4 w-full min-h-screen">
        <CustomLoaderTable />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("edit manager agency")}</h2>
        <div className="text-sm text-muted-foreground">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            {isRTL ? "رجوع" : "Back"}
          </Button>
        </div>
      </div>
      <SearchAndFiltersEditeManger
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
          disabled={!selectedId || isPendingEdite}
          className={`bg-primary w-40 text-primary-foreground hover:bg-primary/90 disabled:bg-primary/50 disabled:text-primary-foreground/50 disabled:cursor-not-allowed`}
        >
          {isPendingEdite ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t("Edit")
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

export default EditeMangerAgancey;
