import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../../core/Button/Button";
import { Customer, PurchaseHistory, LoyaltyPointsTransaction } from "../../../types/Customer/customerTypes";
import { fetchCustomerPurchaseHistory } from "../../../redux/actions/customers/customersAction";
import { AppDispatch } from "../../../redux/redux";
import { useDispatch } from "react-redux";

interface CustomerDetailsModalProps {
  customer: Customer | null;
  show: boolean;
  onHide: () => void;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  customer,
  show,
  onHide,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  // const [loyaltyTransactions, setLoyaltyTransactions] = useState<LoyaltyPointsTransaction[]>([]); // Commented out unused variable
  const [activeTab, setActiveTab] = useState<"details" | "purchases" | "loyalty">("details");

  useEffect(() => {
    if (customer && show) {
      // Fetch purchase history
      dispatch(fetchCustomerPurchaseHistory(customer._id))
        .then((history: any) => {
          setPurchaseHistory(history || []);
        })
        .catch((error: any) => {
          console.error("Failed to fetch purchase history:", error);
        });
      
      // In a real app, you would also fetch loyalty transactions
      // setLoyaltyTransactions(transactions);
    }
  }, [customer, show, dispatch]);

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  // Function to format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!customer) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" className="customer-details-modal">
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="customer-details-tabs modern-flex modern-gap-md modern-mb-md">
          <button
            className={`tab-button modern-btn ${activeTab === "details" ? "modern-btn-primary" : "modern-btn-outline"}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`tab-button modern-btn ${activeTab === "purchases" ? "modern-btn-primary" : "modern-btn-outline"}`}
            onClick={() => setActiveTab("purchases")}
          >
            Purchase History
          </button>
          <button
            className={`tab-button modern-btn ${activeTab === "loyalty" ? "modern-btn-primary" : "modern-btn-outline"}`}
            onClick={() => setActiveTab("loyalty")}
          >
            Loyalty Points
          </button>
        </div>

        {activeTab === "details" && (
          <div className="customer-details-content">
            <div className="customer-basic-info modern-grid modern-grid-cols-2 md:modern-grid-cols-3 modern-gap-lg">
              <div className="info-group">
                <h6 className="info-label">Full Name</h6>
                <p className="info-value">{customer.firstName} {customer.lastName}</p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Email</h6>
                <p className="info-value">{customer.email}</p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Phone</h6>
                <p className="info-value">{customer.phone}</p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Segment</h6>
                <p className="info-value">
                  <span className="segment-badge">{customer.segment}</span>
                </p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Loyalty Points</h6>
                <p className="info-value points">{customer.loyaltyPoints}</p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Total Purchases</h6>
                <p className="info-value">{customer.totalPurchases}</p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Total Spent</h6>
                <p className="info-value total-spent">{formatCurrency(customer.totalSpent)}</p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Last Purchase</h6>
                <p className="info-value">
                  {customer.lastPurchaseDate ? formatDate(customer.lastPurchaseDate) : "N/A"}
                </p>
              </div>
              
              <div className="info-group">
                <h6 className="info-label">Member Since</h6>
                <p className="info-value">{formatDate(customer.createdAt)}</p>
              </div>
            </div>
            
            <div className="customer-address modern-mt-lg">
              <h6 className="info-label">Address</h6>
              <p className="info-value">
                {customer.address ? (
                  <>
                    {customer.address}, {customer.city}, {customer.state} {customer.zipCode}, {customer.country}
                  </>
                ) : (
                  "No address provided"
                )}
              </p>
            </div>
            
            <div className="customer-marketing modern-mt-md">
              <h6 className="info-label">Marketing Consent</h6>
              <p className="info-value">
                {customer.marketingConsent ? (
                  <span className="consent-yes">✓ Yes</span>
                ) : (
                  <span className="consent-no">✗ No</span>
                )}
              </p>
            </div>
          </div>
        )}

        {activeTab === "purchases" && (
          <div className="purchase-history-content">
            {purchaseHistory.length > 0 ? (
              <div className="purchase-history-list">
                <table className="modern-table w-100">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseHistory.map((purchase) => (
                      <tr key={purchase._id}>
                        <td>{formatDate(new Date(purchase.purchaseDate))}</td>
                        <td>{purchase.productName}</td>
                        <td>{purchase.quantity}</td>
                        <td>{formatCurrency(purchase.unitPrice)}</td>
                        <td>{formatCurrency(purchase.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-data modern-text-center modern-py-lg">
                <p>No purchase history found for this customer.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "loyalty" && (
          <div className="loyalty-points-content">
            <div className="loyalty-summary modern-flex modern-flex-between modern-mb-lg">
              <div className="loyalty-balance">
                <h6>Current Balance</h6>
                <p className="points-balance">{customer.loyaltyPoints} points</p>
              </div>
              <div className="loyalty-tier">
                <h6>Membership Tier</h6>
                <p className="tier-name">{customer.segment}</p>
              </div>
            </div>
            
            <div className="no-data modern-text-center modern-py-lg">
              <p>No loyalty point transactions found for this customer.</p>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          title="Close"
          className="modern-btn modern-btn-outline"
          onClick={onHide}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailsModal;