import "./AddExpense.scss";
import Button from "../../../core/Button/Button";
import FormModal from "../../../Modals/FormModal/FormModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ADD_EXPENSE_FIELDS from "../../../../constants/InputFields/expense/addExpenseFields";
import { yupResolver } from "@hookform/resolvers/yup";
import expenseValidationSchema from "../../../../constants/InputValidation/expense/expenseValidation";
import { addExpense } from "../../../../redux/actions/expenses/expenseAction";
import { AddExpenseData } from "./types";
import { useDispatch, useSelector } from "react-redux";
import useAdminPermission from "../../../../hooks/permission/useAdminPermission";
import { StateType } from "../../../../redux/redux";

const AddExpense = () => {
  const isAdmin = useAdminPermission();
  const { user } = useSelector((state: StateType) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddExpenseData>({
    resolver: yupResolver(expenseValidationSchema),
  });

  useEffect(() => {
    if (!isAdmin) setValue("branch", user.branch ? user.branch : "");
  }, [isAdmin, setValue, user]);

  // onSubmit function to dispatch the action
  const onSubmit: SubmitHandler<AddExpenseData> = async (
    value: AddExpenseData
  ) => {
    await dispatch(addExpense(value));
    setOpen(false);
  };

  return (
    <div className="add__expense-section">
      <Button title="Add Expense" onClick={() => setOpen(true)} />
      <FormModal
        branchSelector
        fields={ADD_EXPENSE_FIELDS}
        title="Add Expense"
        errors={errors}
        setValue={setValue}
        open={open}
        register={register}
        setOpen={setOpen}
        submitFields={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddExpense;
