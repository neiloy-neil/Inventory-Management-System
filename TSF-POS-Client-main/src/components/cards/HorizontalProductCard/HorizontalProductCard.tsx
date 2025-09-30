import { useDispatch } from "react-redux";
import { CartProduct } from "../../../types/Product/ProductTypes";
import Button from "../../core/Button/Button";
import "./horizontalProductCard.scss";
import {
  CHANGE_PRICE,
  CHANGE_QUANTITY,
} from "../../../constants/reduxActionsNames/cart";
import { toast } from "react-hot-toast";
import { useState } from "react";

const HorizontalProductCard = ({ product }: { product: CartProduct }) => {
  const [sellPrice, setSellPrice] = useState(product.sellPrice);
  const dispatch = useDispatch();

  const handleQuantity = (action: string) => {
    switch (action) {
      case "minus":
        if (product.quantity - 1 <= 0)
          return toast.error("The Minimum Quantity Is 1");
        return dispatch({
          type: CHANGE_QUANTITY,
          payload: { ...product, quantity: product.quantity - 1 },
        });

      case "plus":
        if (product.quantity >= product.availableQuantity)
          return toast.error(
            `The Maximum Quantity Is ${product.availableQuantity}`
          );
        return dispatch({
          type: CHANGE_QUANTITY,
          payload: { ...product, quantity: product.quantity + 1 },
        });
      default:
        return null;
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSellPrice(value);
  };

  const handleNewPrice = () => {
    if (sellPrice < product.costPrice) {
      toast.error("Product Price Is Less Than Cost Price");
      return setSellPrice(product.sellPrice);
    }

    dispatch({ type: CHANGE_PRICE, payload: { ...product, sellPrice } });
    toast.success("Product Price Updated");
  };

  return (
    <div className="sale__list-product p-3 rounded-2 gap-3 ">
      <div className="product__image">
        <img src={`${product?.photo}`} alt="" />
      </div>
      <div className="product__info w-100">
        <p className="product__name mb-3 fs-6 fw-semibold">{product?.name}</p>
        <div className="product__cart d-flex justify-content-between">
          <div className="product__price">
            <input
              type="number"
              value={sellPrice}
              onChange={handlePriceChange}
              className="rounded-5 px-2 border border-primary"
            />
            <Button title="C" onClick={handleNewPrice} />
          </div>
          <div className="product__quantity d-flex align-items-center gap-2">
            <Button title="-" onClick={() => handleQuantity("minus")} />
            <p
              className="quantity"
              style={{ width: "20px", textAlign: "center" }}
            >
              {product?.quantity}
            </p>
            <Button title="+" onClick={() => handleQuantity("plus")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
