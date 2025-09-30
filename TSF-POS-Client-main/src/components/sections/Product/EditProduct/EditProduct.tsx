import React, { SetStateAction, useEffect, useState } from "react";
import ADD_PRODUCT_FIELDS from "../../../../constants/InputFields/product/addProduct";
import FormModal from "../../../Modals/FormModal/FormModal";
import { useForm } from "react-hook-form";
import { Product } from "../../../../types/Product/ProductTypes";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../../../redux/actions/product/productAction";
import { StateType } from "../../../../redux/redux";
import { getBranch } from "../../../../redux/actions/branch/branchAction";

const EditProduct = ({
  open,
  setOpen,
  editingProduct,
  branchId,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  editingProduct?: Product;
  branchId?: string;
}) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const { loading } = useSelector((state: StateType) => state.product);
  const dispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<Product | undefined>(
    editingProduct
  );

  useEffect(() => {
    setDefaultValues(editingProduct);
  }, [editingProduct]);

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key as keyof Product]);
      });
    }
  }, [defaultValues, setValue]);

  const handleEditProduct = async (data: object) => {
    // return console.log(data, "juhan data");
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "photo") {
        if (typeof value === "string") {
          console.log(typeof value, "photo type");
        } else {
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, value);
      }
    }

    if (editingProduct?._id)
      await dispatch(editProduct(editingProduct?._id, formData));

    setOpen(false);
    if (branchId) dispatch(getBranch(branchId));
  };

  return (
    <FormModal
      errors={errors}
      fields={ADD_PRODUCT_FIELDS}
      register={register}
      submitFields={handleSubmit(handleEditProduct)}
      title="Edit Product"
      loading={loading}
      open={open}
      setOpen={setOpen}
      defaultValues={defaultValues}
    />
  );
};

export default EditProduct;
