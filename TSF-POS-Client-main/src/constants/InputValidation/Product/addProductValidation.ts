import * as yup from "yup";

const ADD_PRODUCT_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required"),
  productId: yup
    .number()
    .typeError("Enter Valid Product Id")
    .required("Product Id is required"),
  description: yup.string().required("Description is required"),
  photo: yup
    .mixed()
    .required("Photo is required")
    .test("fileType", "Invalid file type", (value: any) => {
      if (!value.length) return false;
      return (
        value[0].type === "image/jpeg" ||
        value[0].type === "image/png" ||
        value[0].type === "image/gif"
      );
    }),
  wood: yup.string().required("Wood is required"),
  color: yup.string().required("Color is required"),
  costPrice: yup.number().required("Cost Price is required"),
  sellPrice: yup.number().required("Sell Price is required"),
});

export default ADD_PRODUCT_SCHEMA;
