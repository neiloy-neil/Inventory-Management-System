import { useEffect, useState } from "react";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import useAdminPermission from "../../hooks/permission/useAdminPermission";
import BranchSelector from "../../components/sections/Branch/BranchSelector/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/redux";
import { getExpenses } from "../../redux/actions/expenses/expenseAction";
import { Expense } from "../../types/Expense/ExpenseType";
import { DataGrid } from "@mui/x-data-grid";
import { expenseColumns } from "./expenseColumns";
import moment from "moment";
import AddExpense from "../../components/sections/Expenses/AddExpense/AddExpense";
import { CLEAR_ERROR } from "../../constants/reduxActionsNames/user";
import "./expenses.scss";

const Expenses = () => {
  const { user } = useSelector((state: StateType) => state.user);
  const { expenses, error, message } = useSelector(
    (state: StateType) => state.expenses
  );

  const [branchId, setBranchId] = useState(user?.branch ? user.branch : "");
  const adminPermission = useAdminPermission();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses(`/expense/list?branch=${branchId}`));
  }, [dispatch, branchId, message]);

  useEffect(() => {
    dispatch({ type: CLEAR_ERROR });
  }, [error, message, dispatch]);

  const row: any = [];

  expenses?.map((expense: Expense, index) => {
    row.push({
      ...expense,
      createdAt: moment(expense.createdAt).format("DD - MM - YYYY hh:mm a"),
      id: index + 1,
    });
  });

  return (
    <Pagewrapper title="Expense Management">
      <div className="expenses-page">
        <div className="expenses-header modern-flex modern-flex-between modern-mb-lg">
          <h1 className="expenses-title modern-dashboard-title">Expense Management</h1>
          <AddExpense />
        </div>
        
        {adminPermission && (
          <div className="branch-selector-container modern-mb-lg">
            <BranchSelector setBranchId={setBranchId} />
          </div>
        )}
        
        <div className="expenses-grid modern-card">
          <div className="modern-card-body">
            <DataGrid
              columns={expenseColumns}
              rows={row}
              sx={{ height: "70vh", mt: 3 }}
            />
          </div>
        </div>
      </div>
    </Pagewrapper>
  );
};

export default Expenses;