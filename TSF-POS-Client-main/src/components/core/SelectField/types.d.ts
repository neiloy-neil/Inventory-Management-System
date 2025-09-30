import { FieldError, FieldErrorsImpl } from "react-hook-form";
import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

interface SelectFieldTypes {
  register: (rules?: RegisterOptions) => RefReturn;
  field: FieldTypes;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<>>;
}
