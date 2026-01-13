import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Clock,
  Globe,
  FileText,
  MapPin,
  CheckCircle2,
  XCircle,
  Palette,
  Briefcase,
  SquarePen,
  Link as LinkIcon,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "next-i18next";
import {
  useGetAgencyLegalDetails,
  useGetAgencyMasterDataDetails,
  useGetAgencyProfileDetails,
  useGetAgencyVerificationDetails,
  useGetAgencyVisualIdentityDetails,
} from "@/hooks/Actions/agencies/useCurdsAgencies";
import LoadingSkeleton from "@/customs/LoadingSkeleton";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AgencyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

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

  const socialMediaLinks = masterData?.social_media_links
    ? JSON.parse(masterData.social_media_links)
    : null;

  const isVerificationExpired = verificationData?.verification_expiry
    ? new Date(verificationData.verification_expiry) < new Date()
    : false;

  const faqs = legalData?.faqs ? JSON.parse(legalData.faqs) : [];

  return (
    <div className="min-h-screen relative bg-gray-50/50 dark:bg-gray-950/50 p-4 md:p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/agencies")}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            {isRTL ? "رجوع" : "Back"}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isRTL ? "تفاصيل الوكالة" : "Agency Details"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {id}</p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg  p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {isRTL ? "ملخص إعداد الوكالة" : "Agency Setup Summary"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div
              onClick={() => {
                const section = document.getElementById("master-data"); // id الخاص بالsection
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  masterData
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {masterData ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium">
                {isRTL ? "البيانات الأساسية" : "Master Data"}
              </span>
            </div>

            <div
              onClick={() => {
                const section = document.getElementById("profile");
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  profileData
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {profileData ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium">
                {isRTL ? "الملف الشخصي" : "Profile"}
              </span>
            </div>

            <div
              onClick={() => {
                const section = document.getElementById("verification");
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  verificationData
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {verificationData ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium">
                {isRTL ? "التحقق" : "Verification"}
              </span>
            </div>

            <div
              onClick={() => {
                const section = document.getElementById("legal");
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  legalData
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {legalData ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium">
                {isRTL ? "القانونية" : "Legal"}
              </span>
            </div>

            <div
              onClick={() => {
                const section = document.getElementById("visual-identity");
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  visualIdentityData?.id
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {visualIdentityData?.id ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium">
                {isRTL ? "الهوية البصرية" : "Visual Identity"}
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        {/* Master Data Section */}
        {masterData && (
          <div
            id="master-data"
            className="bg-white dark:bg-gray-900 rounded-lg  p-6"
          >
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center  gap-3">
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
                    {masterData.user_name}
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
                    {masterData.brand_name}
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
                    {masterData.phone_number}
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
                    {masterData.mobile_number}
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
                    {masterData.email}
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
                      href={masterData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-blue-400 hover:underline"
                    >
                      {masterData.url}
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
                    {new Date(masterData.created_at).toLocaleDateString(
                      "ar-EG"
                    )}
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
                    {new Date(masterData.updated_at).toLocaleDateString(
                      "ar-EG"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            {socialMediaLinks && (
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                  {isRTL
                    ? "روابط وسائل التواصل الاجتماعي"
                    : "Social Media Links"}
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
        )}

        {/* Profile Section */}
        {profileData && (
          <div
            id="profile"
            className="bg-white dark:bg-gray-900 rounded-lg p-6"
          >
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {isRTL ? "ملف الوكالة" : "Agency Profile"}
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
                    {profileData.overview}
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
                    {profileData.vision}
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
                    {profileData.message}
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
                    {profileData.features}
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
                    {new Date(profileData.created_at).toLocaleDateString(
                      "ar-EG"
                    )}
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
                    {new Date(profileData.updated_at).toLocaleDateString(
                      "ar-EG"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg my-4">
              <div className="w-full flex flex-col">
                {/* Label فوق الـ box */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {isRTL ? "المرفق" : "Attachment"}
                </p>

                {/* Box الصورة */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <img
                    src={profileData.attachment}
                    alt="Attachment"
                    className="w-full h-48 object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-6" />
        {/* Verification Section */}
        {verificationData && (
          <div
            id="verification"
            className="bg-white dark:bg-gray-900 rounded-lg  p-6"
          >
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
                <Badge
                  variant={isVerificationExpired ? "destructive" : "success"}
                >
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
                    {verificationData.commercial_license}
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
                    {verificationData.tax_license}
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
                    {verificationData.fal_license}
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
                    {verificationData.address}
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
                    {new Date(
                      verificationData.verification_expiry
                    ).toLocaleDateString("ar-EG")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isRTL ? "المدينه" : "City"}
                  </p>
                  <p className={`text-sm font-medium `}>
                    {verificationData?.region_id?.name}
                  </p>
                </div>
              </div>

              {verificationData.history && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isRTL ? "التاريخ" : "History"}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {verificationData.history}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                {
                  file: verificationData.address_attachment,
                  label: isRTL ? "مرفق العنوان" : "Address Attachment",
                },
                {
                  file: verificationData.commercial_license_attachment,
                  label: isRTL
                    ? "مرفق الرخصة التجارية"
                    : "Commercial License Attachment",
                },
                {
                  file: verificationData.fal_license_attachment,
                  label: isRTL ? "مرفق رخصة فال" : "FAL License Attachment",
                },
                {
                  file: verificationData.tax_license_attachment,
                  label: isRTL
                    ? "مرفق الرخصة الضريبية"
                    : "Tax License Attachment",
                },
              ].map(
                (item, index) =>
                  item.file && (
                    <div key={index} className="flex flex-col">
                      {/* Label فوق الـ box */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {item.label}
                      </p>

                      {/* Box الصورة */}
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
        )}

        <Separator className="my-6" />
        {/* Legal Section */}
        {legalData && (
          <div id="legal" className="bg-white dark:bg-gray-900 rounded-lg  p-6">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {isRTL ? "المعلومات القانونية" : "Legal Information"}
                </h2>
              </div>
              <Link to={`/agencies/edit-legal/${id}`}>
                <SquarePen className="w-6 h-6 text-black hover:translate-scale-105 duration-300 transition-all" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {isRTL ? "الشروط والأحكام" : "Terms and Conditions"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {legalData.terms_and_conditions}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {legalData.privacy_policy}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {isRTL ? "الأسئلة الشائعة" : "FAQs"}
                </h3>

                {faqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-right">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isRTL ? "لا توجد أسئلة شائعة" : "No FAQs available"}
                  </p>
                )}
              </div>

              {legalData.cookie_policy && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {isRTL ? "سياسة الكوكيز" : "Cookie Policy"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {legalData.cookie_policy}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <Separator className="my-6" />
        {/* Visual Identity Section */}
        <div
          id="visual-identity"
          className="bg-white dark:bg-gray-900 rounded-lg  p-6"
        >
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

          {visualIdentityData && visualIdentityData.id ? (
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
                          backgroundColor:
                            visualIdentityData.primary_color || "#ccc",
                        }}
                      />
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {visualIdentityData.primary_color ||
                          (isRTL ? "غير محدد" : "Not set")}
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
                          backgroundColor:
                            visualIdentityData.secondary_color || "#ccc",
                        }}
                      />
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {visualIdentityData.secondary_color ||
                          (isRTL ? "غير محدد" : "Not set")}
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
                      {visualIdentityData.font ||
                        (isRTL ? "غير محدد" : "Not set")}
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
                      {visualIdentityData.theme ||
                        (isRTL ? "غير محدد" : "Not set")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mt-4">
                {[
                  {
                    file: visualIdentityData.icon,
                    label: isRTL ? "الأيقونة" : "Icon",
                  },
                  {
                    file: visualIdentityData.logo,
                    label: isRTL ? "الشعار" : "Logo",
                  },
                  {
                    file: visualIdentityData.watermark,
                    label: isRTL ? "العلامة المائية" : "Watermark",
                  },
                ].map(
                  (item, index) =>
                    item.file && (
                      <div key={index} className="flex flex-col">
                        {/* Label فوق الـ box */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          {item.label}
                        </p>

                        {/* Box الصورة */}
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
      </div>
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed  bottom-26 left-8 lg:left-12 lg:bottom-6 p-3 bg-gray-200 text-black rounded-full cursor-pointer shadow-lg hover:bg-gray-300 transition-colors"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AgencyDetailsPage;
