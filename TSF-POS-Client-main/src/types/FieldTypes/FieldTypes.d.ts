import { SelectOptionType } from "../../constants/InputFields/user/types";

export interface FieldTypes {
  name: string;
  label: string;
  type:
    | "text"
    | "select"
    | "number"
    | "phone"
    | "email"
    | "password"
    | "file"
    | "checkbox"
    | "files";
  accept?: string;
  placeholder: string;
  options?: SelectOptionType[];
}
