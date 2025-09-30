import React from "react";
import Button from "../../core/Button/Button";
import { InventoryAlert } from "../../../types/Inventory/inventoryTypes";
import "./inventoryAlerts.scss";

interface InventoryAlertsProps {
  alerts: InventoryAlert[];
  onMarkAsRead: (id: string) => void;
}

const InventoryAlerts: React.FC<InventoryAlertsProps> = ({ alerts, onMarkAsRead }) => {
  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "low_stock": return "warning";
      case "out_of_stock": return "danger";
      case "expired_soon": return "info";
      default: return "secondary";
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case "low_stock": return "Low Stock";
      case "out_of_stock": return "Out of Stock";
      case "expired_soon": return "Expiring Soon";
      default: return type;
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="empty-state">
        <p>No inventory alerts found.</p>
      </div>
    );
  }

  return (
    <div className="inventory-alerts fade-in">
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Alert Type</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Warehouse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert._id}>
                <td>{alert.productName}</td>
                <td>
                  <span className={`alert-badge alert-${getAlertTypeColor(alert.alertType)}`}>
                    {getAlertTypeLabel(alert.alertType)}
                  </span>
                </td>
                <td>{alert.currentStock}</td>
                <td>{alert.reorderLevel}</td>
                <td>{alert.warehouseLocation}</td>
                <td>
                  <Button 
                    title="Mark as Read"
                    className="modern-btn modern-btn-outline modern-btn-sm"
                    onClick={() => onMarkAsRead(alert._id)}
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

export default InventoryAlerts;