import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  SquarePen,
  Check,
  X,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "next-i18next";
import { useNavigate } from "react-router-dom";
import CustomLoaderTable from "@/customs/CustomLoaderTable";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AgenciesTable = ({ agencies, isPending, page, setPage }) => {
  const { t, i18n } = useTranslation();
  const headers = [
    t("ID"),
    t("Manager ID"),
    t("Setup Status"),
    t("Legal"),
    t("Master Data"),
    t("Profile"),
    t("Verification"),
    t("Visual Identity"),
    t("Created At"),
    t("Updated At"),
    t("Actions"),
  ];

  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  // استخدم البيانات من props إذا كانت موجودة، وإلا استخدم البيانات الثابتة كـ fallback
  const data = agencies?.data || [];
  const meta = agencies?.meta;
  const links = agencies?.links;
  console.log(agencies);

  // دالة لتنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // دالة لعرض الحالة (نعم/لا)
  const renderBoolean = (value) => {
    return value ? (
      <Check className="h-4 w-4 text-green-600" />
    ) : (
      <X className="h-4 w-4 text-red-600" />
    );
  };

  // دالة لعرض بيانات Master Data إذا كانت موجودة
  const renderMasterData = (masterData) => {
    if (!masterData) return "-";
    return (
      <div className="text-xs space-y-1">
        <div className="font-medium">
          {masterData.brand_name || masterData.user_name}
        </div>
        <div className="text-gray-500">{masterData.email}</div>
        <div className="text-gray-500">{masterData.phone_number}</div>
      </div>
    );
  };

  // دالة لعرض بيانات Legal إذا كانت موجودة
  const renderLegal = (legalData) => {
    if (!legalData) return "-";
    return (
      <Badge variant="outline" className="bg-blue-50 text-xs">
        {t("Configured")}
      </Badge>
    );
  };

  // دالة لمعالجة الحذف
  const handleDelete = (row) => {
    console.log("Delete agency:", row.id);
  };

  if (isPending) {
    return <CustomLoaderTable />;
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 hover:bg-gray-50">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`h-12 px-2 md:px-4 align-middle font-medium text-gray-500 text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50"
                  >
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="font-medium">{row.id}</span>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {row.manager.first_name} {row.manager.second_name}{" "}
                      {row.manager.last_name}
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <Badge
                        variant="outline"
                        className={
                          row.setup_status === "complete"
                            ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200 text-xs"
                            : row.setup_status === "incomplete"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 text-xs"
                            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 text-xs"
                        }
                      >
                        {t(row.setup_status)}
                      </Badge>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {renderBoolean(row.setup_steps?.legal)}
                        {row.legal && renderLegal(row.legal)}
                      </div>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {renderBoolean(row.setup_steps?.master_data)}
                        {renderMasterData(row.master_data)}
                      </div>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {renderBoolean(row.setup_steps?.profile)}
                        {row.profile && (
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-xs"
                          >
                            {t("Profile")}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {renderBoolean(row.setup_steps?.verification)}
                        {row.verification && (
                          <Badge
                            variant="outline"
                            className="bg-indigo-50 text-xs"
                          >
                            {t("Verified")}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {renderBoolean(row.setup_steps?.visual_identity)}
                        {row.visual_identity && (
                          <Badge
                            variant="outline"
                            className="bg-pink-50 text-xs"
                          >
                            {t("Identity")}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="text-xs">
                        {formatDate(row.created_at)}
                      </div>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm [&:has([role=checkbox])]:pr-0 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="text-xs">
                        {formatDate(row.updated_at)}
                      </div>
                    </td>
                    <td
                      className={`p-2 md:p-4 align-middle text-xs md:text-sm ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Actions Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-gray-100 "
                            >
                              <SquarePen className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align={isRTL ? "start" : "end"}>
                            <DropdownMenuItem
                              onClick={() => navigate(`/agencies/${row.id}`)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              {t("View Details")}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => navigate(`/agencies/${row.id}`)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              {t("Edit")}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                navigate(
                                  `/agencies/edit-manager/${row.manager_id}`,
                                  {
                                    state: {
                                      agencyId: row.id,
                                    },
                                  }
                                )
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              {t("Edit Manager")}
                            </DropdownMenuItem>
                            {/* 
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(row)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t("Delete")}
                            </DropdownMenuItem> */}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Info Icon (Logs) */}
                        {/* <button
                          onClick={() => handelOpenLogs(row.id, "Agency")}
                          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition cursor-pointer"
                        >
                          <Info className="h-4 w-4 " />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="p-4 text-center text-gray-500"
                  >
                    {t("No data available")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
    </>
  );
};

export default AgenciesTable;
