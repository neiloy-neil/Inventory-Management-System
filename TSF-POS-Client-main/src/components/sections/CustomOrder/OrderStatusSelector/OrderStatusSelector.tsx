import { Form } from "react-bootstrap";
import { OrderStatusSelectorType } from "./types";
import { ChangeEvent } from "react";

const OrderStatusSelector = ({
  order,
  setOrderStatus,
}: OrderStatusSelectorType) => {
  const orderStatuses = ["Order Taken", "Shipped", "Delivered"];

  return (
    <div className="orderStatus mt-4">
      <h5>Change Order Status</h5>
      <Form.Select
        className="mt-2"
        aria-label="Default select example"
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setOrderStatus(e.target.value)
        }
      >
        {orderStatuses.map((orderStatus, index) => {
          return (
            <option
              value={orderStatus}
              key={index}
              disabled={
                ((order?.status === "Shipped" ||
                  order?.status === "Delivered") &&
                  orderStatus === "Order Taken") ||
                order?.status === "Delivered" ||
                (order?.status === "Order Taken" && orderStatus === "Delivered")
              }
              selected={order?.status === orderStatus}
            >
              {orderStatus}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
};

export default OrderStatusSelector;
