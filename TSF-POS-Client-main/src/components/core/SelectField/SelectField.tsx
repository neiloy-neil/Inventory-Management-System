import { SelectFieldTypes } from "./types";

const SelectField = ({ register, field, error }: SelectFieldTypes) => {
  return (
    <div className="modern-form-group">
      <label className="modern-form-label">{field.label}</label>
      <select 
        className={`form-select modern-input ${error ? "modern-input-error" : ""}`} 
        id="" 
        {...register(field.name)}
      >
        {field.options?.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-danger modern-text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;