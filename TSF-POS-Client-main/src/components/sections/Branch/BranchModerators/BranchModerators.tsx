import { useEffect } from "react";
import { User } from "../../../../types/User/userTypes";
import ModeratorCard from "../../../cards/ModeratorCard/ModeratorCard";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../../redux/redux";
import { toast } from "react-hot-toast";
import { errorAndSuccessRemover } from "../../../../redux/actions/remover/removerAction";

const BranchModerators = ({
  moderators,
  branchId,
}: {
  moderators: User[];
  branchId: string;
}) => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state: StateType) => state.user);

  useEffect(() => {
    if (error) toast.error(error);
    console.log("message", message);
    if (message) toast.success(message);
    dispatch(errorAndSuccessRemover());
  }, [error, message, dispatch]);

  return (
    <div className="mb-4">
      <p className="fs-4 fw-bold text-muted">
        Moderators ({moderators?.length})
      </p>
      <div className="mt-4 d-flex flex-wrap gap-4">
        {moderators?.map((moderator, key) => {
          return (
            <ModeratorCard
              key={key}
              moderator={moderator}
              branchId={branchId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BranchModerators;
