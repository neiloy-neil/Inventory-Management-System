import logo from "../../assets/sisters_furniture_logo.jpeg";
import InputField from "../../components/core/InputField/InputField";
import Button from "../../components/core/Button/Button";
import RESET_PASSWORD_FIELDS from "../../constants/InputFields/resetPassword";
import "./resetPassword.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordFormTypes } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import { resetPassword } from "../../redux/actions/auth/passwordAction";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { resetPasswordValidation } from "../../constants/InputValidation/Auth/resetPasswordValidation";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { message, error, loading } = useSelector(
    (state: StateType) => state.promise
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormTypes>({
    resolver: yupResolver(resetPasswordValidation),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormTypes> = (
    data: ResetPasswordFormTypes
  ) => {
    dispatch(resetPassword(token, data));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [message, error]);

  return (
    <div className="reset-password">
      <img src={logo} alt="" className="logo" />
      <div className="reset-password__credentials-card">
        <h4 className="reset-password__title">Reset Password</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="reset-password_form">
          {RESET_PASSWORD_FIELDS.map((field, index) => (
            <InputField
              label={field.label}
              register={register}
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              error={
                errors[field.name as keyof ResetPasswordFormTypes]?.message
              }
            />
          ))}
          <Button
            loading={loading}
            title="Reset Password"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
