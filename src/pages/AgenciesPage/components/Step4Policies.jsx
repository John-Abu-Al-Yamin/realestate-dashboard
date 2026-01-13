import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { Plus, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Step4Policies = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  return (
    <div className="space-y-6">
      {/* Terms and Privacy Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <Label
            htmlFor="terms_and_conditions"
            className="text-base font-semibold"
          >
            {t("Terms and Conditions")}
          </Label>
          <Textarea
            id="terms_and_conditions"
            {...register("terms_and_conditions")}
            placeholder={t("Enter terms and conditions...")}
            className="min-h-[120px] resize-y"
          />
          {errors.terms_and_conditions && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.terms_and_conditions.message)}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="privacy_policy" className="text-base font-semibold">
            {t("Privacy Policy")}
          </Label>
          <Textarea
            id="privacy_policy"
            {...register("privacy_policy")}
            placeholder={t("Enter privacy policy...")}
            className="min-h-[120px] resize-y"
          />
          {errors.privacy_policy && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.privacy_policy.message)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Label htmlFor="cookies_policy" className="text-base font-semibold">
          {t("Cookies Policy")}
        </Label>
        <Textarea
          id="cookies_policy"
          {...register("cookies_policy")}
          placeholder={t("Enter cookies policy...")}
          className="min-h-[120px] resize-y"
        />
        {errors.cookies_policy && (
          <p className="text-red-500 text-sm mt-1">
            {t(errors.cookies_policy.message)}
          </p>
        )}
      </div>

      {/* FAQs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-bold">{t("FAQs")}</Label>
          <span className="text-sm text-gray-500">
            {fields.length} {t("Questions")}
          </span>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Card className="border border-gray-200  hover:shadow-sm transition-shadow duration-200">
                  <CardContent className="p-4 pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <h4 className="font-medium text-gray-900">
                          {t("Frequently Asked Question")}
                        </h4>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 -mt-2 -mr-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`faqs.${index}.question`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("Question")}{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          {...register(`faqs.${index}.question`)}
                          placeholder={t("e.g. What are your opening hours?")}
                          className="bg-gray-50/50 focus:bg-white transition-colors"
                        />
                        {errors.faqs?.[index]?.question && (
                          <p className="text-red-500 text-xs mt-1">
                            {t(errors.faqs[index].question.message)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor={`faqs.${index}.answer`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {t("Answer")} <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          {...register(`faqs.${index}.answer`)}
                          placeholder={t(
                            "e.g. We are open 9am to 6pm, Monday to Friday..."
                          )}
                          className="min-h-20 bg-gray-50/50 focus:bg-white transition-colors"
                        />
                        {errors.faqs?.[index]?.answer && (
                          <p className="text-red-500 text-xs mt-1">
                            {t(errors.faqs[index].answer.message)}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div layout>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ question: "", answer: "" })}
              className="w-full h-12 border-dashed border-2 hover:border-gray-900 hover:bg-gray-50 text-gray-600 font-medium transition-all"
            >
              <Plus className="w-4 h-4 mr-2" /> {t("Add New Question")}
            </Button>
          </motion.div>
        </div>

        {errors.faqs && !Array.isArray(errors.faqs) && (
          <p className="text-red-500 text-sm mt-2 font-medium">
            {t(errors.faqs.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step4Policies;
