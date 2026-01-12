import SearchAndFiltersSubscriptionPlan from "@/_components/SubscriptionPlans/SearchAndFiltersSubscriptionPlan";
import SubscriptionPlanHeader from "@/_components/SubscriptionPlans/SubscriptionPlanHeader";
import SubscriptionPlanTable from "@/_components/SubscriptionPlans/SubscriptionPlanTable";
import { useGetAllSubscriptionPlans } from "@/hooks/Actions/subscription-plans/useCardSubscriptionPlans";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";


const SubscriptionPlansPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const [page, setPage] = useState(1);

  const { data: subscriptionPlans, isPending: isSubscriptionPlansPending , refetch} =
    useGetAllSubscriptionPlans(page, search, status);
    console.log(subscriptionPlans)

  const handleSearch = (term) => {
    if (typeof term === "string") {
      setTempSearch(term);
      setSearch(term);
    } else {
      setSearch(tempSearch);
    }
    refetch();
  };
  

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6 ">
      <SubscriptionPlanHeader />
      <SearchAndFiltersSubscriptionPlan
        searchValue={tempSearch}
        setSearchValue={setTempSearch}
        statusValue={status}
        setStatusValue={setStatus}
        onSearch={handleSearch}
      />
      <div className="overflow-x-auto">
        <SubscriptionPlanTable
          subscriptionPlans={subscriptionPlans}
          isSubscriptionPlansPending={isSubscriptionPlansPending}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
