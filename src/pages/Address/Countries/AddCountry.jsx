import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import CustomHeader from "@/customs/CustomHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAddCountry } from "@/hooks/Actions/Country/useCurdsCountry";
import { useTranslation } from "next-i18next";
import { Loader2 } from "lucide-react";

const AddCountry = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const navgatie = useNavigate();

  const schema = z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    code: z.string().min(1, t("validation.Country Code")),
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

  const { mutate: addCountry, isPending: isPendingAddCountry } =
    useAddCountry();

  const onSubmit = (data) => {
    console.log(data);
    addCountry({ data: data }, {
      onSuccess: () => {
        navgatie("/address/countries");
      },
      onError: (error) => {
        console.log("API Failed to Add Country ❌", error);
      },
    });
  };

  return (
    <div className="w-full p-6" dir={dir}>
      <CustomHeader title={t("Add Country")} />
      <div className="bg-white dark:bg-gray-900 p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("Country Name")}</Label>
              <Input placeholder={t("Country Name")} {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>{t("Country Code")}</Label>
              <Input placeholder={t("Country Code")} {...register("code")} />
              {errors.code && (
                <p className="text-red-500 text-sm">{errors.code.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="submit"
              disabled={isPendingAddCountry}
              className="min-w-[120px] flex items-center justify-center"
            >
              {isPendingAddCountry ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                t("Save Changes")
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navgatie("/managers")}
            >
              {t("Cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
