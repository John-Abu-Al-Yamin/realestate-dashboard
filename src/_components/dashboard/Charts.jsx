import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "next-i18next";

const data = [
  { name: "Jan", value: 124, average: 160 },
  { name: "Feb", value: 145, average: 158 },
  { name: "Mar", value: 135, average: 165 },
  { name: "Apr", value: 130, average: 170 },
  { name: "May", value: 142, average: 168 },
  { name: "Jun", value: 150, average: 172 },
  { name: "Jul", value: 155, average: 175 },
  { name: "Aug", value: 148, average: 180 },
  { name: "Sep", value: 130, average: 178 },
  { name: "Oct", value: 110, average: 182 },
  { name: "Nov", value: 124, average: 187 },
  { name: "Dec", value: 140, average: 190 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" text-popover-foreground p-3 rounded-lg  border border-border text-sm backdrop-blur-sm bg-white dark:bg-black/95">
        <div className="flex flex-col gap-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-bold text-foreground">
                {entry.name === "value" ? "Nov" : "Avg"}:
              </span>
              <span className="font-medium text-muted-foreground">
                R{entry.value},00
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Charts = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full bg-card text-card-foreground p-2 rounded-xl  ">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {t("performance_overview", "نظرة عامة على الأداء")}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t("performance_comparison", "مقارنة الأداء الحالي مع المتوسط")}
          </p>
        </div>
      </div>

      <div className="h-[400px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            {/* <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              visible={false}
            /> */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "hsl(var(--muted-foreground))",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="average"
              name="average"
              stroke="#9ca3af"
              strokeWidth={2}
              fill="transparent"
              dot={false}
              activeDot={{ r: 6, fill: "#9ca3af", strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              name="value"
              stroke="#14b8a6" // Teal
              strokeWidth={3}
              fill="url(#colorValue)"
              activeDot={{
                r: 6,
                fill: "#14b8a6",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
