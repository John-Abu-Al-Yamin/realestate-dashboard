import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "next-i18next";

const SubscriptionPlanHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t("subscription Plans", "خطط الاشتراك")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("subscription_plans_list", "قائمة خطط الاشتراك")}
        </p>
      </div>
      <Button
        className="flex items-center gap-2 bg-primary cursor-pointer hover:bg-primary/90"
        onClick={() => navigate("/subscription-plans/add")}
      >
        <Plus className="h-4 w-4" />
        <span>{t("add_subscription_plan", "اضافة خطة")}</span>
      </Button>
    </div>
  );
};

export default SubscriptionPlanHeader;
