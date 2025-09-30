import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import Button from "../../components/core/Button/Button";
import { Tabs, Tab, Box, Badge } from "@mui/material";
import InventoryList from "../../components/Inventory/InventoryList/InventoryList";
import SupplierList from "../../components/Inventory/SupplierList/SupplierList";
import InventoryAlerts from "../../components/Inventory/InventoryAlerts/InventoryAlerts";
import ReorderRequests from "../../components/Inventory/ReorderRequests/ReorderRequests";
import WarehouseLocations from "../../components/Inventory/WarehouseLocations/WarehouseLocations";
import AddInventoryItemModal from "../../components/Inventory/AddInventoryItemModal/AddInventoryItemModal";
import AddSupplierModal from "../../components/Inventory/AddSupplierModal/AddSupplierModal";
import AddWarehouseLocationModal from "../../components/Inventory/AddWarehouseLocationModal/AddWarehouseLocationModal";
import { 
  fetchInventoryItems, 
  fetchSuppliers, 
  fetchInventoryAlerts, 
  fetchReorderRequests,
  fetchWarehouseLocations
} from "../../redux/actions/inventory/inventoryActions";

const Inventory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { 
    inventoryItems, 
    suppliers, 
    alerts, 
    reorderRequests, 
    warehouseLocations,
    loading
  } = useSelector((state: StateType) => state.inventory);
  
  const [activeTab, setActiveTab] = useState(0);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchInventoryItems());
    dispatch(fetchSuppliers());
    dispatch(fetchInventoryAlerts());
    dispatch(fetchReorderRequests());
    dispatch(fetchWarehouseLocations());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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

  return (
    <Pagewrapper>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="heading">Inventory Management</h2>
        <div>
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
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="scrollable"
        scrollButtons="auto"
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
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
          <InventoryAlerts 
            alerts={alerts} 
            loading={loading} 
            onMarkAsRead={() => {}} 
          />
        )}
        {activeTab === 1 && (
          <InventoryList 
            items={inventoryItems} 
            loading={loading} 
            onEdit={handleEditItem}
            onDelete={() => {}} 
          />
        )}
        {activeTab === 2 && (
          <SupplierList 
            suppliers={suppliers} 
            loading={loading} 
            onEdit={handleEditSupplier}
            onDelete={() => {}} 
          />
        )}
        {activeTab === 3 && (
          <ReorderRequests 
            requests={reorderRequests} 
            loading={loading} 
            onUpdateStatus={() => {}} 
          />
        )}
        {activeTab === 4 && (
          <WarehouseLocations 
            locations={warehouseLocations} 
            loading={loading} 
            onEdit={handleEditWarehouse}
            onDelete={() => {}} 
          />
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
    </Pagewrapper>
  );
};

export default Inventory;