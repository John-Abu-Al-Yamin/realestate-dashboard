import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MangerHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('sidebar.mangers')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('Managers List')}</p>
      </div>
      <Button
        className="flex items-center gap-2 bg-primary cursor-pointer hover:bg-primary/90"
        onClick={() => navigate("/managers/add")}
      >
        <Plus className="h-4 w-4" />
        <span>{t('Add Manager')}</span>
      </Button>
    </div>
  );
};

export default MangerHeader;
