import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Step1BasicInfo from "./components/Step1BasicInfo";
import Step2OverviewContent from "./components/Step2OverviewContent";
import Step3LegalVerification from "./components/Step3LegalVerification";
import Step4Policies from "./components/Step4Policies";
import Step5BrandingTheme from "./components/Step5BrandingTheme";

import { validationAgency } from "@/validationSchema/ValidationAgency";
import { Button } from "@/components/ui/button";
import CustomHeader from "@/customs/CustomHeader";
import { useTranslation } from "next-i18next";
import { useNavigate } from "react-router-dom";
import {
  useAddAgencyLegal,
  useAddAgencyMasterData,
  useAddAgencyProfile,
  useAddAgencyVerification,
  useAddAgencyVisualIdentity,
  useGetAllStepsAgencies,
} from "@/hooks/Actions/agencies/useCurdsAgencies";
import { Loader2 } from "lucide-react";

const AddAgencies = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();

  const managerid = sessionStorage.getItem("managerId");
  const managerData = JSON.parse(sessionStorage.getItem("managerData"));
  // console.log("managerData", managerData?.data?.data?.id);
  const StepId = managerData?.data?.data?.id;

  useEffect(() => {
    if (managerid === null) {
      navigate("/agencies/select-manager");
    }
  }, [managerid, navigate]);

  const stepsLabels = [
    t("Basic Info"),
    t("Overview & Content"),
    t("Legal & Verification"),
    t("Policies"),
    t("Branding & Theme"),
  ];

  const [step, setStep] = useState(0);
  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const methods = useForm({
    resolver: (values, context, options) => {
      const schema = validationAgency[stepRef.current];
      if (!schema) {
        console.warn(`No schema found for step ${stepRef.current}`);
        return { values: {}, errors: {} };
      }
      return zodResolver(schema)(values, context, options);
    },
    mode: "all",
    reValidateMode: "all",
    defaultValues: {
      // Step 1
      user_name: "",
      brand_name: "",
      phone_number: "",
      mobile_number: "",
      email: "",
      url: "",
      social_media_links: [""],

      // Step 2
      overview: "",
      vision: "",
      message: "",
      features: "",
      attachment: null,

      // Step 3
      commercial_license: "",
      commercial_license_attachment: null,
      tax_license: "",
      tax_license_attachment: null,
      fal_license: "",
      fal_license_attachment: null,
      address: "",
      address_attachment: null,
      verification_expiry: "",
      region_id: "",
      history: "",

      // Step 4
      terms_and_conditions: "",
      privacy_policy: "",
      faqs: [{ question: "", answer: "" }],
      cookies_policy: "",

      // Step 5
      logo: null,
      icon: null,
      watermark: null,
      primary_color: "#000000",
      secondary_color: "#ffffff",
      font: "",
      theme: "",
    },
  });

  const { handleSubmit, trigger, getValues } = methods;

  // STEP 1
  const { mutate: addMasterData, isPending: isPendingMaster } =
    useAddAgencyMasterData(StepId);

  // STEP 2
  const { mutate: addProfileData, isPending: isPendingProfile } =
    useAddAgencyProfile(StepId);

  // STEP 3
  const { mutate: addVerificationData, isPending: isPendingVerificationDate } =
    useAddAgencyVerification(StepId);

  // STEP 4
  const { mutate: addLegalData, isPending: isPendingLegalDate } =
    useAddAgencyLegal(StepId);

  // STEP 5
  const {
    mutate: addVisualIdentityData,
    isPending: isPendingVisualIdentityDate,
  } = useAddAgencyVisualIdentity(StepId);

  const {
    data: allsteps,
    refetch: refetchSteps,
    isPending: isPendingSteps,
  } = useGetAllStepsAgencies(StepId, 1);
  const incompleteSteps = allsteps?.data?.data || [];

  const BACKEND_STEP_KEYS = [
    "master_data",
    "profile",
    "verification",
    "legal",
    "visual_identity",
  ];

  // Derive initial step from backend data
  useEffect(() => {
    if (allsteps) {
      const firstIncompleteIndex = BACKEND_STEP_KEYS.findIndex((key) =>
        incompleteSteps.includes(key)
      );

      if (firstIncompleteIndex !== -1) {
        setStep(firstIncompleteIndex);
      } else if (incompleteSteps.length === 0) {
        // If empty, stay on the last step
        setStep(BACKEND_STEP_KEYS.length - 1);
      }
    }
  }, [allsteps]);

  // --- Step API Handlers (Simulation) ---
  const submitStep1 = async (data) => {
    console.log("🚀 Submitting Step 1 (Basic Info):", data);

    return new Promise((resolve, reject) => {
      addMasterData({
        data,
        onSuccess: () => {
          console.log("Step 1 API Success ✅");
          resolve(true);
        },
        onError: (error) => {
          console.log("Step 1 API Failed ❌", error);
          resolve(false);
        },
      });
    });
  };
  const submitStep2 = async (data) => {
    console.log("🚀 Submitting Step 2 (Overview & Content):", data);

    const formData = new FormData();

    // الملفات: attachment ممكن تكون File أو File[]
    if (data.attachment) {
      if (Array.isArray(data.attachment)) {
        data.attachment.forEach((file) => formData.append("attachment", file));
      } else {
        formData.append("attachment", data.attachment);
      }
    }

    // باقي الحقول كنصوص
    formData.append("overview", data.overview || "");
    formData.append("vision", data.vision || "");
    formData.append("message", data.message || "");
    formData.append("features", data.features || "");

    return new Promise((resolve) => {
      addProfileData({
        data: formData,
        onSuccess: () => {
          console.log("Step 2 API Success ✅");
          resolve(true);
        },
        onError: (error) => {
          console.log("Step 2 API Failed ❌", error);
          resolve(false);
        },
      });
    });
  };

  const submitStep3 = async (data) => {
    console.log("🚀 Submitting Step 3 ( Verification):", data);
    const formData = new FormData();

    formData.append("commercial_license", data.commercial_license || "");
    if (data.commercial_license_attachment?.[0]) {
      formData.append("commercial_license_attachment", data.commercial_license_attachment[0]);
    }

    formData.append("tax_license", data.tax_license || "");
    if (data.tax_license_attachment?.[0]) {
      formData.append("tax_license_attachment", data.tax_license_attachment[0]);
    }

    formData.append("fal_license", data.fal_license || "");
    if (data.fal_license_attachment?.[0]) {
      formData.append("fal_license_attachment", data.fal_license_attachment[0]);
    }

    formData.append("address", data.address || "");
    if (data.address_attachment?.[0]) {
      formData.append("address_attachment", data.address_attachment[0]);
    }

    formData.append("verification_expiry", data.verification_expiry || "");
    formData.append("region_id", data.region_id || "");
    formData.append("history", data.history || "");

    return new Promise((resolve, reject) => {
      addVerificationData({
        data: formData,
        onSuccess: () => {
          console.log("Step 2 API Success ✅");
          resolve(true);
        },
        onError: (error) => {
          console.log("Step 2 API Failed ❌", error);
          resolve(false);
        },
      });
    });
  };

  const submitStep4 = async (data) => {
    console.log("🚀 Submitting Step 4 (Legal):", data);
    return new Promise((resolve, reject) => {
      addLegalData({
        data,
        onSuccess: () => {
          console.log("Step 4 API Success ✅");
          resolve(true);
        },
        onError: (error) => {
          console.log("Step 4 API Failed ❌", error);
          resolve(false);
        },
      });
    });
  };

  const submitStep5 = async (data) => {
    const formData = new FormData();

    // الملفات
    if (data.logo) formData.append("logo", data.logo[0]);
    if (data.icon) formData.append("icon", data.icon[0]);
    if (data.watermark) formData.append("watermark", data.watermark[0]);

    // باقي البيانات
    formData.append("primary_color", data.primary_color);
    formData.append("secondary_color", data.secondary_color);
    formData.append("font", data.font);
    formData.append("theme", data.theme);

    addVisualIdentityData({
      data: formData,
      onSuccess: () => {
        console.log("Step 5 API Success ✅");
        sessionStorage.removeItem("managerId");
        sessionStorage.removeItem("managerData");
        navigate("/agencies");
      },
      onError: (error) => {
        console.log("Step 5 API Failed ❌", error);
      },
    });
  };

  const handleStepSubmit = async () => {
    // 1. Get current schema and fields
    const currentSchema = validationAgency[step];
    if (!currentSchema) {
      console.error("Schema not defined for current step");
      return;
    }
    // Accessing .shape to get keys from Zod Object
    // Note: If using .refine or other wrappers, accessing shape might vary.
    // Assuming simple z.object structure as defined in validationAgency.
    const fields = Object.keys(currentSchema.shape);

    // 2. Validate ONLY current step fields
    const valid = await trigger(fields);

    console.log(`Step ${step + 1} validation result:`, valid);

    if (!valid) {
      console.log("Validation errors:", methods.formState.errors);
      return; // Stop here if validation fails
    }

    // 3. Get ONLY the data for the current step
    const allValues = getValues();
    const stepData = fields.reduce((acc, field) => {
      acc[field] = allValues[field];
      return acc;
    }, {});

    // Pre-processing step data: Stringify social media links for Step 1
    if (step === 0 && stepData.social_media_links) {
      stepData.social_media_links = JSON.stringify({
        facebook: stepData.social_media_links.facebook || "",
        instagram: stepData.social_media_links.instagram || "",
        twitter: stepData.social_media_links.twitter || "",
        linkedin: stepData.social_media_links.linkedin || "",
      });
    }

    // Pre-processing step data: Stringify faqs for Step 3 policy
    if (step === 3 && stepData.faqs) {
      stepData.faqs = JSON.stringify(stepData.faqs);
    }

    // 4. Call the appropriate API function based on the step
    let success = false;
    try {
      switch (step) {
        case 0:
          success = await submitStep1(stepData);
          break;
        case 1:
          success = await submitStep2(stepData);
          break;
        case 2:
          success = await submitStep3(stepData);
          break;
        case 3:
          success = await submitStep4(stepData);
          break;
        case 4:
          success = await submitStep5(stepData);
          break;
        default:
          console.warn("Unknown step");
          break;
      }

      // 5. Move to next step only if API succeeds
      if (success) {
        // Refetch to get updated incomplete steps from backend
        await refetchSteps();

        if (step < 4) {
          // Note: The useEffect will naturally update the step if refetch returns new data,
          // but we can also manually increment for a snappier feel if the API is slow to reflect.
          // However, the requirement says "The first step that exists in the array should be the current active step."
          // So let the backend drive it.
          console.log(
            "Step submitted successfully, waiting for backend status update..."
          );
        } else {
          console.log("🎉 ALL STEPS COMPLETED!");
        }
      }
    } catch (error) {
      console.error(`❌ Step ${step + 1} API Failed`, error);
      // Handle error (e.g., show toast)
    }
  };

  const onSubmit = (data) => {
    handleStepSubmit();
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className=" w-full p-6" dir={dir}>
      <CustomHeader title={t("Add Agency")} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-8 relative">
            {/* Progress Bar Background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2" />

            {/* Active Progress Bar or Loading Skeleton */}
            {isPendingSteps ? (
              <>
                {/* Loading active progress (hidden until data loads) */}
                <div
                  className={`absolute top-1/2 ${dir === "rtl" ? "right-0" : "left-0"
                    } h-1 bg-black -z-10 transform -translate-y-1/2 transition-all duration-300`}
                  style={{ width: `0%` }}
                />

                <div className="flex justify-between items-center w-full">
                  {stepsLabels.map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white px-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                      <span className="h-3 mt-2 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>

                <Loader2 className="absolute right-0 top-0 h-4 w-4 animate-spin text-gray-400" />
              </>
            ) : (
              <>
                {/* Active Progress Bar */}
                <div
                  className={`absolute top-1/2 ${dir === "rtl" ? "right-0" : "left-0"
                    } h-1 bg-black -z-10 transform -translate-y-1/2 transition-all duration-300`}
                  style={{
                    width: `${(step / (stepsLabels.length - 1)) * 100}%`,
                  }}
                />

                {stepsLabels.map((label, index) => {
                  const isCompleted = !incompleteSteps.includes(
                    BACKEND_STEP_KEYS[index]
                  );
                  const isCurrent = index === step;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white px-2"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCurrent
                          ? "border-black bg-black text-white"
                          : isCompleted
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-gray-300 bg-white text-gray-400"
                          }`}
                      >
                        {isCompleted ? "✓" : index + 1}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium ${isCurrent || isCompleted
                          ? "text-black"
                          : "text-gray-400"
                          }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div className="p-6  rounded-lg  bg-white">
            {step === 0 && <Step1BasicInfo />}
            {step === 1 && <Step2OverviewContent />}
            {step === 2 && <Step3LegalVerification />}
            {step === 3 && <Step4Policies />}
            {step === 4 && <Step5BrandingTheme />}
          </div>
          <div className="flex justify-between pt-4">
            {/* زر السابق */}
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 0}
              className="w-40"
            >
              {t("Previous")}
            </Button>

            {/* زر التالي / الإرسال */}
            {step < 4 ? (
              <Button
                type="button"
                onClick={handleStepSubmit}
                className="bg-black text-white hover:bg-gray-800 w-40"
                disabled={
                  isPendingMaster ||
                  isPendingProfile ||
                  isPendingLegalDate ||
                  isPendingVerificationDate ||
                  isPendingSteps
                }
              >
                {(isPendingMaster ||
                  isPendingProfile ||
                  isPendingLegalDate ||
                  isPendingVerificationDate ||
                  isPendingSteps) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                {t("Next")}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleStepSubmit}
                className="bg-black text-white hover:bg-gray-800 w-40"
              >
                {t("Submit")}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddAgencies;
