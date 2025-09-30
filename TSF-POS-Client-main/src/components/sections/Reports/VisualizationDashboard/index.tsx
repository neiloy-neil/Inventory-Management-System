import React, { useState } from "react";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import "./VisualizationDashboard.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const VisualizationDashboard = () => {
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [selectedData, setSelectedData] = useState("sales");

  // Sample data for demonstration
  const salesData = [
    { name: "Jan", revenue: 4000, profit: 2400 },
    { name: "Feb", revenue: 3000, profit: 1398 },
    { name: "Mar", revenue: 2000, profit: 9800 },
    { name: "Apr", revenue: 2780, profit: 3908 },
    { name: "May", revenue: 1890, profit: 4800 },
    { name: "Jun", revenue: 2390, profit: 3800 },
  ];

  const inventoryData = [
    { name: "Product A", stock: 400, sold: 240 },
    { name: "Product B", stock: 300, sold: 139 },
    { name: "Product C", stock: 200, sold: 980 },
    { name: "Product D", stock: 278, sold: 390 },
    { name: "Product E", stock: 189, sold: 480 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const renderChart = () => {
    const data = selectedData === "sales" ? salesData : inventoryData;
    
    // Prepare chart data based on Chart.js format
    const chartData = {
      labels: data.map(item => item.name),
      datasets: selectedData === "sales" ? [
        {
          label: 'Revenue',
          data: data.map(item => item.revenue),
          backgroundColor: '#8884d8',
          borderColor: '#8884d8',
          borderWidth: 1,
        },
        {
          label: 'Profit',
          data: data.map(item => item.profit),
          backgroundColor: '#82ca9d',
          borderColor: '#82ca9d',
          borderWidth: 1,
        }
      ] : [
        {
          label: 'Stock',
          data: data.map(item => item.stock),
          backgroundColor: '#8884d8',
          borderColor: '#8884d8',
          borderWidth: 1,
        },
        {
          label: 'Sold',
          data: data.map(item => item.sold),
          backgroundColor: '#82ca9d',
          borderColor: '#82ca9d',
          borderWidth: 1,
        }
      ]
    };

    const pieData = selectedData === "sales" 
      ? {
          labels: ['Revenue', 'Profit'],
          datasets: [
            {
              data: [
                salesData.reduce((sum, item) => sum + (item.revenue || 0), 0),
                salesData.reduce((sum, item) => sum + (item.profit || 0), 0)
              ],
              backgroundColor: COLORS,
            }
          ]
        }
      : {
          labels: ['Stock', 'Sold'],
          datasets: [
            {
              data: [
                inventoryData.reduce((sum, item) => sum + (item.stock || 0), 0),
                inventoryData.reduce((sum, item) => sum + (item.sold || 0), 0)
              ],
              backgroundColor: COLORS,
            }
          ]
        };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: selectedData === "sales" ? 'Sales Data' : 'Inventory Data',
        },
      },
    };

    switch(selectedChartType) {
      case "bar":
        return <Bar data={chartData} options={options} />;
      
      case "line":
        return <Line data={chartData} options={options} />;
      
      case "pie":
        return <Pie data={pieData} options={options} />;
      
      default:
        return <Bar data={chartData} options={options} />;
    }
  };

  return (
    <div className="visualization-dashboard-component">
      <div className="dashboard-header">
        <h2>Data Visualization Dashboard</h2>
        <p>Create interactive charts and graphs to visualize your business data</p>
      </div>

      <div className="dashboard-controls">
        <div className="control-group">
          <FormControl fullWidth>
            <InputLabel>Data Source</InputLabel>
            <Select
              value={selectedData}
              label="Data Source"
              onChange={(e) => setSelectedData(e.target.value as string)}
            >
              <MenuItem value="sales">Sales Data</MenuItem>
              <MenuItem value="inventory">Inventory Data</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="control-group">
          <FormControl fullWidth>
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={selectedChartType}
              label="Chart Type"
              onChange={(e) => setSelectedChartType(e.target.value as string)}
            >
              <MenuItem value="bar">Bar Chart</MenuItem>
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="pie">Pie Chart</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="control-group">
          <Button variant="outlined" onClick={() => window.print()}>
            Export Chart
          </Button>
        </div>
      </div>

      <div className="chart-container">
        {renderChart()}
      </div>

      <div className="dashboard-info">
        <h3>About This Dashboard</h3>
        <p>
          This interactive dashboard allows you to visualize your business data in multiple formats.
          Select different data sources and chart types to gain insights into your sales performance,
          inventory levels, and other key metrics.
        </p>
      </div>
    </div>
  );
};

export default VisualizationDashboard;