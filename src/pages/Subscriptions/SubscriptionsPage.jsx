import SearchAndFiltersSubscriptions from "@/_components/Subscriptions/SearchAndFiltersSubscriptions";
import SubscriptionsHeader from "@/_components/Subscriptions/SubscriptionsHeader";
import SubscriptionsTable from "@/_components/Subscriptions/SubscriptionsTable";
import { useGetAllSubscriptions } from "@/hooks/Actions/subscriptions/useCardSubscriptions";
import React, { useState } from "react";

const SubscriptionsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const [page, setPage] = useState(1);

  const {
    data: subscriptions,
    isPending: isPendingSubscriptions,
    refetch,
  } = useGetAllSubscriptions(page, search, status);

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
      <SubscriptionsHeader />
      <SearchAndFiltersSubscriptions
        searchValue={tempSearch}
        setSearchValue={setTempSearch}
        statusValue={status}
        setStatusValue={setStatus}
        onSearch={handleSearch}
      />

      <div className="overflow-x-auto">
        <SubscriptionsTable
          subscriptions={subscriptions}
          isPendingSubscriptions={isPendingSubscriptions}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default SubscriptionsPage;
