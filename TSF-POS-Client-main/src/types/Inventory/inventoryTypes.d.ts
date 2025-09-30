export interface Supplier {
  _id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  productsSupplied: string[]; // Array of product IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  _id: string;
  productId: string; // Reference to Product
  sku: string;
  batchNumber?: string;
  expiryDate?: Date;
  quantity: number;
  warehouseLocation?: string;
  reorderLevel: number;
  supplierId?: string; // Reference to Supplier
  lastRestockedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryAlert {
  _id: string;
  productId: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  alertType: 'low_stock' | 'expired_soon' | 'out_of_stock';
  warehouseLocation?: string;
  createdAt: Date;
}

export interface ReorderRequest {
  _id: string;
  productId: string;
  productName: string;
  currentStock: number;
  reorderQuantity: number;
  supplierId?: string;
  status: 'pending' | 'ordered' | 'received' | 'cancelled';
  requestedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WarehouseLocation {
  _id: string;
  name: string;
  code: string;
  description?: string;
  capacity?: number;
  currentOccupancy?: number;
  createdAt: Date;
  updatedAt: Date;
}