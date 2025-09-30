import React, { useState } from "react";
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Checkbox, 
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import "./ScheduledReports.scss";

const ScheduledReports = () => {
  const [open, setOpen] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState("09:00");
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, name: "Daily Sales Report", frequency: "daily", time: "09:00", active: true },
    { id: 2, name: "Weekly Inventory Report", frequency: "weekly", time: "08:00", active: true },
    { id: 3, name: "Monthly Expense Report", frequency: "monthly", time: "10:00", active: false }
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setScheduleName("");
  };

  const handleSave = () => {
    // Save logic will be implemented here
    const newReport = {
      id: scheduledReports.length + 1,
      name: scheduleName,
      frequency,
      time,
      active: true
    };
    
    setScheduledReports([...scheduledReports, newReport]);
    handleClose();
  };

  const handleDelete = (id: number) => {
    setScheduledReports(scheduledReports.filter(report => report.id !== id));
  };

  const toggleActive = (id: number) => {
    setScheduledReports(scheduledReports.map(report => 
      report.id === id ? { ...report, active: !report.active } : report
    ));
  };

  return (
    <div className="scheduled-reports-component">
      <div className="scheduled-reports-header">
        <h2>Scheduled Reports</h2>
        <p>Automatically generate and send reports on a recurring basis</p>
      </div>

      <div className="scheduled-reports-actions">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClickOpen}
        >
          Create Schedule
        </Button>
      </div>

      <TableContainer component={Paper} className="scheduled-reports-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report Name</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.frequency}</TableCell>
                <TableCell>{report.time}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={report.active}
                        onChange={() => toggleActive(report.id)}
                      />
                    }
                    label={report.active ? "Active" : "Inactive"}
                  />
                </TableCell>
                <TableCell>
                  <IconButton aria-label="edit" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="delete" 
                    size="small" 
                    onClick={() => handleDelete(report.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Scheduled Report</DialogTitle>
        <DialogContent>
          <div className="schedule-form">
            <TextField
              label="Schedule Name"
              variant="outlined"
              fullWidth
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              margin="normal"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Frequency</InputLabel>
              <Select
                value={frequency}
                label="Frequency"
                onChange={(e) => setFrequency(e.target.value as string)}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
              margin="normal"
            />
            
            <div className="schedule-info">
              <p>
                <strong>Scheduled Report Information:</strong>
              </p>
              <ul>
                <li>Scheduled reports will be automatically generated and sent to specified recipients</li>
                <li>You can choose daily, weekly, or monthly frequency</li>
                <li>Reports will be generated at the specified time in your local timezone</li>
                <li>You can activate or deactivate schedules at any time</li>
              </ul>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ScheduledReports;