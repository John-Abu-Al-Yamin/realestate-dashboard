import { useTranslation } from "next-i18next";
import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <button
          onClick={() => navigate("/agencies")}
          className="cursor-pointer flex flex-col items-center justify-center p-4 bg-green-100 rounded-xl hover:bg-green-200 transition"
        >
          <span className="text-3xl mb-2">🏠</span>
          <span className="font-semibold text-gray-700">الوكالات</span>
        </button>
        <button
          onClick={() => navigate("/agencies/select-manager")}
          className="cursor-pointer flex flex-col items-center justify-center p-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition"
        >
          <span className="text-3xl mb-2">👤</span>
          <span className="font-semibold text-gray-700">اضافه وكالة</span>
        </button>
        <button onClick={() => navigate("/subscriptions")} className="cursor-pointer flex flex-col items-center justify-center p-4 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition">
          <span className="text-3xl mb-2">💳</span>
          <span className="font-semibold text-gray-700">مراجعة الاشتراكات</span>
        </button>
        <button onClick={() => navigate("/subscription-plans")} className="cursor-pointer flex flex-col items-center justify-center p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition">
          <span className="text-3xl mb-2">📊</span>
          <span className="font-semibold text-gray-700">خطط الاشتراكات</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
