import { Sale } from "../../../types/Sale/sale";

export interface GetSaleResponse {
  success: boolean;
  sale: Sale;
}

export interface AddSaleResponse extends GetSaleResponse {
  message: string;
}
