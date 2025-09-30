import React, { useState, useEffect } from "react";
import Button from "../../core/Button/Button";
import { DamageEntry } from "../../../types/Inventory/inventoryTypes";
import "./addDamageEntryModal.scss";

interface AddDamageEntryModalProps {
  show: boolean;
  onClose: () => void;
  entry?: DamageEntry | null;
  onSubmit: (entry: Omit<DamageEntry, "_id" | "createdAt" | "updatedAt"> | Partial<DamageEntry>) => void;
}

const AddDamageEntryModal: React.FC<AddDamageEntryModalProps> = ({ show, onClose, entry, onSubmit }) => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [damageType, setDamageType] = useState<"physical" | "expiry" | "quality" | "other">("physical");
  const [description, setDescription] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [status, setStatus] = useState<"reported" | "verified" | "resolved">("reported");
  const [resolution, setResolution] = useState("");

  useEffect(() => {
    if (entry) {
      setProductId(entry.productId);
      setProductName(entry.productName);
      setQuantity(entry.quantity);
      setDamageType(entry.damageType);
      setDescription(entry.description);
      setWarehouseLocation(entry.warehouseLocation || "");
      setReportedBy(entry.reportedBy);
      setReportDate(new Date(entry.reportDate).toISOString().split("T")[0]);
      setStatus(entry.status);
      setResolution(entry.resolution || "");
    } else {
      // Reset form for new entry
      setProductId("");
      setProductName("");
      setQuantity(1);
      setDamageType("physical");
      setDescription("");
      setWarehouseLocation("");
      setReportedBy("");
      setReportDate(new Date().toISOString().split("T")[0]);
      setStatus("reported");
      setResolution("");
    }
  }, [entry, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData = {
      productId,
      productName,
      quantity,
      damageType,
      description,
      warehouseLocation: warehouseLocation || undefined,
      reportedBy,
      reportDate: new Date(reportDate),
      status,
      resolution: resolution || undefined,
    };

    onSubmit(entry ? { ...entryData, _id: entry._id } : entryData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>{entry ? "Edit Damage Entry" : "Add Damage Entry"}</h4>
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
                  <label htmlFor="damageType">Damage Type</label>
                  <select
                    id="damageType"
                    value={damageType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDamageType(e.target.value as any)}
                    required
                    className="form-control"
                  >
                    <option value="physical">Physical</option>
                    <option value="expiry">Expiry</option>
                    <option value="quality">Quality</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h5>Damage Details</h5>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  rows={3}
                  required
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h5>Location & Reporting</h5>
              <div className="form-grid">
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
                  <label htmlFor="reportedBy">Reported By</label>
                  <input
                    type="text"
                    id="reportedBy"
                    value={reportedBy}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReportedBy(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="reportDate">Report Date</label>
                  <input
                    type="date"
                    id="reportDate"
                    value={reportDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReportDate(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as any)}
                    required
                    className="form-control"
                  >
                    <option value="reported">Reported</option>
                    <option value="verified">Verified</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h5>Resolution</h5>
              <div className="form-group">
                <label htmlFor="resolution">Resolution</label>
                <textarea
                  id="resolution"
                  value={resolution}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setResolution(e.target.value)}
                  rows={2}
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

export default AddDamageEntryModal;