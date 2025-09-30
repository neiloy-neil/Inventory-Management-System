import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-bootstrap/Modal";
import Button from "../../core/Button/Button";
import InputField from "../../core/InputField/InputField";
import { CustomerFormData } from "../../../types/Customer/customerTypes";
import ADD_CUSTOMER_FIELDS from "../../../constants/InputFields/customer/addCustomer";
import * as yup from "yup";

// Define validation schema
const customerValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zipCode: yup.string(),
  country: yup.string(),
  marketingConsent: yup.boolean().required(),
});

interface AddCustomerModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: CustomerFormData) => void;
  loading: boolean;
  customerToEdit?: CustomerFormData & { _id: string }; // For edit mode
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  show,
  onHide,
  onSubmit,
  loading,
  customerToEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CustomerFormData>({
    resolver: yupResolver(customerValidationSchema),
  });

  // Reset form when customerToEdit changes or when modal is hidden
  useEffect(() => {
    if (customerToEdit) {
      // Populate form with existing customer data
      Object.keys(customerToEdit).forEach((key) => {
        if (key !== "_id") {
          setValue(key as keyof CustomerFormData, customerToEdit[key as keyof CustomerFormData]);
        }
      });
    } else {
      // Reset form for new customer
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        marketingConsent: false,
      });
    }
  }, [customerToEdit, reset, setValue, show]);

  const handleFormSubmit: SubmitHandler<CustomerFormData> = async (data) => {
    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" className="add-customer-modal">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {customerToEdit ? "Edit Customer" : "Add New Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="customer-form-grid modern-grid modern-grid-cols-1 md:modern-grid-cols-2 modern-gap-lg">
            {ADD_CUSTOMER_FIELDS.map((field, index) => {
              // Special handling for checkbox
              if (field.type === "checkbox") {
                return (
                  <div className="modern-form-group modern-grid modern-grid-cols-2" key={index}>
                    <label className="modern-form-label modern-flex modern-gap-sm">
                      <input
                        type="checkbox"
                        {...register("marketingConsent")}
                        className="modern-checkbox"
                      />
                      {field.label}
                    </label>
                    {errors.marketingConsent && (
                      <p className="text-danger modern-text-sm">
                        {errors.marketingConsent.message}
                      </p>
                    )}
                  </div>
                );
              }
              
              return (
                <InputField
                  key={index}
                  label={field.label}
                  register={register}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name as keyof CustomerFormData}
                  error={errors[field.name as keyof CustomerFormData]?.message}
                  className="modern-input"
                />
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Cancel"
            className="modern-btn modern-btn-outline"
            onClick={onHide}
            type="button"
            disabled={loading}
          />
          <Button
            loading={loading}
            title={customerToEdit ? "Update Customer" : "Add Customer"}
            className="modern-btn modern-btn-primary"
            type="submit"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddCustomerModal;