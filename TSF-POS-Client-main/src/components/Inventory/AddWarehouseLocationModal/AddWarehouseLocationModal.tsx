import React, { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Grid,
  Typography,
  Divider
} from "@mui/material";
import { WarehouseLocation } from "../../../types/Inventory/inventoryTypes";
import "./addWarehouseLocationModal.scss";

interface AddWarehouseLocationModalProps {
  show: boolean;
  onClose: () => void;
  location?: WarehouseLocation | null;
}

const AddWarehouseLocationModal: React.FC<AddWarehouseLocationModalProps> = ({ show, onClose, location }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    capacity: 0,
    currentOccupancy: 0,
  });

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name || "",
        code: location.code || "",
        description: location.description || "",
        capacity: location.capacity || 0,
        currentOccupancy: location.currentOccupancy || 0,
      });
    } else {
      setFormData({
        name: "",
        code: "",
        description: "",
        capacity: 0,
        currentOccupancy: 0,
      });
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "capacity" || name === "currentOccupancy" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
    onClose();
  };

  return (
    <Dialog open={show} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {location ? "Edit Warehouse Location" : "Add New Warehouse Location"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="h6">Warehouse Information</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Warehouse Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Occupancy"
                name="currentOccupancy"
                type="number"
                value={formData.currentOccupancy}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {location ? "Update" : "Add"} Location
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWarehouseLocationModal;