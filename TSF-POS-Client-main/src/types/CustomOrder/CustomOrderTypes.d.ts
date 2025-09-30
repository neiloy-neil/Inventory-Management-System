import { Branch } from "../Branch/branchTypes";
import { Product } from "../Product/ProductTypes";

export interface CustomOrderType {
  advancePayment: number;
  color: string;
  customerName: string;
  customerPhone: string;
  description: string;
  totalPrice: number;
  wood: string;
  branch: string;
  photos: FileList | any
}

export interface CustomOrderFromServer {
  _id: string;
  customerName: string;
  customerPhone: number;
  description: string;
  totalPrice: number;
  advancePayment: number;
  orderId: number;
  color: string;
  wood: string;
  deliveredAt?: string;
  branch: Branch;
  products: {
    product: Product;
    quantity: number;
    _id: string;
  }[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: "Order Taken" | "Shipped" | "Delivered";
}
