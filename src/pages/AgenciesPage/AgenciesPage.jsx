import AgenciesHeader from "@/_components/Agencies/AgenciesHeader";
import AgenciesTable from "@/_components/Agencies/AgenciesTable";
import SearchAndFilters from "@/_components/Agencies/SearchAndFilters";
import { useGetAllAgencies } from "@/hooks/Actions/agencies/useCurdsAgencies";
import React, { useState } from "react";

const AgenciesPage = () => {

  const [page, setPage] = useState(1);


  const { data: allagencies, isPending } = useGetAllAgencies(page);

  const agencies = allagencies?.data;


  console.log("agencies", agencies);

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6 ">
      <AgenciesHeader />
      <SearchAndFilters />
      <div className="overflow-x-auto">
        <AgenciesTable agencies={agencies} isPending={isPending} page={page} setPage={setPage}/>
      </div>
    </div>
  );
};

export default AgenciesPage;
