import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const saleSchema = yup.object().shape({
  customerName: yup.string().required("Customer Name is required"),
  phone: yup.string().required("Phone is required"),
  total: yup.number().required("Total is required"),
  discount: yup.number().default(0),
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Item name is required"),
      photo: yup.string().required("Item photo is required"),
      id: yup.number().required("Item id is required"),
      quantity: yup.number().required("Item quantity is required"),
      unitPrice: yup.number().required("Item unit price is required"),
    })
  ),
  paymentMethod: yup
    .string()
    .oneOf(["Cash", "Credit Card", "bKash"], "Invalid payment method")
    .required("Payment method is required"),
  partialPayment: yup.boolean().required("Partial Payment status is required"),
  partialPaymentAmount: yup
    .number()
    .when("partialPayment", (partialPayment, schema) => {
      return partialPayment
        ? schema.required("Partial Payment Amount is required")
        : schema;
    }),

  tax: yup.number().default(0),
  note: yup.string(),
  branch: yup.string().required("Branch is required"),
});

const resolver = yupResolver(saleSchema);

export default resolver;
