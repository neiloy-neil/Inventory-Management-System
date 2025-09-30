import React from "react";
import Button from "../../core/Button/Button";
import { ReturnEntry } from "../../../types/Inventory/inventoryTypes";
import "./returnEntries.scss";

interface ReturnEntriesProps {
  entries: ReturnEntry[];
  onEdit: (entry: ReturnEntry) => void;
  onDelete: (id: string) => void;
}

const ReturnEntries: React.FC<ReturnEntriesProps> = ({ entries, onEdit, onDelete }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending": return "status-warning";
      case "processed": return "status-success";
      case "rejected": return "status-danger";
      default: return "status-default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "processed": return "Processed";
      case "rejected": return "Rejected";
      default: return status;
    }
  };

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No return entries found.</p>
      </div>
    );
  }

  return (
    <div className="return-entries fade-in">
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Condition</th>
              <th>Warehouse</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.productName}</td>
                <td>{entry.quantity}</td>
                <td>{entry.reason}</td>
                <td>{entry.condition}</td>
                <td>{entry.warehouseLocation || "N/A"}</td>
                <td>{new Date(entry.returnDate).toLocaleDateString()}</td>
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

export default ReturnEntries;