import * as yup from "yup";

const SEARCH_PRODUCT_VALIDATION = yup.object().shape({
  productId: yup.string().required("Product Id Is Required"),
});

export default SEARCH_PRODUCT_VALIDATION;
