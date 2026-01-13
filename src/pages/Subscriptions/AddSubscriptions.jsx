import CustomHeader from "@/customs/CustomHeader";
import { useTranslation } from "next-i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGetAllSubscriptionPlans } from "@/hooks/Actions/subscription-plans/useCardSubscriptionPlans";
import { useGetAllAgenciesForSubscription } from "@/hooks/Actions/agencies/useCurdsAgencies";
import { useAddSubscription } from "@/hooks/Actions/subscriptions/useCardSubscriptions";
const AddSubscriptions = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();
  const schema = z
    .object({
      subscription_plan_id: z
        .number({ required_error: t("subscription_plan_required") })
        .refine((val) => val > 0, { message: t("subscription_plan_required") }),
      agency_id: z
        .number({ required_error: t("agency_required") })
        .refine((val) => val > 0, { message: t("agency_required") }),
      start_date: z.string({ required_error: t("start_date_required") }),
      end_date: z.string({ required_error: t("end_date_required") }),
      active: z.boolean(),
    })
    .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
      message: t("end_date_after_start_date"),
      path: ["end_date"],
    });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subscription_plan_id: 0,
      agency_id: 0,
      start_date: "",
      end_date: "",
      active: false,
    },
  });

  const { data: subscriptionPlans, isPending: isSubscriptionPlansPending } =
    useGetAllSubscriptionPlans(1, "", "");

  const {
    data: agenciesForSubscription,
    isPending: isAgenciesForSubscriptionPending,
  } = useGetAllAgenciesForSubscription();

  const { mutate: addSubscription, isPending: isAddSubscriptionPending } =
    useAddSubscription();

  const onSubmit = (data) => {
    const subscriptionData = {
      ...data,
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
    };

    addSubscription(
      { data: subscriptionData },
      {
        onSuccess: () => {
          navigate("/subscriptions");
        },
        onError: (error) => {
          console.error("API Failed to Add Subscription ❌", error);
        },
      }
    );
  };

  return (
    <div className="w-full mx-auto p-6 md:p-10">
      <CustomHeader title={t("add_subscription")} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subscription Plan */}
          <div className="w-full">
            <Label className="mb-2">{t("choose_subscription_plan")}</Label>
            <Controller
              name="subscription_plan_id"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  value={field.value ? field.value.toString() : ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={t("select_subscription_plan_placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptionPlans?.data?.data?.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id.toString()}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subscription_plan_id && (
              <p className="text-red-500 text-sm">
                {errors.subscription_plan_id.message}
              </p>
            )}
          </div>

          {/* Agency */}
          <div className="w-full">
            <Label className="mb-2">{t("choose_agency")}</Label>
            <Controller
              name="agency_id"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  value={field.value ? field.value.toString() : ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("select_agency_placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {agenciesForSubscription?.data?.data?.map((agency) => (
                      <SelectItem key={agency.id} value={agency.id.toString()}>
                        {agency.user_name || ""} {agency.brand_name || ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.agency_id && (
              <p className="text-red-500 text-sm">{errors.agency_id.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="startDate">{t("start_date")}</Label>
            <Input id="startDate" type="date" {...register("start_date")} />
            {errors.start_date && (
              <p className="text-red-500 text-sm">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">{t("end_date")}</Label>
            <Input id="endDate" type="date" {...register("end_date")} />
            {errors.end_date && (
              <p className="text-red-500 text-sm">{errors.end_date.message}</p>
            )}
          </div>
        </div>

        {/* Active */}
        <div className="flex items-center gap-x-3 pt-6">
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="active">
                  {field.value ? t("active_plan") : t("inactive_plan")}
                </Label>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="active"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-18 h-7 bg-gray-300 rounded-full peer peer-checked:bg-black transition" />
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-10" />
                </label>
              </>
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 ">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            disabled={isAddSubscriptionPending}
            className="w-40"
          >
            {isAddSubscriptionPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              t("save_subscription")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscriptions;
