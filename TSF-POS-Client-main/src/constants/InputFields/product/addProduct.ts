import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

const ADD_PRODUCT_FIELDS: FieldTypes[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter Product Name",
  },
  {
    name: "productId",
    label: "Product Id",
    type: "number",
    placeholder: "Enter Product Id",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter Product Description",
  },
  {
    name: "photo",
    label: "Photo",
    type: "file",
    accept: "image/*",
    placeholder: "Upload Product Photo",
  },
  {
    name: "wood",
    label: "Wood",
    type: "text",
    placeholder: "Enter Product Wood Type",
  },
  {
    name: "color",
    label: "Color",
    type: "text",
    placeholder: "Enter Product Color",
  },
  {
    name: "costPrice",
    label: "Cost Price",
    type: "number",
    placeholder: "Enter Product Cost Price",
  },
  {
    name: "sellPrice",
    label: "Sell Price",
    type: "number",
    placeholder: "Enter Product Sell Price",
  },
];

export default ADD_PRODUCT_FIELDS;
