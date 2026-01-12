import { useGetManagerId } from "@/hooks/Actions/mangers/useCurdsMangers";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  User,
  Mail,
  Phone,
  IdCard,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import LoadingSkeleton from "@/customs/LoadingSkeleton";
import { Button } from "@/components/ui/button";

const ManagersPageDetalis = () => {
  const { id } = useParams();
  const { data: response, isPending } = useGetManagerId(id);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isPending) {
    return <LoadingSkeleton />;
  }

  const manager = response?.data?.data;

  if (!manager) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {t("Manager not found")}
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 p-2 md:p-4">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-lg  p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {manager.first_name} {manager.second_name} {manager.last_name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  ID: {manager.id}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                manager.status
              )}`}
            >
              {manager.status === "active" ? t("active") : t("inactive")}
            </span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-900 rounded-lg  p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t("Personal Information")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("Email")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {manager.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("Phone")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {manager.phone_number}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <IdCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("Identity")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {manager.identity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("Created At")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {new Date(manager.created_at).toLocaleDateString("ar-EG")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agencies */}
        <div className="bg-white dark:bg-gray-900 rounded-lg  p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t("sidebar.agencies")}
            </h2>
          </div>

          <div className="space-y-4">
            {manager?.agencies?.map((agency) => (
              <div
                key={agency.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {t("ID")}: {agency.id}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded text-xs font-medium">
                    {agency.setup_status === "incomplete"
                      ? t("incomplete")
                      : t("completed")}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(agency.setup_steps).map(
                    ([step, completed]) => (
                      <div
                        key={step}
                        className="flex items-center gap-2 text-sm"
                      >
                        {completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        )}
                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                          {step === "legal"
                            ? t("Legal")
                            : step === "master_data"
                            ? t("Master Data")
                            : step === "verification"
                            ? t("Verification")
                            : step === "profile"
                            ? t("Profile")
                            : t("Visual Identity")}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("Created At")}:{" "}
                  {new Date(agency.created_at).toLocaleString("ar-EG")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end p-6">
        <Button
          className="w-40"
          onClick={() => navigate(`/managers/edit/${manager.id}`)}
        >
          {t("Edit")}
        </Button>
      </div>
    </div>
  );
};

export default ManagersPageDetalis;
