import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "next-i18next";

const SubscriptionsHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t("subscriptions", "الاشتراكات")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("subscriptions_list", "قائمة الاشتراكات")}
        </p>
      </div>
      <Button
        className="flex items-center gap-2 bg-primary cursor-pointer hover:bg-primary/90"
        onClick={() => navigate("/subscriptions/add")}
      >
        <Plus className="h-4 w-4" />
        <span>{t("add_subscription", "اضافة اشتراك")}</span>
      </Button>
    </div>
  );
};

export default SubscriptionsHeader;
