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
import { Sale } from "../../../types/Sale/sale";
import { useSelector } from "react-redux";
import { StateType } from "../../../redux/redux";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SaleChart = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const { branch } = useSelector((state: StateType) => state.dashboard);

  const fetchSales = useCallback(async () => {
    const sevenDaysBefore = dayjs().subtract(6, "days").format("MM-DD-YYYY");
    const today = dayjs().subtract(0, "days").format("MM-DD-YYYY");

    const { data } = await client.get(
      `/sale/all/list?startDate=${sevenDaysBefore}&endDate=${today}&branch=${branch}`
    );
    setSales(data.allSales);
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
        text: "Sales Performance (Last 7 Days)",
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
      // checking if there is any 2ndpartialAmountPaid today
      if (
        sale.partialAmountPayingDate &&
        moment(sale.partialAmountPayingDate)
          .startOf("day")
          .format("DD-MM-YY") ===
          moment(day.date).startOf("day").format("DD-MM-YY")
      ) {
        // if there is a 2nd partial payment add it with today
        day.amount += sale.total - sale.partialPaymentAmount;
      }
      // checking if there is any sale created on that day
      if (
        moment(sale.createdAt).startOf("day").format("DD-MM-YY") ===
        moment(day.date).startOf("day").format("DD-MM-YY")
      ) {
        // if not partial payment add full total
        if (!sale.partialPayment) return (day.amount += sale.total);
        // if partial payment add only partialPaymentAmount
        if (sale.partialPayment)
          return (day.amount += sale.partialPaymentAmount);
      }
    });
  });

  const data = {
    labels: dayNameLabels,
    datasets: [
      {
        label: "Sales and Partial Payment",
        data: lastSevenDays.map((day) => day.amount),
        borderColor: "var(--primary-color)",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "var(--primary-color)",
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

export default SaleChart;