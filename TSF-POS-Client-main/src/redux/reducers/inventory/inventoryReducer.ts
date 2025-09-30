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
  FETCH_RETURN_ENTRIES,
  FETCH_RETURN_ENTRIES_SUCCESS,
  FETCH_RETURN_ENTRIES_ERROR,
  ADD_RETURN_ENTRY,
  ADD_RETURN_ENTRY_SUCCESS,
  ADD_RETURN_ENTRY_ERROR,
  UPDATE_RETURN_ENTRY,
  UPDATE_RETURN_ENTRY_SUCCESS,
  UPDATE_RETURN_ENTRY_ERROR,
  DELETE_RETURN_ENTRY,
  DELETE_RETURN_ENTRY_SUCCESS,
  DELETE_RETURN_ENTRY_ERROR,
  FETCH_DAMAGE_ENTRIES,
  FETCH_DAMAGE_ENTRIES_SUCCESS,
  FETCH_DAMAGE_ENTRIES_ERROR,
  ADD_DAMAGE_ENTRY,
  ADD_DAMAGE_ENTRY_SUCCESS,
  ADD_DAMAGE_ENTRY_ERROR,
  UPDATE_DAMAGE_ENTRY,
  UPDATE_DAMAGE_ENTRY_SUCCESS,
  UPDATE_DAMAGE_ENTRY_ERROR,
  DELETE_DAMAGE_ENTRY,
  DELETE_DAMAGE_ENTRY_SUCCESS,
  DELETE_DAMAGE_ENTRY_ERROR,
  CLEAR_INVENTORY_MESSAGE,
} from "../../../constants/reduxActionsNames/inventory";
import {
  InventoryItem,
  Supplier,
  InventoryAlert,
  ReorderRequest,
  WarehouseLocation,
  ReturnEntry,
  DamageEntry,
} from "../../../types/Inventory/inventoryTypes";

// Define interfaces for the state
export interface InventoryState {
  inventoryItems: InventoryItem[];
  suppliers: Supplier[];
  alerts: InventoryAlert[];
  reorderRequests: ReorderRequest[];
  warehouseLocations: WarehouseLocation[];
  returnEntries: ReturnEntry[];
  damageEntries: DamageEntry[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

// Initial state
const initialState: InventoryState = {
  inventoryItems: [],
  suppliers: [],
  alerts: [],
  reorderRequests: [],
  warehouseLocations: [],
  returnEntries: [],
  damageEntries: [],
  loading: false,
  error: null,
  message: null,
};

// Reducer
const inventoryReducer = (state = initialState, action: any): InventoryState => {
  switch (action.type) {
    // Inventory Items
    case FETCH_INVENTORY_ITEMS:
    case ADD_INVENTORY_ITEM:
    case UPDATE_INVENTORY_ITEM:
    case DELETE_INVENTORY_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case FETCH_INVENTORY_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryItems: action.payload,
      };

    case ADD_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryItems: [...state.inventoryItems, action.payload],
        message: "Inventory item added successfully",
      };

    case UPDATE_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryItems: state.inventoryItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        message: "Inventory item updated successfully",
      };

    case DELETE_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryItems: state.inventoryItems.filter(
          (item) => item._id !== action.payload
        ),
        message: "Inventory item deleted successfully",
      };

    case FETCH_INVENTORY_ITEMS_ERROR:
    case ADD_INVENTORY_ITEM_ERROR:
    case UPDATE_INVENTORY_ITEM_ERROR:
    case DELETE_INVENTORY_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Suppliers
    case FETCH_SUPPLIERS:
    case ADD_SUPPLIER:
    case UPDATE_SUPPLIER:
    case DELETE_SUPPLIER:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case FETCH_SUPPLIERS_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: action.payload,
      };

    case ADD_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: [...state.suppliers, action.payload],
        message: "Supplier added successfully",
      };

    case UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: state.suppliers.map((supplier) =>
          supplier._id === action.payload._id ? action.payload : supplier
        ),
        message: "Supplier updated successfully",
      };

    case DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload
        ),
        message: "Supplier deleted successfully",
      };

    case FETCH_SUPPLIERS_ERROR:
    case ADD_SUPPLIER_ERROR:
    case UPDATE_SUPPLIER_ERROR:
    case DELETE_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Alerts
    case FETCH_INVENTORY_ALERTS:
    case MARK_ALERT_AS_READ:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case FETCH_INVENTORY_ALERTS_SUCCESS:
      return {
        ...state,
        loading: false,
        alerts: action.payload,
      };

    case MARK_ALERT_AS_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        alerts: state.alerts.filter((alert) => alert._id !== action.payload),
        message: "Alert marked as read",
      };

    case FETCH_INVENTORY_ALERTS_ERROR:
    case MARK_ALERT_AS_READ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reorder Requests
    case FETCH_REORDER_REQUESTS:
    case CREATE_REORDER_REQUEST:
    case UPDATE_REORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case FETCH_REORDER_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reorderRequests: action.payload,
      };

    case CREATE_REORDER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        reorderRequests: [...state.reorderRequests, action.payload],
        message: "Reorder request created successfully",
      };

    case UPDATE_REORDER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        reorderRequests: state.reorderRequests.map((request) =>
          request._id === action.payload._id ? action.payload : request
        ),
        message: "Reorder request updated successfully",
      };

    case FETCH_REORDER_REQUESTS_ERROR:
    case CREATE_REORDER_REQUEST_ERROR:
    case UPDATE_REORDER_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Warehouse Locations
    case FETCH_WAREHOUSE_LOCATIONS:
    case ADD_WAREHOUSE_LOCATION:
    case UPDATE_WAREHOUSE_LOCATION:
    case DELETE_WAREHOUSE_LOCATION:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case FETCH_WAREHOUSE_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        warehouseLocations: action.payload,
      };

    case ADD_WAREHOUSE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        warehouseLocations: [...state.warehouseLocations, action.payload],
        message: "Warehouse location added successfully",
      };

    case UPDATE_WAREHOUSE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        warehouseLocations: state.warehouseLocations.map((location) =>
          location._id === action.payload._id ? action.payload : location
        ),
        message: "Warehouse location updated successfully",
      };

    case DELETE_WAREHOUSE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        warehouseLocations: state.warehouseLocations.filter(
          (location) => location._id !== action.payload
        ),
        message: "Warehouse location deleted successfully",
      };

    case FETCH_WAREHOUSE_LOCATIONS_ERROR:
    case ADD_WAREHOUSE_LOCATION_ERROR:
    case UPDATE_WAREHOUSE_LOCATION_ERROR:
    case DELETE_WAREHOUSE_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Return Entries
    case FETCH_RETURN_ENTRIES:
    case ADD_RETURN_ENTRY:
    case UPDATE_RETURN_ENTRY:
    case DELETE_RETURN_ENTRY:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case FETCH_RETURN_ENTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        returnEntries: action.payload,
      };

    case ADD_RETURN_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        returnEntries: [...state.returnEntries, action.payload],
        message: "Return entry added successfully",
      };

    case UPDATE_RETURN_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        returnEntries: state.returnEntries.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        ),
        message: "Return entry updated successfully",
      };

    case DELETE_RETURN_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        returnEntries: state.returnEntries.filter(
          (entry) => entry._id !== action.payload
        ),
        message: "Return entry deleted successfully",
      };

    case FETCH_RETURN_ENTRIES_ERROR:
    case ADD_RETURN_ENTRY_ERROR:
    case UPDATE_RETURN_ENTRY_ERROR:
    case DELETE_RETURN_ENTRY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Damage Entries
    case FETCH_DAMAGE_ENTRIES:
    case ADD_DAMAGE_ENTRY:
    case UPDATE_DAMAGE_ENTRY:
    case DELETE_DAMAGE_ENTRY:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case FETCH_DAMAGE_ENTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        damageEntries: action.payload,
      };

    case ADD_DAMAGE_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        damageEntries: [...state.damageEntries, action.payload],
        message: "Damage entry added successfully",
      };

    case UPDATE_DAMAGE_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        damageEntries: state.damageEntries.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        ),
        message: "Damage entry updated successfully",
      };

    case DELETE_DAMAGE_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        damageEntries: state.damageEntries.filter(
          (entry) => entry._id !== action.payload
        ),
        message: "Damage entry deleted successfully",
      };

    case FETCH_DAMAGE_ENTRIES_ERROR:
    case ADD_DAMAGE_ENTRY_ERROR:
    case UPDATE_DAMAGE_ENTRY_ERROR:
    case DELETE_DAMAGE_ENTRY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_INVENTORY_MESSAGE:
      return {
        ...state,
        message: null,
        error: null,
      };

    default:
      return state;
  }
};

export default inventoryReducer;