export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  loyaltyPoints: number;
  totalPurchases: number;
  totalSpent: number;
  lastPurchaseDate?: Date;
  segment: 'bronze' | 'silver' | 'gold' | 'platinum';
  marketingConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  marketingConsent: boolean;
}

export interface PurchaseHistory {
  _id: string;
  customerId: string;
  saleId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purchaseDate: Date;
  branch: string;
}

export interface LoyaltyPointsTransaction {
  _id: string;
  customerId: string;
  points: number;
  transactionType: 'earned' | 'redeemed';
  reason: string;
  createdAt: Date;
}