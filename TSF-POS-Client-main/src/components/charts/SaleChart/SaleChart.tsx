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

interface SaleChartProps {
  timeRange?: string;
}

const SaleChart = ({ timeRange = "7" }: SaleChartProps) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const { branch } = useSelector((state: StateType) => state.dashboard);

  const fetchSales = useCallback(async () => {
    const days = parseInt(timeRange);
    const startDate = dayjs().subtract(days - 1, "days").format("MM-DD-YYYY");
    const endDate = dayjs().subtract(0, "days").format("MM-DD-YYYY");

    const { data } = await client.get(
      `/sale/all/list?startDate=${startDate}&endDate=${endDate}&branch=${branch}`
    );
    setSales(data.allSales);
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
        text: `Sales Performance (Last ${timeRange} Days)`,
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
    onClick: (_event: any, elements: any) => {
      if (elements.length > 0) {
        const firstElement = elements[0];
        const dateIndex = firstElement.index;
        // Could implement navigation to sales for specific date
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
    labels: dayLabels,
    datasets: [
      {
        label: "Sales and Partial Payment",
        data: lastDays.map((day) => day.amount),
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