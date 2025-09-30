import * as yup from "yup";

const ADD_PRODUCT_TO_BRANCH_VALIDATION = yup.object().shape({
  product: yup.string().required("Product Is Required"),
  quantity: yup
    .number()
    .typeError("Please Enter Quantity")
    .required("Quantity Is Required"),
});

export default ADD_PRODUCT_TO_BRANCH_VALIDATION;
