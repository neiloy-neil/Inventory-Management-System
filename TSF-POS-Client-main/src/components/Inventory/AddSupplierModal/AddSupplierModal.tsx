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
import { Supplier } from "../../../types/Inventory/inventoryTypes";
import "./addSupplierModal.scss";

interface AddSupplierModalProps {
  show: boolean;
  onClose: () => void;
  supplier?: Supplier | null;
}

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ show, onClose, supplier }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    productsSupplied: [] as string[],
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || "",
        contactPerson: supplier.contactPerson || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
        city: supplier.city || "",
        state: supplier.state || "",
        zipCode: supplier.zipCode || "",
        country: supplier.country || "",
        productsSupplied: supplier.productsSupplied || [],
      });
    } else {
      setFormData({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        productsSupplied: [],
      });
    }
  }, [supplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        {supplier ? "Edit Supplier" : "Add New Supplier"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="h6">Supplier Information</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Supplier Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {supplier ? "Update" : "Add"} Supplier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSupplierModal;