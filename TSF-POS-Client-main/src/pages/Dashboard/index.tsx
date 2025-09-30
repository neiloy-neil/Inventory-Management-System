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

const Dashboard = () => {
  const { branch, fromDate, toDate } = useSelector(
    (state: StateType) => state.dashboard
  );

  const dispatch = useDispatch();
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
    dispatch(getSales(url));
    dispatch(getPartialPaymentInfo(partialPaymentUrl));
    dispatch(getCustomOrderAmount(customOrderAmountUrl));
    dispatch(getExpenses(expensesUrl));
  }, [dispatch, url, partialPaymentUrl, customOrderAmountUrl, expensesUrl]);

  return (
    <Pagewrapper title="Dashboard">
      <div className="modern-dashboard-header">
        <h1 className="modern-dashboard-title">Dashboard Overview</h1>
      </div>
      <DashboardBranchAndDatePicker />
      <div className="modern-stats-grid">
        <DashboardAmount />
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="modern-chart-container modern-fade-in">
            <div className="modern-chart-header">
              <h2 className="modern-chart-title">Sales Performance</h2>
            </div>
            <DashCharts />
          </div>
        </div>
        <div className="col-md-4">
          <InventoryAlerts />
        </div>
      </div>
    </Pagewrapper>
  );
};

export default Dashboard;