import React from "react";
import { CustomOrderFromServer } from "../../../../types/CustomOrder/CustomOrderTypes";

export interface OrderStatusSelectorType {
  order: CustomOrderFromServer;
  setOrderStatus: React.Dispatch<React.SetStateAction<string>>;
}
