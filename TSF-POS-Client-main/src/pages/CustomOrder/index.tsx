import { SubmitHandler, useForm } from "react-hook-form";
import FormModal from "../../components/Modals/FormModal/FormModal";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import Button from "../../components/core/Button/Button";
import CUSTOM_ORDER_FIELDS from "../../constants/InputFields/customOrder/customOrderFields";
import { useEffect, useState } from "react";
import { CustomOrderType } from "../../types/CustomOrder/CustomOrderTypes";
import useAdminPermission from "../../hooks/permission/useAdminPermission";
import { useDispatch, useSelector } from "react-redux";
import { addCustomOrder } from "../../redux/actions/customOrder/customOrderAction";
import { StateType } from "../../redux/redux";
import { toast } from "react-hot-toast";
import { CUSTOM_ORDER_CLEAR_MESSAGE } from "../../constants/reduxActionsNames/customOrder";
import CustomOrderList from "../../components/sections/CustomOrder/CustomOrderList/CustomOrderList";

const CustomOrder = () => {
  const { user } = useSelector((state: StateType) => state.user);
  const { loading, error, message } = useSelector(
    (state: StateType) => state.customOrder
  );
  const [open, setOpen] = useState(false);
  const isAdmin = useAdminPermission();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CustomOrderType>();

  useEffect(() => {
    if (!isAdmin) setValue("branch", user.branch ? user.branch : "");
  }, [isAdmin, user, setValue]);

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
    dispatch({ type: CUSTOM_ORDER_CLEAR_MESSAGE });
  }, [error, message, dispatch]);

  const onSubmit: SubmitHandler<CustomOrderType> = async (
    submittedValues: CustomOrderType
  ) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(submittedValues)) {
      if (key !== "photos") formData.append(key, value);
    }

    for (let i = 0; i < submittedValues.photos.length; i++) {
      formData.append("photos", submittedValues.photos[i]);
    }

    await dispatch(addCustomOrder(formData));
    setOpen(false);
  };

  return (
    <Pagewrapper>
      <Button title="Add Custom Order" onClick={() => setOpen(true)} />
      <FormModal
        loading={loading}
        title="Custom Order"
        fields={CUSTOM_ORDER_FIELDS}
        open={open}
        register={register}
        setOpen={setOpen}
        submitFields={handleSubmit(onSubmit)}
        errors={errors}
        branchSelector={isAdmin}
        setValue={setValue}
      />
      <CustomOrderList />
    </Pagewrapper>
  );
};

export default CustomOrder;
