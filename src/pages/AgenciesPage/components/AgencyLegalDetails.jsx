import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "next-i18next";
import { SquarePen, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AgencyLegalDetails = ({ data, id }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          {isRTL ? "لا توجد معلومات قانونية" : "No legal information available"}
        </p>
      </div>
    );
  }

  const faqs = data?.faqs ? JSON.parse(data.faqs) : [];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isRTL ? "المعلومات القانونية" : "Legal Information"}
          </h2>
        </div>
        <Link to={`/agencies/edit-legal/${id}`}>
          <SquarePen className="w-6 h-6 text-black hover:translate-scale-105 duration-300 transition-all" />
        </Link>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {isRTL ? "الشروط والأحكام" : "Terms and Conditions"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.terms_and_conditions}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.privacy_policy}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {isRTL ? "الأسئلة الشائعة" : "FAQs"}
          </h3>

          {faqs.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger
                    className={isRTL ? "text-right" : "text-left"}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? "لا توجد أسئلة شائعة" : "No FAQs available"}
            </p>
          )}
        </div>

        {data.cookie_policy && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              {isRTL ? "سياسة الكوكيز" : "Cookie Policy"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {data.cookie_policy}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyLegalDetails;
