import { useState } from "react";
import {
  Home,
  Edit,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { useTranslation } from "next-i18next";

const transactions = [
  {
    id: 1,
    name: "الوكالة 'العاصمة' أضافت عقار جديد",
    icon: Home,
    date: "قبل 10 دقائق",
    type: "add",
    description: "عقار سكني جديد في المنطقة الوسطى",
  },
  {
    id: 2,
    name: "المستخدم 'أحمد' عدّل بيانات وكالة 'الرياض'",
    icon: Edit,
    date: "قبل ساعة",
    type: "edit",
    description: "تحديث معلومات المكتب والعناوين",
  },
  {
    id: 3,
    name: "تمت الموافقة على اشتراك الوكالة 'القاهرة'",
    icon: CheckCircle,
    date: "اليوم الساعة 11:00",
    type: "approval",
    description: "انضمام جديد للبرنامج المميز",
  },
  {
    id: 4,
    name: "تم رفض طلب الوكالة 'الإسكندرية'",
    icon: XCircle,
    date: "أمس الساعة 16:30",
    type: "reject",
    description: "الدقة المطلوبة لم تكتمل",
  },
  {
    id: 5,
    name: "الوكالة 'الجيزة' أضافت عقار جديد",
    icon: Home,
    date: "أمس الساعة 14:20",
    type: "add",
    description: "عقار تجاري في منطقة الجيزة",
  },
];

const agencies = [
  {
    id: 1,
    name: "مجموعة البنيان",
    icon: Building2,
    date: "أمس الساعة 09:15",
    type: "agency",
    description: "انضمت وكالة جديدة في جدة",
  },
  {
    id: 2,
    name: "إعمار المستقبل",
    icon: Building2,
    date: "منذ يومين",
    type: "agency",
    description: "تم تفعيل حساب الوكالة",
  },
  {
    id: 3,
    name: "سكك العقارية",
    icon: Building2,
    date: "منذ 3 أيام",
    type: "agency",
    description: "اشتراك جديد في الباقة الذهبية",
  },
];

const getIconBgColor = (type) => {
  switch (type) {
    case "add":
      return "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400";
    case "edit":
      return "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400";
    case "approval":
      return "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400";
    case "reject":
      return "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400";
    case "agency":
      return "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
  }
};

const RecentActivities = () => {
  const [expandedId, setExpandedId] = useState(null);

  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRtl = dir === "rtl";

  /* const navigate = useNavigate(); */

  const renderList = (items) => {
    return items.map((transaction) => {
      const IconComponent = transaction.icon;
      const isExpanded = expandedId === transaction.id;

      return (
        <div
          key={transaction.id}
          onClick={() => setExpandedId(isExpanded ? null : transaction.id)}
          className={`group flex flex-col gap-4 rounded-xl ${isRtl ? "items-end text-right" : "items-start text-left"
            } bg-gray-50 dark:bg-white/5 p-4 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-border dark:hover:border-border cursor-pointer`}
        >
          <div
            className={`flex w-full ${isRtl
                ? "items-end justify-end flex-row-reverse"
                : "items-start justify-start flex-row"
              } gap-4`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 transition-all duration-200 ${getIconBgColor(
                transaction.type
              )}`}
            >
              <IconComponent className="h-5 w-5" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <div
                className={`flex justify-between ${isRtl ? "items-end flex-row-reverse" : "items-start flex-row"
                  } gap-4`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground dark:text-foreground text-sm md:text-base leading-snug">
                    {transaction.name}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-muted-foreground leading-relaxed">
                    {transaction.description}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground dark:text-muted-foreground font-medium">
                  {transaction.date}
                </p>
              </div>

              <div className="flex items-center justify-between mt-1"></div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="rounded-2xl bg-card dark:bg-card mt-6 p-6" dir="ltr">
      <Tabs defaultValue="activities" className="w-full">
        <div
          className={`flex items-center ${isRtl ? "justify-end" : "justify-start"
            } mb-6`}
        >
          <TabsList className="w-auto">
            <TabsTrigger value="agencies">الوكالات المضافة</TabsTrigger>
            <TabsTrigger value="activities">النشاطات الأخيرة</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="activities" className="mt-0">
          <div
            className={`mb-6 flex items-center ${isRtl ? "justify-end" : "justify-start"
              } gap-4`}
          >
            <div className="flex items-center gap-x-3">
              <div>
                <h3 className="text-2xl font-bold text-foreground dark:text-foreground">
                  النشاطات الأخيرة
                </h3>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-0.5">
                  عرض لأحدث النشاطات التي تمت على الوكالات
                </p>
              </div>
            </div>
            <span className="rounded-full bg-yellow-500/10  px-3 py-1 text-sm font-semibold text-yellow-600  border border-yellow-200  flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              {transactions.length}
            </span>
          </div>

          <div className="space-y-3">{renderList(transactions)}</div>
        </TabsContent>

        <TabsContent value="agencies" className="mt-0">
          <div
            className={`mb-6 flex items-center ${isRtl ? "justify-end" : "justify-start"
              } gap-4`}
          >
            <div className="flex items-center gap-x-3">
              <div>
                <h3 className="text-2xl font-bold text-foreground dark:text-foreground">
                  الوكالات المضافة
                </h3>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-0.5">
                  عرض لأحدث الوكالات التي انضمت للمنصة
                </p>
              </div>
            </div>
            <span className="rounded-full bg-purple-500/10  px-3 py-1 text-sm font-semibold text-purple-600  border border-purple-200  flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {agencies.length}
            </span>
          </div>

          <div className="space-y-3">{renderList(agencies)}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecentActivities;
