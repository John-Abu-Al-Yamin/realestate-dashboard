import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import {
  useEditeAgencyVerificationIdentity,
  useGetAgencyVisualIdentityDetails,
} from "@/hooks/Actions/agencies/useCurdsAgencies";
import LoadingSkeleton from "@/customs/LoadingSkeleton";
import CustomHeader from "@/customs/CustomHeader";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EditVisualIdentity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Image preview states
  const [logoPreview, setLogoPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [watermarkPreview, setWatermarkPreview] = useState(null);

  const schema = z.object({
    logo: z.any().optional(),
    icon: z.any().optional(),
    watermark: z.any().optional(),
    primary_color: z.string().optional(),
    secondary_color: z.string().optional(),
    font: z.string().optional(),
    theme: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      primary_color: "#000000",
      secondary_color: "#ffffff",
      font: "",
      theme: "",
    },
  });

  const { data: visualDetails, isPending } =
    useGetAgencyVisualIdentityDetails(id);
  const visualData = visualDetails?.data?.data;

  useEffect(() => {
    if (visualData) {
      setValue("primary_color", visualData.primary_color || "#000000");
      setValue("secondary_color", visualData.secondary_color || "#ffffff");
      setValue("font", visualData.font || "");
      setValue("theme", visualData.theme || "");

      // Set image previews from API data
      if (visualData.logo) {
        setLogoPreview(visualData.logo);
      }
      if (visualData.icon) {
        setIconPreview(visualData.icon);
      }
      if (visualData.watermark) {
        setWatermarkPreview(visualData.watermark);
      }
    }
  }, [visualData, setValue]);

  const { mutate: mutateEditeVisualIdentity, isPending: isPendingEdite } =
    useEditeAgencyVerificationIdentity(id, visualData?.id);

  // File change handlers
  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearLogoFile = () => {
    setLogoPreview(null);
    setValue("logo", null);
  };

  const handleIconFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearIconFile = () => {
    setIconPreview(null);
    setValue("icon", null);
  };

  const handleWatermarkFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setWatermarkPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearWatermarkFile = () => {
    setWatermarkPreview(null);
    setValue("watermark", null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    if (data.logo?.[0]) {
      formData.append("logo", data.logo[0]);
    }
    if (data.icon?.[0]) {
      formData.append("icon", data.icon[0]);
    }
    if (data.watermark?.[0]) {
      formData.append("watermark", data.watermark[0]);
    }

    formData.append("primary_color", data.primary_color || "");
    formData.append("secondary_color", data.secondary_color || "");
    formData.append("font", data.font || "");
    formData.append("theme", data.theme || "");
    formData.append("_method", "put");

    mutateEditeVisualIdentity(
      { data: formData },
      {
        onSuccess: () => {
          navigate(`/agencies/${id}`);
        },
        onError: (error) => {
          console.log("API Failed Edit Visual Identity ❌", error);
        },
      }
    );
  };

  if (isPending) return <LoadingSkeleton />;

  return (
    <div className="w-full p-6 space-y-6">
      <CustomHeader title={t("Edit Visual Identity")} />

      <div className="bg-white dark:bg-gray-900 p-6">
        {!visualData ? (
          <p className="text-sm text-gray-600">
            {isRTL
              ? "لم يتم إعداد الهوية البصرية"
              : "Visual identity has not been set up yet."}
          </p>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

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
                  <p className="text-sm text-red-500">
                    {errors.primary_color.message}
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
                  <p className="text-sm text-red-500">
                    {errors.secondary_color.message}
                  </p>
                )}
              </div>
            </div>

            {/* Font and Theme Selects - Regular HTML Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="font">{t("Font")}</Label>
                <select
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  {...register("font")}
                >
                  <option value="">{t("Select Font")}</option>
                  <option value="cairo" >Twentieth Century</option>
                  <option value="IBM">IBM</option>
                  <option value="open_sans">Open Sans</option>
                  <option value="tajawal">Tajawal</option>
                </select>
                {errors.font && (
                  <p className="text-sm text-red-500">{errors.font.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">{t("Theme")}</Label>
                <select
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  {...register("theme")}
                >
                  <option value="">{t("Select Theme")}</option>
                  <option value="light">{t("Light")}</option>
                  <option value="dark">{t("Dark")}</option>
                  {/* <option value="system">{t("System")}</option> */}
                </select>
                {errors.theme && (
                  <p className="text-sm text-red-500">{errors.theme.message}</p>
                )}
              </div>
            </div>

            {/* Image Upload Section - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Logo */}
              <div className="space-y-2">
                <Label>{t("Logo")}</Label>
                <div className="relative">
                  {logoPreview ? (
                    <div className="relative border-2 border-dashed border-green-500 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="w-full h-32 object-contain rounded"
                      />
                      <button
                        type="button"
                        onClick={clearLogoFile}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="logo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {t("Click to upload")}
                        </p>
                      </div>
                      <input
                        id="logo"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("logo", {
                          onChange: handleLogoFileChange,
                        })}
                      />
                    </label>
                  )}
                </div>
                {errors.logo && (
                  <p className="text-sm text-red-500">{errors.logo.message}</p>
                )}
              </div>

              {/* Icon */}
              <div className="space-y-2">
                <Label>{t("Icon")}</Label>
                <div className="relative">
                  {iconPreview ? (
                    <div className="relative border-2 border-dashed border-green-500 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                      <img
                        src={iconPreview}
                        alt="Icon"
                        className="w-full h-32 object-contain rounded"
                      />
                      <button
                        type="button"
                        onClick={clearIconFile}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="icon"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {t("Click to upload")}
                        </p>
                      </div>
                      <input
                        id="icon"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("icon", {
                          onChange: handleIconFileChange,
                        })}
                      />
                    </label>
                  )}
                </div>
                {errors.icon && (
                  <p className="text-sm text-red-500">{errors.icon.message}</p>
                )}
              </div>

              {/* Watermark */}
              <div className="space-y-2">
                <Label>{t("Watermark")}</Label>
                <div className="relative">
                  {watermarkPreview ? (
                    <div className="relative border-2 border-dashed border-green-500 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors">
                      <img
                        src={watermarkPreview}
                        alt="Watermark"
                        className="w-full h-32 object-contain rounded"
                      />
                      <button
                        type="button"
                        onClick={clearWatermarkFile}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="watermark"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {t("Click to upload")}
                        </p>
                      </div>
                      <input
                        id="watermark"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("watermark", {
                          onChange: handleWatermarkFileChange,
                        })}
                      />
                    </label>
                  )}
                </div>
                {errors.watermark && (
                  <p className="text-sm text-red-500">
                    {errors.watermark.message}
                  </p>
                )}
              </div>
            </div>


            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="submit"
                disabled={isPendingEdite}
                className="min-w-[120px] flex items-center justify-center"
              >
                {isPendingEdite ? (
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
        )}
      </div>
    </div>
  );
};

export default EditVisualIdentity;
