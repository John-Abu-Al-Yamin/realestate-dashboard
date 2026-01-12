import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "next-i18next";
import { Upload, X } from "lucide-react";

const Step2OverviewContent = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const { t } = useTranslation();

  const ImageUploadBox = ({
    id,
    label,
    value,
    onChange,
    onClear,
    initialImage,
  }) => {
    const { t } = useTranslation();
    const [preview, setPreview] = useState(initialImage || null);

    useEffect(() => {
      if (initialImage) {
        setPreview(initialImage);
      }
    }, [initialImage]);

    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          onChange(file);
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
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="overview">{t("Overview")}</Label>
        <Textarea
          id="overview"
          {...register("overview")}
          placeholder={t("Overview")}
        />
        {errors.overview && (
          <p className="text-red-500 text-sm">{t(errors.overview.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="vision">{t("Vision")}</Label>
        <Textarea
          id="vision"
          {...register("vision")}
          placeholder={t("Vision")}
        />
        {errors.vision && (
          <p className="text-red-500 text-sm">{t(errors.vision.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("Message")}</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={t("Message")}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{t(errors.message.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">{t("Features")}</Label>
        <Textarea
          id="features"
          {...register("features")}
          placeholder={t("Features")}
          autoComplete="on" 
        />
        {errors.features && (
          <p className="text-red-500 text-sm">{t(errors.features.message)}</p>
        )}
      </div>
      <div className="space-y-2">
        <Controller
          control={control}
          name="attachment"
          render={({ field }) => (
            <ImageUploadBox
              label="Attachment"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.attachment && (
          <p className="text-red-500 text-sm">{t(errors.attachment.message)}</p>
        )}
      </div>
    </div>
  );
};

export default Step2OverviewContent;
