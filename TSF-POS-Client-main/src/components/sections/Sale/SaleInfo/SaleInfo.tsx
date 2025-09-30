import { ADD_SALE_FIELDS } from "../../../../constants/InputFields/sale/addSale";
import { useSelector } from "react-redux";
import { StateType } from "../../../../redux/redux";
import { SaleInfoProps } from "./types";
import Button from "../../../core/Button/Button";
import HorizontalProductCard from "../../../cards/HorizontalProductCard/HorizontalProductCard";
import Checkbox from "../../../core/Checkbox/Checkbox";
import InputField from "../../../core/InputField/InputField";
import SelectField from "../../../core/SelectField/SelectField";

const SaleInfo = ({
  handleSubmit,
  register,
  submitSale,
  watch,
  errors,
}: SaleInfoProps) => {
  const { cart } = useSelector((state: StateType) => state.cart);
  return (
    <>
      <div className="sale__info my-3 d-flex flex-column gap-3">
        {cart.map((product, key) => (
          <HorizontalProductCard key={key} product={product} />
        ))}
      </div>
      <div className="customer__details">
        <div className="price__section">
          <p className="mb-2 fw-semibold">
            Total Price : <span>{watch("total")}</span> Taka
          </p>
        </div>
        <div className="customer__info d-flex flex-column gap-3 my-4">
          {ADD_SALE_FIELDS.map((field, index) => {
            if (field.name === "partialPayment")
              return (
                <div key={index}>
                  <Checkbox
                    label={field.label}
                    name={field.name}
                    register={register}
                  />
                  {watch("partialPayment") && (
                    <InputField
                      className="mt-3"
                      label="Partial Payment Amount"
                      name="partialPaymentAmount"
                      placeholder="Enter Partial Payment Amount"
                      register={register}
                      type="number"
                    />
                  )}
                </div>
              );

            if (field.type === "select") {
              return (
                <SelectField
                  error={errors[field.name]?.message}
                  field={field}
                  register={register}
                />
              );
            }
            return (
              <InputField
                key={index}
                label={field.label}
                name={field.name}
                register={register}
                type={field.type}
                placeholder={field.placeholder}
              />
            );
          })}
          <Button title="Submit" onClick={handleSubmit(submitSale)} />
        </div>
      </div>
    </>
  );
};

export default SaleInfo;
