import React from "react";

export interface AppModalTypes {
  loading?: boolean;
  title: string;
  description: string;
  handleConfirm: () => void;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean | undefined>>;
}
