import { useEffect } from "react";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import DashCharts from "../../components/sections/Dashboard/DashChart/DashCharts";
import DashboardAmount from "../../components/sections/Dashboard/DashboardAmount/DashboardAmount";
import DashboardBranchAndDatePicker from "../../components/sections/Dashboard/DashboardBranchAndDatePicker";
import InventoryAlerts from "../../components/sections/Dashboard/InventoryAlerts/InventoryAlerts";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/redux";
import {
  getPartialPaymentInfo,
  getSales,
} from "../../redux/actions/sales/salesAction";
import { getCustomOrderAmount } from "../../redux/actions/customOrder/customOrderAction";
import { getExpenses } from "../../redux/actions/expenses/expenseAction";
import "./dashboard.scss";
import { Box, Button, Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { branch, fromDate, toDate } = useSelector(
    (state: StateType) => state.dashboard
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const url = `sale/list?startDate=${fromDate}&endDate=${toDate}&branch=${
    branch ? branch : ""
  }`;
  const customOrderAmountUrl = `custom-order/amount?fromDate=${fromDate}&endDate=${toDate}&branchId=${
    branch ? branch : ""
  }`;
  const partialPaymentUrl = `sale/partial-payment/list?startDate=${fromDate}&endDate=${toDate}&branch=${
    branch ? branch : ""
  }`;
  const expensesUrl = `/expense/list?startDate=${fromDate}&endDate=${toDate}&branch=${
    branch ? branch : ""
  }`;

  useEffect(() => {
    refreshData();
  }, [dispatch, url, partialPaymentUrl, customOrderAmountUrl, expensesUrl]);

  const refreshData = () => {
    dispatch(getSales(url));
    dispatch(getPartialPaymentInfo(partialPaymentUrl));
    dispatch(getCustomOrderAmount(customOrderAmountUrl));
    dispatch(getExpenses(expensesUrl));
  };

  const navigateToSales = () => {
    navigate("/sales");
  };

  const navigateToProducts = () => {
    navigate("/products");
  };

  return (
    <Pagewrapper title="Dashboard">
      <div className="modern-dashboard-header">
        <h1 className="modern-dashboard-title">Dashboard Overview</h1>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />} 
            onClick={refreshData}
          >
            Refresh Data
          </Button>
        </Box>
      </div>
      
      <div className="dashboard-controls modern-mb-lg">
        <DashboardBranchAndDatePicker />
      </div>
      
      <div className="modern-stats-grid modern-mb-xl">
        <DashboardAmount />
      </div>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="modern-card modern-fade-in">
            <div className="modern-card-header">
              <h2 className="modern-card-title">Performance Charts</h2>
            </div>
            <div className="modern-card-body">
              <DashCharts />
            </div>
          </div>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <div className="modern-card modern-fade-in">
            <div className="modern-card-header">
              <h2 className="modern-card-title">Quick Actions</h2>
            </div>
            <div className="modern-card-body">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={navigateToSales}
                >
                  View All Sales
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  onClick={navigateToProducts}
                >
                  Manage Products
                </Button>
              </Box>
            </div>
          </div>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <div className="modern-card modern-fade-in">
            <div className="modern-card-header">
              <h2 className="modern-card-title">Inventory Alerts</h2>
            </div>
            <div className="modern-card-body">
              <InventoryAlerts />
            </div>
          </div>
        </Grid>
      </Grid>
    </Pagewrapper>
  );
};

export default Dashboard;