import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import Button from "../../components/core/Button/Button";
import { Tabs, Tab, Box, Badge, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InventoryList from "../../components/Inventory/InventoryList/InventoryList";
import SupplierList from "../../components/Inventory/SupplierList/SupplierList";
import InventoryAlerts from "../../components/Inventory/InventoryAlerts/InventoryAlerts";
import ReorderRequests from "../../components/Inventory/ReorderRequests/ReorderRequests";
import WarehouseLocations from "../../components/Inventory/WarehouseLocations/WarehouseLocations";
import ReturnEntries from "../../components/Inventory/ReturnEntries/ReturnEntries";
import DamageEntries from "../../components/Inventory/DamageEntries/DamageEntries";
import AddInventoryItemModal from "../../components/Inventory/AddInventoryItemModal/AddInventoryItemModal";
import AddSupplierModal from "../../components/Inventory/AddSupplierModal/AddSupplierModal";
import AddWarehouseLocationModal from "../../components/Inventory/AddWarehouseLocationModal/AddWarehouseLocationModal";
import AddReturnEntryModal from "../../components/Inventory/AddReturnEntryModal";
import AddDamageEntryModal from "../../components/Inventory/AddDamageEntryModal";
import { 
  fetchInventoryItems, 
  fetchSuppliers, 
  fetchInventoryAlerts, 
  fetchReorderRequests,
  fetchWarehouseLocations,
  fetchReturnEntries,
  fetchDamageEntries,
  addReturnEntry,
  addDamageEntry
} from "../../redux/actions/inventory/inventoryActions";
import "./inventory.scss";

const Inventory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { 
    inventoryItems, 
    suppliers, 
    alerts, 
    reorderRequests, 
    warehouseLocations,
    returnEntries,
    damageEntries
  } = useSelector((state: StateType) => state.inventory);
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [showAddReturnModal, setShowAddReturnModal] = useState(false);
  const [showAddDamageModal, setShowAddDamageModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [selectedReturnEntry, setSelectedReturnEntry] = useState<any>(null);
  const [selectedDamageEntry, setSelectedDamageEntry] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchInventoryItems());
    dispatch(fetchSuppliers());
    dispatch(fetchInventoryAlerts());
    dispatch(fetchReorderRequests());
    dispatch(fetchWarehouseLocations());
    dispatch(fetchReturnEntries());
    dispatch(fetchDamageEntries());
  }, [dispatch]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm(""); // Clear search when changing tabs
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setShowAddItemModal(true);
  };

  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setShowAddItemModal(true);
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setShowAddSupplierModal(true);
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowAddSupplierModal(true);
  };

  const handleAddWarehouse = () => {
    setSelectedWarehouse(null);
    setShowAddWarehouseModal(true);
  };

  const handleEditWarehouse = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setShowAddWarehouseModal(true);
  };

  const handleAddReturnEntry = () => {
    setSelectedReturnEntry(null);
    setShowAddReturnModal(true);
  };

  const handleEditReturnEntry = (entry: any) => {
    setSelectedReturnEntry(entry);
    setShowAddReturnModal(true);
  };

  const handleAddDamageEntry = () => {
    setSelectedDamageEntry(null);
    setShowAddDamageModal(true);
  };

  const handleEditDamageEntry = (entry: any) => {
    setSelectedDamageEntry(entry);
    setShowAddDamageModal(true);
  };

  // Handlers for return entries
  const handleDeleteReturnEntry = (id: string) => {
    // Implementation for deleting return entry
    console.log("Delete return entry", id);
  };

  // Handlers for damage entries
  const handleDeleteDamageEntry = (id: string) => {
    // Implementation for deleting damage entry
    console.log("Delete damage entry", id);
  };

  // Submit handlers for new entries
  const handleAddReturnEntrySubmit = (entry: any) => {
    dispatch(addReturnEntry(entry));
  };

  const handleAddDamageEntrySubmit = (entry: any) => {
    dispatch(addDamageEntry(entry));
  };

  // Filter data based on search term
  const getFilteredData = () => {
    switch (activeTab) {
      case 1: // Inventory Items
        return inventoryItems.filter(item => 
          item.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 2: // Suppliers
        return suppliers.filter(supplier => 
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 3: // Reorder Requests
        return reorderRequests.filter(request => 
          request.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 4: // Warehouse Locations
        return warehouseLocations.filter(location => 
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 5: // Return Entries
        return returnEntries.filter(entry => 
          entry.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 6: // Damage Entries
        return damageEntries.filter(entry => 
          entry.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return [];
    }
  };

  return (
    <Pagewrapper>
      <div className="inventory-header modern-dashboard-header">
        <h2 className="inventory-title modern-dashboard-title">Inventory Management</h2>
        <div className="header-actions">
          {activeTab === 0 && (
            <Button 
              title="Add Inventory Item"
              className="modern-btn modern-btn-primary"
              onClick={handleAddItem}
            />
          )}
          {activeTab === 2 && (
            <Button 
              title="Add Supplier"
              className="modern-btn modern-btn-primary"
              onClick={handleAddSupplier}
            />
          )}
          {activeTab === 4 && (
            <Button 
              title="Add Warehouse Location"
              className="modern-btn modern-btn-primary"
              onClick={handleAddWarehouse}
            />
          )}
          {activeTab === 5 && (
            <Button 
              title="Add Return Entry"
              className="modern-btn modern-btn-primary"
              onClick={handleAddReturnEntry}
            />
          )}
          {activeTab === 6 && (
            <Button 
              title="Add Damage Entry"
              className="modern-btn modern-btn-primary"
              onClick={handleAddDamageEntry}
            />
          )}
        </div>
      </div>

      {/* Quick Stats Cards */}
      {activeTab === 1 && (
        <div className="modern-stats-grid">
          <div className="modern-stat-card">
            <div className="modern-stat-title">Total Items</div>
            <div className="modern-stat-value">{inventoryItems.length}</div>
          </div>
          <div className="modern-stat-card">
            <div className="modern-stat-title">Low Stock Items</div>
            <div className="modern-stat-value">
              {inventoryItems.filter(item => item.quantity <= item.reorderLevel).length}
            </div>
          </div>
          <div className="modern-stat-card">
            <div className="modern-stat-title">Out of Stock</div>
            <div className="modern-stat-value">
              {inventoryItems.filter(item => item.quantity === 0).length}
            </div>
          </div>
        </div>
      )}

      <div className="inventory-controls">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="search-field"
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            }
          }}
        />
      </div>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="scrollable"
        scrollButtons="auto"
        className="inventory-tabs"
        sx={{
          borderBottom: "1px solid var(--gray-200)",
          mb: 3,
          "& .MuiTab-root": {
            fontWeight: 500,
            color: "var(--gray-600)",
            textTransform: "none",
            minHeight: "50px",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "var(--primary-color)",
            fontWeight: 600,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--primary-color)",
            height: "3px",
          }
        }}
      >
        <Tab 
          label={
            <Badge badgeContent={alerts.length} color="error">
              <span>Inventory Alerts</span>
            </Badge>
          } 
        />
        <Tab label="Inventory Items" />
        <Tab label="Suppliers" />
        <Tab 
          label={
            <Badge badgeContent={reorderRequests.filter(r => r.status === 'pending').length} color="warning">
              <span>Reorder Requests</span>
            </Badge>
          } 
        />
        <Tab label="Warehouse Locations" />
        <Tab label="Return Entries" />
        <Tab label="Damage Entries" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <div className="modern-card">
            <div className="modern-card-body">
              <InventoryAlerts 
                alerts={alerts} 
                onMarkAsRead={() => {}} 
              />
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="modern-card">
            <div className="modern-card-body">
              <InventoryList 
                items={getFilteredData() as any} 
                onEdit={handleEditItem}
                onDelete={() => {}} 
              />
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="modern-card">
            <div className="modern-card-body">
              <SupplierList 
                suppliers={getFilteredData() as any} 
                onEdit={handleEditSupplier}
                onDelete={() => {}} 
              />
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div className="modern-card">
            <div className="modern-card-body">
              <ReorderRequests 
                requests={reorderRequests} 
                onUpdateStatus={() => {}} 
              />
            </div>
          </div>
        )}
        {activeTab === 4 && (
          <div className="modern-card">
            <div className="modern-card-body">
              <WarehouseLocations 
                locations={warehouseLocations} 
                onEdit={handleEditWarehouse}
                onDelete={() => {}} 
              />
            </div>
          </div>
        )}
        {activeTab === 5 && (
          <div className="modern-card">
            <div className="modern-card-body">
              <ReturnEntries 
                entries={returnEntries} 
                onEdit={handleEditReturnEntry}
                onDelete={handleDeleteReturnEntry} 
              />
            </div>
          </div>
        )}
        {activeTab === 6 && (
          <div className="modern-card">
            <div className="modern-card-body">
              <DamageEntries 
                entries={damageEntries} 
                onEdit={handleEditDamageEntry}
                onDelete={handleDeleteDamageEntry} 
              />
            </div>
          </div>
        )}
      </Box>

      <AddInventoryItemModal
        show={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        item={selectedItem}
      />

      <AddSupplierModal
        show={showAddSupplierModal}
        onClose={() => setShowAddSupplierModal(false)}
        supplier={selectedSupplier}
      />

      <AddWarehouseLocationModal
        show={showAddWarehouseModal}
        onClose={() => setShowAddWarehouseModal(false)}
        location={selectedWarehouse}
      />

      <AddReturnEntryModal
        show={showAddReturnModal}
        onClose={() => setShowAddReturnModal(false)}
        entry={selectedReturnEntry}
        onSubmit={handleAddReturnEntrySubmit}
      />

      <AddDamageEntryModal
        show={showAddDamageModal}
        onClose={() => setShowAddDamageModal(false)}
        entry={selectedDamageEntry}
        onSubmit={handleAddDamageEntrySubmit}
      />
    </Pagewrapper>
  );
};

export default Inventory;