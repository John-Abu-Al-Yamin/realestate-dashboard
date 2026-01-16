
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "next-i18next";
import { Palette, SquarePen, CheckCircle2, XCircle } from "lucide-react";

const AgencyVisualIdentityDetails = ({ data, id }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    if (!data) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                    {isRTL
                        ? "لا توجد بيانات هوية بصرية"
                        : "No visual identity data available"}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <Palette className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {isRTL ? "الهوية البصرية" : "Visual Identity"}
                    </h2>
                </div>
                <Link to={`/agencies/edit-visual-identity/${id}`}>
                    <SquarePen className="w-6 h-6 text-black hover:translate-scale-105 duration-300 transition-all" />
                </Link>
            </div>

            {data.id ? (
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {isRTL ? "اللون الأساسي" : "Primary Color"}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-300"
                                        style={{
                                            backgroundColor: data.primary_color || "#ccc",
                                        }}
                                    />
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {data.primary_color || (isRTL ? "غير محدد" : "Not set")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {isRTL ? "اللون الثانوي" : "Secondary Color"}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-300"
                                        style={{
                                            backgroundColor: data.secondary_color || "#ccc",
                                        }}
                                    />
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {data.secondary_color || (isRTL ? "غير محدد" : "Not set")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {isRTL ? "الخط" : "Font"}
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {data.font || (isRTL ? "غير محدد" : "Not set")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {isRTL ? "الثيم" : "Theme"}
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {data.theme || (isRTL ? "غير محدد" : "Not set")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mt-4">
                        {[
                            {
                                file: data.icon,
                                label: isRTL ? "الأيقونة" : "Icon",
                            },
                            {
                                file: data.logo,
                                label: isRTL ? "الشعار" : "Logo",
                            },
                            {
                                file: data.watermark,
                                label: isRTL ? "العلامة المائية" : "Watermark",
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
                                )
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <XCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                        {isRTL
                            ? "لم يتم إعداد الهوية البصرية بعد"
                            : "Visual identity has not been set up yet"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AgencyVisualIdentityDetails;
