import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "next-i18next";
import { useGetRegions } from "@/hooks/Actions/region/useCardRegion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload, X } from "lucide-react";

const Step3LegalVerification = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const { t } = useTranslation();

  const { data: regions, isPending: regionsPending } = useGetRegions();
  const regionsData = regions?.data?.data || [];

  // Separate preview states for each image
  const [commercialPreview, setCommercialPreview] = useState(null);
  const [taxPreview, setTaxPreview] = useState(null);
  const [falPreview, setFalPreview] = useState(null);
  const [addressPreview, setAddressPreview] = useState(null);

  // Handler for Commercial License Attachment
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

  // Handler for Tax License Attachment
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

  // Handler for FAL License Attachment
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

  // Handler for Address Attachment
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

  return (
    <div className="space-y-6">
      {/* Text Input Fields Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Commercial License */}
        <div className="space-y-2">
          <Label htmlFor="commercial_license">{t("Commercial License")}</Label>
          <Input
            id="commercial_license"
            type="text"
            {...register("commercial_license")}
          />
          {errors.commercial_license && (
            <p className="text-red-500 text-sm">
              {t(errors.commercial_license.message)}
            </p>
          )}
        </div>

        {/* Tax License */}
        <div className="space-y-2">
          <Label htmlFor="tax_license">{t("Tax License")}</Label>
          <Input id="tax_license" type="text" {...register("tax_license")} />
          {errors.tax_license && (
            <p className="text-red-500 text-sm">
              {t(errors.tax_license.message)}
            </p>
          )}
        </div>

        {/* FAL License */}
        <div className="space-y-2">
          <Label htmlFor="fal_license">{t("FAL License")}</Label>
          <Input id="fal_license" type="text" {...register("fal_license")} />
          {errors.fal_license && (
            <p className="text-red-500 text-sm">
              {t(errors.fal_license.message)}
            </p>
          )}
        </div>

        {/* Verification Expiry */}
        <div className="space-y-2">
          <Label htmlFor="verification_expiry">
            {t("Verification Expiry")}
          </Label>
          <Input
            id="verification_expiry"
            type="date"
            {...register("verification_expiry")}
          />
          {errors.verification_expiry && (
            <p className="text-red-500 text-sm">
              {t(errors.verification_expiry.message)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Region */}
        <div className="space-y-2 w-full">
          <Label htmlFor="region_id">{t("city")}</Label>
          <Controller
            name="region_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("all_cases")} />
                </SelectTrigger>
                <SelectContent>
                  {regionsData?.map((regioncity) => (
                    <SelectItem
                      key={regioncity.id}
                      value={String(regioncity.id)}
                    >
                      {regioncity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.region_id && (
            <p className="text-red-500 text-sm">
              {t(errors.region_id.message)}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2 w-full">
          <Label htmlFor="address">{t("Address")}</Label>
          <Input
            id="address"
            {...register("address")}
            placeholder={t("Address")}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">
              {t(errors.address.message)}
            </p>
          )}
        </div>
      </div>

      {/* Image Upload Section - 2 per row at the bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Commercial License Attachment */}
        <div className="space-y-2">
          <Label htmlFor="commercial_license_attachment">
            {t("Commercial License Attachment")}
          </Label>
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
                <Input
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
          {errors.commercial_license_attachment && (
            <p className="text-red-500 text-sm">
              {t(errors.commercial_license_attachment.message)}
            </p>
          )}
        </div>

        {/* Tax License Attachment */}
        <div className="space-y-2">
          <Label htmlFor="tax_license_attachment">
            {t("Tax License Attachment")}
          </Label>
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
                <Input
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
          {errors.tax_license_attachment && (
            <p className="text-red-500 text-sm">
              {t(errors.tax_license_attachment.message)}
            </p>
          )}
        </div>

        {/* FAL License Attachment */}
        <div className="space-y-2">
          <Label htmlFor="fal_license_attachment">
            {t("FAL License Attachment")}
          </Label>
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
                <Input
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
          {errors.fal_license_attachment && (
            <p className="text-red-500 text-sm">
              {t(errors.fal_license_attachment.message)}
            </p>
          )}
        </div>

        {/* Address Attachment */}
        <div className="space-y-2">
          <Label htmlFor="address_attachment">
            {t("Address Attachment")}
          </Label>
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
                <Input
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
          {errors.address_attachment && (
            <p className="text-red-500 text-sm">
              {t(errors.address_attachment.message)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3LegalVerification;
