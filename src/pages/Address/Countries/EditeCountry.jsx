import CustomHeader from "@/customs/CustomHeader";
import {
  useEditCountry,
  useGetCountryId,
} from "@/hooks/Actions/Country/useCurdsCountry";
import { useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingFormSkeleton from "@/customs/LoadingFormSkeleton";

import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const EditeCountry = () => {
  const { id } = useParams();
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
    defaultValues: {
      name: "",
      code: "",
    },
  });

  const { data, isPending } = useGetCountryId(id);
  const countryId = data?.data?.data;

  useEffect(() => {
    if (data) {
      setValue("name", countryId?.name);
      setValue("code", countryId?.code);
    }
  }, [data, setValue]);

  const { mutate: editCountry, isPending: isPendingEditCountry } =
    useEditCountry(id);

  const onSubmit = (data) => {
    console.log(data);
    editCountry(
      { data: data },
      {
        onSuccess: () => {
          navgatie("/address/countries");
        },
        onError: (error) => {
          console.log("API Failed to Edit Country ❌", error);
        },
      },
    );
  };

  return (
    <div className="w-full p-6 space-y-6" dir={dir}>
      <CustomHeader title={t("Edite Country")} />
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
              disabled={isPendingEditCountry}
              className="min-w-[120px] flex items-center justify-center"
            >
              {isPendingEditCountry ? (
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

export default EditeCountry;
