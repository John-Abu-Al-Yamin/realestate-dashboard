import React, { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "next-i18next";
import { ChevronDown, Check } from "lucide-react";

import CustomHeader from "@/customs/CustomHeader";
import LoadingFormSkeleton from "@/customs/LoadingFormSkeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEditeSubscription, useGetSubscriptionId } from "@/hooks/Actions/subscriptions/useCardSubscriptions";
import { useGetAllSubscriptionPlans } from "@/hooks/Actions/subscription-plans/useCardSubscriptionPlans";
import { useGetAllAgenciesForSubscription } from "@/hooks/Actions/agencies/useCurdsAgencies";

// Custom Select Component with shadcn-like styling
const CustomSelect = ({ value, onChange, options, placeholder, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={selectedOption ? "" : "text-muted-foreground"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-input bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="max-h-60 overflow-auto p-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${value === option.value ? "bg-accent text-accent-foreground" : ""
                  }`}
              >
                {value === option.value && (
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SubscriptionEdite = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  const { id } = useParams();
  const navigate = useNavigate();

  const schema = z
    .object({
      subscription_plan_id: z
        .string({ required_error: t("subscription_plan_required") })
        .min(1, { message: t("subscription_plan_required") }),
      agency_id: z
        .string({ required_error: t("agency_required") })
        .min(1, { message: t("agency_required") }),
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
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subscription_plan_id: "",
      agency_id: "",
      start_date: "",
      end_date: "",
      active: false,
    },
  });

  const { data: response, isPending } = useGetSubscriptionId(id);

  const { data: subscriptionPlans, isPending: isSubscriptionPlansPending } =
    useGetAllSubscriptionPlans(1, "", "");
  const {
    data: agenciesForSubscription,
    isPending: isAgenciesForSubscriptionPending,
  } = useGetAllAgenciesForSubscription();

  useEffect(() => {
    if (
      response?.data?.data &&
      subscriptionPlans?.data?.data?.length > 0 &&
      agenciesForSubscription?.data?.data?.length > 0
    ) {
      const subscription = response.data.data;

      setValue(
        "subscription_plan_id",
        subscription.subscription_plan?.id?.toString() || ""
      );
      setValue(
        "agency_id",
        subscription.agency?.id?.toString() || ""
      );
      setValue("start_date", subscription.start_date || "");
      setValue("end_date", subscription.end_date || "");
      setValue("active", subscription.active ? true : false);
    }
  }, [response, subscriptionPlans, agenciesForSubscription, setValue]);


  const { mutate: mutateEditeSubscription, isPending: isEditeSubscriptionPending } = useEditeSubscription(id)


  const onSubmit = (data) => {
    console.log("Form Data:", data);
    mutateEditeSubscription({ data: data },
      {
        onSuccess: () => {
          navigate("/subscriptions")
        },
        onError: (error) => {
          console.error("API Failed to Add Subscription ❌", error);
        }
      }
    )
    // هنا ممكن تبعت الداتا للـ API
  };

  if (isPending || isSubscriptionPlansPending || isAgenciesForSubscriptionPending) {
    return <LoadingFormSkeleton />;
  }

  // Prepare options for custom selects
  const subscriptionPlanOptions = subscriptionPlans?.data?.data?.map((plan) => ({
    value: plan.id.toString(),
    label: plan.name,
  })) || [];

  const agencyOptions = agenciesForSubscription?.data?.data?.map((agency) => ({
    value: agency.id.toString(),
    label: `${agency.user_name || ""} ${agency.brand_name || ""}`.trim(),
  })) || [];

  return (
    <div className="w-full mx-auto p-6 md:p-10" dir={dir}>
      <CustomHeader title={t("Edit_subscription")} />
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 space-y-6 rounded-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subscription Plan */}
            <div className="space-y-2">
              <Label htmlFor="subscription_plan_id">{t("choose_subscription_plan")}</Label>
              <Controller
                name="subscription_plan_id"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    id="subscription_plan_id"
                    value={field.value}
                    onChange={field.onChange}
                    options={subscriptionPlanOptions}
                    placeholder={t("select_subscription_plan_placeholder")}
                  />
                )}
              />
              {errors.subscription_plan_id && (
                <p className="text-red-500 text-sm">{errors.subscription_plan_id.message}</p>
              )}
            </div>

            {/* Agency */}
            <div className="space-y-2">
              <Label htmlFor="agency_id">{t("choose_agency")}</Label>
              <Controller
                name="agency_id"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    id="agency_id"
                    value={field.value}
                    onChange={field.onChange}
                    options={agencyOptions}
                    placeholder={t("select_agency_placeholder")}
                  />
                )}
              />
              {errors.agency_id && (
                <p className="text-red-500 text-sm">{errors.agency_id.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">{t("start_date")}</Label>
              <Input id="startDate" type="date" {...register("start_date")} />
              {errors.start_date && (
                <p className="text-red-500 text-sm">{errors.start_date.message}</p>
              )}
            </div>

            {/* End Date */}
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
              disabled={isEditeSubscriptionPending}
              className="w-40"
            >
              {isEditeSubscriptionPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                t("save_subscription")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionEdite;
