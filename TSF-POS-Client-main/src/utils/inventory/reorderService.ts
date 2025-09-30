import { InventoryItem, ReorderRequest } from "../../types/Inventory/inventoryTypes";

/**
 * Service to handle automated reordering based on demand
 */
class ReorderService {
  /**
   * Calculate reorder quantity based on historical demand
   * @param item The inventory item
   * @param averageDailySales Average daily sales for this product
   * @param leadTime Supplier lead time in days
   * @param safetyStock Safety stock level
   * @returns Recommended reorder quantity
   */
  calculateReorderQuantity(
    item: InventoryItem,
    averageDailySales: number,
    leadTime: number,
    safetyStock: number
  ): number {
    // Economic Order Quantity (EOQ) formula
    // EOQ = √(2DS/H) where D = demand, S = ordering cost, H = holding cost
    // For simplicity, we'll use a basic formula based on lead time demand + safety stock
    
    const leadTimeDemand = averageDailySales * leadTime;
    const recommendedQuantity = leadTimeDemand + safetyStock - item.quantity;
    
    // Ensure we don't order negative quantities
    return Math.max(0, Math.ceil(recommendedQuantity));
  }

  /**
   * Check if an item needs reordering
   * @param item The inventory item
   * @returns Boolean indicating if reorder is needed
   */
  needsReordering(item: InventoryItem): boolean {
    return item.quantity <= item.reorderLevel;
  }

  /**
   * Generate reorder request for an item
   * @param item The inventory item
   * @param quantity The quantity to reorder
   * @param requestedBy User requesting the reorder
   * @returns Reorder request object
   */
  generateReorderRequest(
    item: InventoryItem,
    quantity: number,
    requestedBy: string
  ): Omit<ReorderRequest, "_id" | "createdAt" | "updatedAt"> {
    return {
      productId: item.productId,
      productName: `Product ${item.productId}`, // In a real app, this would come from the product data
      currentStock: item.quantity,
      reorderQuantity: quantity,
      supplierId: item.supplierId,
      status: "pending",
      requestedBy,
    };
  }

  /**
   * Check for expired items
   * @param item The inventory item
   * @param daysThreshold Days before expiry to trigger alert
   * @returns Boolean indicating if item is expiring soon
   */
  isExpiringSoon(item: InventoryItem, daysThreshold: number = 30): boolean {
    if (!item.expiryDate) return false;
    
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
  }

  /**
   * Check for expired items
   * @param item The inventory item
   * @returns Boolean indicating if item is expired
   */
  isExpired(item: InventoryItem): boolean {
    if (!item.expiryDate) return false;
    
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    
    return expiryDate < today;
  }
}

export default new ReorderService();