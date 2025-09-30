import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

const ADD_EXPENSE_FIELDS: FieldTypes[] = [
  {
    name: "type",
    label: "Type",
    type: "select",
    placeholder: "Please Add Type",
    options: [
      { label: "Salary", value: "salary" },
      { label: "Food", value: "food" },
      { label: "Shipping", value: "shipping" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter Amount",
  },
  {
    name: "employeeName",
    label: "Employee Name",
    type: "text",
    placeholder: "Enter Employee Name If It's Salary OtherWise Leave Blank",
  },
];

export default ADD_EXPENSE_FIELDS;
