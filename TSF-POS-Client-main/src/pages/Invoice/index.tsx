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
  const { sale, error } = useSelector((state: StateType) => state.sale);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getSale(id));
  }, [id, dispatch]);

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
          <p>{sale.branch.address}</p>
          <p>Email: info.sistersfurniture@gmail.com</p>
        </div>
      </div>

      <div className="invoice-content">
        <h1>Invoice</h1>
        <div className="invoice-info mt-3">
          <div className="info-block">
            <span className="info-label">Invoice Number:</span>
            <span className="info-value">#{sale.saleId}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Date:</span>
            <span className="info-value">
              {moment().format("MMMM D, YYYY")}
            </span>
          </div>
          {/* Add more invoice details as needed */}
        </div>
        <div className="info-block my-3">
          <span className="info-label">Billed To:</span>
          <span className="info-value">{sale.customerName}</span>
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
            {sale.items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>৳{item.unitPrice}৳</td>
                <td>৳{item.quantity * item.unitPrice}</td>
              </tr>
            ))}

            {/* Add more invoice items as needed */}
          </tbody>
        </table>

        <div className="invoice-total">
          {/* Invoice totals (e.g., subtotal, tax, total) */}
          <div className="total-block">
            <span className="total-label">Total : </span>
            <span className="total-value">৳{sale.total}</span>
          </div>
          {/* Add more total blocks as needed */}
        </div>
        <div className="invoice-total">
          {/* Invoice totals (e.g., subtotal, tax, total) */}
          <div className="total-block">
            <span className="total-label">Payment Method : </span>
            <span className="total-value">{sale.paymentMethod}</span>
          </div>
          {/* Add more total blocks as needed */}
        </div>
      </div>

      <div className="invoice-footer">
        {/* Invoice footer content */}
        <p>Thank you for choosing us!</p>
      </div>

      <button onClick={() => window.print()} className="print__button">
        Print Invoice
      </button>
    </div>
  );
};

export default InvoicePage;
