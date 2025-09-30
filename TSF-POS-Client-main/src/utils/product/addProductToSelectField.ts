import { BranchProduct } from "./../../components/sections/Branch/BranchProducts/BranchProducts";
import { FieldTypes } from "../../types/FieldTypes/FieldTypes";

export const addProductToSelectField = (
  products: BranchProduct[],
  productFieldNames: string[],
  fields: FieldTypes[]
) => {
  fields.forEach((field) => {
    const isMatched = productFieldNames.includes(field.name);

    if (isMatched) {
      field.options = field.options?.slice(0, 1);
      products.map((product) => {
        const option = {
          label: ` ${product.id.productId} - ${product.id.name} - Stock : ${product.quantity}`,
          value: product.id._id,
        };

        if (field.options?.some((o) => o.value === option.value)) return;
        field.options?.push(option);
      });
    }
  });
  return fields;
};
