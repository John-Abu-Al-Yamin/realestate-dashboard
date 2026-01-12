import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import {
  useEditeAgencyVerification,
  useGetAgencyVerificationDetails,
} from "@/hooks/Actions/agencies/useCurdsAgencies";
import LoadingSkeleton from "@/customs/LoadingSkeleton";
import CustomHeader from "@/customs/CustomHeader";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, X } from "lucide-react";
import { useGetRegions } from "@/hooks/Actions/region/useCardRegion";

const EditVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const { data: regions, isPending: regionsPending } = useGetRegions();
  const regionsData = regions?.data?.data || [];

  // Image preview states
  const [commercialPreview, setCommercialPreview] = useState(null);
  const [taxPreview, setTaxPreview] = useState(null);
  const [falPreview, setFalPreview] = useState(null);
  const [addressPreview, setAddressPreview] = useState(null);

  const schema = z.object({
    commercial_license: z
      .string()
      .min(1, t("validation.commercialLicenseRequired"))
      .optional(),
    commercial_license_attachment: z.any().optional(),
    tax_license: z
      .string()
      .min(1, t("validation.taxLicenseRequired"))
      .optional(),
    tax_license_attachment: z.any().optional(),
    fal_license: z
      .string()
      .min(1, t("validation.falLicenseRequired"))
      .optional(),
    fal_license_attachment: z.any().optional(),
    address: z.string().min(1, t("Address is required")).optional(),
    address_attachment: z.any().optional(),
    region_id: z.string().optional(),
    verification_expiry: z.string().optional(),
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

  const { data: verificationDetails, isPending } =
    useGetAgencyVerificationDetails(id);
  const verificationData = verificationDetails?.data?.data;

  useEffect(() => {
    if (verificationData) {
      setValue("commercial_license", verificationData.commercial_license || "");
      setValue("tax_license", verificationData.tax_license || "");
      setValue("fal_license", verificationData.fal_license || "");
      setValue("address", verificationData.address || "");
      setValue(
        "verification_expiry",
        verificationData.verification_expiry || ""
      );
      if (verificationData && regionsData.length > 0) {
        setValue("region_id", verificationData.region_id?.id?.toString() || "");
      }
      // Set image previews from API data
      if (verificationData.commercial_license_attachment) {
        setCommercialPreview(verificationData.commercial_license_attachment);
      }
      if (verificationData.tax_license_attachment) {
        setTaxPreview(verificationData.tax_license_attachment);
      }
      if (verificationData.fal_license_attachment) {
        setFalPreview(verificationData.fal_license_attachment);
      }
      if (verificationData.address_attachment) {
        setAddressPreview(verificationData.address_attachment);
      }
    }
  }, [verificationData, setValue, regionsData]);

  const {
    mutate: mutateEditeVerification,
    isPending: isPendingEditeVerification,
  } = useEditeAgencyVerification(id, verificationData?.id);

  // File change handlers
  const handleCommercialFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCommercialPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearCommercialFile = () => {
    setCommercialPreview(null);
    setValue("commercial_license_attachment", null);
  };

  const handleTaxFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTaxPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearTaxFile = () => {
    setTaxPreview(null);
    setValue("tax_license_attachment", null);
  };

  const handleFalFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFalPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearFalFile = () => {
    setFalPreview(null);
    setValue("fal_license_attachment", null);
  };

  const handleAddressFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAddressPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearAddressFile = () => {
    setAddressPreview(null);
    setValue("address_attachment", null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    console.log(data);

    formData.append("commercial_license", data.commercial_license || "");
    if (data.commercial_license_attachment?.[0]) {
      formData.append(
        "commercial_license_attachment",
        data.commercial_license_attachment[0]
      );
    }

    formData.append("tax_license", data.tax_license || "");
    if (data.tax_license_attachment?.[0]) {
      formData.append("tax_license_attachment", data.tax_license_attachment[0]);
    }

    formData.append("fal_license", data.fal_license || "");
    if (data.fal_license_attachment?.[0]) {
      formData.append("fal_license_attachment", data.fal_license_attachment[0]);
    }

    formData.append("address", data.address || "");
    if (data.address_attachment?.[0]) {
      formData.append("address_attachment", data.address_attachment[0]);
    }

    formData.append("verification_expiry", data.verification_expiry || "");
    formData.append("region_id", data.region_id || "");
    formData.append("_method", "put");

    mutateEditeVerification(
      { data: formData },
      {
        onSuccess: () => {
          navigate(`/agencies/${id}`);
        },
        onError: (error) => {
          console.log("API Failed Edite Verification ❌", error);
        },
      }
    );
  };

  if (isPending) return <LoadingSkeleton />;

  return (
    <div className="w-full p-6 space-y-6">
      <CustomHeader title={t("Edite_Verification")} />

      <div className="bg-white dark:bg-gray-900 p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Text Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("Commercial License")}</Label>
              <Input
                placeholder={t("Commercial License")}
                {...register("commercial_license")}
              />
              {errors.commercial_license && (
                <p className="text-sm text-red-500">
                  {errors.commercial_license.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("Tax License")}</Label>
              <Input
                placeholder={t("Tax License")}
                {...register("tax_license")}
              />
              {errors.tax_license && (
                <p className="text-sm text-red-500">
                  {errors.tax_license.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("FAL License")}</Label>
              <Input
                placeholder={t("FAL License")}
                {...register("fal_license")}
              />
              {errors.fal_license && (
                <p className="text-sm text-red-500">
                  {errors.fal_license.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("Verification Expiry")}</Label>
              <Input type="date" {...register("verification_expiry")} />
              {errors.verification_expiry && (
                <p className="text-sm text-red-500">
                  {errors.verification_expiry.message}
                </p>
              )}
            </div>

            {/* Region Select - Regular HTML Select */}
            <div className="space-y-2">
              <Label>{t("city")}</Label>
              <select
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                {...register("region_id")}
              >
                <option value="">{t("all_cases")}</option>
                {regionsData?.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.region_id && (
                <p className="text-sm text-red-500">
                  {errors.region_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("Address")}</Label>
              <Input placeholder={t("Address")} {...register("address")} />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
          </div>

          {/* Image Upload Section - 2 per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* Commercial License Attachment */}
            <div className="space-y-2">
              <Label>{t("Commercial License Attachment")}</Label>
              <div className="relative">
                {commercialPreview ? (
                  <div className="relative border-2 border-dashed border-green-500 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                    <img
                      src={commercialPreview}
                      alt="Commercial License"
                      className="w-full h-32 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={clearCommercialFile}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="commercial_license_attachment"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {t("Click to upload")}
                      </p>
                    </div>
                    <input
                      id="commercial_license_attachment"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("commercial_license_attachment", {
                        onChange: handleCommercialFileChange,
                      })}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Tax License Attachment */}
            <div className="space-y-2">
              <Label>{t("Tax License Attachment")}</Label>
              <div className="relative">
                {taxPreview ? (
                  <div className="relative border-2 border-dashed border-green-500 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                    <img
                      src={taxPreview}
                      alt="Tax License"
                      className="w-full h-32 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={clearTaxFile}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="tax_license_attachment"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {t("Click to upload")}
                      </p>
                    </div>
                    <input
                      id="tax_license_attachment"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("tax_license_attachment", {
                        onChange: handleTaxFileChange,
                      })}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* FAL License Attachment */}
            <div className="space-y-2">
              <Label>{t("FAL License Attachment")}</Label>
              <div className="relative">
                {falPreview ? (
                  <div className="relative border-2 border-dashed border-green-500 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                    <img
                      src={falPreview}
                      alt="FAL License"
                      className="w-full h-32 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={clearFalFile}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="fal_license_attachment"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {t("Click to upload")}
                      </p>
                    </div>
                    <input
                      id="fal_license_attachment"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("fal_license_attachment", {
                        onChange: handleFalFileChange,
                      })}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Address Attachment */}
            <div className="space-y-2">
              <Label>{t("Address Attachment")}</Label>
              <div className="relative">
                {addressPreview ? (
                  <div className="relative border-2 border-dashed border-green-500 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                    <img
                      src={addressPreview}
                      alt="Address"
                      className="w-full h-32 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={clearAddressFile}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="address_attachment"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {t("Click to upload")}
                      </p>
                    </div>
                    <input
                      id="address_attachment"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      {...register("address_attachment", {
                        onChange: handleAddressFileChange,
                      })}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="submit"
              disabled={isPendingEditeVerification}
              className="min-w-[120px] flex items-center justify-center"
            >
              {isPendingEditeVerification ? (
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

export default EditVerification;
