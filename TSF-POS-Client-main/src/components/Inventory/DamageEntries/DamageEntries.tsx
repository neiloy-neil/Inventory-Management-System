import React from "react";
import Button from "../../core/Button/Button";
import { DamageEntry } from "../../../types/Inventory/inventoryTypes";
import "./damageEntries.scss";

interface DamageEntriesProps {
  entries: DamageEntry[];
  onEdit: (entry: DamageEntry) => void;
  onDelete: (id: string) => void;
}

const DamageEntries: React.FC<DamageEntriesProps> = ({ entries, onEdit, onDelete }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "reported": return "status-warning";
      case "verified": return "status-info";
      case "resolved": return "status-success";
      default: return "status-default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "reported": return "Reported";
      case "verified": return "Verified";
      case "resolved": return "Resolved";
      default: return status;
    }
  };

  const getDamageTypeLabel = (damageType: string) => {
    switch (damageType) {
      case "physical": return "Physical";
      case "expiry": return "Expiry";
      case "quality": return "Quality";
      case "other": return "Other";
      default: return damageType;
    }
  };

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No damage entries found.</p>
      </div>
    );
  }

  return (
    <div className="damage-entries fade-in">
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Damage Type</th>
              <th>Description</th>
              <th>Warehouse</th>
              <th>Report Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.productName}</td>
                <td>{entry.quantity}</td>
                <td>{getDamageTypeLabel(entry.damageType)}</td>
                <td className="description-cell">{entry.description}</td>
                <td>{entry.warehouseLocation || "N/A"}</td>
                <td>{new Date(entry.reportDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(entry.status)}`}>
                    {getStatusLabel(entry.status)}
                  </span>
                </td>
                <td>
                  <Button 
                    title="Edit"
                    className="modern-btn modern-btn-outline modern-btn-sm me-2"
                    onClick={() => onEdit(entry)}
                  />
                  <Button 
                    title="Delete"
                    className="modern-btn modern-btn-danger modern-btn-sm"
                    onClick={() => onDelete(entry._id)}
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

export default DamageEntries;