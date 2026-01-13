import AgenciesHeader from "@/_components/Agencies/AgenciesHeader";
import AgenciesTable from "@/_components/Agencies/AgenciesTable";
import SearchAndFilters from "@/_components/Agencies/SearchAndFilters";
import { useGetAllAgencies } from "@/hooks/Actions/agencies/useCurdsAgencies";
import React, { useState } from "react";

const AgenciesPage = () => {
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState("");

  const { data: allagencies, isPending } = useGetAllAgencies(page, region);
  const agencies = allagencies?.data;

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6 ">
      <AgenciesHeader />
      <SearchAndFilters region={region} setRegion={setRegion} />
      <div className="overflow-x-auto">
        <AgenciesTable
          agencies={agencies}
          isPending={isPending}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default AgenciesPage;
