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
  PieChart,
  Pie,
  Cell,
  Bar,
  ComposedChart,
} from "recharts";

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

const propertiesData = [
  { name: "سكني", value: 60 },
  { name: "تجاري", value: 30 },
  { name: "أراضي", value: 10 },
];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

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
import { useTranslation } from "next-i18next";

const Charts = () => {

    return (
    <div className="grid gap-6  md:grid-cols-3 overflow-hidden" dir="ltr">
      <div className="w-full h-[400px] p-4 ">
        <h3 className="text-lg font-medium mb-4">
          نمو الاشتراكات والوكالات الشهرية
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={growthData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="الاشتراكات"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="الوكالات" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-[400px] p-4 ">
        <h3 className="text-lg font-medium mb-4">توزيع العقارات حسب النوع</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={propertiesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {propertiesData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-[400px] p-4 ">
        <h3 className="text-lg font-medium mb-4">الإيرادات الشهرية</h3>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={revenueData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="الإيرادات" barSize={30} fill="#82ca9d" />
            <Line type="monotone" dataKey="الإيرادات" stroke="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
