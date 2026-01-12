import CustomHeader from "@/customs/CustomHeader";
import { useTranslation } from "next-i18next";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditManager,
  useGetManagerId,
} from "@/hooks/Actions/mangers/useCurdsMangers";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, X, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingFormSkeleton from "@/customs/LoadingFormSkeleton";

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

const ManagersEdite = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const schema = z.object({
    first_name: z.string().min(1, t("validation.firstNameRequired")),
    second_name: z.string(),
    last_name: z.string().min(1, t("validation.lastNameRequired")),
    identity: z
      .union([z.string(), z.number()])
      .refine((val) => val.toString().length > 0, {
        message: t("validation.identityRequired"),
      }),
    phone_number: z.string().min(1, t("validation.phoneRequired")),
    email: z.string().email(t("validation.invalidEmail")),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: t("validation.passwordMinLength"),
      }),
    status: z.enum(["active", "inactive"]),
    image: z.any().nullable(),
  });

  const [image, setimage] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: response, isPending: isPendingManagerEdite } =
    useGetManagerId(id);

  const { mutate: editManager, isPending: isPendingManager } =
    useEditManager(id);

  useEffect(() => {
    if (response?.data) {
      const managerData = response?.data?.data;

      // Set form values
      setValue("first_name", managerData.first_name);
      setValue("second_name", managerData.second_name || "");
      setValue("last_name", managerData.last_name);
      setValue("identity", managerData.identity);
      setValue("phone_number", managerData.phone_number);
      setValue("email", managerData.email);
      // setValue("password", managerData.password);
      setValue("status", managerData.status);

      // Set image preview if exists
      if (managerData.image) {
        setInitialImage(managerData.image);
        setValue("image", managerData.image);
      }
    }
  }, [response, setValue]);

  // update form value whenever image changes
  const handleImageChange = (file) => {
    setimage(file);
    setValue("image", file);
  };

  const handleImageClear = () => {
    setimage(null);
    setInitialImage(null);
    setValue("image", null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("second_name", data.second_name);
    formData.append("last_name", data.last_name);
    formData.append("identity", data.identity);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    if (data.password) {
      formData.append("password", data.password);
    }
    formData.append("status", data.status);
    formData.append("_method", "put");
    if (data.image) {
      formData.append("image", data.image);
    }

    console.log("Form data to submit:", data);
    editManager(
      { data: formData },
      {
        onSuccess: () => {
          navigate("/managers");
        },
        onError: (error) => {
          console.log("API Failed Edite Manager ❌", error);
        },
      }
    );
  };

  if (isPendingManagerEdite) {
    return <LoadingFormSkeleton />;
  }

  return (
    <div className="w-full p-6 space-y-6" dir={dir}>
      <CustomHeader title={t("Edite Manager")} />

      <div className="bg-white dark:bg-gray-900 p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t("First Name")}</Label>
              <Input
                placeholder={t("First Name")}
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("Second Name")}</Label>
              <Input
                placeholder={t("Second Name")}
                {...register("second_name")}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("Last Name")}</Label>
              <Input placeholder={t("Last Name")} {...register("last_name")} />
              {errors.last_name && (
                <p className="text-sm text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Identity & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("Identity")}</Label>
              <Input placeholder={t("Identity")} {...register("identity")} />
              {errors.identity && (
                <p className="text-sm text-red-500">
                  {errors.identity.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("Phone Number")}</Label>
              <Input
                dir="ltr"
                placeholder={t("Phone Number")}
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <p className="text-sm text-red-500">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("Email")}</Label>
              <Input
                type="email"
                placeholder={t("Email")}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>{t("Password")}</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password")}
                  className="pl-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2 max-w-full">
            <Label>{t("Status")}</Label>
            <Select
              defaultValue={response?.data?.data?.status || "active"}
              onValueChange={(value) => setValue("status", value)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t("active")}</SelectItem>
                <SelectItem value="inactive">{t("inactive")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Image */}
          <ImageUploadBox
            id="image"
            label="Profile Image"
            value={image}
            onChange={handleImageChange}
            onClear={handleImageClear}
            initialImage={initialImage}
          />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="submit"
              disabled={isPendingManager}
              className="min-w-[120px] flex items-center justify-center"
            >
              {isPendingManager ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                t("Save Changes")
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/managers")}
            >
              {t("Cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagersEdite;
