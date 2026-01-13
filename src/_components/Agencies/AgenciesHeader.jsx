import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "next-i18next";

const AgenciesHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t("Agencies", "الوكالات")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("agencies_list", "قائمة الوكالات المسجلة")}
        </p>
      </div>
      <Button
        className="flex items-center gap-2 bg-primary cursor-pointer hover:bg-primary/90 md:w-32 h-10"
        onClick={() => navigate("/agencies/select-manager")}
      >
        <Plus className="h-4 w-4" />
        <span>{t("Add Agency", "إضافة وكالة")}</span>
      </Button>
    </div>
  );
};

export default AgenciesHeader;
