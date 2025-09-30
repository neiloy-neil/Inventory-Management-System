import { DataGrid } from "@mui/x-data-grid";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper.js";
import { saleColumns } from "./salesColumns.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../redux/actions/sales/salesAction.js";
import BranchSelector from "../../components/sections/Branch/BranchSelector/BranchSelector.js";
import useAdminPermission from "../../hooks/permission/useAdminPermission.js";
import { StateType } from "../../redux/redux.js";
import moment from "moment";

const Sales = () => {
  const { sales } = useSelector((state: StateType) => state.sales);
  const { user } = useSelector((state: StateType) => state.user);
  const [branchId, setBranchId] = useState(user?.branch ? user.branch : "");
  const dispatch = useDispatch();
  const adminPermission = useAdminPermission();

  useEffect(() => {
    dispatch(getSales(`/sale/list?branch=${branchId}`));
  }, [dispatch, branchId]);

  const row: any = [];

  sales?.sales
    ?.slice()
    .reverse()
    .map((sale: any) => {
      console.log(sale, "sale");
      const productIds = sale.items.map((item: any) => item.id).join(", ");

      row.push({
        ...sale,
        productIds,
        branch: sale?.branch[0]?.name,
        id: sale.saleId,
        date: moment(sale?.createdAt).format("DD-MM-YYYY"),
      });
    });

  return (
    <Pagewrapper title="Sales">
      {adminPermission && <BranchSelector setBranchId={setBranchId} />}
      <DataGrid
        columns={saleColumns}
        rows={row}
        sx={{ height: "80vh", mt: 3 }}
      />
    </Pagewrapper>
  );
};

export default Sales;
