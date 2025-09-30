import logo from "../../assets/sisters_furniture_logo.jpeg";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSale } from "../../redux/actions/sale/sale";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/redux";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import "./invoice.scss";

const InvoicePage = () => {
  const { sale, error, loading } = useSelector((state: StateType) => state.sale);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getSale(id));
  }, [id, dispatch]);

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to handle downloading as PDF
  const handleDownloadPDF = () => {
    // For now, we'll just print. In a more advanced implementation, 
    // we could use a library like jsPDF to generate a PDF
    window.print();
  };

  if (loading) return <AlertPopup message="Loading invoice..." />;
  if (error) return <AlertPopup message={error} />;
  if (!sale) return <AlertPopup message={"No Sale Found"} />;
  
  return (
    <div className="invoice">
      <div className="invoice-header">
        <div className="company-logo">
          {/* Your company logo */}
          <img src={logo} alt="The Sisters Furniture Logo" />
        </div>
        <div className="company-details d-flex flex-column gap-2">
          <h2 className="fs-5 fw-semibold">The Sisters Furniture</h2>
          <p>{sale.branch?.address || "Branch address not available"}</p>
          <p>Email: info.sistersfurniture@gmail.com</p>
        </div>
      </div>

      <div className="invoice-content">
        <h1>Invoice</h1>
        <div className="invoice-info mt-3">
          <div className="info-block">
            <span className="info-label">Invoice Number:</span>
            <span className="info-value">#{sale.saleId || "N/A"}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Date:</span>
            <span className="info-value">
              {sale.createdAt ? moment(sale.createdAt).format("MMMM D, YYYY") : moment().format("MMMM D, YYYY")}
            </span>
          </div>
          <div className="info-block">
            <span className="info-label">Customer:</span>
            <span className="info-value">{sale.customerName || "N/A"}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Phone:</span>
            <span className="info-value">{sale.phone || "N/A"}</span>
          </div>
        </div>

        <table className="invoice-items">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sale.items && sale.items.map((item, index) => (
              <tr key={index}>
                <td>{item.id || item._id || index + 1}</td>
                <td>{item.name || "N/A"}</td>
                <td>{item.quantity || 0}</td>
                <td>৳{item.unitPrice || 0}</td>
                <td>৳{(item.quantity || 0) * (item.unitPrice || 0)}</td>
              </tr>
            ))}

            {(!sale.items || sale.items.length === 0) && (
              <tr>
                <td colSpan={5}>No items found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="invoice-total">
          <div className="total-block">
            <span className="total-label">Subtotal:</span>
            <span className="total-value">৳{sale.total || 0}</span>
          </div>
          {sale.discount > 0 && (
            <div className="total-block">
              <span className="total-label">Discount:</span>
              <span className="total-value">৳{sale.discount}</span>
            </div>
          )}
          {sale.tax > 0 && (
            <div className="total-block">
              <span className="total-label">Tax:</span>
              <span className="total-value">৳{sale.tax}</span>
            </div>
          )}
          <div className="total-block">
            <span className="total-label">Total:</span>
            <span className="total-value">৳{sale.total || 0}</span>
          </div>
          <div className="total-block">
            <span className="total-label">Payment Method:</span>
            <span className="total-value">{sale.paymentMethod || "N/A"}</span>
          </div>
          {sale.partialPayment && (
            <div className="total-block">
              <span className="total-label">Partial Payment:</span>
              <span className="total-value">৳{sale.partialPaymentAmount || 0}</span>
            </div>
          )}
        </div>
        
        {sale.note && (
          <div className="invoice-notes">
            <h4>Notes</h4>
            <p>{sale.note}</p>
          </div>
        )}
      </div>

      <div className="invoice-footer">
        <p>Thank you for choosing The Sisters Furniture!</p>
      </div>

      <div className="invoice-actions">
        <button onClick={handlePrint} className="print__button">
          Print Invoice
        </button>
        <button onClick={handleDownloadPDF} className="download__button">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;