import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import {
  useGetAgencyLegalDetails,
  useGetAgencyMasterDataDetails,
  useGetAgencyProfileDetails,
  useGetAgencyVerificationDetails,
  useGetAgencyVisualIdentityDetails,
} from "@/hooks/Actions/agencies/useCurdsAgencies";
import LoadingSkeleton from "@/customs/LoadingSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import Components
import AgencyMasterDataDetails from "./components/AgencyMasterDataDetails";
import AgencyProfileDetails from "./components/AgencyProfileDetails";
import AgencyVerificationDetails from "./components/AgencyVerificationDetails";
import AgencyLegalDetails from "./components/AgencyLegalDetails";
import AgencyVisualIdentityDetails from "./components/AgencyVisualIdentityDetails";

const AgencyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  // Determine text direction for Tabs component
  const dir = isRTL ? "rtl" : "ltr";

  const { data: legalDetails, isPending: isLegalPending } =
    useGetAgencyLegalDetails(id);
  const { data: masterDataDetails, isPending: isMasterPending } =
    useGetAgencyMasterDataDetails(id);
  const { data: profileDetails, isPending: isProfilePending } =
    useGetAgencyProfileDetails(id);
  const { data: verificationDetails, isPending: isVerificationPending } =
    useGetAgencyVerificationDetails(id);
  const { data: visualIdentityDetails, isPending: isVisualPending } =
    useGetAgencyVisualIdentityDetails(id);

  if (
    isLegalPending ||
    isMasterPending ||
    isProfilePending ||
    isVerificationPending ||
    isVisualPending
  ) {
    return <LoadingSkeleton />;
  }

  const legalData = legalDetails?.data?.data;
  const masterData = masterDataDetails?.data?.data;
  const profileData = profileDetails?.data?.data;
  const verificationData = verificationDetails?.data?.data;
  const visualIdentityData = visualIdentityDetails?.data?.data;

  if (
    !legalData &&
    !masterData &&
    !profileData &&
    !verificationData &&
    !visualIdentityData
  ) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 p-4 md:p-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {isRTL
              ? "لم يتم العثور على بيانات الوكالة"
              : "Agency data not found"}
          </p>
        </div>
        <Button className="mt-4" onClick={() => navigate("/agencies")}>
          {isRTL ? "رجوع" : "Back"}
          <ArrowLeft className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-50/50 dark:bg-gray-950/50 p-4 md:p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isRTL ? "تفاصيل الوكالة" : "Agency Details"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {" "}
              {isRTL ? "المعرف" : "ID"} #{id}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/agencies")}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            {isRTL ? "رجوع" : "Back"}
          </Button>
        </div>

        <Tabs defaultValue="master-data" dir={dir} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto md:h-12">
            <TabsTrigger value="master-data">
              {isRTL ? "البيانات الأساسية" : "Master Data"}
            </TabsTrigger>
            <TabsTrigger value="profile">
              {isRTL ? "الملف الشخصي" : "Profile"}
            </TabsTrigger>
            <TabsTrigger value="verification">
              {isRTL ? "التحقق" : "Verification"}
            </TabsTrigger>
            <TabsTrigger value="legal">
              {isRTL ? "القانونية" : "Legal"}
            </TabsTrigger>
            <TabsTrigger value="visual-identity">
              {isRTL ? "الهوية البصرية" : "Visual Identity"}
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {/* Master Data Content */}
            <TabsContent value="master-data">
              <AgencyMasterDataDetails data={masterData} id={id} />
            </TabsContent>

            {/* Profile Content */}
            <TabsContent value="profile">
              <AgencyProfileDetails data={profileData} id={id} />
            </TabsContent>

            {/* Verification Content */}
            <TabsContent value="verification">
              <AgencyVerificationDetails data={verificationData} id={id} />
            </TabsContent>

            {/* Legal Content */}
            <TabsContent value="legal">
              <AgencyLegalDetails data={legalData} id={id} />
            </TabsContent>

            {/* Visual Identity Content */}
            <TabsContent value="visual-identity">
              <AgencyVisualIdentityDetails data={visualIdentityData} id={id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AgencyDetailsPage;
