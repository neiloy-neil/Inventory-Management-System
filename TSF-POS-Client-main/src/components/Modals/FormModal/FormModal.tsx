import { CircularProgress } from "@mui/material";
import Form from "react-bootstrap/Form";
import Button from "../../core/Button/Button";
import InputField from "../../core/InputField/InputField";
import SelectField from "../../core/SelectField/SelectField";
import { FormModalTypes } from "./types";
import Modal from "react-bootstrap/Modal";
import BranchSelector from "../../sections/Branch/BranchSelector/BranchSelector";
import { useEffect, useState } from "react";
import useAdminPermission from "../../../hooks/permission/useAdminPermission";

const FormModal = ({
  open,
  setOpen,
  loading,
  submitFields,
  setValue,
  title,
  fields,
  register,
  errors,
  defaultValues,
  branchSelector,
}: FormModalTypes) => {
  const isAdmin = useAdminPermission();
  const handleClose = () => setOpen(false);
  const [branchId, setBranchId] = useState("");
  // console.log(errors, "error"); // Commented out unused log

  useEffect(() => {
    if (setValue && branchSelector) setValue("branch", branchId);
  }, [branchId, setValue, branchSelector]);

  // console.log(defaultValues, "defaultValues"); // Commented out unused log

  return (
    <Modal show={open} onHide={handleClose} style={{ paddingTop: 80 }} className="modern-fade-in">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="modern-modal-title">{title}</Modal.Title>
      </Modal.Header>
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <CircularProgress />
        </div>
      ) : (
        <Modal.Body className="px-4">
          <form className="d-flex flex-column gap-4 my-2">
            {branchSelector && isAdmin && (
              <BranchSelector
                fullWidth
                setBranchId={setBranchId}
                errorMessage={errors.branch ? String(errors.branch.message) : undefined}
              />
            )}
            {fields.map((field, index) => {
              if (field.type === "select") {
                return (
                  <SelectField
                    field={field}
                    register={register}
                    error={errors[field.name]?.message ? String(errors[field.name]?.message) : undefined}
                  />
                );
              } else if (field.type === "file") {
                return (
                  <div key={index} className="modern-form-group">
                    <Form.Label className="modern-form-label">{field.label}</Form.Label>
                    <Form.Control 
                      type="file" 
                      {...register(field.name)} 
                      className="modern-input"
                    />
                    {errors[field.name]?.message && (
                      <span className="text-danger mt-1 d-inline-block">
                        {String(errors[field.name]?.message)}
                      </span>
                    )}
                  </div>
                );
              } else if (field.type === "files") {
                return (
                  <div key={index} className="modern-form-group">
                    <Form.Label className="modern-form-label">{field.label}</Form.Label>
                    <Form.Control 
                      multiple 
                      type="file" 
                      {...register(field.name)} 
                      className="modern-input"
                    />
                    {errors[field.name]?.message && (
                      <span className="text-danger mt-1 d-inline-block">
                        {String(errors[field.name]?.message)}
                      </span>
                    )}
                  </div>
                );
              }
              return (
                <InputField
                  defaultValue={
                    defaultValues
                      ? defaultValues[field.name as keyof typeof defaultValues]
                      : ""
                  }
                  error={errors[field.name]?.message ? String(errors[field.name]?.message) : undefined}
                  key={index}
                  placeholder={field.placeholder}
                  name={field.name}
                  type={field.type}
                  register={register}
                  label={field.label}
                  className="modern-input"
                />
              );
            })}
          </form>
        </Modal.Body>
      )}
      <Modal.Footer className="border-0 pt-0">
        <Button
          disabled={loading}
          title="Cancel"
          type="button"
          className="modern-btn modern-btn-outline"
          data-dismiss="modal"
          onClick={handleClose}
        />
        <Button
          loading={loading}
          onClick={submitFields}
          title="Submit"
          type="submit"
          className="modern-btn modern-btn-primary"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;