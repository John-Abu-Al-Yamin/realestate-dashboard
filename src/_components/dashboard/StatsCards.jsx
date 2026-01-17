import { useTranslation } from "next-i18next";
import { BarChart, Bar, ResponsiveContainer, YAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MiniBar = ({ values = [], color, maxValue }) => {
  const data = values.map((v, i) => ({ value: v }));
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          {/* Unified scale for all charts */}
          <YAxis domain={[0, maxValue]} hide />
          <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} barSize={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const StatsCards = ({ statistics, filter, setFilter }) => {
  const statsData = statistics?.data.data;
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  // Find the maximum value to normalize chart heights
  const counts = [
    statsData?.agencies_count ?? 0,
    statsData?.managers_count ?? 0,
    statsData?.subscription_plans_count ?? 0,
    statsData?.subscriptions_count ?? 0,
  ];
  // Ensure max is at least 1 to avoid division by zero or flat charts if all are 0
  // Multiply by 1.2 to leave some headroom so the tallest bar doesn't touch the top exactly
  const maxValue = Math.max(...counts, 1) * 1.2;

  const stats = [
    {
      title: t("dashboard.agencies"),
      value: statsData?.agencies_count ?? 0,
      chart: (
        <MiniBar
          values={[statsData?.agencies_count ?? 0]}
          color="#8b5cf6"
          maxValue={maxValue}
        />
      ),
    },
    {
      title: t("dashboard.managers"),
      value: statsData?.managers_count ?? 0,
      chart: (
        <MiniBar
          values={[statsData?.managers_count ?? 0]}
          color="#f97316"
          maxValue={maxValue}
        />
      ),
    },
    {
      title: t("dashboard.subscriptionPlans"),
      value: statsData?.subscription_plans_count ?? 0,
      chart: (
        <MiniBar
          values={[statsData?.subscription_plans_count ?? 0]}
          color="#3b82f6"
          maxValue={maxValue}
        />
      ),
    },
    {
      title: t("dashboard.subscriptions"),
      value: statsData?.subscriptions_count ?? 0,
      chart: (
        <MiniBar
          values={[statsData?.subscriptions_count ?? 0]}
          color="#ec4899"
          maxValue={maxValue}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className={`flex justify-start`}>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[170px] border-none shadow-none font-bold focus:ring-0 ring-0 bg-transparent text-2xl">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-sm p-6 cursor-pointer transition-colors duration-300 min-h-40 flex flex-col hover:bg-gray-100"
          >
            {/* Title + Count جنب بعض */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-gray-500">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>

            {/* Chart تحت */}
            <div className="flex items-center justify-center">{stat.chart}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
