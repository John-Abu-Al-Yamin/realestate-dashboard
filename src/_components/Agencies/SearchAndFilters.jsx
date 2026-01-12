import { Mic, Search } from "lucide-react";
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

const SearchAndFilters = () => {
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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

  const handleSearch = () => {
    // هنا بقى:
    // - filter local
    // - أو API request
    console.log("Search:", searchValue);
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
          placeholder="ابحث بالاسم أو الهاتف أو البريد أو رقم التسجيل..."
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
        <div className="mt-4 grid gap-4 md:grid-cols-3 w-full">
          {/* الحالة */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-foreground">
{t("status")}            </label>
            <Select className="w-full">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("all_cases")}/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all_cases")}</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* خطة الاشتراك */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-foreground">
              خطة الاشتراك
            </label>
            <Select className="w-full">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="كل الخطط" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الخطط</SelectItem>
                <SelectItem value="basic">الباقة الأساسية</SelectItem>
                <SelectItem value="pro">الباقة المتقدمة</SelectItem>
                <SelectItem value="premium">الباقة المميزة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* المدينة */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-foreground">
              المدينة
            </label>
            <Select className="w-full">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="كل المدن" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المدن</SelectItem>
                <SelectItem value="cairo">القاهرة</SelectItem>
                <SelectItem value="giza">الجيزة</SelectItem>
                <SelectItem value="alex">الإسكندرية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* زر البحث */}
      <div className="mt-4">
        <Button className="w-full md:w-32 h-10 text-sm">بحث</Button>
      </div>

    </div>
  );
};

export default SearchAndFilters;
