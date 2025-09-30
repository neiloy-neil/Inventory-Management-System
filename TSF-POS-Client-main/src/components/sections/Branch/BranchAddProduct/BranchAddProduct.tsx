import { useEffect, useState } from "react";
import Button from "../../../core/Button/Button";
import { AppDispatch, StateType } from "../../../../redux/redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../../redux/actions/products/productsAction";
import { ADD_PRODUCT_TO_BRANCH_FIELDS } from "../../../../constants/InputFields/branch/product";
import FormModal from "../../../Modals/FormModal/FormModal";
import { useForm } from "react-hook-form";
import { AddProductToBranchData } from "./types";
import { addProductToBranch } from "../../../../redux/actions/product/branch/branchProductAction";
import { getBranch } from "../../../../redux/actions/branch/branchAction";
import { CLEAR_BRANCH_MESSAGES } from "../../../../constants/reduxActionsNames/branch";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import ADD_PRODUCT_TO_BRANCH_VALIDATION from "../../../../constants/InputValidation/Product/branchAddProduct";

const BranchAddProduct = () => {
  const { branch, message } = useSelector((state: StateType) => state.branch);
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { loading, products } = useSelector(
    (state: StateType) => state.products
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductToBranchData>({
    resolver: yupResolver(ADD_PRODUCT_TO_BRANCH_VALIDATION),
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (message) toast.success(message);
    dispatch({ type: CLEAR_BRANCH_MESSAGES });
  }, [message, dispatch]);

  useEffect(() => {
    if (products) {
      const productsField = ADD_PRODUCT_TO_BRANCH_FIELDS.find(
        (field) => field.name === "product"
      );

      if (productsField) {
        products.map((product) => {
          const option = {
            label: `${product.productId} - ${product.name}`,
            value: product._id,
          };
          if (!productsField.options?.some((o) => o.value === option.value)) {
            productsField.options?.push(option);
          }
        });
      }
    }
  }, [products]);

  const handleAddProductToBranch = async (data: AddProductToBranchData) => {
    await dispatch(addProductToBranch(branch._id, data.product, data.quantity));
    setOpen(false);
    dispatch(getBranch(branch._id));
  };
  return (
    <div>
      <FormModal
        open={open}
        setOpen={setOpen}
        errors={errors}
        fields={ADD_PRODUCT_TO_BRANCH_FIELDS}
        register={register}
        submitFields={handleSubmit(handleAddProductToBranch)}
        title="Add Product To Branch"
        loading={loading}
      />
      <Button
        title="Add Product"
        className="btn-warning"
        onClick={() => setOpen(true)}
      />
    </div>
  );
};

export default BranchAddProduct;
