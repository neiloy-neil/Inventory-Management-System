import { CheckboxType } from "./types";
import Form from "react-bootstrap/Form";

const Checkbox = ({ label, name, register }: CheckboxType) => {
  return (
    <div className="form-check">
      <Form.Control
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        {...register(name)}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default Checkbox;
