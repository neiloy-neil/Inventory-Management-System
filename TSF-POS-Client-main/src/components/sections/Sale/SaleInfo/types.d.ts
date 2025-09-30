import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export interface SaleInfoProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  submitSale: (data: object) => Promise<void>;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
}
