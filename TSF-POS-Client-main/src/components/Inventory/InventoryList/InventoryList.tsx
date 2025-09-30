import React from "react";
import Button from "../../core/Button/Button";
import { InventoryItem } from "../../../types/Inventory/inventoryTypes";
import "./inventoryList.scss";

interface InventoryListProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, onEdit, onDelete }) => {
  const getStatusClass = (quantity: number, reorderLevel: number) => {
    if (quantity === 0) return "status-danger";
    if (quantity <= reorderLevel) return "status-warning";
    return "status-success";
  };

  const getStatusLabel = (quantity: number, reorderLevel: number) => {
    if (quantity === 0) return "Out of Stock";
    if (quantity <= reorderLevel) return "Low Stock";
    return "In Stock";
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No inventory items found.</p>
      </div>
    );
  }

  return (
    <div className="inventory-list fade-in">
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Batch</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Warehouse</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.productId}</td>
                <td>{item.sku}</td>
                <td>{item.batchNumber || "N/A"}</td>
                <td>
                  {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "N/A"}
                </td>
                <td>{item.quantity}</td>
                <td>{item.warehouseLocation || "N/A"}</td>
                <td>{item.reorderLevel}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(item.quantity, item.reorderLevel)}`}>
                    {getStatusLabel(item.quantity, item.reorderLevel)}
                  </span>
                </td>
                <td>
                  <Button 
                    title="Edit"
                    className="modern-btn modern-btn-outline modern-btn-sm me-2"
                    onClick={() => onEdit(item)}
                  />
                  <Button 
                    title="Delete"
                    className="modern-btn modern-btn-danger modern-btn-sm"
                    onClick={() => onDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;