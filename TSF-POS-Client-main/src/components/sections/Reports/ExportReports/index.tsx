import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, FormControlLabel } from "@mui/material";
import "./ExportReports.scss";

const ExportReports = () => {
  const [open, setOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [fileName, setFileName] = useState("report");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTables, setIncludeTables] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExport = () => {
    // Export logic will be implemented here
    console.log({
      format: exportFormat,
      fileName,
      includeCharts,
      includeTables
    });
    
    // Simulate export process
    alert(`Exporting report as ${exportFormat.toUpperCase()}...`);
    handleClose();
  };

  return (
    <div className="export-reports-component">
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleClickOpen}
        startIcon={<span className="export-icon">📤</span>}
      >
        Export Report
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Export Report</DialogTitle>
        <DialogContent>
          <div className="export-form">
            <TextField
              label="File Name"
              variant="outlined"
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              margin="normal"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Export Format</InputLabel>
              <Select
                value={exportFormat}
                label="Export Format"
                onChange={(e) => setExportFormat(e.target.value as string)}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="png">PNG Image</MenuItem>
              </Select>
            </FormControl>
            
            <div className="export-options">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                  />
                }
                label="Include Charts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeTables}
                    onChange={(e) => setIncludeTables(e.target.checked)}
                  />
                }
                label="Include Data Tables"
              />
            </div>
            
            <div className="export-info">
              <p>
                <strong>Export Format Information:</strong>
              </p>
              <ul>
                <li><strong>PDF:</strong> Best for sharing and printing professional reports</li>
                <li><strong>Excel (XLSX):</strong> Ideal for further data analysis and manipulation</li>
                <li><strong>CSV:</strong> Simple format compatible with most spreadsheet applications</li>
                <li><strong>PNG:</strong> Image format for sharing charts and visualizations</li>
              </ul>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleExport} color="primary" variant="contained">
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExportReports;