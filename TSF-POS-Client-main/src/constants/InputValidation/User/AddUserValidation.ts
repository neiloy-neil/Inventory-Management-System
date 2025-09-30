import * as yup from "yup";

const addUserValidationSchema = (role: string) => {
  return yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    role: yup.string().required("Role is required"),
    branch:
      role === "admin"
        ? yup.string()
        : yup.string().required("Branch is required"),
  });
};

export default addUserValidationSchema;
