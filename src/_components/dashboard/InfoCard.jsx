import { AlertCircle, Birdhouse, ChevronRight, Home } from "lucide-react";
import React from "react";

const InfoCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-blue-200 text-black p-6 ">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 opacity-20 rounded-full -ml-24 -mb-24"></div>

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Content Section */}
        <div className="flex items-start gap-4 flex-1">
          {/* Icon Container */}
          <div className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-white opacity-20 rounded-2xl blur-md"></div>
              <div className="relative bg-white bg-opacity-25 backdrop-blur-sm p-3 rounded-2xl border border-white border-opacity-30">
                <Birdhouse
                  className="h-7 w-7 text-gray-600"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-black">
                تم تقديم 74 مستأجر مؤخرا
              </h2>
              {/* <span className="bg-white bg-opacity-25 text-teal-500 text-sm font-semibold px-3 py-1 rounded-full">
                جديد
              </span> */}
            </div>
            <p className="text-gray-800 text-base leading-relaxed">
              تم العثور على بعض المشاكل، قم بمراجعتها والموافقة عليها
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          <button className="cursor-pointer group relative bg-white text-black px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-200 active:scale-95 transition-all duration-200  flex items-center gap-2">
            <span>مراجعة القوائم</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
