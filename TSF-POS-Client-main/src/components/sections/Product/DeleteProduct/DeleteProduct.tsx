import { DeleteProductProps } from "./types";
import AppModal from "../../../Modals/AppModal/AppModal";

const DeleteProduct = ({
  loading,
  deletingProductModal,
  handleDeleteProduct,
  setDeletingProductModal,
}: DeleteProductProps) => {
  return (
    <AppModal
      title="Confirm Product Deletion"
      description="Are You Sure You Want To Delete This Product"
      loading={loading}
      open={deletingProductModal}
      setOpen={setDeletingProductModal}
      handleConfirm={handleDeleteProduct}
    />
  );
};

export default DeleteProduct;
