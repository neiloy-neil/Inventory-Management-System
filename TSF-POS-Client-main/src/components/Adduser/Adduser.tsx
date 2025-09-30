import { SubmitHandler, useForm } from "react-hook-form";
import {
  ADD_USER_FIELDS,
  ADD_USER_FIELDS_WITH_BRANCH,
} from "../../constants/InputFields/user/addUser";
import Button from "../core/Button/Button";
import FormModal from "../Modals/FormModal/FormModal";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/redux";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import addUserValidationSchema from "../../constants/InputValidation/User/AddUserValidation";
import { User } from "../../types/User/userTypes";
import { addUserToSystem } from "../../redux/actions/user/userAction";

const Adduser = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [forceRender, setForceRender] = useState(0);
  const [userRole, setUserRole] = useState<string>("moderator");
  const { loading: userLoading } = useSelector(
    (state: StateType) => state.promise
  );
  const { branches, loading } = useSelector(
    (state: StateType) => state.branches
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(addUserValidationSchema(userRole)),
  });

  useEffect(() => {
    if (branches) {
      const branchField = ADD_USER_FIELDS_WITH_BRANCH.find(
        (field) => field.name === "branch"
      );

      if (branchField) {
        branches.forEach((branch) => {
          const option = { label: branch.name, value: branch._id };
          if (!branchField.options?.some((o) => o.value === option.value)) {
            branchField.options?.push(option);
          }
        });
      }

      setForceRender(1);
    }
  }, [branches, forceRender]);

  // if role change change the user role to picktup right schema
  const role = watch("role");
  useEffect(() => {
    setUserRole(role);
  }, [role]);

  // onsubmit function to dispatch the action
  const onSubmit: SubmitHandler<User> = async (value: User) => {
    await dispatch(addUserToSystem(value));
    setModalOpen(false);
  };

  return (
    <>
      <Button
        title="Add User"
        className="mb-4"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={() => setModalOpen(true)}
      />
      <FormModal
        loading={loading || userLoading}
        open={modalOpen}
        setOpen={setModalOpen}
        errors={errors}
        key={forceRender}
        submitFields={handleSubmit(onSubmit)}
        title="Add User"
        fields={
          role !== "admin" ? ADD_USER_FIELDS_WITH_BRANCH : ADD_USER_FIELDS
        }
        register={register}
      />
    </>
  );
};

export default Adduser;
