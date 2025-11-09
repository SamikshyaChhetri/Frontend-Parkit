"use client";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  color = "text-blue-600",
  bgColor = "bg-blue-50 dark:bg-blue-900/20",
}: Props) {
  return (
    <div
      className={`${bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </div>
          <div className={`mt-3 text-4xl font-bold ${color}`}>{value}</div>
          {subtitle && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {subtitle}
            </div>
          )}
        </div>
        {icon && <div className={`${color} opacity-80 ml-4`}>{icon}</div>}
      </div>
    </div>
  );
}
