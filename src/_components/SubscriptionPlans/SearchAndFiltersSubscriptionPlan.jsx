import { Mic, Search, X } from "lucide-react";
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

const SearchAndFiltersSubscriptionPlan = ({
  searchValue,
  setSearchValue,
  statusValue,
  setStatusValue,
  onSearch,
}) => {
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const toggleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("المتصفح لا يدعم البحث الصوتي");
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

  return (
    <div className="space-y-6 rounded-lg bg-card p-6">
      {/* Toggle Buttons */}
      <div className="bg-neutral-100 my-5 grid grid-cols-2 p-1 h-14 rounded-[12px]">
        <button
          className={`rounded-xl text-[16px] font-medium ${
            !advancedFiltersOpen ? "bg-white text-primary" : ""
          }`}
          onClick={() => setAdvancedFiltersOpen(false)}
        >
          بحث
        </button>
        <button
          className={`rounded-xl text-[16px] font-medium ${
            advancedFiltersOpen ? "bg-white text-primary" : ""
          }`}
          onClick={() => setAdvancedFiltersOpen(true)}
        >
          بحث متقدم
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="ابحث بالاسم أو الهاتف أو البريد أو رقم التسجيل..."
          className="pl-10 pr-20"
        />

        {searchValue && (
          <button
            type="button"
            onClick={() => {
              onSearch("");
            }}
            className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
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
              {t("status")}
            </label>
            <Select
              className="w-full"
              value={statusValue}
              onValueChange={(val) => setStatusValue(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="كل الحالات" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="all">كل الحالات</SelectItem> */}
                <SelectItem value="1">نشط</SelectItem>
                <SelectItem value="0">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* زر البحث */}
      <div className="mt-4">
        <Button className="w-full md:w-32 h-10 text-sm" onClick={onSearch}>
          بحث
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFiltersSubscriptionPlan;
