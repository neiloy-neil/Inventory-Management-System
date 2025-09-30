import React, { useState, useEffect } from "react";
import Button from "../../core/Button/Button";
import { ReturnEntry } from "../../../types/Inventory/inventoryTypes";
import "./addReturnEntryModal.scss";

interface AddReturnEntryModalProps {
  show: boolean;
  onClose: () => void;
  entry?: ReturnEntry | null;
  onSubmit: (entry: Omit<ReturnEntry, "_id" | "createdAt" | "updatedAt"> | Partial<ReturnEntry>) => void;
}

const AddReturnEntryModal: React.FC<AddReturnEntryModalProps> = ({ show, onClose, entry, onSubmit }) => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [condition, setCondition] = useState<"excellent" | "good" | "fair" | "poor">("good");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [returnedBy, setReturnedBy] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState<"pending" | "processed" | "rejected">("pending");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (entry) {
      setProductId(entry.productId);
      setProductName(entry.productName);
      setQuantity(entry.quantity);
      setReason(entry.reason);
      setCondition(entry.condition);
      setWarehouseLocation(entry.warehouseLocation || "");
      setReturnedBy(entry.returnedBy);
      setReturnDate(new Date(entry.returnDate).toISOString().split("T")[0]);
      setStatus(entry.status);
      setNotes(entry.notes || "");
    } else {
      // Reset form for new entry
      setProductId("");
      setProductName("");
      setQuantity(1);
      setReason("");
      setCondition("good");
      setWarehouseLocation("");
      setReturnedBy("");
      setReturnDate(new Date().toISOString().split("T")[0]);
      setStatus("pending");
      setNotes("");
    }
  }, [entry, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData = {
      productId,
      productName,
      quantity,
      reason,
      condition,
      warehouseLocation: warehouseLocation || undefined,
      returnedBy,
      returnDate: new Date(returnDate),
      status,
      notes: notes || undefined,
    };

    onSubmit(entry ? { ...entryData, _id: entry._id } : entryData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>{entry ? "Edit Return Entry" : "Add Return Entry"}</h4>
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
                    value={productId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductId(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value) || 0)}
                    min="1"
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="reason">Reason</label>
                  <input
                    type="text"
                    id="reason"
                    value={reason}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReason(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h5>Return Details</h5>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="condition">Condition</label>
                  <select
                    id="condition"
                    value={condition}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCondition(e.target.value as any)}
                    required
                    className="form-control"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="warehouseLocation">Warehouse Location</label>
                  <input
                    type="text"
                    id="warehouseLocation"
                    value={warehouseLocation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWarehouseLocation(e.target.value)}
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="returnedBy">Returned By</label>
                  <input
                    type="text"
                    id="returnedBy"
                    value={returnedBy}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReturnedBy(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="returnDate">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReturnDate(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h5>Status & Notes</h5>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as any)}
                    required
                    className="form-control"
                  >
                    <option value="pending">Pending</option>
                    <option value="processed">Processed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                  rows={3}
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <Button
                title="Cancel"
                type="button"
                className="modern-btn modern-btn-secondary"
                onClick={onClose}
              />
              <Button
                title={entry ? "Update Entry" : "Add Entry"}
                type="submit"
                className="modern-btn modern-btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReturnEntryModal;