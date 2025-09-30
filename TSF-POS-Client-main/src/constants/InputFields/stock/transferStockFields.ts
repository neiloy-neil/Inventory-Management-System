import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

const TRANSFER_STOCK_FIELDS: FieldTypes[] = [
  {
    name: "fromBranch",
    label: "From Branch",
    type: "select",
    options: [{ label: "Select One Branch", value: null }],
    placeholder: "Please Select A Branch",
  },
  {
    name: "toBranch",
    label: "To Branch",
    type: "select",
    options: [{ label: "Select One Branch", value: null }],
    placeholder: "Please Select A Branch",
  },
  {
    name: "product",
    label: "Product",
    type: "select",
    options: [{ label: "Select One Product", value: null }],
    placeholder: "Please Select A Product",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Please Enter Quantity",
  },
];

export default TRANSFER_STOCK_FIELDS;
