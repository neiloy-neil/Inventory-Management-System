import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

export interface FormModalTypes {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  submitFields: () => void;
  title: string;
  defaultValues?: object;
  fields: FieldTypes[];
  errors: FieldErrors<FieldValues>;
  register: (rules?: RegisterOptions) => RefReturn;
  loading?: boolean;
  setValue?: UseFormSetValue<any>;
  branchSelector?: boolean;
}
