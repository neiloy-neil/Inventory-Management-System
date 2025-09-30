export interface Product {
  _id: string;
  name: string;
  productId: number;
  description: string;
  photo: string;
  wood: string;
  color: string;
  costPrice: number;
  sellPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;

  // these attribute only available in all products req route
  totalStock?: number;
  sales?: number;
  branchStocks?: {
    branchName: string;
    stock: number;
  }[];
  
  // Inventory management fields
  sku?: string;
  batchNumber?: string;
  expiryDate?: string;
  warehouseLocation?: string;
  reorderLevel?: number;
  supplierId?: string;
}

export interface CartProduct extends Product {
  quantity: number;
  availableQuantity: number;
}