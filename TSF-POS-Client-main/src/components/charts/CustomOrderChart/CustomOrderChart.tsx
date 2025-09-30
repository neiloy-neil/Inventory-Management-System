import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";
import client from "../../../client/axiosInstance";
import { useSelector } from "react-redux";
import { StateType } from "../../../redux/redux";
import dayjs from "dayjs";
import { CustomOrderFromServer } from "../../../types/CustomOrder/CustomOrderTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CustomOrderChartProps {
  timeRange?: string;
}

const CustomOrderChart = ({ timeRange = "7" }: CustomOrderChartProps) => {
  const [sales, setSales] = useState<CustomOrderFromServer[]>([]);
  const { branch } = useSelector((state: StateType) => state.dashboard);

  const fetchSales = useCallback(async () => {
    const days = parseInt(timeRange);
    const startDate = dayjs().subtract(days - 1, "days").format("MM-DD-YYYY");
    const endDate = dayjs().subtract(0, "days").format("MM-DD-YYYY");

    const { data } = await client.get(
      `/custom-order/list?branchId=${branch}&startDate=${startDate}&endDate=${endDate}`
    );

    console.log(data, "data");
    setSales(data.orders);
  }, [branch, timeRange]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: `Custom Order Performance (Last ${timeRange} Days)`,
        font: {
          size: 18,
          weight: "bold" as const,
        },
        padding: 20,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-BD', {
                style: 'currency',
                currency: 'BDT'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return '৳' + value;
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const firstElement = elements[0];
        const dateIndex = firstElement.index;
        // Could implement navigation to custom orders for specific date
        console.log("Clicked on date index:", dateIndex);
      }
    },
  };

  // Calculate date range based on timeRange
  const days = parseInt(timeRange);
  const lastDays = [];
  const dayLabels = [];

  for (let i = days - 1; i >= 0; i--) {
    lastDays.push({ date: moment().subtract(i, "days"), amount: 0 });
    if (days <= 7) {
      dayLabels.push(moment().subtract(i, "days").format("dddd"));
    } else if (days <= 30) {
      dayLabels.push(moment().subtract(i, "days").format("MMM DD"));
    } else {
      dayLabels.push(moment().subtract(i, "days").format("MMM DD"));
    }
  }

  // here iterating last days
  lastDays.forEach((day) => {
    // here iterating every sales

    sales?.forEach((sale) => {
      // checking if the sale is delivered or not
      if (
        sale.status === "Delivered" &&
        moment(day.date).format("DD-MM-YYYY") ===
          moment(sale.deliveredAt).format("DD-MM-YYYY")
      ) {
        day.amount += sale.totalPrice - sale.advancePayment;
      }

      if (
        sale.status === "Delivered" &&
        moment(day.date).format("DD-MM-YYYY") ===
          moment(sale.createdAt).format("DD-MM-YYYY")
      ) {
        day.amount += sale.advancePayment;
      }
      if (
        sale.status !== "Delivered" &&
        moment(day.date).format("DD-MM-YYYY") ===
          moment(sale.createdAt).format("DD-MM-YYYY")
      ) {
        day.amount += sale.advancePayment;
      }
    });
  });

  const data = {
    labels: dayLabels,
    datasets: [
      {
        label: "Advance Payment and Full Payment",
        data: lastDays.map((day) => day.amount),
        borderColor: "var(--accent-color)",
        backgroundColor: "rgba(76, 201, 240, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "var(--accent-color)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ 
      padding: "20px", 
      backgroundColor: "white", 
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
    }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default CustomOrderChart;