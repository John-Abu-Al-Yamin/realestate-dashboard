import CustomHeader from "@/customs/CustomHeader";
import { useTranslation } from "next-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingFormSkeleton from "@/customs/LoadingFormSkeleton";
import {
  useEditeAgencyProfile,
  useGetAgencyProfileDetails,
} from "@/hooks/Actions/agencies/useCurdsAgencies";

const ImageUploadBox = ({ id, label, register, error, value, onClear, watch, setValue }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);
  const fileValue = watch ? watch(id) : value;

  useEffect(() => {
    if (fileValue) {
      // إذا كانت قيمة attachment رابط (من قاعدة البيانات)
      if (typeof fileValue === 'string') {
        setPreview(fileValue);
      }
      // إذا كانت قيمة attachment File object (من اختيار المستخدم)
      else if (fileValue instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(fileValue);
      }
    }
  }, [fileValue]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(id, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setValue(id, null);
    if (onClear) onClear();
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
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

const EditProfile = () => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = z.object({
    overview: z
      .string()
      .min(1, t("validation.overviewRequired"))
      .max(500, t("validation.overviewMax")),
    vision: z
      .string()
      .min(1, t("validation.visionRequired"))
      .max(500, t("validation.visionMax")),
    message: z
      .string()
      .min(1, t("validation.messageRequired"))
      .max(500, t("validation.messageMax")),
    features: z
      .string()
      .min(1, t("validation.featuresRequired"))
      .max(500, t("validation.featuresMax")),
    attachment: z
      .any()
      .refine((file) => {
        if (!file) return true; // السماح بالفراغ
        if (typeof file === 'string') return true; // إذا كان رابط من قاعدة البيانات
        return file instanceof File;
      }, t("validation.invalidFile"))
      .nullable()
      .optional(),
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

  const { data: profileDetails, isPending: isProfilePending } =
    useGetAgencyProfileDetails(id);

  const profileDetailsData = profileDetails?.data?.data;

  useEffect(() => {
    if (profileDetailsData) {
      console.log(profileDetailsData);
      setValue("overview", profileDetailsData.overview);
      setValue("vision", profileDetailsData.vision);
      setValue("message", profileDetailsData.message);
      setValue("features", profileDetailsData.features);
      setValue("attachment", profileDetailsData.attachment);
    }
  }, [profileDetails, setValue]);

  const { mutate: mutateProfile, isPending: isProfileEditePending } =
    useEditeAgencyProfile(id, profileDetailsData?.id);

  const onSubmit = (data) => {
    console.log(data);
    
    // إنشاء FormData إذا كان هناك ملف مرفق
    const formData = new FormData();
    formData.append('overview', data.overview);
    formData.append('vision', data.vision);
    formData.append('message', data.message);
    formData.append('features', data.features);
    
    if (data.attachment && data.attachment instanceof File) {
      formData.append('attachment', data.attachment);
    }

    mutateProfile(
      { data: formData },
      {
        onSuccess: () => {
          navigate(`/agencies/${id}`);
        },
        onError: (error) => {
          console.log("API Failed Edite Profile ❌", error);
        },
      }
    );
  };

  if (isProfilePending) return <LoadingFormSkeleton />;

  return (
    <div className="w-full p-6 space-y-6">
      <CustomHeader title={t("Edite_Profile")} />

      <div className="bg-white dark:bg-gray-900 p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("overview")}</Label>
              <Textarea placeholder={t("overview")} {...register("overview")} />
              {errors.overview && (
                <p className="text-sm text-red-500">
                  {errors.overview.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("vision")}</Label>
              <Textarea placeholder={t("vision")} {...register("vision")} />
              {errors.vision && (
                <p className="text-sm text-red-500">{errors.vision.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("message")}</Label>
              <Textarea placeholder={t("message")} {...register("message")} />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("features")}</Label>
              <Textarea placeholder={t("features")} {...register("features")} />
              {errors.features && (
                <p className="text-sm text-red-500">
                  {errors.features.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <ImageUploadBox
              id="attachment"
              label="attachment"
              register={register}
              error={errors.attachment}
              watch={watch}
              setValue={setValue}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="submit"
              disabled={isProfileEditePending}
              className="min-w-[120px] flex items-center justify-center"
            >
              {isProfileEditePending ? (
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

export default EditProfile;