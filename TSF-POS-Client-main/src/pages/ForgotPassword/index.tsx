import { SubmitHandler, useForm } from "react-hook-form";

import "./forgotPassword.scss";
import logo from "../../assets/sisters_furniture_logo.jpeg";
import Button from "../../components/core/Button/Button";
import InputField from "../../components/core/InputField/InputField";
import FORGOT_PASSWORD_FIELDS from "../../constants/InputFields/forgotPassword";
import { ForgotPasswordFormTypes } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidation } from "../../constants/InputValidation/Auth/forgotPasswordValidation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import { toast } from "react-hot-toast";
import { forgotPassword } from "../../redux/actions/auth/passwordAction";
import { useEffect } from "react";

const ForgotPassword = () => {
  const { error, message, loading } = useSelector(
    (state: StateType) => state.promise
  );
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormTypes>({
    resolver: yupResolver(forgotPasswordValidation),
  });

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message, dispatch]);

  const onSubmit: SubmitHandler<ForgotPasswordFormTypes> = (
    data: ForgotPasswordFormTypes
  ) => {
    dispatch(forgotPassword(data.email));
  };

  return (
    <div className="forgot-password">
      <img src={logo} alt="" className="logo" />
      <div className="forgot-password__credentials-card">
        <h4 className="forgot-password__title">Forgot Password</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="forgot-password_form"
        >
          {FORGOT_PASSWORD_FIELDS.map((field, index) => (
            <InputField
              label={field.label}
              register={register}
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              error={
                errors[field.name as keyof ForgotPasswordFormTypes]?.message
              }
            />
          ))}
          <Button
            loading={loading}
            title="Forgot Password"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
