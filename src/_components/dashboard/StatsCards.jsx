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
            className="bg-white rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.title}
                </h3>
                <p className="text-lg font-semibold text-gray-700">
                  {stat.value}
                </p>
              </div>
              <Icon className="w-8 h-8 text-black" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
