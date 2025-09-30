import BranchSelector from "../../Branch/BranchSelector/BranchSelector";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../../redux/redux";
import {
  CHANGE_BRANCH,
  CHANGE_FROM_DATE,
  CHANGE_TO_DATE,
} from "../../../../constants/reduxActionsNames/dashboard";
import "./dashboard-branch-and-date-picker.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import useAdminPermission from "../../../../hooks/permission/useAdminPermission";

const DashboardBranchAndDatePicker = () => {
  const adminPermission = useAdminPermission();
  const { user } = useSelector((state: StateType) => state.user);
  const { fromDate, toDate } = useSelector(
    (state: StateType) => state.dashboard
  );
  const [branchId, setBranchId] = useState<string>(
    user.branch ? user.branch : ""
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CHANGE_BRANCH, payload: branchId });
  }, [branchId, dispatch]);

  return (
    <div className="mb-4 d-flex gap-4 align-items-end">
      {adminPermission && (
        <div>
          <p className="mb-2">Please Select A Branch</p>
          <BranchSelector setBranchId={setBranchId} style={{ height: 55 }} />
        </div>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <p className="mb-2">From Date:</p>
          <DatePicker
            value={fromDate ? dayjs(fromDate) : null}
            onChange={(newValue: Dayjs | null) => {
              if (newValue) {
                dispatch({
                  type: CHANGE_FROM_DATE,
                  payload: newValue.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                });
              }
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </div>
        <div className="ms-3">
          <p className="mb-2">To Date</p>
          <DatePicker
            value={toDate ? dayjs(toDate) : null}
            onChange={(newValue: Dayjs | null) => {
              if (newValue) {
                dispatch({
                  type: CHANGE_TO_DATE,
                  payload: newValue.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                });
              }
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DashboardBranchAndDatePicker;