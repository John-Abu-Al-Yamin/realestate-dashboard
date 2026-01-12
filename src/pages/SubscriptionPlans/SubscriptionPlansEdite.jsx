import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "next-i18next";
import {
  useEditSubscriptionPlan,
  useGetSubscriptionPlanId,
} from "@/hooks/Actions/subscription-plans/useCardSubscriptionPlans";
import CustomHeader from "@/customs/CustomHeader";
import LoadingFormSkeleton from "@/customs/LoadingFormSkeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SubscriptionPlansEdite = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  const { id } = useParams();
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    price: z.union([
      z.string().min(1, t("validation.priceRequired")),
      z.number().min(0, t("validation.priceMin")),
    ]),
    active: z.union([z.string(), z.number(), z.boolean()]),
    max_storage: z.union([
      z.string().min(1, t("validation.maxStorageRequired")),
      z.number().min(0, t("validation.maxStorageMin")),
    ]),
    max_properties: z.union([
      z.string().min(1, t("validation.maxPropertiesRequired")),
      z.number().min(0, t("validation.maxPropertiesMin")),
    ]),
    max_stuff: z.union([
      z.string().min(1, t("validation.maxStaffRequired")),
      z.number().min(0, t("validation.maxStaffMin")),
    ]),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: response, isPending } = useGetSubscriptionPlanId(id);

  const activeValue = watch("active");

  useEffect(() => {
    if (response?.data) {
      const subscriptionData = response.data.data;

      setValue("name", subscriptionData.name);
      setValue("price", subscriptionData.price);
      setValue("active", subscriptionData.active === 1 ? true : false);
      setValue("max_storage", subscriptionData.max_storage);
      setValue("max_properties", subscriptionData.max_properties);
      setValue("max_stuff", subscriptionData.max_staff);
    }
  }, [response, setValue]);

  const { mutate: editSubscriptionPlan, isPending: isEditPending } =
    useEditSubscriptionPlan(id);

  const onSubmit = (data) => {
    // Prepare data for API
    const formData = {
      name: data.name,
      price: parseFloat(data.price),
      active: data.active ? 1 : 0,
      max_storage: parseInt(data.max_storage),
      max_properties: parseInt(data.max_properties),
      max_stuff: parseInt(data.max_stuff),
      _method: "put",
    };

    console.log("Form submitted:", formData);

    // Call the mutation
    editSubscriptionPlan(
      { data: formData },
      {
        onSuccess: () => {
          // Navigate back to subscription plans list
          navigate("/subscription-plans");
        },
        onError: (error) => {
          console.error("API Failed to Edit Subscription Plan ❌", error);
        },
      }
    );
  };

  if (isPending) {
    return <LoadingFormSkeleton />;
  }

  return (
    <div className="w-full mx-auto p-6 md:p-10" dir={dir}>
      <CustomHeader title={t("Edit_subscription_plan")} />

      {/* Wrapper */}
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 space-y-6 rounded-lg ">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("Plan Name")}</Label>
              <Input
                id="name"
                placeholder={t("Enter plan name")}
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">{t("Price")}</Label>
              <div className="relative">
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={t("0.00")}
                  {...register("price")}
                  className={`pl-7 ${errors.price ? "border-red-500" : ""}`}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
              </div>
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Max Storage */}
            <div className="space-y-2">
              <Label htmlFor="max_storage">{t("Max Storage (GB)")}</Label>
              <Input
                id="max_storage"
                type="number"
                min="0"
                placeholder={t("Enter max storage")}
                {...register("max_storage")}
                className={errors.max_storage ? "border-red-500" : ""}
              />
              {errors.max_storage && (
                <p className="text-sm text-red-500">
                  {errors.max_storage.message}
                </p>
              )}
            </div>

            {/* Max Properties */}
            <div className="space-y-2">
              <Label htmlFor="max_properties">{t("Max Properties")}</Label>
              <Input
                id="max_properties"
                type="number"
                min="0"
                placeholder={t("Enter max properties")}
                {...register("max_properties")}
                className={errors.max_properties ? "border-red-500" : ""}
              />
              {errors.max_properties && (
                <p className="text-sm text-red-500">
                  {errors.max_properties.message}
                </p>
              )}
            </div>

            {/* Max Staff */}
            <div className="space-y-2">
              <Label htmlFor="max_stuff">{t("Max Staff")}</Label>
              <Input
                id="max_stuff"
                type="number"
                min="0"
                placeholder={t("Enter max staff")}
                {...register("max_stuff")}
                className={errors.max_stuff ? "border-red-500" : ""}
              />
              {errors.max_stuff && (
                <p className="text-sm text-red-500">
                  {errors.max_stuff.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-x-3 pt-6">
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <>
                    <Label htmlFor="active">
                      {field.value
                        ? isRTL
                          ? "مفعل"
                          : "Active Plan"
                        : isRTL
                        ? "غير مفعل"
                        : "Inactive Plan"}
                    </Label>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="active"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="sr-only peer"
                      />

                      {/* Track */}
                      <div className="w-18 h-7 bg-gray-300 rounded-full peer peer-checked:bg-black transition" />

                      {/* Thumb */}
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-10" />
                    </label>
                  </>
                )}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 ">
            <Button
              type="submit"
              disabled={isEditPending}
              className="min-w-[120px] flex items-center justify-center"
            >
              {isEditPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("Saving")}
                </>
              ) : (
                t("Save Changes")
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/subscription-plans")}
            >
              {t("Cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPlansEdite;
