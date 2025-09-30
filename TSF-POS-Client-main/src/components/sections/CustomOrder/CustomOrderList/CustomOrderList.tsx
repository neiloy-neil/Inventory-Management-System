import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomOrders } from "../../../../redux/actions/customOrder/customOrderAction";
import { customOrderColumns } from "./customOrderColumn";
import { DataGrid } from "@mui/x-data-grid";
import { StateType } from "../../../../redux/redux";
import { CustomOrderFromServer } from "../../../../types/CustomOrder/CustomOrderTypes";
import BranchSelector from "../../Branch/BranchSelector/BranchSelector";
import useAdminPermission from "../../../../hooks/permission/useAdminPermission";
import moment from "moment";

const CustomOrderList = () => {
  const [branchId, setBranchId] = useState("");
  const isAdmin = useAdminPermission();
  const { user } = useSelector((state: StateType) => state.user);
  const { orders, message } = useSelector(
    (state: StateType) => state.customOrder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomOrders(user.branch ? user.branch : branchId));
  }, [dispatch, user, message, branchId]);

  const row: any = [];

  orders?.map((order: CustomOrderFromServer) => {
    row.push({
      ...order,
      id: order.orderId,
      branch: order.branch.name,
      date: moment(order.createdAt).format("DD-MM-YYYY"),
    });
  });

  return (
    <>
      {isAdmin && (
        <div className="mt-3">
          <BranchSelector setBranchId={setBranchId} />
        </div>
      )}
      <DataGrid
        columns={customOrderColumns}
        rows={row}
        sx={{ height: "80vh", mt: 3 }}
      />
    </>
  );
};

export default CustomOrderList;
