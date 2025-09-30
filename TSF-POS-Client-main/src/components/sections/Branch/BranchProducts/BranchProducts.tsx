import ProductCard from "../../../cards/ProductCard/ProductCard";
import AppModal from "../../../Modals/AppModal/AppModal";
import "./branchProducts.scss";
import { useEffect, useState } from "react";
import { Product } from "../../../../types/Product/ProductTypes";
import { deleteProductFromBranch } from "../../../../redux/actions/product/branch/branchProductAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../../../redux/redux";
import { toast } from "react-hot-toast";
import BranchAddProduct from "../BranchAddProduct/BranchAddProduct";
import { CLEAR_PRODUCT } from "../../../../constants/reduxActionsNames/product";
import { getBranch } from "../../../../redux/actions/branch/branchAction";
import useAdminPermission from "../../../../hooks/permission/useAdminPermission";
import EditProduct from "../../Product/EditProduct/EditProduct";
import EditBranchProduct from "../EditBranchProduct/EditBranchProduct";

export interface BranchProduct {
  id: Product;
  quantity: number;
  _id: string;
}

export interface BranchProductProps {
  products: BranchProduct[];
  branchId: string;
}
const BranchProducts = ({ products, branchId }: BranchProductProps) => {
  const isAdmin = useAdminPermission();
  const { branch } = useSelector((state: StateType) => state.branch);
  const { loading, error, message } = useSelector(
    (state: StateType) => state.product
  );
  const [deletingProductId, setDeletingProductId] = useState<string>("");
  const [deletingModelOpen, setDeletingModalOpen] = useState<boolean>(false);

  const [editingProductId, setEditingProductId] = useState<string>("");
  const [editingModelOpen, setEditingModalOpen] = useState<boolean>(false);
  const [quantityModelOpen, setQuantityModelOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product>();

  const dispatch: AppDispatch = useDispatch();

  const handleDeleteProductFromBranch = async () => {
    await dispatch(deleteProductFromBranch(branch._id, deletingProductId));
    setDeletingModalOpen(false);
    dispatch(getBranch(branch._id));
  };

  console.log(editingProductId);
  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
    dispatch({ type: CLEAR_PRODUCT });
  }, [dispatch, error, message]);

  const reversedProducts = products.slice().reverse(); // Create a copy of the array and reverse it

  return (
    <div className="">
      <EditProduct
        branchId={branchId}
        open={editingModelOpen}
        setOpen={setEditingModalOpen}
        editingProduct={editingProduct}
      />

      <EditBranchProduct
        branchId={branch?._id}
        open={quantityModelOpen}
        setOpen={setQuantityModelOpen}
        productId={editingProductId}
      />
      <AppModal
        open={deletingModelOpen}
        setOpen={setDeletingModalOpen}
        title="Confirm Deletion"
        description="Are You Sure, You Want To Delete This Product From Store?"
        loading={loading}
        handleConfirm={handleDeleteProductFromBranch}
      />
      <div className="d-flex justify-content-between align-items-center">
        <p className="fs-4 fw-bold text-muted mb-3">
          Products ({products?.length})
        </p>
        {isAdmin && <BranchAddProduct />}
      </div>

      <div className="product__list">
        {reversedProducts?.map((product, key) => {
          if (!product.id) return <p key={key}>This Product Has Removed</p>;
          return (
            <>
              <ProductCard
                setQuantityModelOpen={setQuantityModelOpen}
                setEditingProductId={setEditingProductId}
                setEditingModelOpen={setEditingModalOpen}
                setEditingProduct={setEditingProduct}
                setDeletingProductId={setDeletingProductId}
                setDeletionModelOpen={setDeletingModalOpen}
                product={product.id}
                quantity={product.quantity}
                key={key}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default BranchProducts;
