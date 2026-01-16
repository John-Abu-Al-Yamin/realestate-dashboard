import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "next-i18next";
import {
  User,
  SquarePen,
  Briefcase,
  Mail,
  CheckCircle2,
  Calendar,
} from "lucide-react";

const AgencyProfileDetails = ({ data, id }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          {isRTL ? "لا يوجد ملف تعريفي" : "No profile data available"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isRTL ? "الملف الشخصي" : "Agency Profile"}
          </h2>
        </div>
        <Link to={`/agencies/edit-profile/${id}`}>
          <SquarePen className="w-6 h-6 text-black hover:translate-scale-105 duration-300 transition-all" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "نظرة عامة" : "Overview"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.overview}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "الرؤية" : "Vision"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.vision}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "الرسالة" : "Message"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "الميزات" : "Features"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.features}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "تاريخ الإنشاء" : "Created At"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {new Date(data.created_at).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "تاريخ التحديث" : "Updated At"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {new Date(data.updated_at).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg my-4">
        <div className="w-full flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {isRTL ? "المرفق" : "Attachment"}
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
            <img
              src={data.attachment}
              alt="Attachment"
              className="w-full h-48 object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyProfileDetails;
