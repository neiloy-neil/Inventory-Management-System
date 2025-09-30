import { Product } from "../../../types/Product/ProductTypes";

export interface GetAllProductsResponse {
  success: boolean;
  products: Product[];
}
