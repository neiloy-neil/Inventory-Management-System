import { FieldTypes } from "../../../../types/FieldTypes/FieldTypes";

const ORDER_EDIT_FIELDS: FieldTypes[] = [
  {
    name: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Enter Customer Name",
  },
  {
    name: "customerPhone",
    label: "Customer Phone",
    type: "phone",
    placeholder: "Enter Customer Phone",
  },
  {
    name: "description",
    label: "Product Description",
    type: "text",
    placeholder: "Product Description",
  },
  {
    name: "color",
    label: "Product Color",
    type: "text",
    placeholder: "Product Color",
  },
  {
    name: "wood",
    label: "Wood",
    type: "text",
    placeholder: "Product Wood",
  },
  {
    name: "totalPrice",
    label: "Total Price",
    type: "number",
    placeholder: "Estimated Product Price",
  },
  {
    name: "advancePayment",
    label: "Advance Amount",
    type: "number",
    placeholder: "Enter Advance Amount",
  },
  {
    name: "photos",
    label: "Photos",
    type: "files",
    placeholder: "Select Photos",
  },
];

export default ORDER_EDIT_FIELDS;
