import { Mic, OctagonX, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { useGetRegions } from "@/hooks/Actions/region/useCardRegion";

const SearchAndFilters = ({ region, setRegion }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const toggleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.warning("المتصفح لا يدعم البحث الصوتي");
      return;
    }

    // لو شغال → وقف
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // لو مش شغال → ابدأ
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ar-EG";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognitionRef.current = recognition;
    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSearchValue(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  const { data: regions, isPending: regionsIsPending } = useGetRegions();
  const regionsData = regions?.data?.data || [];
  console.log(regionsData);

  return (
    <div className="space-y-6 rounded-lg bg-card py-6">
      {/* Toggle Buttons */}
      <div className="bg-neutral-100 my-5 grid grid-cols-2 p-1 h-14 rounded-[12px]">
        <button
          className={`rounded-xl text-[16px] font-medium ${
            !advancedFiltersOpen ? "bg-white text-primary" : ""
          }`}
          onClick={() => setAdvancedFiltersOpen(false)}
        >
          {t("search")}
        </button>
        <button
          className={`rounded-xl text-[16px] font-medium ${
            advancedFiltersOpen ? "bg-white text-primary" : ""
          }`}
          onClick={() => setAdvancedFiltersOpen(true)}
        >
          {t("Search Advanced")}
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t("search_placeholder")}
          className="pl-10 pr-12"
        />
        <button
          type="button"
          onClick={toggleVoiceSearch}
          className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition
    ${
      isListening
        ? "bg-black text-white animate-pulse"
        : "bg-gray-100 text-black"
    }`}
        >
          <Mic className="h-4 w-4" />
        </button>
      </div>

      {/* Advanced Filters */}
      {advancedFiltersOpen && (
        <div className="mt-4 grid gap-4 md:grid-cols-1 w-full">
          {/* الحالة */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-foreground">
              {t("status")}{" "}
            </label>
            <Select
              className="w-full"
              value={region}
              onValueChange={(value) => setRegion(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("all_cases")} />
              </SelectTrigger>
              <SelectContent>
                {regionsData.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* زر البحث */}
      <div className="mt-4">
        <Button className="w-full md:w-32 h-10 text-sm">{t("search")}</Button>
      </div>

      {/* {(searchValue || region) && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchValue || region
              ? "max-h-20 opacity-100 mt-4"
              : "max-h-0 opacity-0"
          } bg-gray-100 px-4 rounded-md p-2 flex items-center justify-between gap-2`}
        >
         
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              setRegion(null);
            }}
            className="cursor-pointer"
          >
            <OctagonX className="h-5 w-5" />
          </button>
          <p className="">حذف البحث </p>
        </div>
      )} */}
    </div>
  );
};

export default SearchAndFilters;
