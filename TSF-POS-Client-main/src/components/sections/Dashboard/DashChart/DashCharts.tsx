import CustomOrderChart from "../../../charts/CustomOrderChart/CustomOrderChart";
import SaleChart from "../../../charts/SaleChart/SaleChart";
import "./dash-charts.scss";
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashCharts = () => {
  const [timeRange, setTimeRange] = useState<string>("7");
  const navigate = useNavigate();

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  const navigateToSales = () => {
    navigate("/sales");
  };

  const navigateToCustomOrders = () => {
    navigate("/custom-order");
  };

  return (
    <div className="mt-4 chart__wrapper">
      {/* Sales Chart Section */}
      <div className="chart-section modern-mb-lg">
        <div className="chart-header">
          <h3>Sales Performance</h3>
          <div className="chart-controls">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => handleTimeRangeChange(e.target.value as string)}
              >
                <MenuItem value="7">Last 7 Days</MenuItem>
                <MenuItem value="30">Last 30 Days</MenuItem>
                <MenuItem value="90">Last 90 Days</MenuItem>
              </Select>
            </FormControl>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={navigateToSales}
              sx={{ ml: 1 }}
            >
              View All Sales
            </Button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <SaleChart timeRange={timeRange} />
        </div>
      </div>

      {/* Custom Order Chart Section */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>Custom Order Performance</h3>
          <div className="chart-controls">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => handleTimeRangeChange(e.target.value as string)}
              >
                <MenuItem value="7">Last 7 Days</MenuItem>
                <MenuItem value="30">Last 30 Days</MenuItem>
                <MenuItem value="90">Last 90 Days</MenuItem>
              </Select>
            </FormControl>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={navigateToCustomOrders}
              sx={{ ml: 1 }}
            >
              View All Orders
            </Button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <CustomOrderChart timeRange={timeRange} />
        </div>
      </div>
    </div>
  );
};

export default DashCharts;