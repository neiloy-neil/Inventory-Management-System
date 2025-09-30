import moment from "moment";
import { useEffect } from "react";
import logo from "../../assets/sisters_furniture_logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleOrder } from "../../redux/actions/customOrder/customOrderAction";
import { useParams } from "react-router-dom";
import { StateType } from "../../redux/redux";

const CustomOrderInvoice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector(
    (state: StateType) => state.customOrder
  );

  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);

  console.log(order, "order...");
  if (loading) return <p>Loading</p>;
  if (order)
    return (
      <div className="invoice">
        <div className="invoice-header">
          <div className="company-logo">
            {/* Your company logo */}
            <img src={logo} alt="The Sisters Furniture Logo" />
          </div>
          <div className="company-details d-flex flex-column gap-2">
            <h2 className="fs-5 fw-semibold">The Sisters Furniture</h2>
            <p>{order?.branch?.address}</p>
            <p>Email: info.sistersfurniture@gmail.com</p>
          </div>
        </div>

        <div className="invoice-content">
          <h1>Invoice</h1>
          <div className="invoice-info mt-3">
            <div className="info-block">
              <span className="info-label">Custom Order Number:</span>
              <span className="info-value">#{order?.orderId}</span>
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
            <span className="info-value">{order?.customerName}</span>
          </div>
          <div className="info-block my-3">
            <span className="info-label">Order Status:</span>
            <span className="info-value">{order?.status}</span>
          </div>

          {order?.status !== "Delivered" ? (
            <div>
              <div className="info-block my-3">
                <span className="info-label">Order Description:</span>
                <span className="info-value">{order?.description}</span>
              </div>
              <div className="info-block my-3">
                <span className="info-label">Wood:</span>
                <span className="info-value">{order?.wood}</span>
              </div>
              <div className="info-block my-3">
                <span className="info-label">Color:</span>
                <span className="info-value">{order?.color}</span>
              </div>
            </div>
          ) : (
            <table className="invoice-items">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}

                {/* Add more invoice items as needed */}
              </tbody>
            </table>
          )}

          <div className="invoice-total">
            <div className="total-block">
              <span className="total-label">Total : ৳ {order.totalPrice}</span>
            </div>
          </div>
          <div className="invoice-total">
            <div className="total-block">
              <span className="total-label">
                Advance Payment : ৳ {order.advancePayment}
              </span>
            </div>
          </div>
          <div className="invoice-total">
            <div className="total-block">
              <span className="total-label">
                Total Payment Recieved :{" "}
                {order?.status === "Delivered"
                  ? `৳ ${order.totalPrice}`
                  : `৳ ${order.advancePayment}`}
              </span>
            </div>
          </div>
          <div className="invoice-total">
            <div className="total-block">
              <span className="total-label">
                Due :{" "}
                {order?.status === "Delivered"
                  ? "৳ 0"
                  : `৳ ${order.totalPrice - order.advancePayment}`}
              </span>
            </div>
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

  return <></>;
};

export default CustomOrderInvoice;
