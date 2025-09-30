import CustomOrderChart from "../../../charts/CustomOrderChart/CustomOrderChart";
import SaleChart from "../../../charts/SaleChart/SaleChart";
import "./DashCharts.scss";

const DashCharts = () => {
  return (
    <div className="mt-4 chart__wrapper">
      <div style={{ width: "50%" }}>
        <SaleChart />
      </div>
      <div style={{ width: "50%" }}>
        <CustomOrderChart />
      </div>
    </div>
  );
};

export default DashCharts;
