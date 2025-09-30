import { Sale } from "../Sale/sale";
import { Product } from "./ProductTypes";

export type SearchedProduct = Product & {
  branches: {
    name: string;
    quantity: number;
  }[];
  sales: Sale[];
};
