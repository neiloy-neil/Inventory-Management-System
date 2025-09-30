import { ShortBranchType } from "../../../types/Branch/branchTypes";
import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

export const addBranchesToStockBranchSelector = (
  branches: ShortBranchType[],
  branchFieldNames: string[],
  fields: FieldTypes[]
) => {
  if (branches) {
    fields.forEach((field) => {
      const isBranchField = branchFieldNames?.includes(field.name);
      if (isBranchField) {
        branches?.forEach((branch) => {
          const option = { label: branch.name, value: branch._id };
          const optionExists = field?.options?.some(
            (o) => o.value === option.value
          );
          if (optionExists) return;
          field.options?.push(option);
        });
      }
    });
  }

  return fields;
};
