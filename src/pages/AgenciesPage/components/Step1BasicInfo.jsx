import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "next-i18next";

const Step1BasicInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Name */}
        <div className="space-y-2">
          <Label htmlFor="user_name">{t("User Name")}</Label>
          <Input
            id="user_name"
            {...register("user_name")}
            placeholder={t("User Name")}
          />
          {errors.user_name && (
            <p className="text-red-500 text-sm">
              {t(errors.user_name.message)}
            </p>
          )}
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <Label htmlFor="brand_name">{t("Brand Name")}</Label>
          <Input
            id="brand_name"
            {...register("brand_name")}
            placeholder={t("Brand Name")}
          />
          {errors.brand_name && (
            <p className="text-red-500 text-sm">
              {t(errors.brand_name.message)}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone_number">{t("Phone Number")}</Label>
          <Input
            id="phone_number"
            {...register("phone_number")}
            placeholder={t("Phone Number")}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {t(errors.phone_number.message)}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobile_number">{t("Phone Number 2")}</Label>
          <Input
            id="mobile_number"
            {...register("mobile_number")}
            placeholder={t("Mobile Number")}
          />
          {errors.mobile_number && (
            <p className="text-red-500 text-sm">
              {t(errors.mobile_number.message)}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">{t("Email")}</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{t(errors.email.message)}</p>
          )}
        </div>

        {/* URL */}
        <div className="space-y-2">
          <Label htmlFor="url">{t("URL")}</Label>
          <Input
            id="url"
            {...register("url")}
            placeholder="https://example.com"
          />
          {errors.url && (
            <p className="text-red-500 text-sm">{t(errors.url.message)}</p>
          )}
        </div>

        {/* Social Media Links - FIXED 4 INPUTS */}
        <div className="space-y-4 md:col-span-2">
          <Label className="mb-6 mt-8 block">{t("Social Media Links")}</Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Facebook */}
            <div className="space-y-2">
              <Label htmlFor="facebook">{t("Facebook")}</Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/yourpage"
                {...register("social_media_links.facebook")}
              />
            </div>

            {/* Instagram */}
            <div className="space-y-2">
              <Label htmlFor="instagram">{t("Instagram")}</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/yourprofile"
                {...register("social_media_links.instagram")}
              />
            </div>

            {/* Twitter */}
            <div className="space-y-2">
              <Label htmlFor="twitter">{t("Twitter")}</Label>
              <Input
                id="twitter"
                placeholder="https://twitter.com/youraccount"
                {...register("social_media_links.twitter")}
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin">{t("LinkedIn")}</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                {...register("social_media_links.linkedin")}
              />
            </div>
          </div>

          {errors.social_media_links && (
            <p className="text-red-500 text-sm">
              {t(errors.social_media_links.message)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
