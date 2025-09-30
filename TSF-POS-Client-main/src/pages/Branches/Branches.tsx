import { useEffect, useState } from "react";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import BranchCard from "../../components/cards/BranchCard/BranchCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import { getBranchList } from "../../redux/actions/branches/branchesAction";
import "./branches.scss";
import Button from "../../components/core/Button/Button";
import FormModal from "../../components/Modals/FormModal/FormModal";
import BRANCH_FIELDS from "../../constants/InputFields/branch/branch";
import { useForm } from "react-hook-form";
import { addBranch } from "../../redux/actions/branch/branchAction";
import { toast } from "react-hot-toast";
import { errorAndSuccessRemover } from "../../redux/actions/remover/removerAction";

const Branches = () => {
  const dispatch: AppDispatch = useDispatch();
  const [addBranchModalOpen, setAddBranchModalOpen] = useState<boolean>(false);
  const { branches } = useSelector((state: StateType) => state.branches);
  const { loading, error, message } = useSelector(
    (state: StateType) => state.branch
  );

  useEffect(() => {
    dispatch(getBranchList());
  }, [dispatch, message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onAddBranchSubmit = async (data: BranchData) => {
    await dispatch(addBranch(data));
    setAddBranchModalOpen(false);
  };

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    dispatch(errorAndSuccessRemover());
  }, [error, message, dispatch]);

  return (
    <Pagewrapper>
      <Button
        title="Add Branch"
        className="mb-4"
        onClick={() => setAddBranchModalOpen(true)}
      />
      <FormModal
        loading={loading}
        title="Add Branch"
        fields={BRANCH_FIELDS}
        errors={errors}
        open={addBranchModalOpen}
        setOpen={setAddBranchModalOpen}
        register={register}
        submitFields={handleSubmit(onAddBranchSubmit)}
      />
      <div className="branches">
        {branches?.map((branch, index) => {
          return <BranchCard branch={branch} key={index} />;
        })}
      </div>
    </Pagewrapper>
  );
};

export default Branches;
