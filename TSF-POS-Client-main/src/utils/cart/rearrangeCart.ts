import { CartProduct } from "../../types/Product/ProductTypes";

export const rearrangeCart = (cart: CartProduct[]) => {
  const rearrangedCart: object[] = [];
  let totalPrice = 0;
  cart.forEach((pd) => {
    totalPrice += pd.sellPrice * pd.quantity;
    rearrangedCart.push({ ...pd, id: pd.productId, unitPrice: pd.sellPrice });
  });
  return { rearrangedCart, totalPrice };
};
