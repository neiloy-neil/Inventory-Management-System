import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

const ADD_SALE_FIELDS: FieldTypes[] = [
  {
    name: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Enter Customer Name",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter Phone Number",
  },
  {
    name: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "Cash", value: "Cash" },
      { label: "bKash", value: "bKash" },
      { label: "Credit Card", value: "Credit Card" },
    ],
    placeholder: "Enter Payment Method",
  },
  // {
  //   name: "partialPayment",
  //   label: "Partial Payment",
  //   type: "checkbox",
  //   placeholder: "Enter Partial Payment",
  // },
  {
    name: "note",
    label: "Note",
    type: "text",
    placeholder: "Enter Note",
  },
];

export { ADD_SALE_FIELDS };
