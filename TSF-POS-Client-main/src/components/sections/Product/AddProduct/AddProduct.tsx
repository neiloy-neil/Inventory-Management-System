import { useState } from "react";
import Button from "../../../core/Button/Button";
import FormModal from "../../../Modals/FormModal/FormModal";
import { useForm } from "react-hook-form";
import ADD_PRODUCT_FIELDS from "../../../../constants/InputFields/product/addProduct";
import ADD_PRODUCT_SCHEMA from "../../../../constants/InputValidation/Product/addProductValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductFormData } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../../../redux/redux";
import { addProduct } from "../../../../redux/actions/product/productAction";

const AddProduct = () => {
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const { loading } = useSelector((state: StateType) => state.product);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(ADD_PRODUCT_SCHEMA),
  });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "photo") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    }

    await dispatch(addProduct(formData));
    setAddProductModalOpen(false);
  };

  return (
    <div className="mb-4">
      <FormModal
        loading={loading}
        errors={errors}
        fields={ADD_PRODUCT_FIELDS}
        open={addProductModalOpen}
        setOpen={setAddProductModalOpen}
        register={register}
        submitFields={handleSubmit(onSubmit)}
        title="Add Product"
      />
      <Button
        title="Add Product"
        onClick={() => setAddProductModalOpen(true)}
      />
    </div>
  );
};

export default AddProduct;
