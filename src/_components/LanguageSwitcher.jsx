import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Languages } from "lucide-react";

const LanguageSwitcher = ({ isSidebarOpen = true }) => {
  const { i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const handleToggleLanguage = () => {
    const newLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      variant="outline"
      size="sm"
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-all duration-300 hover:bg-gray-200 cursor-pointer"
      onClick={handleToggleLanguage}
    >
      <Languages className="h-4 w-4" />

      {isSidebarOpen && (
        <>
          {/* <span className="hidden sm:inline">{isArabic ? "🇺🇸" : "🇸🇦"}</span> */}
          <span className="hidden md:inline">
            {isArabic ? "English" : "العربية"}
          </span>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
