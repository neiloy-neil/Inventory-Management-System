import * as yup from "yup";

const TRANSFER_STOCK_VALIDATION = yup.object().shape({
  fromBranch: yup
    .string()
    .required("From Branch is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid branch ID"),
  toBranch: yup
    .string()
    .required("To Branch is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid branch ID"),
  product: yup
    .string()
    .required("Product is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),
});

export default TRANSFER_STOCK_VALIDATION;
