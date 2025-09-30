import FormModal from "../../../Modals/FormModal/FormModal";
import { useForm } from "react-hook-form";
import EDIT_PRODUCT_QUANTITY from "../../../../constants/InputFields/branch/product";
import { useDispatch, useSelector } from "react-redux";
import { changeBranchProductQuantity } from "../../../../redux/actions/product/branch/branchProductAction";
import { getBranch } from "../../../../redux/actions/branch/branchAction";
import { StateType } from "../../../../redux/redux";

const EditBranchProduct = ({
  open,
  productId,
  setOpen,
  branchId,
}: EditBranchProductTypes) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: StateType) => state.product);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBranchProductQuantityData>();

  const onSubmit = async (data: EditBranchProductQuantityData) => {
    await dispatch(
      changeBranchProductQuantity(branchId, productId, data.quantity)
    );
    setOpen(false);
    await dispatch(getBranch(branchId));
  };

  return (
    <FormModal
      title="Change Product Quantity"
      errors={errors}
      fields={EDIT_PRODUCT_QUANTITY}
      open={open}
      loading={loading}
      register={register}
      setOpen={setOpen}
      submitFields={handleSubmit(onSubmit)}
    />
  );
};

export default EditBranchProduct;
