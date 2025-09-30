import { useParams } from "react-router-dom";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import OrderInformationContent from "../../components/sections/CustomOrder/OrderInformationContent/OrderInformationContent";
import "./orderInfo.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderStatus,
  fetchSingleOrder,
} from "../../redux/actions/customOrder/customOrderAction";
import { StateType } from "../../redux/redux";
import OrderStatusSelector from "../../components/sections/CustomOrder/OrderStatusSelector/OrderStatusSelector";
import { fetchAllProducts } from "../../redux/actions/products/productsAction";
import Button from "../../components/core/Button/Button";
import { toast } from "react-hot-toast";
import { CUSTOM_ORDER_CLEAR_MESSAGE } from "../../constants/reduxActionsNames/customOrder";
import useAdminPermission from "../../hooks/permission/useAdminPermission";

const OrderInformation = () => {
  const isAdmin = useAdminPermission();
  const { products } = useSelector((state: StateType) => state.products);
  const { message, loading, error } = useSelector(
    (state: StateType) => state.customOrder
  );
  const [orderStatus, setOrderStatus] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>();
  const { order } = useSelector((state: StateType) => state.customOrder);
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
    dispatch(fetchAllProducts());
  }, [dispatch, orderId, message]);

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    dispatch({ type: CUSTOM_ORDER_CLEAR_MESSAGE });
  }, [message, error, dispatch]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleChangeOrderStatus = () => {
    dispatch(
      changeOrderStatus(order._id, {
        productIds: [{ id: product, quantity }],
        status: orderStatus,
      })
    );
  };

  const statusSelectorAvailable =
    isAdmin || (!isAdmin && order?.status !== "Order Taken");

  return (
    <Pagewrapper>
      {order && <OrderInformationContent order={order} />}

      {statusSelectorAvailable && (
        <OrderStatusSelector order={order} setOrderStatus={setOrderStatus} />
      )}
      {orderStatus === "Shipped" && (
        <div className="mt-4 productSelector">
          <h4 className="mb-3">Product Information:</h4>
          <div className="form-group">
            <label htmlFor="product">Product:</label>
            <select
              className="form-control"
              id="product"
              value={product}
              onChange={handleProductChange}
            >
              <option value={0} selected>
                Select Product
              </option>
              {products.map((product, index) => (
                <option value={product._id} key={index}>
                  {product.productId} - {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      )}

      {statusSelectorAvailable && (
        <Button
          loading={loading}
          className="mt-3"
          title="Change Status"
          onClick={handleChangeOrderStatus}
        />
      )}
    </Pagewrapper>
  );
};

export default OrderInformation;
