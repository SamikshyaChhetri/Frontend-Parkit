"use client";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type DayCount = {
  day: string;
  count: number;
};

type ChartType = "bar" | "line" | "doughnut";

type Props = {
  data: DayCount[];
  type?: ChartType;
  title?: string;
};

export default function StatsChart({
  data,
  type = "bar",
  title = "Reservations (Last 7 Days)",
}: Props) {
  const labels = data.map((d) => d.day);
  const values = data.map((d) => d.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Reservations",
        data: values,
        backgroundColor:
          type === "doughnut"
            ? [
                "rgba(59, 130, 246, 0.8)",
                "rgba(16, 185, 129, 0.8)",
                "rgba(249, 115, 22, 0.8)",
                "rgba(239, 68, 68, 0.8)",
                "rgba(168, 85, 247, 0.8)",
                "rgba(236, 72, 153, 0.8)",
                "rgba(14, 165, 233, 0.8)",
              ]
            : "rgba(59, 130, 246, 0.8)",
        borderColor: type === "line" ? "rgba(59, 130, 246, 1)" : undefined,
        borderWidth: type === "line" ? 3 : undefined,
        tension: type === "line" ? 0.4 : undefined,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
          },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: 20,
      },
    },
    scales:
      type !== "doughnut"
        ? {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          }
        : undefined,
  };

  return (
    <div className="h-[300px] flex items-center justify-center">
      {type === "bar" && <Bar options={options} data={chartData} />}
      {type === "line" && <Line options={options} data={chartData} />}
      {type === "doughnut" && <Doughnut options={options} data={chartData} />}
    </div>
  );
}
