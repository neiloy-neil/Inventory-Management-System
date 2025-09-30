import React, { useEffect, useState } from "react";
import Button from "../../core/Button/Button";
import { InventoryItem } from "../../../types/Inventory/inventoryTypes";
import "./addInventoryItemModal.scss";

interface AddInventoryItemModalProps {
  show: boolean;
  onClose: () => void;
  item?: InventoryItem | null;
}

const AddInventoryItemModal: React.FC<AddInventoryItemModalProps> = ({ show, onClose, item }) => {
  const [formData, setFormData] = useState({
    productId: "",
    sku: "",
    batchNumber: "",
    expiryDate: "",
    quantity: 0,
    warehouseLocation: "",
    reorderLevel: 0,
    supplierId: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        productId: item.productId || "",
        sku: item.sku || "",
        batchNumber: item.batchNumber || "",
        expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : "",
        quantity: item.quantity || 0,
        warehouseLocation: item.warehouseLocation || "",
        reorderLevel: item.reorderLevel || 0,
        supplierId: item.supplierId || "",
      });
    } else {
      setFormData({
        productId: "",
        sku: "",
        batchNumber: "",
        expiryDate: "",
        quantity: 0,
        warehouseLocation: "",
        reorderLevel: 0,
        supplierId: "",
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" || name === "reorderLevel" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4>{item ? "Edit Inventory Item" : "Add New Inventory Item"}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h5>Product Information</h5>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="productId">Product ID</label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="sku">SKU</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="batchNumber">Batch Number</label>
                  <input
                    type="text"
                    id="batchNumber"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h5>Inventory Details</h5>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="reorderLevel">Reorder Level</label>
                  <input
                    type="number"
                    id="reorderLevel"
                    name="reorderLevel"
                    value={formData.reorderLevel}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="warehouseLocation">Warehouse Location</label>
                  <input
                    type="text"
                    id="warehouseLocation"
                    name="warehouseLocation"
                    value={formData.warehouseLocation}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="supplierId">Supplier ID</label>
                  <input
                    type="text"
                    id="supplierId"
                    name="supplierId"
                    value={formData.supplierId}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <Button 
                title="Cancel" 
                className="modern-btn modern-btn-secondary"
                onClick={onClose}
                type="button"
              />
              <Button 
                title={item ? "Update Item" : "Add Item"} 
                className="modern-btn modern-btn-primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInventoryItemModal;