import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import LOGIN_INPUT_FIELDS from "../../constants/InputFields/login";
import logo from "../../assets/sisters_furniture_logo.jpeg";
import Button from "../../components/core/Button/Button";
import InputField from "../../components/core/InputField/InputField";
import { LoginData } from "./types";
import { loginUser } from "../../redux/actions/auth/loginAction";
import { AppDispatch, StateType } from "../../redux/redux";
import "./login.scss";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { CLEAR_ERROR } from "../../constants/reduxActionsNames/user";
import { loginFormValidationSchema } from "../../constants/InputValidation/Auth/loginValidation";

const Login = () => {
  const { loggedIn, loading, error } = useSelector(
    (state: StateType) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginFormValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    await dispatch(loginUser(data));
  };

  if (loggedIn) {
    window.location.href = "/";
  }

  useEffect(() => {
    if (error) toast.error(error);
    dispatch({ type: CLEAR_ERROR });
  }, [error, dispatch]);

  return (
    <div className="modern-login-container">
      <div className="modern-login-card">
        <div className="modern-login-header">
          <img src={logo} alt="Logo" className="modern-login-logo" />
          <h1 className="modern-login-title">Welcome Back</h1>
          <p className="modern-login-subtitle">Sign in to your account</p>
        </div>
        <div className="modern-login-body">
          <form onSubmit={handleSubmit(onSubmit)} className="modern-login-form">
            {LOGIN_INPUT_FIELDS.map((field, index) => (
              <div className="modern-form-group" key={index}>
                <label className="modern-form-label">{field.label}</label>
                <InputField
                  label=""
                  register={register}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  error={errors[field.name as keyof LoginData]?.message}
                  className="modern-input"
                />
              </div>
            ))}
            <Button
              loading={loading}
              title="Login"
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="modern-btn modern-btn-primary w-100"
            />
          </form>
          <a href="/forgot-password" className="modern-forgot-password">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;