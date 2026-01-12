import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import {
  useEditeAgencyMasterData,
  useGetAgencyMasterDataDetails,
} from "@/hooks/Actions/agencies/useCurdsAgencies";
import LoadingSkeleton from "@/customs/LoadingSkeleton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingFormSkeleton from "@/customs/LoadingFormSkeleton";
import CustomHeader from "@/customs/CustomHeader";
import { Separator } from "@/components/ui/separator";

const EditMasterData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const schema = z.object({
    user_name: z.string().min(1, "Username is required"),
    brand_name: z.string().min(1, "Brand name is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    mobile_number: z.string().min(1, "Mobile number is required"),
    email: z.string().optional(),
    url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: masterDataDetails, isPending } =
    useGetAgencyMasterDataDetails(id);
  const masterData = masterDataDetails?.data?.data;

  useEffect(() => {
    if (masterData) {
      console.log("MasterData:", masterData);

      setValue("user_name", masterData.user_name);
      setValue("email", masterData.email);
      setValue("phone_number", masterData.phone_number);
      setValue("mobile_number", masterData.mobile_number);
      setValue("brand_name", masterData.brand_name);
      setValue("url", masterData.url);

      // Social Media
      let socialLinks = {};
      try {
        socialLinks = masterData.social_media_links
          ? JSON.parse(masterData.social_media_links)
          : {};
      } catch (error) {
        console.error("Failed to parse social_media_links:", error);
      }

      setValue("facebook", socialLinks.facebook || "");
      setValue("instagram", socialLinks.instagram || "");
      setValue("twitter", socialLinks.twitter || "");
      setValue("linkedin", socialLinks.linkedin || "");
    }
  }, [masterData, setValue]);

  const masterDataId = masterData?.id;

  const { mutate: editMasterData, isPending: isEditPendingMasterData } =
    useEditeAgencyMasterData(id, masterDataId);

  const onSubmit = (data) => {
    const socialLinks = {
      facebook: data.facebook || "",
      instagram: data.instagram || "",
      twitter: data.twitter || "",
      linkedin: data.linkedin || "",
    };

    const payload = {
      ...data,
      social_media_links: JSON.stringify(socialLinks),
    };

    delete payload.facebook;
    delete payload.instagram;
    delete payload.twitter;
    delete payload.linkedin;

    console.log("Payload to send:", payload);

    editMasterData(
      { data: payload },
      {
        onSuccess: () => {
          navigate(`/agencies/${id}`);
        },
        onError: (error) => {
          console.log("API Failed Edite Master Data ❌", error);
        },
      }
    );
  };

  if (isPending) return <LoadingFormSkeleton />;

  return (
    <div className="w-full p-6 space-y-6">
      <CustomHeader title={t("Edite_Legal")} />

      <div className="bg-white dark:bg-gray-900 p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Row 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("User Name")}</Label>
              <Input placeholder={t("User Name")} {...register("user_name")} />
              {errors.user_name && (
                <p className="text-sm text-red-500">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("Brand Name")}</Label>
              <Input
                placeholder={t("Brand Name")}
                {...register("brand_name")}
              />
              {errors.brand_name && (
                <p className="text-sm text-red-500">
                  {errors.brand_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("Email")}</Label>
              <Input placeholder={t("Email")} {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("Phone")}</Label>
                <Input placeholder={t("Phone")} {...register("phone_number")} />
                {errors.phone_number && (
                  <p className="text-sm text-red-500">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("Phone Number 2")}</Label>
                <Input
                  placeholder={t("Phone Number 2")}
                  {...register("mobile_number")}
                />
                {errors.mobile_number && (
                  <p className="text-sm text-red-500">
                    {errors.mobile_number.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>{t("URL")}</Label>
              <Input placeholder={t("URL")} {...register("url")} />
              {errors.phone_number && (
                <p className="text-sm text-red-500">{errors.url.message}</p>
              )}
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="space-y-2">
                <Label>{t("Facebook")}</Label>
                <Input placeholder={t("Facebook")} {...register("facebook")} />
              </div>

              <div className="space-y-2">
                <Label>{t("Facebook")}</Label>
                <Input placeholder={t("Facebook")} {...register("facebook")} />
              </div>

              <div className="space-y-2">
                <Label>{t("Twitter")}</Label>
                <Input placeholder={t("Twitter")} {...register("twitter")} />
              </div>

              <div className="space-y-2">
                <Label>{t("LinkedIn")}</Label>
                <Input
                  placeholder={t("LinkedIn")}
                  {...register("linkedin")}
                />{" "}
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="submit"
              disabled={isEditPendingMasterData}
              className="min-w-[120px] flex items-center justify-center"
            >
              {isEditPendingMasterData ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                t("Save Changes")
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              {t("Cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMasterData;
