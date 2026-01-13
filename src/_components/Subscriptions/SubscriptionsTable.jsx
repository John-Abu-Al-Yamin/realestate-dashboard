import { useTranslation } from "next-i18next";
import React from "react";
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
import { Eye, Loader2, SquarePen, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteSubscription } from "@/hooks/Actions/subscriptions/useCardSubscriptions";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SubscriptionsTable = ({
  subscriptions,
  isPendingSubscriptions,
  page,
  setPage,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const subscriptionsdata = Array.isArray(subscriptions?.data?.data)
    ? subscriptions.data.data
    : [];

  const meta = subscriptions?.data?.meta;
  const links = subscriptions?.data?.links;

  const {
    mutate: deleteSubscription,
    isPending: isPendingDeleteSubscriptions,
  } = useDeleteSubscription();

  if (isPendingSubscriptions) {
    return <CustomLoaderTable />;
  }

  if (subscriptionsdata.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t("No subscriptions found")}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Agency ID")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Agency Status")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Manager ID")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Start Date")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("End Date")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Status")}
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
            {subscriptionsdata?.map((subscription, index) => (
              <TableRow
                key={subscription.id}
                className={`cursor-pointer transition-colors ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/70"
                } hover:bg-muted/60`}
              >
                {/* عرض الـ Agency ID واسم الوكالة */}
                <TableCell className="font-medium">
                  #{subscription.agency?.id || "N/A"} -{" "}
                  {subscription.agency?.master_data?.user_name || "N/A"}
                </TableCell>

                <TableCell>
                  {subscription.agency
                    ? ` ${subscription.agency.setup_status}`
                    : "-"}
                </TableCell>
                <TableCell>
                  {subscription.agency
                    ? `${subscription.agency.manager.first_name} ${subscription.agency.manager.last_name}`
                    : "-"}
                </TableCell>

                <TableCell>{subscription.start_date}</TableCell>
                <TableCell>{subscription.end_date}</TableCell>
                <TableCell>
                  <Badge
                    variant={subscription.active ? "default" : "secondary"}
                    className={
                      subscription.active
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }
                  >
                    {subscription.active ? t("Active") : t("Inactive")}
                  </Badge>
                </TableCell>
                <TableCell>
                  {subscription.created_at
                    ? subscription.created_at.slice(0, 10)
                    : "-"}
                </TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link to={`/subscriptions/${subscription.id}`}>
                    <Eye className="h-4 w-4 hover:text-gray-800 duration-300 transform hover:scale-110" />
                  </Link>

                  <Link to={`/subscriptions/edit/${subscription.id}`}>
                    <SquarePen className="h-4 w-4 hover:text-gray-800 duration-300 transform hover:scale-110" />
                  </Link>

                  {isPendingDeleteSubscriptions ? (
                    <Loader2 className="h-4 w-4 animate-spin " />
                  ) : (
                    <Trash2Icon
                      onClick={() =>
                        deleteSubscription({ id: subscription.id })
                      }
                      className="h-4 w-4  hover:text-gray-800 duration-300 transform hover:scale-110"
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
    </>
  );
};

export default SubscriptionsTable;
