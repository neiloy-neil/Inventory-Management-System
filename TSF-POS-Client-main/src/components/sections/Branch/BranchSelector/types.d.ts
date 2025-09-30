import React from "react";
import { FieldError } from "react-hook-form";

export interface BranchSelectorProps {
  setBranchId: React.Dispatch<React.SetStateAction<string>>;
  style?: object;
  fullWidth?: boolean;
  disableAllBranch?: boolean;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
