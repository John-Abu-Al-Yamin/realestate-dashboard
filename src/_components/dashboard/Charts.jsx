import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Bar,
  ComposedChart,
} from "recharts";
import { useTranslation } from "next-i18next";

const growthData = [
  { name: "يناير", الاشتراكات: 12, الوكالات: 8 },
  { name: "فبراير", الاشتراكات: 20, الوكالات: 15 },
  { name: "مارس", الاشتراكات: 25, الوكالات: 18 },
  { name: "أبريل", الاشتراكات: 30, الوكالات: 22 },
  { name: "مايو", الاشتراكات: 35, الوكالات: 28 },
  { name: "يونيو", الاشتراكات: 40, الوكالات: 32 },
  { name: "يوليو", الاشتراكات: 45, الوكالات: 38 },
  { name: "أغسطس", الاشتراكات: 50, الوكالات: 42 },
  { name: "سبتمبر", الاشتراكات: 55, الوكالات: 48 },
  { name: "أكتوبر", الاشتراكات: 60, الوكالات: 52 },
  { name: "نوفمبر", الاشتراكات: 65, الوكالات: 58 },
  { name: "ديسمبر", الاشتراكات: 70, الوكالات: 63 },
];

const revenueData = [
  { name: "يناير", الإيرادات: 1200 },
  { name: "فبراير", الإيرادات: 1500 },
  { name: "مارس", الإيرادات: 1800 },
  { name: "أبريل", الإيرادات: 2000 },
  { name: "مايو", الإيرادات: 2200 },
  { name: "يونيو", الإيرادات: 2500 },
  { name: "يوليو", الإيرادات: 2800 },
  { name: "أغسطس", الإيرادات: 3000 },
  { name: "سبتمبر", الإيرادات: 3200 },
  { name: "أكتوبر", الإيرادات: 3500 },
  { name: "نوفمبر", الإيرادات: 3800 },
  { name: "ديسمبر", الإيرادات: 4000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border text-sm">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Growth Chart */}
      <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border">
        <h3 className="text-xl font-bold mb-6 text-foreground">
          {t("growth_analytics", "تحليلات النمو")}
        </h3>
        <div className="h-[300px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={growthData}>
              <defs>
                <linearGradient id="colorSubscriptions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                dataKey="الاشتراكات"
                name="الاشتراكات"
                fill="url(#colorSubscriptions)"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="الوكالات"
                name="الوكالات"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ stroke: "#10b981", strokeWidth: 2, r: 4, fill: "hsl(var(--card))" }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border">
        <h3 className="text-xl font-bold mb-6 text-foreground">
          {t("revenue_trends", "اتجاهات الإيرادات")}
        </h3>
        <div className="h-[300px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="الإيرادات"
                name="الإيرادات"
                stroke="#8b5cf6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
