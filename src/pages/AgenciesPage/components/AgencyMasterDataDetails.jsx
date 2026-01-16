import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "next-i18next";
import {
  Building2,
  User,
  Briefcase,
  Phone,
  Mail,
  Globe,
  Calendar,
  Link as LinkIcon,
  SquarePen,
} from "lucide-react";

const AgencyMasterDataDetails = ({ data, id }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          {isRTL ? "لا توجد بيانات أساسية" : "No master data available"}
        </p>
      </div>
    );
  }

  const socialMediaLinks = data?.social_media_links
    ? JSON.parse(data.social_media_links)
    : null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-black dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isRTL ? "البيانات الأساسية" : "Master Data"}
          </h2>
        </div>
        <Link to={`/agencies/edit-master-data/${id}`}>
          <SquarePen className="w-6 h-6 text-black hover:translate-scale-105 duration-300 transition-all" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "اسم المستخدم" : "Username"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.user_name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "اسم العلامة التجارية" : "Brand Name"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.brand_name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "رقم الهاتف" : "Phone Number"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.phone_number}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "رقم الجوال" : "Mobile Number"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.mobile_number}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "البريد الإلكتروني" : "Email"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {data.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Globe className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "الموقع الإلكتروني" : "Website"}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-blue-400 hover:underline"
              >
                {data.url}
              </a>
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

      {/* Social Media Links */}
      {socialMediaLinks && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
            {isRTL ? "روابط وسائل التواصل الاجتماعي" : "Social Media Links"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(socialMediaLinks).map(([platform, url]) => (
              <div
                key={platform}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <LinkIcon className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {platform}
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-black dark:text-blue-400 hover:underline truncate block"
                  >
                    {url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyMasterDataDetails;
