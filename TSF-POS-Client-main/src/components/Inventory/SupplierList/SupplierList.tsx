import React from "react";
import Button from "../../core/Button/Button";
import { Supplier } from "../../../types/Inventory/inventoryTypes";
import "./supplierList.scss";

interface SupplierListProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

const SupplierList: React.FC<SupplierListProps> = ({ suppliers, onEdit, onDelete }) => {
  if (suppliers.length === 0) {
    return (
      <div className="empty-state">
        <p>No suppliers found.</p>
      </div>
    );
  }

  return (
    <div className="supplier-list fade-in">
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Products Supplied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.contactPerson}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>
                  {supplier.address}, {supplier.city}, {supplier.state} {supplier.zipCode}
                </td>
                <td>{supplier.productsSupplied.length}</td>
                <td>
                  <Button 
                    title="Edit"
                    className="modern-btn modern-btn-outline modern-btn-sm me-2"
                    onClick={() => onEdit(supplier)}
                  />
                  <Button 
                    title="Delete"
                    className="modern-btn modern-btn-danger modern-btn-sm"
                    onClick={() => onDelete(supplier._id)}
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

export default SupplierList;