import StatsCard from "../../../cards/StatsCard/StatsCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useSelector } from "react-redux";
import { StateType } from "../../../../redux/redux";

const DashboardAmount = () => {
  const { sales } = useSelector((state: StateType) => state.sales);
  const { amount } = useSelector((state: StateType) => state.customOrder);
  const { totalExpense } = useSelector((state: StateType) => state.expenses);
  
  return (
    <>
      <StatsCard
        title="Total Revenue"
        icon={AttachMoneyIcon}
        number={sales?.total + amount?.totalRevenue}
      />
      <StatsCard
        title="Revenue From Direct Sales"
        icon={AttachMoneyIcon}
        number={sales?.total}
      />
      <StatsCard
        title="Revenue From Custom Order"
        icon={AttachMoneyIcon}
        number={amount?.totalRevenue}
      />
      <StatsCard
        title="Custom Order Advance Payment"
        icon={AttachMoneyIcon}
        number={amount?.advancePayment}
      />
      <StatsCard
        title="Custom Order Full Payment"
        icon={AttachMoneyIcon}
        number={amount?.fullPayment}
      />

      <StatsCard
        title="Total Expense"
        icon={AttachMoneyIcon}
        number={totalExpense}
      />
    </>
  );
};

export default DashboardAmount;
