import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomHeader from "@/customs/CustomHeader";
import { useTranslation } from "next-i18next";
import { useAddSubscriptionPlan } from "@/hooks/Actions/subscription-plans/useCardSubscriptionPlans";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function AddSubscriptionPlan() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().min(1, t("name_required")),
    price: z.coerce.number().gt(0, t("price_required")),
    active: z.boolean().default(true),
    max_storage: z.coerce.number().gt(0, t("max_storage_required")),
    max_properties: z.coerce.number().gt(0, t("max_properties_required")),
    max_staff: z.coerce.number().gt(0, t("max_staff_required")),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      active: true,
      price: 0,
      max_storage: 0,
      max_properties: 0,
      max_staff: 0,
    },
  });

  const {
    mutate: addSubscriptionPlan,
    data,
    isPending: isPendingAddSubscriptionPlan,
  } = useAddSubscriptionPlan();

  const onSubmit = (data) => {
    addSubscriptionPlan(
      { data: data },
      {
        onSuccess: () => {
          navigate("/subscription-plans");
        },
        onError: (error) => {
          console.log("error add subscription plan", error);
        },
      }
    );

    console.log("Form submitted:", data);
  };

  return (
    <div className="w-full mx-auto p-6 md:p-10">
      <CustomHeader title={t("add_subscription_plan")} />

      {/* Wrapper */}
      <div className=" p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{t("plan_details")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("plan_details_description")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("plan_name")}</Label>
              <Input
                id="name"
                placeholder={t("plan_name_placeholder")}
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">{t("monthly_price")}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && (
                <p className="text-xs text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Max Storage */}
            <div className="space-y-2">
              <Label htmlFor="max_storage">{t("max_storage_label")}</Label>
              <Input
                id="max_storage"
                type="number"
                {...register("max_storage")}
              />
              {errors.max_storage && (
                <p className="text-xs text-destructive">
                  {errors.max_storage.message}
                </p>
              )}
            </div>

            {/* Max Properties */}
            <div className="space-y-2">
              <Label htmlFor="max_properties">
                {t("max_properties_label")}
              </Label>
              <Input
                id="max_properties"
                type="number"
                {...register("max_properties")}
              />
              {errors.max_properties && (
                <p className="text-xs text-destructive">
                  {errors.max_properties.message}
                </p>
              )}
            </div>

            {/* Max Staff */}
            <div className="space-y-2">
              <Label htmlFor="max_staff">{t("max_staff_label")}</Label>
              <Input id="max_staff" type="number" {...register("max_staff")} />
              {errors.max_staff && (
                <p className="text-xs text-destructive">
                  {errors.max_staff.message}
                </p>
              )}
            </div>
            {/* Active */}
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

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 ">
            <Button type="button" variant="outline">
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isPendingAddSubscriptionPlan}
              className="w-40"
            >
              {isPendingAddSubscriptionPlan ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                t("save_plan")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
