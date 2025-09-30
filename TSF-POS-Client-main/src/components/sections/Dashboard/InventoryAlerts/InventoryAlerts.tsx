import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../../../redux/redux";
import { fetchInventoryAlerts } from "../../../../redux/actions/inventory/inventoryActions";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";

const InventoryAlerts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { alerts, loading } = useSelector((state: StateType) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventoryAlerts());
  }, [dispatch]);

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "low_stock": return "warning";
      case "out_of_stock": return "error";
      case "expired_soon": return "info";
      default: return "default";
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case "low_stock": return "Low Stock";
      case "out_of_stock": return "Out of Stock";
      case "expired_soon": return "Expiring Soon";
      default: return type;
    }
  };

  const criticalAlerts = alerts.filter(alert => 
    alert.alertType === "out_of_stock" || alert.alertType === "low_stock"
  ).slice(0, 5);

  if (criticalAlerts.length === 0) return null;

  return (
    <Card className="modern-dashboard-card">
      <CardContent>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Typography variant="h6" className="modern-card-title">
            Inventory Alerts
          </Typography>
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              View All
            </Button>
          </Link>
        </div>
        <List>
          {criticalAlerts.map((alert) => (
            <ListItem key={alert._id} disableGutters>
              <ListItemText
                primary={alert.productName}
                secondary={
                  <>
                    <Chip 
                      label={getAlertTypeLabel(alert.alertType)} 
                      color={getAlertTypeColor(alert.alertType)} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    Current: {alert.currentStock} | Reorder: {alert.reorderLevel}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default InventoryAlerts;