import axios from "axios";
import { 
  FETCH_INVENTORY_ITEMS,
  FETCH_INVENTORY_ITEMS_SUCCESS,
  FETCH_INVENTORY_ITEMS_ERROR,
  ADD_INVENTORY_ITEM,
  ADD_INVENTORY_ITEM_SUCCESS,
  ADD_INVENTORY_ITEM_ERROR,
  UPDATE_INVENTORY_ITEM,
  UPDATE_INVENTORY_ITEM_SUCCESS,
  UPDATE_INVENTORY_ITEM_ERROR,
  DELETE_INVENTORY_ITEM,
  DELETE_INVENTORY_ITEM_SUCCESS,
  DELETE_INVENTORY_ITEM_ERROR,
  FETCH_SUPPLIERS,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_ERROR,
  ADD_SUPPLIER,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_ERROR,
  UPDATE_SUPPLIER,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_ERROR,
  DELETE_SUPPLIER,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_ERROR,
  FETCH_INVENTORY_ALERTS,
  FETCH_INVENTORY_ALERTS_SUCCESS,
  FETCH_INVENTORY_ALERTS_ERROR,
  MARK_ALERT_AS_READ,
  MARK_ALERT_AS_READ_SUCCESS,
  MARK_ALERT_AS_READ_ERROR,
  FETCH_REORDER_REQUESTS,
  FETCH_REORDER_REQUESTS_SUCCESS,
  FETCH_REORDER_REQUESTS_ERROR,
  CREATE_REORDER_REQUEST,
  CREATE_REORDER_REQUEST_SUCCESS,
  CREATE_REORDER_REQUEST_ERROR,
  UPDATE_REORDER_REQUEST,
  UPDATE_REORDER_REQUEST_SUCCESS,
  UPDATE_REORDER_REQUEST_ERROR,
  FETCH_WAREHOUSE_LOCATIONS,
  FETCH_WAREHOUSE_LOCATIONS_SUCCESS,
  FETCH_WAREHOUSE_LOCATIONS_ERROR,
  ADD_WAREHOUSE_LOCATION,
  ADD_WAREHOUSE_LOCATION_SUCCESS,
  ADD_WAREHOUSE_LOCATION_ERROR,
  UPDATE_WAREHOUSE_LOCATION,
  UPDATE_WAREHOUSE_LOCATION_SUCCESS,
  UPDATE_WAREHOUSE_LOCATION_ERROR,
  DELETE_WAREHOUSE_LOCATION,
  DELETE_WAREHOUSE_LOCATION_SUCCESS,
  DELETE_WAREHOUSE_LOCATION_ERROR,
  CLEAR_INVENTORY_MESSAGE,
} from "../../../constants/reduxActionsNames/inventory";

// Types
import {
  InventoryItem,
  Supplier,
  InventoryAlert,
  ReorderRequest,
  WarehouseLocation,
} from "../../../types/Inventory/inventoryTypes";

// Action creators
export const fetchInventoryItems = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_INVENTORY_ITEMS });
    
    // Mock data for now - replace with actual API call
    const mockData: InventoryItem[] = [
      {
        _id: "1",
        productId: "product1",
        sku: "SKU001",
        batchNumber: "BATCH001",
        expiryDate: new Date("2024-12-31"),
        quantity: 50,
        warehouseLocation: "WH-01",
        reorderLevel: 20,
        supplierId: "supplier1",
        lastRestockedDate: new Date("2023-01-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "2",
        productId: "product2",
        sku: "SKU002",
        batchNumber: "BATCH002",
        expiryDate: new Date("2024-06-30"),
        quantity: 5,
        warehouseLocation: "WH-02",
        reorderLevel: 10,
        supplierId: "supplier2",
        lastRestockedDate: new Date("2023-01-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    dispatch({
      type: FETCH_INVENTORY_ITEMS_SUCCESS,
      payload: mockData,
    });
  } catch (error: any) {
    dispatch({
      type: FETCH_INVENTORY_ITEMS_ERROR,
      payload: error.message || "Failed to fetch inventory items",
    });
  }
};

export const addInventoryItem = (item: Omit<InventoryItem, "_id" | "createdAt" | "updatedAt">) => async (dispatch: any) => {
  try {
    dispatch({ type: ADD_INVENTORY_ITEM });
    
    // Mock response - replace with actual API call
    const newItem: InventoryItem = {
      ...item,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    dispatch({
      type: ADD_INVENTORY_ITEM_SUCCESS,
      payload: newItem,
    });
    
    return Promise.resolve(newItem);
  } catch (error: any) {
    dispatch({
      type: ADD_INVENTORY_ITEM_ERROR,
      payload: error.message || "Failed to add inventory item",
    });
    
    return Promise.reject(error);
  }
};

export const updateInventoryItem = (id: string, item: Partial<InventoryItem>) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_INVENTORY_ITEM });
    
    // Mock response - replace with actual API call
    const updatedItem: InventoryItem = {
      ...(item as InventoryItem),
      _id: id,
      updatedAt: new Date(),
    };
    
    dispatch({
      type: UPDATE_INVENTORY_ITEM_SUCCESS,
      payload: updatedItem,
    });
    
    return Promise.resolve(updatedItem);
  } catch (error: any) {
    dispatch({
      type: UPDATE_INVENTORY_ITEM_ERROR,
      payload: error.message || "Failed to update inventory item",
    });
    
    return Promise.reject(error);
  }
};

export const deleteInventoryItem = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_INVENTORY_ITEM });
    
    // Mock response - replace with actual API call
    dispatch({
      type: DELETE_INVENTORY_ITEM_SUCCESS,
      payload: id,
    });
    
    return Promise.resolve();
  } catch (error: any) {
    dispatch({
      type: DELETE_INVENTORY_ITEM_ERROR,
      payload: error.message || "Failed to delete inventory item",
    });
    
    return Promise.reject(error);
  }
};

export const fetchSuppliers = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_SUPPLIERS });
    
    // Mock data for now - replace with actual API call
    const mockData: Supplier[] = [
      {
        _id: "supplier1",
        name: "ABC Furniture Suppliers",
        contactPerson: "John Smith",
        email: "john@abc.com",
        phone: "+1234567890",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        productsSupplied: ["product1", "product3"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "supplier2",
        name: "XYZ Woodworks",
        contactPerson: "Jane Doe",
        email: "jane@xyz.com",
        phone: "+1987654321",
        address: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "USA",
        productsSupplied: ["product2", "product4"],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    dispatch({
      type: FETCH_SUPPLIERS_SUCCESS,
      payload: mockData,
    });
  } catch (error: any) {
    dispatch({
      type: FETCH_SUPPLIERS_ERROR,
      payload: error.message || "Failed to fetch suppliers",
    });
  }
};

export const addSupplier = (supplier: Omit<Supplier, "_id" | "createdAt" | "updatedAt">) => async (dispatch: any) => {
  try {
    dispatch({ type: ADD_SUPPLIER });
    
    // Mock response - replace with actual API call
    const newSupplier: Supplier = {
      ...supplier,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    dispatch({
      type: ADD_SUPPLIER_SUCCESS,
      payload: newSupplier,
    });
    
    return Promise.resolve(newSupplier);
  } catch (error: any) {
    dispatch({
      type: ADD_SUPPLIER_ERROR,
      payload: error.message || "Failed to add supplier",
    });
    
    return Promise.reject(error);
  }
};

export const updateSupplier = (id: string, supplier: Partial<Supplier>) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_SUPPLIER });
    
    // Mock response - replace with actual API call
    const updatedSupplier: Supplier = {
      ...(supplier as Supplier),
      _id: id,
      updatedAt: new Date(),
    };
    
    dispatch({
      type: UPDATE_SUPPLIER_SUCCESS,
      payload: updatedSupplier,
    });
    
    return Promise.resolve(updatedSupplier);
  } catch (error: any) {
    dispatch({
      type: UPDATE_SUPPLIER_ERROR,
      payload: error.message || "Failed to update supplier",
    });
    
    return Promise.reject(error);
  }
};

export const deleteSupplier = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_SUPPLIER });
    
    // Mock response - replace with actual API call
    dispatch({
      type: DELETE_SUPPLIER_SUCCESS,
      payload: id,
    });
    
    return Promise.resolve();
  } catch (error: any) {
    dispatch({
      type: DELETE_SUPPLIER_ERROR,
      payload: error.message || "Failed to delete supplier",
    });
    
    return Promise.reject(error);
  }
};

export const fetchInventoryAlerts = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_INVENTORY_ALERTS });
    
    // Mock data for now - replace with actual API call
    const mockData: InventoryAlert[] = [
      {
        _id: "alert1",
        productId: "product1",
        productName: "Office Chair",
        currentStock: 5,
        reorderLevel: 10,
        alertType: "low_stock",
        warehouseLocation: "WH-01",
        createdAt: new Date(),
      },
      {
        _id: "alert2",
        productId: "product2",
        productName: "Wooden Desk",
        currentStock: 0,
        reorderLevel: 5,
        alertType: "out_of_stock",
        warehouseLocation: "WH-02",
        createdAt: new Date(),
      }
    ];
    
    dispatch({
      type: FETCH_INVENTORY_ALERTS_SUCCESS,
      payload: mockData,
    });
  } catch (error: any) {
    dispatch({
      type: FETCH_INVENTORY_ALERTS_ERROR,
      payload: error.message || "Failed to fetch inventory alerts",
    });
  }
};

export const markAlertAsRead = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: MARK_ALERT_AS_READ });
    
    // Mock response - replace with actual API call
    dispatch({
      type: MARK_ALERT_AS_READ_SUCCESS,
      payload: id,
    });
    
    return Promise.resolve();
  } catch (error: any) {
    dispatch({
      type: MARK_ALERT_AS_READ_ERROR,
      payload: error.message || "Failed to mark alert as read",
    });
    
    return Promise.reject(error);
  }
};

export const fetchReorderRequests = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_REORDER_REQUESTS });
    
    // Mock data for now - replace with actual API call
    const mockData: ReorderRequest[] = [
      {
        _id: "req1",
        productId: "product1",
        productName: "Office Chair",
        currentStock: 5,
        reorderQuantity: 20,
        supplierId: "supplier1",
        status: "pending",
        requestedBy: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "req2",
        productId: "product2",
        productName: "Wooden Desk",
        currentStock: 0,
        reorderQuantity: 10,
        supplierId: "supplier2",
        status: "ordered",
        requestedBy: "manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    dispatch({
      type: FETCH_REORDER_REQUESTS_SUCCESS,
      payload: mockData,
    });
  } catch (error: any) {
    dispatch({
      type: FETCH_REORDER_REQUESTS_ERROR,
      payload: error.message || "Failed to fetch reorder requests",
    });
  }
};

export const createReorderRequest = (request: Omit<ReorderRequest, "_id" | "createdAt" | "updatedAt">) => async (dispatch: any) => {
  try {
    dispatch({ type: CREATE_REORDER_REQUEST });
    
    // Mock response - replace with actual API call
    const newRequest: ReorderRequest = {
      ...request,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    dispatch({
      type: CREATE_REORDER_REQUEST_SUCCESS,
      payload: newRequest,
    });
    
    return Promise.resolve(newRequest);
  } catch (error: any) {
    dispatch({
      type: CREATE_REORDER_REQUEST_ERROR,
      payload: error.message || "Failed to create reorder request",
    });
    
    return Promise.reject(error);
  }
};

export const updateReorderRequest = (id: string, request: Partial<ReorderRequest>) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_REORDER_REQUEST });
    
    // Mock response - replace with actual API call
    const updatedRequest: ReorderRequest = {
      ...(request as ReorderRequest),
      _id: id,
      updatedAt: new Date(),
    };
    
    dispatch({
      type: UPDATE_REORDER_REQUEST_SUCCESS,
      payload: updatedRequest,
    });
    
    return Promise.resolve(updatedRequest);
  } catch (error: any) {
    dispatch({
      type: UPDATE_REORDER_REQUEST_ERROR,
      payload: error.message || "Failed to update reorder request",
    });
    
    return Promise.reject(error);
  }
};

export const fetchWarehouseLocations = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_WAREHOUSE_LOCATIONS });
    
    // Mock data for now - replace with actual API call
    const mockData: WarehouseLocation[] = [
      {
        _id: "wh1",
        name: "Main Warehouse",
        code: "WH-01",
        description: "Primary storage facility",
        capacity: 10000,
        currentOccupancy: 7500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "wh2",
        name: "Secondary Warehouse",
        code: "WH-02",
        description: "Backup storage facility",
        capacity: 5000,
        currentOccupancy: 3200,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    dispatch({
      type: FETCH_WAREHOUSE_LOCATIONS_SUCCESS,
      payload: mockData,
    });
  } catch (error: any) {
    dispatch({
      type: FETCH_WAREHOUSE_LOCATIONS_ERROR,
      payload: error.message || "Failed to fetch warehouse locations",
    });
  }
};

export const addWarehouseLocation = (location: Omit<WarehouseLocation, "_id" | "createdAt" | "updatedAt">) => async (dispatch: any) => {
  try {
    dispatch({ type: ADD_WAREHOUSE_LOCATION });
    
    // Mock response - replace with actual API call
    const newLocation: WarehouseLocation = {
      ...location,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    dispatch({
      type: ADD_WAREHOUSE_LOCATION_SUCCESS,
      payload: newLocation,
    });
    
    return Promise.resolve(newLocation);
  } catch (error: any) {
    dispatch({
      type: ADD_WAREHOUSE_LOCATION_ERROR,
      payload: error.message || "Failed to add warehouse location",
    });
    
    return Promise.reject(error);
  }
};

export const updateWarehouseLocation = (id: string, location: Partial<WarehouseLocation>) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_WAREHOUSE_LOCATION });
    
    // Mock response - replace with actual API call
    const updatedLocation: WarehouseLocation = {
      ...(location as WarehouseLocation),
      _id: id,
      updatedAt: new Date(),
    };
    
    dispatch({
      type: UPDATE_WAREHOUSE_LOCATION_SUCCESS,
      payload: updatedLocation,
    });
    
    return Promise.resolve(updatedLocation);
  } catch (error: any) {
    dispatch({
      type: UPDATE_WAREHOUSE_LOCATION_ERROR,
      payload: error.message || "Failed to update warehouse location",
    });
    
    return Promise.reject(error);
  }
};

export const deleteWarehouseLocation = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_WAREHOUSE_LOCATION });
    
    // Mock response - replace with actual API call
    dispatch({
      type: DELETE_WAREHOUSE_LOCATION_SUCCESS,
      payload: id,
    });
    
    return Promise.resolve();
  } catch (error: any) {
    dispatch({
      type: DELETE_WAREHOUSE_LOCATION_ERROR,
      payload: error.message || "Failed to delete warehouse location",
    });
    
    return Promise.reject(error);
  }
};

export const clearInventoryMessage = () => (dispatch: any) => {
  dispatch({ type: CLEAR_INVENTORY_MESSAGE });
};