import StatsCard from "../../../cards/StatsCard/StatsCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useSelector } from "react-redux";
import { StateType } from "../../../../redux/redux";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import "./dashboard-amount.scss";

const DashboardAmount = () => {
  const { sales } = useSelector((state: StateType) => state.sales);
  const { amount } = useSelector((state: StateType) => state.customOrder);
  const { totalExpense } = useSelector((state: StateType) => state.expenses);
  
  const navigate = useNavigate();

  const handleTotalRevenueClick = () => {
    navigate("/sales");
  };

  const handleDirectSalesClick = () => {
    navigate("/sales");
  };

  const handleCustomOrderClick = () => {
    navigate("/custom-order");
  };

  const handleAdvancePaymentClick = () => {
    navigate("/custom-order");
  };

  const handleFullPaymentClick = () => {
    navigate("/custom-order");
  };

  const handleExpenseClick = () => {
    navigate("/expenses");
  };

  return (
    <>
      <Card onClick={handleTotalRevenueClick} className="modern-stat-card">
        <StatsCard
          title="Total Revenue"
          icon={AttachMoneyIcon}
          number={sales?.total + amount?.totalRevenue}
        />
      </Card>
      
      <Card onClick={handleDirectSalesClick} className="modern-stat-card">
        <StatsCard
          title="Revenue From Direct Sales"
          icon={AttachMoneyIcon}
          number={sales?.total}
        />
      </Card>
      
      <Card onClick={handleCustomOrderClick} className="modern-stat-card">
        <StatsCard
          title="Revenue From Custom Order"
          icon={AttachMoneyIcon}
          number={amount?.totalRevenue}
        />
      </Card>
      
      <Card onClick={handleAdvancePaymentClick} className="modern-stat-card">
        <StatsCard
          title="Custom Order Advance Payment"
          icon={AttachMoneyIcon}
          number={amount?.advancePayment}
        />
      </Card>
      
      <Card onClick={handleFullPaymentClick} className="modern-stat-card">
        <StatsCard
          title="Custom Order Full Payment"
          icon={AttachMoneyIcon}
          number={amount?.fullPayment}
        />
      </Card>

      <Card onClick={handleExpenseClick} className="modern-stat-card">
        <StatsCard
          title="Total Expense"
          icon={AttachMoneyIcon}
          number={totalExpense}
        />
      </Card>
    </>
  );
};

export default DashboardAmount;