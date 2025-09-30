import { SetStateAction } from "react";

export interface DeleteProductProps {
  loading: boolean;
  deletingProductModal: boolean;
  setDeletingProductModal: React.Dispatch<SetStateAction<boolean>>;
  handleDeleteProduct: () => void;
}
