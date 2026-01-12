import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "next-i18next";
import {
  useEditeAgencyLegal,
  useGetAgencyLegalDetails,
} from "@/hooks/Actions/agencies/useCurdsAgencies";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomHeader from "@/customs/CustomHeader";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingFormSkeleton from "@/customs/LoadingFormSkeleton";
import Step4Policies from "./components/Step4Policies";

const EditLegal = () => {
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = z.object({
    cookies_policy: z.string().min(1, t("validation.cookiePolicyRequired")),
    privacy_policy: z.string().min(1, t("validation.privacyPolicyRequired")),
    terms_and_conditions: z.string().min(1, t("validation.termsRequired")),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1, t("validation.questionRequired")),
          answer: z.string().min(1, t("validation.answerRequired")),
        })
      )
      .min(1, t("validation.faqRequired")),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      faqs: [],
      cookies_policy: "",
      privacy_policy: "",
      terms_and_conditions: "",
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { data: legalDetails, isPending } = useGetAgencyLegalDetails(id);
  const legalData = legalDetails?.data?.data;

  useEffect(() => {
    if (legalData) {
      setValue("cookies_policy", legalData.cookie_policy || ""); // Map cookie to cookies
      setValue("privacy_policy", legalData.privacy_policy || "");
      setValue("terms_and_conditions", legalData.terms_and_conditions || "");

      try {
        const parsedFaqs = legalData.faqs ? JSON.parse(legalData.faqs) : [];
        if (Array.isArray(parsedFaqs)) {
          setValue("faqs", parsedFaqs);
        } else {
          setValue("faqs", []);
        }
      } catch (e) {
        console.error("Failed to parse FAQs", e);
        setValue("faqs", []);
      }
    }
  }, [legalData, setValue]);

  const legalId = legalData?.id;

  const { mutate: EditLegal, isPending: editlegalPending } = useEditeAgencyLegal(
    id,
    legalId
  );

  const onSubmit = (data) => {
    console.log("Form submitted:", data);


    const payload = {
      ...data,
      faqs: JSON.stringify(data.faqs),
      cookie_policy: data.cookies_policy
    }
    delete payload.cookies_policy;

    EditLegal(
      { data: payload },
      {
        onSuccess: () => {
          navigate(`/agencies/${id}`);
        },
        onError: (error) => {
          console.log("API Failed Edite Legal ❌", error);
        },
      }
    );
  };

  if (isPending) return <LoadingFormSkeleton />;

  return (
    <div className="w-full p-6 space-y-6">
      <CustomHeader title={t("Edite_Legal")} />

      <div className="bg-white dark:bg-gray-900 p-6  ">
        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <Step4Policies />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
              <Button
                type="submit"
                disabled={editlegalPending}
                className="min-w-[120px] flex items-center justify-center transform active:scale-95 transition-all"
              >
                {editlegalPending ? (
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
        </FormProvider>
      </div>
    </div>
  );
};

export default EditLegal;
