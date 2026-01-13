import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
const SearchAndFiltersSelectActicityLog = ({
  type,
  setType,
  onSearch,
}) => {

    const { t , i18n } = useTranslation();
    const isRTL = i18n.dir() === "rtl";
  
  const options = [
    "Admin",
    "Manager",
    "Agency",
    "AgencyMasterData",
    "AgencyLegal",
    "AgencyProfile",
    "AgencyVerification",
    "AgencyVisualIdentity",
    "City",
    "Country",
    "Region",
    "Subscription",
    "SubscriptionPlan",
  ];

  return (
    <div className="space-y-6 rounded-lg bg-card py-6">
      <div className="mt-4 grid gap-4 md:grid-cols-1 w-full">
        {/* الحالة */}
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-foreground">
            {t("status")}
          </label>
          <Select
            className="w-full"
            value={type}
            onValueChange={(val) => setType(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="كل الحالات" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="">كل الحالات</SelectItem> */}

              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <Button className="w-full md:w-32 h-10 text-sm" onClick={onSearch}>
          {t("search")}
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFiltersSelectActicityLog;
