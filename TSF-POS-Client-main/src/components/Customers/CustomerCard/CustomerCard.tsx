import React from "react";
import Card from "react-bootstrap/Card";
import Button from "../../core/Button/Button";
import { Customer } from "../../../types/Customer/customerTypes";
import "./customerCard.scss";

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onViewDetails: (customer: Customer) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  // Function to get segment color
  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "bronze":
        return "#cd7f32";
      case "silver":
        return "#c0c0c0";
      case "gold":
        return "#ffd700";
      case "platinum":
        return "#e5e4e2";
      default:
        return "#cccccc";
    }
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  return (
    <Card className="customer-card modern-card modern-fade-in">
      <Card.Body>
        <div className="customer-header">
          <div className="customer-info">
            <Card.Title className="customer-name">
              {customer.firstName} {customer.lastName}
            </Card.Title>
            <Card.Subtitle className="customer-email text-muted">
              {customer.email}
            </Card.Subtitle>
          </div>
          <div
            className="customer-segment-badge"
            style={{ backgroundColor: getSegmentColor(customer.segment) }}
          >
            {customer.segment.charAt(0).toUpperCase() + customer.segment.slice(1)}
          </div>
        </div>

        <div className="customer-details">
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{customer.phone}</span>
          </div>
          
          {customer.address && (
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">
                {customer.address}, {customer.city}
              </span>
            </div>
          )}
          
          <div className="detail-row">
            <span className="detail-label">Loyalty Points:</span>
            <span className="detail-value points">{customer.loyaltyPoints}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Total Purchases:</span>
            <span className="detail-value">{customer.totalPurchases}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Total Spent:</span>
            <span className="detail-value total-spent">
              {formatCurrency(customer.totalSpent)}
            </span>
          </div>
        </div>

        <div className="customer-actions modern-flex modern-gap-sm">
          <Button
            title="View"
            className="modern-btn modern-btn-outline modern-btn-sm"
            onClick={() => onViewDetails(customer)}
          />
          <Button
            title="Edit"
            className="modern-btn modern-btn-primary modern-btn-sm"
            onClick={() => onEdit(customer)}
          />
          <Button
            title="Delete"
            className="modern-btn modern-btn-danger modern-btn-sm"
            onClick={() => onDelete(customer._id)}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerCard;