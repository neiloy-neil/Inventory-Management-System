import { useForm } from "react-hook-form";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import InputField from "../../components/core/InputField/InputField";
import TRANSFER_STOCK_FIELDS from "../../constants/InputFields/stock/transferStockFields";
import SelectField from "../../components/core/SelectField/SelectField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import { addBranchesToStockBranchSelector } from "../../utils/branch/stock/addBranchToSelect";
import BigSpaceLoader from "../../components/loader/BigSpaceLoder/BigSpaceLoader";
import { addProductToSelectField } from "../../utils/product/addProductToSelectField";
import { getBranch } from "../../redux/actions/branch/branchAction";
import { FieldTypes } from "../../types/FieldTypes/FieldTypes";
import Button from "../../components/core/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import TRANSFER_STOCK_VALIDATION from "../../constants/InputValidation/stock/transferStockValidation";
import "./transferStock.scss";
import { toast } from "react-hot-toast";
import { CLEAR_PRODUCT_MESSAGE } from "../../constants/reduxActionsNames/product";
import { moveProduct } from "../../redux/actions/product/productAction";
import { TransferStockFields } from "./types";

const TransferStock = () => {
  const [fields, setFields] = useState<FieldTypes[]>([]);
  const [forceRender, setForceRender] = useState(0);
  const { branches, loading } = useSelector(
    (state: StateType) => state.branches
  );
  const { branch, loading: productsLoading } = useSelector(
    (state: StateType) => state.branch
  );

  const { message, error } = useSelector((state: StateType) => state.product);
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    register,
    resetField,
    formState: { errors },
  } = useForm<TransferStockFields>({
    resolver: yupResolver(TRANSFER_STOCK_VALIDATION),
  });

  const dispatch: AppDispatch = useDispatch();

  const fromBranch = watch("fromBranch");

  useEffect(() => {
    resetField("product");
  }, [fromBranch, resetField, setValue]);

  useEffect(() => {
    dispatch(getBranch(fromBranch));
  }, [dispatch, fromBranch]);

  useEffect(() => {
    const branchFieldNames = ["toBranch", "fromBranch"];
    const productFieldNames = ["product"];

    if (branches) {
      const updatedFields = addBranchesToStockBranchSelector(
        branches,
        branchFieldNames,
        TRANSFER_STOCK_FIELDS
      );

      if (fromBranch && branch) {
        addProductToSelectField(
          branch.products,
          productFieldNames,
          updatedFields
        );
      }
      setFields(updatedFields);
      setForceRender((prev) => prev + 1); // Increment the key value to force re-render
    }
  }, [branches, fromBranch, branch]);

  const onSubmit = async (data: TransferStockFields) => {
    await dispatch(
      moveProduct(data.product, data.fromBranch, data.toBranch, data.quantity)
    );
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      reset();
    }
    if (error) toast.error(error);
    dispatch({ type: CLEAR_PRODUCT_MESSAGE });
  }, [message, error, dispatch, reset]);

  return (
    <Pagewrapper>
      {loading || productsLoading ? (
        <BigSpaceLoader />
      ) : (
        <form
          action=""
          key={forceRender}
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-2 transfer__stock-form"
        >
          {fields.map((field, index) => {
            if (field.type === "select")
              return (
                <SelectField
                  key={index}
                  error={errors[field.name as keyof typeof errors]?.message}
                  field={field}
                  register={register}
                />
              );
            return (
              <InputField
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                register={register}
                type={field.type}
                error={errors[field.name as keyof typeof errors]?.message}
              />
            );
          })}
          <Button title="Submit" onClick={handleSubmit(onSubmit)} />
        </form>
      )}
    </Pagewrapper>
  );
};

export default TransferStock;
