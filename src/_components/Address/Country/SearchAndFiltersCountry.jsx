import { useTranslation } from "next-i18next";
import React, { useRef, useState } from "react";
import { Search, Mic, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SearchAndFiltersCountry = ({  searchValue, setSearchValue, onSearch }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const toggleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.warning("المتصفح لا يدعم البحث الصوتي");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

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
      onSearch(text);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
  };

  return (
    <div className="space-y-4 rounded-lg bg-card py-6">
      {/* Search Input */}
      <div className="relative w-full">
        <Search
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${
            isRTL ? "right-3" : "left-3"
          }`}
        />

        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(searchValue)}
          placeholder={t("search_placeholder")}
          className={`${isRTL ? "pr-10 pl-20" : "pl-10 pr-20"}`}
        />

        {searchValue && (
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              onSearch("");
            }}
            className={`absolute top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground ${
              isRTL ? "left-10" : "right-10"
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={toggleVoiceSearch}
          className={`absolute top-1/2 -translate-y-1/2 rounded-md p-1 transition ${
            isRTL ? "left-3" : "right-3"
          }
          ${
            isListening
              ? "bg-black text-white animate-pulse"
              : "bg-gray-100 text-black"
          }`}
        >
          <Mic className="h-4 w-4" />
        </button>
      </div>

      {/* Search Button */}
      <Button
        className="w-full md:w-32 h-10 text-sm"
        onClick={() => onSearch(searchValue)}
      >
        {t("search")}
      </Button>
    </div>
  );
};

export default SearchAndFiltersCountry;
