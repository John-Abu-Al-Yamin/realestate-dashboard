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
import { useTranslation } from "next-i18next";
import { Eye, Loader2, SquarePen, Trash2Icon } from "lucide-react";
import {  Link } from "react-router-dom";
import { useDeleteSubscriptionPlan } from "@/hooks/Actions/subscription-plans/useCardSubscriptionPlans";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const SubscriptionPlanTable = ({
  subscriptionPlans,
  isSubscriptionPlansPending,
  page,
  setPage,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const safeSubscriptionPlans = Array.isArray(subscriptionPlans?.data?.data)
    ? subscriptionPlans.data.data
    : [];

  const meta = subscriptionPlans?.data?.meta;
  const links = subscriptionPlans?.data?.links;

  const {
    mutate: deleteSubscriptionPlan,
    isPending: isDeleteSubscriptionPlanPending,
  } = useDeleteSubscriptionPlan();
  if (isSubscriptionPlansPending) {
    return <CustomLoaderTable />;
  }

  if (!safeSubscriptionPlans || safeSubscriptionPlans.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">
        {t("No subscriptions-plans found")}
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
                {t("Name")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Price")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Status")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Max Storage")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Max Properties")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Max Staff")}
              </TableHead>
              <TableHead className={isRTL ? "text-right" : "text-left"}>
                {t("Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {safeSubscriptionPlans?.map((plan, index) => (
              <TableRow
                key={plan.id}
                className={`cursor-pointer transition-colors ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/70"
                } hover:bg-muted/60`}
              >
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell>
                  <Badge
                    variant={plan.active ? "default" : "secondary"}
                    className={
                      plan.active
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }
                  >
                    {plan.active ? t("Active") : t("Inactive")}
                  </Badge>
                </TableCell>
                <TableCell>{plan.max_storage}</TableCell>
                <TableCell>{plan.max_properties}</TableCell>
                <TableCell>{plan.max_staff}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Link to={`/subscription-plans/${plan.id}`}>
                    <Eye className="h-4 w-4  hover:text-gray-800 duration-300 transform hover:scale-110" />
                  </Link>

                  <Link to={`/subscription-plans/edit/${plan.id}`}>
                    <SquarePen className="h-4 w-4  hover:text-gray-800 duration-300 transform hover:scale-110" />
                  </Link>
                  {isDeleteSubscriptionPlanPending ? (
                    <Loader2 className="h-4 w-4 animate-spin " />
                  ) : (
                    <Trash2Icon
                      onClick={() => deleteSubscriptionPlan({ id: plan.id })}
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

export default SubscriptionPlanTable;
