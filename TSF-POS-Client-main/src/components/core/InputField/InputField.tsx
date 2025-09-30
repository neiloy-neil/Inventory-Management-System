import { InputFieldType } from "./types";
import Form from "react-bootstrap/Form";
import "./inputField.scss";

const InputField = ({
  type,
  placeholder,
  name,
  error,
  register,
  label,
  defaultValue,
  className,
}: InputFieldType) => {
  return (
    <div className={`input__wrapper ${className}`}>
      {label && <p className="top__label mb-2 modern-form-label">{label}</p>}
      <Form.Control
        onWheel={(e) => e.preventDefault()}
        defaultValue={defaultValue}
        type={type}
        className={`form-control core__inputField modern-input ${
          error ? "modern-input-error" : ""
        }`}
        aria-describedby="emailHelp"
        placeholder={placeholder}
        name={name}
        {...register(name)}
      />
      {error && <p className="error__message text-danger mt-1">{error}</p>}
    </div>
  );
};

export default InputField;