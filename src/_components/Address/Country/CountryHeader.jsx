import React from "react";
import { useTranslation } from "next-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CountryHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t("countrys")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("Country List")}
        </p>
      </div>
      <Button
        className="flex items-center gap-2 bg-primary cursor-pointer hover:bg-primary/90 md:w-32 h-10" 
        onClick={() => navigate("/address/countries/add")}
      >
        <Plus className="h-4 w-4" />
        <span>{t("Add Country")}</span>
      </Button>
    </div>
  );
};

export default CountryHeader;
