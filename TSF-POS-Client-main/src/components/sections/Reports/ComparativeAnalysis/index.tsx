import React, { useState } from "react";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import "./ComparativeAnalysis.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparativeAnalysis = () => {
  const [analysisType, setAnalysisType] = useState("time");
  const [period1, setPeriod1] = useState("2023-01");
  const [period2, setPeriod2] = useState("2023-02");
  const [branch1, setBranch1] = useState("branch1");
  const [branch2, setBranch2] = useState("branch2");

  // Sample data for demonstration
  const timeComparisonData = [
    { name: "Revenue", period1: 4000, period2: 3000 },
    { name: "Profit", period1: 2400, period2: 1398 },
    { name: "Orders", period1: 240, period2: 130 },
  ];

  const branchComparisonData = [
    { name: "Revenue", branch1: 4000, branch2: 3000 },
    { name: "Profit", branch1: 2400, branch2: 1398 },
    { name: "Customers", branch1: 240, branch2: 130 },
  ];

  const renderComparisonChart = () => {
    const data = analysisType === "time" ? timeComparisonData : branchComparisonData;
    const label1 = analysisType === "time" ? period1 : branch1;
    const label2 = analysisType === "time" ? period2 : branch2;

    const chartData = {
      labels: data.map(item => item.name),
      datasets: [
        {
          label: label1,
          data: data.map(item => analysisType === "time" ? item.period1 : item.branch1),
          backgroundColor: '#8884d8',
        },
        {
          label: label2,
          data: data.map(item => analysisType === "time" ? item.period2 : item.branch2),
          backgroundColor: '#82ca9d',
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
          text: 'Comparative Analysis',
        },
      },
    };

    return <Bar data={chartData} options={options} />;
  };

  return (
    <div className="comparative-analysis-component">
      <div className="analysis-header">
        <h2>Comparative Analysis</h2>
        <p>Compare business metrics across different time periods or branches</p>
      </div>

      <div className="analysis-controls">
        <ToggleButtonGroup
          color="primary"
          value={analysisType}
          exclusive
          onChange={(e, newValue) => newValue && setAnalysisType(newValue)}
          aria-label="analysis type"
        >
          <ToggleButton value="time">Time Period Comparison</ToggleButton>
          <ToggleButton value="branch">Branch Comparison</ToggleButton>
        </ToggleButtonGroup>

        {analysisType === "time" ? (
          <div className="time-controls">
            <TextField
              label="Period 1"
              type="month"
              InputLabelProps={{ shrink: true }}
              value={period1}
              onChange={(e) => setPeriod1(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Period 2"
              type="month"
              InputLabelProps={{ shrink: true }}
              value={period2}
              onChange={(e) => setPeriod2(e.target.value)}
              margin="normal"
            />
          </div>
        ) : (
          <div className="branch-controls">
            <FormControl fullWidth margin="normal">
              <InputLabel>Branch 1</InputLabel>
              <Select
                value={branch1}
                label="Branch 1"
                onChange={(e) => setBranch1(e.target.value as string)}
              >
                <MenuItem value="branch1">Branch 1</MenuItem>
                <MenuItem value="branch2">Branch 2</MenuItem>
                <MenuItem value="branch3">Branch 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Branch 2</InputLabel>
              <Select
                value={branch2}
                label="Branch 2"
                onChange={(e) => setBranch2(e.target.value as string)}
              >
                <MenuItem value="branch1">Branch 1</MenuItem>
                <MenuItem value="branch2">Branch 2</MenuItem>
                <MenuItem value="branch3">Branch 3</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}

        <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
          Generate Comparison
        </Button>
      </div>

      <div className="analysis-chart">
        {renderComparisonChart()}
      </div>

      <div className="analysis-results">
        <h3>Analysis Summary</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Key Insights</h4>
            <ul>
              <li>Revenue increased by 15% compared to previous period</li>
              <li>Profit margin improved by 8%</li>
              <li>Customer acquisition grew by 12%</li>
            </ul>
          </div>
          <div className="summary-card">
            <h4>Recommendations</h4>
            <ul>
              <li>Continue current marketing strategy</li>
              <li>Optimize inventory for high-performing products</li>
              <li>Implement customer retention programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;