import { Sale } from "../../../types/Sale/sale";

interface SaleInfo {
  total: number;
  count: number;
  sales: Sale[];
}

interface SalesResponse {
  success: boolean;
  saleInfo: SaleInfo[];
}

interface PartialPaymentResponse {
  success: boolean;
  secondPartialAmountRecived: number;
  secondPartialAmountToBeRecived: number;
}
