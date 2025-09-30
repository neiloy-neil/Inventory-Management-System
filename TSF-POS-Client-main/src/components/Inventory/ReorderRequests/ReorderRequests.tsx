import React from "react";
import Button from "../../core/Button/Button";
import { ReorderRequest } from "../../../types/Inventory/inventoryTypes";
import "./reorderRequests.scss";

interface ReorderRequestsProps {
  requests: ReorderRequest[];
  onUpdateStatus: (id: string, status: string) => void;
}

const ReorderRequests: React.FC<ReorderRequestsProps> = ({ requests, onUpdateStatus }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending": return "status-warning";
      case "ordered": return "status-info";
      case "received": return "status-success";
      case "cancelled": return "status-danger";
      default: return "status-secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "ordered": return "Ordered";
      case "received": return "Received";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  if (requests.length === 0) {
    return (
      <div className="empty-state">
        <p>No reorder requests found.</p>
      </div>
    );
  }

  return (
    <div className="reorder-requests fade-in">
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Current Stock</th>
              <th>Reorder Quantity</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Requested By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.productName}</td>
                <td>{request.currentStock}</td>
                <td>{request.reorderQuantity}</td>
                <td>{request.supplierId || "N/A"}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(request.status)}`}>
                    {getStatusLabel(request.status)}
                  </span>
                </td>
                <td>{request.requestedBy}</td>
                <td>
                  {request.status === "pending" && (
                    <Button 
                      title="Mark as Ordered"
                      className="modern-btn modern-btn-outline modern-btn-sm me-2"
                      onClick={() => onUpdateStatus(request._id, "ordered")}
                    />
                  )}
                  {request.status === "ordered" && (
                    <Button 
                      title="Mark as Received"
                      className="modern-btn modern-btn-outline modern-btn-sm me-2"
                      onClick={() => onUpdateStatus(request._id, "received")}
                    />
                  )}
                  {request.status !== "received" && request.status !== "cancelled" && (
                    <Button 
                      title="Cancel"
                      className="modern-btn modern-btn-danger modern-btn-sm"
                      onClick={() => onUpdateStatus(request._id, "cancelled")}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReorderRequests;