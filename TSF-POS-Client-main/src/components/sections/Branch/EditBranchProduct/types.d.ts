interface EditBranchProductTypes {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  productId: string;
  branchId: string;
}

interface EditBranchProductQuantityData {
  quantity: string;
}
