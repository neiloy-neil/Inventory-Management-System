import { Product } from "../Product/ProductTypes";

export interface ShortBranchType {
  _id: string;
  name: string;
  address: string;
}

export interface Branch {
  _id: string;
  name: string;
  address: string;
  moderators: Moderator[];
  __v: number;
  products: {
    id: Product;
    quantity: number;
    _id: string;
  }[];
}
