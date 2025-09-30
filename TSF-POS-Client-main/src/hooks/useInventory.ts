import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../redux/redux";
import {
  fetchInventoryItems,
  fetchSuppliers,
  fetchInventoryAlerts,
  fetchReorderRequests,
  fetchWarehouseLocations,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  addWarehouseLocation,
  updateWarehouseLocation,
  deleteWarehouseLocation,
  createReorderRequest,
  updateReorderRequest,
  markAlertAsRead,
} from "../redux/actions/inventory/inventoryActions";
import { InventoryItem, Supplier, WarehouseLocation, ReorderRequest } from "../types/Inventory/inventoryTypes";
import reorderService from "../utils/inventory/reorderService";
import notificationService from "../utils/inventory/notificationService";

/**
 * Custom hook for inventory management
 */
export const useInventory = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    inventoryItems,
    suppliers,
    alerts,
    reorderRequests,
    warehouseLocations,
    loading,
    error,
    message,
  } = useSelector((state: StateType) => state.inventory);

  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all inventory data
  useEffect(() => {
    dispatch(fetchInventoryItems());
    dispatch(fetchSuppliers());
    dispatch(fetchInventoryAlerts());
    dispatch(fetchReorderRequests());
    dispatch(fetchWarehouseLocations());
  }, [dispatch]);

  // Filter items based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(inventoryItems);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = inventoryItems.filter(
        (item) =>
          item.productId.toLowerCase().includes(term) ||
          item.sku?.toLowerCase().includes(term) ||
          item.batchNumber?.toLowerCase().includes(term)
      );
      setFilteredItems(filtered);
    }
  }, [inventoryItems, searchTerm]);

  // Check for low stock items and create alerts
  useEffect(() => {
    inventoryItems.forEach((item) => {
      if (reorderService.needsReordering(item)) {
        // In a real implementation, this would dispatch an action to create an alert
        if (item.quantity === 0) {
          notificationService.showOutOfStockAlert(`Product ${item.productId}`);
        } else {
          notificationService.showLowStockAlert(
            `Product ${item.productId}`,
            item.quantity,
            item.reorderLevel
          );
        }
      }
    });
  }, [inventoryItems]);

  // CRUD operations for inventory items
  const addItem = async (item: Omit<InventoryItem, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const result = await dispatch(addInventoryItem(item));
      return result;
    } catch (err) {
      throw err;
    }
  };

  const updateItem = async (id: string, item: Partial<InventoryItem>) => {
    try {
      const result = await dispatch(updateInventoryItem(id, item));
      return result;
    } catch (err) {
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await dispatch(deleteInventoryItem(id));
    } catch (err) {
      throw err;
    }
  };

  // CRUD operations for suppliers
  const addSupplierItem = async (supplier: Omit<Supplier, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const result = await dispatch(addSupplier(supplier));
      return result;
    } catch (err) {
      throw err;
    }
  };

  const updateSupplierItem = async (id: string, supplier: Partial<Supplier>) => {
    try {
      const result = await dispatch(updateSupplier(id, supplier));
      return result;
    } catch (err) {
      throw err;
    }
  };

  const deleteSupplierItem = async (id: string) => {
    try {
      await dispatch(deleteSupplier(id));
    } catch (err) {
      throw err;
    }
  };

  // CRUD operations for warehouse locations
  const addWarehouse = async (location: Omit<WarehouseLocation, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const result = await dispatch(addWarehouseLocation(location));
      return result;
    } catch (err) {
      throw err;
    }
  };

  const updateWarehouse = async (id: string, location: Partial<WarehouseLocation>) => {
    try {
      const result = await dispatch(updateWarehouseLocation(id, location));
      return result;
    } catch (err) {
      throw err;
    }
  };

  const deleteWarehouse = async (id: string) => {
    try {
      await dispatch(deleteWarehouseLocation(id));
    } catch (err) {
      throw err;
    }
  };

  // Reorder operations
  const createReorder = async (request: Omit<ReorderRequest, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const result = await dispatch(createReorderRequest(request));
      notificationService.showReorderRequestNotification(
        request.productName,
        request.reorderQuantity
      );
      return result;
    } catch (err) {
      throw err;
    }
  };

  const updateReorder = async (id: string, request: Partial<ReorderRequest>) => {
    try {
      const result = await dispatch(updateReorderRequest(id, request));
      return result;
    } catch (err) {
      throw err;
    }
  };

  // Alert operations
  const markAlertRead = async (id: string) => {
    try {
      await dispatch(markAlertAsRead(id));
    } catch (err) {
      throw err;
    }
  };

  // Calculate reorder quantity
  const calculateReorderQty = (
    item: InventoryItem,
    averageDailySales: number,
    leadTime: number,
    safetyStock: number
  ) => {
    return reorderService.calculateReorderQuantity(
      item,
      averageDailySales,
      leadTime,
      safetyStock
    );
  };

  return {
    // Data
    inventoryItems: filteredItems,
    suppliers,
    alerts,
    reorderRequests,
    warehouseLocations,
    loading,
    error,
    message,
    
    // State
    searchTerm,
    setSearchTerm,
    
    // Operations
    addItem,
    updateItem,
    deleteItem,
    addSupplierItem,
    updateSupplierItem,
    deleteSupplierItem,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
    createReorder,
    updateReorder,
    markAlertRead,
    calculateReorderQty,
  };
};