import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

const EDIT_PRODUCT_QUANTITY: FieldTypes[] = [
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Enter Quantity",
  },
];

export default EDIT_PRODUCT_QUANTITY;

const ADD_PRODUCT_TO_BRANCH_FIELDS: FieldTypes[] = [
  {
    name: "product",
    label: "Product",
    type: "select",
    options: [],
    placeholder: "Enter Product",
  },

  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Enter Quantity",
  },
];

export { ADD_PRODUCT_TO_BRANCH_FIELDS };
