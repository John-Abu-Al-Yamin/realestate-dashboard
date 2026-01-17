import CountryHeader from "@/_components/Address/Country/CountryHeader";
import CountryTabel from "@/_components/Address/Country/CountryTabel";
import SearchAndFiltersCountry from "@/_components/Address/Country/SearchAndFiltersCountry";
import { useGetAllCountries } from "@/hooks/Actions/Country/useCurdsCountry";
import React, { useState } from "react";

const Countries = () => {
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const {
    data: countries,
    isPending: countriesPending,
    refetch,
  } = useGetAllCountries();

  const country = countries?.data || [];
  console.log(country);

  const handleSearch = (term) => {
    if (typeof term === "string") {
      setTempSearch(term);
      setSearchValue(term);
    } else {
      setSearchValue(tempSearch);
    }
    refetch();
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background p-4 md:p-6 ">
      <CountryHeader />
      <SearchAndFiltersCountry
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
      />
      <div className="overflow-x-auto">
        <CountryTabel
          country={country}
          page={page}
          setPage={setPage}
          countriesPending={countriesPending}
        />
      </div>
    </div>
  );
};

export default Countries;
