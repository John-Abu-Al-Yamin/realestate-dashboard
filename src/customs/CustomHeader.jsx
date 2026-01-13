import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useTranslation } from "next-i18next";
import React from "react";
import { useNavigate } from "react-router-dom";

const CustomHeader = ({ title, description }) => {
  const navigate = useNavigate();

  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <header className="flex items-center justify-between text-neutral-950 mb-10 px-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4" />
        {isRTL ? "رجوع" : "Back"}
      </Button>
    </header>
  );
};

export default CustomHeader;
