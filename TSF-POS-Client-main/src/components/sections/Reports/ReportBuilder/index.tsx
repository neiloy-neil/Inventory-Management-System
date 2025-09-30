import React, { useState } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button } from "@mui/material";
import "./ReportBuilder.scss";

const ReportBuilder = () => {
  const [reportName, setReportName] = useState("");
  const [selectedDataSource, setSelectedDataSource] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [filters, setFilters] = useState<any[]>([]);

  const dataSources = [
    { id: "sales", name: "Sales Data" },
    { id: "inventory", name: "Inventory Data" },
    { id: "customers", name: "Customer Data" },
    { id: "expenses", name: "Expense Data" },
    { id: "orders", name: "Custom Orders" }
  ];

  const metrics = [
    { id: "total_revenue", name: "Total Revenue" },
    { id: "units_sold", name: "Units Sold" },
    { id: "average_order", name: "Average Order Value" },
    { id: "profit_margin", name: "Profit Margin" },
    { id: "customer_count", name: "Customer Count" }
  ];

  const handleMetricChange = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  const addFilter = () => {
    setFilters([...filters, { field: "", operator: "", value: "" }]);
  };

  const updateFilter = (index: number, field: string, value: string) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], [field]: value };
    setFilters(updatedFilters);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const generateReport = () => {
    // Report generation logic will be implemented here
    console.log({
      reportName,
      selectedDataSource,
      selectedMetrics,
      dateRange,
      filters
    });
  };

  return (
    <div className="report-builder-component">
      <div className="report-builder-header">
        <h2>Create Custom Report</h2>
        <p>Build a report by selecting data sources, metrics, and filters</p>
      </div>

      <div className="report-form">
        <div className="form-section">
          <TextField
            label="Report Name"
            variant="outlined"
            fullWidth
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            margin="normal"
          />
        </div>

        <div className="form-section">
          <FormControl fullWidth margin="normal">
            <InputLabel>Data Source</InputLabel>
            <Select
              value={selectedDataSource}
              label="Data Source"
              onChange={(e) => setSelectedDataSource(e.target.value as string)}
            >
              {dataSources.map((source) => (
                <MenuItem key={source.id} value={source.id}>
                  {source.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="form-section">
          <h3>Metrics</h3>
          <div className="metrics-selector">
            {metrics.map((metric) => (
              <FormControlLabel
                key={metric.id}
                control={
                  <Checkbox
                    checked={selectedMetrics.includes(metric.id)}
                    onChange={() => handleMetricChange(metric.id)}
                  />
                }
                label={metric.name}
              />
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Date Range</h3>
          <div className="date-range-selector">
            <TextField
              label="From Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              margin="normal"
            />
            <TextField
              label="To Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              margin="normal"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Filters</h3>
          <div className="filters-container">
            {filters.map((filter, index) => (
              <div key={index} className="filter-row">
                <FormControl fullWidth margin="normal">
                  <InputLabel>Field</InputLabel>
                  <Select
                    value={filter.field}
                    label="Field"
                    onChange={(e) => updateFilter(index, "field", e.target.value as string)}
                  >
                    <MenuItem value="branch">Branch</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="product">Product</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel>Operator</InputLabel>
                  <Select
                    value={filter.operator}
                    label="Operator"
                    onChange={(e) => updateFilter(index, "operator", e.target.value as string)}
                  >
                    <MenuItem value="equals">Equals</MenuItem>
                    <MenuItem value="contains">Contains</MenuItem>
                    <MenuItem value="greater">Greater Than</MenuItem>
                    <MenuItem value="less">Less Than</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  label="Value"
                  value={filter.value}
                  onChange={(e) => updateFilter(index, "value", e.target.value)}
                  margin="normal"
                />
                
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={() => removeFilter(index)}
                  style={{ marginTop: "16px" }}
                >
                  Remove
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outlined" 
              onClick={addFilter}
              style={{ marginTop: "10px" }}
            >
              Add Filter
            </Button>
          </div>
        </div>

        <div className="form-actions">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={generateReport}
            size="large"
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;