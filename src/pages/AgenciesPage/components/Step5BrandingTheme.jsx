import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "next-i18next";
import { Upload, X } from "lucide-react";

const ImageUploadBox = ({ id, label, register, error, value, onClear }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onClear();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{t(label)}</Label>
      <div className="relative">
        {preview ? (
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
            <img
              src={preview}
              alt={label}
              className="w-full h-32 object-contain rounded"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {t("Click to upload")} {t(label)}
              </p>
            </div>
            <Input
              id={id}
              type="file"
              className="hidden"
              accept="image/*"
              {...register(id, {
                onChange: handleFileChange,
              })}
            />
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{t(error.message)}</p>}
    </div>
  );
};

const Step5BrandingTheme = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* File Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ImageUploadBox
          id="logo"
          label="Logo"
          register={register}
          error={errors.logo}
          onClear={() => setValue("logo", null)}
        />

        <ImageUploadBox
          id="icon"
          label="Icon"
          register={register}
          error={errors.icon}
          onClear={() => setValue("icon", null)}
        />

        <ImageUploadBox
          id="watermark"
          label="Watermark"
          register={register}
          error={errors.watermark}
          onClear={() => setValue("watermark", null)}
        />
      </div>

      {/* Color Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primary_color">{t("Primary Color")}</Label>
          <Controller
            name="primary_color"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  {...field}
                  className="w-12 h-10 p-1 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  {...field}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            )}
          />
          {errors.primary_color && (
            <p className="text-red-500 text-sm">
              {t(errors.primary_color.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondary_color">{t("Secondary Color")}</Label>
          <Controller
            name="secondary_color"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  {...field}
                  className="w-12 h-10 p-1 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  {...field}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            )}
          />
          {errors.secondary_color && (
            <p className="text-red-500 text-sm">
              {t(errors.secondary_color.message)}
            </p>
          )}
        </div>
      </div>

      {/* Select Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="font">{t("Font")}</Label>
          <Controller
            name="font"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("Select Font")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cairo">Twentieth Century</SelectItem>
                  <SelectItem value="IBM Plex Sans Arabic">IBM Plex Sans Arabic</SelectItem>
                  <SelectItem value="open_sans">Open Sans</SelectItem>
                  <SelectItem value="tajawal">Tajawal</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.font && (
            <p className="text-red-500 text-sm">{t(errors.font.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme">{t("Theme")}</Label>
          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("Select Theme")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t("Light")}</SelectItem>
                  <SelectItem value="dark">{t("Dark")}</SelectItem>
                  {/* <SelectItem value="system">{t("System")}</SelectItem> */}
                </SelectContent>
              </Select>
            )}
          />
          {errors.theme && (
            <p className="text-red-500 text-sm">{t(errors.theme.message)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step5BrandingTheme;
