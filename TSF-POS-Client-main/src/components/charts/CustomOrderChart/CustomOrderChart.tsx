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

const CustomOrderChart = () => {
  const [sales, setSales] = useState<CustomOrderFromServer[]>([]);
  const { branch } = useSelector((state: StateType) => state.dashboard);

  const fetchSales = useCallback(async () => {
    const sevenDaysBefore = dayjs().subtract(6, "days").format("MM-DD-YYYY");
    const today = dayjs().subtract(0, "days").format("MM-DD-YYYY");

    const { data } = await client.get(
      `/custom-order/list?branchId=${branch}&startDate=${sevenDaysBefore}&endDate=${today}`
    );

    console.log(data, "data");
    setSales(data.orders);
  }, [branch]);

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
        text: "Custom Order Performance (Last 7 Days)",
        font: {
          size: 18,
          weight: "bold" as const,
        },
        padding: 20,
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
  };

  const lastSevenDays = [];
  const dayNameLabels = [];

  for (let i = 7; i >= 0; i--) {
    lastSevenDays.push({ date: moment().subtract(i, "days"), amount: 0 });
    dayNameLabels.push(moment().subtract(i, "days").format("dddd"));
  }

  // here iterating last 7days
  lastSevenDays.forEach((day) => {
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
    labels: dayNameLabels,
    datasets: [
      {
        label: "Advance Payment and Full Payment",
        data: lastSevenDays.map((day) => day.amount),
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