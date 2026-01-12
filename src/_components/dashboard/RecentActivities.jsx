

import { useState } from "react"
import { Home, Edit, CheckCircle, XCircle, Activity, Zap } from "lucide-react"

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
]

const getTypeColor = (type) => {
  switch (type) {
    case "add":
      return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
    case "edit":
      return "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
    case "approval":
      return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-800"
    case "reject":
      return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-800"
    default:
      return "bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400 border border-gray-200 dark:border-gray-800"
  }
}

const getIconBgColor = (type) => {
  switch (type) {
    case "add":
      return "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
    case "edit":
      return "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
    case "approval":
      return "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
    case "reject":
      return "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
  }
}

const getTypeLabel = (type) => {
  switch (type) {
    case "add":
      return "إضافة"
    case "edit":
      return "تعديل"
    case "approval":
      return "موافقة"
    case "reject":
      return "رفض"
    default:
      return type
  }
}

const RecentActivities = () => {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="rounded-2xl bg-card dark:bg-card mt-6 p-6 ">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-yellow-400 to-yellow-500 text-white">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground dark:text-foreground">آخر العمليات</h3>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-0.5">
              تابع جميع التحديثات والأنشطة
            </p>
          </div>
        </div>
        <span className="rounded-full bg-yellow-500/10  px-3 py-1 text-sm font-semibold text-yellow-600  border border-yellow-200  flex items-center gap-1">
          <Zap className="h-3.5 w-3.5" />
          {transactions.length}
        </span>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => {
          const IconComponent = transaction.icon
          const isExpanded = expandedId === transaction.id

          return (
            <div
              key={transaction.id}
              onClick={() => setExpandedId(isExpanded ? null : transaction.id)}
              className="group flex flex-col gap-4 rounded-xl border border-border/50 dark:border-border/50 bg-white/50 dark:bg-white/5 p-4 transition-all duration-200 hover:bg-white/80 dark:hover:bg-white/10 hover:border-border dark:hover:border-border hover:shadow-sm cursor-pointer"
            >
              <div className="flex w-full items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 transition-all duration-200 ${getIconBgColor(
                    transaction.type,
                  )}`}
                >
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="flex flex-col w-full gap-1">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground dark:text-foreground text-sm md:text-base leading-snug">
                        {transaction.name}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap ${getTypeColor(
                        transaction.type,
                      )}`}
                    >
                      {getTypeLabel(transaction.type)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground font-medium">
                      {transaction.date}
                    </p>
                    <span className="text-xs text-muted-foreground/50 dark:text-muted-foreground/50 group-hover:text-muted-foreground dark:group-hover:text-muted-foreground transition-colors">
                      {isExpanded ? "▼" : "▶"}
                    </span>
                  </div>
                </div>
              </div>
<div
  className={`overflow-hidden transition-all duration-300 ease-in-out ${
    isExpanded
      ? "max-h-40 mt-2 pl-16 border-t border-border/30 dark:border-border/30 pt-3"
      : "max-h-0 mt-0 pl-16 border-0 pt-0"
  }`}
>
  <p className="text-sm text-muted-foreground dark:text-muted-foreground leading-relaxed">
    {transaction.description}
  </p>
</div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default RecentActivities
