import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "next-i18next";
import {
  ShieldCheck,
  SquarePen,
  FileText,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AgencyVerificationDetails = ({ data, id }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          {isRTL ? "لا توجد بيانات تحقق" : "No verification data available"}
        </p>
      </div>
    );
  }

  const isVerificationExpired = data?.verification_expiry
    ? new Date(data.verification_expiry) < new Date()
    : false;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {isRTL ? "بيانات التحقق" : "Verification Data"}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isVerificationExpired ? "destructive" : "success"}>
            {isVerificationExpired
              ? isRTL
                ? "منتهي الصلاحية"
                : "Expired"
              : isRTL
                ? "ساري"
                : "Valid"}
          </Badge>

          <Link to={`/agencies/edit-verification/${id}`}>
            <SquarePen className="w-6 h-6 text-black hover:translate-scale-105 duration-300 transition-all" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <FileText className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "الرخصة التجارية" : "Commercial License"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.commercial_license}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <FileText className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "الرخصة الضريبية" : "Tax License"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.tax_license}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <FileText className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "رخصة فال" : "FAL License"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.fal_license}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "العنوان" : "Address"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "تاريخ انتهاء التحقق" : "Verification Expiry"}
            </p>
            <p
              className={`text-sm font-medium ${
                isVerificationExpired
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {new Date(data.verification_expiry).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "المدينه" : "City"}
            </p>
            <p className={`text-sm font-medium `}>{data?.region_id?.name}</p>
          </div>
        </div>

        {data.history && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? "التاريخ" : "History"}
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {data.history}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {[
          {
            file: data.address_attachment,
            label: isRTL ? "مرفق العنوان" : "Address Attachment",
          },
          {
            file: data.commercial_license_attachment,
            label: isRTL
              ? "مرفق الرخصة التجارية"
              : "Commercial License Attachment",
          },
          {
            file: data.fal_license_attachment,
            label: isRTL ? "مرفق رخصة فال" : "FAL License Attachment",
          },
          {
            file: data.tax_license_attachment,
            label: isRTL ? "مرفق الرخصة الضريبية" : "Tax License Attachment",
          },
        ].map(
          (item, index) =>
            item.file && (
              <div key={index} className="flex flex-col">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {item.label}
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <img
                    src={item.file}
                    alt={item.label}
                    className="w-full h-48 object-contain rounded-md"
                  />
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default AgencyVerificationDetails;
