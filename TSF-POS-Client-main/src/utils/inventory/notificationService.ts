import { toast } from "react-hot-toast";
import { InventoryAlert } from "../../types/Inventory/inventoryTypes";

/**
 * Service to handle inventory notifications and alerts
 */
class NotificationService {
  /**
   * Show low stock alert
   * @param productName Name of the product
   * @param currentStock Current stock level
   * @param reorderLevel Reorder level
   */
  showLowStockAlert(productName: string, currentStock: number, reorderLevel: number): void {
    toast.error(
      `Low Stock Alert: ${productName} is running low (${currentStock} left). Reorder level is ${reorderLevel}.`,
      {
        duration: 10000,
        position: "top-right",
      }
    );
  }

  /**
   * Show out of stock alert
   * @param productName Name of the product
   */
  showOutOfStockAlert(productName: string): void {
    toast.error(
      `Out of Stock Alert: ${productName} is out of stock!`,
      {
        duration: 10000,
        position: "top-right",
      }
    );
  }

  /**
   * Show expiry alert
   * @param productName Name of the product
   * @param daysUntilExpiry Days until expiry
   */
  showExpiryAlert(productName: string, daysUntilExpiry: number): void {
    toast.error(
      `Expiry Alert: ${productName} expires in ${daysUntilExpiry} days!`,
      {
        duration: 10000,
        position: "top-right",
      }
    );
  }

  /**
   * Show reorder request created notification
   * @param productName Name of the product
   * @param quantity Quantity requested
   */
  showReorderRequestNotification(productName: string, quantity: number): void {
    toast.success(
      `Reorder request created for ${quantity} units of ${productName}`,
      {
        duration: 5000,
        position: "top-right",
      }
    );
  }

  /**
   * Generate inventory alert object
   * @param productId Product ID
   * @param productName Product name
   * @param currentStock Current stock level
   * @param reorderLevel Reorder level
   * @param alertType Type of alert
   * @param warehouseLocation Warehouse location
   * @returns Inventory alert object
   */
  generateAlert(
    productId: string,
    productName: string,
    currentStock: number,
    reorderLevel: number,
    alertType: 'low_stock' | 'out_of_stock' | 'expired_soon',
    warehouseLocation?: string
  ): Omit<InventoryAlert, "_id"> {
    return {
      productId,
      productName,
      currentStock,
      reorderLevel,
      alertType,
      warehouseLocation,
      createdAt: new Date(),
    };
  }
}

export default new NotificationService();