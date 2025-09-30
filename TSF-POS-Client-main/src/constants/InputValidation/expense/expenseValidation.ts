import * as yup from "yup";

const expenseValidationSchema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
  branch: yup
    .string()
    .required("Branch is required")
    .min(5, "Branch is required"),
  employeeName: yup.string().optional(),
  type: yup.string().required("Type is required"),
});

export default expenseValidationSchema;
