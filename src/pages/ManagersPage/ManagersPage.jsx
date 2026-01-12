import MangerHeader from "@/_components/Managers/MangerHeader";
import MangerTable from "@/_components/Managers/MangerTable";
import SearchAndFiltersManger from "@/_components/Managers/SearchAndFiltersManger";
import { useGetAllManagers } from "@/hooks/Actions/mangers/useCurdsMangers";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

const ManagersPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const {
    data: managersData,
    isPending,
    refetch,
  } = useGetAllManagers(page, search, status);
  const managers = managersData?.data || [];
  console.log(managers)

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
      <MangerHeader />
      <SearchAndFiltersManger
        searchValue={tempSearch}
        setSearchValue={setTempSearch}
        statusValue={status}
        setStatusValue={setStatus}
        onSearch={handleSearch}
      />
      <div className="overflow-x-auto">
        <MangerTable managers={managers} isPending={isPending} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default ManagersPage;
