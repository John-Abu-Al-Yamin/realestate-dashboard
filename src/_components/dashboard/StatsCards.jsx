import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Home,
  Building2,
} from "lucide-react";

const StatsCards = ({ statistics }) => {
  const statisticsCards = statistics?.data.data;

  // Array لتسهيل التعامل مع كل كارت
  const stats = [
    {
      title: "عدد الوكالات",
      value: statisticsCards?.agencies_count,
      icon: Building2,
    },
    {
      title: "عدد المدراء",
      value: statisticsCards?.managers_count,
      icon: Users,
    },
    {
      title: "عدد خطط الاشتراك",
      value: statisticsCards?.subscription_plans_count,
      icon: Activity,
    },
    {
      title: "عدد الاشتراكات",
      value: statisticsCards?.subscriptions_count,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-sm p-6 cursor-pointer transition-colors duration-300 min-h-[140px] flex items-center hover:bg-gray-100"
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <h3 className="text-base font-medium text-gray-500">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <Icon className="w-12 h-12 text-black" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
